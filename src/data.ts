import { ServiceItem, TrackingItem, ProjectRecord, Engineer } from './types';

export const SERVICE_CATEGORIES = [
  { id: 'all' as const, label: 'All Fields' },
  { id: 'it_security' as const, label: 'Corporate IT & Security' },
  { id: 'hvac_electrical' as const, label: 'HVAC & Electrical' },
  { id: 'industrial' as const, label: 'Industrial Support' },
  { id: 'infrastructure' as const, label: 'Infrastructure Care' },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'it-cctv',
    category: 'it_security',
    title: 'High-Definition CCTV Setup',
    shortDesc: '24/7 panoramic IP and coaxial camera integrations for physical corporate security.',
    details: [
      'Multi-floor network cabling and video recording center designs',
      'Smart mobile streaming alerts with optical motion sensing',
      'Remote backup configuration on cloud security servers',
      'High frame rate infrared night vision surveillance audits'
    ],
    features: ['IP Cameras', 'NVR Integration', 'Night Vision IP67', 'Mobile Feeds']
  },
  {
    id: 'it-access',
    category: 'it_security',
    title: 'Biometric Access Control Systems',
    shortDesc: 'State-of-the-art secure entrance scanners and employee activity log tracking.',
    details: [
      'Fingerprint, face recognition, and RFID cards implementation',
      'Automated fire drill failsafe door unlocking configurations',
      'Real-time attendance software exports and API bindings',
      'Magnetic lock installation for server rooms and executive floors'
    ],
    features: ['Facial Recognition', 'RFID Card Integration', 'Failsafe Access', 'Attendance Sync']
  },
  {
    id: 'hvac-ac',
    category: 'hvac_electrical',
    title: 'Central VRF & Split AC Servicing',
    shortDesc: 'Energy-optimized cooling and airflow maintenance for office floors and production halls.',
    details: [
      'Variable Refrigerant Flow (VRF) diagnostics and mechanical overhauls',
      'Deep coil cleaning, filter sterilization, and chemical descaling',
      'Eco-friendly refrigerant gas top-ups (R-410A / R-32)',
      'Thermostat controls optimization for low electricity draw'
    ],
    features: ['VRF Inspection', 'Deep Coil Cleaning', 'Coolant Recharge', 'Energy Audits']
  },
  {
    id: 'hvac-gen',
    category: 'hvac_electrical',
    title: 'Electrical Substation & Generator Repairs',
    shortDesc: 'Critical backup power solutions and Transformer/Generator servicing to prevent downtime.',
    details: [
      'Transformer oil testing, filtration, and dehydration services',
      'Diesel generator preventive maintenance (filters, lube oil, injectors)',
      'Automatic Transfer Switch (ATS) repair and diagnostics',
      'High-voltage switchgear calibration and safety audits'
    ],
    features: ['ATS Diagnostics', 'Lube Oil Analysis', 'Substation Auditing', 'Load Bank Tests']
  },
  {
    id: 'ind-cal',
    category: 'industrial',
    title: 'Precision Machinery Calibration',
    shortDesc: 'Sensor, meter, and CNC controller alignments matching international ISO metrics.',
    details: [
      'Digital load cell calibration and industrial pressure/temp sensors',
      'High-precision optical laser motor axis configurations',
      'Detailed analytical safety certificate delivery',
      'Pneumatic and hydraulic pressure gauge alignment cycles'
    ],
    features: ['ISO Compliance', 'Laser Alignment', 'Pneumatics Certified', 'Traceable Records']
  },
  {
    id: 'ind-pfi',
    category: 'industrial',
    title: 'PFI Panel Maintenance & Redesign',
    shortDesc: 'Power Factor Improvement panels to eliminate electrical reactive loss and utility fines.',
    details: [
      'Heavy-duty magnetic contactor and capacitor bank status inspections',
      'Microprocessor-controlled PFI relay reprogramming sessions',
      'Busbar thermal imaging audits to detect high resistance contact zones',
      'Safety breaker upgrading & harmonic distortion filtering'
    ],
    features: ['Capacitor Analysis', 'Harmonic Filters', 'Contactors Diagnostics', 'Relay Calibrations']
  },
  {
    id: 'infra-ren',
    category: 'infrastructure',
    title: 'Commercial Renovation & Masonry Care',
    shortDesc: 'Heavy-duty paintwork, tile works, and structural touch-ups for industrial buildings.',
    details: [
      'Anti-dust epoxy floor coating application for production lines',
      'Reinforced wall repair & damp-proofing treatment (water barrier)',
      'Premium corporate workspace partitioning with acoustic wood panels',
      'Safety staircase upgrading & structural loading verification'
    ],
    features: ['Epoxy Flooring', 'Damp-Proofing', 'Acoustic Partitioning', 'Structural Audits']
  },
  {
    id: 'infra-plumb',
    category: 'infrastructure',
    title: 'Industrial Piping & Fire Suppressors',
    shortDesc: 'Professional high-pressure water supply, gas pipelines, and fire protection systems.',
    details: [
      'Corrosion-resistant PPR / UPVC piping system deployments',
      'Wet riser and automated sprinkler system zone testing',
      'High-capacity centrifugal emergency backup pump servicing',
      'Sewerage drainage layout redesign and sediment cleaning'
    ],
    features: ['PPR/UPVC Piping', 'Automated Sprinklers', 'Pump Servicing', 'Drainage Design']
  }
];

