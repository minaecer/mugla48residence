import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muğla 48 Residence | Premium Kiralık Daireler - Menteşe",
  description:
    "Muğla Menteşe'de günlük, haftalık, aylık ve yıllık kiralık tam donanımlı 1+1 ve 2+1 premium residence daireler. Şehir merkezinde lüks ve konforlu yaşam.",
  keywords: [
    "Muğla kiralık daire",
    "Menteşe residence",
    "günlük kiralık",
    "aylık kiralık",
    "eşyalı daire",
    "apart Muğla",
    "premium konaklama",
  ],
  openGraph: {
    title: "Muğla 48 Residence | Premium Kiralık Daireler",
    description:
      "Şehir merkezinde, tam donanımlı, lüks residence daireler. Günlük, haftalık, aylık ve yıllık kiralama.",
    locale: "tr_TR",
    type: "website",
    siteName: "Muğla 48 Residence",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
