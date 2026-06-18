"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { AuthGuard } from "@/components/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AuthGuard requireRole="admin">
      <div className="min-h-screen bg-muted/40">
        <AdminSidebar open={open} onClose={() => setOpen(false)} />
        <div className="lg:pl-64">
          <AdminTopbar onMenu={() => setOpen(true)} />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
