import React, { useState } from 'react';
import { RECENT_PROJECTS } from '../data';
import { ServiceCategory } from '../types';
import { 
  FolderGit2, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  CheckCircle 
} from 'lucide-react';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');

  const filteredProjects = filter === 'all' 
    ? RECENT_PROJECTS 
    : RECENT_PROJECTS.filter(p => p.category === filter);

  const getCategoryLabel = (cat: ServiceCategory) => {
    switch (cat) {
      case 'it_security': return 'IT & Security';
      case 'hvac_electrical': return 'HVAC & Electrical';
      case 'industrial': return 'Industrial Support';
      case 'infrastructure': return 'Infrastructure Care';
    }
  };

  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="projects">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
              PORTFOLIO OF TRUST
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Our Completed Maintenance Projects
            </h2>
            <p className="text-slate-600 text-sm">
              We operate across 20+ districts in Bangladesh. Explore mechanical diagnostics, PFI upgrades, security grid mountings, and central HVAC renovations completed for our clients.
            </p>
          </div>

          {/* Category Filter Selector Panel */}
          <div className="flex flex-wrap gap-1.5 shrink-0 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            {[
              { id: 'all' as const, label: 'All Projects' },
              { id: 'it_security' as const, label: 'IT' },
              { id: 'hvac_electrical' as const, label: 'HVAC' },
              { id: 'industrial' as const, label: 'Industrial' },
              { id: 'infrastructure' as const, label: 'Infrastructure' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Listing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="group rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Meta row */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="rounded bg-slate-100 px-2.5 py-0.5 font-bold text-slate-700">
                    {getCategoryLabel(proj.category)}
                  </span>
                  
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    {proj.year}
                  </span>
                </div>

                {/* Title and Client Details */}
                <div className="space-y-1 font-sans">
                  <h3 className="text-base font-bold text-slate-950 leading-snug group-hover:text-blue-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium font-sans">
                    Client: {proj.clientName}
                  </p>
                </div>
              </div>

              {/* District and Status Row */}
              <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-mono text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  {proj.district}
                </span>

                <span className={`inline-flex items-center gap-1 font-semibold ${
                  proj.status === 'Completed' ? 'text-emerald-700' : 'text-blue-700'
                }`}>
                  {proj.status === 'Completed' ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-blue-500 shrink-0 animate-spin" />
                      <span>Ongoing</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner at the bottom of the section */}
        <div className="mt-12 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 glow-blue text-white">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 justify-center sm:justify-start">
              <FolderGit2 className="h-5 w-5 text-blue-400 shrink-0" />
              Need custom modifications or site diagnostic assessment?
            </h4>
            <p className="text-xs text-slate-400 max-w-xl font-normal">
              We coordinate engineering inspections on location to trace reactive power leakage, insulation breakdown, or fire compliance weaknesses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
            <a 
              href="tel:+88001670672697"
              className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold px-5 py-3.5 text-white text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              Call Engineer Office
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
