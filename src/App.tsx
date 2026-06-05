/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Plus, 
  ShoppingBag, 
  ChefHat, 
  Pizza, 
  Coffee, 
  UtensilsCrossed, 
  Calendar, 
  Users, 
  SlidersHorizontal,
  CheckCircle,
  Database,
  ArrowRight,
  Sparkles,
  Volume2,
  Trash2,
  Lock
} from 'lucide-react';
import PitchPanel from './components/PitchPanel';
import ItemCustomizerModal from './components/ItemCustomizerModal';
import AdminDashboard from './components/AdminDashboard';
import { 
  ThemeColor, 
  themes, 
  defaultMenuItems, 
  MenuItem, 
  Booking, 
  ClientOrder, 
  translationDict 
} from './types';

export default function App() {
  // Brand customizable state controlled by Pitch Panel
  const [customName, setCustomName] = useState('شاورما ولكمة الفاخر');
  const [customPhone, setCustomPhone] = useState('+966 50 782 1294');
  const [customAddress, setCustomAddress] = useState('طريق العليا العام، مقابل برج الفيصلية، الرياض');
  const [themeColor, setThemeColor] = useState<ThemeColor>('amber');
  const [currency, setCurrency] = useState('ر.س');
  const [logoPreset, setLogoPreset] = useState<'chef' | 'pizza' | 'coffee' | 'utensils'>('chef');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  // Interactive menu Search and Category states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mains' | 'appetizers' | 'desserts' | 'drinks'>('all');

  // Customer Orders State (Sandbox Client)
  const [cart, setCart] = useState<{
    menuItem: MenuItem;
    qty: number;
    customizations: string[];
    note: string;
  }[]>([]);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [demoTableNum, setDemoTableNum] = useState(12);

  // Table Bookings State (Simulations list)
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'B-7752',
      name: 'عبدالمحسن الرويلي',
      phone: '+966 54 992 0113',
      guests: 4,
      date: '2026-06-05',
      time: '20:30',
      tableType: 'Enclosed Luxury VIP Banquet Booth',
      status: 'confirmed',
      createdAt: '11:20 AM'
    },
    {
      id: 'B-4410',
      name: 'Sarah Anderson',
      phone: '+966 50 112 0451',
      guests: 2,
      date: '2026-06-06',
      time: '19:00',
      tableType: 'Pano-glass main street view table',
      status: 'completed',
      createdAt: '09:15 AM'
    }
  ]);

  // Kitchen Orders State (Simulations list)
  const [orders, setOrders] = useState<ClientOrder[]>([
    {
      id: 'O-215B',
      items: [
        {
          menuItem: defaultMenuItems[0], // Shawarma
          qty: 2,
          customizations: ['Extra Garlic Paste'],
          note: 'كثّر بطاطس لو سمحت'
        },
        {
          menuItem: defaultMenuItems[7], // Mojito
          qty: 2,
          customizations: [],
          note: 'بارد جداً'
        }
      ],
      totalPrice: 96,
      tableNum: 8,
      status: 'delivered',
      createdAt: '10:45 AM'
    }
  ]);

  // Table reservation form temporary inputs template
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    guests: 2,
    date: '2026-06-05',
    time: '20:00',
    tableType: 'VIP Booth'
  });

  const [bookingSuccessData, setBookingSuccessData] = useState<Booking | null>(null);

  // Layout alerts and audio notifications
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Manager backoffice control frame overlay
  const [showAdminDb, setShowAdminDb] = useState(false);

  // Fetch bilingual definitions
  const dict = translationDict[language];
  const activeTheme = themes[themeColor];
  const isRtl = language === 'ar';

  const triggerToast = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 4000);
  };

  // Pre-load default logo presets
  const getLogoIcon = () => {
    switch(logoPreset) {
      case 'pizza': return <Pizza className="w-6 h-6" />;
      case 'coffee': return <Coffee className="w-6 h-6" />;
      case 'utensils': return <UtensilsCrossed className="w-6 h-6" />;
      default: return <ChefHat className="w-6 h-6" />;
    }
  };

  // Convert custom name Ar/En or adapt
  const getLogoText = () => {
    return customName || (isRtl ? 'لقمة كرافت' : 'Gourmet Craft');
  };

  // Fast direct add item to cart bypassing modal customizer
  const handleQuickAdd = (item: MenuItem) => {
    const existingIndex = cart.findIndex(c => c.menuItem.id === item.id && c.customizations.length === 0 && !c.note);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].qty += 1;
      setCart(updated);
    } else {
      setCart([...cart, { menuItem: item, qty: 1, customizations: [], note: '' }]);
    }
    triggerToast(`${isRtl ? item.nameAr : item.nameEn} - ${dict.addedToCartAlert}`);
  };

  // Complex add custom configuration from Modal
  const handleAddCustomized = (item: MenuItem, quantity: number, exclusions: string[], notes: string) => {
    setCart([...cart, { menuItem: item, qty: quantity, customizations: exclusions, note: notes }]);
    setCustomizingItem(null);
    triggerToast(`${isRtl ? item.nameAr : item.nameEn} - ${dict.addedToCartAlert}`);
  };

  const handleRemoveCartItem = (index: number) => {
    const backup = [...cart];
    backup.splice(index, 1);
    setCart(backup);
  };

  // Complete cart purchase & generate kitchen order
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const totalBill = cart.reduce((sum, c) => sum + (c.menuItem.price * c.qty), 0);
    const newOrder: ClientOrder = {
      id: `O-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      items: [...cart],
      totalPrice: totalBill,
      tableNum: demoTableNum,
      status: 'ordered',
      createdAt: new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setOrders([newOrder, ...orders]);
    setCart([]); // Clear cart
    triggerToast(dict.orderPlacedToast);

    // Scroll slightly to let the user open the Admin Portal to track it
    const promptPanel = document.getElementById('management-portal-trigger');
    if (promptPanel) {
      promptPanel.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Tableside Reservation form submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      triggerToast(isRtl ? 'الرجاء إدخال الاسم ورقم الجوال للتأكيد!' : 'Please insert name and contact phone for verification!');
      return;
    }

    const currentBookingRef = `B-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      id: currentBookingRef,
      name: bookingForm.name,
      phone: bookingForm.phone,
      guests: bookingForm.guests,
      date: bookingForm.date,
      time: bookingForm.time,
      tableType: bookingForm.tableType,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setBookings([newBooking, ...bookings]);
    setBookingSuccessData(newBooking);
    triggerToast(dict.bookingConfirmedToast);
    
    // Clear inputs
    setBookingForm({
      name: '',
      phone: '',
      guests: 2,
      date: '2026-06-05',
      time: '20:00',
      tableType: 'VIP Booth'
    });
  };

  // Interactive Spot Map selection handler
  const selectSpotMap = (spotLabelEn: string, spotLabelAr: string) => {
    const selectedText = isRtl ? spotLabelAr : spotLabelEn;
    setBookingForm({
      ...bookingForm,
      tableType: selectedText
    });
    triggerToast(isRtl ? `تم اختيار منطقة: ${spotLabelAr}` : `Selected Zone: ${spotLabelEn}`);
    
    // Smooth scroll down to the form
    const fElement = document.getElementById('booking-input-sec');
    if (fElement) {
      fElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Admin Dashboard handlers
  const handleCompleteOrder = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'delivered' } : o));
    triggerToast(isRtl ? 'تم تسليم الوجبة لطلب العميل وموازنة الصندوق!' : 'Order served to client, billing completed!');
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
    triggerToast(isRtl ? 'تم حذف الإشعار الحركي للطلب!' : 'Order entry destroyed!');
  };

  const handleCompleteBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'completed' } : b));
    triggerToast(isRtl ? 'تم إجلاس الزبائن بنجاح وتمثيل الحجز!' : 'Guests seated, booking labeled complete!');
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
    triggerToast(isRtl ? 'تم شطب الحجز التقديري!' : 'Booking entry deleted!');
  };

  // Filter items based on category and search query
  const filteredItems = defaultMenuItems.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const itemQuery = `${item.nameAr} ${item.nameEn} ${item.descAr} ${item.descEn}`.toLowerCase();
    const matchQuery = itemQuery.includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div 
      className={`min-h-screen bg-neutral-50 flex flex-col font-sans transition-colors duration-300 relative selection:bg-zinc-800 selection:text-white`}
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* Dynamic Toast Alert Notification */}
      {alertMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] max-w-sm w-full px-4 text-xs font-bold">
          <div className="bg-zinc-900 border border-zinc-700 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-slide-up">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">●</span>
              <p className="leading-tight">{alertMessage}</p>
            </div>
            <button onClick={() => setAlertMessage(null)} className="text-zinc-400 hover:text-white cursor-pointer ml-2">✕</button>
          </div>
        </div>
      )}

      {/* Persistent live agency pitch panel widget */}
      <PitchPanel 
        customName={customName}
        setCustomName={setCustomName}
        customPhone={customPhone}
        setCustomPhone={setCustomPhone}
        customAddress={customAddress}
        setCustomAddress={setCustomAddress}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        currency={currency}
        setCurrency={setCurrency}
        logoPreset={logoPreset}
        setLogoPreset={setLogoPreset}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Interactive Food Customizer Dialogue Popup */}
      {customizingItem && (
        <ItemCustomizerModal 
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddCustomized}
          language={language}
          currency={currency}
        />
      )}

      {/* Admin Back-Office dashboard simulation panel */}
      {showAdminDb && (
        <AdminDashboard 
          onClose={() => setShowAdminDb(false)}
          bookings={bookings}
          orders={orders}
          onCompleteOrder={handleCompleteOrder}
          onDeleteOrder={handleDeleteOrder}
          onCompleteBooking={handleCompleteBooking}
          onDeleteBooking={handleDeleteBooking}
          language={language}
          currency={currency}
        />
      )}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Brand Custom */}
          <a href="#" className="flex items-center gap-2 group">
            <span className={`p-2 rounded-xl text-white flex items-center justify-center transition-all ${activeTheme.gradient} shadow-md shadow-zinc-250`}>
              {getLogoIcon()}
            </span>
            <span className="text-md font-extrabold tracking-tight text-neutral-950 group-hover:opacity-80">
              {getLogoText()}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-600">
            <a href="#menu-catalog" className={`hover:text-neutral-900 transition-colors`}>{isRtl ? 'قائمة الوجبات' : 'Menu Catalog'}</a>
            <a href="#booking-section" className={`hover:text-neutral-900 transition-colors`}>{isRtl ? 'حجز طاولة' : 'Book a Spot'}</a>
            <a href="#pitch-arguments" className={`hover:text-neutral-900 transition-colors text-indigo-600 flex items-center gap-1`}>
              <Sparkles size={11} />
              {isRtl ? 'لماذا موقعنا الذكي؟' : 'Pitch Advantages'}
            </a>
          </nav>

          {/* Direct Manager Backoffice Trigger Button (Master Feature) */}
          <div className="flex items-center gap-3">
            <button
              id="management-portal-trigger"
              onClick={() => setShowAdminDb(true)}
              className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow cursor-pointer"
            >
              <Database size={13} className="animate-pulse text-amber-400" />
              <span>{isRtl ? 'لوحة بورتال المدير 📊' : 'Manager Desk 📊'}</span>
            </button>

            {/* Quick Lang toggled in Header */}
            <button 
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="text-[10px] font-extrabold font-mono px-2 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer"
              title="Toggle Language"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white py-12 md:py-24 border-b border-zinc-100">
        {/* Subtle decorative background gradients */}
        <div className="absolute inset-0 bg-neutral-50/50 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-neutral-100 to-transparent rounded-full blur-3xl opacity-60"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Content text */}
          <div className="space-y-6 text-neutral-900">
            <div className={`p-1 bg-neutral-100 rounded-lg inline-flex items-center gap-2 text-[10px] font-bold tracking-wide uppercase px-2.5 ${activeTheme.text}`}>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              {dict.heroTag}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.2] text-neutral-950 tracking-tight">
              {isRtl ? (
                <>
                  اصنع موقعاً مبهراً لـ <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent underline decoration-indigo-200 decoration-4 underline-offset-4">{getLogoText()}</span> بمميزات ذكية ترفع مبيعاته!
                </>
              ) : (
                <>
                  Craft an elite website for <span className="bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent underline decoration-indigo-100 decoration-4 underline-offset-4">{getLogoText()}</span> to secure ultimate sales!
                </>
              )}
            </h1>

            <p className="text-zinc-650 text-sm md:text-base leading-relaxed font-medium">
              {dict.heroSub}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#menu-catalog"
                className={`px-6 py-3.5 text-xs font-bold rounded-2xl text-white shadow-lg transition-transform hover:scale-102 flex items-center gap-2 ${activeTheme.gradient}`}
              >
                <span>{dict.exploreMenu}</span>
                <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
              </a>

              <a
                href="#booking-section"
                className="px-6 py-3.5 text-xs font-bold rounded-2xl bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 transition-colors flex items-center gap-1.5"
              >
                <Calendar size={14} />
                <span>{dict.bookTable}</span>
              </a>
            </div>

            {/* Offline notification card */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-[11px] text-indigo-800 leading-relaxed max-w-lg">
              {dict.offlineNotice}
            </div>
          </div>

          {/* Interactive Rotating Plate Showcase (Pure CSS & SVGs representation) */}
          <div className="flex justify-center items-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              
              {/* Outer decorative glowing orbital rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-200 animate-spin-slow"></div>
              <div className="absolute inset-10 rounded-full border border-zinc-200/60"></div>
              <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-zinc-50 to-neutral-100 shadow-inner"></div>

              {/* Orbiting visual ingredients (pure icons offline-ready) */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 p-2 bg-white rounded-full shadow-lg border border-neutral-100 text-sm">🌶️</div>
              <div className="absolute bottom-6 right-8 p-2 bg-white rounded-full shadow-lg border border-neutral-100 text-sm">🧀</div>
              <div className="absolute bottom-10 left-6 p-2 bg-white rounded-full shadow-lg border border-neutral-100 text-sm">🥬</div>
              <div className="absolute top-1/2 right-1 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg border border-neutral-100 text-sm">🍋</div>

              {/* Central Premium Food Plate Container */}
              <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-2xl border-4 border-neutral-50 flex flex-col items-center justify-center transform hover:scale-105 duration-500 overflow-hidden">
                <div className="absolute inset-2 rounded-full border border-dashed border-zinc-100"></div>
                
                {/* Visual changing centerpiece loader based on logoPreset */}
                <div className="text-center relative z-10">
                  {logoPreset === 'pizza' && (
                    <div className="text-6xl md:text-7xl select-none animate-bounce">🍕</div>
                  )}
                  {logoPreset === 'coffee' && (
                    <div className="text-6xl md:text-7xl select-none animate-bounce">☕</div>
                  )}
                  {logoPreset === 'chef' && (
                    <div className="text-6xl md:text-7xl select-none animate-bounce">🌯</div>
                  )}
                  {logoPreset === 'utensils' && (
                    <div className="text-6xl md:text-7xl select-none animate-bounce">🍝</div>
                  )}
                  
                  <p className="mt-2 font-black text-xs md:text-sm text-zinc-900 tracking-wide">
                    {logoPreset.toUpperCase()} SPECIAL
                  </p>
                  <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    {currency} 35.00 {isRtl ? 'مثالي' : 'Best Seller'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* PITCH SALES ARGUMENTS SECTIONS - PERFECT FOR WEB DESIGNERS */}
      <section id="pitch-arguments" className="py-12 bg-neutral-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-zinc-100 shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Pitch coaching intro */}
              <div className="lg:col-span-5 space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  💡
                </div>
                <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                  {dict.pitchHighlightsTitle}
                </h3>
                <p className="text-zinc-600 leading-relaxed text-xs font-medium">
                  {isRtl 
                    ? 'أثناء حديثك مع أصحاب المطاعم، أشر إلى النقاط التالية لشرح الفائدة الاستثمارية الضخمة التي سيحصلون عليها عند تفويضك لبرمجة موقعهم الإلكتروني:'
                    : 'Use this guide during your sales chat with restaurant managers to establish immediate return-of-investment value:'}
                </p>
              </div>

              {/* Bullet list bento grids */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
                  <div className="text-lg">🛒</div>
                  <p className="text-zinc-700 leading-relaxed">
                    {isRtl ? 'تقليل ضغط الطاولات: الكود المتاح بـ QR Code يمكن الزوار من الطلب دون مجهود النادلين.' : 'Menu QR direct ordering decreases waiter stress, freeing up 40% of standard order taking times.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
                  <div className="text-lg">📈</div>
                  <p className="text-zinc-700 leading-relaxed">
                    {isRtl ? 'رفع قيمة المبيعات: خاصية استبعاد وإضافة المكونات بالصور تشجع على طلب إضافات مدفوعة.' : 'Image-based modifiers and simple checkboxes naturally upsell extra cheese, sauces, and drinks dynamically.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
                  <div className="text-lg">📂</div>
                  <p className="text-zinc-700 leading-relaxed">
                    {isRtl ? 'قاعدة بيانات للزبائن المستقبليين: سيمتلكون تفاصيل وعناوين حقيقية لعملاء يحبون أكلهم!' : 'Capture critical local client phones & booking preferences for target marketing, bypassing application fee cuts.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
                  <div className="text-lg">⚡</div>
                  <p className="text-zinc-700 leading-relaxed">
                    {isRtl ? 'قوة محركات البحث: ظهور المطعم في نتائج خرائط جوجل ومحركات البحث لزيادة مبيعات السفر.' : '100% cloud optimized local SEO, placing the restaurant at the pinnacle of Google Maps searches.'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TABLE MAP SECTION */}
      <section className="py-12 bg-white border-y border-zinc-100 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              {dict.demoTableMap}
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              {isRtl 
                ? 'انقر على أي قسم من الخريطة بالأسفل لاختياره تلقائياً وتجربة نظام حجز المقاعد الفخم!'
                : 'Interactive spot visualization. Click any section zone on the diagram to load it inside the booking module.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* VIP Booth */}
            <button
              onClick={() => selectSpotMap('Enclosed Luxury VIP Banquet Booth', 'جلسة كبينة VIP مغلقة هادئة')}
              className={`p-5 rounded-2xl text-right border transition-all text-xs cursor-pointer group hover:scale-[1.02] ${
                bookingForm.tableType.includes('VIP') 
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-md shadow-amber-100' 
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="p-1 rounded bg-amber-400 text-white font-bold text-[10px]">VIP</span>
                <span className="text-emerald-500 font-black">✓ {isRtl ? 'نشط' : 'Free'}</span>
              </div>
              <p className="font-extrabold text-neutral-950 mt-4 leading-relaxed">
                {dict.vipBooth}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">{isRtl ? 'مثالي للاجتماعات العائلية المريحة' : 'Ideal for private luxurious sessions'}</p>
            </button>

            {/* Window Seat */}
            <button
              onClick={() => selectSpotMap('Pano-glass main street view table', 'طاولة مطلة على الشارع الرئيسي بالنافذة')}
              className={`p-5 rounded-2xl text-right border transition-all text-xs cursor-pointer group hover:scale-[1.02] ${
                bookingForm.tableType.includes('Window') || bookingForm.tableType.includes('النافذة')
                  ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-md shadow-blue-100' 
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="p-1 rounded bg-blue-500 text-white font-bold text-[10px]">PANO</span>
                <span className="text-emerald-500 font-black">✓ {isRtl ? 'نشط' : 'Free'}</span>
              </div>
              <p className="font-extrabold text-neutral-950 mt-4 leading-relaxed">
                {dict.windowSeat}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">{isRtl ? 'إطلالة حيوية على الشارع مع عزل صوتي' : 'Lively city panoramic exposure'}</p>
            </button>

            {/* Outdoor Garden */}
            <button
              onClick={() => selectSpotMap('Fresh open air botanical patio zone', 'جلسة خارجية في الهواء الطلق والحديقة الطبيعية')}
              className={`p-5 rounded-2xl text-right border transition-all text-xs cursor-pointer group hover:scale-[1.02] ${
                bookingForm.tableType.includes('Garden') || bookingForm.tableType.includes('حديقة') || bookingForm.tableType.includes('الخارجية')
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-md shadow-emerald-100' 
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="p-1 rounded bg-emerald-500 text-white font-bold text-[10px]">PATIO</span>
                <span className="text-emerald-500 font-black">✓ {isRtl ? 'نشط' : 'Free'}</span>
              </div>
              <p className="font-extrabold text-neutral-950 mt-4 leading-relaxed">
                {dict.outdoorGarden}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">{isRtl ? 'هواء نقي محاط بنوافير مياه طبيعية' : 'Surrendered by botanical streams'}</p>
            </button>

            {/* Family partition */}
            <button
              onClick={() => selectSpotMap('Wide secluded family partition space', 'طاولة في القسم العائلي الواسع المحجوب')}
              className={`p-5 rounded-2xl text-right border transition-all text-xs cursor-pointer group hover:scale-[1.02] ${
                bookingForm.tableType.includes('Family') || bookingForm.tableType.includes('العائلي')
                  ? 'bg-purple-50 border-purple-200 text-purple-900 shadow-md shadow-purple-100' 
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="p-1 rounded bg-purple-500 text-white font-bold text-[10px]">FAMILY</span>
                <span className="text-rose-500 font-bold">● {isRtl ? 'مزدحم قليلاً' : 'High demand'}</span>
              </div>
              <p className="font-extrabold text-neutral-950 mt-4 leading-relaxed">
                {dict.familySection}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">{isRtl ? 'حواجز كاملة للخصوصية الكلية المحببة' : 'Full partition for cozy boundaries'}</p>
            </button>

          </div>
        </div>
      </section>

      {/* TABLE BOOKING FORM */}
      <section id="booking-section" className="py-12 bg-neutral-100 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-zinc-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Reservation Form instructions left pane */}
          <div className="md:col-span-5 p-6 md:p-8 bg-zinc-900 text-white flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-indigo-600 text-[9px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider">
                Booking Engine
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
                {dict.tableBookingTitle}
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                {dict.tableBookingSub}
              </p>
            </div>

            {/* Simulated Live Booked Stat */}
            <div className="mt-8 border-t border-zinc-800 pt-4 space-y-2 text-xs font-mono text-zinc-400">
              <p className="flex items-center gap-2">
                <span className="text-emerald-400">●</span>
                <span>{isRtl ? 'محاكاة الاتصال: متصل بقاعدة كاشير محلية' : 'Connectivity: Standard Local Host'}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>⚡</span>
                <span>{isRtl ? `العملة الأساسية: ${currency}` : `Standard display: ${currency}`}</span>
              </p>
            </div>
          </div>

          {/* Actual Form Inputs */}
          <div id="booking-input-sec" className="md:col-span-7 p-6 md:p-8 text-neutral-900">
            {bookingSuccessData ? (
              <div className="space-y-6 text-center py-6 text-xs font-medium">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-950">{dict.bookingSuccess}</h4>
                  <p className="text-neutral-500 mt-1">
                    {isRtl ? `شرفنا بالقدوم يا أستاذ ${bookingSuccessData.name}` : `Welcome aboard, Mr/Ms ${bookingSuccessData.name}`}
                  </p>
                </div>

                {/* Styled Booking Card Voucher printable */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-3 font-mono text-zinc-700 max-w-sm mx-auto shadow-inner text-right leading-relaxed">
                  <p className="font-bold text-center border-b border-dashed pb-2 text-zinc-950 uppercase">
                    {getLogoText()} TICKET
                  </p>
                  <p>🎫 {isRtl ? 'رقم الحجز:' : 'Ref Code:'} <span className="font-extrabold text-zinc-950 text-xs">{bookingSuccessData.id}</span></p>
                  <p>👥 {isRtl ? 'الأفراد:' : 'Guests count:'} <span className="font-extrabold text-zinc-950">{bookingSuccessData.guests}</span></p>
                  <p>🗓️ {isRtl ? 'التاريخ والوقت:' : 'Date Time:'} <span className="font-extrabold text-zinc-950">{bookingSuccessData.date} | {bookingSuccessData.time}</span></p>
                  <p>📍 {isRtl ? 'منطقة الجلوس:' : 'Seated zone:'} <span className="font-extrabold text-zinc-950 text-[10px] text-indigo-700">{bookingSuccessData.tableType}</span></p>
                  
                  {/* Generated Offline Mini QR grid mock */}
                  <div className="border-t border-dashed pt-3 flex flex-col items-center justify-center gap-2">
                    <div className="w-16 h-16 bg-zinc-900 rounded p-1.5 grid grid-cols-4 gap-0.5 shadow-sm">
                      <div className="bg-white"></div><div className="bg-zinc-900"></div><div className="bg-white"></div><div className="bg-white"></div>
                      <div className="bg-white"></div><div className="bg-white"></div><div className="bg-zinc-900"></div><div className="bg-white"></div>
                      <div className="bg-white"></div><div className="bg-zinc-900"></div><div className="bg-white"></div><div className="bg-zinc-900"></div>
                      <div className="bg-zinc-900"></div><div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div>
                    </div>
                    <span className="text-[8px] text-zinc-400 capitalize">Scan at desk (offline confirmed)</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingSuccessData(null)}
                  className="px-6 py-2 border border-zinc-200 hover:bg-zinc-50 rounded-xl font-bold text-xs text-zinc-800 transition-colors cursor-pointer"
                >
                  {isRtl ? 'محاكاة حجز جديد' : 'Simulate Another Reserve'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-semibold text-zinc-700">
                
                {/* Full name input */}
                <div>
                  <label className="block mb-1 font-bold text-neutral-800">{dict.fullName}</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full p-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400 text-neutral-900 text-xs"
                    placeholder={isRtl ? 'مثال: أسعد بن سعيد' : 'e.g., Jane Cooper'}
                  />
                </div>

                {/* Phone verification input */}
                <div>
                  <label className="block mb-1 font-bold text-neutral-800">{dict.phoneNum}</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full p-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400 text-neutral-900 text-xs"
                    placeholder={customPhone}
                    style={{ direction: 'ltr' }}
                  />
                </div>

                {/* Guests and seating selection split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-bold text-neutral-800">{dict.guestCount}</label>
                    <select
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: parseInt(e.target.value) })}
                      className="w-full p-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1-zinc-400 bg-white text-neutral-900 text-xs"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {isRtl ? 'أشخاص' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-neutral-800">{dict.tableType}</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.tableType}
                      onChange={(e) => setBookingForm({ ...bookingForm, tableType: e.target.value })}
                      className="w-full p-2.5 border border-zinc-200 bg-zinc-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400 text-neutral-900 text-xs font-bold"
                      placeholder={isRtl ? 'انقر على الخريطة أعلاه' : 'Choose map above'}
                    />
                  </div>
                </div>

                {/* Date/Time picker split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-bold text-neutral-800">{dict.date}</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full p-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400 text-neutral-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-neutral-800">{dict.time}</label>
                    <input
                      type="text"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="w-full p-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400 text-neutral-900 text-xs font-bold"
                      placeholder="20:00"
                    />
                  </div>
                </div>

                {/* Complete submit button */}
                <button
                  type="submit"
                  className={`w-full py-3 text-xs font-bold text-white rounded-xl shadow-lg transition-transform active:scale-95 duration-150 cursor-pointer ${activeTheme.gradient}`}
                >
                  {dict.submitBooking}
                </button>

              </form>
            )}
          </div>
        </div>
      </section>

    {/* MODERN SMART CATALOG MENU WITH BILL SIMULATOR */}
    <section id="menu-catalog" className="py-16 bg-white px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title and layout header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
          <div className="space-y-2">
            <span className={`text-[10px] tracking-widest font-extrabold uppercase p-1 px-2.5 rounded-lg ${activeTheme.bgLight} ${activeTheme.accent}`}>
              {isRtl ? 'المنيو الذكي التفاعلي' : 'Interactive Digital Catalog'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-950 tracking-tight">
              {isRtl ? 'قائمة المأكولات والمشروبات' : 'Our Artisan Food & Drink Ledger'}
            </h2>
          </div>

          {/* Real-time search by keyword */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.searchPlaceholder}
              className="w-full text-xs p-3 pl-10 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-zinc-50 text-neutral-900 font-medium"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          </div>
        </div>

        {/* Category filters list */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          {[
            { id: 'all', labelAr: 'الكل', labelEn: 'All Signature' },
            { id: 'mains', labelAr: 'الوجبات الرئيسية 🥩', labelEn: 'Mains 🥩' },
            { id: 'appetizers', labelAr: 'المقبلات 🍟', labelEn: 'Appetizers 🍟' },
            { id: 'desserts', labelAr: 'الحلويات 🍰', labelEn: 'Desserts 🍰' },
            { id: 'drinks', labelAr: 'المشروبات 🍹', labelEn: 'Drinks 🍹' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl transition-all border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-zinc-950 border-zinc-950 text-white shadow'
                  : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              {language === 'ar' ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Catalog Menu list & Order Cart Simulator Split view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Menu Items Showcase (Left Pane) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
            {filteredItems.length === 0 ? (
              <div className="col-span-1 md:col-span-2 py-16 text-center text-neutral-400 space-y-3 font-medium text-xs">
                <p>🔍 {dict.noItemsFound}</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
                  className="px-4 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-zinc-800 cursor-pointer"
                >
                  {isRtl ? 'إعادة ضبط مرشحات البحث' : 'Clear search filters'}
                </button>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border ${activeTheme.bgCard} overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group`}
                >
                  {/* Badges */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 text-[9px] font-extrabold tracking-wide uppercase">
                    {item.isPopular && (
                      <span className="bg-amber-500 text-white px-2 py-0.5 rounded shadow">
                        {dict.popularBadge}
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded shadow">
                        {dict.vegBadge}
                      </span>
                    )}
                  </div>

                  {/* Header visual icon drawing */}
                  <div className="bg-neutral-950 p-6 flex items-center justify-center min-h-[110px] relative overflow-hidden text-neutral-400 select-none">
                    <div className="absolute inset-0 bg-neutral-950 group-hover:scale-105 transition-transform duration-500"></div>
                    
                    {/* Tiny styled floating meal design */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                      {item.visualSvg === 'burger' && <span className="text-3xl">🍔</span>}
                      {item.visualSvg === 'pizza' && <span className="text-3xl">🍕</span>}
                      {item.visualSvg === 'shawarma' && <span className="text-3xl">🌯</span>}
                      {item.visualSvg === 'salad' && <span className="text-3xl">🥗</span>}
                      {item.visualSvg === 'fries' && <span className="text-3xl">🍟</span>}
                      {item.visualSvg === 'cake' && <span className="text-3xl">🍰</span>}
                      {item.visualSvg === 'cookie' && <span className="text-3xl">🍪</span>}
                      {item.visualSvg === 'drink' && <span className="text-3xl">🍹</span>}
                      {item.visualSvg === 'coffee' && <span className="text-3xl">☕</span>}
                    </div>

                    <span className="absolute bottom-2 right-3 text-[9px] font-semibold font-mono tracking-wider opacity-60 text-white">
                      {item.prepTime} MINS
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-xs font-semibold text-zinc-700">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-neutral-950 text-sm group-hover:text-amber-800 transition-colors">
                          {language === 'ar' ? item.nameAr : item.nameEn}
                        </h4>
                        <span className="text-neutral-950 font-black text-sm">
                          {item.price} {currency}
                        </span>
                      </div>
                      <p className="text-zinc-500 font-medium text-[11px] leading-relaxed line-clamp-2">
                        {language === 'ar' ? item.descAr : item.descEn}
                      </p>
                    </div>

                    {/* Action customizer buttons */}
                    <div className="flex items-center gap-2 pt-2 text-[10px] font-bold">
                      <button
                        onClick={() => handleQuickAdd(item)}
                        className={`flex-1 py-1.5 border hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer text-center ${activeTheme.primary}`}
                      >
                        {dict.quickAddBtn}
                      </button>

                      <button
                        onClick={() => setCustomizingItem(item)}
                        className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-colors cursor-pointer"
                      >
                        {dict.customizeBtn}
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Interactive Bill / Order Cart Simulator (Right Pane) */}
          <div className="lg:col-span-4 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-6 text-xs font-medium">
            <div className="border-b border-zinc-200 pb-4">
              <span className="p-1 bg-zinc-900 text-white text-[9px] font-bold uppercase rounded px-2">Demo Sales billing</span>
              <h3 className="font-extrabold text-neutral-950 text-base mt-2">
                {dict.orderDemoTitle}
              </h3>
              <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                {dict.orderDemoSub}
              </p>
            </div>

            {/* Cart list body */}
            {cart.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 space-y-2 leading-relaxed">
                <ShoppingBag className="mx-auto text-zinc-300" size={28} />
                <p>{dict.cartEmpty}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cart.map((cartItem, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm flex items-start justify-between gap-3 text-neutral-800">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-indigo-700">x{cartItem.qty}</span>
                          <span className="font-bold text-neutral-950">
                            {language === 'ar' ? cartItem.menuItem.nameAr : cartItem.menuItem.nameEn}
                          </span>
                        </div>
                        
                        {/* Selected exclusions or special requests formatting */}
                        {cartItem.customizations.length > 0 && (
                          <p className="text-[9px] text-rose-600">
                            {language === 'ar' ? 'بدون: ' : 'No: '} {cartItem.customizations.join('، ')}
                          </p>
                        )}
                        {cartItem.note && (
                          <p className="text-[9px] text-zinc-400 italic">
                            "{cartItem.note}"
                          </p>
                        )}
                      </div>

                      {/* Item subtotal & delete link */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-bold text-neutral-900">
                          {cartItem.menuItem.price * cartItem.qty} {currency}
                        </span>
                        <button
                          onClick={() => handleRemoveCartItem(idx)}
                          className="text-zinc-400 hover:text-rose-600 p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table Spot simulator */}
                <div className="bg-white p-3 rounded-xl border border-zinc-200 flex items-center justify-between gap-2">
                  <span className="font-bold text-zinc-650">{dict.checkoutTableNum}</span>
                  <input
                    type="number"
                    value={demoTableNum}
                    onChange={(e) => setDemoTableNum(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 p-1 text-center bg-zinc-50 border border-zinc-200 rounded font-bold text-xs"
                  />
                </div>

                {/* Subtotals & Call to Action */}
                <div className="border-t border-dashed border-zinc-200 pt-4 space-y-2">
                  <div className="flex justify-between font-bold text-neutral-800">
                    <span>{dict.total}</span>
                    <span className="text-sm font-extrabold text-neutral-950">
                      {cart.reduce((sum, c) => sum + (c.menuItem.price * c.qty), 0)} {currency}
                    </span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{dict.placeMockOrder}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>

    {/* PERSISTENT PRESENTATIONAL SUMMARY CARD AREA (THE PITCH CONCLUSION) */}
    <section className="py-12 bg-zinc-900 text-white text-xs font-semibold px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="w-12 h-12 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto text-lg animate-pulse">
          ✨
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-white">
            {isRtl ? 'حاضر للإغلاق الفوري للصفقة مع الزبائن!' : 'Ready to close restaurant deals completely offline!'}
          </h3>
          <p className="text-zinc-400 leading-relaxed font-medium max-w-2xl mx-auto">
            {isRtl 
              ? 'احمل موقع العرض الإعلاني الابتكاري هذا على جوالك أو حاسوبك المحمول. لا يهم إن لم يكن هناك اتصال إنترنت على هاتفك بالشارع، فالمنصة تعمل بكامل المكونات والتفاعلات محلياً لإثبات كفاءتك المهنية العالية!'
              : 'Keep this showcase in your pocket or tablet. All states operate instantly on device so that you can impress directors on site, even in complete cellular deadzones.'}
          </p>
        </div>

        {/* Developer Contact detail overlay mockup */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
          <span>Client Lead Tracker v1.4</span>
          <span>•</span>
          <span>100% Lightweight reactive bundle</span>
          <span>•</span>
          <span>Bilingual native layout</span>
        </div>
      </div>
    </section>

    {/* CONTACTS AND FOOTER */}
    <footer className="bg-white border-t border-zinc-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-900 text-xs font-semibold pb-8 border-b border-zinc-100">
        
        {/* About section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg text-white flex items-center justify-center ${activeTheme.gradient}`}>
              {getLogoIcon()}
            </span>
            <span className="font-extrabold text-neutral-950">
              {getLogoText()}
            </span>
          </div>
          <p className="text-zinc-500 font-medium leading-relaxed">
            {isRtl 
              ? 'تجربة عشاء وفطائر مشبعة مجهزة بشغف عائلي مميز لتقدم أفضل المأكولات على مدار الساعة.' 
              : 'Crafting signature culinary experiences with premium grade ingredients cooked with absolute care.'}
          </p>
        </div>

        {/* Contact info customizable dynamically */}
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold text-neutral-950 uppercase tracking-wider">{dict.contactUs}</h4>
          <ul className="space-y-2 text-zinc-650 font-medium">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-zinc-400 shrink-0 mt-0.5" />
              <span>{customAddress}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-zinc-400 shrink-0" />
              <span className="font-mono">{customPhone}</span>
            </li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-neutral-950 uppercase tracking-wider">{dict.workingHours}</h4>
          <ul className="space-y-2 text-neutral-600 font-medium">
            <li className="flex items-center justify-between">
              <span>{isRtl ? 'الأحد - الخميس:' : 'Sunday - Thursday:'}</span>
              <span className="font-mono">11:00 AM - 12:00 AM</span>
            </li>
            <li className="flex items-center justify-between text-indigo-650 font-bold">
              <span>{isRtl ? 'الجمعة - السبت:' : 'Friday - Saturday:'}</span>
              <span className="font-mono">01:00 PM - 02:00 AM</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copy of agency credits strictly specified */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 font-medium">
        <p className="max-w-md">
          {dict.footerNotice}
        </p>
        <p className="font-mono">
          © {new Date().getFullYear()} {getLogoText()} Pro-Pitch Model. All rights reserved.
        </p>
      </div>
    </footer>

    </div>
  );
}
