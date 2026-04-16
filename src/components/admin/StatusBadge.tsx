const statusStyles: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  CONTACTED: "bg-yellow-50 text-yellow-700 border-yellow-200",
  RESOLVED: "bg-green-50 text-green-700 border-green-200",
  PENDING: "bg-orange-50 text-orange-700 border-orange-200",
  CONFIRMED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  COMPLETED: "bg-gray-50 text-gray-700 border-gray-200",
};

const statusLabels: Record<string, string> = {
  NEW: "Yeni",
  CONTACTED: "İletişime Geçildi",
  RESOLVED: "Çözüldü",
  PENDING: "Beklemede",
  CONFIRMED: "Onaylandı",
  CANCELLED: "İptal",
  COMPLETED: "Tamamlandı",
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] || "bg-gray-50 text-gray-600 border-gray-200";
  const label = statusLabels[status] || status;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}
    >
      {label}
    </span>
  );
}
