"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dict, tr, DEFAULT_LOCALE, type Locale } from "./dict";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof tr;
};

const LanguageContext = createContext<Ctx | null>(null);

const COOKIE = "locale";

function readInitial(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const m = document.cookie.match(/(?:^|; )locale=(tr|en)/);
  return (m?.[1] as Locale) || DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(readInitial());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    document.cookie = `${COOKIE}=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dict[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}
