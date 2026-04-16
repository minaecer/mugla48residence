"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";

type Item = {
  title: string;
  category: string;
  imageUrl?: string;
};

type Props = {
  items: Item[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  labels: {
    close: string;
    prev: string;
    next: string;
    zoomIn: string;
    zoomOut: string;
    download: string;
  };
};

export default function GalleryLightbox({ items, index, onClose, onPrev, onNext, labels }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const item = items[index];

  // Reset zoom when switching image
  useEffect(() => {
    setZoomed(false);
  }, [index]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  // Lock scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  if (!item) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx > 0 ? onPrev : onNext)();
    touchStartX.current = null;
  };

  const filename = item.imageUrl?.split("/").pop() || "image.jpg";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-primary/95 backdrop-blur-md"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div className="min-w-0">
          <p className="truncate font-[family-name:var(--font-display)] text-base font-semibold text-white sm:text-lg">
            {item.title}
          </p>
          <p className="mt-0.5 text-[0.75rem] text-white/55 tabular">
            {item.category} · {index + 1} / {items.length}
          </p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {item.imageUrl && (
            <>
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? labels.zoomOut : labels.zoomIn}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-accent/50 hover:bg-white/10 hover:text-white sm:h-11 sm:w-11"
              >
                {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
              <a
                href={item.imageUrl}
                download={filename}
                aria-label={labels.download}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-accent/50 hover:bg-white/10 hover:text-white sm:h-11 sm:w-11"
              >
                <Download size={18} />
              </a>
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-accent/50 hover:bg-white/10 hover:text-white sm:h-11 sm:w-11"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-16 sm:pb-6">
        {/* Prev — desktop only as side button */}
        <button
          type="button"
          onClick={onPrev}
          aria-label={labels.prev}
          className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-primary/40 text-white/80 backdrop-blur transition-all hover:border-accent/50 hover:bg-white/10 hover:text-white sm:flex"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          className={`relative h-full w-full max-w-6xl overflow-auto transition-transform duration-300 ${
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={() => item.imageUrl && setZoomed((z) => !z)}
        >
          {item.imageUrl ? (
            <div
              className={`relative h-full w-full transition-transform duration-300 ease-out ${
                zoomed ? "scale-[1.6] sm:scale-[2]" : "scale-100"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white/20">
                {item.title}
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label={labels.next}
          className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-primary/40 text-white/80 backdrop-blur transition-all hover:border-accent/50 hover:bg-white/10 hover:text-white sm:flex"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Mobile prev/next */}
      <div className="flex items-center justify-center gap-3 border-t border-white/10 bg-primary/40 py-3 sm:hidden">
        <button
          type="button"
          onClick={onPrev}
          aria-label={labels.prev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={labels.next}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
