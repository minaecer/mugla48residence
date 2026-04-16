"use client";

import {
  MapPin,
  Sparkles,
  CalendarRange,
  SprayCan,
  Crown,
  HeadphonesIcon,
} from "lucide-react";
import { MotionFadeUp, MotionStagger, MotionStaggerItem } from "./MotionWrapper";
import { getIcon } from "@/lib/icon-map";
import { useT } from "@/lib/i18n/context";

const defaultIcons = [MapPin, Sparkles, CalendarRange, SprayCan, Crown, HeadphonesIcon];

type FeatureProp = {
  icon: string;
  title: string;
  description: string;
};

export default function Features({ features: featuresProp }: { features?: FeatureProp[] }) {
  const { t, locale } = useT();

  const useDbData = locale !== "en" && featuresProp && featuresProp.length > 0;

  const resolvedFeatures = useDbData
    ? featuresProp!.map((f) => ({
        icon: getIcon(f.icon),
        title: f.title,
        description: f.description,
      }))
    : t.features.list.map((f, i) => ({
        icon: defaultIcons[i] || MapPin,
        title: f.title,
        description: f.description,
      }));

  return (
    <section className="section-padding bg-cream">
      <div className="container-page">
        <MotionFadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t.features.eyebrow}</span>
            <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.5rem]">
              {t.features.title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              {t.features.subtitle}
            </p>
          </div>
        </MotionFadeUp>

        <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {resolvedFeatures.map((feature, i) => (
            <MotionStaggerItem key={feature.title}>
              <div className="group relative h-full rounded-2xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_14px_40px_-22px_rgba(20,19,18,0.18)]">
                <span className="tabular absolute right-6 top-6 text-[0.75rem] font-semibold tracking-[0.22em] text-muted/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-primary">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
