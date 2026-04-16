import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactHero from "@/components/ContactHero";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "İletişim | Muğla 48 Residence",
  description:
    "Muğla 48 Residence ile iletişime geçin. Kiralık daire bilgisi, fiyat ve uygunluk için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <ContactHero />

        <ContactForm />
      </main>
      <Footer />
      <MobileCTA />
      <WhatsAppButton />
    </>
  );
}
