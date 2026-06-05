import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GOOGLE_REVIEWS } from '../data/restaurantData';
import { Review } from '../types';
import { Star, MessageSquarePlus, Clock, Sparkles, AlertCircle, Heart } from 'lucide-react';

interface ReviewsProps {
  lang: 'ar' | 'en';
}

export default function Reviews({ lang }: ReviewsProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(GOOGLE_REVIEWS);
  const [showForm, setShowForm] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [formError, setFormError] = useState('');
  const [likedReviews, setLikedReviews] = useState<string[]>([]);

  const handleLike = (id: string) => {
    if (likedReviews.includes(id)) {
      setLikedReviews(likedReviews.filter(rId => rId !== id));
    } else {
      setLikedReviews([...likedReviews, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError(lang === 'ar' ? 'الرجاء إدخال اسمك الكريم.' : 'Please enter your polite name.');
      return;
    }
    if (!text.trim() || text.length < 10) {
      setFormError(lang === 'ar' ? 'الرجاء كتابة تعليق لا يقل عن ١٠ أحرف ليكون مفيداً.' : 'Please write a review of at least 10 characters.');
      return;
    }

    const newReview: Review = {
      id: `custom-${Date.now()}`,
      authorName: name,
      rating: rating,
      relativeTime: lang === 'ar' ? 'الآن (فقط الآن)' : 'Just Now (Verified)',
      text: text,
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?q=80&w=150`,
      helpfulCount: 0
    };

    setReviewsList([newReview, ...reviewsList]);
    
    // Clear Form & Close
    setName('');
    setRating(5);
    setText('');
    setShowForm(false);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0a0503] relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 bg-amber-950/40 border border-amber-900/30 rounded-full text-xs text-amber-500 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'شهادات نعتز بها' : 'Honored Guest Reviews'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-4 animate-fade-in">
            {lang === 'ar' ? 'أقوال ضيوف القرية' : 'What Our Guests Say'}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded" />
        </div>

        {/* Reviews Overview Widget and Form Trigger */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
          
          {/* Rating Snapshot card */}
          <div className="bg-[#110a07] border border-amber-950/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
            <span className="text-sm font-semibold tracking-wide text-stone-400 mb-1">
              {lang === 'ar' ? 'التقييم الكلي على قوقل ماب' : 'Google Maps Rating Index'}
            </span>
            <span className="text-6xl font-extrabold font-serif text-amber-400 mb-3 block">4.6</span>
            <div className="flex items-center text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-xs text-stone-500 block mb-6">
              {lang === 'ar' ? 'بناءً على ١٢,٤٧١ تقييم رسمي' : 'Based on 12,471 guest reviews'}
            </span>

            {/* Rating breakdown */}
            <div className="w-full space-y-2 mb-6 text-xs text-stone-400 text-left rtl:text-right">
              {[
                { star: 5, pct: '82%' },
                { star: 4, pct: '11%' },
                { star: 3, pct: '4%' },
                { star: 2, pct: '2%' },
                { star: 1, pct: '1%' },
              ].map((row) => (
                <div key={row.star} className="flex items-center gap-3">
                  <span className="w-3 font-semibold">{row.star}</span>
                  <div className="flex-grow h-2 bg-stone-900 rounded overflow-hidden">
                    <div className="h-full bg-amber-500 rounded" style={{ width: row.pct }} />
                  </div>
                  <span className="w-8 font-mono text-right rtl:text-left">{row.pct}</span>
                </div>
              ))}
            </div>

            <button
              id="write-review-trigger"
              onClick={() => setShowForm(!showForm)}
              className="w-full py-4 tracking-wider uppercase font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-700 text-amber-950 hover:bg-amber-400 hover:text-amber-950 rounded-xl flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'أضف رأيك وتجربتك الخاصه' : 'Write Guest Review'}</span>
            </button>
          </div>

          {/* Dynamic Reviews Feed List */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Real-time Guest Review form toggle */}
            <AnimatePresence>
              {showForm && (
                <motion.form
                  id="write-review-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit}
                  className="bg-[#150f0c] border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden"
                >
                  <h3 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
                    <MessageSquarePlus className="w-5 h-5 text-amber-500" />
                    {lang === 'ar' ? 'تسجيل شهادة ضيف' : 'Record Guest Review'}
                  </h3>

                  {formError && (
                    <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        {lang === 'ar' ? 'الاسم الكريم' : 'Your Distinguished Name'}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your name'}
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        {lang === 'ar' ? 'التقييم بالنجوم' : 'In-class Rating'}
                      </label>
                      <div className="flex items-center space-x-1.5 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            id={`star-btn-${star}`}
                            type="button"
                            onClick={() => setRating(star)}
                            className="text-stone-700 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star 
                              className={`w-6 h-6 stroke-none ${
                                star <= rating 
                                  ? 'fill-amber-400' 
                                  : 'fill-stone-800 hover:fill-stone-600'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                      {lang === 'ar' ? 'تفاصيل تجربتك' : 'Details of your Culinary Journey'}
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={3}
                      placeholder={lang === 'ar' ? 'كيف كانت تجربتك لمذاق الأكل النجدي العريق وجودة الخدمة؟' : 'Describe the atmosphere, recipes, and camel meat tenderness...'}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-2">
                    <button
                      id="cancel-review-btn"
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormError('');
                      }}
                      className="px-5 py-2.5 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-semibold uppercase cursor-pointer"
                    >
                      {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      id="submit-review-btn"
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-700 text-amber-950 font-bold rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-colors"
                    >
                      {lang === 'ar' ? 'نشر التعليق فوراً' : 'Publish Guest Review'}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Display list of reviews */}
            <motion.div layout className="space-y-4">
              <AnimatePresence initial={false}>
                {reviewsList.map((review) => {
                  const isLiked = likedReviews.includes(review.id);
                  return (
                    <motion.div
                      key={review.id}
                      id={`review-item-${review.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="p-6 bg-[#110a07] border border-amber-950/15 rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        {/* Review top metadata */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-950 bg-stone-900 flex-shrink-0">
                              <img
                                src={review.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'}
                                alt={review.authorName}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-amber-50">
                                {review.authorName}
                              </h4>
                              <div className="flex items-center space-x-1.5 rtl:space-x-reverse mt-0.5">
                                <span className="flex text-amber-400">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                                  ))}
                                  {[...Array(5 - review.rating)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-stone-800 stroke-stone-800" />
                                  ))}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 rtl:space-x-reverse text-stone-500 text-xs">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{review.relativeTime}</span>
                          </div>
                        </div>

                        {/* Text comment body */}
                        <p className="text-stone-300 text-sm leading-relaxed mb-4 text-left rtl:text-right font-sans">
                          {review.text}
                        </p>
                      </div>

                      {/* Helpful counters and like element */}
                      <div className="flex items-center justify-between border-t border-stone-900/40 pt-4 mt-2">
                        <span className="text-xs text-stone-500 font-medium">
                          ✓ {lang === 'ar' ? 'تعليق معتمد وموثوق' : 'Verified Google Maps Resident'}
                        </span>

                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          {/* Helpful count */}
                          <button
                            id={`like-review-btn-${review.id}`}
                            onClick={() => handleLike(review.id)}
                            className={`flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-semibold transition-colors cursor-pointer ${
                              isLiked ? 'text-red-400' : 'text-stone-500 hover:text-red-300'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
                            <span>
                              {lang === 'ar' ? 'مفيد' : 'Helpful'} (
                              {(review.helpfulCount || 0) + (isLiked ? 1 : 0)}
                              )
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
