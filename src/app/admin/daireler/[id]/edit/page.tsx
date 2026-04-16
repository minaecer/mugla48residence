"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ApartmentForm from "@/components/admin/ApartmentForm";

export default function EditApartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState<Record<string, unknown> | undefined>();

  useEffect(() => {
    fetch(`/api/admin/apartments/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    setSaving(true);
    const res = await fetch(`/api/admin/apartments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/daireler");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-center py-12 text-muted">Yükleniyor...</div>;
  }

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
            Daireyi Düzenle
          </h1>
          <p className="text-muted text-sm mt-1">Daire bilgilerini güncelleyin</p>
        </div>
      </div>

      <ApartmentForm
        initialData={initialData}
        onSubmit={handleSubmit}
        saving={saving}
        mode="edit"
      />
    </div>
  );
}
