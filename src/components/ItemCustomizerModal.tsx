/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Plus, Minus, Flame, Sparkles, Clock, Compass } from 'lucide-react';
import { MenuItem, translationDict } from '../types';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, exclusions: string[], notes: string) => void;
  language: 'ar' | 'en';
  currency: string;
}

export default function ItemCustomizerModal({
  item,
  onClose,
  onAddToCart,
  language,
  currency,
}: ItemCustomizerModalProps) {
  const [qty, setQty] = useState(1);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [note, setNote] = useState('');

  // Reset local state when item changes
  useEffect(() => {
    if (item) {
      setQty(1);
      setRemovedIngredients([]);
      setNote('');
    }
  }, [item]);

  if (!item) return null;

  const dict = translationDict[language];

  const handleToggleExclude = (ingName: string) => {
    if (removedIngredients.includes(ingName)) {
      setRemovedIngredients(removedIngredients.filter(n => n !== ingName));
    } else {
      setRemovedIngredients([...removedIngredients, ingName]);
    }
  };

  const handleAdd = () => {
    onAddToCart(item, qty, removedIngredients, note);
  };

  const isRtl = language === 'ar';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-fade-in">
      {/* Drawer Card */}
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-zinc-100 overflow-hidden text-zinc-900 animate-slide-up flex flex-col max-h-[90vh]"
        style={{ direction: isRtl ? 'rtl' : 'ltr' }}
      >
        {/* Header */}
        <div className="relative p-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider font-extrabold uppercase px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-800">
              {dict.customizing}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 mt-1">
              {language === 'ar' ? item.nameAr : item.nameEn}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-200/60 text-zinc-700 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Center Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Aesthetic Food Visual Backdrop */}
          <div className="bg-zinc-950 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] text-white select-none">
            {/* Ambient Background Circles */}
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-900 opacity-90"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>

            {/* Simulated Clean Plate Visual using Pure SVGs */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-xl border border-zinc-700 flex items-center justify-center transform hover:rotate-12 transition-transform duration-500">
              <div className="w-18 h-18 rounded-full border border-dashed border-zinc-600 flex items-center justify-center">
                {item.visualSvg === 'burger' && (
                  <span className="text-4xl filter drop-shadow">🍔</span>
                )}
                {item.visualSvg === 'pizza' && (
                  <span className="text-4xl filter drop-shadow">🍕</span>
                )}
                {item.visualSvg === 'shawarma' && (
                  <span className="text-4xl filter drop-shadow">🌯</span>
                )}
                {item.visualSvg === 'salad' && (
                  <span className="text-4xl filter drop-shadow">🥗</span>
                )}
                {item.visualSvg === 'fries' && (
                  <span className="text-4xl filter drop-shadow">🍟</span>
                )}
                {item.visualSvg === 'cake' && (
                  <span className="text-4xl filter drop-shadow">🍰</span>
                )}
                {item.visualSvg === 'cookie' && (
                  <span className="text-4xl filter drop-shadow">🍪</span>
                )}
                {item.visualSvg === 'drink' && (
                  <span className="text-4xl filter drop-shadow">🍹</span>
                )}
                {item.visualSvg === 'coffee' && (
                  <span className="text-4xl filter drop-shadow">☕</span>
                )}
              </div>
            </div>

            <div className="relative z-10 mt-3 flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                <Clock size={11} className="text-zinc-500" />
                {item.prepTime} {dict.mins}
              </span>
              <span className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                <Flame size={12} className="text-amber-500" />
                {item.spicyLevel === 0 && dict.spicy0}
                {item.spicyLevel === 1 && dict.spicy1}
                {item.spicyLevel === 2 && dict.spicy2}
                {item.spicyLevel === 3 && dict.spicy3}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="font-bold text-zinc-950">{language === 'ar' ? 'الوصف الفخم' : 'Signature Description'}</h4>
            <p className="text-zinc-600 leading-relaxed text-xs">
              {language === 'ar' ? item.descAr : item.descEn}
            </p>
          </div>

          {/* Ingredients Toggles */}
          {item.ingredients.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-zinc-950">{dict.customOptions}</h4>
                <span className="text-[10px] text-zinc-400">{language === 'ar' ? 'انقر لإلغاء أي مكون' : 'Click to opt-out of ingredients'}</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.ingredients.map((ing, idx) => {
                  const ingName = language === 'ar' ? ing.nameAr : ing.nameEn;
                  const isExcluded = removedIngredients.includes(ingName);
                  return (
                    <button
                      key={idx}
                      onClick={() => ing.removable && handleToggleExclude(ingName)}
                      disabled={!ing.removable}
                      className={`w-full p-3 rounded-xl border text-right text-xs transition-all flex items-center justify-between cursor-pointer ${
                        !ing.removable 
                          ? 'bg-zinc-50 border-zinc-100 text-zinc-400 cursor-not-allowed'
                          : isExcluded
                            ? 'bg-rose-50 border-rose-200 text-rose-800 opacity-90 line-through'
                            : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-800'
                      }`}
                      style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                          isExcluded 
                            ? 'bg-rose-600 border-rose-600 text-white' 
                            : 'border-zinc-300 bg-zinc-50 text-indigo-600'
                        }`}>
                          {!isExcluded && <Check size={10} />}
                        </span>
                        <span className="font-medium">{ingName}</span>
                      </div>
                      
                      <span className="text-[10px] opacity-75">
                        {!ing.removable 
                          ? (language === 'ar' ? 'أساسي' : 'Essential') 
                          : isExcluded 
                            ? (language === 'ar' ? 'مستبعد 🔴' : 'Opted Out 🔴') 
                            : (language === 'ar' ? 'مرفق ✓' : 'Included ✓')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special notes */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-zinc-900">{dict.extraNotes}</h4>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full text-xs p-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400 text-zinc-900"
              placeholder={language === 'ar' ? 'مثال: بدون بصل، ثوم قليل جداً...' : 'e.g., No sauce, extra toasted, etc...'}
            />
          </div>
        </div>

        {/* Footer actions & pricing builder */}
        <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-1 bg-zinc-200/80 p-1.5 rounded-xl">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-7 h-7 bg-white hover:bg-zinc-100 text-zinc-800 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center font-bold text-sm text-zinc-900">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-7 h-7 bg-white hover:bg-zinc-100 text-zinc-800 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Grand total price & Add to cart button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-xs flex items-center justify-between transition-transform active:scale-95 shadow-lg group cursor-pointer"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <div className="flex items-center gap-1.5">
              <ShoppingBag size={15} className="group-hover:animate-bounce" />
              <span>{dict.saveSelection}</span>
            </div>
            <span className="font-extrabold text-sm ml-2">
              {item.price * qty} {currency}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
