"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Eye, Trash2 } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface Reservation {
  id: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string | null;
  checkIn: string;
  checkOut: string;
  status: string;
  rentalType: string | null;
  totalPrice: number | null;
  apartment: { id: number; slug: string; type: string };
}

const STATUS_TABS = [
  { key: "", label: "Tümü" },
  { key: "PENDING", label: "Beklemede" },
  { key: "CONFIRMED", label: "Onaylandı" },
  { key: "CANCELLED", label: "İptal" },
  { key: "COMPLETED", label: "Tamamlandı" },
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async (status?: string) => {
    setLoading(true);
    const url = status
      ? `/api/admin/reservations?status=${status}`
      : "/api/admin/reservations";
    const res = await fetch(url);
    const data = await res.json();
    setReservations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(activeTab || undefined);
  }, [activeTab]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/reservations/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchData(activeTab || undefined);
  };

  const columns = [
    { key: "guestName", label: "Misafir" },
    {
      key: "apartment",
      label: "Daire",
      render: (_: unknown, row: Record<string, unknown>) => {
        const apt = row.apartment as Reservation["apartment"];
        return apt?.type || "-";
      },
    },
    {
      key: "checkIn",
      label: "Giriş",
      render: (val: unknown) =>
        new Date(val as string).toLocaleDateString("tr-TR"),
    },
    {
      key: "checkOut",
      label: "Çıkış",
      render: (val: unknown) =>
        new Date(val as string).toLocaleDateString("tr-TR"),
    },
    {
      key: "totalPrice",
      label: "Tutar",
      render: (val: unknown) =>
        val ? `${Number(val).toLocaleString("tr-TR")} TL` : "-",
    },
    {
      key: "status",
      label: "Durum",
      render: (val: unknown) => <StatusBadge status={val as string} />,
    },
    {
      key: "actions",
      label: "İşlem",
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/rezervasyonlar/${row.id}`}
            className="p-1.5 text-muted hover:text-accent transition-colors"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={() => setDeleteId(row.id as number)}
            className="p-1.5 text-muted hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Rezervasyonlar
          </h1>
          <p className="text-muted text-sm mt-1">
            Tüm rezervasyonları yönetin
          </p>
        </div>
        <Link
          href="/admin/rezervasyonlar/new"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={18} />
          Yeni Rezervasyon
        </Link>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 mb-6 bg-cream rounded-lg p-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white text-primary shadow-sm"
                : "text-muted hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted">Yükleniyor...</div>
      ) : (
        <DataTable columns={columns} data={reservations as unknown as Record<string, unknown>[]} />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        message="Bu rezervasyonu silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
