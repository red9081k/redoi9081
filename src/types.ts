/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Types and data definitions for the Gourmet Pitch App.

export type ThemeColor = 'amber' | 'crimson' | 'emerald' | 'ocean' | 'charcoal';

export interface AppTheme {
  primary: string;
  primaryHover: string;
  accent: string;
  bgLight: string;
  bgCard: string;
  ring: string;
  text: string;
  gradient: string;
}

export const themes: Record<ThemeColor, AppTheme> = {
  amber: {
    primary: 'bg-amber-600 border-amber-600 text-amber-600',
    primaryHover: 'hover:bg-amber-700 hover:border-amber-700',
    accent: 'text-amber-500',
    bgLight: 'bg-amber-50/70',
    bgCard: 'border-amber-100',
    ring: 'focus:ring-amber-500',
    text: 'text-amber-900',
    gradient: 'from-amber-500 to-orange-600',
  },
  crimson: {
    primary: 'bg-rose-600 border-rose-600 text-rose-600',
    primaryHover: 'hover:bg-rose-700 hover:border-rose-700',
    accent: 'text-rose-500',
    bgLight: 'bg-rose-50/70',
    bgCard: 'border-rose-100',
    ring: 'focus:ring-rose-500',
    text: 'text-rose-900',
    gradient: 'from-rose-500 to-red-600',
  },
  emerald: {
    primary: 'bg-emerald-600 border-emerald-600 text-emerald-600',
    primaryHover: 'hover:bg-emerald-700 hover:border-emerald-700',
    accent: 'text-emerald-500',
    bgLight: 'bg-emerald-50/70',
    bgCard: 'border-emerald-100',
    ring: 'focus:ring-emerald-500',
    text: 'text-emerald-900',
    gradient: 'from-emerald-500 to-teal-600',
  },
  ocean: {
    primary: 'bg-cyan-600 border-cyan-600 text-cyan-600',
    primaryHover: 'hover:bg-cyan-700 hover:border-cyan-700',
    accent: 'text-cyan-500',
    bgLight: 'bg-cyan-50/70',
    bgCard: 'border-cyan-100',
    ring: 'focus:ring-cyan-500',
    text: 'text-cyan-900',
    gradient: 'from-cyan-500 to-blue-600',
  },
  charcoal: {
    primary: 'bg-zinc-800 border-zinc-800 text-zinc-800',
    primaryHover: 'hover:bg-zinc-900 hover:border-zinc-900',
    accent: 'text-zinc-600',
    bgLight: 'bg-zinc-50/70',
    bgCard: 'border-zinc-200',
    ring: 'focus:ring-zinc-800',
    text: 'text-zinc-900',
    gradient: 'from-zinc-700 to-zinc-900',
  },
};

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number;
  category: 'mains' | 'appetizers' | 'desserts' | 'drinks';
  prepTime: number; // in mins
  spicyLevel: 0 | 1 | 2 | 3;
  isPopular?: boolean;
  isVegetarian?: boolean;
  ingredients: { nameAr: string; nameEn: string; removable: boolean }[];
  visualSvg: string; // Dynamic path/key for inline SVG drawing helper
}

