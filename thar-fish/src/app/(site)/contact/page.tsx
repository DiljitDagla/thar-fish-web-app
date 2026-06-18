"use client";

import { useState } from "react";
import { PageHero } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { COMPANY, IMAGES } from "@/lib/data";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. We'll respond shortly.",
      variant: "success",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Have a question about fish sales, consultancy or resort bookings? We'd love to hear from you."
        image={IMAGES.desert}
      />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            { icon: MapPin, title: "Visit Us", lines: [COMPANY.name, COMPANY.location] },
            { icon: Phone, title: "Call Us", lines: [COMPANY.phone, "Mon–Sat, 9am–6pm"] },
            { icon: Mail, title: "Email Us", lines: [COMPANY.email, "We reply within 24h"] },
          ].map((c) => (
            <Card key={c.title}>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 text-white">
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-muted-foreground">
                      {l}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-extrabold">Send a Message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill the form and our team will get back to you.
              </p>
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cname">Name</Label>
                  <Input
                    id="cname"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cemail">Email</Label>
                  <Input
                    id="cemail"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cmsg">Message</Label>
                  <Textarea
                    id="cmsg"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help?"
                    className="min-h-[140px]"
                  />
                </div>
                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  <Send /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="overflow-hidden p-0">
            <div className="relative h-full min-h-[420px]">
              <iframe
                title="Thar Fish location"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.0%2C27.9%2C73.6%2C28.2&layer=mapnik&marker=28.05,73.3"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl bg-card/95 p-4 shadow-lg backdrop-blur">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-primary" /> {COMPANY.location}
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Open daily · 9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
