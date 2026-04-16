"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";

export default function CtaBand() {
  const { t } = useT();
  return (
    <section className="cta-band relative overflow-hidden">
      <div className="container-page py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-5 md:items-end">
          <div className="md:col-span-3">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-accent">
              {t.ctaBand.eyebrow}
            </span>
            <h2 className="heading-display mt-4 text-3xl text-white sm:text-[2.25rem] md:text-[2.5rem]">
              {t.ctaBand.title}
            </h2>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/65">
              {t.ctaBand.subtitle}
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-6 py-4 text-[0.9375rem] font-semibold !text-white transition-all hover:bg-accent-dark hover:shadow-[0_16px_40px_-12px_rgba(176,138,82,0.55)]"
            >
              <MessageCircle size={18} className="text-white" />
              <span className="text-white">{t.ctaBand.ctaWa}</span>
            </a>
            <a
              href={siteConfig.phoneHref}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/5 px-6 py-4 text-[0.9375rem] font-semibold !text-white transition-all hover:border-accent/60 hover:bg-white/10"
            >
              <Phone size={18} className="text-white" />
              <span className="text-white">{t.ctaBand.ctaCall}</span>
            </a>
            <p className="text-center text-[0.75rem] text-white/45 md:text-left">
              {t.ctaBand.hours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
