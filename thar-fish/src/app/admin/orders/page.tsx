"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, Column } from "@/components/admin/data-table";
import { KpiCard } from "@/components/admin/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDERS } from "@/lib/data";
import { Order } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, Clock, Download, ShoppingCart } from "lucide-react";

const paymentVariant = {
  Paid: "success",
  Pending: "warning",
  Refunded: "danger",
} as const;

const deliveryVariant = {
  Delivered: "success",
  Processing: "warning",
  Shipped: "info",
  Cancelled: "danger",
} as const;

export default function OrdersPage() {
  const [payment, setPayment] = useState("all");

  const filtered = useMemo(
    () =>
      payment === "all"
        ? ORDERS
        : ORDERS.filter((o) => o.paymentStatus === payment),
    [payment]
  );

  const columns: Column<Order>[] = [
    {
      key: "orderNumber",
      header: "Order",
      render: (o) => (
        <div>
          <p className="font-semibold">{o.orderNumber}</p>
          <p className="text-xs text-muted-foreground">{o.id}</p>
        </div>
      ),
    },
    { key: "customer", header: "Customer" },
    {
      key: "fishType",
      header: "Fish",
      render: (o) => (
        <span>
          {o.quantity}kg <span className="text-muted-foreground">{o.fishType}</span>
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (o) => <span className="font-semibold">{formatCurrency(o.amount)}</span>,
    },
    {
      key: "paymentStatus",
      header: "Payment",
      render: (o) => <Badge variant={paymentVariant[o.paymentStatus]}>{o.paymentStatus}</Badge>,
    },
    {
      key: "deliveryStatus",
      header: "Delivery",
      render: (o) => <Badge variant={deliveryVariant[o.deliveryStatus]}>{o.deliveryStatus}</Badge>,
    },
    { key: "date", header: "Date", render: (o) => formatDate(o.date) },
  ];

  const paid = ORDERS.filter((o) => o.paymentStatus === "Paid");
  const pending = ORDERS.filter((o) => o.paymentStatus === "Pending");
  const revenue = paid.reduce((s, o) => s + o.amount, 0);

  return (
    <div>
      <PageHeader
        title="Order Management"
        subtitle="Track fish orders, payments and deliveries."
        action={
          <Button variant="outline">
            <Download /> Export
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total Orders" value={ORDERS.length} icon={ShoppingCart} tone="primary" />
        <KpiCard label="Paid Revenue" value={formatCurrency(revenue)} icon={CheckCircle2} tone="green" />
        <KpiCard label="Pending Payments" value={pending.length} icon={Clock} tone="gold" />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by order, customer, fish…"
        searchKeys={["orderNumber", "customer", "fishType", "id"]}
        toolbar={
          <Select value={payment} onValueChange={setPayment}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
