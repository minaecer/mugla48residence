"use client";

import {
  Sofa,
  Wifi,
  UtensilsCrossed,
  WashingMachine,
  SprayCan,
  Building2,
  MapPin,
  CalendarDays,
  Heart,
  Home,
} from "lucide-react";
import { MotionFadeUp, MotionStagger, MotionStaggerItem } from "./MotionWrapper";
import { getIcon } from "@/lib/icon-map";
import { useT } from "@/lib/i18n/context";

const defaultIcons = [
  Sofa,
  Wifi,
  UtensilsCrossed,
  WashingMachine,
  SprayCan,
  Building2,
  MapPin,
  CalendarDays,
  Heart,
  Home,
];

type AmenityProp = {
  icon: string;
  label: string;
};

export default function Amenities({ amenities: amenitiesProp }: { amenities?: AmenityProp[] }) {
  const { t, locale } = useT();

  const useDbData = locale !== "en" && amenitiesProp && amenitiesProp.length > 0;

  const resolvedAmenities = useDbData
    ? amenitiesProp!.map((a) => ({
        icon: getIcon(a.icon),
        label: a.label,
      }))
    : t.amenities.list.map((label, i) => ({
        icon: defaultIcons[i] || Sofa,
        label,
      }));

  return (
    <section id="olanaklar" className="section-padding bg-white">
      <div className="container-page">
        <MotionFadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t.amenities.eyebrow}</span>
            <h2 className="heading-display mt-4 text-[2rem] sm:text-4xl md:text-[2.5rem]">
              {t.amenities.title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              {t.amenities.subtitle}
            </p>
          </div>
        </MotionFadeUp>

        <MotionStagger className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {resolvedAmenities.map((amenity) => (
            <MotionStaggerItem key={amenity.label}>
              <div className="group flex h-full flex-col items-start gap-4 rounded-xl border border-line bg-cream p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <amenity.icon className="h-5 w-5" />
                </div>
                <span className="text-[0.875rem] font-semibold text-primary">
                  {amenity.label}
                </span>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
