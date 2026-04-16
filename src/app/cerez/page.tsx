"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import LegalHero from "@/components/LegalHero";
import { useT } from "@/lib/i18n/context";

export default function CerezPage() {
  const { t } = useT();
  return (
    <>
      <Header />
      <main className="pt-20">
        <LegalHero title={t.cookies.title} />
        <section className="section-padding bg-white">
          <div className="container-page max-w-3xl">
            <div className="prose prose-lg max-w-none text-muted">
              <p>{t.cookies.p1}</p>
              <h2 className="mt-8 text-xl font-bold text-primary">{t.cookies.h1}</h2>
              <p>{t.cookies.p2}</p>
              <h2 className="mt-8 text-xl font-bold text-primary">{t.cookies.h2}</h2>
              <p>
                <strong>{t.cookies.p3Essential}</strong> {t.cookies.p3EssentialDesc}
              </p>
              <p>
                <strong>{t.cookies.p3Analytics}</strong> {t.cookies.p3AnalyticsDesc}
              </p>
              <h2 className="mt-8 text-xl font-bold text-primary">{t.cookies.h3}</h2>
              <p>{t.cookies.p4}</p>
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
