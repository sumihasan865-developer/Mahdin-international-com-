import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  UserCheck, 
  Phone, 
  ShieldCheck, 
  Award, 
  Lock, 
  PlusCircle, 
  Search, 
  Sparkles, 
  Star, 
  X, 
  Briefcase, 
  CalendarDays,
  Smartphone,
  CheckCircle2,
  LockOpen
} from 'lucide-react';
import { Engineer, TrackingItem } from '../types';
import { PRELOADED_ENGINEERS, BANGLADESH_DISTRICTS } from '../data';

interface EngineerTeamProps {
  onHireSuccess: (newTrackItem: TrackingItem) => void;
}

export default function EngineerTeam({ onHireSuccess }: EngineerTeamProps) {
  // Synchronous state initializing from localStorage or preloads with new phone
  const [engineers, setEngineers] = useState<Engineer[]>(() => {
    try {
      const stored = localStorage.getItem('mahdin_engineer_team_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((e: Engineer) => ({
            ...e,
            skills: Array.isArray(e?.skills) ? e.skills : [],
            phone: '+8801538005352'
          }));
        }
      }
      localStorage.removeItem('mahdin_engineer_team_v1');
    } catch {
      // fallback if storage is unavailable or corrupted
    }
    return PRELOADED_ENGINEERS;
  });

  // Admin access state
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available' | 'busy'>('all');

  // Form states for adding new engineer
  const [newEngName, setNewEngName] = useState('');
  const [newEngAge, setNewEngAge] = useState('');
  const [newEngPhone, setNewEngPhone] = useState('+8801538005352');
  const [newEngSkills, setNewEngSkills] = useState('');
  const [newEngAvailable, setNewEngAvailable] = useState(true);
  const [adminFeedback, setAdminFeedback] = useState('');

  // Booking/Hiring states
  const [selectedEngForHire, setSelectedEngForHire] = useState<Engineer | null>(null);
  const [hireCompanyName, setHireCompanyName] = useState('');
  const [hirePhone, setHirePhone] = useState('');
  const [hireLocation, setHireLocation] = useState('Dhaka');
  const [hirePriority, setHirePriority] = useState<'Routine' | 'Urgent' | 'Emergency 24/7'>('Urgent');
  const [hireDetails, setHireDetails] = useState('');
  const [hireFeedbackMsg, setHireFeedbackMsg] = useState<string | null>(null);

  // Handle Admin Authorization (Simple PIN verify: "admin")
  const handleVerifyAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === 'admin' || adminPasscode === 'admin123' || adminPasscode === '1234') {
      setIsAdminUnlocked(true);
      setAdminError('');
      setAdminFeedback('Admin features unlocked successfully!');
    } else {
      setAdminError('Invalid passcode! Please enter correct credentials (Passcode is: admin)');
    }
  };

  // Add a new engineer (restricted to authorized admin)
  const handleAddNewEngineer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEngName.trim() || !newEngPhone.trim() || !newEngSkills.trim()) {
      setAdminFeedback('Please fill out all the input fields correctly.');
      return;
    }

    const ageNum = parseInt(newEngAge) || 30;
    const skillsArray = newEngSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const newEng: Engineer = {
      id: `eng-custom-${Date.now()}`,
      name: newEngName,
      skills: skillsArray,
      age: ageNum,
      phone: newEngPhone,
      rating: 5.0, // Initial perfect rating for newly added top partners
      completedProjects: 0,
      available: newEngAvailable
    };

    const updated = [...engineers, newEng];
    setEngineers(updated);
    try {
      localStorage.setItem('mahdin_engineer_team_v2', JSON.stringify(updated));
    } catch {
      // ignore storage quota errors
    }

    // Clear form inputs
    setNewEngName('');
    setNewEngAge('');
    setNewEngPhone('+8801538005352');
    setNewEngSkills('');
    setNewEngAvailable(true);
    setAdminFeedback('New engineer profile has been saved successfully!');

    setTimeout(() => {
      setAdminFeedback('');
    }, 4000);
  };

  // Submit Hiring Request (Simulates placing an assigned dispatch on the Tracking Terminal)
  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEngForHire) return;
    if (!hireCompanyName.trim() || !hirePhone.trim() || !hireDetails.trim()) {
      return;
    }

    const generatedId = `MHD-ENG-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTrackingRecord: TrackingItem = {
      trackingId: generatedId,
      customerName: hireCompanyName,
      phone: hirePhone,
      serviceType: `Engineer Direct Assignment (${selectedEngForHire.name})`,
      location: hireLocation,
      status: 'Received',
      priority: hirePriority,
      assignedTech: `${selectedEngForHire.name} (Direct Hired)`,
      estimatedCompletion: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days for priority direct hire
      createdAt: currentDate,
      updates: [
        {
          timestamp: `${currentDate} ${currentTimeString}`,
          status: 'Received',
          note: `Direct Hiring of personal engineer ${selectedEngForHire.name} recorded. Core dispatch has locked active hours and routed to his technical queue.`,
          location: `${hireLocation} Site Coordination Area`
        }
      ]
    };

    onHireSuccess(newTrackingRecord);
    setHireFeedbackMsg(`Congratulations! ${selectedEngForHire.name} has been successfully booked for your project. Your Tracking ID is: ${generatedId}. A live schedule has been logged in the tracking terminal.`);
    
    // Auto clear after 6 seconds
    setTimeout(() => {
      setHireFeedbackMsg(null);
      setSelectedEngForHire(null);
      // Reset hire inputs
      setHireCompanyName('');
      setHirePhone('');
      setHireDetails('');
    }, 6000);
  };

  // Memoized filter calculation for engineers list
  const filteredEngineers = useMemo(() => {
    return engineers.filter((eng) => {
      const matchesSearch = 
        eng.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eng.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        eng.phone.includes(searchQuery);
      
      const matchesAvailability = 
        filterAvailability === 'all' ||
        (filterAvailability === 'available' && eng.available) ||
        (filterAvailability === 'busy' && !eng.available);

      return matchesSearch && matchesAvailability;
    });
  }, [engineers, searchQuery, filterAvailability]);

  return (
    <section className="bg-slate-100 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200 scroll-mt-12" id="our-engineer-team">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1 text-xs font-semibold text-white">
              <Award className="h-3 w-3 text-emerald-400" />
              <span>Certified Plant Experts & Consultants</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-sans">
              Our Professional Engineer Team
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Connect directly with our mechanical and gas power generator specialists or request a direct hire allocation below.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs shrink-0 self-start md:self-end">
            <div className="text-center px-2">
              <span className="text-2xl font-black text-slate-900 font-mono block leading-none">{engineers.length}</span>
              <span className="text-[10px] text-slate-500 font-bold block mt-1 uppercase">Total Staff</span>
            </div>
            <div className="border-l border-slate-200" />
            <div className="text-center px-2">
              <span className="text-2xl font-black text-emerald-600 font-mono block leading-none">
                {engineers.filter(e => e.available).length}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-1 uppercase">Free Now</span>
            </div>
            <div className="border-l border-slate-200" />
            <div className="text-center px-2">
              <span className="text-2xl font-black text-blue-600 font-mono block leading-none">99%</span>
              <span className="text-[10px] text-slate-500 font-bold block mt-1 uppercase">Uptime Rate</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Admin Mode Gate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Left panel: Search & Filters (Col 7) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search engineers by name, skills or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-slate-800 transition-all font-sans"
              />
            </div>

            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => setFilterAvailability('all')}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  filterAvailability === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All States
              </button>
              <button
                onClick={() => setFilterAvailability('available')}
                className={`flex items-center gap-1.2 px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  filterAvailability === 'available'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-emerald-600 border border-slate-200 hover:bg-emerald-50/50'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span>Available</span>
              </button>
              <button
                onClick={() => setFilterAvailability('busy')}
                className={`flex items-center gap-1.2 px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  filterAvailability === 'busy'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-amber-650 border border-slate-200 hover:bg-amber-50/50'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span>Busy</span>
              </button>
            </div>
          </div>

          {/* Right panel: Admin Portal Switcher (Col 5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className={`h-4.5 w-4.5 ${isAdminUnlocked ? 'text-emerald-500' : 'text-slate-400'}`} />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Admin Verification (Authorized Access)</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Secure portal to enlist custom industrial engineer profiles.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isAdminMode 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-slate-150 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isAdminMode ? 'Close Gate' : 'Open Admin Panel'}
              </button>
            </div>

            {/* Admin Authenticator Screen */}
            {isAdminMode && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                {!isAdminUnlocked ? (
                  <form onSubmit={handleVerifyAdmin} className="space-y-2">
                    <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-150 font-sans">
                      💡 Enter <b>admin</b> or <b>1234</b> to unlock administrative authorization and add custom engine technicians.
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="Enter admin passcode..."
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        className="flex-1 text-xs rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-slate-900 text-white font-bold text-xs px-4 py-2 hover:bg-slate-800 transition-colors"
                      >
                        Unlock
                      </button>
                    </div>
                    {adminError && (
                      <p className="text-[10px] font-semibold text-rose-600">{adminError}</p>
                    )}
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-150 rounded-xl px-3 py-2 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-bold">
                      <LockOpen className="h-4 w-4" />
                      <span>Administrative Access Granted! (Authorized Mode)</span>
                    </div>
                    <button 
                      onClick={() => {
                        setIsAdminUnlocked(false);
                        setAdminPasscode('');
                      }} 
                      className="text-[10px] underline font-bold text-emerald-700 hover:text-emerald-900"
                    >
                      Lock Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Content Layout - Engineers Directory grid along with persistent Add Engineer Sidebar when unlocked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Grid View of Engineers (Col Left: spans 12 or 8 based on admin additions state) */}
          <div className={isAdminMode && isAdminUnlocked ? 'lg:col-span-8 space-y-6' : 'lg:col-span-12 space-y-6'}>
            
            {filteredEngineers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="engineers-active-grid">
                {filteredEngineers.map((eng) => (
                  <div 
                    key={eng.id}
                    className={`rounded-2xl border bg-white p-6 shadow-sm transition-all relative overflow-hidden flex flex-col justify-between group hover:shadow-md ${
                      !eng.available ? 'border-slate-200/90' : 'border-emerald-500/10 hover:border-emerald-500/30'
                    }`}
                  >
                    <div>
                      {/* Avatar initial badge, status, rating indicators */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold shadow-inner ${
                            eng.available 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}>
                            {eng.name.split(' ').pop()?.charAt(0) || 'E'}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-950 font-sans group-hover:text-blue-600 transition-colors">
                              {eng.name}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] font-bold text-slate-500 font-mono">Age: {eng.age} Yrs</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-[10px] font-bold text-slate-500 font-mono">{eng.completedProjects} Jobs Done</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 text-[10px] font-bold text-amber-700">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                            <span>{eng.rating.toFixed(1)}</span>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider mt-1.5 ${
                            eng.available
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}>
                            <span className={`h-1 w-1 rounded-full ${eng.available ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                            {eng.available ? 'Available' : 'Busy'}
                          </span>
                        </div>
                      </div>

                      {/* Technical Skills custom tags list */}
                      <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono block">Specializations:</span>
                        <div className="flex flex-wrap gap-1.2">
                          {eng.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="rounded-lg bg-slate-50 border border-slate-150/80 px-2.5 py-1 text-[10px] font-medium text-slate-650"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom contact info and Action button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
                      <a 
                        href={`tel:${eng.phone}`}
                        className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors text-xs font-semibold group/call"
                        title={`Call ${eng.name}: ${eng.phone}`}
                      >
                        <Smartphone className="h-3.5 w-3.5 text-blue-500 shrink-0 group-hover/call:scale-110 transition-transform" />
                        <span className="font-mono group-hover/call:underline">{eng.phone}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedEngForHire(eng)}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                          eng.available
                            ? 'bg-blue-600 text-white hover:bg-blue-500'
                            : 'bg-slate-150 text-slate-400 cursor-not-allowed border border-slate-200'
                        }`}
                        title={eng.available ? `Hire ${eng.name}` : `Currently booked on field support`}
                      >
                        <UserCheck className="h-3.5 w-3.5 shrink-0" />
                        <span>Hire Specialist</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl" id="engineers-no-results">
                <User className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-900 mb-1">No matching technicians located</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Try clearing your search filters or add a new qualified industrial engineer via the admin gate option.
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-blue-600 underline mt-3 hover:text-blue-500"
                  >
                    Reset Filter Search
                  </button>
                )}
              </div>
            )}

          </div>

          {/* Right sidebar form (Col Right: spans 4, renders ONLY if admin modes unlocked, making addition highly ergonomic!) */}
          {isAdminMode && isAdminUnlocked && (
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm sticky top-6 animate-in fade-in slide-in-from-right-3 duration-300">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                  <PlusCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>Add Custom Engineer Profile</span>
                </h3>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Submit critical details and technical competencies. Persisted directly to storage.
                </p>
              </div>

              {adminFeedback && (
                <div className="rounded-xl bg-slate-900/95 text-xs text-emerald-400 p-3.5 font-sans leading-normal border border-slate-800">
                  ✔ {adminFeedback}
                </div>
              )}

              <form onSubmit={handleAddNewEngineer} className="space-y-4">
                
                {/* Full Name input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Kamrul Islam"
                    value={newEngName}
                    onChange={(e) => setNewEngName(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                {/* Age & Phone in layout side-by-side */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Age (Years)</label>
                    <input
                      type="number"
                      required
                      min={20}
                      max={70}
                      placeholder="e.g. 34"
                      value={newEngAge}
                      onChange={(e) => setNewEngAge(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +8801538005352"
                      value={newEngPhone}
                      onChange={(e) => setNewEngPhone(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Skills tags field split by commas */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Specializations (Comma Separated)</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. PFI maintenance, Gas Calibration, Substation repair"
                    value={newEngSkills}
                    onChange={(e) => setNewEngSkills(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans resize-none"
                  />
                  <p className="text-[9px] text-slate-400 leading-normal">
                    Input multiple technical proficiencies separated by commas. Each entry generates a highlighted tag.
                  </p>
                </div>

                {/* Availability status radio selectors */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Availability Status</label>
                  <div className="flex gap-4 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold cursor-pointer">
                      <input
                        type="radio"
                        checked={newEngAvailable === true}
                        onChange={() => setNewEngAvailable(true)}
                        className="text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>Available</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold cursor-pointer">
                      <input
                        type="radio"
                        checked={newEngAvailable === false}
                        onChange={() => setNewEngAvailable(false)}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span>Busy/On Duty</span>
                    </label>
                  </div>
                </div>

                {/* Submit additions button */}
                <button
                  type="submit"
                  className="w-full text-center flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-bold text-xs py-3 hover:bg-emerald-500 active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-emerald-600/10"
                >
                  <PlusCircle className="h-4 w-4 shrink-0" />
                  <span>Save Profile</span>
                </button>

              </form>
            </div>
          )}

        </div>

      </div>

      {/* Interactive Modal: Hiring Form overlay popup details */}
      <AnimatePresence>
        {selectedEngForHire && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto" id="hire-modal-backdrop">
            <motion.div
              id="hire-modal-box"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-lg shadow-2xl relative space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEngForHire(null)}
                className="absolute right-4.5 top-4.5 rounded-full p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title Header */}
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
                  <Briefcase className="h-3 w-3 text-blue-500" />
                  <span>Assigned Professional Assignment</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 font-sans leading-snug">
                  Hire Specialist: {selectedEngForHire.name}
                </h3>
                <div className="flex items-center gap-1.5 pt-0.5 text-xs text-slate-600">
                  <Smartphone className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>Direct Hotline: <a href={`tel:${selectedEngForHire.phone}`} className="font-mono font-bold text-blue-600 hover:underline">{selectedEngForHire.phone}</a></span>
                </div>
                <p className="text-xs text-slate-500 leading-normal pt-1">
                  Reserve this engineer directly to handle on-site power calibrations, testing, and operations.
                </p>
              </div>

              {/* Confirmation status feedback */}
              {hireFeedbackMsg ? (
                <div className="space-y-4 text-center py-6">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                    <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans px-2">
                    {hireFeedbackMsg}
                  </p>
                  <p className="text-[10px] text-slate-400 animate-pulse uppercase font-bold tracking-widest font-mono">
                    Closing modal helper screen...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHireSubmit} className="space-y-4">
                  
                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Client Company/Organization Name</label>
                    <input
                      type="text"
                      required
                      value={hireCompanyName}
                      onChange={(e) => setHireCompanyName(e.target.value)}
                      placeholder="e.g. Hamim Textile Mills Ltd."
                      className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  {/* Phone and Location row */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Contact Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={hirePhone}
                        onChange={(e) => setHirePhone(e.target.value)}
                        placeholder="e.g. +8801XXXXXXXXX"
                        className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Facility District</label>
                      <select
                        value={hireLocation}
                        onChange={(e) => setHireLocation(e.target.value)}
                        className="w-full appearance-none text-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                      >
                        {BANGLADESH_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>{dist}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Urgency Priority check */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Priority / Urgency Class</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Routine', 'Urgent', 'Emergency 24/7'].map((prio) => (
                        <button
                          key={prio}
                          type="button"
                          onClick={() => setHirePriority(prio as any)}
                          className={`rounded-lg py-2 text-center text-[10px] font-bold border transition-colors cursor-pointer ${
                            hirePriority === prio
                              ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {prio}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Description */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider block">Brief Job Specifications</label>
                    <textarea
                      required
                      rows={3}
                      value={hireDetails}
                      onChange={(e) => setHireDetails(e.target.value)}
                      placeholder="Describe target system issues, generator symptoms, required certifications, or special schedule outlines..."
                      className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans resize-none"
                    />
                  </div>

                  {/* Action Call Controls */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedEngForHire(null)}
                      className="flex-1 text-center rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs py-3 hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 text-center rounded-xl bg-blue-600 text-white font-bold text-xs py-3 hover:bg-blue-500 cursor-pointer shadow-sm shadow-blue-600/15"
                    >
                      Confirm Hire
                    </button>
                  </div>

                </form>
              )}

              {/* Informative footer safeguard check badge */}
              <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-150 text-[10px] text-slate-500 leading-normal">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Upon booking submission, {selectedEngForHire.name}'s response slot is locked and our technical dispatch desk will contact your company immediately with an estimated mobilization time.
                </span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
