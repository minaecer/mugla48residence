"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import FormField from "@/components/admin/FormField";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: "5",
    text: "",
    theme: "",
    isPublished: true,
    order: "0",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/yorumlar");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/yorumlar"
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Yeni Yorum
          </h1>
          <p className="text-muted text-sm mt-1">Yeni müşteri yorumu ekleyin</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-light-gray p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Ad Soyad"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <FormField
            label="Rol / Unvan"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            placeholder="Örn: Yazlıkçı, Kiracı"
          />
          <FormField
            label="Puan (1-5)"
            name="rating"
            type="select"
            value={form.rating}
            onChange={handleChange}
            required
            options={[
              { value: "1", label: "1 Yıldız" },
              { value: "2", label: "2 Yıldız" },
              { value: "3", label: "3 Yıldız" },
              { value: "4", label: "4 Yıldız" },
              { value: "5", label: "5 Yıldız" },
            ]}
          />
          <FormField
            label="Tema"
            name="theme"
            value={form.theme}
            onChange={handleChange}
            placeholder="Örn: blue, green, warm"
          />
          <FormField
            label="Yorum Metni"
            name="text"
            type="textarea"
            value={form.text}
            onChange={handleChange}
            required
            rows={4}
            className="md:col-span-2"
          />
          <FormField
            label="Sıra"
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
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
