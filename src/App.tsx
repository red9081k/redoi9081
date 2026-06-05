import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Reviews from './components/Reviews';
import BookingForm from './components/BookingForm';
import LocationMap from './components/LocationMap';
import { Mail, Phone, MapPin, Instagram, Twitter, Heart, Compass } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const sections = ['hero', 'menu', 'story', 'reviews', 'booking', 'location'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-40% 0px -50% 0px', // Focus window is sweet spot at center-top
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <div 
      id="app-root-container" 
      className="min-h-screen bg-[#070302] text-stone-100 select-text overflow-x-hidden"
      style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
    >
      {/* Navigation Header */}
      <Header
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Screen Sections */}
      <main id="main-content-flow">
        <Hero lang={lang} scrollToSection={scrollToSection} />
        
        <Menu lang={lang} />
        
        <About lang={lang} />
        
        <Reviews lang={lang} />
        
        <BookingForm lang={lang} />
        
        <LocationMap lang={lang} />
      </main>

      {/* LUXURIOUS HERITAGE FOOTER */}
      <footer id="heritage-footer" className="bg-[#0b0503] border-t border-amber-950/45 py-16 text-xs sm:text-sm text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone-900/60 pb-12 mb-12 text-left rtl:text-right">
            
            {/* Brand block */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-700 flex items-center justify-center border border-amber-500/20">
                  <span className="font-serif text-amber-50 font-bold">ق</span>
                </div>
                <h3 className="font-serif text-base font-bold text-amber-100 select-all">
                  {lang === 'ar' ? 'القرية النجدية' : 'Najd Village'}
                </h3>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                {lang === 'ar' 
                  ? 'نموذج محكم وموثق لأصالة الأجداد ومعمارهم الطيني الفريد في قلب نجد العذية بالرياض.'
                  : 'An authentic living tribute to the architecture, hospitality, and culinary recipes of central Najd.'}
              </p>

              {/* Social icons */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse pt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-900 hover:bg-amber-950/40 text-stone-400 hover:text-amber-500 flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-900 hover:bg-amber-950/40 text-stone-400 hover:text-amber-500 flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-900 hover:bg-amber-950/40 text-stone-400 hover:text-amber-500 flex items-center justify-center transition-colors">
                  <Compass className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick links block */}
            <div>
              <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">
                {lang === 'ar' ? 'أقسام الموقع' : 'Interactive Sections'}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {['hero', 'menu', 'story', 'reviews', 'booking', 'location'].map((sectionId) => (
                  <li key={sectionId}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className="hover:text-amber-300 transition-colors cursor-pointer capitalize"
                    >
                      {sectionId === 'hero' ? (lang === 'ar' ? 'الرئيسية والترحيب' : 'Home') : 
                       sectionId === 'menu' ? (lang === 'ar' ? 'قائمة الموائد' : 'Digital Menu') :
                       sectionId === 'story' ? (lang === 'ar' ? 'البناء والتراث' : 'Our Legacy') :
                       sectionId === 'reviews' ? (lang === 'ar' ? 'شهادات الضيوف' : 'Guest Reviews') :
                       sectionId === 'booking' ? (lang === 'ar' ? 'حجز مجلس خاص' : 'Cabin Booking') :
                       (lang === 'ar' ? 'فروعنا بالرياض' : 'Our Locations')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact details */}
            <div>
              <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">
                {lang === 'ar' ? 'تواصل معنا' : 'Contact Center'}
              </h4>
              <ul className="space-y-3 text-xs text-stone-500">
                <li className="flex items-center space-x-2 rtl:space-x-reverse select-all">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lang === 'ar' ? 'الرقم الموحد: ٩٢٠٠٣٣٥١١' : 'Unified: 920033511'}</span>
                </li>
                <li className="flex items-center space-x-2 rtl:space-x-reverse select-all">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>info@najdvillage.com</span>
                </li>
                <li className="flex items-center space-x-2 rtl:space-x-reverse">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>{lang === 'ar' ? 'شارع التخصصي، الرياض، السعودية' : 'Takhassusi St, Riyadh, SA'}</span>
                </li>
              </ul>
            </div>

            {/* Verification Google badge info */}
            <div>
              <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">
                {lang === 'ar' ? 'مؤسسة معتمدة' : 'Verified Google Maps Node'}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-3">
                {lang === 'ar' 
                  ? 'تم ربط خرائط هذا الموقع مباشرة بنقاط التحديد الدبوسية لمطعم القرية النجدية بموجب ترخيص المطورين.'
                  : 'Riyadh branches are mapped with geodynamic coordinate targets mapped to Google Maps nodes.'}
              </p>
              <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-[10px] text-amber-500 bg-amber-950/20 px-3 py-1 rounded-md border border-amber-500/10">
                <span>⭐ ★ 4.6 Google Verified</span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
            <span className="select-text">
              © {new Date().getFullYear()} {lang === 'ar' ? 'حقوق الطبع محفوظة لمطعم القرية النجدية.' : 'Najd Village Restaurant. All rights reserved.'}
            </span>
            <span className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <span>{lang === 'ar' ? 'صُنع بحب لأجل التراث والضيافة الأصيلة' : 'Crafted with premium Najdi hospitality'}</span>
              <Heart className="w-3.5 h-3.5 text-red-700 fill-red-700 animate-pulse" />
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
