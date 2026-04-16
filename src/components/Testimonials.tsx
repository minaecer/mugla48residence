"use client";

import { Star } from "lucide-react";
import { MotionFadeUp, MotionStagger, MotionStaggerItem } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";

type GoogleReview = {
  name: string;
  initial: string;
  rating: number;
  text: string;
  date: string;
};

const googleReviews: GoogleReview[] = [
  {
    name: "Ahmet Yılmaz",
    initial: "A",
    rating: 5,
    text: "Harika bir deneyimdi. Daireler çok temiz ve modern. Personel son derece ilgili ve yardımsever. Kesinlikle tekrar tercih edeceğim.",
    date: "2 ay önce",
  },
  {
    name: "Elif Demir",
    initial: "E",
    rating: 5,
    text: "Muğla'da konaklama için en iyi seçenek. Konum merkezi, ulaşım çok kolay. Ev konforu hissettiren lüks bir ortam.",
    date: "1 ay önce",
  },
  {
    name: "Mehmet Kaya",
    initial: "M",
    rating: 5,
    text: "İş seyahatim için kaldım, her şey mükemmeldi. Tam donanımlı mutfak, hızlı internet ve sessiz bir ortam. Tavsiye ederim.",
    date: "3 ay önce",
  },
  {
    name: "Zeynep Acar",
    initial: "Z",
    rating: 5,
    text: "Ailece kaldık, çocuklarımız da çok memnun kaldı. Geniş, ferah daireler. Temizlik ve hijyen konusunda çok titizler.",
    date: "2 hafta önce",
  },
];

export default function Testimonials() {
  const { t } = useT();

  const bgColors = [
    "bg-red-600", "bg-blue-600", "bg-green-600", "bg-purple-600",
    "bg-orange-500", "bg-teal-600", "bg-pink-600", "bg-indigo-600",
  ];

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

            {/* Google Rating Badge */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-cream px-5 py-2.5">
              <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-[0.875rem] font-semibold text-primary tabular">5.0 / 5</span>
              <span className="h-4 w-px bg-line" />
              <span className="text-[0.8125rem] text-muted tabular">Google {t.testimonials.ratingLabel}</span>
            </div>
          </div>
        </MotionFadeUp>

        {/* Google Review Cards */}
        <MotionStagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {googleReviews.map((review, idx) => (
            <MotionStaggerItem key={review.name}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-line bg-cream p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white hover:shadow-[0_14px_40px_-22px_rgba(20,19,18,0.18)]">
                {/* Reviewer info */}
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.875rem] font-bold text-white ${bgColors[idx % bgColors.length]}`}>
                    {review.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[0.875rem] font-semibold text-primary">{review.name}</p>
                    <p className="text-[0.75rem] text-muted">{review.date}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>

                {/* Review text */}
                <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-primary/85">
                  {review.text}
                </blockquote>

                {/* Google attribution */}
                <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-4">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-[0.75rem] text-muted">Google Yorumu</span>
                </div>
              </figure>
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        {/* Google Maps Reviews Link */}
        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/maps/search/Mugla+48+Residence"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google&apos;da Tüm Yorumları Gör
          </a>
        </div>
      </div>
    </section>
  );
}