export const PRELOADED_TRACKING: TrackingItem[] = [
  {
    trackingId: 'MHD-8893',
    customerName: 'Aman Garments Export Ltd',
    phone: '+880 1711-223344',
    serviceType: 'Corporate IT & Security (CCTV setup)',
    location: 'Dhaka (Gazipur Industrial Zone)',
    status: 'In Progress',
    priority: 'Urgent',
    assignedTech: 'Engr. Kamrul Hasan, Lead Systems Engineer',
    estimatedCompletion: '2026-06-16',
    createdAt: '2026-06-12',
    updates: [
      {
        timestamp: '2026-06-12 10:00 AM',
        status: 'Received',
        note: 'Order details successfully captured. Assigned dispatcher to prepare logistics.',
        location: 'Dhaka Central Hub, Jatrabari'
      },
      {
        timestamp: '2026-06-12 02:30 PM',
        status: 'Assigned',
        note: 'Engr. Kamrul Hasan dispatched. Initial site layout audit report compiled.',
        location: 'Gazipur, Dhaka'
      },
      {
        timestamp: '2026-06-13 11:15 AM',
        status: 'In Progress',
        note: '32-channel fiber infrastructure routed successfully. Mounting weather-resistant IP cameras.',
        location: 'Gazipur, Dhaka'
      }
    ]
  },
  {
    trackingId: 'MHD-5029',
    customerName: 'United Heights Tower Complex',
    phone: '+880 1819-556677',
    serviceType: 'HVAC & Electrical (Central VRF AC Servicing)',
    location: 'Dhaka (Uttara Sector 11)',
    status: 'Inspection',
    priority: 'Emergency 24/7',
    assignedTech: 'Engr. Mainul Islam & Team',
    estimatedCompletion: '2026-06-14',
    createdAt: '2026-06-13',
    updates: [
      {
        timestamp: '2026-06-13 08:30 AM',
        status: 'Received',
        note: 'Emergency cooling failure reported in Building B. Immediate crew mobilized.',
        location: 'Dhaka Central Hub, Jatrabari'
      },
      {
        timestamp: '2026-06-13 09:15 AM',
        status: 'Assigned',
        note: 'HVAC specialized rapid-response dispatch. Gas leaks check equipment on board.',
        location: 'Jatrabari Main Depot'
      },
      {
        timestamp: '2026-06-13 12:40 PM',
        status: 'In Progress',
        note: 'Identified condenser tube leak in main VRF. Welded leak zone, pressure testing lines under vacuum.',
        location: 'Uttara, Dhaka'
      },
      {
        timestamp: '2026-06-14 10:00 AM',
        status: 'Inspection',
        note: 'System pressurized with nitrogen 24 hours. Cooling performance currently under log auditing.',
        location: 'Uttara, Dhaka'
      }
    ]
  },
  {
    trackingId: 'MHD-1104',
    customerName: 'Dhaka Spinning & Weaving Mills',
    phone: '+880 1552-889900',
    serviceType: 'Industrial Support (PFI Panel Maintenance)',
    location: 'Rangpur (Sadipukur City)',
    status: 'Completed',
    priority: 'Routine',
    assignedTech: 'Engr. Jamil Akhtar, Industrial Power Specialist',
    estimatedCompletion: '2026-06-11',
    createdAt: '2026-06-09',
    updates: [
      {
        timestamp: '2026-06-09 11:00 AM',
        status: 'Received',
        note: 'Low power factor (0.78) reported, resulting in billing penalties. Booked schedule for PFI recalibration.',
        location: 'Dhaka Office'
      },
      {
        timestamp: '2026-06-10 09:00 AM',
        status: 'Assigned',
        note: 'Materials dispatch completed. 50 KVAR heavy-duty replacement capacitor cylinders prepared.',
        location: 'Dhaka Warehouse'
      },
      {
        timestamp: '2026-06-11 01:20 PM',
        status: 'In Progress',
        note: 'Replaced failed capacitors & re-torqued busbar connections. Recalibrated PFI automatic regulator relay.',
        location: 'Sadipukur, Rangpur'
      },
      {
        timestamp: '2026-06-11 05:45 PM',
        status: 'Completed',
        note: 'Testing complete. Maintained steady 0.98 Cos-Phi power factor on load. No thermal hotspots. Site handed over.',
        location: 'Sadipukur, Rangpur'
      }
    ]
  }
];

