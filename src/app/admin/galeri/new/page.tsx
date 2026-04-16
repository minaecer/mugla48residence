"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import FormField from "@/components/admin/FormField";
import ImageUploader from "@/components/admin/ImageUploader";

interface ApartmentOption {
  id: number;
  type: string;
}

export default function NewGalleryImagePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [apartments, setApartments] = useState<ApartmentOption[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    imageUrl: "",
    order: "0",
    height: "",
    span: "",
    apartmentId: "",
    isPublished: true,
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

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/galeri");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/galeri"
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Yeni Görsel
          </h1>
          <p className="text-muted text-sm mt-1">Galeriye yeni görsel ekleyin</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-light-gray p-6 max-w-2xl">
        <div className="mb-6">
          <label className="block text-sm font-medium text-primary mb-2">
            Görsel <span className="text-red-500">*</span>
          </label>
          <ImageUploader
            value={form.imageUrl}
            onChange={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Başlık"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Görsel başlığı"
          />
          <FormField
            label="Kategori"
            name="category"
            type="select"
            value={form.category}
            onChange={handleChange}
            required
            options={[
              { value: "exterior", label: "Dış Mekan" },
              { value: "interior", label: "İç Mekan" },
              { value: "view", label: "Manzara" },
              { value: "amenity", label: "Olanak" },
              { value: "detail", label: "Detay" },
            ]}
          />
          <FormField
            label="Sıra"
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
          />
          <FormField
            label="Yükseklik (CSS)"
            name="height"
            value={form.height}
            onChange={handleChange}
            placeholder="Örn: tall, short"
          />
          <FormField
            label="Genişlik (CSS)"
            name="span"
            value={form.span}
            onChange={handleChange}
            placeholder="Örn: wide"
          />
          <FormField
            label="Daire"
            name="apartmentId"
            type="select"
            value={form.apartmentId}
            onChange={handleChange}
            options={apartments.map((a) => ({
              value: String(a.id),
              label: a.type,
            }))}
          />
          <div className="flex items-center gap-3 self-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, isPublished: e.target.checked }))
                }
                className="w-4 h-4 rounded border-light-gray text-accent focus:ring-accent"
              />
              <span className="text-sm font-medium text-primary">Yayınla</span>
            </label>
          </div>
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
