import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  HelpCircle, 
  Plus, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Building,
  Wrench
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface QuoteEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onPreloadBooking: (serviceName: string) => void;
}

export default function QuoteEstimator({ isOpen, onClose, onPreloadBooking }: QuoteEstimatorProps) {
  const [category, setCategory] = useState<ServiceCategory>('hvac_electrical');
  const [quantity, setQuantity] = useState<number>(4);
  const [customUrgency, setCustomUrgency] = useState<'routine' | 'urgent' | 'emergency'>('routine');
  const [needsMaterials, setNeedsMaterials] = useState<boolean>(true);

  if (!isOpen) return null;

  // Pricing constants in BDT (Bangladesh Taka)
  const baseRates: Record<ServiceCategory, number> = {
    it_security: 4500,     // CCTV and Access bio-scans basic setup fee
    hvac_electrical: 6000, // Central VRF AC / Transformer filtration check fee
    industrial: 8500,      // Machinery calibration / PFI panel status re-alignment
    infrastructure: 10000   // Comm masonry / pipelines layout repair basic fee
  };

  const perUnitRates: Record<ServiceCategory, number> = {
    it_security: 2200,     // Per Camera setup or Biometric terminal
    hvac_electrical: 4000, // Per cooling Ton / split unit overhaul
    industrial: 5500,      // Per control gauge calibrated / PFI capacitor block
    infrastructure: 1500   // Per 10 Sqft epoxy coatings / Fire riser zone
  };

  const labelLookup: Record<ServiceCategory, string> = {
    it_security: 'Number of Surveillance Cameras / Access Scanners',
    hvac_electrical: 'Count of AC Outlets / Substation Transformers',
    industrial: 'Number of Machinery Items / Capacitor Slots',
    infrastructure: 'Area Scope / Piping Zones (Units)'
  };

  const urgencyMultiplier = {
    routine: 1.0,
    urgent: 1.3,
    emergency: 1.6
  };

  // Safe pricing calculation safely
  const calculateEstimate = () => {
    const base = baseRates[category];
    const unitAddition = quantity * perUnitRates[category];
    const materialCost = needsMaterials ? (base * 0.75 + unitAddition * 0.45) : 0;
    
    const subtotal = (base + unitAddition + materialCost) * urgencyMultiplier[customUrgency];
    return {
      serviceFee: Math.round(base + unitAddition),
      materialCost: Math.round(materialCost),
      urgencyPremium: Math.round(subtotal - (base + unitAddition + materialCost)),
      grandTotal: Math.round(subtotal)
    };
  };

  const rates = calculateEstimate();

  const handlePreload = () => {
    let serviceTitle = 'Custom Maintenance Request';
    if (category === 'it_security') serviceTitle = 'Corporate IT & Security (CCTV setup)';
    if (category === 'hvac_electrical') serviceTitle = 'HVAC & Electrical (Central AC servicing)';
    if (category === 'industrial') serviceTitle = 'Industrial Support (PFI Panel maintenance)';
    if (category === 'infrastructure') serviceTitle = 'Infrastructure Care (Commercial Renovation & Masonry)';

    onPreloadBooking(serviceTitle);
    onClose();

    // Scroll automatically to booking form
    setTimeout(() => {
      const el = document.getElementById('book');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs font-sans animate-in fade-in duration-200">
      
      {/* Modal Dialog container */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 text-white shadow-2xl overflow-hidden self-center animate-in zoom-in-95 duration-200 font-sans">
        
        {/* Colorful visual bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500" />

        {/* Modal headers */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5 sm:p-6 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-blue-450 border border-slate-800">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Service Cost Estimator
              </h3>
              <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider font-mono">
                Corporate Rates In Bangladesh Taka (BDT)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Configurations */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Section 1: Service Field Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Choose Service Category
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {[
                { id: 'it_security' as const, label: 'IT & Bio-Access', icon: <Cpu className="h-4 w-4" /> },
                { id: 'hvac_electrical' as const, label: 'HVAC & Electrical', icon: <Zap className="h-4 w-4" /> },
                { id: 'industrial' as const, label: 'Industrial support', icon: <Wrench className="h-4 w-4" /> },
                { id: 'infrastructure' as const, label: 'Infrastructure', icon: <Building className="h-4 w-4" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCategory(item.id);
                    setQuantity(4);
                  }}
                  className={`flex items-center gap-2 rounded-xl border p-3.5 cursor-pointer text-left transition-all ${
                    category === item.id 
                      ? 'bg-slate-950 border-blue-500 text-blue-400 shadow-md ring-1 ring-blue-500/20' 
                      : 'bg-slate-950/45 border-slate-800 hover:text-slate-100 hover:border-slate-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Count variables & volume sliders */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {labelLookup[category]}
              </label>
              <div className="font-mono text-sm font-black text-slate-100">
                {quantity} Units
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="30"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex gap-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded bg-slate-800 hover:bg-slate-705 px-2.5 py-1 text-xs font-black font-mono"
                >
                  -
                </button>
                <button
                  onClick={() => setQuantity(Math.min(30, quantity + 1))}
                  className="rounded bg-slate-800 hover:bg-slate-705 px-2.5 py-1 text-xs font-black font-mono"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Priority selection checkbox layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Required Urgency Level
              </label>
              <select
                value={customUrgency}
                onChange={(e) => setCustomUrgency(e.target.value as any)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-slate-200 focus:outline-hidden text-white"
              >
                <option value="routine">Routine Care (Standard Base Fees)</option>
                <option value="urgent">Urgent Support (+30% Priority Levy)</option>
                <option value="emergency">Emergency 24/7 (+60% Dispatch Levy)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Component Parts Integration
              </label>
              <button
                type="button"
                onClick={() => setNeedsMaterials(!needsMaterials)}
                className={`w-full rounded-xl border p-2 text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  needsMaterials 
                    ? 'bg-blue-950/20 border-blue-500/30 text-blue-400' 
                    : 'bg-slate-950/40 border-slate-800 text-slate-400'
                }`}
              >
                <span>Include replacement coils/cables</span>
                <div className={`h-4 w-4 rounded-full flex items-center justify-center border ${
                  needsMaterials ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-755'
                }`}>
                  {needsMaterials && <Check className="h-3 w-3 block font-bold text-white" />}
                </div>
              </button>
            </div>

          </div>

          {/* Section 4: dynamic computed invoice preview */}
          <div className="rounded-xl bg-slate-950 p-5 border border-slate-800/80 space-y-3 font-mono text-xs">
            
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-dashed border-slate-800">
              <span>ESTIMATED ITEM COST:</span>
              <span className="text-slate-300">৳ {rates.serviceFee.toLocaleString()} BDT</span>
            </div>

            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-dashed border-slate-800">
              <span>PARTS / CAPITAL MATERIALS:</span>
              <span className="text-slate-300">৳ {rates.materialCost.toLocaleString()} BDT</span>
            </div>

            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-dashed border-slate-800">
              <span>URGENCY INBOUND SURCHARGE:</span>
              <span className="text-slate-300">৳ {rates.urgencyPremium.toLocaleString()} BDT</span>
            </div>

            <div className="flex items-center justify-between pt-2 text-sm">
              <span className="font-bold text-slate-100 flex items-center gap-1.5">
                GRAND TOTAL ESTIMATE :
              </span>
              <span className="text-blue-400 font-extrabold text-base font-mono">
                ৳ {rates.grandTotal.toLocaleString()} BDT *
              </span>
            </div>
          </div>

          {/* Legal and terms */}
          <div className="rounded-lg bg-blue-500/5 p-3.5 border border-blue-500/10 text-[10px] text-slate-400 leading-normal">
            * <strong>Disclaimers:</strong> This estimate is based on typical component costs in Jatrabari, Dhaka distributors. Final binding quotes require physical multimetre or gas testing logs parsed by our field inspector at the site zone.
          </div>

        </div>

        {/* Modal Buttons Footer */}
        <div className="border-t border-slate-800 bg-slate-950/65 p-5 sm:p-6 flex flex-wrap gap-3 justify-end items-center">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 font-semibold px-4 py-3 text-xs"
          >
            Go Back
          </button>
          
          <button
            onClick={handlePreload}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold px-5 py-3 text-xs text-white flex items-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer"
          >
            <span>Proceed to Booking Form</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
