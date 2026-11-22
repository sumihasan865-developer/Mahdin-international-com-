import React, { useEffect, useRef, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { TrackingItem } from '../types';
import ErrorBoundary from './ErrorBoundary';
import { 
  MapPin, 
  Truck, 
  Warehouse, 
  Settings, 
  Key, 
  Navigation, 
  Play, 
  Compass,
  AlertTriangle 
} from 'lucide-react';

const API_KEY =
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (typeof process !== 'undefined' && process.env ? process.env.GOOGLE_MAPS_PLATFORM_KEY : '') ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Dhaka Central Hub coordinate (Jatrabari Main Depot)
const HUB_COORDS = { lat: 23.7104, lng: 90.4349 };

// Coordinates for Bangladesh major districts/cities
const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = {
  'Dhaka': { lat: 23.8103, lng: 90.4125 },
  'Chittagong': { lat: 22.3569, lng: 91.7832 },
  'Gazipur': { lat: 23.9999, lng: 90.4203 },
  'Narayanganj': { lat: 23.6238, lng: 90.5000 },
  'Sylhet': { lat: 24.8949, lng: 91.8687 },
  'Rangpur': { lat: 25.7439, lng: 89.2752 },
  'Rajshahi': { lat: 24.3745, lng: 88.6042 },
  'Khulna': { lat: 22.8456, lng: 89.5403 },
  'Barisal': { lat: 22.7010, lng: 90.3535 },
  'Mymensingh': { lat: 24.7471, lng: 90.4203 },
  'Cumilla': { lat: 23.4682, lng: 91.1785 },
  'Jessore': { lat: 23.1664, lng: 89.2081 },
  'Bogura': { lat: 24.8481, lng: 89.3730 },
  'Feni': { lat: 23.0159, lng: 91.3976 },
  "Cox's Bazar": { lat: 21.4272, lng: 91.9702 }
};

// Helper to determine coordinate of a district query
function getCoordinatesForLocation(locString: string) {
  const normalized = locString.toLowerCase();
  for (const [district, coords] of Object.entries(DISTRICT_COORDS)) {
    if (normalized.includes(district.toLowerCase())) {
      return coords;
    }
  }
  return DISTRICT_COORDS['Dhaka']; // fallback to Capital
}

// Helper to interpolate between two LatLng points
function interpolateLatLng(
  p1: { lat: number; lng: number },
  p2: { lat: number; lng: number },
  fraction: number
) {
  const lat = p1.lat + (p2.lat - p1.lat) * fraction;
  const lng = p1.lng + (p2.lng - p1.lng) * fraction;
  return { lat, lng };
}

// Helper to calculate progress fraction based on ticket status
function getProgressFraction(status: string): number {
  switch (status) {
    case 'Received': return 0.05;
    case 'Assigned': return 0.35;
    case 'In Progress': return 0.70;
    case 'Inspection': return 0.90;
    case 'Completed': return 1.0;
    default: return 0.05;
  }
}

// Sub-component that handles drawing routing with fallback polyline
function RouteDisplay({ origin, destination }: {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!map) return;

    // Clear previous routes
    polylinesRef.current.forEach(p => p.setMap(null));
    polylinesRef.current = [];

    const drawDashedFallback = () => {
      if (!window.google) return;
      const line = new google.maps.Polyline({
        path: [origin, destination],
        geodesic: true,
        strokeColor: '#3b82f6',
        strokeOpacity: 0.8,
        strokeWeight: 4.5,
        map: map
      });
      polylinesRef.current = [line];

      // Auto fit coordinates inside map viewport nicely
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(origin);
      bounds.extend(destination);
      map.fitBounds(bounds, 50); // 50px bounds padding
    };

    if (!routesLib) {
      drawDashedFallback();
      return;
    }

    routesLib.Route.computeRoutes({
      origin,
      destination,
      travelMode: 'DRIVING',
      fields: ['path', 'viewport'],
    })
      .then(({ routes }) => {
        if (routes?.[0]) {
          const newPolylines = routes[0].createPolylines();
          newPolylines.forEach(p => p.setMap(map));
          polylinesRef.current = newPolylines;
          if (routes[0].viewport) {
            map.fitBounds(routes[0].viewport, 50);
          }
        } else {
          drawDashedFallback();
        }
      })
      .catch((err) => {
        console.warn('Routes API call failed, drawing straight geodesic bridge line.', err);
        drawDashedFallback();
      });

    return () => {
      polylinesRef.current.forEach(p => p.setMap(null));
    };
  }, [routesLib, map, origin, destination]);

  return null;
}

