"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  theme: string | null;
  isPublished: boolean;
  order: number;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/testimonials/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchData();
  };

  const togglePublished = async (t: Testimonial) => {
    await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...t, isPublished: !t.isPublished }),
    });
    fetchData();
  };

  if (loading) {
    return <div className="text-center py-12 text-muted">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Yorumlar
          </h1>
          <p className="text-muted text-sm mt-1">
            Müşteri yorumlarını yönetin
          </p>
        </div>
        <Link
          href="/admin/yorumlar/new"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={18} />
          Yeni Yorum
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl border border-light-gray p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-primary">{t.name}</h3>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/yorumlar/${t.id}/edit`}
                  className="p-1.5 text-muted hover:text-accent transition-colors"
                >
                  <Edit size={16} />
                </Link>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="p-1.5 text-muted hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < t.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>

            <p className="text-sm text-muted line-clamp-3 mb-4">{t.text}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Sıra: {t.order}</span>
              <button
                onClick={() => togglePublished(t)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  t.isPublished
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-gray-50 text-gray-500 border border-gray-200"
                }`}
              >
                {t.isPublished ? "Yayında" : "Taslak"}
              </button>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted">
            Henüz yorum eklenmemiş.
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        message="Bu yorumu silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
