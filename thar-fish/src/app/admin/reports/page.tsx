"use client";

import { PageHeader } from "@/components/admin/page-header";
import {
  RevenueChart,
  FishSalesChart,
  BookingTrendChart,
} from "@/components/admin/charts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import {
  FISH_SALES_TREND,
  KPIS,
  MONTHLY_REVENUE,
  PONDS,
  HATCHERY,
  RESORT_BOOKING_TREND,
} from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Download,
  FileBarChart,
  FileSpreadsheet,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function ReportsPage() {
  const { toast } = useToast();
  const exportReport = (name: string) =>
    toast({
      title: "Export started",
      description: `${name} is being generated (demo).`,
      variant: "info",
    });

  const harvestRevenue = MONTHLY_REVENUE.reduce((s, m) => s + m.revenue, 0);

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Generate and export performance reports across the business."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportReport("PDF report")}>
              <FileText /> PDF
            </Button>
            <Button variant="outline" onClick={() => exportReport("Excel report")}>
              <FileSpreadsheet /> Excel
            </Button>
            <Button variant="gradient" onClick={() => exportReport("Full report")}>
              <Download /> Export All
            </Button>
          </div>
        }
      />

      {/* Summary tiles */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryTile icon={TrendingUp} label="Annual Revenue" value={formatCurrency(harvestRevenue)} />
        <SummaryTile icon={FileBarChart} label="Paid Revenue" value={formatCurrency(KPIS.totalRevenue)} />
        <SummaryTile icon={FileSpreadsheet} label="Fish Stock" value={`${formatNumber(KPIS.totalFishStock)} kg`} />
        <SummaryTile icon={FileText} label="Bookings" value={formatNumber(KPIS.totalResortBookings)} />
      </div>

      {/* Revenue Report */}
      <ReportSection title="Revenue Report" onExport={() => exportReport("Revenue report")}>
        <RevenueChart data={MONTHLY_REVENUE} />
      </ReportSection>

      {/* Sales Report */}
      <ReportSection title="Sales Report" onExport={() => exportReport("Sales report")}>
        <FishSalesChart data={FISH_SALES_TREND} />
      </ReportSection>

      {/* Pond Performance */}
      <Card className="mt-6">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Pond Performance</CardTitle>
          <Button variant="outline" size="sm" onClick={() => exportReport("Pond performance")}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {PONDS.slice(0, 6).map((p) => (
            <div key={p.id} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">{p.name}</span>
              <Progress value={p.waterLevel} className="flex-1" />
              <span className="w-20 text-right text-sm text-muted-foreground">
                {formatNumber(p.fishCount)} fish
              </span>
              <Badge
                variant={
                  p.healthStatus === "Critical"
                    ? "danger"
                    : p.healthStatus === "Monitor"
                    ? "warning"
                    : "success"
                }
              >
                {p.healthStatus}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hatchery Performance */}
      <Card className="mt-6">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Hatchery Performance</CardTitle>
          <Button variant="outline" size="sm" onClick={() => exportReport("Hatchery performance")}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HATCHERY.slice(0, 4).map((b) => (
            <div key={b.id} className="rounded-xl border p-4">
              <p className="text-sm font-semibold">{b.batchId}</p>
              <p className="text-xs text-muted-foreground">{b.fishType} · {b.growthStage}</p>
              <p className="mt-3 text-xl font-extrabold">{formatNumber(b.seedQuantity)}</p>
              <p className="text-xs text-muted-foreground">seed · {b.mortalityRate}% mortality</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tourism Report */}
      <ReportSection title="Tourism Report" onExport={() => exportReport("Tourism report")}>
        <BookingTrendChart data={RESORT_BOOKING_TREND} />
      </ReportSection>
    </div>
  );
}

function SummaryTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Download;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-extrabold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ReportSection({
  title,
  onExport,
  children,
}: {
  title: string;
  onExport: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
        <Button variant="ghost" size="sm" onClick={onExport}>
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>
      {children}
    </div>
  );
}
