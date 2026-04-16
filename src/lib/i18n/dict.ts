export type Locale = "tr" | "en";

export const LOCALES: Locale[] = ["tr", "en"];
export const DEFAULT_LOCALE: Locale = "tr";

type Dict = typeof tr;

export const tr = {
  nav: {
    home: "Anasayfa",
    apartments: "Daireler",
    amenities: "Olanaklar",
    gallery: "Galeri",
    location: "Lokasyon",
    about: "Hakkımızda",
    contact: "İletişim",
    call: "Ara",
    inquiry: "Bilgi Al",
    callNow: "Hemen Ara",
    whatsappInquiry: "WhatsApp ile Bilgi Al",
    menu: "Menü",
  },
  hero: {
    eyebrow: "Muğla Menteşe · Premium Residence",
    title1: "Muğla'da Lüks ve Konforlu",
    title2: "Residence Yaşamı",
    subtitle:
      "Günlük, haftalık, aylık ve yıllık kiralamaya uygun, tam donanımlı 1+1 ve 2+1 premium daireler.",
    ctaPrimary: "Daireleri Keşfedin",
    ctaSecondary: "WhatsApp ile Bilgi Al",
    stats: {
      types: "Daire Tipleri",
      area: "Yaşam Alanı",
      models: "Kiralama",
    },
    trust: {
      location: "Merkezi Konum",
      furnished: "Full Eşyalı",
      rental: "Esnek Kiralama",
      safe: "Güvenli Konaklama",
    },
  },
  apartments: {
    eyebrow: "Daire Tipleri",
    title: "Size Uygun Daireyi Seçin",
    subtitle:
      "İhtiyacınıza göre 1+1 veya 2+1 tam donanımlı dairelerimizi keşfedin. Her daire kaliteli mobilya, beyaz eşya ve detay işçiliğiyle hazırlandı.",
    premium: "Premium",
    priceContact: "Fiyat için iletişim",
    viewDetails: "Detayları İncele",
    askPrice: "Fiyat Sor",
    one: {
      type: "1+1 Daireler",
      description:
        "Tek kişi veya çiftler için ideal, kompakt ve şık tasarımlı tam donanımlı daireler.",
      size: "45-55 m²",
      capacity: "1-2 Kişi",
      features: [
        "Tam donanımlı mutfak",
        "Klima",
        "Yüksek hızlı Wi-Fi",
        "Çamaşır makinesi",
        "Smart TV",
        "Şık banyo",
      ],
      longDescription:
        "Modern ve fonksiyonel tasarımıyla öne çıkan 1+1 dairelerimiz, şehir merkezinde konforlu bir yaşam sunmaktadır. Her detayı titizlikle düşünülmüş bu dairelerde, kaliteli mobilyalar, tam donanımlı mutfak ve ferah yaşam alanları sizi bekliyor.",
      rooms: [
        { icon: "Bed", label: "1 Yatak Odası" },
        { icon: "Tv", label: "Smart TV" },
        { icon: "Wind", label: "Klima" },
        { icon: "Wifi", label: "Yüksek Hızlı Wi-Fi" },
      ],
      kitchen: ["Buzdolabı", "Mikrodalga", "Ocak & Fırın", "Çay/Kahve makinesi", "Tencere & tava seti", "Tabak & bardak seti"],
      bathroom: ["Duşakabin", "Havlu seti", "Saç kurutma makinesi", "Banyo dolabı"],
      general: ["Çamaşır makinesi", "Ütü & ütü masası", "Elektrik süpürgesi", "Geniş gardırop"],
      rentalSuitability: ["Günlük", "Haftalık", "Aylık", "Yıllık"],
    },
    two: {
      type: "2+1 Daireler",
      description:
        "Aileler ve geniş ihtiyaçlar için ferah, konforlu ve tam donanımlı geniş daireler.",
      size: "75-90 m²",
      capacity: "2-4 Kişi",
      features: [
        "Geniş salon",
        "2 yatak odası",
        "Full mutfak",
        "Klima (tüm odalarda)",
        "Çamaşır & bulaşık makinesi",
        "Balkon",
      ],
      longDescription:
        "Geniş ve ferah 2+1 dairelerimiz, aileler ve uzun dönem konaklamalar için idealdir. İki ayrı yatak odası, geniş salon, tam donanımlı mutfak ve balkon ile ev konforunu residence kalitesiyle birleştiriyoruz.",
      rooms: [
        { icon: "Bed", label: "2 Yatak Odası" },
        { icon: "Tv", label: "Smart TV" },
        { icon: "Wind", label: "Klima (Tüm Odalarda)" },
        { icon: "Wifi", label: "Yüksek Hızlı Wi-Fi" },
      ],
      kitchen: ["Büyük buzdolabı", "Bulaşık makinesi", "Ocak & Fırın", "Mikrodalga", "Çay/Kahve makinesi", "Komple mutfak seti"],
      bathroom: ["Geniş duşakabin", "Havlu seti", "Saç kurutma makinesi", "Banyo dolabı", "Ayna"],
      general: ["Çamaşır makinesi", "Bulaşık makinesi", "Ütü & ütü masası", "Elektrik süpürgesi", "Geniş gardırop", "Balkon"],
      rentalSuitability: ["Günlük", "Haftalık", "Aylık", "Yıllık"],
    },
  },
  apartmentDetail: {
    back: "Dairelere Dön",
    apartmentType: "Daire Tipi",
    askAvailability: "Uygunluk Sorun",
    askAvailabilitySub: "Size özel fiyat teklifi için iletişime geçelim.",
    yourName: "Adınız",
    phone: "Telefon",
    rentalType: "Kiralama Türü",
    dropdownEmpty: "Seçiniz",
    daily: "Günlük",
    weekly: "Haftalık",
    monthly: "Aylık",
    yearly: "Yıllık",
    inquiry: "Bilgi Talep Et",
    call: "Ara",
    whatsapp: "WhatsApp",
    aboutTitle: "Detaylar ve Donanım",
    aboutEyebrow: "Daire Hakkında",
    roomFeatures: "Oda Özellikleri",
    kitchen: "Mutfak Ekipmanları",
    bathroom: "Banyo",
    general: "Genel Donanım",
    trustSafe: "Güvenli & Sorunsuz",
    trustSafeDesc: "Kimlik kaydı, düzenli sözleşme ve şeffaf süreç.",
    trustClean: "Profesyonel Temizlik",
    trustCleanDesc: "Her giriş öncesi hijyen standardında hazırlık.",
    trustFast: "Hızlı Rezervasyon",
    trustFastDesc: "24 saat içinde uygunluk ve fiyat dönüşü.",
    finalCtaEyebrow: "Hazır mısınız?",
    finalCtaTitle: "Size özel fiyat teklifi alın.",
    finalCtaSubFn: (type: string) =>
      `${type} için uygunluk ve kiralama koşullarını öğrenmek üzere bize ulaşın.`,
  },
  about: {
    eyebrow: "Hakkımızda",
    title: "Sadece Konaklama Değil, Kaliteli Bir Yaşam Alanı",
    text1:
      "Muğla 48 Residence, Muğla Menteşe'nin kalbinde konumlanan, modern tasarımlı ve tam donanımlı residence daireleriyle misafirlerine üst düzey bir yaşam deneyimi sunmaktadır.",
    text2:
      "Amacımız; konaklamanın ötesinde, düzenli, temiz, güvenli ve prestijli bir yaşam alanı sağlamaktır. Kısa veya uzun dönem fark etmeksizin, her misafirimiz kendini evinde hissetsin istiyoruz.",
    stats: {
      furnished: "Tam Donanımlı",
      support: "İletişim",
      rating: "Misafir Puanı",
    },
    values: {
      trust: "Güven",
      quality: "Kalite",
      comfort: "Konfor",
    },
    badge: "Premium",
    badgeSub: "Yaşam Kalitesi",
  },
  features: {
    eyebrow: "Neden Biz?",
    title: "Her Detayı Düşünülmüş Yaşam Alanları",
    subtitle:
      "Konforlu, güvenli ve prestijli bir konaklama deneyimi için ihtiyacınız olan her şey burada.",
    list: [
      {
        title: "Merkezi Konum",
        description:
          "Muğla Menteşe şehir merkezinde, tüm sosyal olanaklara yürüme mesafesinde stratejik konum.",
      },
      {
        title: "Şık & Tam Donanımlı",
        description:
          "Modern mobilya, beyaz eşya, klima ve tüm yaşam gereksinimleri hazır.",
      },
      {
        title: "Esnek Kiralama",
        description:
          "Günlük, haftalık, aylık veya yıllık — ihtiyacınıza uygun kiralama seçenekleri.",
      },
      {
        title: "Temizlik & Düzen",
        description:
          "Her giriş öncesi profesyonel temizlik. Hijyen ve düzen önceliğimizdir.",
      },
      {
        title: "Yüksek Yaşam Konforu",
        description:
          "Otel lüksü ile ev sıcaklığını birleştiren, detayları düşünülmüş yaşam alanları.",
      },
      {
        title: "Hızlı İletişim",
        description:
          "WhatsApp, telefon veya form ile anında dönüş. Kolay ve hızlı rezervasyon süreci.",
      },
    ],
  },
  amenities: {
    eyebrow: "Olanaklar",
    title: "İhtiyacınız Olan Her Şey Hazır",
    subtitle:
      "Dairelerimiz, konforlu bir yaşam için gereken tüm donanımlarla sunulmaktadır.",
    list: [
      "Full Eşyalı",
      "Yüksek Hızlı Wi-Fi",
      "Mutfak Ekipmanları",
      "Beyaz Eşya",
      "Temizlik & Düzen",
      "Asansör",
      "Merkezi Lokasyon",
      "Uzun Dönem Uygunluk",
      "Aile Dostu Yaşam",
      "Konforlu İç Mekan",
    ],
  },
  rental: {
    eyebrow: "Kiralama Modelleri",
    title: "Size En Uygun Planı Seçin",
    subtitle: "İhtiyacınıza göre esnek kiralama seçenekleri sunuyoruz.",
    popular: "Popüler",
    ctaBottom: "Size En Uygun Planı Öğrenin",
    list: [
      {
        title: "Günlük",
        description:
          "Kısa süreli konaklamalar için ideal. İş seyahati, misafir ağırlama veya şehir keşfi.",
      },
      {
        title: "Haftalık",
        description:
          "Bir haftadan fazla kalanlar için avantajlı fiyatlandırma. Esnek giriş-çıkış.",
      },
      {
        title: "Aylık",
        description:
          "Orta dönem konaklama ihtiyaçları için uygun fiyatlı ve konforlu çözüm.",
      },
      {
        title: "Yıllık",
        description:
          "Uzun dönem kiralama ile evinizin konforunda, en uygun koşullarda yaşam.",
      },
    ],
  },
  gallery: {
    eyebrow: "Galeri",
    title: "Yaşam Alanlarımızdan Kareler",
    subtitle: "Premium dairelerimizin iç mekan ve dış cephe görsellerini keşfedin.",
    seeAll: "Tüm Galeriyi Gör",
    pageTitle: "Yaşam Alanlarımız",
    pageSubtitle:
      "Premium dairelerimizin iç mekan, dış cephe ve çevre görsellerini keşfedin.",
    all: "Tümü",
    categories: {
      "İç Mekan": "İç Mekan",
      "Yatak Odası": "Yatak Odası",
      "Mutfak": "Mutfak",
      "Banyo": "Banyo",
      "Dış Mekan": "Dış Mekan",
      "Ortak Alan": "Ortak Alan",
    },
    lightbox: {
      close: "Kapat",
      prev: "Önceki",
      next: "Sonraki",
      zoomIn: "Yakınlaştır",
      zoomOut: "Uzaklaştır",
      download: "İndir",
    },
  },
  location: {
    eyebrow: "Konum",
    title: "Şehrin Kalbinde, Hayatın Merkezinde",
    subtitle:
      "Muğla 48 Residence, Menteşe'nin en merkezi noktasında yer alır. Üniversite, hastane, çarşı ve tüm sosyal olanaklara dakikalar içinde ulaşabilirsiniz.",
    getDirections: "Yol Tarifi Al",
    mapLabel: "Muğla Menteşe, Şehir Merkezi",
    mapExpand: "Büyüt",
    places: [
      { label: "Muğla Sıtkı Koçman Üniversitesi", distance: "~ 5 dk" },
      { label: "Muğla Devlet Hastanesi", distance: "~ 5 dk" },
      { label: "Menteşe Çarşı Merkezi", distance: "~ 3 dk" },
      { label: "Resmi Kurumlar", distance: "~ 5 dk" },
      { label: "Şehirlerarası Otobüs Terminali", distance: "~ 10 dk" },
      { label: "Muğla Merkez", distance: "Yürüme mesafesinde" },
    ],
  },
  testimonials: {
    eyebrow: "Misafir Deneyimleri",
    title: "Misafirlerimiz Ne Diyor?",
    subtitle: "Konaklamalarını tamamlayan misafirlerimizin değerlendirmeleri.",
    ratingLabel: "Misafir değerlendirmeleri",
    list: [
      {
        name: "Ayşe K.",
        role: "Aylık Kiracı",
        text:
          "Muğla'ya iş için geldiğimde ev arar gibi aramadım. Muğla 48 Residence ile hemen yerleştim. Temizlik ve düzen mükemmel.",
        theme: "Temizlik",
      },
      {
        name: "Mehmet D.",
        role: "Haftalık Konaklama",
        text:
          "Otel yerine burayı tercih etmek çok doğru bir karardı. Tam donanımlı, merkezi konumda, her şey düşünülmüş.",
        theme: "Konfor",
      },
      {
        name: "Elif T.",
        role: "Yıllık Kiracı",
        text:
          "İki yıldır burada yaşıyorum. Lokasyon harika, yönetim ilgili ve daire kalitesi üst düzey. Tavsiye ederim.",
        theme: "Lokasyon",
      },
      {
        name: "Burak S.",
        role: "Günlük Konaklama",
        text:
          "Üniversite ziyareti için geldik. Daire tertemiz, modern ve güvenli. Fiyat-performans açısından çok memnun kaldık.",
        theme: "Güven",
      },
    ],
  },
  contact: {
    eyebrow: "İletişim",
    title: "Hemen Bilgi Alın",
    subtitle:
      "Dairelerimiz hakkında detaylı bilgi ve fiyat teklifi için formu doldurun veya doğrudan bize ulaşın.",
    name: "Ad Soyad",
    namePlaceholder: "Adınız Soyadınız",
    phone: "Telefon",
    phonePlaceholder: "05XX XXX XX XX",
    email: "E-posta",
    emailPlaceholder: "ornek@email.com",
    rentalType: "Kiralama Türü",
    selectOption: "Seçiniz",
    daily: "Günlük",
    weekly: "Haftalık",
    monthly: "Aylık",
    yearly: "Yıllık",
    apartmentType: "Daire Tipi",
    oneType: "1+1 Daire",
    twoType: "2+1 Daire",
    message: "Mesajınız",
    messagePlaceholder: "Mesajınızı yazın...",
    submit: "Bilgi Talep Et",
    privacy:
      "Form bilgileriniz yalnızca sizinle iletişime geçmek amacıyla kullanılır.",
    directTitle: "Sizi dinliyoruz",
    directSub: "Hafta içi 09:00 – 20:00 arası hızlı dönüş yapıyoruz.",
    directEyebrow: "Doğrudan Ulaşın",
    labelPhone: "Telefon",
    labelEmail: "E-posta",
    labelAddress: "Adres",
    waBtn: "WhatsApp ile Yazın",
    heroTitle: "Bize Ulaşın",
    heroSubtitle:
      "Dairelerimiz hakkında bilgi almak, fiyat öğrenmek veya uygunluk sorgulamak için bizimle iletişime geçin.",
    waMessage: (name: string, rentalType: string, aptType: string, message: string) =>
      `Merhaba, ${name} olarak bilgi almak istiyorum.\n\nKiralama: ${rentalType}\nDaire: ${aptType}\n\n${message}`,
  },
  ctaBand: {
    eyebrow: "Size Özel Teklif",
    title: "Premium yaşamın kapısını aralayın.",
    subtitle:
      "Muğla 48 Residence'ta uygunluk ve kiralama koşullarını öğrenmek için şimdi ekibimizle iletişime geçin. 24 saat içinde size özel teklif ile geri dönüş sağlıyoruz.",
    ctaWa: "WhatsApp ile Yazın",
    ctaCall: "Hemen Ara",
    hours: "Hafta içi 09:00–20:00 · Hızlı dönüş garantisi",
  },
  footer: {
    brandDesc:
      "Muğla Menteşe'de premium, tam donanımlı residence daireler. Konforlu, güvenli ve prestijli yaşam alanı.",
    quick: "Hızlı Erişim",
    contact: "İletişim",
    legal: "Yasal",
    kvkk: "KVKK Aydınlatma Metni",
    privacy: "Gizlilik Politikası",
    cookies: "Çerez Politikası",
    copyright: "Tüm hakları saklıdır.",
    tagline: "Premium Residence · Menteşe",
  },
  mobileCTA: {
    call: "Ara",
    wa: "WhatsApp",
    inquiry: "Bilgi Al",
  },
  legalCommon: {
    eyebrow: "Yasal",
    lastUpdated: "Son güncelleme: Mart 2026",
  },
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    p1: "6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca, Muğla 48 Residence olarak kişisel verilerinizin güvenliği konusunda azami hassasiyeti göstermekteyiz.",
    h1: "Veri Sorumlusu",
    p2: "Muğla 48 Residence, Menteşe/Muğla adresinde faaliyet gösteren veri sorumlusudur.",
    h2: "Kişisel Verilerin İşlenme Amacı",
    p3: "Kişisel verileriniz; kiralama hizmetlerinin sunulması, iletişim taleplerinin yanıtlanması, yasal yükümlülüklerin yerine getirilmesi ve hizmet kalitesinin artırılması amacıyla işlenmektedir.",
    h3: "İşlenen Kişisel Veriler",
    p4: "Ad-soyad, telefon numarası, e-posta adresi, adres bilgileri ve iletişim formları aracılığıyla iletilen diğer bilgiler.",
    h4: "Haklarınız",
    p5: "KVKK'nın 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme haklarına sahipsiniz.",
  },
  privacy: {
    title: "Gizlilik Politikası",
    p1: "Muğla 48 Residence olarak, web sitemizi ziyaret eden kullanıcılarımızın gizliliğini korumayı taahhüt ediyoruz.",
    h1: "Toplanan Bilgiler",
    p2: "Web sitemizi ziyaret ettiğinizde, iletişim formları aracılığıyla gönderdiğiniz ad, telefon, e-posta gibi bilgiler tarafımızca toplanmaktadır.",
    h2: "Bilgilerin Kullanımı",
    p3: "Toplanan bilgiler yalnızca kiralama taleplerinizi yanıtlamak, sizinle iletişime geçmek ve hizmet kalitemizi artırmak amacıyla kullanılmaktadır.",
    h3: "Bilgi Güvenliği",
    p4: "Kişisel bilgileriniz, yetkisiz erişime karşı güvenli bir şekilde saklanmaktadır. Bilgileriniz üçüncü taraflarla paylaşılmamaktadır.",
    h4: "İletişim",
    p5: "Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.",
  },
  cookies: {
    title: "Çerez Politikası",
    p1: "Muğla 48 Residence web sitesi, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır.",
    h1: "Çerez Nedir?",
    p2: "Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınıza yerleştirilen küçük metin dosyalarıdır. Bu dosyalar, tercihlerinizi hatırlamamıza ve size daha iyi bir deneyim sunmamıza yardımcı olur.",
    h2: "Kullanılan Çerez Türleri",
    p3Essential: "Zorunlu Çerezler:",
    p3EssentialDesc: "Web sitesinin düzgün çalışması için gerekli olan çerezlerdir.",
    p3Analytics: "Analitik Çerezler:",
    p3AnalyticsDesc:
      "Ziyaretçi istatistiklerini toplamamıza ve sitemizi geliştirmemize yardımcı olur.",
    h3: "Çerez Yönetimi",
    p4: "Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilir veya silebilirsiniz. Ancak bu durumda web sitemizin bazı özellikleri düzgün çalışmayabilir.",
  },
  site: {
    rentalTypes: ["Günlük", "Haftalık", "Aylık", "Yıllık"],
    apartmentTypes: {
      "1+1": "1+1",
      "2+1": "2+1",
    },
  },
};

