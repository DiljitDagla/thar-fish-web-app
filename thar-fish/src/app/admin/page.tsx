"use client";

import { KpiCard } from "@/components/admin/kpi-card";
import { PageHeader } from "@/components/admin/page-header";
import {
  BookingTrendChart,
  CustomerGrowthChart,
  FishSalesChart,
  PopularSpeciesChart,
  RevenueChart,
  ServiceEnquiriesChart,
} from "@/components/admin/charts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CUSTOMER_GROWTH,
  FISH_SALES_TREND,
  KPIS,
  MONTHLY_REVENUE,
  ORDERS,
  POPULAR_SPECIES,
  RESORT_BOOKING_TREND,
  SERVICE_ENQUIRIES,
} from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Download,
  Fish,
  Hotel,
  IndianRupee,
  MessageSquare,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const paymentVariant = {
  Paid: "success",
  Pending: "warning",
  Refunded: "danger",
} as const;

export default function AdminDashboard() {
  const recent = ORDERS.slice(0, 6);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back — here's what's happening at Thar Fish today."
        action={
          <Button variant="gradient">
            <Download /> Export Report
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Total Customers" value={formatNumber(KPIS.totalCustomers)} delta={12.4} icon={Users} tone="blue" />
        <KpiCard label="Total Orders" value={formatNumber(KPIS.totalOrders)} delta={8.1} icon={ShoppingCart} tone="primary" />
        <KpiCard label="Total Revenue" value={formatCurrency(KPIS.totalRevenue)} delta={15.7} icon={IndianRupee} tone="green" />
        <KpiCard label="Fish Stock (kg)" value={formatNumber(KPIS.totalFishStock)} delta={-2.3} icon={Fish} tone="gold" />
        <KpiCard label="Resort Bookings" value={formatNumber(KPIS.totalResortBookings)} delta={5.6} icon={Hotel} tone="violet" />
        <KpiCard label="Enquiries" value={formatNumber(KPIS.totalEnquiries)} delta={9.2} icon={MessageSquare} tone="rose" />
      </div>

      {/* Charts row 1 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={MONTHLY_REVENUE} />
        </div>
        <PopularSpeciesChart data={POPULAR_SPECIES} />
      </div>

      {/* Charts row 2 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <FishSalesChart data={FISH_SALES_TREND} />
        <CustomerGrowthChart data={CUSTOMER_GROWTH} />
      </div>

      {/* Charts row 3 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BookingTrendChart data={RESORT_BOOKING_TREND} />
        <ServiceEnquiriesChart data={SERVICE_ENQUIRIES} />
      </div>

      {/* Recent orders */}
      <Card className="mt-6">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recent Orders</CardTitle>
          <Badge variant="info">Live</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recent.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{o.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.customer} · {o.quantity}kg {o.fishType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-bold">{formatCurrency(o.amount)}</p>
                  <Badge variant={paymentVariant[o.paymentStatus]}>
                    {o.paymentStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
