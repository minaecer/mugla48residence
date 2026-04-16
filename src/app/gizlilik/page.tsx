"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import LegalHero from "@/components/LegalHero";
import { useT } from "@/lib/i18n/context";

export default function GizlilikPage() {
  const { t } = useT();
  return (
    <>
      <Header />
      <main className="pt-20">
        <LegalHero title={t.privacy.title} />
        <section className="section-padding bg-white">
          <div className="container-page max-w-3xl">
            <div className="prose prose-lg max-w-none text-muted">
              <p>{t.privacy.p1}</p>
              <h2 className="mt-8 text-xl font-bold text-primary">{t.privacy.h1}</h2>
              <p>{t.privacy.p2}</p>
              <h2 className="mt-8 text-xl font-bold text-primary">{t.privacy.h2}</h2>
              <p>{t.privacy.p3}</p>
              <h2 className="mt-8 text-xl font-bold text-primary">{t.privacy.h3}</h2>
              <p>{t.privacy.p4}</p>
              <h2 className="mt-8 text-xl font-bold text-primary">{t.privacy.h4}</h2>
              <p>{t.privacy.p5}</p>
              <p className="mt-8 text-sm text-muted/60">{t.legalCommon.lastUpdated}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
      <WhatsAppButton />
    </>
  );
}
