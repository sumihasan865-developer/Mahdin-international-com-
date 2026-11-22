import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import EngineerTeam from './components/EngineerTeam';
import ProjectsSection from './components/ProjectsSection';
import TrackingTerminal from './components/TrackingTerminal';
import OfficeLocationSection from './components/OfficeLocationSection';
import FAQ from './components/FAQ';
import BookingForm from './components/BookingForm';
import QuoteEstimator from './components/QuoteEstimator';
import OfficeLocationModal from './components/OfficeLocationModal';
import Footer from './components/Footer';
import ContactWidget from './components/ContactWidget';

import { PRELOADED_TRACKING } from './data';
import { TrackingItem, TrackingStatus, TrackingHistory } from './types';
import { 
  Building2, 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  BellRing,
  Award,
  BookOpenCheck
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [preselectedService, setPreselectedService] = useState('');
  const [trackingItems, setTrackingItems] = useState<TrackingItem[]>(() => {
    try {
      const saved = localStorage.getItem('mahdin_tracking_tickets');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to preloaded tickets if storage is blocked or corrupted
    }
    return PRELOADED_TRACKING;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isOfficeMapModalOpen, setIsOfficeMapModalOpen] = useState(false);

  // Global visual toast alert layout
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'info' | 'success' | 'alert' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mahdin_tracking_tickets', JSON.stringify(trackingItems));
    } catch {
      // ignore storage quota or privacy-mode errors
    }
  }, [trackingItems]);

  const triggerToast = (text: string, type: 'info' | 'success' | 'alert' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleBookingSuccess = (newTrackItem: TrackingItem) => {
    setTrackingItems((prev) => [newTrackItem, ...prev]);
    setSearchQuery(newTrackItem.trackingId);
    triggerToast(`Booking submitted! New Live Track Ticket Generated: ${newTrackItem.trackingId}`, 'success');
  };

  // Simulates real-time dispatcher milestone advancement
  const handleSimulateProgress = (trackingId: string) => {
    setTrackingItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.trackingId !== trackingId) return item;

        const statuses: TrackingStatus[] = ['Received', 'Assigned', 'In Progress', 'Inspection', 'Completed'];
        const currentIndex = statuses.indexOf(item.status);
        if (currentIndex === -1 || currentIndex === statuses.length - 1) {
          return item; // Already completed or invalid
        }

        const nextStatus = statuses[currentIndex + 1];
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const currentDateStr = new Date().toISOString().split('T')[0];

        let simulationNote = '';
        let simulatedTech = item.assignedTech;

        switch (nextStatus) {
          case 'Assigned':
            simulatedTech = 'Engr. Kamrul Hasan & Dispatch Crew B';
            simulationNote = `Dispatcher team assigned. Vehicle #09-D loaded with calibrated testing rigs and dispatched from central hub. Estimated transit hour to site: 45 minutes.`;
            break;
          case 'In Progress':
            simulationNote = `Technicians arrived on-site in ${item.location}. Disconnecting mains power for isolation checks. Heavy recalibration and sensor auditing initiated.`;
            break;
          case 'Inspection':
            simulationNote = `Servicing actions finalized. Mounted multimetre diagnostic test is successful. Standard load test metrics compiled. System holds 100% stable voltage and heat values.`;
            break;
          case 'Completed':
            simulationNote = `Official servicing sign-off completed by client. Warranty seal applied. Digital safety logs sent to primary customer contact phone and mailbox. Site reinstated.`;
            break;
          default:
            simulationNote = `Milestone status modernized to ${nextStatus}.`;
        }

        const freshLog: TrackingHistory = {
          timestamp: `${currentDateStr} ${currentTime}`,
          status: nextStatus,
          note: simulationNote,
          location: item.location
        };

        const updatedItem: TrackingItem = {
          ...item,
          status: nextStatus,
          assignedTech: simulatedTech,
          updates: [freshLog, ...item.updates]
        };

        triggerToast(`Ticket ${trackingId} updated to: ${nextStatus}!`, 'info');
        return updatedItem;
      });
    });
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickTrackSearch = (code: string) => {
    setSearchQuery(code);
    setActiveSection('tracking');
    const el = document.getElementById('tracking-terminal-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreloadBooking = (serviceName: string) => {
    setPreselectedService(serviceName);
    setActiveSection('book');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-900 scroll-smooth">
      
      {/* Absolute Dynamic Slide-in Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-top-12 duration-300">
          <div className={`rounded-2xl border p-4 shadow-xl flex items-start gap-3 text-white ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-900 border-emerald-500' 
              : toastMessage.type === 'alert'
                ? 'bg-rose-900 border-rose-500'
                : 'bg-indigo-950 border-indigo-500'
          }`}>
            <BellRing className="h-5 w-5 shrink-0 text-blue-400 mt-0.5 animate-bounce" />
            <div className="space-y-0.5">
              <span className="font-bold text-xs uppercase font-mono block">Terminal Message</span>
              <p className="text-xs text-slate-100">{toastMessage.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Header element with customized logo */}
      <Header 
        onNavigate={handleNavigate} 
        activeSection={activeSection}
        onOpenTracking={() => {
          const el = document.getElementById('tracking-terminal-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenOfficeMap={() => setIsOfficeMapModalOpen(true)}
      />

      {/* Main Narrative Sequence */}
      <main className="grow">
        
        {/* 1. Hero Section (Introduction, Emergency Dispatch & Quick Order Tracker) */}
        <Hero 
          onScrollToSection={handleNavigate}
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onOpenTracking={() => {
            const el = document.getElementById('tracking-terminal-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickTrackSearch={handleQuickTrackSearch}
        />

        {/* 2. Why Choose Us & Company Credibility / Statistics (About Us) */}
        <WhyChooseUs />

        {/* 3. Direct Service Booking & Dispatch Scheduling Form */}
        <BookingForm 
          preselectedService={preselectedService} 
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 4. Core Industrial Services & Capabilities */}
        <Services onBookService={handlePreloadBooking} />

        {/* 5. Our Certified Engineer Team Directory & Direct Assignment */}
        <EngineerTeam onHireSuccess={handleBookingSuccess} />

        {/* 6. Completed Industrial Projects Portfolio & Case Studies */}
        <ProjectsSection />

        {/* 7. Live Service Tracking Terminal & Logistics Progress */}
        <TrackingTerminal 
          trackingItems={trackingItems}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSimulateProgress={handleSimulateProgress}
        />

        {/* 8. Official Corporate Office & Google Map Location Section */}
        <OfficeLocationSection onOpenModal={() => setIsOfficeMapModalOpen(true)} />

        {/* 9. Frequently Asked Questions (FAQ) & Support Center */}
        <FAQ />

      </main>

      {/* Cost Estimator Drawer Modal */}
      <QuoteEstimator 
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onPreloadBooking={handlePreloadBooking}
      />

      {/* Office Location Interactive Modal */}
      <OfficeLocationModal 
        isOpen={isOfficeMapModalOpen}
        onClose={() => setIsOfficeMapModalOpen(false)}
      />

      {/* 10. Footer Details & 24/7 Operations Hub */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenTracking={() => {
          const el = document.getElementById('tracking-terminal-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenOfficeMap={() => setIsOfficeMapModalOpen(true)}
      />

      {/* Floating WhatsApp and Phone Support Widget */}
      <ContactWidget />

    </div>
  );
}
