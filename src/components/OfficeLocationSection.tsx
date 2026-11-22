import React, { useState } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Navigation, 
  Phone, 
  Clock, 
  Building2, 
  Layers, 
  Globe, 
  Share2, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface OfficeLocationSectionProps {
  onOpenModal: () => void;
}

export default function OfficeLocationSection({ onOpenModal }: OfficeLocationSectionProps) {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [copied, setCopied] = useState(false);

  const addressBn = "হাউস নং#২৮৯, শানাড়পাড়, সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ, ঢাকা, বাংলাদেশ";
  const addressEn = "House No#289, Sanarpar, Siddirgonj, Narayanganj, Dhaka, Bangladesh";
  const googleMapsSearchUrl = "https://www.google.com/maps/search/?api=1&query=Sanarpar+Siddirgonj+Narayanganj+Dhaka+Bangladesh";
  const googleMapsDirUrl = "https://www.google.com/maps/dir/?api=1&destination=Sanarpar+Siddirgonj+Narayanganj+Dhaka+Bangladesh";

  // Google embed iframe url
  const iframeSrc = `https://maps.google.com/maps?q=Sanarpar,+Siddirgonj,+Narayanganj,+Dhaka,+Bangladesh&t=${mapType === 'satellite' ? 'k' : 'm'}&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(`${addressBn}\n(${addressEn})`).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-20 bg-slate-950 text-slate-100 border-t border-slate-900 relative overflow-hidden" id="office-location">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-700 px-3.5 py-1.5 text-xs font-bold text-slate-200 font-mono">
              <MapPin className="h-3.5 w-3.5 text-blue-400 animate-bounce" />
              <span>OFFICIAL CORPORATE LOCATION & GOOGLE MAP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              আমাদের অফিস লোকেশন <span className="text-blue-500">(Google Map)</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans">
              সরাসরি অফিসে এসে সেবা সংক্রান্ত আলোচনা করতে অথবা সার্ভিস ভ্যান ডিসপ্যাচ ডিপো পরিদর্শন করতে গুগোল ম্যাপের মাধ্যমে সহজে আমাদের কর্পোরেট অফিসে আসুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 transition-colors shadow-md cursor-pointer"
            >
              <Globe className="h-4 w-4 text-blue-400" />
              <span>ম্যাপ বড় করে দেখুন (Modal Map)</span>
            </button>

            <a
              href={googleMapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all"
            >
              <Navigation className="h-4 w-4" />
              <span>দিকনির্দেশনা পান (Get Directions)</span>
            </a>
          </div>
        </div>

        {/* Main Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left column: Address details & quick info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-7 shadow-2xl space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-100 border border-slate-700">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
                    প্রধান কার্যালয় ও সার্ভিস ডিপো (ট্যাপ করে ম্যাপ দেখুন)
                  </span>
                  <a
                    href={googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg sm:text-xl font-bold text-white hover:text-blue-300 leading-snug font-sans underline decoration-slate-600 hover:decoration-white transition-colors cursor-pointer"
                    title="সরাসরি Google Map-এ লোকেশন দেখতে ট্যাপ করুন"
                  >
                    {addressBn}
                  </a>
                  <a
                    href={googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-mono text-slate-300 hover:text-white underline decoration-slate-700 cursor-pointer"
                  >
                    {addressEn}
                  </a>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyAddress}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 py-3 px-4 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">ঠিকানা কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 text-slate-400" />
                      <span>ঠিকানা কপি করুন</span>
                    </>
                  )}
                </button>

                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 py-3 px-4 text-xs font-bold text-blue-400 transition-colors"
                >
                  <span>Google Map-এ খুলুন</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Landmark & Working Hours Cards */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 rounded-xl bg-slate-950/70 border border-slate-800/70 p-3.5 text-xs">
                  <Building2 className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200 block">যেভাবে আসবেন (How to Reach):</span>
                    <span className="text-slate-400 leading-relaxed block mt-0.5">
                      ঢাকা-চট্টগ্রাম হাইওয়ে সংলগ্ন শানাড়পাড় বাসস্ট্যান্ড অথবা সাইনবোর্ড থেকে অতি নিকটে। সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ।
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-950/70 border border-slate-800/70 p-3.5 text-xs">
                  <Clock className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200 block">অফিস সময়সূচী (Office Hours):</span>
                    <span className="text-slate-400 font-mono block mt-0.5">
                      শনি - বৃহস্পতি: সকাল ৮:০০ - সন্ধ্যা ৭:০০ <br />
                      <span className="text-emerald-400 font-semibold">জরুরি ফিল্ড সার্ভিস ২৪/৭ খোলা</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-950/70 border border-slate-800/70 p-3.5 text-xs">
                  <Phone className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200 block">সরাসরি টেলিফোন (Direct Hotline):</span>
                    <a 
                      href="tel:+88001670672697" 
                      className="text-blue-400 hover:text-blue-300 font-mono font-bold block mt-0.5 text-sm"
                    >
                      +880 01670-672697
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Verified Corporate Registration: JS-592019-BD</span>
              </div>

            </div>
          </div>

          {/* Right column: Interactive Embedded Google Map */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Map Header controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Interactive Google Map (Sanarpar, Narayanganj)</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setMapType('roadmap')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    mapType === 'roadmap'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>রোড ম্যাপ (Road Map)</span>
                </button>
                <button
                  onClick={() => setMapType('satellite')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    mapType === 'satellite'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>স্যাটেলাইট (Satellite)</span>
                </button>
              </div>
            </div>

            {/* Google Map Embedded Iframe Container */}
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <iframe
                title="Mahdin-International Ltd HQ Sanarpar Narayanganj Google Map"
                src={iframeSrc}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Bottom action bar inside map */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 truncate">
                  <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                  <span className="truncate">House No#289, Sanarpar, Siddirgonj, Narayanganj</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={googleMapsDirUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg transition-colors"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    <span>দিকনির্দেশনা পান</span>
                  </a>

                  <a
                    href={googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-1.5 text-xs font-bold text-slate-200 transition-colors"
                  >
                    <span>বড় ম্যাপে খুলুন</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick directions hint below map */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-2">
              <span>📍 Coordinates: 23.6895° N, 90.5218° E (Sanarpar Zone)</span>
              <button
                onClick={onOpenModal}
                className="text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
              >
                পপআপ ম্যাপ খুলুন (Open Map Modal)
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
