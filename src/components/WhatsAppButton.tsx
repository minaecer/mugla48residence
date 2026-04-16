"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-8 right-8 z-40 hidden items-center gap-2.5 rounded-full bg-[#25D366] py-3 pl-3 pr-5 text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.5)] transition-all hover:bg-[#20BD5A] hover:shadow-[0_16px_40px_-12px_rgba(37,211,102,0.7)] md:flex"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
        <MessageCircle size={18} />
      </span>
      <span className="pr-1 text-[0.875rem] font-semibold">WhatsApp</span>
    </a>
  );
}
