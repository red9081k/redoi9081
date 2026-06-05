import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ChevronRight, BookOpen } from 'lucide-react';

interface AboutProps {
  lang: 'ar' | 'en';
}

interface HeritageStory {
  id: string;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  longDescAr: string;
  longDescEn: string;
  imageUrl: string;
  badgeAr: string;
  badgeEn: string;
}

export default function About({ lang }: AboutProps) {
  const [selectedStory, setSelectedStory] = useState<HeritageStory | null>(null);

  const heritageStories: HeritageStory[] = [
    {
      id: 'arch',
      titleAr: 'طين الحكايات وجدران الذاكرة',
      titleEn: 'Clay of Tales & Mud Walls',
      shortDescAr: 'تم تشييد القرية النجدية طبق الأصل من البيوت النجدية القديمة باستخدام الطين النقي وسعف النخيل والأبواب الخشبية المنقوشة يدوياً.',
      shortDescEn: 'Najd Village is meticulously engineered as an exact replica of traditional ancient clay homes using local straw, mud, and hand-worked wooden doors.',
      longDescAr: 'القرية النجدية ليست مجرد مطعم؛ بل هي متحف معماري حي يحاكي عهد الآباء في هضبة نجد الأبية. جدرانها الطينية التي يتجاوز سمكها المتر الواحد لا تساعد فقط في مكافحة حرارة شمس الصحراء الحارقة بطريقة طبيعية كما كان يفعل الأجداد، بل تفوح برائحة المطر الغنية بمجرد ملامستها لرذاذ الماء. النوافذ المثلثة الشكل (الكواير) كانت تصمم لتمرير نسيم الليل البارد وتوجيه أشعة الشمس للداخل بحسابات تراثية عبقرية.',
      longDescEn: 'Najd Village is a living architectural museum representing the central Arabian plateau. Its mud walls, which measure over a meter in thickness, provide natural insulation from the harsh desert sun, emitting a rich rain-scented aroma when sprinkled with water. The triangular geometric windows (Al-Kawayir) were traditionally designed to trap cool night breezes and strategically navigate daytime sunlight into the mud-walled chambers.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      badgeAr: 'المعمار التاريخي',
      badgeEn: 'Historical Architecture'
    },
    {
      id: 'majlis',
      titleAr: 'سر الإجتماع ودواوين الضيافة',
      titleEn: 'Tradition of the Arabian Majlis',
      shortDescAr: 'جلسات أرضية مريحة تعكس كرم الضيافة العربية، حيث تجتمع العائلة والأصدقاء حول موائد الكرم في خصوصية تامة.',
      shortDescEn: 'Comfortable floor-cushioned assemblies reflecting authentic Arab hospitality, designed for families and friends to bond in total privacy.',
      longDescAr: 'ثقافة المجلس عند أهل نجد هي جوهر الدفء الإنساني والترابط الأسري. تم توفير غرف ومجالس تراثية خاصة ومستقلة، مغطاة بالسجاد الأحمر اليدوي الفاخر والمساند العربية الوثيرة (المثالع). في هذه المجالس، تم استبعاد الحواجز الباردة واستبدالها بحميمية التشارك في صحاف الطعام الخشبية الكبيرة (المرايح) التي تدعم فلسفة المشاركة والمحبة الحقيقية بين أفراد العائلة أو الأصدقاء.',
      longDescEn: 'The traditional "Majlis" culture is central to Najd hospitality. Our private rooms feature carpets, handwoven draperies, and authentic floor cushions (Al-Mathale). Guests gather around massive shared wooden platters (Al-Marayeh), reflecting the generous nomadic philosophy where food is shared and friendships are consolidated over common feasts, preserving tribal customs.',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800',
      badgeAr: 'ثقافة المجلس',
      badgeEn: 'Majlis Culture'
    },
    {
      id: 'coffee',
      titleAr: 'دلة الهيل وفنجال الكرامة',
      titleEn: 'The Saffron & Cardamom Brew',
      shortDescAr: 'رحلة تحميص البن الشقراء، والصب بيمين الخبراء من دلال ضخمة تمتزج بالهيل والزعفران الياقوتي الأصيل.',
      shortDescEn: 'The ritual of roasting light blonde coffee beans, spiced with royal cardamom and pure saffron, poured with ultimate etiquette.',
      longDescAr: 'تبدأ تجربة ضيوفنا دائماً برائحة اللبان النفاذة وصوت دق النجر النحاسي (المهباش) الذي يعلن ترحيبنا بالضيوف. نقدم قهوتنا السعودية الشقراء المستوحاة من أجود حبات البن العربي العضوي الخفيف المحمص بدقة. يمتزج هذا البن الشقراء بمقادير ذهبية ومدروسة جيداً من الهيل الطازج والزعفران الإيراني الأصلي المقطوف بعناية، وتُسكب من دلاَّت نحاسية ثقيلة نجدية ترمز للعزة والكرم، لتُروى بها لهفة الضيف وتعلن بدء وليمة لا تُنسى.',
      longDescEn: 'The guest journey starts with aromatic frankincense (Oud) and the rhythmic golden clangs of the brass mortar (Al-Mehbash) signaling warm welcome. Our Saudi coffee is brewed using lightly roasted, premium organic Arabica beans. This blonde brew is spiced with precise golden measures of fresh-crushed cardamom and premium saffron, poured elegantly from heavy traditional brass pitchers (Dallah) to ignite ancient celebration.',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800',
      badgeAr: 'القهوة السعودية',
      badgeEn: 'Saudi Coffee Ceremony'
    }
  ];

  return (
    <section id="story" className="py-24 bg-[#0d0705] relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 bg-amber-950/40 border border-amber-900/30 rounded-full text-xs text-amber-500 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'رحلة تاريخية حية' : 'A Living Legacy'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            {lang === 'ar' ? 'فلسفة المكان وبناء الإنسان' : 'Our Story & Architecture'}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded" />
        </div>

        {/* Story Bento-style Grid Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {heritageStories.map((story) => (
            <motion.div
              key={story.id}
              id={`story-card-${story.id}`}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-end min-h-[420px] rounded-2.5xl overflow-hidden border border-amber-950/30 hover:border-amber-500/30 shadow-2xl transition-all duration-300"
            >
              {/* Photo backdrop */}
              <div className="absolute inset-0 z-0">
                <img
                  src={story.imageUrl}
                  alt={story.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0705] via-[#0e0705]/85 to-transparent" />
              </div>

              {/* Text components */}
              <div className="relative z-10 p-8 text-left rtl:text-right">
                <span className="inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/20 rounded-md mb-3.5">
                  {lang === 'ar' ? story.badgeAr : story.badgeEn}
                </span>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 mb-3 leading-tight group-hover:text-amber-400 transition-colors">
                  {lang === 'ar' ? story.titleAr : story.titleEn}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {lang === 'ar' ? story.shortDescAr : story.shortDescEn}
                </p>

                <button
                  id={`read-story-btn-${story.id}`}
                  onClick={() => setSelectedStory(story)}
                  className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-bold uppercase tracking-wider text-amber-500 group-hover:text-amber-300 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'اقرأ قصة التراث كاملة' : 'Read Full History'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* DETAILED HISTORY POPUP MODAL */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm">
            <motion.div
              id="story-details-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#140e0a] border border-amber-500/20 rounded-2.5xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col text-amber-50"
            >
              <div className="h-48 sm:h-64 relative">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.titleEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] to-transparent" />
                
                {/* Close Button overlay */}
                <button
                  id="close-story-modal-btn"
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-950/60 hover:bg-stone-950 text-stone-300 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex-grow text-left rtl:text-right">
                <span className="text-xs font-bold text-amber-400 font-mono tracking-widest uppercase mb-2 block">
                  {lang === 'ar' ? selectedStory.badgeAr : selectedStory.badgeEn}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mb-4 leading-tight">
                  {lang === 'ar' ? selectedStory.titleAr : selectedStory.titleEn}
                </h3>

                <div className="w-12 h-1 bg-amber-600 rounded mb-6" />

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {lang === 'ar' ? selectedStory.longDescAr : selectedStory.longDescEn}
                </p>
              </div>

              <div className="p-6 bg-stone-900/10 border-t border-amber-950/30 flex justify-end">
                <button
                  id="close-story-bottom-btn"
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-2.5 rounded-xl bg-amber-950/30 hover:bg-amber-950/60 border border-amber-900/30 text-amber-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إغلاق التفاصيل' : 'Close History'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
