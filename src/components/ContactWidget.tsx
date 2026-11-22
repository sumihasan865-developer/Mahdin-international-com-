import React, { useState } from 'react';
import { Phone, MessageSquarePlus } from 'lucide-react';

export default function ContactWidget() {
  const [hoveredButton, setHoveredButton] = useState<'whatsapp' | 'call' | null>(null);

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end font-sans select-none"
      id="contact-widget-container"
    >
      {/* WhatsApp Floating Button */}
      <div className="relative flex items-center gap-3 group">
        {/* Tooltip */}
        <div 
          className={`px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold shadow-lg whitespace-nowrap transition-all duration-300 transform ${
            hoveredButton === 'whatsapp' 
              ? 'opacity-100 translate-x-0 scale-100Visible' 
              : 'opacity-0 translate-x-2 scale-95 pointer-events-none'
          }`}
          style={{ visibility: hoveredButton === 'whatsapp' ? 'visible' : 'hidden' }}
        >
          <span className="text-emerald-400 font-bold font-mono mr-1">●</span> Chat with us on WhatsApp
        </div>

        {/* Pulse Background */}
        <span className="absolute right-0 h-14 w-14 rounded-full bg-emerald-500/25 animate-ping pointer-events-none" />

        <a
          href="https://wa.me/8801670672697?text=Hello%20Mahdin-International%2C%20I%20would%20like%20to%20inquire%20about%20your%20corporate%20maintenance%20services."
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-floating-button"
          onMouseEnter={() => setHoveredButton('whatsapp')}
          onMouseLeave={() => setHoveredButton(null)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
          aria-label="Chat on WhatsApp"
        >
          {/* High resolution SVG WhatsApp icon for authenticity */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512" 
            className="h-7 w-7 text-white fill-current"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 512l148.5-39c32.8 17.9 69.6 27.3 107.4 27.3 122.4 0 222-99.6 222-222 0-59.3-23.2-115-65-156.9zM223.9 474c-33.1 0-65.7-8.9-94.1-25.7l-6.7-4-88.1 23.1 23.5-85.9-4.4-7c-18.4-29.3-28.1-63.1-28.1-98.1 0-101.9 82.9-184.8 184.8-184.8 49.3 0 95.7 19.2 130.6 54.1 34.8 34.9 54 81.3 54 130.6 0 102-82.9 184.8-184.8 184.8zm101.3-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        </a>
      </div>

      {/* Call Floating Button */}
      <div className="relative flex items-center gap-3 group">
        {/* Tooltip */}
        <div 
          className={`px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold shadow-lg whitespace-nowrap transition-all duration-300 transform ${
            hoveredButton === 'call' 
              ? 'opacity-100 translate-x-0 scale-100Visible' 
              : 'opacity-0 translate-x-2 scale-95 pointer-events-none'
          }`}
          style={{ visibility: hoveredButton === 'call' ? 'visible' : 'hidden' }}
        >
          <span className="text-blue-400 font-bold font-mono mr-1">📞</span> Call Support: +88001670672697
        </div>

        <a
          href="tel:+88001670672697"
          id="phone-call-floating-button"
          onMouseEnter={() => setHoveredButton('call')}
          onMouseLeave={() => setHoveredButton(null)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
          aria-label="Call Mahdin Support"
        >
          <Phone className="h-6 w-6 stroke-[2.25px] animate-pulse" />
        </a>
      </div>
    </div>
  );
}
