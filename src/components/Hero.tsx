import { motion } from 'motion/react';
import { Star, MapPin, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface HeroProps {
  lang: 'ar' | 'en';
  scrollToSection: (id: string) => void;
}

export default function Hero({ lang, scrollToSection }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0705] pt-16"
    >
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600"
          alt="Najd Village Ambiance"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 select-none"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to blend into dark, heritage theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0705] via-[#0d0705]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0705]/90 via-transparent to-[#0d0705]/90" />
      </div>

      {/* Ambient fire glow animations built with Tailwind blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/15 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-amber-50">
        
        {/* Google Maps Authenticity Badge */}
        <motion.div
          id="hero-gmaps-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full border border-amber-500/20 bg-amber-950/40 backdrop-blur-md mb-8 text-xs sm:text-sm shadow-md"
        >
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            ))}
          </div>
          <span className="h-4 w-px bg-amber-500/20" />
          <span className="font-medium text-stone-200">
            {lang === 'ar' 
              ? '★ 4.6 على قوقل ماب (أكثر من ١٢,٠٠٠ تقييم)' 
              : '★ 4.6 on Google Maps (12,000+ Reviews)'}
          </span>
        </motion.div>

        {/* Big Cultural Headline */}
        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif tracking-tight leading-tight mb-6"
        >
          {lang === 'ar' ? (
            <>
              عش أصالة <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">الضيافة النجدية</span> العتيقة
            </>
          ) : (
            <>
              Experience Ancient <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">Najdi Hospitality</span>
            </>
          )}
        </motion.h1>

        {/* Heritage Sub-description */}
        <motion.p
          id="hero-subtext"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-stone-300 leading-relaxed font-sans mb-10"
        >
          {lang === 'ar' 
            ? 'بين جدران الطين العبقة ودهاليز التراث الساحرة، نرحب بكم لتجربة أطباق الآباء والأجداد المحضرة بكل فخر وعناية في قلب الرياض.'
            : 'Within aromatic mud walls and majestic heritage corridors, we welcome you to enjoy authentic ancestors’ recipes crafted with ultimate pride and legacy in the heart of Riyadh.'}
        </motion.p>

        {/* CTAs */}
        <motion.div
          id="hero-ctas"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            id="hero-book-btn"
            onClick={() => scrollToSection('booking')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold tracking-wide shadow-xl shadow-amber-950/70 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <span>{lang === 'ar' ? 'حجز جلسة تراثية مجلساً' : 'Reserve Traditional Sitting'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          <button
            id="hero-menu-btn"
            onClick={() => scrollToSection('menu')}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-amber-500/30 hover:border-amber-400 bg-amber-950/15 hover:bg-amber-950/45 text-amber-300 hover:text-amber-100 font-bold transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{lang === 'ar' ? 'استكشف قائمة الطعام' : 'Explore Digital Menu'}</span>
          </button>
        </motion.div>

        {/* Mini stats tracker */}
        <motion.div
          id="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-stone-800/40 pt-8"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-amber-500 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wider font-mono">3 Branches</span>
            </div>
            <span className="text-xs text-stone-400">{lang === 'ar' ? 'فروع نشطة بالرياض' : 'Active Riyadh Branches'}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-amber-500 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wider font-mono">11 AM - 1 AM</span>
            </div>
            <span className="text-xs text-stone-400">{lang === 'ar' ? 'مفتوح طيلة اليوم' : 'Open Daily'}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-amber-500 mb-1">
              <Star className="w-4 h-4 fill-amber-500/20" />
              <span className="text-sm font-semibold tracking-wider font-mono">4.6 Rated</span>
            </div>
            <span className="text-xs text-stone-400">{lang === 'ar' ? 'التقييم العام للضيوف' : 'Guest Average Rating'}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold tracking-wider text-amber-500 mb-1 font-mono">100% Halal</span>
            <span className="text-xs text-stone-400">{lang === 'ar' ? 'مكونات محلية طازجة' : 'Fresh Local Sourcing'}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