export const defaultMenuItems: MenuItem[] = [
  {
    id: 'm1',
    nameAr: 'شاورما دبل ديلوكس',
    nameEn: 'Double Shawarma Deluxe',
    descAr: 'شاروما دجاج ومخلل وثومية وخبز صاج مقرمش، تقدم مع بطاطس وبودرة الملح والخل الخاصة.',
    descEn: 'Premium chicken shawarma with pickles, garlic paste in ultra-crisp Saj bread, served with hand-cut gold fries.',
    price: 32,
    category: 'mains',
    prepTime: 12,
    spicyLevel: 1,
    isPopular: true,
    ingredients: [
      { nameAr: 'ثومية دبل', nameEn: 'Extra Garlic Paste', removable: true },
      { nameAr: 'مخلل خيار', nameEn: 'Pickels', removable: true },
      { nameAr: 'بطاطس داخل الخبز', nameEn: 'Fries Inside Roll', removable: true },
    ],
    visualSvg: 'shawarma',
  },
  {
    id: 'm2',
    nameAr: 'برجر كرافت الذهبي',
    nameEn: 'Golden Craft Burger',
    descAr: 'لحم أنجوس فاخر، جبنة شيدر سائلة، صلصة كرافت الخاصة، خس هولندي في خبز بريوش طازج.',
    descEn: 'Juicy Black Angus patty, melted mature cheddar, craft signature sauce, fresh butter head lettuce on hand-toasted brioche.',
    price: 45,
    category: 'mains',
    prepTime: 15,
    spicyLevel: 0,
    isPopular: true,
    ingredients: [
      { nameAr: 'بصل مشوي', nameEn: 'Grilled Onion', removable: true },
      { nameAr: 'مخلل فرنسي', nameEn: 'French Pickles', removable: true },
      { nameAr: 'صوص برجر', nameEn: 'Secret Burger Sauce', removable: false },
    ],
    visualSvg: 'burger',
  },
  {
    id: 'm3',
    nameAr: 'بيتزا الكمأة البرية (ترافل)',
    nameEn: 'Wild Truffle Pizza',
    descAr: 'عجينة نابولية مخمرة لـ 48 ساعة، جبن موزاريلا طازج، معجون فطر الكمأة الفاخر وزيت جرجير.',
    descEn: '48-hour fermented Neapolitan dough, creamy buffalo mozzarella, rich wild truffle paste, drizzled with peppery arugula oil.',
    price: 58,
    category: 'mains',
    prepTime: 10,
    spicyLevel: 0,
    isVegetarian: true,
    ingredients: [
      { nameAr: 'فطر بري', nameEn: 'Wild Mushrooms', removable: true },
      { nameAr: 'أوراق الجرجير', nameEn: 'Fresh Arugula', removable: true },
    ],
    visualSvg: 'pizza',
  },
  {
    id: 'a1',
    nameAr: 'بطاطس مقرمشة بالثوم والأعشاب',
    nameEn: 'Garlic Herb Crispy Fries',
    descAr: 'بطاطس مقلية ذهبية مبهرة بملح كوشر، ثوم مشوي، أعشاب جبلية منتقاة وبودرة البارميزان.',
    descEn: 'Triple-cooked golden hand-cut fries, tossed with sea salt, rosemary infusion, toasted garlic, and microbar grated parmesan.',
    price: 18,
    category: 'appetizers',
    prepTime: 8,
    spicyLevel: 0,
    isVegetarian: true,
    ingredients: [
      { nameAr: 'ثوم مبشور', nameEn: 'Toasted Garlic', removable: true },
      { nameAr: 'جبن بارميزان', nameEn: 'Parmesan Cheese', removable: true },
    ],
    visualSvg: 'fries',
  },
  {
    id: 'a2',
    nameAr: 'سلطة هارفست الخضراء',
    nameEn: 'Harvest Garden Salad',
    descAr: 'مزيج من الخس الطازج، جبن الماعز، رمان، جوز محمص، مع صلصة البلسميك والبرتقال المنعشة.',
    descEn: 'Crispleaf baby spinach, creamy goat white cheese, sweet pomegranate gems, toasted walnuts with orange-balsamic glaze.',
    price: 24,
    category: 'appetizers',
    prepTime: 7,
    spicyLevel: 0,
    isVegetarian: true,
    ingredients: [
      { nameAr: 'جوز محمص', nameEn: 'Toasted Walnuts', removable: true },
      { nameAr: 'جبن الماعز', nameEn: 'Goat Cheese', removable: true },
    ],
    visualSvg: 'salad',
  },
  {
    id: 'd1',
    nameAr: 'فطيرة لوتس سجنتشر الكلاسيكية',
    nameEn: 'Signature Lotus Cheesecake',
    descAr: 'تشيز كيك بارد كريمي فاخر، على قاعدة بسكويت اللوتس المقرمشة مغطاة بزبدة لوتس سائلة وبسكويتة دافئة.',
    descEn: 'Rich, smooth cold-pour cheesecake resting on golden-buttered specification Biscoff baseline, topped with warm molten cookie glaze.',
    price: 28,
    category: 'desserts',
    prepTime: 5,
    spicyLevel: 0,
    isVegetarian: true,
    ingredients: [
      { nameAr: 'زبدة اللوتس', nameEn: 'Molten Cookie Glaze', removable: false },
    ],
    visualSvg: 'cake',
  },
  {
    id: 'd2',
    nameAr: 'كوكيز الشوكولاتة الذائبة',
    nameEn: 'Molten Double Chocolate Cookie',
    descAr: 'كوكيز مخبوز محلياً يقدم دافئاً بقلب شوكولاتة ذائبة فخمة، مغطى برشة من ملح البحر الفاخر.',
    descEn: 'Fresh skillet-baked cookie, piping hot with premium Belgian liquid dark chocolate center, topped with flaky Maldon sea salt.',
    price: 19,
    category: 'desserts',
    prepTime: 6,
    spicyLevel: 0,
    ingredients: [],
    visualSvg: 'cookie',
  },
  {
    id: 'dr1',
    nameAr: 'موهيتو توت بري بريز',
    nameEn: 'Wild Berry Mojito Breeze',
    descAr: 'توت أزرق طازج، نعناع جبلي، عصير ليمون حامض، الصودا الفوارة مع لمسة من شراب التوت البري.',
    descEn: 'Spumante carbonated soda combined with muddled crimson forest berries, garden-cut mint leaves, fresh lime segments, and wild organic cane sugar.',
    price: 16,
    category: 'drinks',
    prepTime: 4,
    spicyLevel: 0,
    isVegetarian: true,
    ingredients: [
      { nameAr: 'أوراق النعناع', nameEn: 'Mint Leaves', removable: true },
      { nameAr: 'قطع الليمون', nameEn: 'Lime Wedges', removable: true },
    ],
    visualSvg: 'drink',
  },
  {
    id: 'dr2',
    nameAr: 'سجنتشر لاتيه بارد',
    nameEn: 'Signature Cold Spanish Latte',
    descAr: 'حليب مكثف ومبرد، جرعة مزدوجة من قهوة الإسبريسو المصنوعة من حبوب البن السلفادوري المختص.',
    descEn: 'Velvety chilled micro-textured milk, condensed sweet base, topped with direct-pour freshly pulled double El Salvador single-origin espresso.',
    price: 22,
    category: 'drinks',
    prepTime: 4,
    spicyLevel: 0,
    isVegetarian: true,
    ingredients: [
      { nameAr: 'حليب مكثف محلى', nameEn: 'Sweetened Condensed Milk', removable: true },
    ],
    visualSvg: 'coffee',
  },
];

