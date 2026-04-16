"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import FormField from "@/components/admin/FormField";

export default function NewUserPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/kullanicilar");
    } else {
      const data = await res.json();
      setError(data.error || "Bir hata oluştu.");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/kullanicilar"
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Yeni Kullanıcı
          </h1>
          <p className="text-muted text-sm mt-1">
            Yeni sistem kullanıcısı ekleyin
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-light-gray p-6 max-w-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <FormField
            label="Ad Soyad"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <FormField
            label="E-posta"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FormField
            label="Şifre"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <FormField
            label="Rol"
            name="role"
            type="select"
            value={form.role}
            onChange={handleChange}
            required
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "EDITOR", label: "Editör" },
            ]}
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
