"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PageHero } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { GALLERY, IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Hatchery",
  "Fish Ponds",
  "Fish Stock",
  "Resort",
  "Tourists",
  "Infrastructure",
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(
    null
  );

  const items = useMemo(
    () =>
      active === "All"
        ? GALLERY
        : GALLERY.filter((g) => g.category === active),
    [active]
  );

  return (
    <div>
      <PageHero
        title="Photo Gallery"
        subtitle="Explore our hatcheries, fish ponds, resort and the vibrant life across Thar Fish farm."
        image={IMAGES.infrastructure}
      />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === c
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((g, i) => (
            <button
              key={`${g.title}-${i}`}
              onClick={() => setLightbox(g)}
              className="group relative aspect-square overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <Image
                src={g.src}
                alt={g.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              {/* Always-on gradient so captions stay readable; deepens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/85" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <Badge
                  variant="gold"
                  className="mb-1.5 -translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {g.category}
                </Badge>
                <p className="text-sm font-semibold text-white drop-shadow-md">
                  {g.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">{lightbox?.title}</DialogTitle>
          {lightbox && (
            <>
              <div className="relative aspect-video w-full">
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold">{lightbox.title}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
