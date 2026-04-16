import { prisma } from "@/lib/prisma";
import { Home, Mail, CalendarCheck, MessageSquareQuote } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function DashboardPage() {
  const [apartmentCount, contactCount, reservationCount, testimonialCount, recentContacts] =
    await Promise.all([
      prisma.apartment.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.reservation.count({
        where: { status: { in: ["PENDING", "CONFIRMED"] } },
      }),
      prisma.testimonial.count(),
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-primary">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Genel bakış ve istatistikler</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Toplam Daire"
          count={apartmentCount}
          icon={Home}
          color="accent"
        />
        <StatsCard
          title="Yeni İletişim"
          count={contactCount}
          icon={Mail}
          color="blue"
        />
        <StatsCard
          title="Aktif Rezervasyon"
          count={reservationCount}
          icon={CalendarCheck}
          color="green"
        />
        <StatsCard
          title="Toplam Yorum"
          count={testimonialCount}
          icon={MessageSquareQuote}
          color="orange"
        />
      </div>

      {/* Recent Contact Submissions */}
      <div className="bg-white rounded-xl border border-light-gray">
        <div className="px-6 py-4 border-b border-light-gray">
          <h2 className="text-lg font-semibold text-primary">Son İletişim Talepleri</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-gray bg-cream/50">
                <th className="text-left px-6 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Ad Soyad
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Telefon
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Kiralama Türü
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    Henüz iletişim talebi yok.
                  </td>
                </tr>
              ) : (
                recentContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-light-gray/50 hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium text-primary">
                      {contact.name}
                    </td>
                    <td className="px-6 py-3 text-muted">{contact.phone}</td>
                    <td className="px-6 py-3 text-muted">
                      {contact.rentalType || "-"}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={contact.status} />
                    </td>
                    <td className="px-6 py-3 text-muted">
                      {new Date(contact.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
