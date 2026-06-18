"use client";

import Image from "next/image";
import { PageHero, SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY, TIMELINE, STATS, IMAGES } from "@/lib/data";
import {
  Eye,
  Leaf,
  Recycle,
  Sun,
  Target,
  Droplets,
} from "lucide-react";

const SUSTAINABILITY = [
  { icon: Sun, title: "Solar-Powered Aeration", text: "Renewable energy drives our pond aerators and pumps, cutting carbon and running costs." },
  { icon: Recycle, title: "Water Recirculation", text: "Biofloc and recirculating systems reuse water, critical for desert conservation." },
  { icon: Leaf, title: "Zero-Waste Feeding", text: "Precision feeding minimises waste and protects pond water quality." },
  { icon: Droplets, title: "Rainwater Harvesting", text: "Every monsoon drop is captured to sustain ponds through dry months." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About Thar Fish"
        subtitle="A family farm in Raner, Bikaner that grew into Rajasthan's trusted name in aquaculture, consultancy and eco-tourism."
        image={IMAGES.pondAerial}
      />

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Story */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image src={IMAGES.hatchery} alt="Our farm" fill className="object-cover" />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="From One Pond to a Thriving Ecosystem"
            />
            <p className="mt-4 text-muted-foreground">
              {COMPANY.name} began in 2009 with a single one-acre pond and a
              simple belief: that the Thar desert could become an unlikely home
              for thriving aquaculture. Through years of experimentation,
              science and grit, the Rathore family transformed arid land into a
              network of productive ponds and a modern hatchery.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today we produce over 1,200 tonnes of fish annually, supply
              quality seed across the region, advise hundreds of farms, and
              welcome thousands of visitors to our lakeside eco-resort — all
              while championing water conservation in one of India&apos;s
              driest regions.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["15+", "Years"],
                [STATS.activePonds, "Ponds"],
                ["200+", "Farms Advised"],
                [STATS.touristVisits, "Visitors/yr"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border bg-card p-4 text-center">
                  <p className="text-2xl font-extrabold text-primary">{v}</p>
                  <p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-primary to-chart-2 text-white">
            <CardContent className="p-8">
              <Target className="h-10 w-10 text-gold" />
              <h3 className="mt-4 text-2xl font-extrabold">Our Mission</h3>
              <p className="mt-3 text-white/85">
                To make sustainable aquaculture accessible and profitable for
                every farmer in arid India, while delivering fresh, healthy fish
                and memorable farm experiences.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-sidebar text-sidebar-foreground">
            <CardContent className="p-8">
              <Eye className="h-10 w-10 text-sidebar-primary" />
              <h3 className="mt-4 text-2xl font-extrabold">Our Vision</h3>
              <p className="mt-3 text-sidebar-foreground/85">
                To be the leading model of water-positive, technology-driven
                desert aquaculture — inspiring a blue revolution across
                Rajasthan and beyond.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Our Journey"
            title="Milestones Over the Years"
          />
          <div className="relative mt-12 space-y-8 before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-border md:before:left-1/2">
            {TIMELINE.map((t, i) => (
              <div
                key={t.year}
                className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2" />
                <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground md:left-1/2">
                  {i + 1}
                </div>
                <Card className="ml-10 md:ml-0 md:w-1/2">
                  <CardContent className="p-6">
                    <p className="text-sm font-bold text-primary">{t.year}</p>
                    <h4 className="mt-1 font-bold">{t.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Responsibility"
            title="Sustainability Practices"
            subtitle="Conserving water and energy is not optional in the desert — it's at the core of everything we do."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUSTAINABILITY.map((s) => (
              <Card key={s.title} className="text-center">
                <CardContent className="p-7">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h4 className="mt-4 font-bold">{s.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
