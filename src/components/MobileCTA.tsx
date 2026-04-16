"use client";

import { Phone, MessageCircle, FileText } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";

export default function MobileCTA() {
  const { t } = useT();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_-10px_rgba(20,19,18,0.12)] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 divide-x divide-line">
        <a
          href={siteConfig.phoneHref}
          className="flex flex-col items-center gap-1 py-3 text-primary transition-colors active:bg-cream"
        >
          <Phone size={18} />
          <span className="text-[0.6875rem] font-semibold uppercase tracking-wider">{t.mobileCTA.call}</span>
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 bg-[#25D366] py-3 text-white"
        >
          <MessageCircle size={18} />
          <span className="text-[0.6875rem] font-semibold uppercase tracking-wider">{t.mobileCTA.wa}</span>
        </a>
        <a
          href="#iletisim"
          className="flex flex-col items-center gap-1 py-3 text-primary transition-colors active:bg-cream"
        >
          <FileText size={18} />
          <span className="text-[0.6875rem] font-semibold uppercase tracking-wider">{t.mobileCTA.inquiry}</span>
        </a>
      </div>
    </div>
  );
}
