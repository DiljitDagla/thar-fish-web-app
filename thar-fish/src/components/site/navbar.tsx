"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

const LINKS = [
  { href: "/dashboard", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/tourism", label: "Tourism & Resort" },
  { href: "/consultancy", label: "Consultancy" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/dashboard" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === l.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative hidden sm:flex">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                  {count}
                </Badge>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full p-0.5 outline-none">
                <Avatar className="h-9 w-9 border-2 border-secondary">
                  <AvatarFallback>{user?.avatar ?? "TF"}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="font-semibold">{user?.name ?? "Guest"}</p>
                <p className="text-xs font-normal text-muted-foreground">
                  {user?.email}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User /> My Profile
              </DropdownMenuItem>
              {user?.role === "admin" && (
                <DropdownMenuItem onClick={() => router.push("/admin")}>
                  <LayoutDashboard /> Admin Panel
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-medium",
                pathname === l.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
