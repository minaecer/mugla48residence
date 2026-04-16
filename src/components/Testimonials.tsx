"use client";

import { Star, ExternalLink } from "lucide-react";
import { MotionFadeUp } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";

export default function Testimonials() {
  const { t } = useT();

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

        {/* Google Reviews Embed */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-cream">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d28.3667!3d37.2153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMugla48+Residence!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              className="aspect-[16/9] w-full border-0 sm:aspect-[2/1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mugla 48 Residence Google Yorumları"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJN1t_tDEFskARo591FglHkAo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Google Yorumlarını Gör
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
