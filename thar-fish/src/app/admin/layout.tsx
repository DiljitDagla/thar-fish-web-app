"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { AuthGuard } from "@/components/auth-guard";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // `open` controls the mobile drawer; `collapsed` hides the sidebar on desktop.
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthGuard requireRole="admin">
      <div className="min-h-screen bg-muted/40">
        <AdminSidebar
          open={open}
          collapsed={collapsed}
          onClose={() => setOpen(false)}
        />
        <div
          className={cn(
            "transition-[padding] duration-300 ease-out",
            collapsed ? "lg:pl-0" : "lg:pl-64"
          )}
        >
          <AdminTopbar
            onMenu={() => setOpen(true)}
            collapsed={collapsed}
            onToggleSidebar={() => setCollapsed((c) => !c)}
          />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
