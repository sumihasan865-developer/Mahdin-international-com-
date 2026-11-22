import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, Cpu, CircleDollarSign, Clock, MessageSquareQuote, Check } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'general' | 'services' | 'pricing_timelines';
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'services',
    question: 'How often do industrial gas engines (such as INNIO Jenbacher) require routine maintenance?',
    answer: 'We recommend standard maintenance checks at specific run-time intervals: minor services and safety audits at 2,000 to 4,000 operational hours, intermediate surveys (including spark plug inspections and cylinder pressure calibrations) at 8,000 to 16,000 hours, and complete mechanical overhauls matching official OEM tolerances with state-of-the-art diagnostic tools.'
  },
  {
    id: 'faq-2',
    category: 'pricing_timelines',
    question: 'What is your pricing model for contract-based corporate maintenance?',
    answer: 'We offer highly flexible and customized contract structure: Annual Maintenance Contracts (AMC) for continuous physical, electrical, and HVAC checks, and Pay-Per-Service models for specialized single deployments (like machinery calibration, thermal imaging audits, or PFI panel redesigns). You can generate a custom cost breakdown dynamically using our in-app Quote Estimator.'
  },
  {
    id: 'faq-3',
    category: 'pricing_timelines',
    question: 'How quickly can your engineering team respond to emergency machinery breakdowns?',
    answer: 'For premium corporate clients situated in key industrial zones—such as Narayanganj, Gazipur, Chittagong, and Jatrabari (Dhaka)—our emergency response unit is dispatched within 2 to 4 hours of logging the support event. Standard electrical and HVAC servicing calls are scheduled and resolved within 24 hours.'
  },
  {
    id: 'faq-4',
    category: 'services',
    question: 'Do you provide authentic OEM spare parts for Jenbacher engines and PFI panels?',
    answer: 'Yes, we source and supply only authentic, fully traceable replacement parts. For INNIO Jenbacher gas engines, we guarantee certified cylinder heads, ignition spark plugs, and lubricating filters. For PFI panels, we supply premium heavy-duty magnetic contactors and certified capacitor banks to prevent reactive loss.'
  },
  {
    id: 'faq-5',
    category: 'general',
    question: 'What safety certifications or protocols do your field operators follow?',
    answer: 'On-site safety is our highest priority. All Mahdin International technicians wear arc-flash protective uniforms, isolated electrical safety shoes, and hard helmets. Every major diagnostic deployment requires a verified field supervisor clearance checklist aligning with ISO 9001 and local safety approvals before operations begin.'
  },
  {
    id: 'faq-6',
    category: 'pricing_timelines',
    question: 'Are the figures calculated by your live Cost Estimator final?',
    answer: 'The live Quote Estimator yields highly accurate, standard baseline estimates based on regional labor rates and current components cost in Bangladesh. For legally binding proposals, a site engineering surveyor will inspect your facility coordinates and deliver a final commercial tender.'
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'How does the Power Factor Improvement (PFI) panel service help save on utility bills?',
    answer: 'A low Power Factor leads to reactive energy loss, triggering heavy industrial penalties from authorities like DESCO or DPDC. Our certified PFI redesign and calibration service installs intelligent microprocessor-controlled relay units that realign capacitor cycles automatically, entirely eliminating low-PFI fines and saving up to 15% on machinery energy bills.'
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'services' | 'pricing_timelines'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const categories = [
    { id: 'all' as const, label: 'All Questions', icon: HelpCircle },
    { id: 'general' as const, label: 'General Info', icon: Cpu },
    { id: 'services' as const, label: 'Technical Services', icon: MessageSquareQuote },
    { id: 'pricing_timelines' as const, label: 'Pricing & Timelines', icon: Clock }
  ];

  return (
    <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="faq">
      <div className="mx-auto max-w-4xl">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1 text-xs font-semibold text-white">
            <HelpCircle className="h-3 w-3 text-emerald-400" />
            <span>Support Resource Center</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Have questions about system downtime, custom PFI setups, or routine diagnostics? Explore verified answers below or contact our hotline directly.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 mb-10" id="faq-search-block">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              id="faq-search-input"
              type="text"
              placeholder="Search common questions, pricing keywords, or system diagnostics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-slate-50 placeholder-slate-400 text-slate-800 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive Categories switcher tabs */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`faq-tab-${cat.id}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    // Reset expanded question to avoid showing invisible filtered item
                    setExpandedId(null);
                  }}
                  className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordions List Container */}
        {filteredItems.length > 0 ? (
          <div className="space-y-3" id="faq-accordions-group">
            {filteredItems.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div 
                  key={item.id}
                  id={`faq-accordion-item-${item.id}`}
                  className={`rounded-2xl border bg-white transition-all overflow-hidden ${
                    isExpanded 
                      ? 'border-blue-500/40 shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/10' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4 cursor-pointer focus:outline-none focus:bg-slate-50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 select-none mt-1">
                        Q{FAQ_ITEMS.findIndex(f => f.id === item.id) + 1}.
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                        {item.question}
                      </h4>
                    </div>
                    <span className="shrink-0 rounded-lg bg-slate-50 p-1 border border-slate-200 text-slate-500">
                      <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-blue-600' : ''
                      }`} />
                    </span>
                  </button>

                  {/* Accordion Content Panel (with Framer Motion animation) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`faq-panel-content-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100 flex gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          {/* Checked deliverable indicator line */}
                          <div className="shrink-0 mt-0.5">
                            <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                              <Check className="h-3 w-3 stroke-[3px]" />
                            </div>
                          </div>
                          <div className="space-y-3 flex-1">
                            <p>{item.answer}</p>
                            <div className="flex items-center gap-1.5">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">
                                Category: {item.category.replace('_', ' & ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl shadow-xs" id="faq-no-results">
            <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-900 mb-1">No matching questions found</h4>
            <p className="text-xs text-slate-500">
              Try adjusting your lookup terms or category filter to locate desired support resources.
            </p>
          </div>
        )}

        {/* Dynamic Service Booking Callout block */}
        <div className="mt-12 text-center bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 relative overflow-hidden" id="faq-booking-callout">
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
          <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">
            Still got unresolved technical queries?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed">
            Our qualified engineers can audit your industrial site coordinates in Bangladesh to configure compliant UPS, PFI, and generator solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('book');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              Book Engineering Audit
            </button>
            <a
              href="tel:+88001670672697"
              className="w-full sm:w-auto rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold px-5 py-3 text-xs sm:text-sm transition-colors"
            >
              Call Engineering Support
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
