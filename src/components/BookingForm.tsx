import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RIYADH_BRANCHES } from '../data/restaurantData';
import { ReservationParams } from '../types';
import { Calendar, Users, Coffee, Gift, Copy, Check, Download, AlertCircle, RefreshCw, Trophy } from 'lucide-react';

interface BookingFormProps {
  lang: 'ar' | 'en';
}

export default function BookingForm({ lang }: BookingFormProps) {
  // Booking list stored in session / local state
  const [activeReservation, setActiveReservation] = useState<ReservationParams | null>(() => {
    const saved = localStorage.getItem('najd_village_active_reservation');
    return saved ? JSON.parse(saved) : null;
  });

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('13:00');
  const [guestCount, setGuestCount] = useState(4);
  const [seatingType, setSeatingType] = useState<'vip' | 'family' | 'open'>('vip');
  const [branchId, setBranchId] = useState('takhassusi');
  const [specialRequests, setSpecialRequests] = useState('');

  const [formError, setFormError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (activeReservation) {
      localStorage.setItem('najd_village_active_reservation', JSON.stringify(activeReservation));
    } else {
      localStorage.removeItem('najd_village_active_reservation');
    }
  }, [activeReservation]);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !phone.trim() || !email.trim() || !date) {
      setFormError(lang === 'ar' ? 'الرجاء ملء جميع الحقول الإلزامية لتفعيل الحجز.' : 'Please fill all required inputs for confirmation.');
      return;
    }

    const uniqueId = `NV-${Math.floor(1000 + Math.random() * 9000)}-${seatingType.toUpperCase()}`;

    const reservation: ReservationParams = {
      id: uniqueId,
      name,
      phone,
      email,
      date,
      timeSlot,
      guestCount,
      seatingType,
      branchId,
      specialRequests
    };

    setActiveReservation(reservation);
  };

  const handleCancelReservation = () => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من إلغاء هذا المجلس التراثي الخاص بك؟' : 'Are you sure you want to cancel your heritage cabin booking?')) {
      setActiveReservation(null);
    }
  };

  const copyCode = () => {
    if (!activeReservation?.id) return;
    navigator.clipboard.writeText(activeReservation.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Generate a virtual calendar download (.ics format)
  const downloadICSFile = () => {
    if (!activeReservation) return;
    const branch = RIYADH_BRANCHES.find(b => b.id === activeReservation.branchId);
    const branchName = branch ? (lang === 'ar' ? branch.nameAr : branch.nameEn) : 'Najd Village';

    const cleanDate = activeReservation.date.replace(/-/g, '');
    const startTime = activeReservation.timeSlot.replace(':', '') + '00';
    
    // Simple ics string content
    const icsContent = 
      "BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "BEGIN:VEVENT\n" +
      `SUMMARY:Najd Village Feast Booking - ${activeReservation.id}\n` +
      `DESCRIPTION:Join us for an authentic heritage dinner. Seating: ${activeReservation.seatingType.toUpperCase()} table for ${activeReservation.guestCount} guests.\n` +
      `LOCATION:${branch?.addressEn || 'Riyadh, Saudi Arabia'}\n` +
      `DTSTART:${cleanDate}T${startTime}\n` +
      `DTEND:${cleanDate}T${parseInt(startTime) + 20000}\n` + // assumes ~2 hours
      "END:VEVENT\n" +
      "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `najd_village_booking_${activeReservation.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedBranchData = RIYADH_BRANCHES.find(b => b.id === branchId);

  return (
    <section id="booking" className="py-24 bg-[#0d0705] relative min-h-screen flex items-center">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 bg-amber-950/40 border border-amber-900/30 rounded-full text-xs text-amber-500 mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'جلسات عائلية وخاصة' : 'Authentic Floor Cabin Reservation'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            {lang === 'ar' ? 'مجالس كرم الضيافة' : 'Reserve a Table'}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded" />
        </div>

        {/* Dynamic content: Form OR Active Receipt */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!activeReservation ? (
              <motion.div
                key="booking-form-anim"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="bg-[#110a07] rounded-3xl border border-amber-950/40 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-5"
              >
                {/* Visual Context sidebar in the grid */}
                <div className="md:col-span-2 bg-[#1b120c] p-8 flex flex-col justify-between text-left rtl:text-right border-r md:border-b-0 border-b border-amber-950/20 relative overflow-hidden">
                  {/* Subtle mud bricks graphic texture background */}
                  <div className="opacity-10 absolute inset-0 bg-cover bg-center select-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?w=400')" }} />
                  
                  <div className="relative z-10">
                    <span className="text-[10px] tracking-widest text-amber-500 font-mono font-bold uppercase mb-2 block">
                      {lang === 'ar' ? 'مزايا المجالس التراثية' : 'Heritage Advantages'}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-amber-100 mb-4">
                      {lang === 'ar' ? 'خصوصية تامة بطراز نجدي عريق' : 'Total Privacy & Royal Sittings'}
                    </h3>

                    <div className="space-y-4 my-8 text-xs text-stone-300">
                      <div className="flex items-start space-x-2.5 rtl:space-x-reverse">
                        <Users className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p>{lang === 'ar' ? 'جلسات أرضية وثيرة ومحجوبة مخصصة للعوائل الكبيرة والأصدقاء.' : 'Plush floor cushions suitable for massive family events.'}</p>
                      </div>
                      <div className="flex items-start space-x-2.5 rtl:space-x-reverse">
                        <Coffee className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p>{lang === 'ar' ? 'فواحة اللبان ومجامر العود تهب على غرفتكم طيلة مدة الضيافة.' : 'Oud incense and organic aroma burned for your comfort.'}</p>
                      </div>
                      <div className="flex items-start space-x-2.5 rtl:space-x-reverse">
                        <Trophy className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p>{lang === 'ar' ? 'مواقف خاصة، ومداخل مجهزة لاستضافة كبار الشخصيات.' : 'Private drop-off and tailored entries for special VIP events.'}</p>
                      </div>
                    </div>
                  </div>

                  {selectedBranchData && (
                    <div className="relative z-10 p-4 border border-amber-600/10 bg-amber-950/20 rounded-xl mt-6">
                      <span className="text-[10px] text-amber-500 font-bold block mb-1">{lang === 'ar' ? 'الفرع المحدد حالياً:' : 'Active Selected Branch:'}</span>
                      <strong className="text-xs text-amber-100 block">{lang === 'ar' ? selectedBranchData.nameAr : selectedBranchData.nameEn}</strong>
                      <span className="text-[10px] text-stone-400 block mt-1">{lang === 'ar' ? selectedBranchData.addressAr : selectedBranchData.addressEn}</span>
                    </div>
                  )}
                </div>

                {/* Form fields in the grid */}
                <form 
                  onSubmit={handleBook}
                  className="md:col-span-3 p-8 sm:p-10 space-y-5"
                >
                  <h3 className="text-lg font-serif font-bold text-amber-100">
                    {lang === 'ar' ? 'بوابة الحجز المباشر' : 'Immediate Boarding Gate'}
                  </h3>

                  {formError && (
                    <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Branch selector */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                      {lang === 'ar' ? 'اختر الفرع المقرب لديك في الرياض' : 'Select Riyadh Branch'}
                    </label>
                    <select
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-xs"
                    >
                      {RIYADH_BRANCHES.map(b => (
                        <option key={b.id} value={b.id}>
                          {lang === 'ar' ? b.nameAr : b.nameEn} ( {b.phone} )
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest name */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                      {lang === 'ar' ? 'الاسم الكريم بالكامل' : 'Distinguished Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'ar' ? 'اسم الضيف الرئيسي' : 'Enter primary guest name'}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-xs"
                    />
                  </div>

                  {/* Contact line */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        {lang === 'ar' ? 'رقم جوال الإتصال' : 'Phone Call Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +966 50 000 0000"
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-xs text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Secure Email Address'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-xs text-left"
                      />
                    </div>
                  </div>

                  {/* Schedulers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        {lang === 'ar' ? 'تاريخ الاستضافة' : 'Arrival Date'}
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        {lang === 'ar' ? 'وقت الوصول المحبب' : 'Arrival Time Slot'}
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-xs"
                      >
                        <option value="12:00">{lang === 'ar' ? '12:00 م (غداء)' : '12:00 PM (Lunch period)'}</option>
                        <option value="13:30">{lang === 'ar' ? '1:30 م (غداء)' : '1:30 PM'}</option>
                        <option value="15:00">{lang === 'ar' ? '3:00 م (غداء متأخر)' : '3:00 PM'}</option>
                        <option value="18:30">{lang === 'ar' ? '6:30 م (عشاء عائلي)' : '6:30 PM (Dinner period)'}</option>
                        <option value="20:00">{lang === 'ar' ? '8:00 م (عشاء)' : '8:00 PM'}</option>
                        <option value="21:30">{lang === 'ar' ? '9:30 م (عشاء متأخر)' : '9:30 PM'}</option>
                        <option value="23:00">{lang === 'ar' ? '11:00 م (سهرة)' : '11:00 PM (Late Night)'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Guests and Seating types */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        {lang === 'ar' ? 'عدد كراسي الضيوف والاطفال' : 'Total Assembly Guests'}
                      </label>
                      <div className="flex items-center space-x-2 bg-stone-950 rounded-xl p-1 border border-amber-950/20 justify-between">
                        <button
                          id="btn-decrement-guests"
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="px-3.5 py-2 hover:bg-[#1f1611]/60 text-amber-500 rounded-lg font-bold text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold text-[#faf0e6]">
                          {guestCount} {lang === 'ar' ? 'جاهزون' : 'Guests'}
                        </span>
                        <button
                          id="btn-increment-guests"
                          type="button"
                          onClick={() => setGuestCount(Math.min(24, guestCount + 1))}
                          className="px-3.5 py-2 hover:bg-[#1f1611]/60 text-amber-500 text-sm rounded-lg font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        {lang === 'ar' ? 'نمط المجلس والخصوصية' : 'Sittings Preference'}
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-stone-950 rounded-xl p-1 border border-amber-950/20">
                        {(['vip', 'family', 'open'] as const).map((type) => (
                          <button
                            key={type}
                            id={`seat-type-${type}`}
                            type="button"
                            onClick={() => setSeatingType(type)}
                            className={`py-2 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer ${
                              seatingType === type
                                ? 'bg-amber-600 text-[#140e0a]'
                                : 'text-stone-400 hover:text-stone-200'
                            }`}
                          >
                            {type === 'vip' ? (lang === 'ar' ? 'خاص مغلق' : 'VIP Cabin') : type === 'family' ? (lang === 'ar' ? 'عائلي' : 'Family') : (lang === 'ar' ? 'بهو مفتوح' : 'Open')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Special inquiries */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                      {lang === 'ar' ? 'طلبات خاصة أو تنظيم حفلات ميلاد' : 'Special Inquiries & Requests'}
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={2}
                      placeholder={lang === 'ar' ? 'مثل: كرسي أطفال إضافي، استقبال شخصي، باقة ورد ترابية معينة...' : 'e.g. Baby chair, wheelchair entrance, private celebration bouquet...'}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-200 border border-amber-950/20 focus:border-amber-500/40 focus:outline-none text-xs"
                    />
                  </div>

                  {/* Submit book */}
                  <div className="pt-4">
                    <button
                      id="book-submit-action"
                      type="submit"
                      className="w-full py-4 tracking-wider uppercase font-bold text-xs bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-amber-950 hover:bg-amber-400 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      {lang === 'ar' ? 'إحجز مجلسك التراثي مجاناً' : 'Reserve Traditional Floor Table Now'}
                    </button>
                    <span className="text-[9px] text-[#4e433f] mt-2 block text-center">
                      🔒 {lang === 'ar' ? 'حجز تفاعلي فوري - دون دفع أي مبالغ مقدمة بالبطاقة.' : 'Instant secure reservation - no credit card prepayment needed.'}
                    </span>
                  </div>

                </form>
              </motion.div>
            ) : (
              /* DYNAMIC RECEIPT SCREEN */
              <motion.div
                key="booking-receipt-anim"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-xl mx-auto bg-[#170f0b] rounded-3xl border border-amber-500/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-amber-50"
              >
                {/* Visual decorative heritage receipt header */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-700" />
                
                <div className="text-center pb-6 border-b border-amber-950/30">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                    {lang === 'ar' ? 'تم تأكيد حجزك التراثي بنجاح!' : 'Heritage Sitting Confirmed!'}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                    {lang === 'ar' 
                      ? 'تم تخصيص وحظر المجلس بأمركم التلقائي. يرجى إبراز هذا الرمز عند الوصول.' 
                      : 'We look forward to serving you. Please present the Reservation Reference Code below on arrival.'}
                  </p>
                </div>

                {/* Voucher code segment */}
                <div className="my-6 p-4 rounded-xl bg-stone-950/60 border border-amber-950/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 font-mono tracking-widest block uppercase">
                      {lang === 'ar' ? 'رمز حجز الضيف المعتمد' : 'RESERVATION REFERENCE CODE'}
                    </span>
                    <strong className="text-xl sm:text-2xl font-mono text-amber-400 tracking-wider">
                      {activeReservation.id}
                    </strong>
                  </div>

                  <button
                    id="copy-code-btn"
                    onClick={copyCode}
                    className="p-3 bg-stone-900 hover:bg-stone-850 rounded-xl text-stone-400 hover:text-amber-500 cursor-pointer border border-amber-950/30 font-semibold text-xs flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500 animate-bounce" />
                        <span className="text-[10px] text-emerald-500">{lang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[10px]">{lang === 'ar' ? 'نسخ الرمز' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Receipt Table of elements */}
                <div className="space-y-3.5 border-b border-amber-950/30 pb-6 my-6 text-xs sm:text-sm font-sans">
                  <div className="flex justify-between items-center bg-[#251911]/30 p-2.5 rounded-lg border border-amber-950/10">
                    <span className="text-stone-400">{lang === 'ar' ? 'اسم الضيف المسجل' : 'Registered Guest Name'}</span>
                    <strong className="text-amber-100">{activeReservation.name}</strong>
                  </div>

                  <div className="flex justify-between items-center p-1.5">
                    <span className="text-stone-400">{lang === 'ar' ? 'الفرع المستضيف' : 'Hosting branch location'}</span>
                    <strong className="text-amber-100">
                      {RIYADH_BRANCHES.find(b => b.id === activeReservation.branchId)?.nameAr || 'القرية النجدية'}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center p-1.5">
                    <span className="text-stone-400">{lang === 'ar' ? 'تاريخ الحضور ووقت الاستقبال' : 'Arrival date & time'}</span>
                    <strong className="text-amber-200 font-mono">
                      {activeReservation.date} @ {activeReservation.timeSlot}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center p-1.5">
                    <span className="text-stone-400">{lang === 'ar' ? 'عدد مقاعد مجلس الضيافة' : 'Seated family headcount'}</span>
                    <strong className="text-amber-100 font-mono">{activeReservation.guestCount} {lang === 'ar' ? 'صحبة' : 'Guests'}</strong>
                  </div>

                  <div className="flex justify-between items-center p-1.5">
                    <span className="text-stone-400">{lang === 'ar' ? 'نوع المجلس المعتمد' : 'Table structure style'}</span>
                    <strong className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/20 text-[10px] text-amber-500 tracking-wider font-bold uppercase">
                      {lang === 'ar' 
                        ? (activeReservation.seatingType === 'vip' ? 'مجلس مغلق VIP' : activeReservation.seatingType === 'family' ? 'جلسة عائلية' : 'جلسة بهو مفتوح')
                        : activeReservation.seatingType.toUpperCase() + ' sitting'
                      }
                    </strong>
                  </div>

                  {activeReservation.specialRequests && (
                    <div className="bg-stone-950/40 p-3 rounded-lg border border-amber-950/10 text-xs mt-3">
                      <span className="text-stone-500 block mb-1">{lang === 'ar' ? 'طلباتك المسجلة مسبقاً:' : 'Your registered requests:'}</span>
                      <p className="text-stone-300 italic leading-relaxed text-left rtl:text-right">
                        "{activeReservation.specialRequests}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Receipt Actions panel */}
                <div className="flex flex-col sm:flex-row space-y-2.5 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse">
                  {/* ICS calendar scheduler */}
                  <button
                    id="download-calendar-btn"
                    onClick={downloadICSFile}
                    className="flex-grow py-3.5 bg-gradient-to-r from-amber-500 to-amber-700 text-amber-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 rtl:space-x-reverse cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'تحميل جدول تقويم ICS للتقويم' : 'Save to My Calendar (.ics)'}</span>
                  </button>

                  {/* Reset/Cancel */}
                  <button
                    id="cancel-reservation-btn"
                    onClick={handleCancelReservation}
                    className="py-3.5 px-5 bg-stone-900 hover:bg-stone-850 rounded-xl text-xs font-semibold text-stone-400 hover:text-red-400 border border-stone-800 transition-colors cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'تعديل أو إلغاء مجلس الحجز' : 'Edit / Reset'}</span>
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
