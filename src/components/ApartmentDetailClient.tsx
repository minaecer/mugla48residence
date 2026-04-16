"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Maximize,
  Users,
  Wifi,
  Wind,
  Tv,
  WashingMachine,
  Bath,
  Phone,
  MessageCircle,
  Send,
  Bed,
  Refrigerator,
  CookingPot,
  Shirt,
  ShieldCheck,
  Sparkles,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { MotionFadeUp, MotionSlideIn } from "./MotionWrapper";
import GalleryLightbox from "./GalleryLightbox";
import type { ApartmentData } from "@/lib/types";
import { useT } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";

const roomIconMap: Record<string, LucideIcon> = {
  Bed,
  Tv,
  Wind,
  Wifi,
};

const featureIcons: Record<string, LucideIcon> = {
  Buzdolabı: Refrigerator,
  "Büyük buzdolabı": Refrigerator,
  "Çamaşır makinesi": WashingMachine,
  "Bulaşık makinesi": WashingMachine,
  Duşakabin: Bath,
  "Geniş duşakabin": Bath,
  "Ocak & Fırın": CookingPot,
  "Ütü & ütü masası": Shirt,
};

export default function ApartmentDetailClient({ apt, slug }: { apt: ApartmentData; slug?: string }) {
  const { t, locale } = useT();

  // Override apt fields with EN dictionary when locale === "en" and slug matches
  const aptLocal: ApartmentData = (() => {
    if (locale !== "en") return apt;
    const key = slug === "1-plus-1" ? "one" : slug === "2-plus-1" ? "two" : null;
    if (!key) return apt;
    const d = t.apartments[key];
    return {
      ...apt,
      type: d.type,
      size: d.size,
      capacity: d.capacity,
      description: d.description,
      longDescription: d.longDescription,
      rooms: [...d.rooms],
      kitchen: [...d.kitchen],
      bathroom: [...d.bathroom],
      general: [...d.general],
      rentalSuitability: [...d.rentalSuitability],
    };
  })();

  const images = aptLocal.images ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeImage = images[activeIndex];

  const lightboxItems = images.map((img) => ({
    title: aptLocal.type,
    category: img.alt || aptLocal.type,
    imageUrl: img.imageUrl,
  }));

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-line bg-cream">
        <div className="container-page py-4">
          <Link
            href="/#daireler"
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            {t.apartmentDetail.back}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-cream">
        <div className="container-page py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Gallery */}
            <MotionSlideIn direction="left" className="lg:col-span-3">
              {/* Main Image */}
              <div
                className="relative cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-stone/20 to-light-gray"
                onClick={() => activeImage && setLightboxIndex(activeIndex)}
              >
                <div className="relative flex aspect-[16/10] items-center justify-center">
                  {activeImage ? (
                    <img
                      src={activeImage.imageUrl}
                      alt={activeImage.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-primary/15">
                      {aptLocal.type}
                    </span>
                  )}
                </div>
                {images.length > 0 && (
                  <div className="absolute bottom-4 right-4 rounded-full bg-primary/70 px-3 py-1 text-[0.75rem] font-semibold text-white backdrop-blur tabular">
                    {activeIndex + 1} / {images.length}
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                  {images.map((img, i) => (
                    <button
                      key={img.imageUrl}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`group relative overflow-hidden rounded-xl border transition-all ${
                        i === activeIndex
                          ? "border-accent ring-2 ring-accent/40"
                          : "border-stone/40 hover:border-accent/60"
                      }`}
                    >
                      <div className="relative aspect-square">
                        <img
                          src={img.imageUrl.replace("/galeri/large/", "/galeri/thumb/")}
                          alt={img.alt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </MotionSlideIn>

            {/* Sticky Side Panel */}
            <MotionSlideIn direction="right" className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                {/* Title & Badges */}
                <div>
                  <span className="eyebrow">{t.apartmentDetail.apartmentType}</span>
                  <h1 className="heading-display mt-3 text-[2rem] sm:text-[2.5rem]">
                    {aptLocal.type}
                  </h1>
                  <p className="mt-4 text-[1rem] leading-relaxed text-muted">{aptLocal.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-[0.8125rem] font-semibold text-primary">
                      <Maximize size={13} />
                      {aptLocal.size}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-[0.8125rem] font-semibold text-primary">
                      <Users size={13} />
                      {aptLocal.capacity}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {aptLocal.rentalSuitability.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-accent/10 px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-wider text-accent"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_14px_40px_-22px_rgba(20,19,18,0.18)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-semibold text-primary">
                        {t.apartmentDetail.askAvailability}
                      </h3>
                      <p className="mt-1 text-[0.8125rem] text-muted">
                        {t.apartmentDetail.askAvailabilitySub}
                      </p>
                    </div>
                  </div>

                  <form className="mt-5 space-y-3">
                    <input type="text" placeholder={t.apartmentDetail.yourName} className="input-field" />
                    <input type="tel" placeholder={t.apartmentDetail.phone} className="input-field" />
                    <select className="input-field">
                      <option value="">{t.apartmentDetail.rentalType}</option>
                      <option>{t.apartmentDetail.daily}</option>
                      <option>{t.apartmentDetail.weekly}</option>
                      <option>{t.apartmentDetail.monthly}</option>
                      <option>{t.apartmentDetail.yearly}</option>
                    </select>
                    <button type="button" className="btn btn-accent w-full">
                      <Send size={16} />
                      {t.apartmentDetail.inquiry}
                    </button>
                  </form>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a href={siteConfig.phoneHref} className="btn btn-ghost">
                      <Phone size={14} />
                      {t.apartmentDetail.call}
                    </a>
                    <a
                      href={siteConfig.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-[0.875rem] font-semibold text-white transition-all hover:bg-[#20BD5A]"
                    >
                      <MessageCircle size={14} />
                      {t.apartmentDetail.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </MotionSlideIn>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <MotionFadeUp>
              <span className="eyebrow">{t.apartmentDetail.aboutEyebrow}</span>
              <h2 className="heading-display mt-4 text-[1.75rem] sm:text-[2rem]">
                {t.apartmentDetail.aboutTitle}
              </h2>
            </MotionFadeUp>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">
              {aptLocal.longDescription}
            </p>

            <h3 className="mt-12 font-[family-name:var(--font-display)] text-xl font-semibold text-primary">
              {t.apartmentDetail.roomFeatures}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {aptLocal.rooms.map((room) => {
                const Icon = roomIconMap[room.icon] || Bed;
                return (
                  <div
                    key={room.label}
                    className="flex flex-col items-start gap-3 rounded-xl border border-line bg-cream p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[0.875rem] font-semibold text-primary">
                      {room.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {[
              { label: t.apartmentDetail.kitchen, items: aptLocal.kitchen },
              { label: t.apartmentDetail.bathroom, items: aptLocal.bathroom },
              { label: t.apartmentDetail.general, items: aptLocal.general },
            ].map(({ label, items }) => (
              <div key={label}>
                <h3 className="mt-12 font-[family-name:var(--font-display)] text-xl font-semibold text-primary">
                  {label}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 md:grid-cols-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-[0.9375rem] text-primary/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-line bg-cream">
        <div className="container-page py-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: t.apartmentDetail.trustSafe, desc: t.apartmentDetail.trustSafeDesc },
              { icon: Sparkles, title: t.apartmentDetail.trustClean, desc: t.apartmentDetail.trustCleanDesc },
              { icon: Clock, title: t.apartmentDetail.trustFast, desc: t.apartmentDetail.trustFastDesc },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[0.9375rem] font-semibold text-primary">{item.title}</p>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary">
        <div className="container-page py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-accent">
                {t.apartmentDetail.finalCtaEyebrow}
              </span>
              <h2 className="heading-display mt-3 text-3xl text-white sm:text-[2.25rem]">
                {t.apartmentDetail.finalCtaTitle}
              </h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-white/65">
                {t.apartmentDetail.finalCtaSubFn(aptLocal.type)}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={siteConfig.phoneHref} className="btn btn-outline-light">
                <Phone size={16} />
                {t.nav.callNow}
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                <MessageCircle size={16} />
                {t.contact.waBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + lightboxItems.length) % lightboxItems.length : 0
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % lightboxItems.length : 0
            )
          }
          labels={t.gallery.lightbox}
        />
      )}
    </>
  );
}
