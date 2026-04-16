"use client";

import { Clock, CalendarDays, CalendarRange, CalendarCheck } from "lucide-react";
import { MotionFadeUp, MotionStagger, MotionStaggerItem } from "./MotionWrapper";
import { getIcon } from "@/lib/icon-map";
import { useT } from "@/lib/i18n/context";

const defaultIcons = [Clock, CalendarDays, CalendarRange, CalendarCheck];
// The middle (monthly) is highlighted
const highlightIndex = 2;

type ModelProp = {
  icon: string;
  title: string;
  description: string;
  highlight: boolean;
};

export default function RentalModels({ models: modelsProp }: { models?: ModelProp[] }) {
  const { t, locale } = useT();

  const useDbData = locale !== "en" && modelsProp && modelsProp.length > 0;

  const resolvedModels = useDbData
    ? modelsProp!.map((m) => ({
        icon: getIcon(m.icon),
        title: m.title,
        description: m.description,
        highlight: m.highlight,
      }))
    : t.rental.list.map((m, i) => ({
        icon: defaultIcons[i] || Clock,
        title: m.title,
        description: m.description,
        highlight: i === highlightIndex,
      }));

  return (
    <section className="section-padding bg-cream">
      <div className="container-page">
        <MotionFadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t.rental.eyebrow}</span>
            <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.5rem]">
              {t.rental.title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              {t.rental.subtitle}
            </p>
          </div>
        </MotionFadeUp>

        <MotionStagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {resolvedModels.map((model) => (
            <MotionStaggerItem key={model.title}>
              <div
                className={`group relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5 ${
                  model.highlight
                    ? "border border-primary bg-primary text-white shadow-[0_20px_45px_-20px_rgba(20,19,18,0.45)]"
                    : "border border-line bg-white hover:border-accent/40 hover:shadow-[0_14px_40px_-22px_rgba(20,19,18,0.18)]"
                }`}
              >
                {model.highlight && (
                  <div className="absolute top-5 right-5 rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-white">
                    {t.rental.popular}
                  </div>
                )}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    model.highlight
                      ? "bg-white/10 text-accent"
                      : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                  }`}
                >
                  <model.icon className="h-5 w-5" />
                </div>
                <h3
                  className={`mt-6 font-[family-name:var(--font-display)] text-[1.375rem] font-semibold ${
                    model.highlight ? "text-white" : "text-primary"
                  }`}
                >
                  {model.title}
                </h3>
                <p
                  className={`mt-3 text-[0.9375rem] leading-relaxed ${
                    model.highlight ? "text-white/75" : "text-muted"
                  }`}
                >
                  {model.description}
                </p>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        <MotionFadeUp delay={0.3}>
          <div className="mt-14 text-center">
            <a href="#iletisim" className="btn btn-primary">
              {t.rental.ctaBottom}
            </a>
          </div>
        </MotionFadeUp>
      </div>
    </section>
  );
}
