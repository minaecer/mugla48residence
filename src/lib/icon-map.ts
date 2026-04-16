"use client";

import {
  MapPin,
  Sparkles,
  CalendarRange,
  SprayCan,
  Crown,
  HeadphonesIcon,
  Sofa,
  Wifi,
  UtensilsCrossed,
  WashingMachine,
  Building2,
  CalendarDays,
  Heart,
  Home,
  Clock,
  CalendarCheck,
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Landmark,
  Bus,
  ShieldCheck,
  Award,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Sparkles,
  CalendarRange,
  SprayCan,
  Crown,
  HeadphonesIcon,
  Sofa,
  Wifi,
  UtensilsCrossed,
  WashingMachine,
  Building2,
  CalendarDays,
  Heart,
  Home,
  Clock,
  CalendarCheck,
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Landmark,
  Bus,
  ShieldCheck,
  Award,
  Zap,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || MapPin;
}

export default iconMap;
