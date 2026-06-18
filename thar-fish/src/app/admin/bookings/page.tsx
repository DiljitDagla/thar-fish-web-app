"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, Column } from "@/components/admin/data-table";
import { KpiCard } from "@/components/admin/kpi-card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RESORT_BOOKINGS } from "@/lib/data";
import { ResortBooking } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CalendarCheck, Hotel, Users } from "lucide-react";

const statusVariant = {
  Confirmed: "success",
  Pending: "warning",
  "Checked-In": "info",
  Completed: "secondary",
  Cancelled: "danger",
} as const;

export default function BookingsPage() {
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      status === "all"
        ? RESORT_BOOKINGS
        : RESORT_BOOKINGS.filter((b) => b.status === status),
    [status]
  );

  const columns: Column<ResortBooking>[] = [
    {
      key: "id",
      header: "Booking",
      render: (b) => <span className="font-medium">{b.id}</span>,
    },
    { key: "customer", header: "Customer" },
    {
      key: "package",
      header: "Package",
      render: (b) => <Badge variant="secondary">{b.package}</Badge>,
    },
    { key: "checkIn", header: "Check-In", render: (b) => formatDate(b.checkIn) },
    { key: "checkOut", header: "Check-Out", render: (b) => formatDate(b.checkOut) },
    {
      key: "guests",
      header: "Guests",
      render: (b) => (
        <span className="inline-flex items-center gap-1">
          <Users className="h-3.5 w-3.5 text-muted-foreground" /> {b.guests}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (b) => <span className="font-semibold">{formatCurrency(b.amount)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (b) => <Badge variant={statusVariant[b.status]}>{b.status}</Badge>,
    },
  ];

  const confirmed = RESORT_BOOKINGS.filter((b) => b.status === "Confirmed").length;
  const guests = RESORT_BOOKINGS.reduce((s, b) => s + b.guests, 0);

  return (
    <div>
      <PageHeader
        title="Resort Bookings"
        subtitle="Manage guest bookings across all resort packages."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total Bookings" value={RESORT_BOOKINGS.length} icon={Hotel} tone="violet" />
        <KpiCard label="Confirmed" value={confirmed} icon={CalendarCheck} tone="green" />
        <KpiCard label="Total Guests" value={guests} icon={Users} tone="blue" />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by customer, package…"
        searchKeys={["customer", "package", "id"]}
        toolbar={
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Checked-In">Checked-In</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
