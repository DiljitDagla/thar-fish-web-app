"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHero } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { RESORT_PACKAGES, IMAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { ResortPackage } from "@/lib/types";
import { CalendarDays, Check, Clock, Users } from "lucide-react";

export default function TourismPage() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<ResortPackage | null>(null);
  const [form, setForm] = useState({ name: "", checkIn: "", guests: "2" });

  const book = () => {
    toast({
      title: "Booking requested!",
      description: `${selected?.name} booking confirmed (demo). We'll call you to finalise.`,
      variant: "success",
    });
    setSelected(null);
    setForm({ name: "", checkIn: "", guests: "2" });
  };

  return (
    <div>
      <PageHero
        title="Luxury Farm Tourism & Eco-Resort"
        subtitle="Wake up to lakeside cottages, fresh fish thalis and golden Thar sunsets. Curated experiences for families, students and teams."
        image={IMAGES.resort}
      />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {RESORT_PACKAGES.map((pkg) => (
            <Card key={pkg.id} className="group overflow-hidden p-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {pkg.popular && (
                  <Badge variant="gold" className="absolute right-3 top-3 shadow">
                    Most Popular
                  </Badge>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                  <h3 className="text-2xl font-extrabold text-white">{pkg.name}</h3>
                  <div className="mt-1 flex items-center gap-4 text-sm text-white/85">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {pkg.duration}
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {pkg.facilities.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-foreground/90"
                    >
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-extrabold text-primary">
                      {formatCurrency(pkg.price)}
                    </p>
                    <p className="text-xs text-muted-foreground">per package</p>
                  </div>
                  <Button variant="gradient" size="lg" onClick={() => setSelected(pkg)}>
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {selected?.name}</DialogTitle>
            <DialogDescription>
              {selected?.duration} · {selected && formatCurrency(selected.price)}.
              Fill in your details to request a booking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="bname">Full Name</Label>
              <Input
                id="bname"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkin">
                  <CalendarDays className="mr-1 inline h-4 w-4" /> Check-in
                </Label>
                <Input
                  id="checkin"
                  type="date"
                  value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">
                  <Users className="mr-1 inline h-4 w-4" /> Guests
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button variant="gradient" onClick={book} disabled={!form.name || !form.checkIn}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
