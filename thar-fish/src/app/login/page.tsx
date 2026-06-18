"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { IMAGES } from "@/lib/images";
import { COMPANY, STATS } from "@/lib/data";
import {
  Eye,
  EyeOff,
  Fish,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const fill = (role: "admin" | "user") => {
    if (role === "admin") {
      setEmail("admin@tharfish.com");
      setPassword("admin123");
    } else {
      setEmail("user@tharfish.com");
      setPassword("user123");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      if (res.ok) {
        toast({ title: "Welcome back!", description: "Loading your dashboard…", variant: "success" });
        // Keep the button in its loading state while the target route loads
        // (first navigation in dev mode can take a moment to compile).
        router.push(res.role === "admin" ? "/admin" : "/dashboard");
      } else {
        setLoading(false);
        toast({ title: "Login failed", description: res.error, variant: "error" });
      }
    }, 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: hero / branding */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src={IMAGES.heroFarm}
          alt="Thar Fish farm"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-chart-2/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Logo light />
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Sparkles className="h-4 w-4 text-gold" />
              Smart Aquaculture Platform
            </span>
            <h1 className="max-w-md text-4xl font-extrabold leading-tight text-balance">
              {COMPANY.tagline}
            </h1>
            <p className="max-w-md text-white/80">
              Manage hatcheries, ponds, fish sales, consultancy and a lakeside
              eco-resort — all from one premium platform.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: "Active Ponds", value: STATS.activePonds, icon: Waves },
                { label: "Fish Species", value: STATS.fishSpecies, icon: Fish },
                { label: "Annual Yield", value: STATS.annualProduction, icon: Sparkles },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4">
                  <s.icon className="mb-2 h-5 w-5 text-gold" />
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/60">
            {COMPANY.name} · {COMPANY.location}
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/30 p-6">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight">Sign in</h2>
            <p className="mt-2 text-muted-foreground">
              Access your Thar Fish dashboard and services.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@tharfish.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            DEMO ACCOUNTS
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => fill("admin")}
              className="group rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-md"
            >
              <ShieldCheck className="mb-2 h-5 w-5 text-primary" />
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-muted-foreground">admin@tharfish.com</p>
              <p className="text-xs text-muted-foreground">admin123</p>
            </button>
            <button
              onClick={() => fill("user")}
              className="group rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-md"
            >
              <Fish className="mb-2 h-5 w-5 text-chart-2" />
              <p className="text-sm font-semibold">Customer</p>
              <p className="text-xs text-muted-foreground">user@tharfish.com</p>
              <p className="text-xs text-muted-foreground">user123</p>
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Tap a card to autofill, then sign in.
          </p>
        </div>
      </div>
    </div>
  );
}
