import React, { useState } from 'react';
import { 
  MapPin, 
  X, 
  ExternalLink, 
  Navigation, 
  Phone, 
  Clock, 
  Building2, 
  Layers, 
  Globe,
  Share2,
  CheckCircle2
} from 'lucide-react';

interface OfficeLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OfficeLocationModal({ isOpen, onClose }: OfficeLocationModalProps) {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-sans">
                  অফিস লোকেশন (Google Map)
                </span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  Corporate HQ
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Mahdin-International Ltd. Corporate & Depot Center
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Address Highlight Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
                প্রধান কার্যালয় ও সার্ভিস ডিপো ঠিকানা
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-sans">
                {addressBn}
              </div>
              <div className="text-xs font-mono text-slate-400">
                {addressEn}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
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
                href={googleMapsDirUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-lg transition-colors"
              >
                <Navigation className="h-4 w-4" />
                <span>দিকনির্দেশনা (Directions)</span>
              </a>
            </div>
          </div>

          {/* Map Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setMapType('roadmap')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  mapType === 'roadmap'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>রোড ম্যাপ ভিউ (Road Map)</span>
              </button>
              <button
                onClick={() => setMapType('satellite')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  mapType === 'satellite'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>স্যাটেলাইট ভিউ (Satellite)</span>
              </button>
            </div>

            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 underline"
            >
              <span>Google Maps-এ বড় করে দেখুন (Open in Google Maps)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Interactive Embedded Google Map */}
          <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-950">
            <iframe
              title="Mahdin-International Ltd Office Location Google Map"
              src={iframeSrc}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay link in corner for easy phone navigation */}
            <div className="absolute bottom-3 right-3 z-10">
              <a
                href={googleMapsDirUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-700 px-3.5 py-2 text-xs font-bold text-white shadow-xl hover:bg-blue-600 transition-all backdrop-blur-md"
              >
                <Navigation className="h-4 w-4 text-blue-400" />
                <span>Google Map-এ পথ দেখুন</span>
              </a>
            </div>
          </div>

          {/* Landmark & Logistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <Building2 className="h-4 w-4 text-blue-400 shrink-0" />
                <span>যেভাবে আসবেন (Landmark)</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                ঢাকা-চট্টগ্রাম হাইওয়ে সংলগ্ন শানাড়পাড় বাসস্ট্যান্ড অথবা সাইনবোর্ড থেকে অতি নিকটে। সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ।
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>অফিস সময়সূচী</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-mono">
                শনি - বৃহস্পতি: সকাল ৮:০০ - সন্ধ্যা ৭:০০ <br />
                <span className="text-emerald-400 font-semibold">জরুরি ফিল্ড সার্ভিস ২৪/৭ চালু</span>
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>সরাসরি যোগাযোগ</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                জরুরি প্রয়োজনে বা লোকেশন সংক্রান্ত সহায়তায় হটলাইনে কল করুন:
              </p>
              <a 
                href="tel:+88001670672697" 
                className="font-mono font-bold text-blue-400 hover:text-blue-300 block text-sm"
              >
                +880 01670-672697
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <span className="text-xs text-slate-400 font-mono">
            Corporate Reg: JS-592019-BD • Dhaka Engineering Board Approved
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            বন্ধ করুন (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
