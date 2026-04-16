"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-light-gray flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <h2 className="text-sm font-medium text-muted">Yönetim Paneli</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cream rounded-full flex items-center justify-center">
            <User size={16} className="text-muted" />
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-primary">
              {session?.user?.name || "Admin"}
            </div>
            <span className="inline-block text-[10px] font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">
              {session?.user?.role || "ADMIN"}
            </span>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 text-sm text-muted hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
        >
          <LogOut size={16} />
          <span>Çıkış</span>
        </button>
      </div>
    </header>
  );
}
