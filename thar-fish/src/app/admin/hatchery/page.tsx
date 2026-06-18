"use client";

import { PageHeader } from "@/components/admin/page-header";
import { KpiCard } from "@/components/admin/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HATCHERY } from "@/lib/data";
import { formatDate, formatNumber } from "@/lib/utils";
import { Egg, Sprout, TrendingDown } from "lucide-react";

const stageVariant = {
  Egg: "secondary",
  Larvae: "info",
  Fry: "warning",
  Fingerling: "gold",
  Juvenile: "success",
} as const;

export default function HatcheryPage() {
  const totalSeed = HATCHERY.reduce((s, b) => s + b.seedQuantity, 0);
  const avgMortality =
    HATCHERY.reduce((s, b) => s + b.mortalityRate, 0) / HATCHERY.length;

  return (
    <div>
      <PageHeader
        title="Hatchery Management"
        subtitle="Track breeding batches, growth stages and seed production."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Active Batches" value={HATCHERY.length} icon={Egg} tone="primary" />
        <KpiCard label="Total Seed" value={formatNumber(totalSeed)} icon={Sprout} tone="green" />
        <KpiCard label="Avg Mortality" value={`${avgMortality.toFixed(1)}%`} icon={TrendingDown} tone="rose" />
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Fish Type</TableHead>
              <TableHead>Seed Quantity</TableHead>
              <TableHead>Growth Stage</TableHead>
              <TableHead>Mortality Rate</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Expected Harvest</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HATCHERY.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.batchId}</TableCell>
                <TableCell>{b.fishType}</TableCell>
                <TableCell>{formatNumber(b.seedQuantity)}</TableCell>
                <TableCell>
                  <Badge variant={stageVariant[b.growthStage]}>{b.growthStage}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={b.mortalityRate * 5}
                      className="h-2 w-20"
                      indicatorClassName={
                        b.mortalityRate > 10 ? "bg-rose-500" : "bg-amber-500"
                      }
                    />
                    <span className="text-xs font-medium">{b.mortalityRate}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(b.startDate)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(b.expectedHarvest)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
