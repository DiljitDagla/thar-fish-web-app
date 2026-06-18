"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import {
  Bell,
  ChevronRight,
  Globe,
  LogOut,
  Menu,
  Moon,
  PanelLeft,
  PanelLeftClose,
  Search,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";

const LABELS: Record<string, string> = {
  admin: "Dashboard",
  orders: "Orders",
  inventory: "Fish Inventory",
  ponds: "Pond Management",
  hatchery: "Hatchery",
  customers: "Customers",
  bookings: "Resort Bookings",
  enquiries: "Enquiries",
  reports: "Reports",
  settings: "Settings",
};

const NOTIFICATIONS = [
  { title: "New order received", desc: "Order TF820194 · 250kg Rohu", time: "2m ago" },
  { title: "Pond C alert", desc: "Dissolved oxygen below threshold", time: "1h ago" },
  { title: "New enquiry", desc: "Hatchery Setup consultation", time: "3h ago" },
  { title: "Booking confirmed", desc: "Weekend Escape · 4 guests", time: "5h ago" },
];

export function AdminTopbar({
  onMenu,
  collapsed = false,
  onToggleSidebar,
}: {
  onMenu: () => void;
  collapsed?: boolean;
  onToggleSidebar?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);

  const segments = pathname.split("/").filter(Boolean);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.add("theme-transition");
    window.setTimeout(() => html.classList.remove("theme-transition"), 400);
    setDark((d) => {
      const next = !d;
      html.classList.toggle("dark", next);
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      {/* Mobile: open the drawer */}
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Desktop: collapse / expand the sidebar */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden lg:flex"
        onClick={onToggleSidebar}
        aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
        title={collapsed ? "Show sidebar" : "Hide sidebar"}
      >
        {collapsed ? (
          <PanelLeft className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </Button>

      {/* Breadcrumbs */}
      <nav className="hidden items-center gap-1.5 text-sm md:flex">
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          return (
            <Fragment key={href}>
              {i > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              <Link
                href={href}
                className={
                  isLast
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {LABELS[seg] ?? seg}
              </Link>
            </Fragment>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search…" className="w-56 pl-10" />
        </div>

        <Button variant="ghost" size="icon" onClick={toggleDark}>
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="info">{NOTIFICATIONS.length} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NOTIFICATIONS.map((n) => (
              <DropdownMenuItem key={n.title} className="flex-col items-start gap-0.5 py-2.5">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
                <p className="text-[10px] text-muted-foreground">{n.time}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-0.5 outline-none">
              <Avatar className="h-9 w-9 border-2 border-secondary">
                <AvatarFallback>{user?.avatar ?? "AD"}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs font-normal text-muted-foreground">
                Administrator
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              <Globe /> View Website
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
