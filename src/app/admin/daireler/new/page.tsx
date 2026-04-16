"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ApartmentForm from "@/components/admin/ApartmentForm";

export default function NewApartmentPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: Record<string, unknown>) => {
    setSaving(true);
    const res = await fetch("/api/admin/apartments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/daireler");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/daireler"
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Yeni Daire
          </h1>
          <p className="text-muted text-sm mt-1">Yeni daire ekleyin</p>
        </div>
      </div>

      <ApartmentForm onSubmit={handleSubmit} saving={saving} mode="create" />
    </div>
  );
}
