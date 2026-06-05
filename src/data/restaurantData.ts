import { MenuItem, Review, Branch } from '../types';

export const RIYADH_BRANCHES: Branch[] = [
  {
    id: 'takhassusi',
    nameEn: 'Al-Takhassusi Branch',
    nameAr: 'فرع التخصصي',
    lat: 24.7170,
    lng: 46.6575,
    addressEn: 'Al Takhassusi St, Al Rahmaniyah, Riyadh 12344, Saudi Arabia',
    addressAr: 'شارع التخصصي، حي الرحمانية، الرياض 12344، المملكة العربية السعودية',
    phone: '+966 9200 33511',
    hoursEn: '11:00 AM - 1:00 AM (Daily)',
    hoursAr: '11:00 ص - 1:00 ص (يومياً)',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800'
  },
  {
    id: 'abubakr',
    nameEn: 'Abu Bakr Al-Siddiq Branch',
    nameAr: 'فرع طريق أبو بكر الصديق',
    lat: 24.8111,
    lng: 46.6805,
    addressEn: 'Abu Bakr Al Siddiq Rd, Al Yasmin, Riyadh 13322, Saudi Arabia',
    addressAr: 'طريق أبو بكر الصديق، حي الياسمين، الرياض 13322، المملكة العربية السعودية',
    phone: '+966 9200 33512',
    hoursEn: '11:00 AM - 1:00 AM (Daily)',
    hoursAr: '11:00 ص - 1:00 ص (يومياً)',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800'
  },
  {
    id: 'alhamra',
    nameEn: 'Al-Hamra Branch',
    nameAr: 'فرع الحمراء',
    lat: 24.7938,
    lng: 46.7797,
    addressEn: 'Khaled Ibn Al-Waleed Rd, Al Hamra, Riyadh 13217, Saudi Arabia',
    addressAr: 'طريق خالد بن الوليد، حي الحمراء، الرياض 13217، المملكة العربية السعودية',
    phone: '+966 9200 33513',
    hoursEn: '11:00 AM - 1:00 AM (Daily)',
    hoursAr: '11:00 ص - 1:00 ص (يومياً)',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'kabsa-hashi',
    nameEn: 'Premium Kabsa Hashi',
    nameAr: 'كبسة حاشي فاخرة',
    descriptionEn: 'Succulent baby camel meat served over long grain spiced aromatic Najdi rice, seasoned with traditional spices, roasted nuts, and sweet raisins.',
    descriptionAr: 'لحم حاشي (جمال صغير) طري ولذيذ، يقدم فوق الأرز النجدي العطري المتبل بالبهارات التقليدية مع المكسرات المحمصة والزبيب السكري.',
    price: 78,
    calories: 780,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800',
    spiceLevel: 1,
    allergens: ['nuts'],
    isPopular: true
  },
  {
    id: 'jareesh',
    nameEn: 'Heritage Najdi Jareesh',
    nameAr: 'جريش نجدي تقليدي',
    descriptionEn: 'Crushed wheat cooked for hours over low flame with sour milk (Laban), chicken, and finished with caramelized onions, clarified butter (ghee), and black lemon oil.',
    descriptionAr: 'قمح مجروش مطهو ببطء لساعات مع اللبن الطازج والدجاج المفروم، يزين بالبصل المكرمل والسمن البري ودهن الليمون الأسود الفواح.',
    price: 36,
    calories: 390,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800',
    spiceLevel: 0,
    allergens: ['dairy', 'wheat'],
    isPopular: true,
    isVegetarian: false
  },
  {
    id: 'margoog',
    nameEn: 'Lamb Margoog',
    nameAr: 'مرقوق باللحم الخيار',
    descriptionEn: 'Silky, hand-stretched thin whole wheat flatbread dough disks cooked in a robust stew of lamb meat, pumpkin, zucchini, eggplant, and dry lime.',
    descriptionAr: 'قراص من عجين البر الأسمر الرقيق المفرود يدوياً، مطهوة ببطء في مرق لحم الغنم الغني مع القرع والباذنجان والكوسا، والليمون الأسود.',
    price: 48,
    calories: 520,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=800',
    spiceLevel: 1,
    allergens: ['wheat'],
    isPopular: false
  },
  {
    id: 'gursan',
    nameEn: 'Najdi Gursan',
    nameAr: 'قرصان نجدي بالخضار',
    descriptionEn: 'Traditional wafer-thin baked whole wheat sheets thoroughly soaked with spiced light vegetable and lamb meat broth, layer-dressed with white onions and butter.',
    descriptionAr: 'رقائق القرصان البر المقرمشة والمنقوعة بمرق اللحم والخضار المتبل بالبهارات النجدية العتيقة، ومزينة بشرائح البصل والسمن.',
    price: 45,
    calories: 440,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=800',
    spiceLevel: 1,
    allergens: ['wheat', 'dairy'],
    isPopular: true
  },
  {
    id: 'kabsa-chicken',
    nameEn: 'Traditional Chicken Kabsa',
    nameAr: 'كبسة دجاج نجدية',
    descriptionEn: 'Half tender grilled chicken cooked in aromatic herbs and spices, served on a generous bed of yellow basmati rice, caramelized raisins, and lemon slice.',
    descriptionAr: 'نصف حبة دجاج طرية ومحمرة، مطهوة بالأعشاب والبهارات العطرية، تقدم على سجادة من الأرز البسمتي الذهبي مع الزبيب المكرمل والليمون.',
    price: 42,
    calories: 630,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800',
    spiceLevel: 1,
    allergens: [],
    isPopular: false
  },
  {
    id: 'sambousek-meat',
    nameEn: 'Spiced Meat Sambousek',
    nameAr: 'سمبوسة لحم مقرمشة',
    descriptionEn: 'Crispy fried dough pastry filled with premium minced beef, green onions, coriander, and fine Najdi spice mix (5 pieces).',
    descriptionAr: 'عجينة السمبوسة الذهبية والمقرمشة، محشوة باللحم المفروم المميز، البصل الأخضر، الكزبرة الطازجة وتوليفة البهارات الخاصة (٥ قطع).',
    price: 18,
    calories: 210,
    category: 'starter',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=800',
    spiceLevel: 2,
    allergens: ['wheat'],
    isPopular: true
  },
  {
    id: 'sambousek-cheese',
    nameEn: 'Heritage Cheese Sambousek',
    nameAr: 'سمبوسة جبن بلدي',
    descriptionEn: 'Crispy pastries filled with traditional melt-in-your-mouth local white cheese blended with black seeds (Nigella sativa) (5 pieces).',
    descriptionAr: 'سمبوسة مقرمشة شهية محشوة بالجبن الأبيض البلدي الفاخر الممزوج بحبة البركة العريقة (٥ قطع).',
    price: 16,
    calories: 195,
    category: 'starter',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=800',
    spiceLevel: 0,
    allergens: ['dairy', 'wheat'],
    isVegetarian: true
  },
  {
    id: 'lentil-soup',
    nameEn: 'Warm Yellow Lentil Soup',
    nameAr: 'شوربة عدس أصفر دافئة',
    descriptionEn: 'Pureed red lentils slow-simmered with cumin, garlic, and home spices, served with crispy fried Arabic bread croutons and fresh lemon wedges.',
    descriptionAr: 'شوربة العدس التقليدية مطهوة مع الكمون، الثوم والبهارات المنزلية الحارة قليلاً، تقدم مع خبز عربي محمص وشرائح الليمون الطازج.',
    price: 15,
    calories: 150,
    category: 'soup',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?q=80&w=800',
    spiceLevel: 0,
    allergens: ['wheat'],
    isVegetarian: true
  },
  {
    id: 'hanini',
    nameEn: 'Traditional Warm Hanini',
    nameAr: 'حنيني نجدي دافئ',
    descriptionEn: 'A warm winter dessert made from whole wheat bread, premium mashed Khalas dates from Qassim, authentic melted ghee, cardamom, served hot with freshly squeezed lemon juice.',
    descriptionAr: 'حلوى شتوية دافئة ومغذية مصنوعة من خبز البر الفاخر، تمر الخلاص المهروس من القصيم، السمن البلدي الطبيعي، الهيل، وتقدم حارة مع عصير الليمون.',
    price: 28,
    calories: 420,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800',
    spiceLevel: 0,
    allergens: ['wheat', 'dairy'],
    isPopular: true,
    isVegetarian: true
  },
  {
    id: 'royal-dates',
    nameEn: 'Royal Dates platter with Qishta',
    nameAr: 'صحن تمر خلاص ملكي مع قشطة',
    descriptionEn: 'Handpicked Saudi luxury Khalas dates served with fresh thick camel-milk cream (Qishta) and sprinkled, finely ground pistachios.',
    descriptionAr: 'حبات مختارة من أفخر أنواع تمر الخلاص السعودي، تقدم مع القشطة البلدية الطازجة ورشة الفستق الحلبي.',
    price: 24,
    calories: 310,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1596560548464-f01068e3c9eb?q=80&w=800',
    spiceLevel: 0,
    allergens: ['dairy', 'nuts'],
    isVegetarian: true
  },
  {
    id: 'arabic-coffee',
    nameEn: 'Saudi Saffron Coffee (Dallah)',
    nameAr: 'دلة قهوة عربية بالزعفران',
    descriptionEn: 'Traditional light roasted organic Arabica coffee beans brewed with heavy cardamom and premium saffron, served with luxury dates (serves 3-4).',
    descriptionAr: 'القهوة السعودية الشقراء الأصيلة المحضرة من البن العضوي الهيل، والزعفران الأصلي الفاخر، تقدم في دلة نجدية تقليدية مع تمر الخلاص.',
    price: 28,
    calories: 5,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800',
    spiceLevel: 0,
    allergens: [],
    isPopular: true,
    isVegetarian: true
  },
  {
    id: 'mint-tea',
    nameEn: 'Traditional Sage & Mint Tea Pot',
    nameAr: 'براد شاي نجدي بالنعناع والمرمية',
    descriptionEn: 'Slow-brewed red tea leaves with fresh organic mint leaves and wild desert sage, sweetened perfectly to taste.',
    descriptionAr: 'براد شاي أحمر ملقم على الجمر مغلي مع أوراق النعناع العضوي والمرمية البرية العطرة، محلى حسب رغبتكم.',
    price: 15,
    calories: 40,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800',
    spiceLevel: 0,
    allergens: [],
    isVegetarian: true
  }
];

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'عبدالرحمن الشهري (Al-Shehri)',
    rating: 5,
    relativeTime: 'قبل يومين (2 days ago)',
    text: 'أفضل مكان لتجربة الأكل النجدي الأصيل في الرياض. البناء التراثي الطيني رائع جداً، والجريش والكبسة لذيييييذة جداً والسمن أصلي. الخدمة ممتازة وسريعة، والخصوصية للعائلات ممتازة في الغرف والمجالس التراثية الخاصة.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
    helpfulCount: 45
  },
  {
    id: 'rev-2',
    authorName: 'Sarah M. Jenkins',
    rating: 5,
    relativeTime: 'قبل أسبوع (1 week ago)',
    text: 'Absolute masterpiece! We wanted to experience the true Saudi culture and food, and Najd Village was recommended by everyone. The camel meat (Kabsa Hashi) is incredibly tender and flavorsome. Sitting on the floor in their warm-lit muddy rooms was magical. Outstanding hospitality!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    helpfulCount: 38
  },
  {
    id: 'rev-3',
    authorName: 'خالد بن عبدالعزيز',
    rating: 4,
    relativeTime: 'قبل ٣ أيام (3 days ago)',
    text: 'المكان تحفة معمارية يرجعك للماضي الجميل. الحنيني هنا هو الأفضل على الإطلاق في الرياض، والقهوة السعودية موزونة ومظبوطة بالهيل والزعفران. الأسعار تعتبر متوسطة إلى مرتفعة ولكنها تستحق التجربة والتجول بالمكان.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    authorName: 'Fatima Al-Otaibi',
    rating: 5,
    relativeTime: 'قبل أسبوعين (2 weeks ago)',
    text: 'المطعم غني عن التعريف، نزور فرع التخصصي بشكل مستمر. الجلسات مريحة وتراعي عاداتنا وتقاليدنا بخصوصية تامة. أنصح بشدة بالجريش والقرصان، طعم أكل أمهاتنا وجداتنا الحقيقي. شكراً للقائمين على هذا الإرث.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
    helpfulCount: 22
  }
];
