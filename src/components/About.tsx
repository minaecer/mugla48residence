"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ShieldCheck, Award, Heart } from "lucide-react";
import { MotionSlideIn } from "./MotionWrapper";
import { getIcon } from "@/lib/icon-map";
import { useT } from "@/lib/i18n/context";

type AboutContent = {
  title: string;
  text1: string;
  text2: string;
  values: Array<{ icon: string; label: string }>;
};

export default function About({ content }: { content?: AboutContent }) {
  const { t, locale } = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // When EN, always use dictionary. When TR, prefer DB content.
  const title = locale === "en" ? t.about.title : content?.title ?? t.about.title;
  const text1 = locale === "en" ? t.about.text1 : content?.text1 ?? t.about.text1;
  const text2 = locale === "en" ? t.about.text2 : content?.text2 ?? t.about.text2;

  const useDbValues = locale !== "en" && content?.values && content.values.length > 0;

  return (
    <section id="hakkimizda" ref={ref} className="section-padding bg-cream">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MotionSlideIn direction="left">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-24px_rgba(20,19,18,0.24)]">
              <motion.div style={{ y: parallaxY }} className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
                <img
                  src="/galeri/large/Junior4.jpg"
                  alt="Muğla 48 Residence"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-[1.05] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </motion.div>
              <div className="absolute bottom-6 right-6 rounded-xl border border-white/40 bg-white/95 p-4 shadow-[0_12px_30px_-10px_rgba(20,19,18,0.3)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-primary">{t.about.badge}</p>
                    <p className="text-[0.6875rem] uppercase tracking-wider text-muted">{t.about.badgeSub}</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionSlideIn>

          <MotionSlideIn direction="right">
            <div>
              <span className="eyebrow">{t.about.eyebrow}</span>
              <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.5rem]">{title}</h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">{text1}</p>
              <p className="mt-4 leading-relaxed text-muted">{text2}</p>

              <div className="mt-10 grid grid-cols-3 gap-4 rounded-xl border border-line bg-white p-5">
                {[
                  { v: "100%", l: t.about.stats.furnished },
                  { v: "24/7", l: t.about.stats.support },
                  { v: "★ 5.0", l: t.about.stats.rating },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="tabular font-[family-name:var(--font-display)] text-xl font-semibold text-primary sm:text-2xl">{s.v}</div>
                    <div className="mt-1 text-[0.6875rem] uppercase tracking-wider text-muted">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {useDbValues ? (
                  content!.values.map((v) => {
                    const Icon = getIcon(v.icon);
                    return (
                      <div key={v.label} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[0.9375rem] font-semibold text-primary">{v.label}</span>
                      </div>
                    );
                  })
                ) : (
                  <>
                    {[
                      { Icon: ShieldCheck, label: t.about.values.trust },
                      { Icon: Award, label: t.about.values.quality },
                      { Icon: Heart, label: t.about.values.comfort },
                    ].map(({ Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[0.9375rem] font-semibold text-primary">{label}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </MotionSlideIn>
        </div>
      </div>
    </section>
  );
}
