"use client";

import { Star, Quote } from "lucide-react";
import { MotionFadeUp, MotionStagger, MotionStaggerItem } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";

type TestimonialItem = {
  name: string;
  role: string;
  rating: number;
  text: string;
  theme?: string;
};

export default function Testimonials({ testimonials: testimonialsProp }: { testimonials?: TestimonialItem[] }) {
  const { t, locale } = useT();

  const useDbData = locale !== "en" && testimonialsProp && testimonialsProp.length > 0;

  const testimonials: TestimonialItem[] = useDbData
    ? testimonialsProp!
    : t.testimonials.list.map((item) => ({ ...item, rating: 5 }));

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <MotionFadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t.testimonials.eyebrow}</span>
            <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.5rem]">
              {t.testimonials.title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              {t.testimonials.subtitle}
            </p>
            <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-line bg-cream px-5 py-2.5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-[0.875rem] font-semibold text-primary tabular">5.0 / 5</span>
              <span className="h-4 w-px bg-line" />
              <span className="text-[0.8125rem] text-muted tabular">{t.testimonials.ratingLabel}</span>
            </div>
          </div>
        </MotionFadeUp>

        <MotionStagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <MotionStaggerItem key={item.name}>
              <figure className="relative flex h-full flex-col justify-between rounded-2xl border border-line bg-cream p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white hover:shadow-[0_14px_40px_-22px_rgba(20,19,18,0.18)]">
                <Quote className="h-7 w-7 text-accent/30" strokeWidth={1.5} />

                <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-primary/85">
                  &ldquo;{item.text}&rdquo;
                </blockquote>

                <div className="mt-5 flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>

                <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-5">
                  <div>
                    <p className="text-[0.875rem] font-semibold text-primary">{item.name}</p>
                    <p className="mt-0.5 text-[0.75rem] text-muted">{item.role}</p>
                  </div>
                  {item.theme && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-accent">
                      {item.theme}
                    </span>
                  )}
                </figcaption>
              </figure>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
