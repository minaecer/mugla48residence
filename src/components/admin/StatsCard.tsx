import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  color?: "accent" | "blue" | "green" | "orange" | "red";
}

const colorMap = {
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
  },
};

export default function StatsCard({
  title,
  count,
  icon: Icon,
  color = "accent",
}: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-xl border border-light-gray p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <p className="text-3xl font-bold text-primary mt-1">{count}</p>
        </div>
        <div
          className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}
        >
          <Icon size={24} className={colors.text} />
        </div>
      </div>
    </div>
  );
}
