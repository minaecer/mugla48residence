"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { MotionFadeUp, MotionSlideIn } from "./MotionWrapper";
import { useT } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";

export default function ContactForm() {
  const { t } = useT();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rentalType: "",
    apartmentType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("/api/public/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).catch(() => {});

    const whatsappMessage = encodeURIComponent(
      t.contact.waMessage(formData.name, formData.rentalType, formData.apartmentType, formData.message)
    );
    window.open(`${siteConfig.whatsappHref}?text=${whatsappMessage}`, "_blank");
  };

  return (
    <section id="iletisim" className="section-padding bg-cream">
      <div className="container-page">
        <MotionFadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.5rem]">
              {t.contact.title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              {t.contact.subtitle}
            </p>
          </div>
        </MotionFadeUp>

        <div className="mt-16 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <MotionSlideIn direction="left" className="lg:col-span-3">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_14px_40px_-22px_rgba(20,19,18,0.18)] sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[0.8125rem] font-semibold text-primary">{t.contact.name}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder={t.contact.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[0.8125rem] font-semibold text-primary">{t.contact.phone}</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                      placeholder={t.contact.phonePlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[0.8125rem] font-semibold text-primary">{t.contact.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[0.8125rem] font-semibold text-primary">{t.contact.rentalType}</label>
                    <select
                      value={formData.rentalType}
                      onChange={(e) => setFormData({ ...formData, rentalType: e.target.value })}
                      className="input-field"
                    >
                      <option value="">{t.contact.selectOption}</option>
                      <option value={t.contact.daily}>{t.contact.daily}</option>
                      <option value={t.contact.weekly}>{t.contact.weekly}</option>
                      <option value={t.contact.monthly}>{t.contact.monthly}</option>
                      <option value={t.contact.yearly}>{t.contact.yearly}</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[0.8125rem] font-semibold text-primary">{t.contact.apartmentType}</label>
                    <select
                      value={formData.apartmentType}
                      onChange={(e) => setFormData({ ...formData, apartmentType: e.target.value })}
                      className="input-field"
                    >
                      <option value="">{t.contact.selectOption}</option>
                      <option value="1+1">{t.contact.oneType}</option>
                      <option value="2+1">{t.contact.twoType}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[0.8125rem] font-semibold text-primary">{t.contact.message}</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.75rem] text-muted sm:max-w-xs">{t.contact.privacy}</p>
                  <button type="submit" className="btn btn-accent">
                    <Send size={16} />
                    {t.contact.submit}
                  </button>
                </div>
              </form>
            </div>
          </MotionSlideIn>

          <MotionSlideIn direction="right" className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6 rounded-3xl border border-primary bg-primary p-8 text-white">
              <div>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-accent">{t.contact.directEyebrow}</span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {t.contact.directTitle}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/65">
                  {t.contact.directSub}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-accent/40 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-wider text-white/50">{t.contact.labelPhone}</p>
                    <p className="mt-0.5 text-[0.9375rem] font-semibold">{siteConfig.phone}</p>
                  </div>
                </a>

                <a
                  href={siteConfig.emailHref}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-accent/40 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-wider text-white/50">{t.contact.labelEmail}</p>
                    <p className="mt-0.5 text-[0.9375rem] font-semibold">{siteConfig.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-wider text-white/50">{t.contact.labelAddress}</p>
                    <p className="mt-0.5 text-[0.9375rem] font-semibold">{siteConfig.address}</p>
                  </div>
                </div>
              </div>

              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-all hover:bg-[#20BD5A]"
              >
                <MessageCircle size={18} />
                {t.contact.waBtn}
              </a>
            </div>
          </MotionSlideIn>
        </div>
      </div>
    </section>
  );
}
