export type Language = 'en' | 'ar';

export interface Translations {
  // Header
  logo: string;
  tagline: string;
  reserve: string;
  cart: string;
  
  // Hero
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  exploreMenu: string;
  bookTable: string;
  scrollDown: string;
  
  // Stats
  dishes: string;
  years: string;
  chefs: string;
  rating: string;
  
  // Features
  whyChooseUs: string;
  experienceTitle: string;
  experienceSubtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  
  // Menu
  ourMenu: string;
  menuTitle: string;
  menuSubtitle: string;
  addToCart: string;
  unavailable: string;
  noItems: string;
  loading: string;
  
  // Categories
  catBBQ: string;
  catPizza: string;
  catBurgers: string;
  catPies: string;
  catDrinks: string;
  catDesserts: string;
  
  // CTA
  specialOffer: string;
  ctaTitle: string;
  ctaDesc: string;
  makeReservation: string;
  
  // Cart
  yourCart: string;
  browseMenu: string;
  subtotal: string;
  tax: string;
  total: string;
  clearCart: string;
  checkout: string;
  emptyCart: string;
  
  // Reservation
  reservationTitle: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests: string;
  cancel: string;
  submitReservation: string;
  
  // Footer
  footerDesc: string;
  quickLinks: string;
  menuLink: string;
  reservationsLink: string;
  aboutUs: string;
  contact: string;
  contactUs: string;
  workingHours: string;
  privacy: string;
  terms: string;
  copyright: string;
  
  // Badges
  popular: string;
  new: string;
  seasonal: string;
  veg: string;
  spicy: string;
}

const en: Translations = {
  logo: 'The Gourmet Bar',
  tagline: 'Premium Dining Experience',
  reserve: 'Reserve',
  cart: 'Cart',
  
  heroBadge: '✦ EST. 2010 ✦',
  heroTitle1: 'Where Every Bite',
  heroTitle2: 'Tells a Story',
  heroSubtitle: 'Experience culinary artistry with our premium selection of BBQ grills, artisanal pizzas, gourmet burgers, and handcrafted pies.',
  exploreMenu: 'Explore Menu',
  bookTable: 'Book a Table',
  scrollDown: 'Scroll Down',
  
  dishes: 'Signature Dishes',
  years: 'Years of Excellence',
  chefs: 'Master Chefs',
  rating: 'Customer Rating',
  
  whyChooseUs: 'Why Choose Us',
  experienceTitle: 'An Unforgettable Experience',
  experienceSubtitle: 'Every detail is crafted to perfection',
  feature1Title: 'Live Grill Station',
  feature1Desc: 'Watch our chefs craft your meal over open flames',
  feature2Title: 'Farm Fresh',
  feature2Desc: 'Locally sourced ingredients for authentic flavor',
  feature3Title: 'Premium Selection',
  feature3Desc: 'Curated wines and craft beverages',
  feature4Title: 'Live Music',
  feature4Desc: 'Enjoy live jazz every Friday & Saturday',
  
  ourMenu: 'Our Menu',
  menuTitle: 'Gourmet Collection',
  menuSubtitle: '100+ handcrafted dishes prepared with passion',
  addToCart: '+ Add to Cart',
  unavailable: 'Unavailable',
  noItems: 'No items in this category yet.',
  loading: 'Loading our gourmet menu...',
  
  catBBQ: 'BBQ & Grills',
  catPizza: 'Pizza',
  catBurgers: 'Burgers',
  catPies: 'Pies & Cakes',
  catDrinks: 'Drinks',
  catDesserts: 'Desserts',
  
  specialOffer: 'Special Offer',
  ctaTitle: 'Book Your Table Today',
  ctaDesc: 'Reserve your spot and enjoy a complimentary appetizer with every booking.',
  makeReservation: 'Make Reservation',
  
  yourCart: 'Your Cart',
  browseMenu: 'Browse Menu',
  subtotal: 'Subtotal',
  tax: 'Tax (8%)',
  total: 'Total',
  clearCart: 'Clear Cart',
  checkout: 'Checkout',
  emptyCart: 'Your cart is empty',
  
  reservationTitle: 'Make a Reservation',
  fullName: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  date: 'Date',
  time: 'Time',
  guests: 'Number of Guests',
  specialRequests: 'Special Requests',
  cancel: 'Cancel',
  submitReservation: 'Submit Reservation',
  
  footerDesc: 'Premium dining experience since 2010. Where culinary artistry meets warm hospitality.',
  quickLinks: 'Quick Links',
  menuLink: 'Our Menu',
  reservationsLink: 'Reservations',
  aboutUs: 'About Us',
  contact: 'Contact',
  contactUs: 'Contact Us',
  workingHours: 'Sun-Thu: 11AM-11PM | Fri-Sat: 11PM-1AM',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  copyright: '© 2025 The Gourmet Bar. All rights reserved.',
  
  popular: 'Popular',
  new: 'New',
  seasonal: 'Seasonal',
  veg: 'Veg',
  spicy: 'Spicy',
};

