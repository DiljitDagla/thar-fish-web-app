"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/brand";
import { Loader2 } from "lucide-react";
import { Role } from "@/lib/types";

export function AuthGuard({
  children,
  requireRole,
}: {
  children: React.ReactNode;
  requireRole?: Role;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (requireRole && user.role !== requireRole) {
      router.replace(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [user, loading, requireRole, router]);

  if (loading || !user || (requireRole && user.role !== requireRole)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary/5 via-background to-chart-2/10">
        <Logo />
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
