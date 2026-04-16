"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import FormField from "@/components/admin/FormField";
import { parseJSON } from "@/lib/json";

interface ApartmentFormProps {
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
  saving: boolean;
  mode: "create" | "edit";
}

const JSON_FIELDS = ["rooms", "kitchen", "bathroom", "general", "rentalSuitability", "features"];

const JSON_FIELD_LABELS: Record<string, string> = {
  rooms: "Odalar",
  kitchen: "Mutfak",
  bathroom: "Banyo",
  general: "Genel Özellikler",
  rentalSuitability: "Kiralama Uygunluğu",
  features: "Öne Çıkan Özellikler",
};

function jsonToLines(val: unknown): string {
  if (typeof val === "string") {
    const arr = parseJSON<string[]>(val, []);
    return arr.join("\n");
  }
  if (Array.isArray(val)) {
    return val.join("\n");
  }
  return "";
}

export default function ApartmentForm({ initialData, onSubmit, saving, mode }: ApartmentFormProps) {
  const [form, setForm] = useState({
    slug: "",
    type: "",
    size: "",
    capacity: "",
    description: "",
    longDescription: "",
    accent: "blue",
    isPublished: true,
    order: "0",
  });

  const [jsonFields, setJsonFields] = useState<Record<string, string>>({
    rooms: "",
    kitchen: "",
    bathroom: "",
    general: "",
    rentalSuitability: "",
    features: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        slug: (initialData.slug as string) || "",
        type: (initialData.type as string) || "",
        size: (initialData.size as string) || "",
        capacity: (initialData.capacity as string) || "",
        description: (initialData.description as string) || "",
        longDescription: (initialData.longDescription as string) || "",
        accent: (initialData.accent as string) || "blue",
        isPublished: initialData.isPublished !== false,
        order: String(initialData.order ?? 0),
      });

      const jf: Record<string, string> = {};
      for (const field of JSON_FIELDS) {
        jf[field] = jsonToLines(initialData[field]);
      }
      setJsonFields(jf);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleJsonChange = (field: string, value: string) => {
    setJsonFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: Record<string, unknown> = { ...form };

    for (const field of JSON_FIELDS) {
      const lines = jsonFields[field]
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      data[field] = lines;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-light-gray p-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          placeholder="ornek-daire-1-1"
        />
        <FormField
          label="Tip"
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          placeholder="1+1 Daire"
        />
        <FormField
          label="Büyüklük"
          name="size"
          value={form.size}
          onChange={handleChange}
          required
          placeholder="65m²"
        />
        <FormField
          label="Kapasite"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          required
          placeholder="2-4 Kişi"
        />
        <FormField
          label="Accent Renk"
          name="accent"
          type="select"
          value={form.accent}
          onChange={handleChange}
          options={[
            { value: "blue", label: "Mavi" },
            { value: "green", label: "Yeşil" },
            { value: "warm", label: "Sıcak" },
            { value: "purple", label: "Mor" },
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
          label="Kısa Açıklama"
          name="description"
          type="textarea"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="md:col-span-2"
        />
        <FormField
          label="Detaylı Açıklama"
          name="longDescription"
          type="textarea"
          value={form.longDescription}
          onChange={handleChange}
          required
          rows={5}
          className="md:col-span-2"
        />

        {JSON_FIELDS.map((field) => (
          <div key={field} className="md:col-span-2">
            <label className="block text-sm font-medium text-primary mb-1.5">
              {JSON_FIELD_LABELS[field]}
            </label>
            <textarea
              value={jsonFields[field]}
              onChange={(e) => handleJsonChange(field, e.target.value)}
              rows={4}
              placeholder="Her satıra bir özellik yazın"
              className="w-full px-4 py-2.5 border border-light-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
            />
          </div>
        ))}

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
          {saving ? "Kaydediliyor..." : mode === "create" ? "Kaydet" : "Güncelle"}
        </button>
      </div>
    </form>
  );
}
