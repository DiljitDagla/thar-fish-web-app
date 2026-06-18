import Link from "next/link";
import { Logo } from "@/components/brand";
import { COMPANY } from "@/lib/data";
import { Mail, MapPin, Phone, Globe, MessageCircle, Send, Rss } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm text-sidebar-foreground/70">
            Premium fish hatchery, aquaculture consultancy and lakeside
            eco-resort in the heart of the Thar desert.
          </p>
          <div className="flex gap-3">
            {[Globe, MessageCircle, Send, Rss].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent transition-colors hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/60">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm text-sidebar-foreground/80">
            {[
              ["Marketplace", "/marketplace"],
              ["Tourism & Resort", "/tourism"],
              ["Consultancy", "/consultancy"],
              ["Gallery", "/gallery"],
              ["About Us", "/about"],
            ].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="hover:text-sidebar-primary">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/60">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm text-sidebar-foreground/80">
            <li>Fish Hatchery</li>
            <li>Fish Farming</li>
            <li>Fish Seed Production</li>
            <li>Water Quality Analysis</li>
            <li>Aquaculture Advisory</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/60">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-sidebar-foreground/80">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-sidebar-primary" />
              {COMPANY.location}
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-sidebar-primary" />
              {COMPANY.phone}
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-sidebar-primary" />
              {COMPANY.email}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sidebar-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-sidebar-foreground/60 sm:flex-row">
          <p>© 2026 {COMPANY.name}. All rights reserved.</p>
          <p>Made with care in Rajasthan · Demo build</p>
        </div>
      </div>
    </footer>
  );
}
