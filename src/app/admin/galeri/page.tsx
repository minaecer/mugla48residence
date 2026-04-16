"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, GripVertical } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  order: number;
  isPublished: boolean;
  apartment: { type: string } | null;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/gallery/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchData();
  };

  const togglePublished = async (img: GalleryImage) => {
    await fetch(`/api/admin/gallery/${img.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...img, isPublished: !img.isPublished, apartmentId: null }),
    });
    fetchData();
  };

  const updateOrder = async (img: GalleryImage, newOrder: number) => {
    await fetch("/api/admin/gallery/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: img.id, order: newOrder }],
      }),
    });
    fetchData();
  };

  const categoryLabels: Record<string, string> = {
    exterior: "Dış Mekan",
    interior: "İç Mekan",
    view: "Manzara",
    amenity: "Olanak",
    detail: "Detay",
  };

  if (loading) {
    return <div className="text-center py-12 text-muted">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Galeri
          </h1>
          <p className="text-muted text-sm mt-1">
            Galeri görsellerini yönetin
          </p>
        </div>
        <Link
          href="/admin/galeri/new"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={18} />
          Yeni Görsel
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-xl border border-light-gray overflow-hidden group"
          >
            <div className="relative aspect-video bg-cream">
              {img.imageUrl ? (
                <Image
                  src={img.imageUrl}
                  alt={img.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted text-sm">
                  Görsel yok
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-primary truncate">{img.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted">
                  {categoryLabels[img.category] || img.category}
                </span>
                <div className="flex items-center gap-1">
                  <GripVertical size={14} className="text-muted" />
                  <input
                    type="number"
                    value={img.order}
                    onChange={(e) => updateOrder(img, parseInt(e.target.value) || 0)}
                    className="w-12 text-xs text-center border border-light-gray rounded px-1 py-0.5"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => togglePublished(img)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    img.isPublished
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-50 text-gray-500 border border-gray-200"
                  }`}
                >
                  {img.isPublished ? "Yayında" : "Taslak"}
                </button>
                <button
                  onClick={() => setDeleteId(img.id)}
                  className="p-1.5 text-muted hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted">
            Henüz görsel eklenmemiş.
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        message="Bu görseli silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