export interface Booking {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  tableType: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface ClientOrder {
  id: string;
  items: {
    menuItem: MenuItem;
    qty: number;
    customizations: string[];
    note: string;
  }[];
  totalPrice: number;
  tableNum: number;
  status: 'ordered' | 'preparing' | 'delivered';
  createdAt: string;
}

export const translationDict = {
  ar: {
    appTitle: 'شوكيس لقمة | قالب مطعم ذكي',
    heroTag: '💎 تجربة تفاعلية متكاملة لزيادة مبيعات مطعمك',
    heroTitle: 'حوّل زوار مطعمك إلى عشاق مخلصين بموقع ذكي',
    heroSub: 'عرض حي وتفاعلي يعمل 100% بدون إنترنت. صُمم خصيصاً لمساعدة مسوقين ومطوري الويب على إبهار أصحاب المطاعم وزيادة مبيعاتهم من خلال تجربة مميزة وسريعة الاستجابة.',
    exploreMenu: 'تصفح قائمة الطعام',
    bookTable: 'حجز طاولة تفاعلي',
    pitchPanelTitle: 'لوحة التحكم بالعرض الإعلاني',
    pitchPanelSub: 'استخدم هذه اللوحة وأنت جالس مع صاحب المطعم لتعديل تفاصيل الموقع واسمه وألوانه فورياً أمام عينيه لإقناعه بخدماتك كمسوق أو مصمم ويب!',
    restNameLabel: 'اسم المطعم المخصص',
    restPhoneLabel: 'رقم هاتف المطعم',
    restAddressLabel: 'العنوان المخصص للمطعم',
    themeLabel: 'الهوية البصرية وقالب الألوان',
    logoLabel: 'شعار المطعم المختار',
    currencyLabel: 'العملة المعروضة',
    langToggleBtn: 'We/En',
    popularBadge: 'الأكثر طلباً ⭐',
    vegBadge: 'نباتي 🌿',
    searchPlaceholder: 'ابحث عن أكلة، مكون، دجاج...',
    orderDemoTitle: 'فاتورة تجربة الطلبات',
    orderDemoSub: 'أضف وجبات وشاهد كيف يمكن للعميل تصفح وطلب الوجبات بسهولة من طاولته.',
    addToCart: 'أضف للطلب',
    customizing: 'تعديل المكونات والطلب',
    close: 'إغلاق',
    spicy0: 'غير حار 🥬',
    spicy1: 'حار خفيف 🌶️',
    spicy2: 'حار جداً 🌶️🌶️',
    spicy3: 'فوق العادة! 🔥',
    mins: 'دقائق',
    sr: 'ر.س',
    cartEmpty: 'قم بإضافة وجبات من القائمة لبدء تجربة إنشاء الطلبات والمبيعات الذكية!',
    placeMockOrder: 'إرسال الطلب لمحاكي المطبخ',
    tableBookingTitle: 'محاكي نظام حجز الطاولات الإلكتروني',
    tableBookingSub: 'دع صاحب المطعم يرى كيف يقوم الزوار بحجز طاولتهم وتأكيد الحجز ذاتياً بالثواني بدون تدخل بشري.',
    guestCount: 'عدد الأفراد',
    date: 'التاريخ',
    time: 'الوقت',
    tableType: 'نوع الجلسة الطاولة',
    fullName: 'الاسم الكامل للعميل',
    phoneNum: 'رقم هاتف التأكيد',
    submitBooking: 'تأكيد حجز الطاولة الفوري',
    bookingSuccess: 'تم تأكيد حجز الطاولة بنجاح! 🎉',
    bookingRef: 'رقم مرجع الحجز',
    offlineNotice: '📴 يعمل بشكل كامل بدون إنترنت. جميع العمليات تتم محلياً لعرض مبهر سريع.',
    adminTrigger: 'شاهد: نظام إدارة المطبخ والطلبات (البورتال) 📊',
    adminTitle: 'نظام إدارة المطعم الخلفي (مغلق للعملاء)',
    adminSub: 'شاهد الطلبات الواردة وحجوزات الطاولات التي تمت للتو فوراً لتحقيق مبيعات ذكية وإدارة سلسة!',
    ordersTab: 'الطلبات الحالية',
    bookingsTab: 'الحجوزات الحالية',
    metricsTitle: 'إحصائيات المبيعات التقديرية اليومية',
    totalSales: 'إجمالي الطلبات التجريبية',
    activeBookings: 'الحجوزات النشطة',
    pitchHighlightsTitle: '💡 نقاط قوية لإقناع صاحب المطعم بطلب موقع:',
    pitchBullet1: '🛒 **تقليل الضغط على النادلين**: بنسبة 40% من خلال القائمة الذكية المتاحة بـ QR Code على الطاولة.',
    pitchBullet2: '📈 **زيادة حجم الفاتورة**: طلبات الإضافات المخصصة بالصور ترفع معدل الإنفاق لكل زبون بـ 25%.',
    pitchBullet3: '📂 **قاعدة بيانات الحجوزات**: سيمتلك المطعم قاعدة بيانات ذهبية للزبائن لإعادة استهدافهم في الأعياد والمواسم.',
    pitchBullet4: '⚡ **سرعة البرق والعمل أوفلاين**: موقع آمن يعمر طويلاً بدون تكاليف صيانة وبتحسين محركات بحث فائق لموقع المطعم الفعلي.',
    contactUs: 'تواصل معنا',
    workingHours: 'ساعات العمل',
    address: 'العنوان',
    phone: 'تلفون',
    footerNotice: 'تمت البرمجة والتصميم خصيصاً كنموذج عرض إعلاني متكامل يعزز أداءك في غلق الصفقات الإعلانية وتطوير الويب.',
    customOptions: 'الإضافات والمكونات المتاحة',
    extraNotes: 'ملاحظات وتخصيص إضافي (مثال: الثوم كثير، بدون ملح...)',
    saveSelection: 'تأكيد الإضافات والطلب',
    addedToCartAlert: 'تمت الإضافة بنجاح!',
    demoTableMap: 'خريطة الطاولات التفاعلية للمطعم',
    vipBooth: 'جلسة كبينة VIP مغلقة هادئة',
    windowSeat: 'طاولة مطلة على الشارع الرئيسي بالنافذة',
    outdoorGarden: 'جلسة خارجية في الهواء الطلق والحديقة الطبيعية',
    familySection: 'طاولة في القسم العائلي الواسع المحجوب',
    bookingConfirmedToast: 'تم تأكيد طلب الحجز ومزامنته مع بورتال الكاشير المحلي بنجاح!',
    orderPlacedToast: 'تم إرسال طلب الأكل لمحاكي لوحة المطبخ فوراً وزيادة عداد الأرباح!',
    customizeBtn: 'تخصيص',
    quickAddBtn: 'أضف سريعاً',
    noItemsFound: 'لم يتم العثور على أكلات مطابقة للبحث...',
    pitchSettingsHeader: 'أدوات العرض الخاصة بك (الوكيل المسوق)',
    pitchSettingsDesc: 'اضبط الموقع فوراً باسم وعلامة العميل وحول الاجتماع لفرصة غلق فورية!',
    total: 'الإجمالي',
    checkoutTableNum: 'رقم الطاولة التجريبية (مثال: طاولتك الحالية)',
    clientNamePlaceholder: 'اسم الزبون المجرّب'
  },
  en: {
    appTitle: 'Gourmet Pitch | Master Restaurant Showcase',
    heroTag: '💎 Premium Interactive Pitch Demo to Skyrocket Your Agency Sales',
    heroTitle: 'Transform Restaurant Visitors into Brand Admirers with an Elite Site',
    heroSub: '100% offline-ready visual interactive platform. Purposefully crafted to let web designers and digital marketers present a stunning digital menu and booking solution directly in front of restaurant owners.',
    exploreMenu: 'Explore Signature Menu',
    bookTable: 'Interactive Table Booking',
    pitchPanelTitle: 'Live Agency Presenter Control',
    pitchPanelSub: 'Configure this app live on your screen during the client meeting. Instantly match their restaurant name, primary color scheme, and currency to trigger immediate visual buy-in!',
    restNameLabel: 'Target Restaurant Name',
    restPhoneLabel: 'Contact Phone Number',
    restAddressLabel: 'Custom Target Address',
    themeLabel: 'Brand Preset Theme',
    logoLabel: 'Represented Icon Logo',
    currencyLabel: 'Target Currency Metric',
    langToggleBtn: 'عربي/Ar',
    popularBadge: 'Sellers Choice ⭐',
    vegBadge: 'Vegetarian 🌿',
    searchPlaceholder: 'Search for wraps, cheese, spice...',
    orderDemoTitle: 'Smart Cart Billing Simulator',
    orderDemoSub: 'Add dishes below to demonstrate how tableside ordering maximizes menu upsells with neat customizable items.',
    addToCart: 'Add to Order',
    customizing: 'Customize Ingredients & Options',
    close: 'Close',
    spicy0: 'Mild Herb 🥬',
    spicy1: 'Light Kick 🌶️',
    spicy2: 'Sizzling Hot 🌶️🌶️',
    spicy3: 'Insanely Hot! 🔥',
    mins: 'mins',
    sr: 'SAR',
    cartEmpty: 'Add visual items from the menu to activate the table bill simulator and smart upsells!',
    placeMockOrder: 'Send Order to Kitchen Screen',
    tableBookingTitle: 'Self-Service Booking Engine',
    tableBookingSub: 'Showcase how easy and visually elegant it is for visitors to book a specific table spot and get instant confirmation.',
    guestCount: 'Number of Guests',
    date: 'Date Choice',
    time: 'Time Frame',
    tableType: 'Preferable Table Area',
    fullName: 'Customer Full Name',
    phoneNum: 'Confirmation Phone',
    submitBooking: 'Confirm Tableside Booking',
    bookingSuccess: 'Reservation Successfully Simulated! 🎉',
    bookingRef: 'Booking Code Ref',
    offlineNotice: '📴 Complete internet-independent demo. All storage, simulation, and theme routing run offline.',
    adminTrigger: 'View Live: Kitchen Order Management & CRM 📊',
    adminTitle: 'Restaurant Admin Portal (Behind-the-Scenes)',
    adminSub: 'Show the manager how bookings and digital menu orders appear instantly on their bar screen, tracking metrics effortlessly.',
    ordersTab: 'Incoming Kitchen Orders',
    bookingsTab: 'Active Table Bookings',
    metricsTitle: 'Manager Quick Daily Performance',
    totalSales: 'Simulated Sales Total',
    activeBookings: 'Live Reserves Count',
    pitchHighlightsTitle: '💡 Killer Pitch Arguments for the Restaurant Owner:',
    pitchBullet1: '🛒 **40% Waiter Workload Shift**: Menu QR code allows direct phone ordering, releasing waiter hours.',
    pitchBullet2: '📈 **25% Average Basket Boost**: Professional imagery and automated cheese/sauce customization prompt users to upgrade.',
    pitchBullet3: '📂 **Direct Marketing Database**: Owner captures email and phone data with absolute control instead of giving commission away to food aggregators.',
    pitchBullet4: '⚡ **Zero Cloud Maintenance**: Built super stable, lightning fast, giving them pure organic local Google SEO advantage.',
    contactUs: 'Contact Details',
    workingHours: 'Operating Hours',
    address: 'Address',
    phone: 'Phone',
    footerNotice: 'A premium craft demo built specifically to empower developers and consultants in securing major restaurant design contracts.',
    customOptions: 'Available Ingredients & Modifiers',
    extraNotes: 'Add Special Note (e.g., Allergen warning, double sauce...)',
    saveSelection: 'Confirm Custom Additions',
    addedToCartAlert: 'Successfully Addressed!',
    demoTableMap: 'Interactive Spot Map View',
    vipBooth: 'Enclosed Luxury VIP Banquet Booth',
    windowSeat: 'Pano-glass main street view table',
    outdoorGarden: 'Fresh open air botanical patio zone',
    familySection: 'Wide secluded family partition space',
    bookingConfirmedToast: 'Table reservation recorded and synced with cashier portal instantly!',
    orderPlacedToast: 'Digital order sent to active kitchen visual displays and added to simulator revenue!',
    customizeBtn: 'Customize App',
    quickAddBtn: 'Quick Add',
    noItemsFound: 'No dishes match your query terms...',
    pitchSettingsHeader: 'Digital Agency Toolset',
    pitchSettingsDesc: 'Instant customization panel. Personalize this mock app to the client\'s brand in 3 seconds to win the deal!',
    total: 'Grand Total',
    checkoutTableNum: 'Demo Table Number (e.g., Table 12)',
    clientNamePlaceholder: 'Demo Name (e.g. John Doe)'
  }
};
