import React from 'react';
import { Shield, Sparkles, Sliders, Users, CheckCircle, ClipboardList, Clock, HelpCircle } from 'lucide-react';

export default function WhyChooseUs() {
  const values = [
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: 'Certified Safety Engineers',
      description: 'Our core engineering crew holds specialized license approvals (BSC, Electric Board of Bangladesh, and OEM certifications) in substation machinery, central air units, and enterprise networking security systems.'
    },
    {
      icon: <Clock className="h-6 w-6 text-indigo-500" />,
      title: '24/7 Response & Mobile Dispatches',
      description: 'Dedicated emergency dispatch vans based out of Jatrabari, Dhaka are packed with key replacement capacitors, refrigerants, and cabling drums, ready to roll at any time of day for premium corporate clients.'
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-emerald-500" />,
      title: 'Transparent Technical Estimations',
      description: 'Clear itemized billing breakdowns for replacement parts, calibration duties, and engineer daily wages. Real estimates with absolutely no hidden convenience or emergency surcharges.'
    }
  ];

  const stats = [
    { value: '50+', label: 'Corporate Clients', desc: 'Ranging from active textiles, commercial banks, and multi-story tower offices.' },
    { value: '100+', label: 'Projects Completed', desc: 'Flawless servicing pipelines in electrical distribution, cctv zones, and complex hvacs.' },
    { value: '20+', label: 'Districts Covered', desc: 'Direct on-location engineer support across all central divisions of Bangladesh.' }
  ];

  return (
    <section className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-slate-100 relative overflow-hidden" id="about">
      {/* Decorative ambient background meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full grid-mesh opacity-20" />
      <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-blue-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission statement and statistics card group */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
              ABOUT MAHDIN-INTERNATIONAL
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-100 font-sans">
              Building Trust Through Safety & Precision
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Based at the intersection of Jatrabari, Dhaka, Mahdin-International Ltd. is a premium multifaceted mechanical and electronics repair servicing group. We combine traditional engineering rigorousness with modern diagnostics to protect your core infrastructure investments.
            </p>

            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-xs font-semibold text-slate-300">Registered with Joint Stock Companies, BD</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-xs font-semibold text-slate-300">Environmentally Safe Refrigerant Reclamation Policy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-xs font-semibold text-slate-300">All tools calibrated to ISO-9001:2015 specifications</span>
              </div>
            </div>

            {/* Micro FAQ button */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-400 mt-4">
              <span className="font-bold text-slate-200 block mb-1">Looking for a tailored annual maintenance contract?</span>
              Our corporate division provides customized monthly auditing agreements suited to high-turnover factories. Ask our representative for a proposal today.
            </div>
          </div>

          {/* Right Column: Values cards and numerical badges */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4" id="values-feature-cards">
              {values.map((val, index) => (
                <div 
                  key={index} 
                  className="group rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6 shadow-sm hover:border-slate-700 hover:bg-slate-900/60 transition-all flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 transition-colors group-hover:bg-slate-900">
                    {val.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick stats on the about layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/60 font-sans">
              {stats.map((st, i) => (
                <div key={i} className="rounded-xl bg-slate-950 p-4 border border-slate-800/60 flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-blue-400 font-mono block mb-1">
                      {st.value}
                    </span>
                    <span className="text-xs font-bold text-slate-100 block mb-1">
                      {st.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
