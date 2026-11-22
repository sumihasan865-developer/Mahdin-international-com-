import React from 'react';
import { Mail, Phone, MapPin, Clock, Wrench, Building2, ShieldCheck, Facebook, ExternalLink } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenTracking: () => void;
  onOpenOfficeMap?: () => void;
}

export default function Footer({ onNavigate, onOpenTracking, onOpenOfficeMap = () => {} }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900" id="contact">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Logo size={40} className="h-10 w-10 shrink-0" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  Mahdin-International Ltd.
                </span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block font-mono">
                  Trusted Corporate & Industrial Maintenance
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A registered servicing company based out of Dhaka. We assemble systems, service heavy cooling capacitors, mount CCTV coverage grids, and calibrate industrial controllers across all active districts of Bangladesh.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
              <span>Incorporated Engineering Standby Team</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-100">
              Quick Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-450">
              {[
                { label: 'Home Page', tag: 'home' },
                { label: 'About Us Overview', tag: 'about' },
                { label: 'Service Catalog', tag: 'services' },
                { label: 'Our Engineer Team', tag: 'our-engineer-team' },
                { label: 'Completed Portfolio', tag: 'projects' },
                { label: 'Live Item Tracking', tag: 'tracking-terminal-section' },
                { label: 'Corporate Office Location', tag: 'office-location' },
                { label: 'Frequently Asked (FAQ)', tag: 'faq' },
                { label: 'Book Servicing Hub', tag: 'book' }
              ].map((link) => (
                <li key={link.tag}>
                  <button
                    onClick={() => onNavigate(link.tag)}
                    className="hover:text-blue-400 hover:underline transition-all block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacts & Location Coordinates */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-100">
              Operational Contacts
            </h4>
            <div className="space-y-3 font-sans">
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-slate-200 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white block">Corporate HQ & Depot</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=House+No%23289%2C+Sanarpar%2C+Siddirgonj%2C+Narayanganj%2C+Dhaka%2C+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-white text-xs block font-mono leading-relaxed underline decoration-slate-600 hover:decoration-white cursor-pointer"
                    title="সরাসরি Google Map-এ লোকেশন দেখতে ট্যাপ করুন"
                  >
                    House No#২৮৯, Sanarpar, Siddirgonj, Narayanganj, Dhaka, Bangladesh
                  </a>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=House+No%23289%2C+Sanarpar%2C+Siddirgonj%2C+Narayanganj%2C+Dhaka%2C+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-blue-300 underline cursor-pointer"
                    >
                      <span>📍 Google Map-এ সরাসরি লোকেশন দেখুন</span>
                    </a>
                    <button
                      onClick={onOpenOfficeMap}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      <span>(ম্যাপ পপআপ)</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 shadow-xs">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Official Phone Call Logo">
                    <circle cx="12" cy="12" r="12" fill="#25D366" />
                    <path
                      d="M16.55 13.91c-.34-.17-2.02-1-2.33-1.12-.31-.11-.54-.17-.77.17-.23.34-.89 1.12-1.09 1.35-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.69-2.01-1.89-2.35-.2-.34-.02-.53.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.55-.28-.67-.56-.58-.77-.59-.19-.01-.42-.01-.65-.01-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.17.23 2.42 3.69 5.86 5.18.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.14.66-.1 2.02-.83 2.3-1.63.29-.8.29-1.49.2-1.63-.08-.14-.31-.23-.65-.4z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">Telephone Hotline</span>
                  <a href="tel:+88001670672697" className="text-slate-400 hover:text-blue-400 text-xs underline">
                    +880 01670-672697
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/90 border border-slate-700 shadow-xs">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Official Gmail Logo">
                    <path fill="#4285F4" d="M21.5 5.5v13a2 2 0 01-2 2h-3v-10l8-5z" />
                    <path fill="#34A853" d="M2.5 5.5l8 5v10h-3a2 2 0 01-2-2v-13z" />
                    <path fill="#EA4335" d="M21.5 5.5l-9 6.8-9-6.8a2 2 0 012.8-1.5l6.2 4.7 6.2-4.7a2 2 0 012.8 1.5z" />
                    <path fill="#FBBC05" d="M10.5 12.3v8.2h3v-8.2l-1.5-1.1-1.5 1.1z" />
                    <path fill="#C5221F" d="M21.5 5.5L19.7 4C19.1 3.5 18.2 3.6 17.7 4.2L12 8.5 6.3 4.2C5.8 3.6 4.9 3.5 4.3 4L2.5 5.5v2.8l9.5 7.2 9.5-7.2V5.5z" />
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">Email Operations</span>
                  <a href="mailto:Mahdininternational@gmail.com" className="text-slate-400 hover:text-blue-400 text-xs underline truncate block max-w-[240px]">
                    Mahdininternational@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-900 pt-3">
                <Clock className="h-5 w-5 text-slate-500 shrink-0" />
                <div className="text-[11px] text-slate-400 font-mono">
                  <span>Sat - Thu (8 AM - 7 PM)</span> <br />
                  <span className="font-bold text-slate-300">Emergency support: 24/7 Available</span>
                </div>
              </div>

              {/* Official Facebook Page Link */}
              <div className="flex items-center gap-3 border-t border-slate-900 pt-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1877F2]/15 border border-[#1877F2]/30 shadow-xs">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-label="Official Facebook Logo">
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <path
                      d="M15.36 12l.36-2.36h-2.26V8.11c0-.65.32-1.28 1.33-1.28h1.03V4.82a12.6 12.6 0 00-1.83-.09c-1.87 0-3.08 1.13-3.08 3.19v1.72H8.82V12h2.09v6.5h2.55V12h1.9z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">Official Facebook Page</span>
                  <a
                    href="https://www.facebook.com/share/1998RNbBXp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-xs font-semibold underline flex items-center gap-1 group"
                  >
                    <span>Mahdin-International Facebook</span>
                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Outer bottom copyright banner */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 Mahdin-International Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Corporate Registration No: JS-592019-BD</span>
            <span>•</span>
            <span>Dhaka Engineering Board Approvals Signed</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
