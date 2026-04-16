"use client";

import Link from "next/link";
import { Users, Maximize, ArrowRight, Check } from "lucide-react";
import { MotionFadeUp, MotionSlideIn } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";

type ApartmentTypeItem = {
  slug: string;
  type: string;
  description: string;
  size: string;
  capacity: string;
  features: string[];
  accent: string;
};

const coverImages: Record<string, string> = {
  "1-plus-1": "/galeri/large/Junior4.jpg",
  "2-plus-1": "/galeri/large/DUBLEX_MERDVEN.jpg",
};

export default function ApartmentTypes({ apartments: apartmentsProp }: { apartments?: ApartmentTypeItem[] }) {
  const { t, locale } = useT();

  // Build fallback + EN-override-aware list
  const fallback: ApartmentTypeItem[] = [
    {
      slug: "1-plus-1",
      type: t.apartments.one.type,
      description: t.apartments.one.description,
      size: t.apartments.one.size,
      capacity: t.apartments.one.capacity,
      features: [...t.apartments.one.features],
      accent: "from-accent/20 to-accent/5",
    },
    {
      slug: "2-plus-1",
      type: t.apartments.two.type,
      description: t.apartments.two.description,
      size: t.apartments.two.size,
      capacity: t.apartments.two.capacity,
      features: [...t.apartments.two.features],
      accent: "from-primary/10 to-primary/5",
    },
  ];

  // When locale === "en", override DB-provided TR fields with dictionary translations matched by slug.
  const apartments =
    apartmentsProp && apartmentsProp.length > 0
      ? apartmentsProp.map((apt) => {
          if (locale !== "en") return apt;
          const override =
            apt.slug === "1-plus-1" ? t.apartments.one :
            apt.slug === "2-plus-1" ? t.apartments.two :
            null;
          if (!override) return apt;
          return {
            ...apt,
            type: override.type,
            description: override.description,
            size: override.size,
            capacity: override.capacity,
            features: [...override.features],
          };
        })
      : fallback;

  return (
    <section id="daireler" className="section-padding bg-white">
      <div className="container-page">
        <MotionFadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t.apartments.eyebrow}</span>
            <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.75rem]">
              {t.apartments.title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              {t.apartments.subtitle}
            </p>
          </div>
        </MotionFadeUp>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {apartments.map((apt, index) => {
            const cover = coverImages[apt.slug];
            return (
              <MotionSlideIn key={apt.slug} direction={index === 0 ? "left" : "right"}>
                <article className="group card overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {cover ? (
                      <img
                        src={cover}
                        alt={apt.type}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${apt.accent}`} />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-primary/70 via-primary/25 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.75rem] font-semibold text-primary backdrop-blur">
                        <Maximize size={12} />
                        {apt.size}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.75rem] font-semibold text-primary backdrop-blur">
                        <Users size={12} />
                        {apt.capacity}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                      <span className="inline-flex items-center rounded-full border border-white/30 bg-primary/50 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
                        {t.apartments.premium}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                        {t.apartments.priceContact}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="heading-display text-2xl sm:text-[1.75rem]">{apt.type}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{apt.description}</p>

                    <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {apt.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[0.875rem] text-primary/80">
                          <Check size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.5} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                      <Link
                        href={`/daireler/${apt.slug}`}
                        className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-primary transition-colors hover:text-accent"
                      >
                        {t.apartments.viewDetails}
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                      <a
                        href={siteConfig.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.8125rem] font-medium text-muted transition-colors hover:text-accent"
                      >
                        {t.apartments.askPrice} →
                      </a>
                    </div>
                  </div>
                </article>
              </MotionSlideIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
