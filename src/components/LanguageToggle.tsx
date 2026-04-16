"use client";

import { useT } from "@/lib/i18n/context";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useT();

  return (
    <div className={`inline-flex items-center rounded-full border border-line bg-white p-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] ${className}`}>
      <button
        type="button"
        onClick={() => setLocale("tr")}
        aria-pressed={locale === "tr"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "tr" ? "bg-primary text-white" : "text-muted hover:text-primary"
        }`}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "en" ? "bg-primary text-white" : "text-muted hover:text-primary"
        }`}
      >
        EN
      </button>
    </div>
  );
}
