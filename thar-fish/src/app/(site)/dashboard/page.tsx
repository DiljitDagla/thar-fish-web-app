"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IMAGES, GALLERY } from "@/lib/images";
import {
  COMPANY,
  NEWS,
  STATS,
  TESTIMONIALS,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import {
  ArrowRight,
  Building2,
  Droplets,
  Fish,
  FlaskConical,
  Hotel,
  MapPin,
  Quote,
  Sparkles,
  Star,
  TreePalm,
  Users,
  Waves,
} from "lucide-react";

const SERVICES = [
  { icon: Fish, title: "Fish Farming", desc: "Scientifically managed grow-out ponds delivering premium carp, tilapia and more.", href: "/marketplace" },
  { icon: Droplets, title: "Hatchery Services", desc: "Quality fish seed and fingerlings produced in controlled biosecure hatcheries.", href: "/consultancy" },
  { icon: FlaskConical, title: "Fish Consultancy", desc: "Expert advisory on pond design, water quality and disease management.", href: "/consultancy" },
  { icon: Hotel, title: "Resort Stay", desc: "Lakeside cottages and luxury tents for an unforgettable desert getaway.", href: "/tourism" },
  { icon: TreePalm, title: "Guided Farm Tours", desc: "Immersive educational tours of our hatcheries, ponds and infrastructure.", href: "/tourism" },
];

const QUICK_STATS = [
  { icon: Waves, label: "Active Fish Ponds", value: STATS.activePonds, suffix: "" },
  { icon: Fish, label: "Fish Species", value: STATS.fishSpecies, suffix: "" },
  { icon: Building2, label: "Annual Production", value: STATS.annualProduction, suffix: "" },
  { icon: Users, label: "Tourist Visits", value: STATS.touristVisits, suffix: "/yr" },
];

export default function DashboardPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image
          src={IMAGES.heroFarm}
          alt="Thar Fish farm banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-chart-2/60" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <MapPin className="h-4 w-4 text-gold" />
              {COMPANY.location}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Sustainable Aquaculture &amp; Desert Eco-Tourism
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              From hatchery to harvest to a lakeside resort — {COMPANY.short}{" "}
              brings premium fish farming and unforgettable farm experiences to
              Bikaner, Rajasthan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/marketplace">
                <Button variant="gold" size="lg">
                  Shop Fresh Fish <ArrowRight />
                </Button>
              </Link>
              <Link href="/tourism">
                <Button
                  size="lg"
                  className="bg-white/15 text-white backdrop-blur hover:bg-white/25"
                >
                  Explore the Resort
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {QUICK_STATS.map((s) => (
            <Card key={s.label} className="border-none shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">
                    {s.value}
                    <span className="text-base text-muted-foreground">{s.suffix}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="What We Do"
          title="Featured Services"
          subtitle="An end-to-end aquaculture ecosystem — from breeding to your plate, and a resort to relax in."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.title} href={s.href}>
              <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Gallery"
            title="Life at Thar Fish"
            subtitle="A glimpse into our hatcheries, ponds, resort and the people who make it thrive."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY.slice(0, 8).map((g, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={g.src}
                  alt={g.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <Badge variant="gold" className="mb-1">{g.category}</Badge>
                  <p className="text-sm font-medium text-white">{g.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/gallery">
              <Button variant="outline" size="lg">
                View Full Gallery <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by Farmers & Guests"
          subtitle="Hear from the community we serve across western Rajasthan."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="relative overflow-hidden">
              <CardContent className="p-7">
                <Quote className="h-9 w-9 text-secondary" />
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar className="border-2 border-secondary">
                    <AvatarFallback>{t.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Newsroom"
            title="Latest News & Updates"
            subtitle="Milestones, programs and recognition from the farm."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {NEWS.map((n) => (
              <Card key={n.title} className="group overflow-hidden p-0">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    {formatDate(n.date)}
                  </p>
                  <h3 className="mt-2 font-bold leading-snug">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-chart-2 px-8 py-14 text-center text-white">
          <Sparkles className="absolute left-8 top-8 h-10 w-10 text-white/20" />
          <Fish className="absolute bottom-8 right-8 h-12 w-12 text-white/20" />
          <h2 className="text-3xl font-extrabold text-balance sm:text-4xl">
            Ready to start your aquaculture journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Whether you want fresh fish, expert consultancy, or a relaxing
            resort stay — we&apos;re here to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="gold" size="lg">
                Contact Us <ArrowRight />
              </Button>
            </Link>
            <Link href="/consultancy">
              <Button
                size="lg"
                className="bg-white/15 text-white backdrop-blur hover:bg-white/25"
              >
                Request Consultancy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
