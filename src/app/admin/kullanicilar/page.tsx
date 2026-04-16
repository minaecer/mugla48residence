"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Shield, UserCog } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    if (res.status === 403) {
      setError("Bu sayfaya erişim yetkiniz yok.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/users/${deleteId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Silme işlemi başarısız.");
    }
    setDeleting(false);
    setDeleteId(null);
    fetchData();
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <Shield size={48} className="mx-auto text-red-300 mb-4" />
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  const columns = [
    { key: "name", label: "Ad Soyad" },
    { key: "email", label: "E-posta" },
    {
      key: "role",
      label: "Rol",
      render: (val: unknown) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            val === "ADMIN"
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : "bg-blue-50 text-blue-700 border-blue-200"
          }`}
        >
          {val === "ADMIN" ? (
            <Shield size={12} />
          ) : (
            <UserCog size={12} />
          )}
          {val === "ADMIN" ? "Admin" : "Editör"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Kayıt Tarihi",
      render: (val: unknown) =>
        new Date(val as string).toLocaleDateString("tr-TR"),
    },
    {
      key: "actions",
      label: "İşlem",
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/kullanicilar/${row.id}/edit`}
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
            Kullanıcılar
          </h1>
          <p className="text-muted text-sm mt-1">
            Sistem kullanıcılarını yönetin
          </p>
        </div>
        <Link
          href="/admin/kullanicilar/new"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={18} />
          Yeni Kullanıcı
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted">Yükleniyor...</div>
      ) : (
        <DataTable columns={columns} data={users as unknown as Record<string, unknown>[]} />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        message="Bu kullanıcıyı silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
