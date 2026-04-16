"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CalendarCheck,
  Mail,
  Image,
  MessageSquareQuote,
  FileText,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/daireler", label: "Daireler", icon: Home },
  { href: "/admin/rezervasyonlar", label: "Rezervasyonlar", icon: CalendarCheck },
  { href: "/admin/iletisim", label: "İletişim", icon: Mail },
  { href: "/admin/galeri", label: "Galeri", icon: Image },
  { href: "/admin/yorumlar", label: "Yorumlar", icon: MessageSquareQuote },
  { href: "/admin/icerikler", label: "İçerikler", icon: FileText },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary text-white flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-display text-lg font-bold">48</span>
          </div>
          <div>
            <div className="font-display font-bold text-sm">Muğla 48</div>
            <div className="text-white/50 text-xs">Residence</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors"
        >
          <Home size={14} />
          <span>Siteyi Görüntüle</span>
        </Link>
      </div>
    </aside>
  );
}