const ar: Translations = {
  logo: 'ذا جورميت بار',
  tagline: 'تجربة طعام فاخرة',
  reserve: 'احجز طاولة',
  cart: 'السلة',
  
  heroBadge: '✦ تأسس عام 2010 ✦',
  heroTitle1: 'حيث تروي',
  heroTitle2: 'كل قضيمة قصة',
  heroSubtitle: 'استمتع بفن الطهي مع مجموعتنا المميزة من مشاوي الشواء، والبيتزا الإيطالية، والبرجر الفاخر، والمعجنات المحضرة يدوياً.',
  exploreMenu: 'استكشف القائمة',
  bookTable: 'احجز طاولة',
  scrollDown: 'مرر للأسفل',
  
  dishes: 'وصفات مميزة',
  years: 'سنوات من التميز',
  chefs: 'طهاة محترفون',
  rating: 'تقييم العملاء',
  
  whyChooseUs: 'لماذا تختارنا',
  experienceTitle: 'تجربة لا تُنسى',
  experienceSubtitle: 'كل تفصيلة مدروسة لتناسبك',
  feature1Title: 'مجمّع الشواء الحي',
  feature1Desc: 'شاهد طهاةنا يحضرون وجبتك فوق اللهب المكشوف',
  feature2Title: 'طازج من المزرعة',
  feature2Desc: 'مكونات محلية المصدر لنكهة أصيلة',
  feature3Title: 'تشكيلة فاخرة',
  feature3Desc: 'نبيذ مختار ومشروبات حرفية',
  feature4Title: 'موسيقى حية',
  feature4Desc: 'استمتع بموسيقى الجاز كل جمعة وسبت',
  
  ourMenu: 'قائمتنا',
  menuTitle: 'المجموعة الفاخرة',
  menuSubtitle: 'أكثر من 100 وصفة محضرة بشغف',
  addToCart: '+ أضف للسلة',
  unavailable: 'غير متاح',
  noItems: 'لا توجد أصناف في هذا التصنيف بعد.',
  loading: 'جارٍ تحميل القائمة...',
  
  catBBQ: 'مشاوي وشواء',
  catPizza: 'بيتزا',
  catBurgers: 'برجر',
  catPies: 'معجنات وكيك',
  catDrinks: 'مشروبات',
  catDesserts: 'حلويات',
  
  specialOffer: 'عرض خاص',
  ctaTitle: 'احجز طاولتك اليوم',
  ctaDesc: 'احجز مقعدك واستمتع بمقبلات مجانية مع كل حجز.',
  makeReservation: 'احجز الآن',
  
  yourCart: 'سلة التسوق',
  browseMenu: 'تصفح القائمة',
  subtotal: 'المجموع الفرعي',
  tax: 'الضريبة (8%)',
  total: 'الإجمالي',
  clearCart: 'تفريغ السلة',
  checkout: 'إتمام الطلب',
  emptyCart: 'سلة التسوق فارغة',
  
  reservationTitle: 'حجز طاولة',
  fullName: 'الاسم الكامل',
  email: 'البريد الإلكتروني',
  phone: 'رقم الهاتف',
  date: 'التاريخ',
  time: 'الوقت',
  guests: 'عدد الضيوف',
  specialRequests: 'طلبات خاصة',
  cancel: 'إلغاء',
  submitReservation: 'تأكيد الحجز',
  
  footerDesc: 'تجربة طعام فاخرة منذ 2010. حيث يلتقي فن الطهي بالضيافة الدافئة.',
  quickLinks: 'روابط سريعة',
  menuLink: 'قائمتنا',
  reservationsLink: 'الحجوزات',
  aboutUs: 'من نحن',
  contact: 'تواصل معنا',
  contactUs: 'اتصل بنا',
  workingHours: 'الأحد-الخميس: 11ص-11م | الجمعة-السبت: 11م-1ص',
  privacy: 'سياسة الخصوصية',
  terms: 'شروط الخدمة',
  copyright: '© 2025 ذا جورميت بار. جميع الحقوق محفوظة.',
  
  popular: 'مميز',
  new: 'جديد',
  seasonal: 'موسمي',
  veg: 'نباتي',
  spicy: 'حار',
};

export const translations: Record<Language, Translations> = { en, ar };
