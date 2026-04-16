"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import FormField from "@/components/admin/FormField";

interface ApartmentOption {
  id: number;
  type: string;
  slug: string;
}

export default function NewReservationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [apartments, setApartments] = useState<ApartmentOption[]>([]);
  const [form, setForm] = useState({
    apartmentId: "",
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    checkIn: "",
    checkOut: "",
    rentalType: "",
    totalPrice: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/admin/apartments")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setApartments(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        apartmentId: parseInt(form.apartmentId),
      }),
    });

    if (res.ok) {
      router.push("/admin/rezervasyonlar");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/rezervasyonlar"
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Yeni Rezervasyon
          </h1>
          <p className="text-muted text-sm mt-1">Yeni rezervasyon oluşturun</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-light-gray p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Daire"
            name="apartmentId"
            type="select"
            value={form.apartmentId}
            onChange={handleChange}
            required
            options={apartments.map((a) => ({
              value: String(a.id),
              label: a.type,
            }))}
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
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
