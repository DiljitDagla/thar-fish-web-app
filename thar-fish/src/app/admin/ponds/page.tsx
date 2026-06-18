"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { KpiCard } from "@/components/admin/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import { PONDS, FISH_PRODUCTS } from "@/lib/data";
import { Pond } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import {
  Droplets,
  Fish,
  Pencil,
  Plus,
  Thermometer,
  Trash2,
  Waves,
} from "lucide-react";

const healthVariant = {
  Excellent: "success",
  Good: "info",
  Monitor: "warning",
  Critical: "danger",
} as const;

type Editable = Pick<
  Pond,
  "name" | "area" | "waterLevel" | "fishCount" | "species" | "healthStatus" | "temperature" | "ph"
>;

const EMPTY: Editable = {
  name: "",
  area: "1.0 acres",
  waterLevel: 80,
  fishCount: 5000,
  species: FISH_PRODUCTS[0].name,
  healthStatus: "Good",
  temperature: 26,
  ph: 7.2,
};

export default function PondsPage() {
  const { toast } = useToast();
  const [list, setList] = useState<Pond[]>(PONDS);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Editable>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (p: Pond) => {
    setEditId(p.id);
    setForm({ ...p });
    setOpen(true);
  };
  const save = () => {
    if (editId) {
      setList((prev) => prev.map((p) => (p.id === editId ? { ...p, ...form } : p)));
      toast({ title: "Pond updated", variant: "success" });
    } else {
      const id = `POND-${String(list.length + 1).padStart(2, "0")}`;
      setList((prev) => [...prev, { ...form, id }]);
      toast({ title: "Pond created", variant: "success" });
    }
    setOpen(false);
  };
  const confirmDelete = () => {
    setList((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    toast({ title: "Pond deleted", variant: "info" });
  };

  const totalFish = list.reduce((s, p) => s + p.fishCount, 0);
  const critical = list.filter((p) => p.healthStatus === "Critical" || p.healthStatus === "Monitor").length;

  return (
    <div>
      <PageHeader
        title="Pond Management"
        subtitle="Monitor pond health, water levels and stocking across the farm."
        action={
          <Button variant="gradient" onClick={openAdd}>
            <Plus /> Create Pond
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total Ponds" value={list.length} icon={Waves} tone="blue" />
        <KpiCard label="Fish Count" value={formatNumber(totalFish)} icon={Fish} tone="green" />
        <KpiCard label="Needs Attention" value={critical} icon={Droplets} tone="rose" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {p.id} · {p.area}
                  </p>
                </div>
                <Badge variant={healthVariant[p.healthStatus]}>{p.healthStatus}</Badge>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Water Level</span>
                  <span className="font-semibold">{p.waterLevel}%</span>
                </div>
                <Progress
                  value={p.waterLevel}
                  indicatorClassName={
                    p.waterLevel < 60
                      ? "bg-rose-500"
                      : p.waterLevel < 75
                      ? "bg-amber-500"
                      : "bg-gradient-to-r from-primary to-chart-2"
                  }
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Stat icon={Fish} label="Fish" value={formatNumber(p.fishCount)} />
                <Stat icon={Thermometer} label="Temp" value={`${p.temperature}°C`} />
                <Stat icon={Droplets} label="pH" value={p.ph.toString()} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge variant="secondary">{p.species}</Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => setDeleteId(p.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Pond" : "Create Pond"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Pond Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Pond A" />
            </div>
            <div className="space-y-2">
              <Label>Area</Label>
              <Input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="2.5 acres" />
            </div>
            <div className="space-y-2">
              <Label>Water Level (%)</Label>
              <Input type="number" value={form.waterLevel} onChange={(e) => setForm({ ...form, waterLevel: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Fish Count</Label>
              <Input type="number" value={form.fishCount} onChange={(e) => setForm({ ...form, fishCount: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Species</Label>
              <Select value={form.species} onValueChange={(v) => setForm({ ...form, species: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FISH_PRODUCTS.map((f) => (
                    <SelectItem key={f.id} value={f.name}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Health Status</Label>
              <Select value={form.healthStatus} onValueChange={(v) => setForm({ ...form, healthStatus: v as Pond["healthStatus"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Monitor">Monitor</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Temperature (°C)</Label>
              <Input type="number" value={form.temperature} onChange={(e) => setForm({ ...form, temperature: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>pH</Label>
              <Input type="number" step="0.1" value={form.ph} onChange={(e) => setForm({ ...form, ph: Number(e.target.value) })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="gradient" onClick={save} disabled={!form.name}>
              {editId ? "Save Changes" : "Create Pond"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this pond?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Fish;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-muted/60 p-2">
      <Icon className="mx-auto h-4 w-4 text-muted-foreground" />
      <p className="mt-1 text-sm font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
