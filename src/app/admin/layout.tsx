import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";

export const metadata = {
  title: "Yönetim Paneli | Muğla 48 Residence",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Allow login page without auth
  // The middleware handles the redirect, but this is a safety net
  // For the login page, we render children without the admin shell
  if (!session?.user) {
    return (
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-cream flex">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <TopBar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
