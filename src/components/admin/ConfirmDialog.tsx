"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  title = "Silme Onayı",
  message,
  confirmLabel = "Sil",
  cancelLabel = "İptal",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-muted hover:text-primary transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon + Title */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <p className="text-sm text-muted mt-1">{message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-muted bg-cream hover:bg-light-gray rounded-lg transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Siliniyor..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
