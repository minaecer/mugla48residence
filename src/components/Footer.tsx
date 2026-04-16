"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const { t } = useT();

  const menu = [
    { href: "/#anasayfa", label: t.nav.home },
    { href: "/#daireler", label: t.nav.apartments },
    { href: "/#olanaklar", label: t.nav.amenities },
    { href: "/#galeri", label: t.nav.gallery },
    { href: "/#lokasyon", label: t.nav.location },
    { href: "/#hakkimizda", label: t.nav.about },
    { href: "/#iletisim", label: t.nav.contact },
  ];

  const legal = [
    { href: "/kvkk", label: t.footer.kvkk },
    { href: "/gizlilik", label: t.footer.privacy },
    { href: "/cerez", label: t.footer.cookies },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/logo-white.png"
                alt="Muğla 48 Residence"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/60">
              {t.footer.brandDesc}
            </p>
          </div>

          <div>
            <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t.footer.quick}
            </h4>
            <ul className="mt-5 space-y-3">
              {menu.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.875rem] text-white/65 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t.footer.contact}
            </h4>
            <ul className="mt-5 space-y-4">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-[0.875rem] text-white/65 transition-colors hover:text-accent">
                  <Phone size={15} />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.emailHref} className="flex items-center gap-3 text-[0.875rem] text-white/65 transition-colors hover:text-accent">
                  <Mail size={15} />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-[0.875rem] text-white/65">
                  <MapPin size={15} />
                  {siteConfig.address}
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t.footer.legal}
            </h4>
            <ul className="mt-5 space-y-3">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[0.875rem] text-white/65 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-[0.8125rem] text-white/45">
            &copy; {new Date().getFullYear()} Muğla 48 Residence. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
