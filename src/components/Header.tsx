import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, Globe, Coffee, MapPin, Calendar, Star, UtensilsCrossed } from 'lucide-react';

interface HeaderProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Header({ lang, setLang, activeSection, scrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', labelEn: 'Home', labelAr: 'الرئيسية', icon: Coffee },
    { id: 'menu', labelEn: 'Menu', labelAr: 'قائمة الطعام', icon: UtensilsCrossed },
    { id: 'story', labelEn: 'Our Story', labelAr: 'قصتنا', icon: Coffee },
    { id: 'reviews', labelEn: 'Reviews', labelAr: 'آراء الضيوف', icon: Star },
    { id: 'booking', labelEn: 'Book a Table', labelAr: 'حجز طاولة', icon: Calendar },
    { id: 'location', labelEn: 'Locations', labelAr: 'فروعنا', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#150e0a]/95 backdrop-blur-md shadow-lg border-b border-amber-950/40 py-3' 
          : 'bg-gradient-to-b from-[#150e0a]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div 
            id="brand-logo" 
            className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer group"
            onClick={() => handleNavClick('hero')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-amber-950/30">
              <span className="font-serif text-amber-100 font-bold text-lg">ق</span>
            </div>
            <div className="flex flex-col text-left rtl:text-right">
              <span className="font-serif text-lg font-bold tracking-wide text-amber-50 group-hover:text-amber-400 transition-colors duration-300">
                {lang === 'ar' ? 'القرية النجدية' : 'Najd Village'}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-amber-500/80 uppercase">
                {lang === 'ar' ? 'تراث ومذاق أصيل' : 'Heritage Dining'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-3 rtl:space-x-reverse">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-amber-400' 
                      : 'text-stone-300 hover:text-amber-200'
                  }`}
                >
                  <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Language and Quick Book */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <button
              id="desktop-lang-toggle"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-lg border border-amber-900/30 bg-amber-950/20 text-xs font-semibold text-stone-300 hover:text-amber-400 hover:border-amber-600/40 transition-all duration-300 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* CTA Button */}
            <button
              id="desktop-cta-book"
              onClick={() => handleNavClick('booking')}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-full shadow-lg shadow-amber-950/40 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              {lang === 'ar' ? 'إحجز طاولة الآن' : 'Reserve Table'}
            </button>
          </div>

          {/* Mobile actions and menu toggle */}
          <div className="flex md:hidden items-center space-x-2 rtl:space-x-reverse">
            <button
              id="mobile-lang-toggle"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="p-2 rounded-lg bg-stone-900/40 text-stone-300 hover:text-amber-400 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-stone-900/40 text-stone-300 hover:text-amber-400 cursor-pointer focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#120b08]/98 border-t border-amber-950/40 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-3 rtl:space-x-reverse w-full px-4 py-3 rounded-xl text-left rtl:text-right text-base font-medium transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-amber-950/50 text-amber-400 border border-amber-500/20' 
                        : 'text-stone-300 hover:bg-stone-900/30'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                    <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-stone-900/50 flex flex-col space-y-2">
                <button
                  id="mobile-cta-book"
                  onClick={() => handleNavClick('booking')}
                  className="w-full text-center py-3 text-sm font-semibold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'إحجز طاولتك الآن' : 'Reserve a Table'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
