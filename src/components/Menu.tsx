import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';
import { Flame, Info, ShoppingBag, Plus, Minus, Trash2, Check, Sparkles } from 'lucide-react';

interface MenuProps {
  lang: 'ar' | 'en';
}

interface CartItem {
  item: MenuItem;
  quantity: number;
  extras: string[];
}

export default function Menu({ lang }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Customization Options
  const [extraGhee, setExtraGhee] = useState(false);
  const [extraBread, setExtraBread] = useState(false);
  const [spicePreference, setSpicePreference] = useState<'default' | 'spicy'>('default');

  const categories = [
    { id: 'all', labelEn: 'All Feasts', labelAr: 'كل الموائد' },
    { id: 'main', labelEn: 'Main Platters', labelAr: 'الأطباق الرئيسية' },
    { id: 'starter', labelEn: 'Starters', labelAr: 'المقبلات والسمبوسة' },
    { id: 'soup', labelEn: 'Soups', labelAr: 'الشوربات الدافئة' },
    { id: 'dessert', labelEn: 'Sweet Treats', labelAr: 'الحلويات التراثية' },
    { id: 'beverage', labelEn: 'Beverages', labelAr: 'المشروبات والدلال' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const getSpiceIcons = (level: number) => {
    return [...Array(level)].map((_, i) => (
      <Flame key={i} className="w-3.5 h-3.5 fill-red-500 text-red-500 inline-block -mt-1" />
    ));
  };

  // Add Item to Cart
  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    const extras: string[] = [];
    if (extraGhee) extras.push(lang === 'ar' ? 'سمن بلدي إضافي' : 'Extra Ghee (+3 SAR)');
    if (extraBread) extras.push(lang === 'ar' ? 'خبز بر إضافي' : 'Extra Wheat Bread (+2 SAR)');
    if (spicePreference === 'spicy' && selectedItem.spiceLevel > 0) {
      extras.push(lang === 'ar' ? 'حار إضافي' : 'Extra Spicy');
    }

    const existingIndex = cart.findIndex(c => 
      c.item.id === selectedItem.id && 
      JSON.stringify(c.extras) === JSON.stringify(extras)
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { item: selectedItem, quantity: 1, extras }]);
    }

    // Reset customizations and close modal
    setExtraGhee(false);
    setExtraBread(false);
    setSpicePreference('default');
    setSelectedItem(null);
    setIsCartOpen(true); // Open cart sidebar to show response
  };

  const updateQuantity = (index: number, change: number) => {
    const updated = [...cart];
    updated[index].quantity += change;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, cartItem) => {
      let itemPrice = cartItem.item.price;
      cartItem.extras.forEach(extra => {
        if (extra.includes('+3') || extra.includes('سمن')) itemPrice += 3;
        if (extra.includes('+2') || extra.includes('خبز')) itemPrice += 2;
      });
      return total + (itemPrice * cartItem.quantity);
    }, 0);
  };

  const totalCaloriesInCart = cart.reduce((total, cartItem) => {
    return total + (cartItem.item.calories * cartItem.quantity);
  }, 0);

  return (
    <section id="menu" className="py-24 bg-[#0a0503] relative min-h-screen">
      {/* Visual background divider */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0d0705] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 bg-amber-950/40 border border-amber-900/30 rounded-full text-xs text-amber-500 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الطهي ببطء وحب' : 'Traditional Slow Cooking'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            {lang === 'ar' ? 'قائمة الطعام النجدية' : 'The Culinary Feast'}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded mb-4" />
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar' 
              ? 'أطباق طُبخت ببطء وعناية مقتبسة من أسرار البادية النجدية. استخدم فئات الرغبة لتجربة متكاملة.' 
              : 'Our dishes are prepared carefully over active flames quoting recipes from the rich Najd history.'}
          </p>
        </div>

        {/* Filters and Persistent Cart Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-amber-950/20 pb-6">
          {/* Scrollable Category Filter */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-3 md:pb-0 scrollbar-none scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-950 border-amber-500 shadow-md shadow-amber-950/50'
                    : 'bg-stone-900/40 text-stone-400 border-amber-950/40 hover:text-amber-300 hover:border-amber-700/30'
                }`}
              >
                {lang === 'ar' ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Cart Trigger Button displaying counts */}
          <button
            id="view-cart-trigger"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center justify-center space-x-2.5 rtl:space-x-reverse px-5 py-2.5 bg-amber-950/30 hover:bg-amber-950/60 border border-amber-600/30 hover:border-amber-500 rounded-full text-amber-300 text-sm transition-all duration-300 cursor-pointer shadow-lg hover:shadow-amber-950/80"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">{lang === 'ar' ? 'سلة الطلبات' : 'Order Basket'}</span>
            <span className="flex items-center justify-center w-5 h-5 bg-amber-500 text-amber-950 text-xs font-bold rounded-full">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </button>
        </div>

        {/* Menu Grid */}
        <motion.div
          id="menu-items-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                id={`menu-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col h-full bg-[#110a07] rounded-2.5xl overflow-hidden border border-amber-950/30 hover:border-amber-500/30 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Photo frame */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={lang === 'ar' ? item.nameAr : item.nameEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Absolute badgeland */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    {/* Popular badge */}
                    {item.isPopular && (
                      <span className="px-2.5 py-1 rounded-md bg-amber-500 text-amber-950 font-semibold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-amber-950 text-amber-950" />
                        {lang === 'ar' ? 'الأكثر طلباً' : 'Specials'}
                      </span>
                    )}

                    {/* Vegetarian badge */}
                    {item.isVegetarian && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-700 text-emerald-50 font-semibold text-[10px] tracking-wider uppercase shadow-md ml-auto">
                        {lang === 'ar' ? 'نباتي' : 'Veg'}
                      </span>
                    )}
                  </div>

                  {/* Calories Overlay */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-stone-950/80 backdrop-blur-md text-stone-300 text-xs font-mono">
                    {item.calories} {lang === 'ar' ? 'سعرة' : 'Kcal'}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="text-lg font-serif font-bold text-amber-100 group-hover:text-amber-400 transition-colors duration-200">
                      {lang === 'ar' ? item.nameAr : item.nameEn}
                    </h3>
                    <span className="text-amber-500 font-bold tracking-tight text-lg whitespace-nowrap">
                      {item.price} <span className="text-xs">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </span>
                  </div>

                  {/* Spice level indicator */}
                  {item.spiceLevel > 0 && (
                    <div className="mb-2.5 flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                      <span>{lang === 'ar' ? 'مستوى الحرارة:' : 'Spice Level:'}</span>
                      <span className="inline-flex">{getSpiceIcons(item.spiceLevel)}</span>
                    </div>
                  )}

                  {/* Description text */}
                  <p className="text-stone-400 text-sm leading-relaxed mb-6 flex-grow">
                    {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                  </p>

                  {/* Allergen notices */}
                  {item.allergens.length > 0 && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-[11px] text-stone-500 mb-5">
                      <Info className="w-3.5 h-3.5 text-amber-600/60" />
                      <span>
                        {lang === 'ar' ? 'يحتوي على مسببات الحساسية: ' : 'Contains allergens: '}
                        {item.allergens.map(a => lang === 'ar' 
                          ? (a === 'nuts' ? 'مكسرات' : a === 'dairy' ? 'ألبان / حليب' : 'قمح أسمر')
                          : a
                        ).join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Action Customize & Add */}
                  <button
                    id={`customize-btn-${item.id}`}
                    onClick={() => setSelectedItem(item)}
                    className="w-full py-3 px-4 rounded-xl border border-amber-600/30 hover:border-amber-500 bg-amber-950/20 hover:bg-amber-600 hover:text-amber-950 text-amber-300 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <span>{lang === 'ar' ? 'تخصيص وإضافة' : 'Customize & Feast'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ITEM CUSTOMIZATION MODAL (MODAL SCREEN) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
            <motion.div
              id="customization-modal"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#140e0a] border border-amber-900/30 rounded-2.5xl p-6 sm:p-8 text-amber-50 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 mb-1">
                {lang === 'ar' ? selectedItem.nameAr : selectedItem.nameEn}
              </h3>
              <p className="text-xs text-stone-400 mb-6 font-mono">
                {selectedItem.price} {lang === 'ar' ? 'ريال سعودي' : 'SAR'} • {selectedItem.calories} {lang === 'ar' ? 'سعرة حرارية لكل حصة' : 'Kcal per serving'}
              </p>

              {/* Extra Ghee option */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-semibold text-amber-400 tracking-wider">
                  {lang === 'ar' ? 'إضافات التراث النجدية' : 'Heritage Extra Options'}
                </h4>

                <div 
                  onClick={() => setExtraGhee(!extraGhee)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    extraGhee 
                      ? 'border-amber-500 bg-amber-950/30 text-amber-300' 
                      : 'border-amber-950/30 bg-stone-900/30 hover:border-amber-900/40'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang === 'ar' ? 'سمن بري غنم أصيل' : 'Pure Sheep Ghee'}</span>
                    <span className="text-xs text-stone-400">{lang === 'ar' ? 'سمن مكرمل يسكب حاراً' : 'Rich authentic ghee poured hot'}</span>
                  </div>
                  <span className="font-semibold text-xs text-amber-500 font-mono">+3 SAR</span>
                </div>

                <div 
                  onClick={() => setExtraBread(!extraBread)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    extraBread 
                      ? 'border-amber-500 bg-amber-950/30 text-amber-300' 
                      : 'border-amber-950/30 bg-stone-900/30 hover:border-amber-900/40'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang === 'ar' ? 'أقراص خبز بر إضافية' : 'Extra Najdi Flatbread'}</span>
                    <span className="text-xs text-stone-400">{lang === 'ar' ? 'خبز كامل مطهو بالتنور' : 'Whole-wheat bread baked to order'}</span>
                  </div>
                  <span className="font-semibold text-xs text-amber-500 font-mono">+2 SAR</span>
                </div>
              </div>

              {/* Spice Level upgrade (only if item has spice level) */}
              {selectedItem.spiceLevel > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-amber-400 tracking-wider mb-3">
                    {lang === 'ar' ? 'رغبة الشطة والحرارة' : 'Spice Customization'}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="spice-pref-default"
                      onClick={() => setSpicePreference('default')}
                      className={`py-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                        spicePreference === 'default'
                          ? 'border-amber-500 bg-amber-950/30 text-amber-400'
                          : 'border-amber-950/30 bg-stone-900/20 text-stone-400 hover:text-stone-300'
                      }`}
                    >
                      {lang === 'ar' ? 'حرارة معتدلة (الأساسية)' : 'Standard Spice (As Prepared)'}
                    </button>
                    <button
                      id="spice-pref-spicy"
                      onClick={() => setSpicePreference('spicy')}
                      className={`py-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                        spicePreference === 'spicy'
                          ? 'border-amber-500 bg-amber-950/30 text-amber-400'
                          : 'border-amber-950/30 bg-stone-900/20 text-stone-400 hover:text-stone-300'
                      }`}
                    >
                      🔥 {lang === 'ar' ? 'حار إضافي ناري' : 'Extremely Hot (Extra Spice)'}
                    </button>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex space-x-3 rtl:space-x-reverse justify-end border-t border-amber-950/30 pt-6">
                <button
                  id="cancel-customization-btn"
                  onClick={() => {
                    setSelectedItem(null);
                    setExtraGhee(false);
                    setExtraBread(false);
                    setSpicePreference('default');
                  }}
                  className="px-5 py-3 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-semibold uppercase cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  id="confirm-customization-btn"
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-amber-950 font-bold rounded-xl text-xs uppercase tracking-wide cursor-pointer shadow-lg active:scale-95 transition-transform"
                >
                  {lang === 'ar' ? 'إضافة إلى المائدة' : 'Add to Feast'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RIGHT CART DRAWER PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop cover */}
            <div 
              className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs cursor-pointer"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar content container */}
            <div className="absolute inset-y-0 right-0 max-w-full pl-0 sm:pl-10 flex">
              <motion.div
                id="cart-drawer-panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.35 }}
                className="w-screen max-w-md bg-[#130d0a] border-l border-amber-950/30 text-amber-50 flex flex-col shadow-2xl h-full"
              >
                {/* Header of Drawer */}
                <div className="p-6 border-b border-amber-950/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                    <ShoppingBag className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-serif font-bold text-amber-100">
                      {lang === 'ar' ? 'تفاصيل المائدة والطلب' : 'Your Traditional Feast'}
                    </h3>
                  </div>
                  <button
                    id="close-cart-btn"
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 text-stone-500 hover:text-stone-200 cursor-pointer"
                  >
                    {lang === 'ar' ? 'إغلاق' : 'Close'}
                  </button>
                </div>

                {/* Items Space with scrolling */}
                <div className="flex-grow p-6 overflow-y-auto space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <ShoppingBag className="w-12 h-12 text-stone-700 mb-4 animate-bounce" />
                      <p className="text-stone-400 font-medium">
                        {lang === 'ar' ? 'مائدتك خالية حتى الآن!' : 'Your feast is empty!'}
                      </p>
                      <p className="text-stone-600 text-xs mt-1.5 max-w-xs leading-relaxed">
                        {lang === 'ar' 
                          ? 'تصفح قائمة الطعام التراثية وأضف أشهى الأكلات النجدية لبدء تجربتك.'
                          : 'Browse our organic traditional dishes to trigger your heritage dining.'}
                      </p>
                    </div>
                  ) : (
                    cart.map((cartItem, idx) => {
                      let pricePerItem = cartItem.item.price;
                      cartItem.extras.forEach(extra => {
                        if (extra.includes('+3') || extra.includes('سمن')) pricePerItem += 3;
                        if (extra.includes('+2') || extra.includes('خبز')) pricePerItem += 2;
                      });

                      return (
                        <div 
                          key={idx}
                          className="flex items-start justify-between bg-stone-900/40 border border-amber-950/20 p-4 rounded-xl gap-3"
                        >
                          <div className="flex-grow">
                            <h4 className="text-sm font-semibold text-amber-100">
                              {lang === 'ar' ? cartItem.item.nameAr : cartItem.item.nameEn}
                            </h4>
                            <span className="text-xs text-amber-500/80 font-mono">
                              {pricePerItem} SAR • {cartItem.item.calories} Kcal
                            </span>

                            {/* Options/Addons lists */}
                            {cartItem.extras.length > 0 && (
                              <div className="mt-2.5 space-y-1">
                                {cartItem.extras.map((extra, eIdx) => (
                                  <span 
                                    key={eIdx}
                                    className="inline-flex items-center text-[10px] uppercase font-mono text-stone-500 bg-[#1f1611]/80 px-2 py-0.5 rounded mr-1.5"
                                  >
                                    <Check className="w-2.5 h-2.5 text-amber-500 mr-0.5" />
                                    {extra}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Control Quantities */}
                          <div className="flex flex-col items-end gap-3.5">
                            <span className="text-sm font-bold text-amber-400 font-mono">
                              {pricePerItem * cartItem.quantity} SAR
                            </span>

                            <div className="flex items-center space-x-1.5 rtl:space-x-reverse bg-[#000000]/30 rounded-lg p-1 border border-stone-800">
                              <button
                                id={`cart-minus-${idx}`}
                                onClick={() => updateQuantity(idx, -1)}
                                className="p-1 cursor-pointer text-stone-400 hover:text-amber-500"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold font-mono px-2 text-stone-200">
                                {cartItem.quantity}
                              </span>
                              <button
                                id={`cart-plus-${idx}`}
                                onClick={() => updateQuantity(idx, 1)}
                                className="p-1 cursor-pointer text-stone-400 hover:text-amber-500"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>

                              <button
                                id={`cart-remove-${idx}`}
                                onClick={() => removeFromCart(idx)}
                                className="p-1 cursor-pointer text-[#4e433f] hover:text-red-500 border-l border-stone-800 pointer-events-auto ml-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer calculations & checkout simulation */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-amber-950/30 bg-[#160f0c] space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-stone-400">
                        <span>{lang === 'ar' ? 'إجمالي السعرات التقريبي' : 'Approximate Total Calories'}</span>
                        <span className="font-mono text-amber-600 font-semibold">{totalCaloriesInCart} Kcal</span>
                      </div>
                      <div className="flex justify-between text-xs text-stone-400">
                        <span>{lang === 'ar' ? 'رسوم الخدمة والضريبة (15%)' : 'Tax & Service Fee (15%)'}</span>
                        <span className="font-mono">{(getCartSubtotal() * 0.15).toFixed(2)} SAR</span>
                      </div>
                      <div className="h-px bg-stone-800/60 my-2" />
                      <div className="flex justify-between text-base font-bold text-amber-50">
                        <span>{lang === 'ar' ? 'المجموع النهائي للمائدتك' : 'Grand Total'}</span>
                        <span className="font-mono text-amber-400">{(getCartSubtotal() * 1.15).toFixed(2)} SAR</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-stone-500 leading-relaxed text-center py-1">
                      💡 {lang === 'ar' 
                        ? 'طلبك مُثبَّت محلياً كشاشه تفاعلية. سيتم عرضه لطلب سريع بمجرد وصولك للمطعم أو تفعيل الحجز.'
                        : 'Your order is prepared locally for quick scan in-branch upon your arrival.'}
                    </div>

                    <button
                      id="cart-submit-btn"
                      onClick={() => {
                        alert(lang === 'ar' 
                          ? `🎉 تم حفظ طلب المائدة بنجاح! يسعدنا استضافتكم بالمطعم، إجمالي طلباتكم: ${(getCartSubtotal() * 1.15).toFixed(2)} ريال سعودي شاملة الضريبة الرسمية.`
                          : `🎉 Feast Order Registered Successfully! Total: ${(getCartSubtotal() * 1.15).toFixed(2)} SAR (incl. VAT). We look forward to treating you like royalty.`
                        );
                        setCart([]);
                        setIsCartOpen(false);
                      }}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-amber-950 text-sm font-bold rounded-xl shadow-lg transition-all cursor-pointer text-center"
                    >
                      {lang === 'ar' ? 'تأكيد وحفظ الطلب للتوصيل / الخدمة' : 'Confirm Order & Save for Reservation'}
                    </button>
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
