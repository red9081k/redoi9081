/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Receipt, 
  CalendarRange, 
  TrendingUp, 
  ShoppingBag, 
  Check, 
  Trash2, 
  CheckSquare, 
  Award, 
  DollarSign 
} from 'lucide-react';
import { Booking, ClientOrder, translationDict } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
  bookings: Booking[];
  orders: ClientOrder[];
  onCompleteOrder: (id: string) => void;
  onDeleteOrder: (id: string) => void;
  onCompleteBooking: (id: string) => void;
  onDeleteBooking: (id: string) => void;
  language: 'ar' | 'en';
  currency: string;
}

export default function AdminDashboard({
  onClose,
  bookings,
  orders,
  onCompleteOrder,
  onDeleteOrder,
  onCompleteBooking,
  onDeleteBooking,
  language,
  currency,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'bookings'>('orders');

  const dict = translationDict[language];
  const isRtl = language === 'ar';

  // Metrics
  const totalSales = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingSales = orders
    .filter(o => o.status !== 'delivered')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in text-xs">
      {/* Dashboard Card Frame */}
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col h-[85vh] text-zinc-900 border border-zinc-200"
        style={{ direction: isRtl ? 'rtl' : 'ltr' }}
      >
        {/* Header Block */}
        <div className="p-6 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-600 rounded-lg text-white">
                <TrendingUp size={16} />
              </span>
              <h2 className="text-lg font-extrabold tracking-tight">
                {dict.adminTitle}
              </h2>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
              {dict.adminSub}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Metric Cards Row */}
        <div className="p-6 bg-zinc-50 border-b border-zinc-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Revenue Delivered Card */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                {language === 'ar' ? 'الإيرادات المحصلة (المسلمة)' : 'Settled Earnings (Delivered)'}
              </p>
              <p className="text-xl font-extrabold text-emerald-600 mt-1">
                {totalSales} {currency}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ✓
            </div>
          </div>

          {/* Revenue Pending Card */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                {language === 'ar' ? 'طلبات قيد التحضير المطبخي' : 'Pending Kitchen Sales'}
              </p>
              <p className="text-xl font-extrabold text-indigo-600 mt-1">
                {pendingSales} {currency}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Receipt size={18} />
            </div>
          </div>

          {/* Active Reserves */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                {dict.activeBookings}
              </p>
              <p className="text-xl font-extrabold text-amber-600 mt-1">
                {activeBookingsCount} {language === 'ar' ? 'حجوزات نشطة' : 'Active Seats'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarRange size={18} />
            </div>
          </div>
        </div>

        {/* Navigation Sidebar & Data Grid container */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-white">
          {/* Left Navigation Rails */}
          <div className="w-full md:w-56 bg-zinc-50 border-r md:border-b-0 border-b border-zinc-200 flex md:flex-col text-xs font-semibold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 md:flex-none p-4 text-right flex items-center gap-3 transition-colors border-l-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-indigo-600 bg-white text-indigo-900 font-bold'
                  : 'border-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
              style={{ flexDirection: isRtl ? 'row' : 'row-reverse' }}
            >
              <Receipt size={16} />
              <span className="flex-1">{dict.ordersTab}</span>
              <span className="bg-zinc-200 px-1.5 py-0.5 rounded-full text-[10px] text-zinc-800">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 md:flex-none p-4 text-right flex items-center gap-3 transition-colors border-l-2 cursor-pointer ${
                activeTab === 'bookings'
                  ? 'border-indigo-600 bg-white text-indigo-900 font-bold'
                  : 'border-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
              style={{ flexDirection: isRtl ? 'row' : 'row-reverse' }}
            >
              <CalendarRange size={16} />
              <span className="flex-1">{dict.bookingsTab}</span>
              <span className="bg-zinc-200 px-1.5 py-0.5 rounded-full text-[10px] text-zinc-800">
                {bookings.length}
              </span>
            </button>
          </div>

          {/* Main List display block */}
          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {activeTab === 'orders' ? (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="py-12 text-center text-zinc-400 space-y-2">
                    <ShoppingBag size={32} className="mx-auto text-zinc-300" />
                    <p>{language === 'ar' ? 'سجل المطبخ فارغ. أضف وجبات من القائمة لترى مفعول المحاكات.' : 'No orders received yet. Launch a quick delivery simulation from the menu!'}</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div 
                      key={order.id}
                      className={`p-4 rounded-2xl border transition-colors shadow-sm bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        order.status === 'delivered' 
                          ? 'border-emerald-100 bg-emerald-50/20' 
                          : 'border-zinc-200'
                      }`}
                    >
                      {/* Left: Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-900">
                            {language === 'ar' ? `طلب #${order.id.slice(-4).toUpperCase()}` : `Order #${order.id.slice(-4).toUpperCase()}`}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {order.createdAt}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                            order.status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800 animate-pulse'
                          }`}>
                            {order.status === 'delivered' 
                              ? (language === 'ar' ? 'تم التوصيل كاش' : 'Completed') 
                              : (language === 'ar' ? 'جاري الطبخ 🍳' : 'In Kitchen 🍳')}
                          </span>
                        </div>

                        {/* Order Items List */}
                        <div className="text-zinc-600 space-y-1">
                          {order.items.map((itemObj, index) => (
                            <div key={index} className="flex items-start gap-1.5 text-xs">
                              <span className="font-extrabold text-indigo-700">x{itemObj.qty}</span>
                              <div>
                                <span className="font-semibold text-zinc-800">
                                  {language === 'ar' ? itemObj.menuItem.nameAr : itemObj.menuItem.nameEn}
                                </span>
                                {itemObj.customizations.length > 0 && (
                                  <span className="text-[10px] text-rose-600 block">
                                    {language === 'ar' ? 'بدون: ' : 'Excluding: '} {itemObj.customizations.join('، ')}
                                  </span>
                                )}
                                {itemObj.note && (
                                  <span className="text-[10px] text-zinc-500 italic block">
                                    "{itemObj.note}"
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-zinc-500 font-semibold text-[10px]">
                          {language === 'ar' ? `طاولة رقم: ${order.tableNum}` : `Table Spot Selected: ${order.tableNum}`}
                        </div>
                      </div>

                      {/* Right: Price & Admin controls */}
                      <div className="flex items-center gap-3 self-end md:self-center" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                        <span className="font-extrabold text-sm text-zinc-950">
                          {order.totalPrice} {currency}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {order.status !== 'delivered' && (
                            <button
                              onClick={() => onCompleteOrder(order.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Check size={12} />
                              <span>{language === 'ar' ? 'تسليم' : 'Serve'}</span>
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteOrder(order.id)}
                            className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Delete track"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="py-12 text-center text-zinc-400 space-y-2">
                    <CalendarRange size={32} className="mx-auto text-zinc-300" />
                    <p>{language === 'ar' ? 'لا يوجد حجوزات نشطة بعد. املأ استمارة الحجز في الصفحة الرئيسية لتباشر الإدارة.' : 'No active bookings registered. Simulate a seating booking on the front page!'}</p>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className={`p-4 rounded-2xl border transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        booking.status === 'completed' 
                          ? 'border-emerald-100 bg-emerald-50/20 opacity-80' 
                          : 'border-zinc-200'
                      }`}
                    >
                      {/* Left side details */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-900 text-sm">
                            {booking.name}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {language === 'ar' ? `رمز: ${booking.id.toUpperCase()}` : `Ref: ${booking.id.toUpperCase()}`}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            booking.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800 animate-pulse'
                          }`}>
                            {booking.status === 'completed'
                              ? (language === 'ar' ? 'حضر وجلس ✓' : 'Sat Down ✓')
                              : (language === 'ar' ? 'مؤكد 🛋️' : 'Confirmed 🛋️')}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-600 font-medium">
                          <p>{language === 'ar' ? `📞 التلفون: ${booking.phone}` : `📞 Phone: ${booking.phone}`}</p>
                          <p>{language === 'ar' ? `👥 الأفراد: ${booking.guests}` : `👥 Guests: ${booking.guests}`}</p>
                          <p>{language === 'ar' ? `📅 الموعد: ${booking.date} | الساعة: ${booking.time}` : `📅 Date: ${booking.date} | Spec: ${booking.time}`}</p>
                          <p className="text-indigo-600">{language === 'ar' ? `📍 الجلسة: ${booking.tableType}` : `📍 Spot: ${booking.tableType}`}</p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1.5 self-end md:self-center">
                        {booking.status !== 'completed' && (
                          <button
                            onClick={() => onCompleteBooking(booking.id)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <CheckSquare size={12} />
                            <span>{language === 'ar' ? 'إجلاس' : 'Seat Client'}</span>
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteBooking(booking.id)}
                          className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete Booking"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer info copy */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 text-[10px] text-zinc-500 text-center font-mono uppercase tracking-wide">
          Admin Back-Office Demonstration Module — 100% Offline-Mock Sync
        </div>
      </div>
    </div>
  );
}
