"use client";

import {
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Landmark,
  Bus,
  MapPin,
  Navigation,
} from "lucide-react";
import { MotionSlideIn } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";

const placeIcons = [GraduationCap, Stethoscope, ShoppingBag, Landmark, Bus, MapPin];

export default function Location() {
  const { t } = useT();
  const places = t.location.places.map((p, i) => ({ ...p, icon: placeIcons[i] || MapPin }));

  return (
    <section id="lokasyon" className="section-padding bg-white">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <MotionSlideIn direction="left">
            <div>
              <span className="eyebrow">{t.location.eyebrow}</span>
              <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.5rem]">
                {t.location.title}
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">
                {t.location.subtitle}
              </p>

              <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-cream">
                {places.map((place) => (
                  <div key={place.label} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-accent">
                      <place.icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1 text-[0.9375rem] font-medium text-primary">
                      {place.label}
                    </span>
                    <span className="text-[0.8125rem] font-semibold tracking-wide text-accent">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=Muğla+Menteşe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-8"
              >
                <Navigation size={16} />
                {t.location.getDirections}
              </a>
            </div>
          </MotionSlideIn>

          <MotionSlideIn direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_14px_40px_-22px_rgba(20,19,18,0.18)]">
              <iframe
                title="Muğla 48 Residence"
                src="https://www.google.com/maps?q=Mu%C4%9Fla%20Mente%C5%9Fe&output=embed"
                className="aspect-square w-full lg:aspect-[4/5]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-line bg-white/95 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-[0.8125rem] font-semibold text-primary">{t.location.mapLabel}</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Muğla+Menteşe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.75rem] font-semibold text-accent hover:text-accent-dark"
                >
                  {t.location.mapExpand} →
                </a>
              </div>
            </div>
          </MotionSlideIn>
        </div>
      </div>
    </section>
  );
}
