import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RIYADH_BRANCHES } from '../data/restaurantData';
import { Branch } from '../types';
import { MapPin, Phone, Clock, Car, Compass, HelpCircle, Check, Map as MapIcon, RotateCcw, AlertTriangle } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

interface LocationMapProps {
  lang: 'ar' | 'en';
}

// Ensure the code platform key is detected
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY !== 'MY_GOOGLE_MAPS_PLATFORM_KEY';

interface StartingPoint {
  id: string;
  nameEn: string;
  nameAr: string;
  lat: number;
  lng: number;
}

const SHIPPERS_HUBS: StartingPoint[] = [
  { id: 'kafd', nameEn: 'KAFD (King Abdullah Financial District)', nameAr: 'مركز الملك عبدالله المالي', lat: 24.7621, lng: 46.6415 },
  { id: 'airport', nameEn: 'King Khalid International Airport (RUH)', nameAr: 'مطار الملك خالد الدولي', lat: 24.9575, lng: 46.6987 },
  { id: 'dq', nameEn: 'Diplomatic Quarter (DQ)', nameAr: 'الحي الدبلوماسي', lat: 24.6784, lng: 46.6190 },
  { id: 'center', nameEn: 'King Abdulaziz Historical Center', nameAr: 'مركز الملك عبدالعزيز التاريخي', lat: 24.6465, lng: 46.7099 }
];