export const en: Dict = {
  nav: {
    home: "Home",
    apartments: "Apartments",
    amenities: "Amenities",
    gallery: "Gallery",
    location: "Location",
    about: "About",
    contact: "Contact",
    call: "Call",
    inquiry: "Inquire",
    callNow: "Call Now",
    whatsappInquiry: "WhatsApp Inquiry",
    menu: "Menu",
  },
  hero: {
    eyebrow: "Muğla Menteşe · Premium Residence",
    title1: "Luxury and Comfortable",
    title2: "Residence Living in Muğla",
    subtitle:
      "Fully-furnished 1+1 and 2+1 premium apartments for daily, weekly, monthly, and yearly stays.",
    ctaPrimary: "Explore Apartments",
    ctaSecondary: "Inquire on WhatsApp",
    stats: {
      types: "Apartment Types",
      area: "Living Area",
      models: "Rental Plans",
    },
    trust: {
      location: "Central Location",
      furnished: "Fully Furnished",
      rental: "Flexible Rental",
      safe: "Secure Stay",
    },
  },
  apartments: {
    eyebrow: "Apartment Types",
    title: "Find the Apartment That Suits You",
    subtitle:
      "Discover our fully-furnished 1+1 or 2+1 apartments, crafted with quality furniture, appliances, and attention to every detail.",
    premium: "Premium",
    priceContact: "Contact for pricing",
    viewDetails: "View Details",
    askPrice: "Ask Price",
    one: {
      type: "1+1 Apartments",
      description:
        "Compact and stylish fully-furnished apartments, ideal for singles or couples.",
      size: "45-55 m²",
      capacity: "1-2 People",
      features: [
        "Fully-equipped kitchen",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Washing machine",
        "Smart TV",
        "Elegant bathroom",
      ],
      longDescription:
        "Our 1+1 apartments, known for their modern and functional design, offer comfortable living at the city center. Crafted with attention to every detail — quality furniture, fully-equipped kitchen, and airy living areas await you.",
      rooms: [
        { icon: "Bed", label: "1 Bedroom" },
        { icon: "Tv", label: "Smart TV" },
        { icon: "Wind", label: "Air Conditioning" },
        { icon: "Wifi", label: "High-Speed Wi-Fi" },
      ],
      kitchen: ["Refrigerator", "Microwave", "Stove & Oven", "Coffee/Tea maker", "Cookware set", "Tableware set"],
      bathroom: ["Shower cabin", "Towel set", "Hair dryer", "Bathroom cabinet"],
      general: ["Washing machine", "Iron & ironing board", "Vacuum cleaner", "Spacious wardrobe"],
      rentalSuitability: ["Daily", "Weekly", "Monthly", "Yearly"],
    },
    two: {
      type: "2+1 Apartments",
      description:
        "Spacious, comfortable and fully-furnished apartments for families and larger needs.",
      size: "75-90 m²",
      capacity: "2-4 People",
      features: [
        "Spacious living room",
        "2 bedrooms",
        "Full kitchen",
        "AC in every room",
        "Washer & dishwasher",
        "Balcony",
      ],
      longDescription:
        "Our spacious 2+1 apartments are ideal for families and long stays. Two separate bedrooms, a large living room, fully-equipped kitchen, and balcony combine home comfort with residence quality.",
      rooms: [
        { icon: "Bed", label: "2 Bedrooms" },
        { icon: "Tv", label: "Smart TV" },
        { icon: "Wind", label: "AC (Every Room)" },
        { icon: "Wifi", label: "High-Speed Wi-Fi" },
      ],
      kitchen: ["Large refrigerator", "Dishwasher", "Stove & Oven", "Microwave", "Coffee/Tea maker", "Full kitchen set"],
      bathroom: ["Large shower cabin", "Towel set", "Hair dryer", "Bathroom cabinet", "Mirror"],
      general: ["Washing machine", "Dishwasher", "Iron & ironing board", "Vacuum cleaner", "Spacious wardrobe", "Balcony"],
      rentalSuitability: ["Daily", "Weekly", "Monthly", "Yearly"],
    },
  },
  apartmentDetail: {
    back: "Back to Apartments",
    apartmentType: "Apartment Type",
    askAvailability: "Check Availability",
    askAvailabilitySub: "Let's get in touch for a personalized offer.",
    yourName: "Your name",
    phone: "Phone",
    rentalType: "Rental Type",
    dropdownEmpty: "Select",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
    inquiry: "Request Info",
    call: "Call",
    whatsapp: "WhatsApp",
    aboutTitle: "Details & Amenities",
    aboutEyebrow: "About the Apartment",
    roomFeatures: "Room Features",
    kitchen: "Kitchen Equipment",
    bathroom: "Bathroom",
    general: "General Amenities",
    trustSafe: "Safe & Reliable",
    trustSafeDesc: "ID check, proper contract, and transparent process.",
    trustClean: "Professional Cleaning",
    trustCleanDesc: "Hygienic preparation before each check-in.",
    trustFast: "Fast Reservation",
    trustFastDesc: "Availability and price response within 24 hours.",
    finalCtaEyebrow: "Ready?",
    finalCtaTitle: "Get your personalized quote.",
    finalCtaSubFn: (type: string) =>
      `Reach out to learn availability and rental terms for the ${type}.`,
  },
  about: {
    eyebrow: "About",
    title: "Not Just a Stay — A Premium Living Space",
    text1:
      "Located at the heart of Muğla Menteşe, Muğla 48 Residence offers a superior living experience with modern, fully-furnished apartments.",
    text2:
      "Our mission goes beyond accommodation: to provide a tidy, clean, safe and prestigious place. Whether short or long stay, every guest should feel at home.",
    stats: {
      furnished: "Fully Furnished",
      support: "Support",
      rating: "Guest Rating",
    },
    values: {
      trust: "Trust",
      quality: "Quality",
      comfort: "Comfort",
    },
    badge: "Premium",
    badgeSub: "Living Quality",
  },
  features: {
    eyebrow: "Why Us?",
    title: "Living Spaces Designed Down to the Detail",
    subtitle:
      "Everything you need for a comfortable, safe, and prestigious stay.",
    list: [
      {
        title: "Central Location",
        description:
          "In the heart of Muğla Menteşe — every social amenity is within walking distance.",
      },
      {
        title: "Elegant & Fully Equipped",
        description:
          "Modern furniture, appliances, air conditioning, and everything you need.",
      },
      {
        title: "Flexible Rental",
        description:
          "Daily, weekly, monthly, or yearly — rental options tailored to you.",
      },
      {
        title: "Cleanliness & Order",
        description:
          "Professional cleaning before every check-in. Hygiene is our priority.",
      },
      {
        title: "High Living Comfort",
        description:
          "Hotel-grade luxury with the warmth of home — thoughtfully designed.",
      },
      {
        title: "Fast Communication",
        description:
          "Instant replies via WhatsApp, phone, or form. Quick and easy booking.",
      },
    ],
  },
  amenities: {
    eyebrow: "Amenities",
    title: "Everything You Need Is Ready",
    subtitle:
      "Our apartments come with every amenity needed for a comfortable life.",
    list: [
      "Fully Furnished",
      "High-Speed Wi-Fi",
      "Kitchen Equipment",
      "Appliances",
      "Cleanliness & Order",
      "Elevator",
      "Central Location",
      "Long-Term Availability",
      "Family-Friendly",
      "Comfortable Interior",
    ],
  },
  rental: {
    eyebrow: "Rental Plans",
    title: "Pick the Plan That Fits You",
    subtitle: "Flexible rental options for every need.",
    popular: "Popular",
    ctaBottom: "Discover Your Best Plan",
    list: [
      {
        title: "Daily",
        description:
          "Ideal for short stays — business trips, visits, or city exploration.",
      },
      {
        title: "Weekly",
        description:
          "Advantageous pricing for stays over a week. Flexible check-in/out.",
      },
      {
        title: "Monthly",
        description:
          "Affordable and comfortable solution for mid-term needs.",
      },
      {
        title: "Yearly",
        description:
          "Long-term rental with optimal terms — live in home-like comfort.",
      },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Glimpses of Our Living Spaces",
    subtitle: "Explore interior and exterior photos of our premium apartments.",
    seeAll: "See Full Gallery",
    pageTitle: "Our Living Spaces",
    pageSubtitle:
      "Discover interior, exterior, and surrounding photos of our premium apartments.",
    all: "All",
    categories: {
      "İç Mekan": "Interior",
      "Yatak Odası": "Bedroom",
      "Mutfak": "Kitchen",
      "Banyo": "Bathroom",
      "Dış Mekan": "Exterior",
      "Ortak Alan": "Common Area",
    },
    lightbox: {
      close: "Close",
      prev: "Previous",
      next: "Next",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      download: "Download",
    },
  },
  location: {
    eyebrow: "Location",
    title: "In the Heart of the City",
    subtitle:
      "Muğla 48 Residence sits at the most central point of Menteşe. University, hospital, shopping, and every amenity — all within minutes.",
    getDirections: "Get Directions",
    mapLabel: "Muğla Menteşe, City Center",
    mapExpand: "Expand",
    places: [
      { label: "Muğla Sıtkı Koçman University", distance: "~ 5 min" },
      { label: "Muğla State Hospital", distance: "~ 5 min" },
      { label: "Menteşe Shopping District", distance: "~ 3 min" },
      { label: "Government Offices", distance: "~ 5 min" },
      { label: "Intercity Bus Terminal", distance: "~ 10 min" },
      { label: "Muğla City Center", distance: "Walking distance" },
    ],
  },
  testimonials: {
    eyebrow: "Guest Experiences",
    title: "What Our Guests Say",
    subtitle: "Reviews from guests who have completed their stay.",
    ratingLabel: "Guest reviews",
    list: [
      {
        name: "Ayşe K.",
        role: "Monthly Tenant",
        text:
          "When I came to Muğla for work, I didn't feel like house-hunting. I settled in right away with Muğla 48 Residence. Cleanliness and order are perfect.",
        theme: "Cleanliness",
      },
      {
        name: "Mehmet D.",
        role: "Weekly Guest",
        text:
          "Choosing this over a hotel was the right call. Fully equipped, centrally located, everything thought through.",
        theme: "Comfort",
      },
      {
        name: "Elif T.",
        role: "Yearly Tenant",
        text:
          "I've been living here for two years. The location is great, the management is attentive, and the apartment quality is top-notch. Highly recommended.",
        theme: "Location",
      },
      {
        name: "Burak S.",
        role: "Daily Guest",
        text:
          "We came for a university visit. The apartment was spotless, modern and safe. Great value for money — very satisfied.",
        theme: "Trust",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in Touch",
    subtitle:
      "Fill out the form or reach us directly for detailed info and pricing on our apartments.",
    name: "Full Name",
    namePlaceholder: "Your Full Name",
    phone: "Phone",
    phonePlaceholder: "05XX XXX XX XX",
    email: "Email",
    emailPlaceholder: "you@email.com",
    rentalType: "Rental Type",
    selectOption: "Select",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
    apartmentType: "Apartment Type",
    oneType: "1+1 Apartment",
    twoType: "2+1 Apartment",
    message: "Your Message",
    messagePlaceholder: "Write your message...",
    submit: "Request Info",
    privacy:
      "Your form data is used only to contact you back.",
    directTitle: "We're listening",
    directSub: "We respond quickly on weekdays 09:00–20:00.",
    directEyebrow: "Reach Us Directly",
    labelPhone: "Phone",
    labelEmail: "Email",
    labelAddress: "Address",
    waBtn: "Message on WhatsApp",
    heroTitle: "Contact Us",
    heroSubtitle:
      "Reach out to learn about our apartments, get pricing, or check availability.",
    waMessage: (name: string, rentalType: string, aptType: string, message: string) =>
      `Hi, I'm ${name} and I'd like info.\n\nRental: ${rentalType}\nApartment: ${aptType}\n\n${message}`,
  },
  ctaBand: {
    eyebrow: "Personalized Offer",
    title: "Unlock premium living today.",
    subtitle:
      "Contact our team now to learn availability and rental terms at Muğla 48 Residence. We'll reply with a personalized offer within 24 hours.",
    ctaWa: "Message on WhatsApp",
    ctaCall: "Hemen Ara",
    hours: "Weekdays 09:00–20:00 · Quick response guaranteed",
  },
  footer: {
    brandDesc:
      "Premium fully-furnished residence apartments in Muğla Menteşe. A comfortable, safe, and prestigious space.",
    quick: "Quick Links",
    contact: "Contact",
    legal: "Legal",
    kvkk: "KVKK Notice",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    copyright: "All rights reserved.",
    tagline: "Premium Residence · Menteşe",
  },
  mobileCTA: {
    call: "Call",
    wa: "WhatsApp",
    inquiry: "Inquire",
  },
  legalCommon: {
    eyebrow: "Legal",
    lastUpdated: "Last updated: March 2026",
  },
  kvkk: {
    title: "KVKK Notice",
    p1: "Under the Turkish Personal Data Protection Law No. 6698 (\"KVKK\"), Muğla 48 Residence places the utmost importance on the security of your personal data.",
    h1: "Data Controller",
    p2: "Muğla 48 Residence, operating in Menteşe/Muğla, is the data controller.",
    h2: "Purpose of Processing",
    p3: "Your personal data is processed to deliver rental services, respond to inquiries, meet legal obligations, and improve service quality.",
    h3: "Personal Data Processed",
    p4: "Name, phone number, email address, address, and any other information provided via contact forms.",
    h4: "Your Rights",
    p5: "Under article 11 of the KVKK, you have the right to learn whether your personal data is processed, request information about it, learn the purpose of processing and whether it is used accordingly.",
  },
  privacy: {
    title: "Privacy Policy",
    p1: "At Muğla 48 Residence, we are committed to protecting the privacy of visitors to our website.",
    h1: "Information Collected",
    p2: "When you visit our website, information you provide via contact forms — such as name, phone, and email — is collected by us.",
    h2: "Use of Information",
    p3: "Collected data is used only to respond to your rental inquiries, contact you, and improve our service quality.",
    h3: "Information Security",
    p4: "Your personal data is stored securely against unauthorized access and is not shared with third parties.",
    h4: "Contact",
    p5: "Please reach out for any questions about our privacy policy.",
  },
  cookies: {
    title: "Cookie Policy",
    p1: "The Muğla 48 Residence website uses cookies to enhance user experience.",
    h1: "What is a Cookie?",
    p2: "Cookies are small text files placed on your browser when you visit our site. They help us remember preferences and improve your experience.",
    h2: "Cookie Types Used",
    p3Essential: "Essential Cookies:",
    p3EssentialDesc: "Required for the proper operation of the website.",
    p3Analytics: "Analytics Cookies:",
    p3AnalyticsDesc:
      "Help us collect visitor statistics and improve the site.",
    h3: "Managing Cookies",
    p4: "You can disable or delete cookies via your browser settings. However, some features of our site may not work correctly.",
  },
  site: {
    rentalTypes: ["Daily", "Weekly", "Monthly", "Yearly"],
    apartmentTypes: {
      "1+1": "1+1",
      "2+1": "2+1",
    },
  },
};

export const dict = { tr, en };
