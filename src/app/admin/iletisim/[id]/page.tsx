"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import FormField from "@/components/admin/FormField";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  rentalType: string | null;
  apartmentType: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

export default function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/contacts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setContact(data);
        setStatus(data.status);
        setNotes(data.notes || "");
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    setSaving(false);
    router.push("/admin/iletisim");
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    setDeleting(false);
    router.push("/admin/iletisim");
  };

  if (loading || !contact) {
    return <div className="text-center py-12 text-muted">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/iletisim"
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-primary">
            İletişim Detayı
          </h1>
          <p className="text-muted text-sm mt-1">#{contact.id} — {contact.name}</p>
        </div>
        <button
          onClick={() => setShowDelete(true)}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-sm"
        >
          <Trash2 size={16} />
          Sil
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        {/* Contact Info (read-only) */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Bilgiler</h2>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">Ad Soyad</span>
              <p className="text-sm text-primary font-medium">{contact.name}</p>
            </div>
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">Telefon</span>
              <p className="text-sm text-primary font-medium">{contact.phone}</p>
            </div>
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">E-posta</span>
              <p className="text-sm text-primary font-medium">{contact.email || "-"}</p>
            </div>
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">Kiralama Türü</span>
              <p className="text-sm text-primary font-medium">{contact.rentalType || "-"}</p>
            </div>
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">Daire Tipi</span>
              <p className="text-sm text-primary font-medium">{contact.apartmentType || "-"}</p>
            </div>
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">Mesaj</span>
              <p className="text-sm text-primary">{contact.message || "-"}</p>
            </div>
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">Tarih</span>
              <p className="text-sm text-primary font-medium">
                {new Date(contact.createdAt).toLocaleString("tr-TR")}
              </p>
            </div>
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">Mevcut Durum</span>
              <div className="mt-1">
                <StatusBadge status={contact.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Editable section */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Güncelle</h2>
          <div className="space-y-4">
            <FormField
              label="Durum"
              name="status"
              type="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: "NEW", label: "Yeni" },
                { value: "CONTACTED", label: "İletişime Geçildi" },
                { value: "RESOLVED", label: "Çözüldü" },
              ]}
            />
            <FormField
              label="Notlar"
              name="notes"
              type="textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="İletişim hakkında notlarınız..."
            />
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? "Kaydediliyor..." : "Güncelle"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showDelete}
        message="Bu iletişim kaydını silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={deleting}
      />
    </div>
  );
}
