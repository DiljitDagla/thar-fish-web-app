"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { KpiCard } from "@/components/admin/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { FISH_PRODUCTS } from "@/lib/data";
import { FishProduct } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { AlertTriangle, Fish, Layers, Pencil, Plus, Trash2 } from "lucide-react";

const availabilityVariant = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
} as const;

type Editable = Pick<
  FishProduct,
  "name" | "category" | "quantity" | "avgWeight" | "price" | "availability"
>;

const EMPTY: Editable = {
  name: "",
  category: "",
  quantity: 0,
  avgWeight: 0,
  price: 0,
  availability: "In Stock",
};

export default function InventoryPage() {
  const { toast } = useToast();
  const [list, setList] = useState<FishProduct[]>(FISH_PRODUCTS);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Editable>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (f: FishProduct) => {
    setEditId(f.id);
    setForm({
      name: f.name,
      category: f.category,
      quantity: f.quantity,
      avgWeight: f.avgWeight,
      price: f.price,
      availability: f.availability,
    });
    setOpen(true);
  };

  const save = () => {
    if (editId) {
      setList((prev) =>
        prev.map((f) => (f.id === editId ? { ...f, ...form } : f))
      );
      toast({ title: "Fish updated", description: `${form.name} saved.`, variant: "success" });
    } else {
      const id = `FISH-${String(list.length + 1).padStart(3, "0")}`;
      setList((prev) => [
        ...prev,
        {
          ...form,
          id,
          description: `${form.name} — added to inventory.`,
          weight: `${form.avgWeight} kg avg`,
          image: FISH_PRODUCTS[0].image,
          rating: 4.5,
        },
      ]);
      toast({ title: "Fish added", description: `${form.name} added.`, variant: "success" });
    }
    setOpen(false);
  };

  const confirmDelete = () => {
    const f = list.find((x) => x.id === deleteId);
    setList((prev) => prev.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    toast({ title: "Fish deleted", description: `${f?.name} removed.`, variant: "info" });
  };

  const totalStock = list.reduce((s, f) => s + f.quantity, 0);
  const lowStock = list.filter((f) => f.availability !== "In Stock").length;

  return (
    <div>
      <PageHeader
        title="Fish Inventory"
        subtitle="Manage your fish species, stock levels and pricing."
        action={
          <Button variant="gradient" onClick={openAdd}>
            <Plus /> Add Fish
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Species" value={list.length} icon={Fish} tone="primary" />
        <KpiCard label="Total Stock (kg)" value={formatNumber(totalStock)} icon={Layers} tone="green" />
        <KpiCard label="Low / Out of Stock" value={lowStock} icon={AlertTriangle} tone="rose" />
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fish Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity (kg)</TableHead>
              <TableHead>Avg Weight</TableHead>
              <TableHead>Price/kg</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-medium">{f.name}</TableCell>
                <TableCell className="text-muted-foreground">{f.category}</TableCell>
                <TableCell>{formatNumber(f.quantity)}</TableCell>
                <TableCell>{f.avgWeight} kg</TableCell>
                <TableCell className="font-semibold">₹{f.price}</TableCell>
                <TableCell>
                  <Badge variant={availabilityVariant[f.availability]}>
                    {f.availability}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(f)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => setDeleteId(f.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add/Edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Fish" : "Add Fish"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Fish Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Rohu"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Indian Major Carp"
              />
            </div>
            <div className="space-y-2">
              <Label>Availability</Label>
              <Select
                value={form.availability}
                onValueChange={(v) =>
                  setForm({ ...form, availability: v as FishProduct["availability"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quantity (kg)</Label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Avg Weight (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={form.avgWeight}
                onChange={(e) => setForm({ ...form, avgWeight: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Price per kg (₹)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" onClick={save} disabled={!form.name}>
              {editId ? "Save Changes" : "Add Fish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this fish?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will remove the species from your inventory. This action cannot
            be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
