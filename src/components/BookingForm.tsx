import React, { useState, useEffect } from 'react';
import { BANGLADESH_DISTRICTS } from '../data';
import { BookingFormInput, TrackingItem } from '../types';
import { 
  Building2, 
  Phone, 
  MapPin, 
  Settings, 
  CheckCircle, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Activity,
  UserCheck
} from 'lucide-react';

interface BookingFormProps {
  preselectedService: string;
  onBookingSuccess: (newTrackItem: TrackingItem) => void;
}

export default function BookingForm({ preselectedService, onBookingSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormInput>({
    companyName: '',
    phone: '',
    serviceType: '',
    location: '',
    details: '',
    priority: 'Routine',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<TrackingItem | null>(null);

  // Synchronize pre-selected service from the Services section
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService]);

  const serviceOptions = [
    'Corporate IT & Security (CCTV setup)',
    'Corporate IT & Security (Biometric Access Control)',
    'HVAC & Electrical (Central AC servicing)',
    'HVAC & Electrical (Substation & Generator repair)',
    'Industrial Support (Machinery calibration)',
    'Industrial Support (PFI Panel maintenance)',
    'Infrastructure Care (Commercial Renovation & Masonry)',
    'Infrastructure Care (Industrial Piping & Fire Suppressors)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.phone || !formData.serviceType || !formData.location) {
      return; // Fallback validation
    }

    setIsSubmitting(true);

    // Simulate database write interval
    setTimeout(() => {
      // Create a unique real-time tracking element
      const generatedId = `MHD-${Math.floor(1000 + Math.random() * 9000)}`;
      const currentDate = new Date().toISOString().split('T')[0];
      const currentTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newTrackingRecord: TrackingItem = {
        trackingId: generatedId,
        customerName: formData.companyName,
        phone: formData.phone,
        serviceType: formData.serviceType,
        location: formData.location,
        status: 'Received',
        priority: formData.priority,
        assignedTech: 'Triage team (Engineer pending assignation)',
        estimatedCompletion: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days
        createdAt: currentDate,
        updates: [
          {
            timestamp: `${currentDate} ${currentTimeString}`,
            status: 'Received',
            note: `Booking request successfully created via web client. Location is marked as ${formData.location}. Dispatch desk has scheduled critical triage analysis.`,
            location: 'Central Dhaka Desk, Jatrabari'
          }
        ]
      };

      // Call parent feedback
      onBookingSuccess(newTrackingRecord);
      setSuccessReceipt(newTrackingRecord);
      setIsSubmitting(false);

      // Reset form variables
      setFormData({
        companyName: '',
        phone: '',
        serviceType: '',
        location: '',
        details: '',
        priority: 'Routine',
      });
    }, 1200);
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="book">
      <div className="mx-auto max-w-4xl">
        
        {/* Header Text */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
            BOOK A SERVICE
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
            Schedule Professional Support
          </h2>
          <p className="text-slate-500 text-sm">
            Fill in the dispatcher request coordinates below. Our technical supervisor will place a confirmation telephone call within 15 minutes of submission.
          </p>
        </div>

        {/* If successfully submitted progress receipt */}
        {successReceipt ? (
          <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/70 p-6 sm:p-10 animate-in zoom-in-95 duration-200 shadow-lg text-slate-900 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-950">
                  Request Dispatched Successfully!
                </h3>
                <p className="text-xs text-slate-600">
                  Your reference ticket has been committed to our live database for 20Districts dispatch.
                </p>
              </div>
            </div>

            {/* Simulated Receipt details block */}
            <div className="rounded-xl border border-emerald-200 bg-white p-5 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-2.5">
                <span className="font-bold text-slate-400">TRACKING REF ID:</span>
                <span className="rounded bg-indigo-100 px-3 py-1 font-bold text-indigo-800 text-sm animate-pulse">
                  {successReceipt.trackingId}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <span className="text-slate-400">Customer:</span> <span className="text-slate-800 font-semibold">{successReceipt.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400">Contact Telephone:</span> <span className="text-slate-800 font-semibold">{successReceipt.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400">Service Category:</span> <span className="text-slate-800 font-semibold">{successReceipt.serviceType}</span>
                </div>
                <div>
                  <span className="text-slate-400">Assigned Base:</span> <span className="text-slate-800 font-semibold">{successReceipt.location}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Recommended Action:</span> Highlight and copy the Tracking ID above. Go to the top menu and click <strong>Item Tracking</strong> to view physical dispatcher deployment checklists!
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('tracking-terminal-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold px-6 py-3.5 text-xs sm:text-sm text-center shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Track This Order Now</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </button>
              <button
                onClick={() => setSuccessReceipt(null)}
                className="rounded-xl border border-slate-300 hover:bg-white px-5 py-3 text-xs sm:text-sm text-center font-bold text-slate-700 font-sans cursor-pointer"
              >
                Book Another Service
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-2xl border border-slate-200/80 bg-slate-50/50 shadow-md space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Field 1: Name / Company Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Name / Company Name *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Building2 className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Enter full name or corporate entity..."
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
              </div>

              {/* Field 2: Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g., +880 1670-672697"
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
              </div>

              {/* Field 3: Service Type Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Service Type (Category) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Settings className="h-4.5 w-4.5" />
                  </span>
                  <select
                    required
                    value={formData.serviceType}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-950 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800 appearance-none"
                  >
                    <option value="" disabled>Select service category...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 4: Location (Dhaka, Rangpur, etc.) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Location (District Support) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin className="h-4.5 w-4.5" />
                  </span>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-950 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  >
                    <option value="" disabled>Select district...</option>
                    {BANGLADESH_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} (District covered)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Field 5: Details and Priority Level Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Project Brief or Repair Symptoms
                </label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  placeholder="Describe electrical leakage, central cooling gas type, camera quantity, or PFI capacitor issues..."
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                />
              </div>

              {/* Priority Selector Pill buttons */}
              <div className="space-y-3.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Response Priority Level
                </label>
                <div className="space-y-2">
                  {[
                    { val: 'Routine' as const, color: 'border-slate-200 hover:border-slate-400', activeBg: 'bg-slate-100 text-slate-900 ring-2 ring-slate-900', icon: <UserCheck className="h-3.5 w-3.5 text-slate-600" /> },
                    { val: 'Urgent' as const, color: 'border-blue-100 hover:border-blue-400', activeBg: 'bg-blue-50 text-blue-900 ring-2 ring-blue-500', icon: <Activity className="h-3.5 w-3.5 text-blue-500" /> },
                    { val: 'Emergency 24/7' as const, color: 'border-red-100 hover:border-red-400', activeBg: 'bg-red-50 text-red-900 ring-2 ring-red-500', icon: <ShieldAlert className="h-3.5 w-3.5 text-red-500 animate-pulse" /> }
                  ].map((prio) => (
                    <button
                      key={prio.val}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: prio.val }))}
                      className={`w-full text-left rounded-xl border p-3 flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                        formData.priority === prio.val ? prio.activeBg : `bg-white text-slate-600 ${prio.color}`
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {prio.icon}
                        {prio.val}
                      </span>
                      {formData.priority === prio.val && <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Operational notice */}
            <div className="flex gap-2.5 rounded-xl bg-blue-500/5 p-4 border border-blue-500/10 text-xs text-blue-900">
              <Clock className="h-4.5 w-4.5 shrink-0 text-blue-600 self-start mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Immediate Dispatch Notification:</span> Submissions with <strong>Emergency 24/7</strong> priority send automated SMS triggers directly to our emergency technician fleet standby unit based in Jatrabari. Gas or high voltage faults are answered inside 30 minutes in Dhaka metro.
              </div>
            </div>

            {/* Submission triggers */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold px-8 py-4 text-sm transition-all shadow-md focus:ring-2 focus:ring-slate-950 disabled:bg-slate-400 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Registering Dispatch Ref...
                  </span>
                ) : (
                  'Submit Servicing Request'
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </section>
  );
}
