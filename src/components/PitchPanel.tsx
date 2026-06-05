/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Settings2, 
  Palette, 
  Globe, 
  Sliders, 
  HelpCircle, 
  CheckCircle2, 
  Plus, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Briefcase, 
  Eye, 
  EyeOff, 
  ChefHat, 
  Pizza, 
  Coffee, 
  UtensilsCrossed 
} from 'lucide-react';
import { ThemeColor, themes, translationDict } from '../types';

interface PitchPanelProps {
  customName: string;
  setCustomName: (name: string) => void;
  customPhone: string;
  setCustomPhone: (phone: string) => void;
  customAddress: string;
  setCustomAddress: (address: string) => void;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  logoPreset: 'chef' | 'pizza' | 'coffee' | 'utensils';
  setLogoPreset: (logo: 'chef' | 'pizza' | 'coffee' | 'utensils') => void;
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

export default function PitchPanel({
  customName,
  setCustomName,
  customPhone,
  setCustomPhone,
  customAddress,
  setCustomAddress,
  themeColor,
  setThemeColor,
  currency,
  setCurrency,
  logoPreset,
  setLogoPreset,
  language,
  setLanguage,
}: PitchPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'settings' | 'coach'>('settings');

  const dict = translationDict[language];

  const themeColors: { id: ThemeColor; labelAr: string; labelEn: string; hex: string }[] = [
    { id: 'amber', labelAr: 'عسلي دافئ', labelEn: 'Warm Amber', hex: '#d97706' },
    { id: 'crimson', labelAr: 'أحمر قرمزي', labelEn: 'Crimson Red', hex: '#e11d48' },
    { id: 'emerald', labelAr: 'أخضر عضوي', labelEn: 'Emerald Mint', hex: '#059669' },
    { id: 'ocean', labelAr: 'أزرق عصري', labelEn: 'Ocean Slate', hex: '#0891b2' },
    { id: 'charcoal', labelAr: 'رمادي فخم', labelEn: 'Sleek Charcoal', hex: '#27272a' },
  ];

  const logoPresets = [
    { id: 'chef', icon: ChefHat, labelAr: 'قبعة شيف', labelEn: 'Chef Hat' },
    { id: 'pizza', icon: Pizza, labelAr: 'بيتزا', labelEn: 'Pizza Special' },
    { id: 'coffee', icon: Coffee, labelAr: 'مقهى', labelEn: 'Cafe/Latte' },
    { id: 'utensils', icon: UtensilsCrossed, labelAr: 'شوك وطبق', labelEn: 'Fine Dining' },
  ];

  return (
    <div 
      className={`fixed top-4 top-20 z-50 transition-all duration-300 ease-in-out ${
        isOpen 
          ? language === 'ar' ? 'left-4' : 'right-4'
          : language === 'ar' ? '-left-80' : '-right-80'
      }`}
      style={{ direction: 'ltr' }} // Always left-to-right for input controls predictability
    >
      {/* Container Card */}
      <div className="relative w-80 bg-white shadow-2xl rounded-2xl border border-zinc-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Toggle tab floating off side */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-l-xl shadow-lg cursor-pointer ${
            language === 'ar' 
              ? '-right-10 rounded-l-none rounded-r-xl' 
              : '-left-10'
          }`}
          title="Toggle Presentation Console"
          id="pitch-panel-toggle-btn"
        >
          {isOpen ? (
            language === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Settings2 className="animate-spin-slow" size={20} />
              <span className="text-[9px] font-bold uppercase tracking-wider">LIVE</span>
            </div>
          )}
        </button>

        {/* Header */}
        <div className="p-4 bg-zinc-900 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-400 animate-pulse" size={18} />
              <h2 className="text-sm font-bold tracking-tight">
                {language === 'ar' ? 'العارض التفاعلي للعملاء' : 'Gourmet Agent Pitch Console'}
              </h2>
            </div>
            <span className="bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full text-white animate-bounce">
              OFFLINE
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">
            {language === 'ar' 
              ? 'عدل هوية التطبيق فوراً أثناء اجتماعك مع صاحب المطعم لحسم الصفقة!'
              : 'Modify live website details on screen to win core restaurant contracts!'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-100 bg-zinc-50 text-xs">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 text-center font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'settings' 
                ? 'border-indigo-600 text-indigo-600 bg-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {language === 'ar' ? '⚙️ إعدادات الموقع' : '⚙️ Custom Brand'}
          </button>
          <button
            onClick={() => setActiveTab('coach')}
            className={`flex-1 py-2 text-center font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'coach' 
                ? 'border-indigo-600 text-indigo-600 bg-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {language === 'ar' ? '💡 نصائح الإقناع' : '💡 Sales Pitch Coach'}
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
          {activeTab === 'settings' ? (
            <>
              {/* Language Switcher */}
              <div>
                <label className="text-xs font-semibold text-zinc-600 block mb-1.5 flex items-center justify-between">
                  <span>Language / لغة القالب</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.1 rounded">Real-time</span>
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`py-1 rounded-md font-medium text-center border cursor-pointer ${
                      language === 'ar' 
                        ? 'bg-zinc-800 text-white border-zinc-800 shadow-sm' 
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    العربية (RTL)
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`py-1 rounded-md font-medium text-center border cursor-pointer ${
                      language === 'en' 
                        ? 'bg-zinc-800 text-white border-zinc-800 shadow-sm' 
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    English (LTR)
                  </button>
                </div>
              </div>

              {/* Restaurant Name */}
              <div>
                <label className="text-xs font-semibold text-zinc-600 block mb-1">
                  {language === 'ar' ? 'اسم المطعم (البراند بالتصميم)' : 'Prospect Restaurant Name'}
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder={language === 'ar' ? 'مثال: شاورما سيتي، بيت الكبسة' : 'e.g., Shawarmacity, Pizza Parlor'}
                />
              </div>

              {/* Preset Theme Colors */}
              <div>
                <label className="text-xs font-semibold text-zinc-600 block mb-1.5">
                  {language === 'ar' ? 'قالب ألوان الهوية البصرية' : 'Instant Color Palette Preset'}
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {themeColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setThemeColor(color.id)}
                      className={`h-7 w-full rounded flex items-center justify-center transition-transform hover:scale-105 cursor-pointer relative ${
                        themeColor === color.id 
                          ? 'ring-2 ring-indigo-500 ring-offset-1 scale-105' 
                          : 'opacity-80'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={language === 'ar' ? color.labelAr : color.labelEn}
                    >
                      {themeColor === color.id && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo icon */}
              <div>
                <label className="text-xs font-semibold text-zinc-600 block mb-1.5">
                  {language === 'ar' ? 'أيقونة الشعار المرفق' : 'Niche Logo Icon'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {logoPresets.map((preset) => {
                    const IconComponent = preset.icon;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setLogoPreset(preset.id as any)}
                        className={`p-2 border rounded-md flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                          logoPreset === preset.id
                            ? 'bg-zinc-900 border-zinc-900 text-white'
                            : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                        }`}
                        title={language === 'ar' ? preset.labelAr : preset.labelEn}
                      >
                        <IconComponent size={16} />
                        <span className="text-[8px] font-bold">
                          {language === 'ar' ? preset.labelAr.split(' ')[0] : preset.labelEn.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Currency Selector */}
              <div>
                <label className="text-xs font-semibold text-zinc-600 block mb-1">
                  {language === 'ar' ? 'الرمز والعملة المالية' : 'Display Currency'}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['ر.س', 'د.إ', '$', '€'].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`py-1 border rounded-md text-xs font-semibold text-center cursor-pointer ${
                        currency === curr 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                          : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-xs font-semibold text-zinc-600 block mb-1">
                  {language === 'ar' ? 'عنوان موقع المطعم الجغرافي' : 'Restaurant Custom Address'}
                </label>
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder={language === 'ar' ? 'مثال: الرياض، الشارع العام بمقابل...' : 'e.g., King Road, Riyadh'}
                />
              </div>

              {/* Quick Preset Generator */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <div className="flex items-center gap-1">
                  <span className="text-xs">⚡</span>
                  <span className="text-xs font-bold text-amber-900">
                    {language === 'ar' ? 'زر المبيعات السريعة' : 'Instant Pitch Preset'}
                  </span>
                </div>
                <p className="text-[10px] text-amber-800 mt-1 leading-relaxed">
                  {language === 'ar' 
                    ? 'بنقرة واحدة يمكنك مطابقة المطعم المستهدف لتحويل الجلسة إلى فرصة حقيقية!' 
                    : 'Configure live on-device options quickly. Double-click to type any values.'}
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-3.5 text-xs text-zinc-700">
              <div className="font-bold text-zinc-900 border-b pb-1">
                {language === 'ar' ? 'خطتك لحسم صفقة تطوير الموقع:' : 'How to Sell a Website using this Demo:'}
              </div>

              <div className="space-y-2.5 leading-relaxed">
                <div>
                  <p className="font-bold text-indigo-700 flex items-center gap-1">
                    <span className="text-sm">🗣️</span> {language === 'ar' ? 'الخطوة الأولى: أثبت السهولة والسرعة' : '1. Show, Don\'t Tell'}
                  </p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    {language === 'ar' 
                      ? 'دع صاحب المطعم يضيف وجبة دبل ديلوكس ويخصص المخللات والثومية. عندما تظهر السعر المناسب كأنها سلة حقيقية هكذا ستظهر لزبائنهم!'
                      : 'Load this app and let the owner add items. Adjust customized ingredients like pickles, cheese, or sauce to demo custom upsells.'}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-indigo-700 flex items-center gap-1">
                    <span className="text-sm">📴</span> {language === 'ar' ? 'الخطوة الثانية: ميزة العمل أوفلاين 100%' : '2. Highlight Offline Velocity'}
                  </p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    {language === 'ar' 
                      ? 'أظهر لهم كيف يمكنك استعراض الموقع بالكامل أوفلاين في أي وقت بدون انتظار تحميل الإنترنت البطيء. هذا يؤكد سلاسة وأمان البرمجة!'
                      : 'Tell them: "Our website is so finely optimized that it can run directly even if the network fails." Extreme SEO advantages.'}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-indigo-700 flex items-center gap-1">
                    <span className="text-sm">📊</span> {language === 'ar' ? 'الخطوة الثالثة: سحر نظام البورتال' : '3. Flip to Admin Panel View'}
                  </p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    {language === 'ar' 
                      ? 'احجز طاولة أو أرسل طلباً، ثم افتح نظام "إدارة المطعم الخلفي" (الزر العائم بالأسفل). اجعلهم يشاهدون الإيرادات ترتفع وحجوزاتهم تترتب تلقائياً!'
                      : 'Perform a mockup booking or place an order, then activate the "Backend Portal" below. They will immediately realize the power of managing their own database.'}
                  </p>
                </div>

                <div className="bg-indigo-50 text-indigo-900 p-2.5 rounded-lg border border-indigo-100">
                  <p className="font-bold">{language === 'ar' ? '💡 مقترح التسعير الفائز:' : '💡 Pro Tip on Pricing:'}</p>
                  <p className="text-[10px] mt-1 leading-relaxed">
                    {language === 'ar'
                      ? 'اخبرهم أن تطبيقات التوصيل تأخذ 20% عمولة على كل طلب. بينما هذا الموقع الخاص بهم ملكٌ لهم بدون أي عمولات تماماً لزيادة أرباحهم الصافية!'
                      : 'Explain that aggregators take huge percentages, whilst having their own direct-order localized QR site keeps 100% of profits inside the business.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info copy */}
        <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-[10px] text-zinc-500 text-center font-mono">
          © Gourmet Agent Offline Kit v1.4
        </div>
      </div>
    </div>
  );
}
