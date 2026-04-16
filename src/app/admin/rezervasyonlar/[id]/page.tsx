"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import FormField from "@/components/admin/FormField";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface Reservation {
  id: number;
  apartmentId: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string | null;
  checkIn: string;
  checkOut: string;
  status: string;
  rentalType: string | null;
  totalPrice: number | null;
  notes: string | null;
  apartment: { id: number; type: string; slug: string };
}

export default function ReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    checkIn: "",
    checkOut: "",
    status: "",
    rentalType: "",
    totalPrice: "",
    notes: "",
    apartmentId: "",
  });

  useEffect(() => {
    fetch(`/api/admin/reservations/${id}`)
      .then((r) => r.json())
      .then((data: Reservation) => {
        setReservation(data);
        setForm({
          guestName: data.guestName,
          guestPhone: data.guestPhone,
          guestEmail: data.guestEmail || "",
          checkIn: data.checkIn ? data.checkIn.split("T")[0] : "",
          checkOut: data.checkOut ? data.checkOut.split("T")[0] : "",
          status: data.status,
          rentalType: data.rentalType || "",
          totalPrice: data.totalPrice ? String(data.totalPrice) : "",
          notes: data.notes || "",
          apartmentId: String(data.apartmentId),
        });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await fetch(`/api/admin/reservations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        apartmentId: parseInt(form.apartmentId),
      }),
    });

    setSaving(false);
    router.push("/admin/rezervasyonlar");
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/admin/reservations/${id}`, { method: "DELETE" });
    setDeleting(false);
    router.push("/admin/rezervasyonlar");
  };

  if (loading) {
    return <div className="text-center py-12 text-muted">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/rezervasyonlar"
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display font-bold text-primary">
                Rezervasyon #{reservation?.id}
              </h1>
              <StatusBadge status={form.status} />
            </div>
            <p className="text-muted text-sm mt-1">
              {reservation?.apartment?.type}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowDelete(true)}
          className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Trash2 size={18} />
          Sil
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-light-gray p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Durum"
            name="status"
            type="select"
            value={form.status}
            onChange={handleChange}
            required
            options={[
              { value: "PENDING", label: "Beklemede" },
              { value: "CONFIRMED", label: "Onaylandı" },
              { value: "CANCELLED", label: "İptal" },
              { value: "COMPLETED", label: "Tamamlandı" },
            ]}
            className="md:col-span-2"
          />
          <FormField
            label="Misafir Adı"
            name="guestName"
            value={form.guestName}
            onChange={handleChange}
            required
          />
          <FormField
            label="Telefon"
            name="guestPhone"
            value={form.guestPhone}
            onChange={handleChange}
            required
          />
          <FormField
            label="E-posta"
            name="guestEmail"
            type="email"
            value={form.guestEmail}
            onChange={handleChange}
          />
          <FormField
            label="Kiralama Türü"
            name="rentalType"
            type="select"
            value={form.rentalType}
            onChange={handleChange}
            options={[
              { value: "daily", label: "Günlük" },
              { value: "monthly", label: "Aylık" },
              { value: "yearly", label: "Yıllık" },
            ]}
          />
          <FormField
            label="Giriş Tarihi"
            name="checkIn"
            type="date"
            value={form.checkIn}
            onChange={handleChange}
            required
          />
          <FormField
            label="Çıkış Tarihi"
            name="checkOut"
            type="date"
            value={form.checkOut}
            onChange={handleChange}
            required
          />
          <FormField
            label="Toplam Tutar (TL)"
            name="totalPrice"
            type="number"
            value={form.totalPrice}
            onChange={handleChange}
          />
          <FormField
            label="Notlar"
            name="notes"
            type="textarea"
            value={form.notes}
            onChange={handleChange}
            className="md:col-span-2"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Kaydediliyor..." : "Güncelle"}
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={showDelete}
        message="Bu rezervasyonu silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={deleting}
      />
    </div>
  );
}
