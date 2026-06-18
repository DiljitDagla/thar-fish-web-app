"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PageHero } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/ui/toast";
import { FISH_PRODUCTS, IMAGES } from "@/lib/data";
import { FishProduct } from "@/lib/types";
import { Search, ShoppingCart, Star, Weight } from "lucide-react";

const availabilityVariant: Record<
  FishProduct["availability"],
  "success" | "warning" | "danger"
> = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
};

export default function MarketplacePage() {
  const { add } = useCart();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(FISH_PRODUCTS.map((f) => f.category)))],
    []
  );

  const products = useMemo(() => {
    let list = FISH_PRODUCTS.filter(
      (f) =>
        f.name.toLowerCase().includes(query.toLowerCase()) &&
        (category === "all" || f.category === category)
    );
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  const handleAdd = (p: FishProduct) => {
    add(p, 1);
    toast({
      title: "Added to cart",
      description: `${p.name} added to your cart.`,
      variant: "success",
    });
  };

  return (
    <div>
      <PageHero
        title="Fresh Fish Marketplace"
        subtitle="Farm-raised, sustainably grown freshwater fish — delivered fresh from our ponds to your table."
        image={IMAGES.fishUnderwater}
      />

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-sm md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search fish (Rohu, Katla, Tilapia…)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="md:w-56">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === "all" ? "All Categories" : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Showing {products.length} of {FISH_PRODUCTS.length} products
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card key={p.id} className="group overflow-hidden p-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge
                  variant={availabilityVariant[p.availability]}
                  className="absolute left-3 top-3"
                >
                  {p.availability}
                </Badge>
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  {p.rating.toFixed(1)}
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-primary">
                      ₹{p.price}
                    </p>
                    <p className="text-[11px] text-muted-foreground">per kg</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Weight className="h-3.5 w-3.5" /> {p.weight}
                  </span>
                  <span>· {p.quantity.toLocaleString("en-IN")} kg available</span>
                </div>
                <Button
                  onClick={() => handleAdd(p)}
                  variant="gradient"
                  className="mt-5 w-full"
                  disabled={p.availability === "Out of Stock"}
                >
                  <ShoppingCart /> Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
            No fish match your search.
          </div>
        )}
      </div>
    </div>
  );
}
