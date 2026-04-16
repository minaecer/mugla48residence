export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import ApartmentDetailClient from "@/components/ApartmentDetailClient";
import { getApartmentBySlug, getPublishedApartments } from "@/lib/data/apartments";
import type { ApartmentData } from "@/lib/types";

const fallbackApartmentData: Record<string, ApartmentData> = {
  "1-plus-1": {
    type: "1+1 Daire",
    size: "45-55 m²",
    capacity: "1-2 Kişi",
    description:
      "Tek kişi veya çiftler için ideal, kompakt ve şık tasarımlı tam donanımlı daireler.",
    longDescription:
      "Modern ve fonksiyonel tasarımıyla öne çıkan 1+1 dairelerimiz, şehir merkezinde konforlu bir yaşam sunmaktadır. Her detayı titizlikle düşünülmüş bu dairelerde, kaliteli mobilyalar, tam donanımlı mutfak ve ferah yaşam alanları sizi bekliyor.",
    rooms: [
      { icon: "Bed", label: "1 Yatak Odası" },
      { icon: "Tv", label: "Smart TV" },
      { icon: "Wind", label: "Klima" },
      { icon: "Wifi", label: "Yüksek Hızlı Wi-Fi" },
    ],
    kitchen: [
      "Buzdolabı",
      "Mikrodalga",
      "Ocak & Fırın",
      "Çay/Kahve makinesi",
      "Tencere & tava seti",
      "Tabak & bardak seti",
    ],
    bathroom: [
      "Duşakabin",
      "Havlu seti",
      "Saç kurutma makinesi",
      "Banyo dolabı",
    ],
    general: [
      "Çamaşır makinesi",
      "Ütü & ütü masası",
      "Elektrik süpürgesi",
      "Geniş gardırop",
    ],
    rentalSuitability: ["Günlük", "Haftalık", "Aylık", "Yıllık"],
    images: [
      { imageUrl: "/galeri/large/Junior1.jpg",    alt: "1+1 Daire - Junior Suit" },
      { imageUrl: "/galeri/large/Junior2.jpg",    alt: "1+1 Daire - Yatak Odası" },
      { imageUrl: "/galeri/large/Junior3.jpg",    alt: "1+1 Daire - Görünüm" },
      { imageUrl: "/galeri/large/Junior4.jpg",    alt: "1+1 Daire - Detay" },
      { imageUrl: "/galeri/large/deluxesuit1.jpg",alt: "1+1 Daire - Deluxe" },
      { imageUrl: "/galeri/large/IMG_4547_1.jpg", alt: "1+1 Daire - Yaşam Alanı" },
      { imageUrl: "/galeri/large/IMG_4590.jpg",   alt: "1+1 Daire - Oturma Alanı" },
      { imageUrl: "/galeri/large/BUZDOLABI.jpg",  alt: "1+1 Daire - Mutfak" },
    ],
  },
  "2-plus-1": {
    type: "2+1 Daire",
    size: "75-90 m²",
    capacity: "2-4 Kişi",
    description:
      "Aileler ve geniş ihtiyaçlar için ferah, konforlu ve tam donanımlı geniş daireler.",
    longDescription:
      "Geniş ve ferah 2+1 dairelerimiz, aileler ve uzun dönem konaklamalar için idealdir. İki ayrı yatak odası, geniş salon, tam donanımlı mutfak ve balkon ile ev konforunu residence kalitesiyle birleştiriyoruz.",
    rooms: [
      { icon: "Bed", label: "2 Yatak Odası" },
      { icon: "Tv", label: "Smart TV" },
      { icon: "Wind", label: "Klima (Tüm Odalarda)" },
      { icon: "Wifi", label: "Yüksek Hızlı Wi-Fi" },
    ],
    kitchen: [
      "Büyük buzdolabı",
      "Bulaşık makinesi",
      "Ocak & Fırın",
      "Mikrodalga",
      "Çay/Kahve makinesi",
      "Komple mutfak seti",
    ],
    bathroom: [
      "Geniş duşakabin",
      "Havlu seti",
      "Saç kurutma makinesi",
      "Banyo dolabı",
      "Ayna",
    ],
    general: [
      "Çamaşır makinesi",
      "Bulaşık makinesi",
      "Ütü & ütü masası",
      "Elektrik süpürgesi",
      "Geniş gardırop",
      "Balkon",
    ],
    rentalSuitability: ["Günlük", "Haftalık", "Aylık", "Yıllık"],
    images: [
      { imageUrl: "/galeri/large/DUBLEX_MERDVEN.jpg",  alt: "2+1 Dublex - Merdiven" },
      { imageUrl: "/galeri/large/DUBLEX_MERDVEN2.jpg", alt: "2+1 Dublex - Üst Kat" },
      { imageUrl: "/galeri/large/IMG_4618.jpg",        alt: "2+1 Daire - Salon" },
      { imageUrl: "/galeri/large/IMG_4620.jpg",        alt: "2+1 Daire - Yaşam Alanı" },
      { imageUrl: "/galeri/large/IMG_4628.jpg",        alt: "2+1 Daire - Görünüm" },
      { imageUrl: "/galeri/large/IMG_4675.jpg",        alt: "2+1 Daire - Detay" },
      { imageUrl: "/galeri/large/IMG_2998.jpg",        alt: "2+1 Daire - İç Mekan" },
      { imageUrl: "/galeri/large/DSC_8245.jpg",        alt: "2+1 Daire - Genel" },
    ],
  },
};

export async function generateStaticParams() {
  try {
    const apartments = await getPublishedApartments();
    if (apartments.length > 0) {
      return apartments.map((apt) => ({ slug: apt.slug }));
    }
  } catch {
    // Fallback to hardcoded slugs
  }
  return [{ slug: "1-plus-1" }, { slug: "2-plus-1" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let apt: ApartmentData | null = null;
  try {
    apt = await getApartmentBySlug(slug);
  } catch {
    // Fallback
  }

  if (!apt) {
    apt = fallbackApartmentData[slug] ?? null;
  }

  if (!apt) {
    return {
      title: "Daire Bulunamadı | Muğla 48 Residence",
      description: "Aradığınız daire bulunamadı.",
    };
  }

  return {
    title: `${apt.type} | Muğla 48 Residence`,
    description: apt.description,
  };
}

export default async function ApartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let apt: ApartmentData | null = null;
  try {
    apt = await getApartmentBySlug(slug);
  } catch {
    // Fallback
  }

  if (!apt) {
    apt = fallbackApartmentData[slug] ?? null;
  }

  if (!apt) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <ApartmentDetailClient apt={apt} slug={slug} />
      </main>
      <Footer />
      <MobileCTA />
      <WhatsAppButton />
    </>
  );
}
