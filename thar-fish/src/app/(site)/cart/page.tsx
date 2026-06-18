"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

export default function CartPage() {
  const { items, total, setQty, remove, clear } = useCart();
  const { toast } = useToast();
  const [placed, setPlaced] = useState(false);

  const gst = Math.round(total * 0.05);
  const delivery = total > 0 ? 250 : 0;
  const grand = total + gst + delivery;

  const checkout = () => {
    setPlaced(true);
    clear();
    toast({
      title: "Order placed!",
      description: "Your fish order has been confirmed (demo).",
      variant: "success",
    });
  };

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">Order Confirmed!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for your order. Our team will reach out shortly to schedule
          fresh delivery from the farm.
        </p>
        <Link href="/marketplace" className="mt-8">
          <Button variant="gradient" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Browse our marketplace and add some fresh fish to get started.
        </p>
        <Link href="/marketplace" className="mt-8">
          <Button variant="gradient" size="lg">
            Go to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-extrabold">Shopping Cart</h1>
      <p className="mt-1 text-muted-foreground">
        {items.length} item{items.length > 1 ? "s" : ""} in your cart
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="flex gap-4 p-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.product.category} · ₹{item.product.price}/kg
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-lg border p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setQty(item.product.id, item.qty - 1)}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-10 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setQty(item.product.id, item.qty + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <p className="font-bold">
                      {formatCurrency(item.qty * item.product.price)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <div className="mt-4 space-y-3 text-sm">
                <Row label="Subtotal" value={formatCurrency(total)} />
                <Row label="GST (5%)" value={formatCurrency(gst)} />
                <Row label="Delivery" value={formatCurrency(delivery)} />
                <Separator />
                <div className="flex justify-between text-base font-extrabold">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(grand)}</span>
                </div>
              </div>
              <Button
                variant="gradient"
                size="lg"
                className="mt-6 w-full"
                onClick={checkout}
              >
                Place Order
              </Button>
              <Link href="/marketplace">
                <Button variant="ghost" className="mt-2 w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