interface TrackingMapProps {
  activeItem: TrackingItem;
}

export default function TrackingMap({ activeItem }: TrackingMapProps) {
  const destinationCoords = getCoordinatesForLocation(activeItem.location);
  const progressRatio = getProgressFraction(activeItem.status);
  const vehicleCoords = interpolateLatLng(HUB_COORDS, destinationCoords, progressRatio);

  // If no environment secret Google Maps API Key has been supplied
  if (!hasValidKey) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col h-[500px] justify-between relative overflow-hidden" id="sandbox-map-fallback">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none animate-pulse" />
        
        {/* Mock Map Canvas Sandbox Interface */}
        <div className="flex-1 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
          {/* Faux Grid Gridlines */}
          <div className="absolute inset-0 pattern-grid-slate-800 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Animated SVG representation of Bangladesh Geography tracking */}
          <div className="relative w-full max-w-md h-52 flex items-center justify-center my-2 select-none">
            {/* Outline connection line list */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line 
                x1="25%" y1="65%" 
                x2="75%" y2="35%" 
                stroke="#38bdf8" 
                strokeWidth="3" 
                strokeDasharray="8,6" 
                className="animate-[dash_20s_linear_infinite]"
              />
              <circle cx="25%" cy="65%" r="8" fill="#1d4ed8" className="animate-pulse" />
              <circle cx="75%" cy="35%" r="8" fill="#ea580c" className="animate-pulse" />
            </svg>

            {/* Hub Badge */}
            <div className="absolute left-[20%] bottom-[25%] flex flex-col items-center gap-1">
              <div className="rounded-lg bg-blue-600 border border-white px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow">
                DHAKA HUB
              </div>
              <Warehouse className="h-5 w-5 text-blue-400" />
            </div>

            {/* Client Location Badge */}
            <div className="absolute right-[18%] top-[20%] flex flex-col items-center gap-1">
              <div className="rounded-lg bg-orange-600 border border-white px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow">
                {activeItem.location.split(' ')[0].toUpperCase()}
              </div>
              <MapPin className="h-5 w-5 text-orange-500 animate-bounce" />
            </div>

            {/* Courier Dispatch moving vehicle */}
            <div 
              className="absolute flex flex-col items-center gap-1 transition-all duration-1000 ease-in-out"
              style={{
                left: `${25 + (75 - 25) * progressRatio}%`,
                top: `${65 + (35 - 65) * progressRatio}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="rounded-md bg-emerald-500 border border-white px-2 py-0.5 text-[9px] font-mono font-bold text-white shadow-md flex items-center gap-1">
                <Truck className="h-2.5 w-2.5 animate-bounce" />
                <span>{activeItem.status.toUpperCase()}</span>
              </div>
              <Compass className="h-6 w-6 text-emerald-400 animate-[spin_10s_linear_infinite]" />
            </div>
            
            {/* Live Stats Overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-slate-800 rounded-md px-3 py-1 font-mono text-[9px] text-slate-400 flex gap-4">
              <span>LAT: {vehicleCoords.lat.toFixed(4)}</span>
              <span>LNG: {vehicleCoords.lng.toFixed(4)}</span>
              <span>PROG: {Math.round(progressRatio * 100)}%</span>
            </div>
          </div>

          <div className="space-y-2 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-950/60 border border-blue-900/50 px-3 py-1 text-xs font-bold text-blue-400">
              <Navigation className="h-3 w-3 animate-spin" />
              <span>Sandbox Simulation Mode Active</span>
            </span>
            <p className="text-slate-300 text-xs max-w-sm mt-1 leading-relaxed">
              Live location routes for <strong className="text-white">{activeItem.trackingId}</strong> are active. Connect your Google Maps API Key to unlock high-resolution maps.
            </p>
          </div>
        </div>

        {/* Instructions Panel as legally required by Constitution Rule 1 */}
        <div className="mt-4 border-t border-slate-800/80 pt-4 text-xs space-y-3 font-sans">
          <div className="flex items-start gap-2 text-slate-400 leading-relaxed">
            <AlertTriangle className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">To enable real Google Maps display:</p>
              <ol className="list-decimal pl-4 space-y-1 mt-1 font-mono text-[11px] text-slate-400">
                <li>
                  Get a Google Maps API Key: <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Get an API Key</a>
                </li>
                <li>
                  Open <span className="text-slate-200">Settings</span> (⚙️ gear icon, top-right corner)
                </li>
                <li>
                  Click <span className="text-slate-200 font-bold">Secrets</span>, type <code className="text-emerald-400">GOOGLE_MAPS_PLATFORM_KEY</code> as the name
                </li>
                <li>
                  Paste your API key value and hit <span className="text-slate-200">Enter</span>. The app rebuilds instantly!
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Map rendering once the API key is set
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex items-center justify-center h-[500px] text-center text-sm text-slate-300">
          Map view unavailable right now. Please check Milestones &amp; Logs tab for live status.
        </div>
      }
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 h-[500px] flex flex-col" id="real-google-map-tracker">
        <APIProvider apiKey={API_KEY} version="weekly">
        <div className="relative flex-1 rounded-xl overflow-hidden min-h-[300px]">
          <Map
            defaultCenter={HUB_COORDS}
            defaultZoom={8}
            mapId="DEMO_MAP_ID"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
            gestureHandling="cooperative"
            disableDefaultUI={false}
          >
            {/* DHCP Hub Marker (Jatrabari Main Depot) */}
            <AdvancedMarker position={HUB_COORDS} title="Mahdin Jatrabari Depot Central Hub">
              <div className="relative group cursor-pointer">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 border border-white text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap opacity-100 transition-opacity">
                  MAHDIN HUB
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white border-2 border-white shadow-xl">
                  <Warehouse className="h-5 w-5" />
                </div>
              </div>
            </AdvancedMarker>

            {/* Active Client Location Pin */}
            <AdvancedMarker position={destinationCoords} title={`Site: ${activeItem.customerName}`}>
              <div className="relative group cursor-pointer">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-orange-600 border border-white text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap opacity-100 transition-opacity">
                  {activeItem.customerName.split(' ')[0]}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white border-2 border-white shadow-xl animate-bounce">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
            </AdvancedMarker>

            {/* Render Vehicle Tracking Pin unless completed */}
            {activeItem.status !== 'Completed' && (
              <AdvancedMarker position={vehicleCoords} title={`${activeItem.assignedTech} in-transit`}>
                <div className="relative group cursor-pointer">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-600 border border-white text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                    COU-TRK: {activeItem.status}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-white shadow-xl ring-4 ring-emerald-500/25 animate-pulse">
                    <Truck className="h-4.5 w-4.5" />
                  </div>
                </div>
              </AdvancedMarker>
            )}

            {/* Compute route display line dynamic component */}
            <RouteDisplay origin={HUB_COORDS} destination={destinationCoords} />
          </Map>

          {/* Map Overlay Stats Panel */}
          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-300 z-10 select-none">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div>
                <span className="text-slate-500">Live Courier:</span>{' '}
                <span className="text-white font-sans font-bold">{activeItem.trackingId}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-[11px]">
              <div>
                <span className="text-slate-500">Dist:</span>{' '}
                <span className="text-blue-400 font-semibold">{activeItem.location.split(' ')[0]}</span>
              </div>
              <div>
                <span className="text-slate-500">Milestone:</span>{' '}
                <span className="text-emerald-400 font-semibold">{activeItem.status}</span>
              </div>
            </div>
          </div>
        </div>
      </APIProvider>
    </div>
    </ErrorBoundary>
  );
}
