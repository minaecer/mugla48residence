"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/#anasayfa", label: t.nav.home },
    { href: "/#daireler", label: t.nav.apartments },
    { href: "/#olanaklar", label: t.nav.amenities },
    { href: "/#galeri", label: t.nav.gallery },
    { href: "/#lokasyon", label: t.nav.location },
    { href: "/#hakkimizda", label: t.nav.about },
    { href: "/#iletisim", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b bg-white transition-all duration-300 ${
        scrolled
          ? "border-line shadow-[0_1px_0_rgba(20,19,18,0.04)]"
          : "border-transparent"
      }`}
    >
      <div className="container-page">
        <div className={`flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex items-center">
            <img
              src="/logo.jpg"
              alt="Muğla 48 Residence"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-9" : "h-11"}`}
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.8125rem] font-medium tracking-wide text-primary/80 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[0.8125rem] font-medium text-primary transition-colors hover:text-accent"
            >
              <Phone size={14} />
              {t.nav.call}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-[0.8125rem] font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-[0_6px_18px_-6px_rgba(176,138,82,0.6)]"
            >
              <MessageCircle size={14} />
              {t.nav.inquiry}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-primary transition-colors lg:hidden"
            aria-label={t.nav.menu}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="glass border-t border-line lg:hidden">
          <nav className="container-page py-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-primary transition-colors hover:bg-cream hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-3 border-line" />
              <div className="flex items-center justify-between px-3">
                <LanguageToggle />
              </div>
              <hr className="my-3 border-line" />
              <div className="flex flex-col gap-3">
                <a href={siteConfig.phoneHref} className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-primary">
                  <Phone size={18} />
                  {t.nav.callNow}
                </a>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-base font-semibold text-white"
                >
                  <MessageCircle size={18} />
                  {t.nav.whatsappInquiry}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
