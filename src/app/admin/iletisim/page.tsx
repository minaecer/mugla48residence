"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  rentalType: string | null;
  status: string;
  createdAt: string;
}

const STATUS_TABS = [
  { key: "", label: "Tümü" },
  { key: "NEW", label: "Yeni" },
  { key: "CONTACTED", label: "İletişime Geçildi" },
  { key: "RESOLVED", label: "Çözüldü" },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async (status?: string) => {
    setLoading(true);
    const url = status
      ? `/api/admin/contacts?status=${status}`
      : "/api/admin/contacts";
    const res = await fetch(url);
    const data = await res.json();
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(activeTab || undefined);
  }, [activeTab]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/contacts/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchData(activeTab || undefined);
  };

  const columns = [
    { key: "name", label: "Ad Soyad" },
    { key: "phone", label: "Telefon" },
    {
      key: "email",
      label: "E-posta",
      render: (val: unknown) => (val as string) || "-",
    },
    {
      key: "rentalType",
      label: "Kiralama Türü",
      render: (val: unknown) => (val as string) || "-",
    },
    {
      key: "status",
      label: "Durum",
      render: (val: unknown) => <StatusBadge status={val as string} />,
    },
    {
      key: "createdAt",
      label: "Tarih",
      render: (val: unknown) =>
        new Date(val as string).toLocaleDateString("tr-TR"),
    },
    {
      key: "actions",
      label: "İşlem",
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/iletisim/${row.id}`}
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
            İletişim Formları
          </h1>
          <p className="text-muted text-sm mt-1">
            Gelen iletişim taleplerini yönetin
          </p>
        </div>
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
        <DataTable columns={columns} data={contacts as unknown as Record<string, unknown>[]} />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        message="Bu iletişim kaydını silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
