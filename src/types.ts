export type ServiceCategory = 'it_security' | 'hvac_electrical' | 'industrial' | 'infrastructure';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDesc: string;
  details: string[];
  features: string[];
}

export type TrackingStatus = 'Received' | 'Assigned' | 'In Progress' | 'Inspection' | 'Completed' | 'Cancelled';

export interface TrackingHistory {
  timestamp: string;
  status: TrackingStatus;
  note: string;
  location: string;
}

export interface TrackingItem {
  trackingId: string;
  customerName: string;
  phone: string;
  serviceType: string;
  location: string;
  status: TrackingStatus;
  priority: 'Routine' | 'Urgent' | 'Emergency 24/7';
  assignedTech: string;
  estimatedCompletion: string;
  createdAt: string;
  updates: TrackingHistory[];
}

export interface BookingFormInput {
  companyName: string;
  phone: string;
  serviceType: string;
  location: string;
  details: string;
  priority: 'Routine' | 'Urgent' | 'Emergency 24/7';
}

export interface ProjectRecord {
  id: string;
  title: string;
  clientName: string;
  district: string;
  category: ServiceCategory;
  status: 'Completed' | 'Ongoing';
  year: string;
}

export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  age: number;
  phone: string;
  rating: number;
  completedProjects: number;
  available: boolean;
}

