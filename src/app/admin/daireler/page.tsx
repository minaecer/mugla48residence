"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface Apartment {
  id: number;
  slug: string;
  type: string;
  size: string;
  capacity: string;
  isPublished: boolean;
  order: number;
}

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/apartments");
    const data = await res.json();
    setApartments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/apartments/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchData();
  };

  const togglePublished = async (apt: Apartment) => {
    await fetch(`/api/admin/apartments/${apt.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...apt, isPublished: !apt.isPublished }),
    });
    fetchData();
  };

  const columns = [
    { key: "type", label: "Tip" },
    { key: "size", label: "Büyüklük" },
    { key: "capacity", label: "Kapasite" },
    {
      key: "isPublished",
      label: "Durum",
      render: (_: unknown, row: Record<string, unknown>) => (
        <button
          onClick={() => togglePublished(row as unknown as Apartment)}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
            row.isPublished
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-gray-50 text-gray-500 border border-gray-200"
          }`}
        >
          {row.isPublished ? "Yayında" : "Taslak"}
        </button>
      ),
    },
    { key: "order", label: "Sıra" },
    {
      key: "actions",
      label: "İşlem",
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/daireler/${row.id}/edit`}
            className="p-1.5 text-muted hover:text-accent transition-colors"
          >
            <Edit size={16} />
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
            Daireler
          </h1>
          <p className="text-muted text-sm mt-1">
            Daireleri yönetin
          </p>
        </div>
        <Link
          href="/admin/daireler/new"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={18} />
          Yeni Daire
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted">Yükleniyor...</div>
      ) : (
        <DataTable columns={columns} data={apartments as unknown as Record<string, unknown>[]} />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        message="Bu daireyi silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
