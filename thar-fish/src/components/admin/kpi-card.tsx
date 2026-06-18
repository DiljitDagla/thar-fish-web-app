import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  delta?: number;
  icon: LucideIcon;
  tone?: "primary" | "green" | "gold" | "blue" | "rose" | "violet";
}) {
  const tones: Record<string, string> = {
    primary: "from-primary to-chart-2",
    green: "from-emerald-500 to-teal-500",
    gold: "from-amber-400 to-orange-500",
    blue: "from-sky-500 to-blue-600",
    rose: "from-rose-500 to-pink-600",
    violet: "from-violet-500 to-purple-600",
  };
  const up = (delta ?? 0) >= 0;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight">{value}</p>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white",
              tones[tone]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {delta !== undefined && (
          <div className="mt-3 flex items-center gap-1 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold",
                up
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              )}
            >
              {up ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(delta)}%
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
