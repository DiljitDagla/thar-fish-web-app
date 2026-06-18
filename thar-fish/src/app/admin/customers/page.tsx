"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, Column } from "@/components/admin/data-table";
import { KpiCard } from "@/components/admin/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CUSTOMERS } from "@/lib/data";
import { Customer } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, UserCheck, Users, Crown } from "lucide-react";

const statusVariant = {
  Active: "success",
  Inactive: "danger",
  VIP: "gold",
} as const;

export default function CustomersPage() {
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      status === "all"
        ? CUSTOMERS
        : CUSTOMERS.filter((c) => c.status === status),
    [status]
  );

  const columns: Column<Customer>[] = [
    {
      key: "name",
      header: "Customer",
      render: (c) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs">
              {c.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.id}</p>
          </div>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "city", header: "City" },
    {
      key: "totalSpent",
      header: "Total Spent",
      render: (c) => <span className="font-semibold">{formatCurrency(c.totalSpent)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (c) => <Badge variant={statusVariant[c.status]}>{c.status}</Badge>,
    },
    {
      key: "registrationDate",
      header: "Registered",
      render: (c) => formatDate(c.registrationDate),
    },
  ];

  const vip = CUSTOMERS.filter((c) => c.status === "VIP").length;
  const active = CUSTOMERS.filter((c) => c.status === "Active").length;

  return (
    <div>
      <PageHeader
        title="Customer Management"
        subtitle="View, search and segment your customer base."
        action={
          <Button variant="outline">
            <Download /> Export
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total Customers" value={CUSTOMERS.length} icon={Users} tone="blue" />
        <KpiCard label="Active" value={active} icon={UserCheck} tone="green" />
        <KpiCard label="VIP Members" value={vip} icon={Crown} tone="gold" />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by name, email, phone, city…"
        searchKeys={["name", "email", "phone", "city", "id"]}
        toolbar={
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
