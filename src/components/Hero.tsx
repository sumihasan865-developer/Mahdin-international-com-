import React, { useState } from 'react';
import {
  ArrowRight,
  Shield,
  Activity,
  Search,
  AlertCircle
} from 'lucide-react';

interface HeroProps {
  onScrollToSection: (section: string) => void;
  onOpenEstimator: () => void;
  onOpenTracking: () => void;
  onQuickTrackSearch: (code: string) => void;
}

const HERO_VIDEO_SRC =
  '/assets/aistudio/kling_20261122_VIDEO_Duration___3084_0.mp4_8fa429e7.mov';

export default function Hero({
  onScrollToSection,
  onOpenEstimator,
  onOpenTracking,
  onQuickTrackSearch
}: HeroProps) {
  const [quickCode, setQuickCode] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCode.trim()) {
      setValidationError('Please type an order/tracking code (e.g., MHD-5029)');
      return;
    }
    setValidationError('');
    onQuickTrackSearch(quickCode.toUpperCase().trim());
  };

  const sampleCodes = ['MHD-8893', 'MHD-5029', 'MHD-1104'];

  return (
    <section
      className="relative overflow-hidden bg-slate-950 pb-16 pt-12 md:py-20 text-white grid-mesh"
      id="home"
    >
      {/* Subtle ambient depth */}
      <div className="pointer-events-none absolute top-1/4 left-1/10 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/12 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Primary 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Copy & Conversion Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-300 tracking-wide">
              <span>Mahdin-International Ltd.</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Jatrabari, Dhaka</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Power & Industrial Engineering</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-100 leading-[1.1] text-balance">
              Professional{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-300">
                Maintenance & Servicing
              </span>{' '}
              Solutions.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Premium IT, HVAC, Jenbacher gas engine overhauling, and industrial support across Bangladesh. Trusted by 50+ corporate giants for custom installations, proactive security, PFI calibration, and mechanical restorations.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onScrollToSection('book')}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold px-6 py-3.5 flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-600/15 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Book a Service</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenEstimator}
                className="rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-500 transition-colors px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-slate-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                Get a Quote
              </button>

              <button
                type="button"
                onClick={onOpenTracking}
                className="rounded-xl border border-slate-700/80 bg-indigo-950/30 hover:bg-indigo-950/50 hover:border-indigo-400/50 transition-colors px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-indigo-300 cursor-pointer whitespace-nowrap shrink-0"
                id="purchased-item-track-btn"
              >
                Track Purchased Item
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 font-mono tabular-nums">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">50+</div>
                <div className="text-xs text-slate-400 mt-0.5">Corporate Clients</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-100">100+</div>
                <div className="text-xs text-slate-400 mt-0.5">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-100">20+</div>
                <div className="text-xs text-slate-400 mt-0.5">BD Districts</div>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Width Jenbacher Gas Engine Showcase */}
          <div className="lg:col-span-5">
            <div className="relative h-[340px] sm:h-[400px] lg:h-[440px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl">
              {/* Covers full width & height of frame; crops top dead space (~6%) and bottom Kling watermark (~9%) */}
              <video
                src={HERO_VIDEO_SRC}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="pointer-events-none absolute left-0 -top-[7%] h-[118%] w-full object-fill [clip-path:inset(5%_0_8%_0)]"
                aria-label="Jenbacher gas engine system maintenance and power engineering showcase"
              />

              {/* Subtle bottom edge blend */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Full-Width Real-Time Order & Servicing Tracker Strip */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Tracker Description & Demo Codes */}
            <div className="lg:col-span-6 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="font-semibold text-blue-400">Active Duty Dispatch Desk</span>
                <span aria-hidden="true">·</span>
                <span>Live Terminal</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-100 font-sans">
                Real-Time Order & Servicing Tracker
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Monitor your project, parts procurement stage, technician notes, or delivery status across all districts in real time.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-mono text-slate-400">Try sample IDs:</span>
                {sampleCodes.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setQuickCode(code);
                      setValidationError('');
                      onQuickTrackSearch(code);
                    }}
                    className="rounded-md bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs font-mono text-slate-200 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Tracker Search Form */}
            <div className="lg:col-span-6 space-y-3">
              <form
                onSubmit={handleQuickSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={quickCode}
                    onChange={(e) => {
                      setQuickCode(e.target.value);
                      if (e.target.value) setValidationError('');
                    }}
                    placeholder="Enter Tracking ID (e.g., MHD-5029)..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 py-3.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-bold px-6 py-3.5 text-sm transition-colors shadow-lg cursor-pointer whitespace-nowrap shrink-0"
                >
                  Track Order Status
                </button>
              </form>

              {validationError && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg p-2.5 font-mono">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span>Licensed Engineers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span>Interactive Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

