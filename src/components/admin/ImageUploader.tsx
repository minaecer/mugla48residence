"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  if (value) {
    return (
      <div className="relative inline-block">
        <Image
          src={value}
          alt="Uploaded"
          width={200}
          height={150}
          className="rounded-lg border border-light-gray object-cover"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        dragOver
          ? "border-accent bg-accent/5"
          : "border-light-gray hover:border-accent/50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      {uploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 size={32} className="text-accent animate-spin" />
          <p className="text-sm text-muted">Yükleniyor...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload size={32} className="text-muted" />
          <p className="text-sm text-muted">
            Sürükle bırak veya tıklayarak görsel seçin
          </p>
          <p className="text-xs text-muted/70">JPEG, PNG, WebP — Maks 5MB</p>
        </div>
      )}
    </div>
  );
}
