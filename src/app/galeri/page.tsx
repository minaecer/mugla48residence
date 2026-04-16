import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import GalleryPageClient from "@/components/GalleryPageClient";
import { getPublishedGalleryImages } from "@/lib/data/gallery";

export default async function GalleryPage() {
  let items;

  try {
    items = await getPublishedGalleryImages();
  } catch {
    // Graceful degradation: GalleryPageClient will use hardcoded fallback
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <GalleryPageClient items={items} />
      </main>
      <Footer />
      <MobileCTA />
      <WhatsAppButton />
    </>
  );
}
