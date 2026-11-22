import React, { useState } from 'react';
import { TrackingItem, TrackingStatus, TrackingHistory } from '../types';
import { BANGLADESH_DISTRICTS } from '../data';
import TrackingMap from './TrackingMap';
import { 
  Search, 
  MapPin, 
  User, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Truck, 
  Wrench, 
  BadgeAlert, 
  CalendarDays,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Play
} from 'lucide-react';

interface TrackingTerminalProps {
  trackingItems: TrackingItem[];
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSimulateProgress: (trackingId: string) => void;
}

export default function TrackingTerminal({ 
  trackingItems, 
  searchQuery, 
  onSearchQueryChange,
  onSimulateProgress
}: TrackingTerminalProps) {
  
  const [internalCode, setInternalCode] = useState(searchQuery);
  const [activeItem, setActiveItem] = useState<TrackingItem | null>(
    trackingItems.find(item => item.trackingId === searchQuery) || null
  );
  const [activeTab, setActiveTab] = useState<'timeline' | 'map'>('map');
  const [searchError, setSearchError] = useState('');

  // Sync state with parent search query if specified externally
  React.useEffect(() => {
    if (searchQuery) {
      setInternalCode(searchQuery);
      const found = trackingItems.find(item => item.trackingId.toUpperCase() === searchQuery.toUpperCase());
      if (found) {
        setActiveItem(found);
        setSearchError('');
      } else {
        setSearchError(`Tracking ticket "${searchQuery}" not found. Try one of the demo codes.`);
        setActiveItem(null);
      }
    }
  }, [searchQuery, trackingItems]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = internalCode.trim().toUpperCase();
    if (!formatted) {
      setSearchError('Please fill in a tracking sequence.');
      return;
    }

    const found = trackingItems.find(item => item.trackingId.toUpperCase() === formatted);
    if (found) {
      setActiveItem(found);
      onSearchQueryChange(formatted);
      setSearchError('');
    } else {
      setSearchError(`Reference "${formatted}" is not in our live records yet. Double-check the ID or create a new booking request below!`);
      setActiveItem(null);
    }
  };

  const getStatusColor = (status: TrackingStatus) => {
    switch (status) {
      case 'Received': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assigned': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'In Progress': return 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse';
      case 'Inspection': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Emergency 24/7': return 'bg-red-950 text-red-400 border-red-800';
      case 'Urgent': return 'bg-orange-950 text-orange-400 border-orange-850';
      default: return 'bg-slate-900 text-slate-400 border-slate-800';
    }
  };

  const stepsList: { status: TrackingStatus; label: string; details: string }[] = [
    { status: 'Received', label: '1. Request Received', details: 'Initial ticket logs generated and location triage set.' },
    { status: 'Assigned', label: '2. Engineer Dispatched', details: 'Vehicle loaded and certified supervisor deployed.' },
    { status: 'In Progress', label: '3. active Servicing', details: 'Heavy calibration / parts replacement ongoing.' },
    { status: 'Inspection', label: '4. Quality Audits', details: 'Diagnostic meter logs compiled. Safety confirmation.' },
    { status: 'Completed', label: '5. Technical handover', details: 'Work clearance issued, sign-off metrics done.' }
  ];

  const getStepIndex = (status: TrackingStatus) => {
    return ['Received', 'Assigned', 'In Progress', 'Inspection', 'Completed'].indexOf(status);
  };

  const currentStep = activeItem ? getStepIndex(activeItem.status) : -1;

  return (
    <section className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 text-white relative border-b border-black" id="tracking-terminal-section">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-700 px-3.5 py-1 text-xs font-mono font-bold text-blue-400">
            <Truck className="h-3.5 w-3.5 animate-bounce" />
            <span>Real-Time Order Status and Updates</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-100 font-sans">
            Mahdin Servicing Terminal
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Monitor real-time repair stages, technician dispatch timelines, and component deliveries below. Type key tracking coordinates or choose preloaded items to evaluate the system.
          </p>
        </div>

        {/* Search Engine and Listing panel combo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Search and Ticket list */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                Order Search
              </h3>

              <form onSubmit={handleSearchSubmit} className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={internalCode}
                    onChange={(e) => {
                      setInternalCode(e.target.value);
                      if (e.target.value) setSearchError('');
                    }}
                    placeholder="Enter Order Code (e.g. MHD-5029)..."
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 py-3.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500 font-mono"
                  />
                </div>

                {searchError && (
                  <div className="rounded-lg bg-red-950/30 border border-red-900/40 p-3 text-xs text-red-400 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{searchError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 font-bold py-3 text-white text-xs sm:text-sm tracking-wide transition-colors"
                >
                  Locate Tracking Item
                </button>
              </form>
            </div>

            {/* Quick Listing of All registered Tickets */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                  All Active Tickets ({trackingItems.length})
                </h3>
              </div>
              
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {trackingItems.map((item) => (
                  <button
                    key={item.trackingId}
                    onClick={() => {
                      setActiveItem(item);
                      setInternalCode(item.trackingId);
                      setSearchError('');
                    }}
                    className={`w-full text-left rounded-xl border p-3 flex items-center justify-between text-xs transition-all ${
                      activeItem?.trackingId === item.trackingId 
                        ? 'bg-slate-900 border-indigo-500' 
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-200">{item.trackingId}</span>
                        <span className={`rounded-full px-2 py-0.2 text-[9px] font-bold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[180px] font-sans">
                        {item.customerName}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel: Detailed Real-time Stepper tracking display */}
          <div className="lg:col-span-7">
            {activeItem ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
                
                {/* Active Ticket Header Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl font-black font-mono tracking-tight text-white select-all">
                        {activeItem.trackingId}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${getStatusColor(activeItem.status)}`}>
                        {activeItem.status}
                      </span>
                      <span className={`rounded px-2.5 py-0.5 text-[10px] uppercase font-bold border ${getPriorityStyle(activeItem.priority)}`}>
                        {activeItem.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-300 mt-1 font-sans">
                      Client: {activeItem.customerName}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Service Type: {activeItem.serviceType}
                    </p>
                  </div>

                  {/* Dynamic Simulator action triggers */}
                  <div className="shrink-0 flex items-center">
                    {activeItem.status !== 'Completed' ? (
                      <button
                        onClick={() => onSimulateProgress(activeItem.trackingId)}
                        className="rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 px-3 py-2 text-xs font-bold text-indigo-400 flex items-center gap-1.5 transition-all scroll-smooth"
                        title="Move to next stage"
                      >
                        <Play className="h-3 w-3 fill-indigo-400 text-indigo-400" />
                        <span>Advance Status</span>
                      </button>
                    ) : (
                      <div className="rounded-lg bg-emerald-950/45 border border-emerald-800 px-3 py-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle className="h-4 w-4" />
                        <span>Order Done</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual View Mode Selector Tab bar */}
                <div className="flex border border-slate-800 p-1 bg-slate-950/60 rounded-xl max-w-xs sm:max-w-sm">
                  <button
                    type="button"
                    onClick={() => setActiveTab('map')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold transition-all rounded-lg cursor-pointer ${
                      activeTab === 'map'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Live Tracking Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('timeline')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold transition-all rounded-lg cursor-pointer ${
                      activeTab === 'timeline'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span>Milestones & Logs</span>
                  </button>
                </div>

                {activeTab === 'map' ? (
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                      Live Route Maps Tracker:
                    </h4>
                    <TrackingMap activeItem={activeItem} />
                  </div>
                ) : (
                  <>
                    {/* Vertical Stepper timeline layout */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                        Dispatcher Servicing Milestone Tracker:
                      </h4>

                      <div className="relative border-l border-slate-800 pl-6 ml-3 space-y-6">
                        {stepsList.map((step, idx) => {
                          const isDone = idx < currentStep;
                          const isActive = idx === currentStep;
                          
                          return (
                            <div key={step.status} className="relative">
                              {/* Dot Badge */}
                              <div className={`absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border text-[10px] font-bold ${
                                isDone 
                                  ? 'bg-emerald-600 border-emerald-500 text-white' 
                                  : isActive 
                                    ? 'bg-blue-600 border-blue-500 text-white animate-pulse' 
                                    : 'bg-slate-900 border-slate-800 text-slate-600'
                              }`}>
                                {isDone ? '✓' : idx + 1}
                              </div>

                              <div className="space-y-1">
                                <h5 className={`text-xs font-semibold uppercase tracking-wide ${
                                  isActive ? 'text-blue-400 font-bold' : isDone ? 'text-slate-300' : 'text-slate-600'
                                }`}>
                                  {step.label}
                                </h5>
                                <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                                  {step.details}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline activity updates log history */}
                    <div className="pt-6 border-t border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                        Live Dispatch Activity Logs (Newest First):
                      </h4>

                      <div className="space-y-3">
                        {activeItem.updates.map((upd, keyIdx) => (
                          <div key={keyIdx} className="rounded-lg bg-slate-900 p-3.5 border border-slate-800/80 text-xs leading-relaxed space-y-1.5 font-mono">
                            <div className="flex flex-wrap items-center justify-between gap-2.5 text-[10px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                                {upd.timestamp}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                                {upd.location}
                              </span>
                            </div>
                            <p className="text-slate-300 text-xs font-sans">
                              {upd.note}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Dispatcher parameters */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] text-slate-400 font-mono">
                        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/50">
                          <span className="text-slate-500 block">ASSIGNED ENGINEER:</span>
                          <span className="text-slate-200 font-sans font-semibold">{activeItem.assignedTech}</span>
                        </div>
                        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/50">
                          <span className="text-slate-500 block">EST. COMPLETION DATE:</span>
                          <span className="text-slate-200 font-semibold">{activeItem.estimatedCompletion}</span>
                        </div>
                      </div>

                    </div>
                  </>
                )}

              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/40 p-10 text-center space-y-4 animate-pulse">
                <HelpCircle className="h-12 w-12 text-slate-600 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-300">
                    No Tracking Code Selected
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Type a ticket identifier into the search input (e.g., <strong>MHD-5029</strong>), select one of the active tickets from the list, or submit a booking below to generate one.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
