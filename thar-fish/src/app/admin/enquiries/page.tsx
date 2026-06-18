"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { KpiCard } from "@/components/admin/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/components/ui/toast";
import { ENQUIRIES } from "@/lib/data";
import { Enquiry } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Trash2,
} from "lucide-react";

const statusVariant = {
  New: "info",
  "In Progress": "warning",
  Completed: "success",
} as const;

export default function EnquiriesPage() {
  const { toast } = useToast();
  const [list, setList] = useState<Enquiry[]>(ENQUIRIES);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<Enquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(
    () =>
      list.filter((e) =>
        [e.name, e.service, e.phone].some((f) =>
          f.toLowerCase().includes(query.toLowerCase())
        )
      ),
    [list, query]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * pageSize, current * pageSize);

  const markCompleted = (id: string) => {
    setList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Completed" } : e))
    );
    toast({ title: "Marked as completed", variant: "success" });
    setView(null);
  };
  const confirmDelete = () => {
    setList((prev) => prev.filter((e) => e.id !== deleteId));
    setDeleteId(null);
    toast({ title: "Enquiry deleted", variant: "info" });
  };

  const newCount = list.filter((e) => e.status === "New").length;
  const completed = list.filter((e) => e.status === "Completed").length;

  return (
    <div>
      <PageHeader
        title="Consultancy Enquiries"
        subtitle="Review and respond to consultancy requests."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total Enquiries" value={list.length} icon={MessageSquare} tone="primary" />
        <KpiCard label="New" value={newCount} icon={Clock} tone="gold" />
        <KpiCard label="Completed" value={completed} icon={CheckCircle2} tone="green" />
      </div>

      <Card className="overflow-hidden">
        <div className="border-b p-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, service, phone…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell className="text-muted-foreground">{e.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{e.service}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {e.message}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(e.date)}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[e.status]}>{e.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setView(e)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {e.status !== "Completed" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-emerald-600"
                        onClick={() => markCompleted(e.id)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => setDeleteId(e.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                  No enquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
          <span>Showing {rows.length} of {filtered.length}</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={current <= 1} onClick={() => setPage(current - 1)}>
              Prev
            </Button>
            <span className="px-2 font-medium text-foreground">{current} / {totalPages}</span>
            <Button variant="outline" size="sm" disabled={current >= totalPages} onClick={() => setPage(current + 1)}>
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* View dialog */}
      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          {view && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">{view.name}</p>
                  <p className="text-sm text-muted-foreground">{view.id}</p>
                </div>
                <Badge variant={statusVariant[view.status]}>{view.status}</Badge>
              </div>
              <div className="grid gap-2 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" /> {view.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" /> {view.email}
                </p>
              </div>
              <div className="rounded-lg bg-muted/60 p-3">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Service
                </p>
                <p className="text-sm">{view.service}</p>
                <p className="mt-3 text-xs font-semibold uppercase text-muted-foreground">
                  Message
                </p>
                <p className="text-sm">{view.message}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setView(null)}>
              Close
            </Button>
            {view && view.status !== "Completed" && (
              <Button variant="gradient" onClick={() => markCompleted(view.id)}>
                <CheckCircle2 /> Mark Completed
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this enquiry?</DialogTitle>
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
