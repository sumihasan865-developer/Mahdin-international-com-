import React, { useState } from 'react';
import { Wrench, Building2, Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  onOpenTracking: () => void;
  onOpenEstimator: () => void;
  onOpenOfficeMap?: () => void;
}

export default function Header({ onNavigate, activeSection, onOpenTracking, onOpenEstimator, onOpenOfficeMap = () => {} }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', section: 'home' },
    { label: 'About Us', section: 'about' },
    { label: 'Our Services', section: 'services' },
    { label: 'Our Engineers', section: 'our-engineer-team' },
    { label: 'Projects', section: 'projects' },
    { label: 'Location', section: 'office-location' },
    { label: 'FAQ', section: 'faq' },
    { label: 'Book a Service', section: 'book' },
    { label: 'Contact', section: 'contact' },
  ];

  const handleLinkClick = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e8dfd8] bg-[#fcfbf9]/95 backdrop-blur-md shadow-xs">
      {/* Top emergency announcement bar - Hershey deep cocoa corporate bar */}
      <div className="bg-[#1a1412] px-4 py-2 text-xs text-[#e8ded8] border-b border-[#332623]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 font-mono">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1 font-semibold">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Emergency Support: 24/7 Available
            </span>
            <span className="hidden sm:inline text-[#59443c]">|</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=House+No%23289%2C+Sanarpar%2C+Siddirgonj%2C+Narayanganj%2C+Dhaka%2C+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#f5ebd9] hover:text-[#e0ba7b] transition-colors underline decoration-[#6e554b] hover:decoration-[#e0ba7b] cursor-pointer"
                title="Click to view location directly on Google Maps"
              >
                <span>📍 Office Location: House #289, Sanarpar, Narayanganj</span>
              </a>
              <button
                onClick={onOpenOfficeMap}
                className="hidden sm:inline-flex rounded bg-[#362723] hover:bg-[#4a3630] border border-[#543e38] px-2 py-0.5 text-[10px] font-bold text-[#e0ba7b] transition-colors cursor-pointer"
              >
                [Map View]
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#cfc2bc]">
            <span>Hours: Sat - Thu (8 AM - 7 PM)</span>
            <a href="mailto:Mahdininternational@gmail.com" className="hover:text-[#e0ba7b] transition-colors font-semibold">
              Mahdininternational@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section - Hershey inspired corporate serif + sans */}
        <div 
          onClick={() => handleLinkClick('home')} 
          className="group flex cursor-pointer items-center gap-3"
          id="logo-container"
        >
          <div className="relative transition-all duration-300 group-hover:scale-105">
            <Logo size={46} className="h-[46px] w-[46px] shrink-0" />
          </div>
          <div>
            <div className="flex items-baseline font-serif">
              <span className="text-2xl font-bold tracking-tight text-[#1a1412]">Mahdin</span>
              <span className="text-sm font-bold text-[#8a5229] ml-1 font-sans">International</span>
            </div>
            <p className="text-[10px] font-semibold tracking-wider text-[#7a6458] uppercase font-mono">
              Corporate & Industrial Support
            </p>
          </div>
        </div>

        {/* Desktop Menu navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.section}
              onClick={() => handleLinkClick(item.section)}
              className={`rounded-lg px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-150 cursor-pointer ${
                activeSection === item.section
                  ? 'bg-[#1a1412] text-[#fcfbf9] font-bold shadow-xs'
                  : 'text-[#42332d] hover:bg-[#f0eae1] hover:text-[#1a1412]'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Special Item Tracking Link */}
          <button
            onClick={() => {
              onOpenTracking();
              setIsOpen(false);
            }}
            className="group relative ml-2 flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/50 px-3 py-2 text-xs xl:text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-all"
            id="track-order-nav-btn"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span>Item Tracking</span>
            <span className="rounded bg-indigo-200/60 px-1 py-0.2 text-[9px] font-semibold text-indigo-800 uppercase">
              Live
            </span>
          </button>
        </nav>

        {/* CTA Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onOpenOfficeMap}
            className="rounded-lg border border-slate-700 bg-slate-900 hover:bg-black px-3 py-2 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <span>📍 Office Location (Google Maps)</span>
          </button>
          <button
            onClick={onOpenEstimator}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Get a Quote
          </button>
          <button
            onClick={() => handleLinkClick('book')}
            className="flex items-center gap-1.5 rounded-lg bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-slate-800 transition-colors group cursor-pointer"
          >
            <span>Book Service</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-blue-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Responsive Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick tracker toggle for mobile */}
          <button
            onClick={onOpenTracking}
            className="flex items-center gap-1 rounded-md bg-indigo-50 border border-indigo-200 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>Track</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleLinkClick(item.section)}
                className={`w-full text-left rounded-lg block px-3 py-2 text-sm font-medium ${
                  activeSection === item.section
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                onOpenOfficeMap();
                setIsOpen(false);
              }}
              className="w-full text-left rounded-lg flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 cursor-pointer"
            >
              <span>📍 Office Location (Google Maps)</span>
            </button>

            <button
              onClick={() => {
                onOpenTracking();
                setIsOpen(false);
              }}
              className="w-full text-left rounded-lg flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-100"
            >
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
              <span>Real-time Order Status & Tracking</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenEstimator();
                setIsOpen(false);
              }}
              className="w-full rounded-md border border-slate-300 text-center py-2.5 text-xs font-semibold text-slate-700"
            >
              Get a Quote
            </button>
            <button
              onClick={() => handleLinkClick('book')}
              className="w-full rounded-md bg-slate-950 text-center py-2.5 text-xs font-semibold text-white"
            >
              Book Now
            </button>
          </div>
          <div className="pt-2 text-center text-[11px] text-slate-400 font-mono">
            Direct Support: <a href="tel:+88001670672697" className="text-slate-600 font-semibold underline">+880 01670-672697</a>
          </div>
        </div>
      )}
    </header>
  );
}
