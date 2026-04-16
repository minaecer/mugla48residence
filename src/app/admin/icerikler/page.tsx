"use client";

import { useState, useEffect } from "react";
import { Save, ChevronDown, ChevronRight } from "lucide-react";

interface SiteContentItem {
  id: number;
  key: string;
  value: string;
}

interface Section {
  title: string;
  keys: { key: string; label: string; type: "input" | "textarea" | "json" }[];
}

const SECTIONS: Section[] = [
  {
    title: "Hero",
    keys: [
      { key: "hero_title", label: "Hero Başlık", type: "input" },
      { key: "hero_subtitle", label: "Hero Alt Başlık", type: "textarea" },
    ],
  },
  {
    title: "Hakkımızda",
    keys: [
      { key: "about_title", label: "Başlık", type: "input" },
      { key: "about_text1", label: "Metin 1", type: "textarea" },
      { key: "about_text2", label: "Metin 2", type: "textarea" },
      { key: "about_values", label: "Değerler (JSON)", type: "json" },
    ],
  },
  {
    title: "Özellikler",
    keys: [
      { key: "features", label: "Özellikler (JSON Array)", type: "json" },
    ],
  },
  {
    title: "Olanaklar",
    keys: [
      { key: "amenities", label: "Olanaklar (JSON Array)", type: "json" },
    ],
  },
  {
    title: "Kiralama Modelleri",
    keys: [
      { key: "rental_models", label: "Kiralama Modelleri (JSON Array)", type: "json" },
    ],
  },
  {
    title: "İletişim",
    keys: [
      { key: "contact_phone", label: "Telefon", type: "input" },
      { key: "contact_email", label: "E-posta", type: "input" },
      { key: "contact_address", label: "Adres", type: "textarea" },
      { key: "whatsapp_number", label: "WhatsApp Numarası", type: "input" },
    ],
  },
  {
    title: "Konum",
    keys: [
      { key: "location_lat", label: "Enlem (Lat)", type: "input" },
      { key: "location_lng", label: "Boylam (Lng)", type: "input" },
      { key: "location_embed", label: "Harita Embed Kodu", type: "textarea" },
    ],
  },
];

export default function SiteContentPage() {
  const [contentMap, setContentMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((r) => r.json())
      .then((data: SiteContentItem[]) => {
        const map: Record<string, string> = {};
        data.forEach((item) => {
          map[item.key] = item.value;
        });
        setContentMap(map);
        setLoading(false);
        // Open first section by default
        if (SECTIONS.length > 0) {
          setOpenSections({ [SECTIONS[0].title]: true });
        }
      });
  }, []);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleValueChange = (key: string, value: string) => {
    setContentMap((prev) => ({ ...prev, [key]: value }));
  };

  const saveSection = async (section: Section) => {
    setSavingSection(section.title);

    const items = section.keys.map((k) => ({
      key: k.key,
      value: contentMap[k.key] || "",
    }));

    await fetch("/api/admin/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    setSavingSection(null);
    setSaveSuccess(section.title);
    setTimeout(() => setSaveSuccess(null), 2000);
  };

  if (loading) {
    return <div className="text-center py-12 text-muted">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-primary">
          Site İçerikleri
        </h1>
        <p className="text-muted text-sm mt-1">
          Web sitesi metin ve ayarlarını düzenleyin
        </p>
      </div>

      <div className="space-y-3 max-w-3xl">
        {SECTIONS.map((section) => {
          const isOpen = openSections[section.title] || false;

          return (
            <div
              key={section.title}
              className="bg-white rounded-xl border border-light-gray overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-cream/30 transition-colors"
              >
                <h2 className="text-lg font-semibold text-primary">
                  {section.title}
                </h2>
                {isOpen ? (
                  <ChevronDown size={20} className="text-muted" />
                ) : (
                  <ChevronRight size={20} className="text-muted" />
                )}
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-6 pb-6 border-t border-light-gray/50">
                  <div className="space-y-4 mt-4">
                    {section.keys.map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-primary mb-1.5">
                          {field.label}
                        </label>
                        {field.type === "input" ? (
                          <input
                            type="text"
                            value={contentMap[field.key] || ""}
                            onChange={(e) =>
                              handleValueChange(field.key, e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-light-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                          />
                        ) : (
                          <textarea
                            value={contentMap[field.key] || ""}
                            onChange={(e) =>
                              handleValueChange(field.key, e.target.value)
                            }
                            rows={field.type === "json" ? 8 : 4}
                            className={`w-full px-4 py-2.5 border border-light-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none ${
                              field.type === "json" ? "font-mono text-xs" : ""
                            }`}
                          />
                        )}
                        <p className="text-xs text-muted mt-1">
                          Anahtar: <code className="bg-cream px-1 rounded">{field.key}</code>
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() => saveSection(section)}
                      disabled={savingSection === section.title}
                      className="flex items-center gap-2 bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                      <Save size={16} />
                      {savingSection === section.title
                        ? "Kaydediliyor..."
                        : "Kaydet"}
                    </button>
                    {saveSuccess === section.title && (
                      <span className="text-sm text-green-600 font-medium">
                        Kaydedildi!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
