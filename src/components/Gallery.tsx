"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MotionFadeUp, MotionStagger, MotionStaggerItem } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";

type GalleryItem = {
  title: string;
  category: string;
  span: string;
  imageUrl?: string;
};

const defaultGalleryItems: GalleryItem[] = [
  { title: "Modern Salon", category: "İç Mekan", span: "md:col-span-2 md:row-span-2" },
  { title: "Şık Yatak Odası", category: "Yatak Odası", span: "" },
  { title: "Tam Donanımlı Mutfak", category: "Mutfak", span: "" },
  { title: "Ferah Banyo", category: "Banyo", span: "" },
  { title: "Bina Dış Cephe", category: "Dış Mekan", span: "md:col-span-2" },
];

export default function Gallery({ items }: { items?: GalleryItem[] }) {
  const { t, locale } = useT();
  const galleryItems = items && items.length > 0 ? items : defaultGalleryItems;

  const translateCategory = (cat: string): string => {
    if (locale !== "en") return cat;
    const map = t.gallery.categories as Record<string, string>;
    return map[cat] ?? cat;
  };

  return (
    <section id="galeri" className="section-padding bg-cream">
      <div className="container-page">
        {/* Header */}
        <MotionFadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t.gallery.eyebrow}</span>
            <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.5rem]">
              {t.gallery.title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              {t.gallery.subtitle}
            </p>
          </div>
        </MotionFadeUp>

        {/* Gallery Grid */}
        <MotionStagger className="mt-16 grid auto-rows-[220px] grid-flow-row-dense grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
          {galleryItems.map((item) => (
            <MotionStaggerItem key={item.title} className={item.span}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-stone/30 to-light-gray">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                      <span className="font-[family-name:var(--font-display)] text-xl font-bold text-primary/30">
                        {item.title}
                      </span>
                    </div>
                  </>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/70 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {translateCategory(item.category)}
                  </span>
                  <span className="mt-1 text-lg font-bold text-white">
                    {item.title}
                  </span>
                </div>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        {/* See All */}
        <div className="mt-12 text-center">
          <Link href="/galeri" className="btn btn-ghost">
            {t.gallery.seeAll}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
