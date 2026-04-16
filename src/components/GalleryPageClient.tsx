"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeUp } from "@/components/MotionWrapper";
import GalleryLightbox from "@/components/GalleryLightbox";
import { useT } from "@/lib/i18n/context";

type GalleryItem = {
  title: string;
  category: string;
  imageUrl?: string;
  height?: string;
};

const defaultGalleryImages: GalleryItem[] = [
  { title: "Modern Salon", category: "İç Mekan", height: "h-72" },
  { title: "Yatak Odası", category: "Yatak Odası", height: "h-56" },
  { title: "Tam Donanımlı Mutfak", category: "Mutfak", height: "h-64" },
  { title: "Ferah Banyo", category: "Banyo", height: "h-56" },
];

export default function GalleryPageClient({ items }: { items?: GalleryItem[] }) {
  const { t, locale } = useT();
  const galleryImages = items && items.length > 0 ? items : defaultGalleryImages;

  const translateCategory = (cat: string): string => {
    if (locale !== "en") return cat;
    const map = t.gallery.categories as Record<string, string>;
    return map[cat] ?? cat;
  };

  const allCategories = Array.from(new Set(galleryImages.map((img) => img.category)));
  const categories = [t.gallery.all, ...allCategories];

  const [activeCategory, setActiveCategory] = useState(t.gallery.all);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categoryFiltered =
    activeCategory === t.gallery.all
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const filtered = [...categoryFiltered].sort((a, b) => {
    const aFeat = a.imageUrl?.includes("DUBLEX_MERDVEN.jpg") ? -1 : 0;
    const bFeat = b.imageUrl?.includes("DUBLEX_MERDVEN.jpg") ? -1 : 0;
    return aFeat - bFeat;
  });

  const lightboxItems = filtered.map((img) => ({
    title: img.title,
    category: translateCategory(img.category),
    imageUrl: img.imageUrl,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-28">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/galeri/large/LOB.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/85 to-primary" />
        </div>
        <MotionFadeUp>
          <div className="container-page relative text-center">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-accent">
              {t.gallery.eyebrow}
            </span>
            <h1 className="heading-display mt-4 text-4xl text-white sm:text-5xl md:text-[3.5rem]">
              {t.gallery.pageTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/65">
              {t.gallery.pageSubtitle}
            </p>
          </div>
        </MotionFadeUp>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="container-page py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-[0.8125rem] font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "border border-line bg-white text-primary/70 hover:border-accent/40 hover:text-accent"
                }`}
              >
                {cat === t.gallery.all ? cat : translateCategory(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid auto-rows-[180px] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:auto-rows-[220px]">
            {filtered.map((img, i) => {
              const isFeatured = img.imageUrl?.includes("DUBLEX_MERDVEN.jpg");
              const spanClass = isFeatured ? "md:col-span-2 md:row-span-2" : "";
              return (
                <motion.div
                  key={`${img.title}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.4) }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_1px_2px_rgba(20,19,18,0.04)] transition-all hover:border-accent/40 hover:shadow-[0_14px_40px_-22px_rgba(20,19,18,0.2)] ${spanClass}`}
                  onClick={() => setLightboxIndex(i)}
                >
                  {img.imageUrl ? (
                    <Image
                      src={(isFeatured ? img.imageUrl : img.imageUrl.replace("/galeri/large/", "/galeri/thumb/"))}
                      alt={img.title}
                      fill
                      sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-primary/20">
                        {img.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/75 via-primary/25 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-accent">
                      {translateCategory(img.category)}
                    </span>
                    <span className="mt-1 font-[family-name:var(--font-display)] text-base font-semibold text-white">
                      {img.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : filtered.length - 1)
          }
          onNext={() =>
            setLightboxIndex(lightboxIndex < filtered.length - 1 ? lightboxIndex + 1 : 0)
          }
          labels={t.gallery.lightbox}
        />
      )}
    </>
  );
}
