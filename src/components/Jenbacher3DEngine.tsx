import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Settings, Cpu, Zap, Activity, Layers, Disc3 } from 'lucide-react';

// Custom high-fidelity vector "photos" (detailed SVGs) of Jenbacher engine parts
const TurbochargerSystemSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className || "w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_6px_10px_rgba(245,158,11,0.25)] select-none pointer-events-none"}>
    <defs>
      <linearGradient id="turbo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    {/* Spiral Housing */}
    <path d="M50,20 C25,20 15,35 15,55 C15,75 32,85 52,85 C72,85 85,72 85,50 C85,28 70,20 50,20 Z" fill="url(#metal-grad)" stroke="#0f172a" strokeWidth="1.5" />
    <path d="M48,32 C35,32 28,40 28,52 C28,64 38,72 50,72 C62,72 72,62 72,50 C72,38 60,32 48,32 Z" fill="#1e293b" />
    {/* Exhaust inlet pipe */}
    <rect x="70" y="35" width="20" height="15" rx="2" fill="url(#metal-grad)" stroke="#0f172a" />
    {/* Impeller Blades */}
    <g transform="translate(50, 52)">
      <circle r="12" fill="url(#turbo-grad)" />
      <path d="M0,0 L-4,-24 C-1,-26 2,-26 4,-24 Z" fill="url(#turbo-grad)" />
      <path d="M0,0 L24,-4 C26,-1 26,2 24,4 Z" fill="url(#turbo-grad)" />
      <path d="M0,0 L4,24 C1,26 -2,26 -4,24 Z" fill="url(#turbo-grad)" />
      <path d="M0,0 L-24,4 C-26,1 -26,-2 -24,-4 Z" fill="url(#turbo-grad)" />
      {/* Diagonals */}
      <path d="M0,0 L15,-15 C18,-13 18,-10 15,-8 Z" fill="#fbbf24" />
      <path d="M0,0 L15,15 C13,18 10,18 8,15 Z" fill="#fbbf24" />
      <path d="M0,0 L-15,15 C-18,13 -18,10 -15,8 Z" fill="#d97706" />
      <path d="M0,0 L-15,-15 C-13,-18 -10,-18 -8,-15 Z" fill="#d97706" />
      <circle r="4" fill="#ffffff" />
    </g>
    {/* Air Flow Arrows */}
    <path d="M22,38 Q10,48 20,58" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M78,60 Q88,50 78,40" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const SparkPlugSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className || "w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_6px_10px_rgba(56,189,248,0.25)] select-none pointer-events-none"}>
    <defs>
      <linearGradient id="porcelain-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#eab308" />
        <stop offset="50%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
      <linearGradient id="spark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="metal-grad-plug" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    {/* Ceramic Body Ribs */}
    <rect x="42" y="10" width="16" height="30" rx="3" fill="url(#porcelain-grad)" stroke="#475569" strokeWidth="1" />
    <line x1="42" y1="18" x2="58" y2="18" stroke="#94a3b8" strokeWidth="2.5" />
    <line x1="42" y1="26" x2="58" y2="26" stroke="#94a3b8" strokeWidth="2.5" />
    <line x1="42" y1="34" x2="58" y2="34" stroke="#94a3b8" strokeWidth="2.5" />
    
    {/* Hex Nut Block */}
    <polygon points="36,40 64,40 68,52 32,52" fill="url(#metal-grad-plug)" stroke="#1e293b" strokeWidth="1" />
    <rect x="40" y="52" width="20" height="20" fill="url(#brass-grad)" stroke="#475569" strokeWidth="1" />
    {/* Thread details */}
    <line x1="40" y1="58" x2="60" y2="58" stroke="#71717a" strokeWidth="2" />
    <line x1="40" y1="64" x2="60" y2="64" stroke="#71717a" strokeWidth="2" />
    <line x1="40" y1="70" x2="60" y2="70" stroke="#71717a" strokeWidth="2" />

    {/* Electrode Ground Tip */}
    <path d="M44,72 L44,82 A6,6 0 0,0 56,82" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
    {/* Center Pin Electrode */}
    <line x1="50" y1="72" x2="50" y2="78" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />

    {/* Spark Flare */}
    <path d="M46,80 Q50,72 54,80 Q50,84 46,80" fill="url(#spark-grad)" opacity="0.8" />
  </svg>
);

const CylinderHeadSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className || "w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_6px_10px_rgba(139,92,246,0.25)] select-none pointer-events-none"}>
    <defs>
      <linearGradient id="iron-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="50%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
    </defs>
    {/* Cast Iron Outer Housing */}
    <rect x="20" y="25" width="60" height="50" rx="4" fill="url(#iron-grad)" stroke="#0f172a" strokeWidth="1.5" />
    <rect x="25" y="30" width="50" height="40" rx="2" fill="#0f172a" />

    {/* Left Valve Unit */}
    <g transform="translate(36, 32)">
      <path d="M-6,2 Q6,5 -6,8 Q6,11 -6,14 Q6,17 -6,20 L6,23" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
      {/* Valve Guide Stem */}
      <line x1="0" y1="-4" x2="0" y2="30" stroke="#e2e8f0" strokeWidth="2" />
      {/* Valve Plate Base */}
      <polygon points="-10,30 10,30 6,34 -6,34" fill="#cbd5e1" />
    </g>

    {/* Right Valve Unit */}
    <g transform="translate(64, 32)">
      <path d="M-6,2 Q6,5 -6,8 Q6,11 -6,14 Q6,17 -6,20 L6,23" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
      {/* Valve Guide Stem */}
      <line x1="0" y1="-4" x2="0" y2="30" stroke="#e2e8f0" strokeWidth="2" />
      {/* Valve Plate Base */}
      <polygon points="-10,30 10,30 6,34 -6,34" fill="#cbd5e1" />
    </g>

    {/* Spark plug channel center sleeve */}
    <rect x="47" y="20" width="6" height="30" fill="#334155" rx="1" />
    <circle cx="50" cy="54" r="3.5" fill="#38bdf8" />
  </svg>
);

const PistonConnectingRodSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className || "w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_6px_10px_rgba(52,211,153,0.25)] select-none pointer-events-none"}>
    <defs>
      <linearGradient id="piston-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="30%" stopColor="#cbd5e1" />
        <stop offset="70%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="rod-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
    {/* Piston Head (Crown) */}
    <rect x="25" y="15" width="50" height="30" rx="3" fill="url(#piston-grad)" stroke="#1e293b" strokeWidth="1" />
    
    {/* Compression Ring Slots */}
    <line x1="25" y1="20" x2="75" y2="20" stroke="#1e293b" strokeWidth="1.5" />
    <line x1="25" y1="25" x2="75" y2="25" stroke="#1e293b" strokeWidth="1.5" />
    <line x1="25" y1="30" x2="75" y2="30" stroke="#1e293b" strokeWidth="1.5" />

    {/* Piston Pin Hub & Wrist Pin */}
    <rect x="42" y="35" width="16" height="10" rx="2" fill="#475569" />
    <circle cx="50" cy="40" r="4" fill="#0f172a" />

    {/* Connecting Rod (H-Beam Style) */}
    <path d="M47,40 L44,76 C44,76 40,78 40,81 C40,84 44,87 50,87 C56,87 60,84 60,81 C60,78 56,76 56,76 L53,40 Z" fill="url(#rod-grad)" stroke="#1e293b" strokeWidth="1" />
    <line x1="50" y1="46" x2="50" y2="72" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

    {/* Journal Cap Bolts */}
    <circle cx="44" cy="81" r="1.5" fill="#f8fafc" />
    <circle cx="56" cy="81" r="1.5" fill="#f8fafc" />
  </svg>
);

const AlternatorGeneratorSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className || "w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_6px_10px_rgba(244,63,94,0.25)] select-none pointer-events-none"}>
    <defs>
      <linearGradient id="copper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ea580c" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#9a3412" />
      </linearGradient>
      <linearGradient id="steel-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
    {/* Cylinder Stator Core */}
    <rect x="22" y="22" width="56" height="56" rx="28" fill="url(#steel-grad)" stroke="#0f172a" strokeWidth="1.5" />
    <rect x="28" y="28" width="44" height="44" rx="22" fill="#0f172a" />

    {/* Stator Internal Copper Windings loops */}
    <g transform="translate(50, 50)">
      {/* Multiple copper rings around center */}
      <circle r="18" fill="none" stroke="url(#copper-grad)" strokeWidth="3" />
      <circle r="14" fill="none" stroke="url(#copper-grad)" strokeWidth="3.5" />
      
      {/* Copper winding coils spokes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="0"
          x2="18"
          y2="0"
          stroke="url(#copper-grad)"
          strokeWidth="3.5"
          transform={`rotate(${i * 45})`}
          strokeLinecap="round"
        />
      ))}

      {/* Center rotor shaft coupling */}
      <circle r="6" fill="url(#steel-grad)" stroke="#0f172a" />
      <circle r="2" fill="#ffffff" />
    </g>

    {/* Cooling Ventilation Fins around perimeter */}
    {Array.from({ length: 12 }).map((_, i) => (
      <line
        key={`fin-${i}`}
        x1="50"
        y1="14"
        x2="50"
        y2="20"
        stroke="#94a3b8"
        strokeWidth="2"
        transform={`rotate(${i * 30} 50 50)`}
      />
    ))}

    {/* Electric current spark particles */}
    <path d="M12,25 Q18,30 14,35" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
    <path d="M88,75 Q82,70 86,65" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
  </svg>
);

interface EnginePart {
  id: string;
  name: string;
  banglaName: string;
  desc: string;
  maintenanceInterval: string;
  icon: React.ComponentType<any>;
  color: string;
  // Offset directions for exploded view
  offsetX: number;
  offsetY: number;
  offsetZ: number;
}

const ENGINE_PARTS: EnginePart[] = [
  {
    id: 'part-turbo',
    name: 'Exhaust Turbocharger System',
    banglaName: 'টার্বোচার্জার সিস্টেম',
    desc: 'Pre-compresses combustion air to achieve peak efficiency in Jenbacher engines.',
    maintenanceInterval: 'Routine inspection every 4,000 Hours',
    icon: TurbochargerSystemSvg,
    color: 'from-amber-400 to-orange-500',
    offsetX: 0,
    offsetY: 0,
    offsetZ: 120, // Top stack
  },
  {
    id: 'part-plug',
    name: 'Pre-Chamber Spark Plug Unit',
    banglaName: 'প্রি-চেম্বার স্পার্ক প্লাগ',
    desc: 'High-tension special alloy ignition plug configured for lean-burn gas mixtures.',
    maintenanceInterval: 'Calibrate/Replace at 2,000 Hours',
    icon: SparkPlugSvg,
    color: 'from-blue-400 to-cyan-400',
    offsetX: 0,
    offsetY: 0,
    offsetZ: 60, // Upper middle stack
  },
  {
    id: 'part-head',
    name: 'Cylinder Head & Valves Assembly',
    banglaName: 'সিলিন্ডার হেড ও ভালভ',
    desc: 'Premium alloy heavy cast assembly containing heavy duty intake and exhaust valves.',
    maintenanceInterval: 'OEM Leak testing at 10,000 Hours',
    icon: CylinderHeadSvg,
    color: 'from-indigo-400 to-purple-500',
    offsetX: 0,
    offsetY: 0,
    offsetZ: 0, // Central anchor stack
  },
  {
    id: 'part-piston',
    name: 'Piston & Connecting Rods',
    banglaName: 'পিস্টন ও কানেক্টিং রড',
    desc: 'Spheroidal graphite cast iron pistons engineered to withstand extreme cylinder pressures.',
    maintenanceInterval: 'Full overhaul diagnostic at 20,000 Hours',
    icon: PistonConnectingRodSvg,
    color: 'from-emerald-400 to-teal-500',
    offsetX: 0,
    offsetY: 0,
    offsetZ: -60, // Lower middle stack
  },
  {
    id: 'part-alternator',
    name: 'Direct Alternator Generator Coupling',
    banglaName: 'অল্টারনেটর কাপলিং',
    desc: 'Sychronous alternator that couples mechanical drive to deliver active electricity.',
    maintenanceInterval: 'Vibration & bearing audit every 8,000 Hours',
    icon: AlternatorGeneratorSvg,
    color: 'from-red-400 to-pink-500',
    offsetX: 0,
    offsetY: 0,
    offsetZ: -120, // Bottom stack
  }
];

