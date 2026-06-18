"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/lib/auth";
import { COMPANY } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Bell, Building2, Palette, Save, User } from "lucide-react";

const ACCENTS = [
  { name: "Ocean", className: "bg-gradient-to-br from-[oklch(0.46_0.13_235)] to-[oklch(0.65_0.12_190)]" },
  { name: "Aqua", className: "bg-gradient-to-br from-[oklch(0.55_0.15_160)] to-[oklch(0.65_0.12_190)]" },
  { name: "Gold", className: "bg-gradient-to-br from-[oklch(0.8_0.13_85)] to-[oklch(0.6_0.18_25)]" },
  { name: "Sunset", className: "bg-gradient-to-br from-[oklch(0.6_0.18_25)] to-[oklch(0.55_0.2_350)]" },
];

export default function SettingsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [accent, setAccent] = useState("Ocean");
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState({
    orders: true,
    bookings: true,
    enquiries: true,
    lowStock: true,
    marketing: false,
    weekly: true,
  });

  const save = () =>
    toast({ title: "Settings saved", description: "Your changes have been applied (demo).", variant: "success" });

  const toggleDark = (v: boolean) => {
    const html = document.documentElement;
    html.classList.add("theme-transition");
    window.setTimeout(() => html.classList.remove("theme-transition"), 400);
    setDark(v);
    html.classList.toggle("dark", v);
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage business, theme, notification and profile preferences."
      />

      <Tabs defaultValue="business">
        <TabsList className="mb-2 grid w-full grid-cols-2 sm:flex sm:w-auto">
          <TabsTrigger value="business"><Building2 className="mr-1 h-4 w-4" /> Business</TabsTrigger>
          <TabsTrigger value="theme"><Palette className="mr-1 h-4 w-4" /> Theme</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-1 h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="profile"><User className="mr-1 h-4 w-4" /> Profile</TabsTrigger>
        </TabsList>

        {/* Business */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
              <CardDescription>Update your company details shown across the platform.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Company Name</Label>
                <Input defaultValue={COMPANY.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={COMPANY.email} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue={COMPANY.phone} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Location</Label>
                <Input defaultValue={COMPANY.location} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>About</Label>
                <Textarea defaultValue={COMPANY.tagline} />
              </div>
              <div className="sm:col-span-2">
                <Button variant="gradient" onClick={save}><Save /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Personalise the look and feel of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
                </div>
                <Switch checked={dark} onCheckedChange={toggleDark} />
              </div>
              <div>
                <p className="mb-3 font-medium">Accent Color</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {ACCENTS.map((a) => (
                    <button
                      key={a.name}
                      onClick={() => setAccent(a.name)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
                        accent === a.name ? "border-primary ring-2 ring-primary/30" : "hover:border-primary/50"
                      )}
                    >
                      <span className={cn("h-8 w-8 rounded-lg", a.className)} />
                      <span className="text-sm font-medium">{a.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button variant="gradient" onClick={save}><Save /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose what updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                ["orders", "New Orders", "Get notified when a new fish order is placed."],
                ["bookings", "Resort Bookings", "Alerts for new and updated resort bookings."],
                ["enquiries", "Consultancy Enquiries", "Notify me when a new enquiry arrives."],
                ["lowStock", "Low Stock Alerts", "Warn me when fish stock runs low."],
                ["marketing", "Marketing Emails", "Receive product news and offers."],
                ["weekly", "Weekly Summary", "A weekly digest of farm performance."],
              ].map(([key, title, desc]) => (
                <div key={key}>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      checked={notifs[key as keyof typeof notifs]}
                      onCheckedChange={(v) => setNotifs((n) => ({ ...n, [key]: v }))}
                    />
                  </div>
                  <Separator />
                </div>
              ))}
              <div className="pt-4">
                <Button variant="gradient" onClick={save}><Save /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your personal account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 text-lg">
                  <AvatarFallback>{user?.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG or PNG, max 2MB.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input defaultValue="Administrator" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue={COMPANY.phone} />
                </div>
              </div>
              <Button variant="gradient" onClick={save}><Save /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
