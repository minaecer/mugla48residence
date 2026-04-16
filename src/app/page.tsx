import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ApartmentTypes from "@/components/ApartmentTypes";
import Amenities from "@/components/Amenities";
import RentalModels from "@/components/RentalModels";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPublishedApartments } from "@/lib/data/apartments";
import { getPublishedTestimonials } from "@/lib/data/testimonials";
import { getHomepageGalleryItems } from "@/lib/data/gallery";
import { getAllSiteContent } from "@/lib/data/site-content";

export default async function Home() {
  let apartments, testimonials, galleryItems, siteContent;

  try {
    [apartments, testimonials, galleryItems, siteContent] = await Promise.all([
      getPublishedApartments(),
      getPublishedTestimonials(),
      getHomepageGalleryItems(),
      getAllSiteContent(),
    ]);
  } catch {
    // Graceful degradation: components will use hardcoded fallbacks
  }

  // Parse site content for component-specific data
  let featuresData, amenitiesData, rentalModelsData, aboutData;
  if (siteContent) {
    try {
      if (siteContent["features"])
        featuresData = JSON.parse(siteContent["features"]);
      if (siteContent["amenities"])
        amenitiesData = JSON.parse(siteContent["amenities"]);
      if (siteContent["rentalModels"])
        rentalModelsData = JSON.parse(siteContent["rentalModels"]);
      if (siteContent["about"])
        aboutData = JSON.parse(siteContent["about"]);
    } catch {
      // Use hardcoded fallbacks
    }
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features features={featuresData} />
        <ApartmentTypes apartments={apartments} />
        <Amenities amenities={amenitiesData} />
        <RentalModels models={rentalModelsData} />
        <Gallery items={galleryItems} />
        <Location />
        <Testimonials testimonials={testimonials} />
        <About content={aboutData} />
        <ContactForm />
        <CtaBand />
      </main>
      <Footer />
      <MobileCTA />
      <WhatsAppButton />
    </>
  );
}
