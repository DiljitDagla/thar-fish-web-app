"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/brand";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (user.role === "admin") router.replace("/admin");
    else router.replace("/dashboard");
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary/5 via-background to-chart-2/10">
      <Logo />
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading your experience…</span>
      </div>
    </div>
  );
}