export const RECENT_PROJECTS: ProjectRecord[] = [
  {
    id: 'proj-1',
    title: '350KVAR PFI Redesign & Calibration',
    clientName: 'Prime Textile Mills Ltd.',
    district: 'Narayanganj',
    category: 'industrial',
    status: 'Completed',
    year: '2026'
  },
  {
    id: 'proj-2',
    title: 'Central VRF AC System Airflow Balancing',
    clientName: 'RBL Tower Corporate headquarter',
    district: 'Dhaka (Gulshan-2)',
    category: 'hvac_electrical',
    status: 'Completed',
    year: '2025'
  },
  {
    id: 'proj-3',
    title: '128-Cam IP Surveillance & Bio-Entry Integration',
    clientName: 'Apex Footwear Compound',
    district: 'Dhaka (Jatrabari Area)',
    category: 'it_security',
    status: 'Completed',
    year: '2026'
  },
  {
    id: 'proj-4',
    title: 'Substation Transformer Dehydration & Breaker retrofitting',
    clientName: 'Beximco Industrial Complex',
    district: 'Gazipur',
    category: 'hvac_electrical',
    status: 'Completed',
    year: '2025'
  },
  {
    id: 'proj-5',
    title: 'Anti-Dust Anti-Static Epoxy Flooring',
    clientName: 'Synthetix Pharma Factory',
    district: 'Chittagong',
    category: 'infrastructure',
    status: 'Ongoing',
    year: '2026'
  }
];

export const BANGLADESH_DISTRICTS = [
  'Dhaka',
  'Chittagong',
  'Gazipur',
  'Narayanganj',
  'Sylhet',
  'Rangpur',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Mymensingh',
  'Cumilla',
  'Jessore',
  'Bogura',
  'Feni',
  'Cox\'s Bazar'
];

export const PRELOADED_ENGINEERS: Engineer[] = [
  {
    id: 'eng-1',
    name: 'Engr. Mahbubur Rahman',
    skills: ['INNIO Jenbacher Gas Engines', 'Diagnostic Calibrations', 'Generator Overhauling'],
    age: 41,
    phone: '+8801538005352',
    rating: 4.9,
    completedProjects: 84,
    available: true
  },
  {
    id: 'eng-2',
    name: 'Engr. Tanvir Ahmed',
    skills: ['PFI Panel Maintenance', 'Capacitor Banks Diagnostics', 'Transformer Dehydration'],
    age: 36,
    phone: '+8801538005352',
    rating: 4.8,
    completedProjects: 62,
    available: true
  },
  {
    id: 'eng-3',
    name: 'Engr. Sajjad Hossain',
    skills: ['Central VRF Systems', 'Split AC Overhauls', 'Airflow Optimization'],
    age: 33,
    phone: '+8801538005352',
    rating: 4.7,
    completedProjects: 49,
    available: false
  },
  {
    id: 'eng-4',
    name: 'Engr. Firoz Mahmud',
    skills: ['Biometric Access Systems', 'High-Definition CCTV Design', 'Network Firewall Audits'],
    age: 29,
    phone: '+8801538005352',
    rating: 4.6,
    completedProjects: 38,
    available: true
  }
];

