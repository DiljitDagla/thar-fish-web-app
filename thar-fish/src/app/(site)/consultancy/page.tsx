"use client";

import { useState } from "react";
import { PageHero, SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { CONSULTANCY_SERVICES, IMAGES } from "@/lib/data";
import {
  Egg,
  Fish,
  FlaskConical,
  Lightbulb,
  LucideIcon,
  Send,
  ShieldPlus,
  Waves,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Egg,
  Waves,
  Fish,
  FlaskConical,
  Lightbulb,
  ShieldPlus,
};

const STORAGE_KEY = "tharfish_enquiries";

export default function ConsultancyPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.push({ ...form, date: new Date().toISOString().slice(0, 10), status: "New" });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
    toast({
      title: "Enquiry submitted!",
      description: "Our consultancy team will contact you within 24 hours.",
      variant: "success",
    });
    setForm({ name: "", phone: "", email: "", service: "", message: "" });
  };

  return (
    <div>
      <PageHero
        title="Fisheries & Aquaculture Consultancy"
        subtitle="From hatchery setup to disease management — partner with experts who have advised 200+ farms across Rajasthan."
        image={IMAGES.consultancy}
      />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading
          eyebrow="Our Expertise"
          title="Professional Consultancy Services"
          subtitle="Practical, science-backed services tailored to desert aquaculture conditions."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONSULTANCY_SERVICES.map((s) => {
            const Icon = ICONS[s.icon] ?? Fish;
            return (
              <Card key={s.id} className="group h-full transition-all hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <p className="mt-4 text-sm font-semibold text-primary">{s.price}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enquiry form */}
        <div className="mt-16 grid gap-8 rounded-3xl border bg-gradient-to-br from-secondary/40 to-background p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Get in touch"
              title="Request a Consultation"
              subtitle="Tell us about your project and our specialists will craft a tailored plan for you."
            />
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>✓ Free initial assessment call</li>
              <li>✓ On-site visits across western Rajasthan</li>
              <li>✓ Government scheme &amp; subsidy guidance</li>
              <li>✓ Ongoing growth &amp; economics tracking</li>
            </ul>
          </div>

          <form onSubmit={submit} className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 …"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select
                value={form.service}
                onValueChange={(v) => setForm({ ...form, service: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {CONSULTANCY_SERVICES.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your project…"
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={!form.service}
            >
              <Send /> Submit Enquiry
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
