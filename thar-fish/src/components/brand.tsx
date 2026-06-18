import { Fish } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
  showText = true,
}: {
  className?: string;
  light?: boolean;
  showText?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 shadow-lg">
        <Fish className="h-5 w-5 text-white" strokeWidth={2.5} />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold ring-2 ring-background" />
      </div>
      {showText && (
        <div className="leading-tight">
          <p
            className={cn(
              "text-base font-extrabold tracking-tight",
              light ? "text-white" : "text-foreground"
            )}
          >
            Thar Fish
          </p>
          <p
            className={cn(
              "text-[10px] font-medium uppercase tracking-widest",
              light ? "text-white/70" : "text-muted-foreground"
            )}
          >
            Hatchery & Resort
          </p>
        </div>
      )}
    </div>
  );
}