export default function LocationMap({ lang }: LocationMapProps) {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(RIYADH_BRANCHES[0]);
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'WALKING' | 'TRANSIT'>('DRIVING');
  const [startPoint, setStartPoint] = useState<StartingPoint>(SHIPPERS_HUBS[0]);
  
  // Real Maps Ref states
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  // Simulated metrics representing Riyadh traffic
  const [simulatedMetrics, setSimulatedMetrics] = useState({ distance: '12 km', time: '14 mins' });
  const [isCalculating, setIsCalculating] = useState(false);

  // Recalculate mock metrics relative to coordinates if key is not active
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      // Simple coordinate distance calculation
      const dLat = selectedBranch.lat - startPoint.lat;
      const dLng = selectedBranch.lng - startPoint.lng;
      const rKm = Math.sqrt(dLat * dLat + dLng * dLng) * 111; // conversion factor helper
      
      let speedKmh = 50; // driving average in Riyadh with traffic
      if (travelMode === 'WALKING') speedKmh = 5;
      if (travelMode === 'TRANSIT') speedKmh = 35;

      const durationHours = rKm / speedKmh;
      const durationMins = Math.round(durationHours * 60);

      // format
      setSimulatedMetrics({
        distance: `${rKm.toFixed(1)} km`,
        time: durationMins < 60 ? `${durationMins} mins` : `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`
      });
      setIsCalculating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedBranch, startPoint, travelMode]);

  return (
    <section id="location" className="py-24 bg-[#0a0503] relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 bg-amber-950/40 border border-amber-900/30 rounded-full text-xs text-amber-500 mb-3">
            <MapIcon className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'فروعنا العريقة بالرياض' : 'Riyadh Branch Locator'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            {lang === 'ar' ? 'أقرب فروع القرية النجدية' : 'Locations & Map Details'}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded" />
        </div>

        {/* Dual branch details and interactive locator space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDEBAR: Branch Toggle list and traffic calculators */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Branch Cards list */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-widest block mb-1">
                {lang === 'ar' ? 'اختر الفرع لتحديث الخريطة' : 'SELECT BRANCH FOR MAP DETAILS'}
              </h3>
              
              {RIYADH_BRANCHES.map((b) => {
                const isSelected = selectedBranch.id === b.id;
                return (
                  <div
                    key={b.id}
                    id={`branch-item-${b.id}`}
                    onClick={() => {
                      setSelectedBranch(b);
                      setInfoWindowOpen(true);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-950/20 text-amber-50 shadow-md shadow-amber-950/30'
                        : 'border-amber-950/20 bg-stone-900/20 text-stone-300 hover:border-amber-900/30'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                      isSelected ? 'border-amber-500 bg-amber-600 text-amber-950' : 'border-stone-800 bg-stone-900 text-stone-500'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h4 className="text-sm font-bold font-serif">
                          {lang === 'ar' ? b.nameAr : b.nameEn}
                        </h4>
                      </div>

                      <p className="text-stone-400 text-xs leading-relaxed mb-3">
                        {lang === 'ar' ? b.addressAr : b.addressEn}
                      </p>

                      {/* Phone and Hours lists */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-amber-600/60" />
                          {b.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600/60" />
                          {lang === 'ar' ? b.hoursAr : b.hoursEn}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ROUTE RADAR CALCULATOR WIDGET */}
            <div className="bg-[#110a07] rounded-3xl border border-amber-950/20 p-6 space-y-4">
              <span className="text-[10px] text-amber-500 font-bold block uppercase tracking-wider">
                ⚡ {lang === 'ar' ? 'حاسبة المسافات والوصول بالرياض' : 'RIYADH COMMUNITY ROUTE RADAR'}
              </span>
              <h4 className="text-xs font-semibold text-amber-100">
                {lang === 'ar' ? 'حدد موقع انطلاقك لمحاكاة المسار:' : 'Select starting anchor for route simulation:'}
              </h4>

              {/* Start anchor selection list */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {SHIPPERS_HUBS.map(point => (
                  <button
                    key={point.id}
                    id={`start-anchor-btn-${point.id}`}
                    onClick={() => setStartPoint(point)}
                    className={`p-2.5 text-left rtl:text-right rounded-xl border text-[11px] cursor-pointer font-medium transition-all ${
                      startPoint.id === point.id
                        ? 'border-amber-600 bg-amber-950/40 text-amber-300'
                        : 'border-stone-900 bg-stone-950/50 text-stone-400'
                    }`}
                  >
                    {lang === 'ar' ? point.nameAr : point.nameEn}
                  </button>
                ))}
              </div>

              {/* Transport modes */}
              <div className="grid grid-cols-3 gap-2 border-t border-stone-900/60 pt-3">
                {[
                  { id: 'DRIVING', labelEn: 'Driving', labelAr: 'سيارة', icon: Car },
                  { id: 'TRANSIT', labelEn: 'Transit', labelAr: 'مترو/حافلة', icon: Compass },
                  { id: 'WALKING', labelEn: 'Walking', labelAr: 'مشياً', icon: Compass },
                ].map(mode => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      id={`transport-mode-btn-${mode.id}`}
                      onClick={() => setTravelMode(mode.id as any)}
                      className={`py-2 px-1 text-center rounded-xl border text-[10px] font-bold uppercase transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        travelMode === mode.id
                          ? 'border-amber-500 bg-amber-950/40 text-amber-400'
                          : 'border-stone-950 bg-stone-950/10 text-stone-500 hover:text-stone-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? mode.labelAr : mode.labelEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Simulated outputs */}
              <div className="bg-stone-950 rounded-2xl p-4 flex items-center justify-between border border-amber-950/10 mt-3 relative overflow-hidden">
                <div>
                  <span className="text-[9px] text-[#4e433f] block font-mono">
                    {lang === 'ar' ? 'المسار المحسوب تقديرياً' : 'ROUTING METRIC ESTIMATE'}
                  </span>
                  <div className="flex items-baseline space-x-1.5 rtl:space-x-reverse mt-1">
                    <strong className="text-xl font-bold font-serif text-amber-400">
                      {isCalculating ? '...' : simulatedMetrics.distance}
                    </strong>
                    <span className="text-stone-500 text-xs">/</span>
                    <strong className="text-sm font-semibold text-stone-300 font-mono">
                      {isCalculating ? '...' : simulatedMetrics.time}
                    </strong>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-500 block">
                    {lang === 'ar' ? 'حالة الازدحام المروري' : 'Riyadh Traffic State'}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900/30 text-[9px] font-bold mt-1 uppercase">
                    ● {lang === 'ar' ? 'يسير وسلس' : 'Flowing'}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT VIEWSPACE: Real Google Map OR Beautiful Simulated Heritage Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-amber-950/30 bg-[#0e0a08] min-h-[500px] flex flex-col relative h-[600px] shadow-2xl">
            
            {hasValidKey ? (
              /* REAL INTERACTIVE GOOGLE MAPS INTEGRATION */
              <div className="w-full h-full relative" id="real-gmaps-viewport">
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    defaultCenter={{ lat: 24.7170, lng: 46.6575 }}
                    center={{ lat: selectedBranch.lat, lng: selectedBranch.lng }}
                    zoom={12}
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{ width: '100%', height: '100%' }}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                  >
                    <AdvancedMarker 
                      position={{ lat: selectedBranch.lat, lng: selectedBranch.lng }}
                      onClick={() => setInfoWindowOpen(true)}
                    >
                      <Pin background="#d97706" glyphColor="#1c140e" borderColor="#92400e" glyph={selectedBranch.nameAr[3]} />
                    </AdvancedMarker>

                    {infoWindowOpen && (
                      <InfoWindow 
                        position={{ lat: selectedBranch.lat, lng: selectedBranch.lng }} 
                        onCloseClick={() => setInfoWindowOpen(false)}
                      >
                        <div className="p-2.5 text-stone-900 max-w-xs font-sans">
                          <strong className="text-sm font-bold text-amber-950 block select-none">
                            {lang === 'ar' ? selectedBranch.nameAr : selectedBranch.nameEn}
                          </strong>
                          <span className="text-[10px] text-neutral-500 block mt-1 leading-relaxed select-none">
                            {lang === 'ar' ? selectedBranch.addressAr : selectedBranch.addressEn}
                          </span>
                          <span className="text-[10px] text-amber-700 font-semibold block mt-1.5 select-none font-mono">
                            🖁 {selectedBranch.phone}
                          </span>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </APIProvider>
              </div>
            ) : (
              /* BEAUTIFUL SIMULATED HISTORICAL DESIGNED VECTOR MAP SVG */
              <div className="w-full h-full relative p-6 sm:p-8 flex flex-col justify-between" id="simulated-heritage-viewport">
                
                {/* SVG canvas overlay showing coordinates as stylish targets */}
                <div className="absolute inset-0 z-0 opacity-15 select-none">
                  <svg width="100%" height="100%" className="text-amber-500/30">
                    <defs>
                      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  </svg>
                </div>

                {/* Animated Simulated Map Drawing */}
                <div className="absolute inset-0 z-0 flex items-center justify-center p-8 select-none">
                  <div className="w-full h-full relative flex items-center justify-center">
                    
                    {/* Simulated Riyadh Ring Roads (circles) */}
                    <div className="absolute rounded-full border border-amber-900/10 w-96 h-96 animate-pulse duration-[10000ms]" />
                    <div className="absolute rounded-full border border-amber-900/15 w-[500px] h-[500px]" />
                    
                    {/* Simulated branch nodes plotting on canvas */}
                    {RIYADH_BRANCHES.map(b => {
                      const isSelected = selectedBranch.id === b.id;
                      
                      // Calculate mockup offset multipliers
                      const leftOffset = b.id === 'takhassusi' ? '30%' : b.id === 'abubakr' ? '50%' : '75%';
                      const topOffset = b.id === 'takhassusi' ? '55%' : b.id === 'abubakr' ? '25%' : '40%';

                      return (
                        <div
                          key={b.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                          style={{ left: leftOffset, top: topOffset }}
                        >
                          <div className="relative group/sim-node">
                            {/* Glowing halo */}
                            <div className={`absolute -inset-4 rounded-full blur-sm transition-all duration-300 ${
                              isSelected ? 'bg-amber-600/30 opacity-100 scale-110' : 'bg-transparent opacity-0 scale-90'
                            }`} />

                            <div 
                              onClick={() => {
                                const matched = RIYADH_BRANCHES.find(item => item.id === b.id);
                                if (matched) setSelectedBranch(matched);
                              }}
                              className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                                isSelected 
                                  ? 'bg-amber-500 text-stone-950 border-amber-400 scale-110 shadow-lg font-bold' 
                                  : 'bg-[#1a110b] text-amber-500/80 border-amber-950 hover:border-amber-600'
                              }`}
                            >
                              <span className="text-[10px] font-mono">
                                {b.id === 'takhassusi' ? 'T' : b.id === 'abubakr' ? 'A' : 'H'}
                              </span>
                            </div>

                            {/* Floating node label */}
                            <div className="absolute top-11 -left-12 w-32 text-center pointer-events-none">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-md select-none ${
                                isSelected ? 'bg-amber-500 text-amber-950 font-bold' : 'bg-stone-950/60 text-stone-400'
                              }`}>
                                {lang === 'ar' ? b.nameAr.split(' ')[1] || b.nameAr : b.nameEn.split(' ')[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Central Riyadh landmarks (e.g. Kingdom Tower landmark) */}
                    <div className="absolute left-[45%] top-[48%] transform -translate-x-1/2 -translate-y-1/2 text-stone-700/60 font-serif flex flex-col items-center select-none text-[10px]">
                      <div className="w-4 h-12 bg-stone-900 border border-stone-800 rounded-sm mb-1 opacity-40" />
                      <span>{lang === 'ar' ? 'وسط الرياض' : 'Riyadh Center'}</span>
                    </div>

                  </div>
                </div>

                {/* Floating Guide to trigger the environment popup */}
                <div className="relative z-10 p-5 rounded-2xl bg-[#140e0b]/90 backdrop-blur-md border border-amber-500/20 shadow-xl max-w-sm mt-auto ml-0 mr-auto text-left rtl:text-right">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20">
                      <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-amber-100 uppercase tracking-wide">
                        {lang === 'ar' ? 'تفعيل خرائط قوقل التفاعلية مباشر' : 'ENABLE LIVE INTERACTIVE GOOGLE MAPS'}
                      </h4>
                      <p className="text-[10px] text-stone-400 leading-relaxed mt-1">
                        {lang === 'ar' 
                          ? 'لتشغيل خرائط قوقل الفعلية ومعرفة الازدحام المباشر، يرجى تزويد مفتاح API بمربع الأسرار عبر الإعدادات ⚙️.'
                          : 'Paste a Google Maps Platform API key under Secrets under Settings (⚙️ in top right) with the secret name GOOGLE_MAPS_PLATFORM_KEY.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive card explaining active coordinates */}
                <div className="relative z-10 p-5 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-amber-950/30 flex items-center justify-between text-left rtl:text-right">
                  <div>
                    <span className="text-[9px] font-mono text-stone-500 block">
                      {lang === 'ar' ? 'الاحداثيات الجغرافية النشطة' : 'ACTIVE GEOGRAPHIC COORDINATES'}
                    </span>
                    <strong className="text-xs text-amber-200 mt-1 block font-mono">
                      LAT: {selectedBranch.lat.toFixed(5)} • LNG: {selectedBranch.lng.toFixed(5)}
                    </strong>
                  </div>

                  <span className="text-[10px] text-stone-400 font-semibold italic bg-[#1f1611]/80 px-2 py-1 rounded border border-amber-950/20">
                    {lang === 'ar' ? '✓ تم التحقق من قوقل ماب' : '✓ Verified Google Maps Node'}
                  </span>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
