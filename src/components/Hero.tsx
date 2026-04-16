"use client";

import { MapPin, Sofa, CalendarDays, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import { MotionFadeUp, MotionStagger, MotionStaggerItem } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  const { t } = useT();

  const trustBadges = [
    { icon: MapPin, label: t.hero.trust.location },
    { icon: Sofa, label: t.hero.trust.furnished },
    { icon: CalendarDays, label: t.hero.trust.rental },
    { icon: ShieldCheck, label: t.hero.trust.safe },
  ];

  return (
    <section id="anasayfa" className="relative min-h-[100svh] overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <img
          src="/galeri/large/DSC_8245.jpg"
          alt="Muğla 48 Residence"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      <div className="container-page relative flex min-h-[100svh] items-center">
        <div className="w-full py-28 md:py-36">
          <div className="max-w-3xl">
            <MotionFadeUp delay={0}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-white/90">
                  {t.hero.eyebrow}
                </span>
              </div>
            </MotionFadeUp>

            <MotionFadeUp delay={0.08}>
              <h1 className="mt-7 font-[family-name:var(--font-display)] text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                {t.hero.title1}
                <br />
                <span className="text-gradient">{t.hero.title2}</span>
              </h1>
            </MotionFadeUp>

            <MotionFadeUp delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {t.hero.subtitle}
              </p>
            </MotionFadeUp>

            <MotionFadeUp delay={0.24}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#daireler" className="btn btn-accent group">
                  {t.hero.ctaPrimary}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light"
                >
                  <MessageCircle size={16} />
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </MotionFadeUp>

            <MotionFadeUp delay={0.32}>
              <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  { value: "1+1 · 2+1", label: t.hero.stats.types },
                  { value: "45–90 m²", label: t.hero.stats.area },
                  { value: "4", label: t.hero.stats.models },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="tabular font-[family-name:var(--font-display)] text-2xl font-semibold text-white sm:text-3xl">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[0.6875rem] uppercase tracking-[0.22em] text-white/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </MotionFadeUp>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-primary/70 backdrop-blur-md">
        <div className="container-page py-5">
          <MotionStagger className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trustBadges.map((badge) => (
              <MotionStaggerItem key={badge.label}>
                <div className="flex items-center gap-2.5">
                  <badge.icon className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-[0.8125rem] font-medium text-white/85">
                    {badge.label}
                  </span>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
