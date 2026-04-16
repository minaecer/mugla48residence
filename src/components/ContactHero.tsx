"use client";

import { MotionFadeUp } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";

export default function ContactHero() {
  const { t } = useT();
  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-28">
      <div className="absolute inset-0 opacity-30">
        <img src="/galeri/large/LOB.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/85 to-primary" />
      </div>
      <MotionFadeUp>
        <div className="container-page relative text-center">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-accent">
            {t.contact.eyebrow}
          </span>
          <h1 className="heading-display mt-4 text-4xl text-white sm:text-5xl md:text-[3.5rem]">
            {t.contact.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/65">
            {t.contact.heroSubtitle}
          </p>
        </div>
      </MotionFadeUp>
    </section>
  );
}