export default function Jenbacher3DEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [manualExplode, setManualExplode] = useState(0.2); // Default slight offset so they see it is interactive
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Scroll tracking to trigger interactive explosion automatically as they scroll the page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to explosion percentage
  // As user scrolls the page, parts dynamically slide out and return!
  const scrollExplode = useTransform(scrollYProgress, [0.1, 0.65], [0, 1]);

  // Hook to update manual value from scroll so both work seamlessly
  useEffect(() => {
    const unsubscribe = scrollExplode.on("change", (latest) => {
      // Clamp values between 0 and 1
      const clamped = Math.min(Math.max(latest, 0), 1);
      setManualExplode(clamped);
    });
    return () => unsubscribe();
  }, [scrollExplode]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md overflow-hidden min-h-[550px] flex flex-col justify-between"
      id="jenbacher-3d-simulator"
    >
      {/* Simulation HUD Overlay */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Jenbacher J320 3D Exploded-View Model
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-blue-400 bg-blue-950/40 border border-blue-900/50 rounded-lg px-2 py-0.5">
          <Settings className="h-3 w-3 animate-spin duration-3000" />
          <span className="font-mono font-bold">Scroll page to explode engine parts</span>
        </div>
      </div>

      {/* Manual Controller Slider */}
      <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-xl z-20 space-y-1.5 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-blue-400" />
            <span>Interactive Explosion Control (ম্যানুয়াল কন্ট্রোল)</span>
          </span>
          <span className="font-mono font-bold text-blue-400">{Math.round(manualExplode * 100)}%</span>
        </div>
        <input 
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={manualExplode}
          onChange={(e) => setManualExplode(parseFloat(e.target.value))}
          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-blue-500"
        />
        <div className="flex justify-between text-[9px] text-slate-500 font-mono">
          <span>Fully Assembled (সংযুক্ত ইঞ্জিন)</span>
          <span>Exploded View (আলাদা পার্টস)</span>
        </div>
      </div>

      {/* Interactive 3D Canvas Simulation Stage */}
      <div className="relative flex-1 flex items-center justify-center min-h-[360px] select-none py-6">
        
        {/* Glowing engine base core anchor */}
        <div className="absolute h-36 w-36 rounded-full bg-blue-600/10 blur-2xl pointer-events-none" />

        {/* Isometric Rotated Stack */}
        <div 
          className="relative transition-transform duration-500 ease-out flex items-center justify-center w-full max-w-[340px] aspect-square"
          style={{
            transform: 'perspective(1000px) rotateX(45deg) rotateZ(-30deg)',
          }}
        >
          {/* Virtual Center Shaft Connector Line */}
          <div 
            className="absolute bg-dashed border-l border-indigo-500/30 w-0 transition-all duration-300 pointer-events-none"
            style={{
              transform: 'rotateY(45deg)',
              height: `${240 + manualExplode * 320}px`
            }}
          />

          {/* Render Exploded Parts isometric layers */}
          {ENGINE_PARTS.map((part) => {
            const Icon = part.icon;
            const isPartHovered = isHovered === part.id;
            
            // Dynamic 3D offset multipliers based on manual/scroll explode progress
            // Stacking strictly vertically (offsetX: 0, offsetY: 0, offsetZ changes only)
            const currentZ = part.offsetZ * (1 + manualExplode * 3.5);
            const currentX = 0;
            const currentY = 0;

            return (
              <motion.div
                key={part.id}
                onMouseEnter={() => setIsHovered(part.id)}
                onMouseLeave={() => setIsHovered(null)}
                className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-950/95 border border-slate-700/80 p-3 shadow-xl hover:border-blue-400 hover:shadow-blue-500/10 transition-colors duration-200 cursor-pointer flex flex-col justify-between items-center group"
                style={{
                  // Combine isometric coordinate offsets based on explosion progress
                  transform: `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) rotateZ(30deg) rotateX(-45deg)`,
                  zIndex: Math.round(100 + part.offsetZ),
                }}
              >
                {/* Colored background gradients */}
                <div className={`absolute inset-0.5 rounded-2xl bg-gradient-to-tr ${part.color} opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none`} />

                {/* Part High-Fidelity Drawing (ছবি) */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl bg-slate-900/60 p-1 border border-slate-800/40 group-hover:border-blue-500/40 transition-colors duration-200 ${isPartHovered ? 'ring-2 ring-blue-500/30' : ''}`}>
                  <Icon />
                </div>

                {/* Subtitle tag label */}
                <span className="text-[10px] font-bold tracking-tight text-slate-300 group-hover:text-blue-400 text-center uppercase truncate w-full mt-1.5 px-1">
                  {part.banglaName}
                </span>

                {/* Glowing status circle indicator */}
                <div className="absolute top-2 right-2 flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${manualExplode > 0.3 ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${manualExplode > 0.3 ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Leader Lines and Floating Information Panels (overlayed on absolute sides) */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-2">
          
          {/* Active Hover details card container */}
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-4 right-4 bg-slate-950/95 border border-blue-500/40 rounded-xl p-4 shadow-xl z-30 pointer-events-auto backdrop-blur-md"
              >
                {(() => {
                  const activePart = ENGINE_PARTS.find(p => p.id === isHovered);
                  if (!activePart) return null;
                  const PartIcon = activePart.icon;
                  return (
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-tr ${activePart.color} text-white shrink-0`}>
                        <PartIcon className="h-4.5 w-4.5" />
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-white uppercase tracking-wider truncate">
                            {activePart.name}
                          </h4>
                          <span className="text-[9px] font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-900/50">
                            Jenbacher Parts
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-emerald-400 font-sans">
                          বাংলা নাম: {activePart.banglaName}
                        </p>
                        <p className="text-[10px] text-slate-300 leading-normal">
                          {activePart.desc}
                        </p>
                        <p className="text-[9px] font-mono text-slate-400 flex items-center gap-1 mt-1 pt-1 border-t border-slate-900">
                          <span className="inline-block h-1 w-1 rounded-full bg-amber-400" />
                          <span>Maintenance Interval: <b>{activePart.maintenanceInterval}</b></span>
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            ) : (
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/40 border border-slate-800 rounded-xl p-3 text-center text-[10px] text-slate-400">
                👉 Hover/Touch any flying part component to inspect its specifications.
              </div>
            )}
          </AnimatePresence>

          {/* Quick static side listing guide indicating parts state */}
          <div className="absolute top-24 right-4 bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl space-y-1.5 hidden md:block">
            <span className="text-[8px] uppercase font-bold tracking-widest text-slate-500 block">Engine Components</span>
            {ENGINE_PARTS.map((part) => (
              <button
                key={part.id}
                onMouseEnter={() => setIsHovered(part.id)}
                onMouseLeave={() => setIsHovered(null)}
                className={`flex items-center gap-2 text-[10px] font-mono w-full text-left transition-colors pointer-events-auto cursor-pointer py-0.5 px-1.5 rounded ${
                  isHovered === part.id ? 'text-blue-400 bg-slate-900' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>{part.banglaName}</span>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Simulator Bottom Tech Specs bar */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 mt-2 bg-slate-950/20 p-2.5 rounded-xl">
        <div className="space-y-0.5">
          <span className="text-slate-500 block">OEM Calibration:</span>
          <span className="font-bold text-slate-300">INNIO Jenbacher J320 Series</span>
        </div>
        <div className="space-y-0.5 text-right">
          <span className="text-slate-500 block">Service Clearance:</span>
          <span className="font-bold text-emerald-400">Mahdin Certified Techs Only</span>
        </div>
      </div>

    </div>
  );
}
