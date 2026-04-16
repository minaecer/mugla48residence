import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

// Media base — prefers MinIO public URL via MEDIA_BASE_URL, falls back to static /galeri/large for local dev without MinIO.
// All images live under key prefix `galeri/large/` in the bucket.
const MEDIA_BASE = process.env.MEDIA_BASE_URL || "";
const media = (file: string) =>
  MEDIA_BASE ? `${MEDIA_BASE.replace(/\/$/, "")}/galeri/large/${file}` : `/galeri/large/${file}`;

async function main() {
  // Admin User
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || adminPassword.length < 12) {
    throw new Error("ADMIN_PASSWORD env var is required (min 12 chars). Set it before seeding.");
  }
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: "admin@mugla48residence.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@mugla48residence.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  // Apartments
  await prisma.apartment.upsert({
    where: { slug: "1-plus-1" },
    update: {},
    create: {
      slug: "1-plus-1",
      type: "1+1 Daire",
      size: "45-55 m²",
      capacity: "1-2 Kişi",
      description: "Tek kişi veya çiftler için ideal, kompakt ve şık tasarımlı tam donanımlı daireler.",
      longDescription: "Modern ve fonksiyonel tasarımıyla öne çıkan 1+1 dairelerimiz, şehir merkezinde konforlu bir yaşam sunmaktadır. Her detayı titizlikle düşünülmüş bu dairelerde, kaliteli mobilyalar, tam donanımlı mutfak ve ferah yaşam alanları sizi bekliyor.",
      rooms: JSON.stringify([{ icon: "Bed", label: "1 Yatak Odası" }, { icon: "Tv", label: "Smart TV" }, { icon: "Wind", label: "Klima" }, { icon: "Wifi", label: "Yüksek Hızlı Wi-Fi" }]),
      kitchen: JSON.stringify(["Buzdolabı", "Mikrodalga", "Ocak & Fırın", "Çay/Kahve makinesi", "Tencere & tava seti", "Tabak & bardak seti"]),
      bathroom: JSON.stringify(["Duşakabin", "Havlu seti", "Saç kurutma makinesi", "Banyo dolabı"]),
      general: JSON.stringify(["Çamaşır makinesi", "Ütü & ütü masası", "Elektrik süpürgesi", "Geniş gardırop"]),
      rentalSuitability: JSON.stringify(["Günlük", "Haftalık", "Aylık", "Yıllık"]),
      features: JSON.stringify(["Tam donanımlı mutfak", "Klima", "Yüksek hızlı Wi-Fi", "Çamaşır makinesi", "Smart TV", "Şık banyo"]),
      accent: "from-accent/20 to-accent/5",
      order: 0,
    },
  });

  await prisma.apartment.upsert({
    where: { slug: "2-plus-1" },
    update: {},
    create: {
      slug: "2-plus-1",
      type: "2+1 Daire",
      size: "75-90 m²",
      capacity: "2-4 Kişi",
      description: "Aileler ve geniş ihtiyaçlar için ferah, konforlu ve tam donanımlı geniş daireler.",
      longDescription: "Geniş ve ferah 2+1 dairelerimiz, aileler ve uzun dönem konaklamalar için idealdir. İki ayrı yatak odası, geniş salon, tam donanımlı mutfak ve balkon ile ev konforunu residence kalitesiyle birleştiriyoruz.",
      rooms: JSON.stringify([{ icon: "Bed", label: "2 Yatak Odası" }, { icon: "Tv", label: "Smart TV" }, { icon: "Wind", label: "Klima (Tüm Odalarda)" }, { icon: "Wifi", label: "Yüksek Hızlı Wi-Fi" }]),
      kitchen: JSON.stringify(["Büyük buzdolabı", "Bulaşık makinesi", "Ocak & Fırın", "Mikrodalga", "Çay/Kahve makinesi", "Komple mutfak seti"]),
      bathroom: JSON.stringify(["Geniş duşakabin", "Havlu seti", "Saç kurutma makinesi", "Banyo dolabı", "Ayna"]),
      general: JSON.stringify(["Çamaşır makinesi", "Bulaşık makinesi", "Ütü & ütü masası", "Elektrik süpürgesi", "Geniş gardırop", "Balkon"]),
      rentalSuitability: JSON.stringify(["Günlük", "Haftalık", "Aylık", "Yıllık"]),
      features: JSON.stringify(["Geniş salon", "2 yatak odası", "Full mutfak", "Klima (tüm odalarda)", "Çamaşır & bulaşık makinesi", "Balkon"]),
      accent: "from-primary/10 to-primary/5",
      order: 1,
    },
  });

  // Testimonials
  const testimonials = [
    { name: "Ayşe K.", role: "Aylık Kiracı", rating: 5, text: "Muğla'ya iş için geldiğimde ev arar gibi aramadım. Muğla 48 Residence ile hemen yerleştim. Temizlik ve düzen mükemmel.", theme: "Temizlik", order: 0 },
    { name: "Mehmet D.", role: "Haftalık Konaklama", rating: 5, text: "Otel yerine burayı tercih etmek çok doğru bir karardı. Tam donanımlı, merkezi konumda, her şey düşünülmüş.", theme: "Konfor", order: 1 },
    { name: "Elif T.", role: "Yıllık Kiracı", rating: 5, text: "İki yıldır burada yaşıyorum. Lokasyon harika, yönetim ilgili ve daire kalitesi üst düzey. Tavsiye ederim.", theme: "Lokasyon", order: 2 },
    { name: "Burak S.", role: "Günlük Konaklama", rating: 5, text: "Üniversite ziyareti için geldik. Daire tertemiz, modern ve güvenli. Fiyat-performans açısından çok memnun kaldık.", theme: "Güven", order: 3 },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // Apartment images
  await prisma.apartmentImage.deleteMany({});

  const onePlusOne = await prisma.apartment.findUnique({ where: { slug: "1-plus-1" } });
  const twoPlusOne = await prisma.apartment.findUnique({ where: { slug: "2-plus-1" } });

  const onePlusOneImages = [
    { file: "Junior1.jpg",    alt: "1+1 Daire - Junior Suit" },
    { file: "Junior2.jpg",    alt: "1+1 Daire - Yatak Odası" },
    { file: "Junior3.jpg",    alt: "1+1 Daire - Görünüm" },
    { file: "Junior4.jpg",    alt: "1+1 Daire - Detay" },
    { file: "deluxesuit1.jpg",alt: "1+1 Daire - Deluxe" },
    { file: "IMG_4547_1.jpg", alt: "1+1 Daire - Yaşam Alanı" },
    { file: "IMG_4590.jpg",   alt: "1+1 Daire - Oturma Alanı" },
    { file: "BUZDOLABI.jpg",  alt: "1+1 Daire - Mutfak" },
  ];
  const twoPlusOneImages = [
    { file: "DUBLEX_MERDVEN.jpg",  alt: "2+1 Dublex - Merdiven" },
    { file: "DUBLEX_MERDVEN2.jpg", alt: "2+1 Dublex - Üst Kat" },
    { file: "IMG_4618.jpg",        alt: "2+1 Daire - Salon" },
    { file: "IMG_4620.jpg",        alt: "2+1 Daire - Yaşam Alanı" },
    { file: "IMG_4628.jpg",        alt: "2+1 Daire - Görünüm" },
    { file: "IMG_4675.jpg",        alt: "2+1 Daire - Detay" },
    { file: "IMG_2998.jpg",        alt: "2+1 Daire - İç Mekan" },
    { file: "DSC_8245.jpg",        alt: "2+1 Daire - Genel" },
  ];

  if (onePlusOne) {
    for (let i = 0; i < onePlusOneImages.length; i++) {
      await prisma.apartmentImage.create({
        data: {
          apartmentId: onePlusOne.id,
          imageUrl: media(onePlusOneImages[i].file),
          alt: onePlusOneImages[i].alt,
          order: i,
        },
      });
    }
  }
  if (twoPlusOne) {
    for (let i = 0; i < twoPlusOneImages.length; i++) {
      await prisma.apartmentImage.create({
        data: {
          apartmentId: twoPlusOne.id,
          imageUrl: media(twoPlusOneImages[i].file),
          alt: twoPlusOneImages[i].alt,
          order: i,
        },
      });
    }
  }

  // Remove existing gallery entries so re-seed stays clean
  await prisma.galleryImage.deleteMany({});

  // Gallery Images — real files under public/galeri
  const galleryImages = [
    { file: "deluxesuit1.jpg",    title: "Deluxe Suit",            category: "Yatak Odası", height: "h-72" },
    { file: "Junior1.jpg",        title: "Junior Suit",            category: "Yatak Odası", height: "h-56" },
    { file: "Junior2.jpg",        title: "Junior Suit - Detay",    category: "Yatak Odası", height: "h-64" },
    { file: "Junior3.jpg",        title: "Junior Suit - Görünüm",  category: "Yatak Odası", height: "h-56" },
    { file: "Junior4.jpg",        title: "Junior Suit - Yatak",    category: "Yatak Odası", height: "h-72" },
    { file: "BUZDOLABI.jpg",      title: "Tam Donanımlı Mutfak",   category: "Mutfak",      height: "h-64" },
    { file: "DUBLEX_MERDVEN.jpg", title: "Dublex Merdiven",        category: "İç Mekan",    height: "h-72" },
    { file: "DUBLEX_MERDVEN2.jpg",title: "Dublex Üst Kat",         category: "İç Mekan",    height: "h-64" },
    { file: "LOB.jpg",            title: "Lobi",                   category: "Ortak Alan",  height: "h-56" },
    { file: "IMG_2998.jpg",       title: "İç Mekan",               category: "İç Mekan",    height: "h-64" },
    { file: "IMG_4547_1.jpg",     title: "Yaşam Alanı",            category: "İç Mekan",    height: "h-56" },
    { file: "IMG_4590.jpg",       title: "Oturma Alanı",           category: "İç Mekan",    height: "h-72" },
    { file: "IMG_4618.jpg",       title: "İç Mekan Detay",         category: "İç Mekan",    height: "h-56" },
    { file: "IMG_4620.jpg",       title: "Salon",                  category: "İç Mekan",    height: "h-64" },
    { file: "IMG_4628.jpg",       title: "Salon - Görünüm",        category: "İç Mekan",    height: "h-56" },
    { file: "IMG_4675.jpg",       title: "Yaşam Alanı - Detay",    category: "İç Mekan",    height: "h-64" },
    { file: "DSC_8245.jpg",       title: "Genel Görünüm",          category: "İç Mekan",    height: "h-72" },
  ];
  for (let i = 0; i < galleryImages.length; i++) {
    const g = galleryImages[i];
    await prisma.galleryImage.create({
      data: {
        title: g.title,
        category: g.category,
        height: g.height,
        order: i,
        imageUrl: media(g.file),
        isPublished: true,
      },
    });
  }

  // Gallery Homepage Items (featured, with grid spans)
  const homepageGallery = [
    { file: "DUBLEX_MERDVEN.jpg", title: "Dublex Merdiven",      category: "İç Mekan",    span: "md:col-span-2 md:row-span-2", order: 100 },
    { file: "deluxesuit1.jpg",    title: "Deluxe Suit",          category: "Yatak Odası", span: "",                            order: 101 },
    { file: "Junior4.jpg",        title: "Junior Suit",          category: "Yatak Odası", span: "",                            order: 102 },
    { file: "BUZDOLABI.jpg",      title: "Tam Donanımlı Mutfak", category: "Mutfak",      span: "",                            order: 103 },
    { file: "LOB.jpg",            title: "Lobi",                 category: "Ortak Alan",  span: "",                            order: 104 },
  ];
  for (const item of homepageGallery) {
    await prisma.galleryImage.create({
      data: {
        title: item.title,
        category: item.category,
        span: item.span,
        order: item.order,
        imageUrl: media(item.file),
        isPublished: true,
      },
    });
  }

  // SiteContent
  const siteContent = [
    { key: "hero_title", value: "Muğla'da Lüks ve Konforlu Residence Yaşamı" },
    { key: "hero_subtitle", value: "Günlük, haftalık, aylık ve yıllık kiralamaya uygun, tam donanımlı 1+1 ve 2+1 premium daireler." },
    { key: "hero_badge", value: "Muğla Menteşe'de Premium Yaşam" },
    { key: "hero_badges", value: JSON.stringify([{ icon: "MapPin", label: "Merkezi Konum" }, { icon: "Sofa", label: "Full Eşyalı" }, { icon: "CalendarDays", label: "Esnek Kiralama" }, { icon: "Zap", label: "Hızlı Başvuru" }, { icon: "ShieldCheck", label: "Güvenli Konaklama" }]) },
    { key: "about_title", value: "Sadece Konaklama Değil, Kaliteli Bir Yaşam Alanı" },
    { key: "about_text1", value: "Muğla 48 Residence, Muğla Menteşe'nin kalbinde konumlanan, modern tasarımlı ve tam donanımlı residence daireleriyle misafirlerine üst düzey bir yaşam deneyimi sunmaktadır." },
    { key: "about_text2", value: "Amacımız; konaklamanın ötesinde, düzenli, temiz, güvenli ve prestijli bir yaşam alanı sağlamaktır. Kısa veya uzun dönem fark etmeksizin, her misafirimiz kendini evinde hissetsin istiyoruz." },
    { key: "about_values", value: JSON.stringify([{ icon: "ShieldCheck", label: "Güven" }, { icon: "Award", label: "Kalite" }, { icon: "Heart", label: "Konfor" }]) },
    { key: "features", value: JSON.stringify([
      { icon: "MapPin", title: "Merkezi Konum", description: "Muğla Menteşe şehir merkezinde, tüm sosyal olanaklara yürüme mesafesinde stratejik konum." },
      { icon: "Sparkles", title: "Şık & Tam Donanımlı", description: "Modern mobilya, beyaz eşya, klima ve tüm yaşam gereksinimleri hazır." },
      { icon: "CalendarRange", title: "Esnek Kiralama", description: "Günlük, haftalık, aylık veya yıllık — ihtiyacınıza uygun kiralama seçenekleri." },
      { icon: "SprayCan", title: "Temizlik & Düzen", description: "Her giriş öncesi profesyonel temizlik. Hijyen ve düzen önceliğimizdir." },
      { icon: "Crown", title: "Yüksek Yaşam Konforu", description: "Otel lüksü ile ev sıcaklığını birleştiren, detayları düşünülmüş yaşam alanları." },
      { icon: "HeadphonesIcon", title: "Hızlı İletişim", description: "WhatsApp, telefon veya form ile anında dönüş. Kolay ve hızlı rezervasyon süreci." },
    ]) },
    { key: "amenities", value: JSON.stringify([{ icon: "Sofa", label: "Full Eşyalı" }, { icon: "Wifi", label: "Yüksek Hızlı Wi-Fi" }, { icon: "UtensilsCrossed", label: "Mutfak Ekipmanları" }, { icon: "WashingMachine", label: "Beyaz Eşya" }, { icon: "SprayCan", label: "Temizlik & Düzen" }, { icon: "Building2", label: "Asansör" }, { icon: "MapPin", label: "Merkezi Lokasyon" }, { icon: "CalendarDays", label: "Uzun Dönem Uygunluk" }, { icon: "Heart", label: "Aile Dostu Yaşam" }, { icon: "Home", label: "Konforlu İç Mekan" }]) },
    { key: "rental_models", value: JSON.stringify([
      { icon: "Clock", title: "Günlük", description: "Kısa süreli konaklamalar için ideal. İş seyahati, misafir ağırlama veya şehir keşfi.", highlight: false },
      { icon: "CalendarDays", title: "Haftalık", description: "Bir haftadan fazla kalanlar için avantajlı fiyatlandırma. Esnek giriş-çıkış.", highlight: false },
      { icon: "CalendarRange", title: "Aylık", description: "Orta dönem konaklama ihtiyaçları için uygun fiyatlı ve konforlu çözüm.", highlight: true },
      { icon: "CalendarCheck", title: "Yıllık", description: "Uzun dönem kiralama ile evinizin konforunda, en uygun koşullarda yaşam.", highlight: false },
    ]) },
    { key: "contact_phone", value: "0555 123 45 67" },
    { key: "contact_email", value: "info@mugla48residence.com" },
    { key: "contact_address", value: "Menteşe, Muğla" },
    { key: "contact_whatsapp", value: "+905551234567" },
    { key: "nearby_places", value: JSON.stringify([{ icon: "GraduationCap", label: "Muğla Sıtkı Koçman Üniversitesi", distance: "~ 5 dk" }, { icon: "Stethoscope", label: "Muğla Devlet Hastanesi", distance: "~ 5 dk" }, { icon: "ShoppingBag", label: "Menteşe Çarşı Merkezi", distance: "~ 3 dk" }, { icon: "Landmark", label: "Resmi Kurumlar", distance: "~ 5 dk" }, { icon: "Bus", label: "Şehirlerarası Otobüs Terminali", distance: "~ 10 dk" }, { icon: "MapPin", label: "Muğla Merkez", distance: "Yürüme mesafesinde" }]) },
  ];
  for (const content of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: { value: content.value },
      create: content,
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
