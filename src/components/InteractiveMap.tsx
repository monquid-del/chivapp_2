import React from 'react';
import { Navigation, MapPin } from 'lucide-react';

interface InteractiveMapProps {
  progress?: number; // 0 to 100
  interactive?: boolean;
  compact?: boolean;
  showPickup?: boolean;
  showDestination?: boolean;
  pickupLabel?: string;
  destinationLabel?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  progress = 42,
  interactive = true,
  compact = false,
  showPickup = true,
  showDestination = true,
  pickupLabel = 'Alfama',
  destinationLabel = 'Marquês de Pombal',
}) => {
  // Waypoints along the Lisbon route from Alfama (bottom right) to Marquês de Pombal (top right/center)
  // [x, y] coordinates on a 400x500 coordinate space
  const pathCoordinates = [
    { x: 120, y: 380 }, // Alfama pickup
    { x: 160, y: 360 },
    { x: 180, y: 330 }, // Portas do Sol
    { x: 200, y: 310 }, // Miradouro
    { x: 230, y: 270 }, // Baixa edge
    { x: 260, y: 220 }, // Rossio / Restauradores
    { x: 290, y: 160 }, // Avenida da Liberdade lower
    { x: 310, y: 110 }, // Avenida da Liberdade mid
    { x: 320, y: 75 },  // Marquês de Pombal roundabout
  ];

  // SVG path definition
  const svgPathD = `M 120 380 Q 160 360, 180 330 T 230 270 T 290 160 L 320 75`;

  // Calculate current car position along path based on progress 0-100%
  const getCarPosition = (pct: number) => {
    const clamped = Math.max(0, Math.min(100, pct)) / 100;
    const totalSegments = pathCoordinates.length - 1;
    const index = Math.min(Math.floor(clamped * totalSegments), totalSegments - 1);
    const subProgress = (clamped * totalSegments) - index;
    const p1 = pathCoordinates[index];
    const p2 = pathCoordinates[index + 1];

    const x = p1.x + (p2.x - p1.x) * subProgress;
    const y = p1.y + (p2.y - p1.y) * subProgress;
    
    // Approximate rotation angle (heading)
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    return { x, y, angle };
  };

  const carPos = getCarPosition(progress);

  return (
    <div className={`relative w-full overflow-hidden select-none bg-[#EAF2ED] ${compact ? 'h-36 rounded-2xl border border-slate-200' : 'h-full min-h-[360px]'}`}>
      {/* SVG Canvas Map */}
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.4" />
          </filter>

          <pattern id="streetGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D7E6DC" strokeWidth="1" />
          </pattern>
        </defs>

        {/* City background mesh */}
        <rect width="100%" height="100%" fill="#E9F1EC" />
        <rect width="100%" height="100%" fill="url(#streetGrid)" opacity="0.6" />

        {/* River Tagus waterfront area (lower left) */}
        <path
          d="M 0 420 Q 80 430, 160 450 T 400 480 L 400 500 L 0 500 Z"
          fill="#C7E1F2"
          opacity="0.8"
        />
        <text x="32" y="480" fill="#60A5FA" fontSize="11" fontWeight="600" opacity="0.7">
          Rio Tejo
        </text>

        {/* Lisbon Parks & Hills (Eduardo VII Park at top) */}
        <path
          d="M 280 10 Q 320 5, 360 20 L 370 70 Q 310 90, 270 50 Z"
          fill="#D1E7D6"
          opacity="0.9"
        />
        <text x="300" y="45" fill="#4B7E58" fontSize="9" fontWeight="600" opacity="0.65">
          Parque Eduardo VII
        </text>

        {/* Castelo de S. Jorge Hill */}
        <ellipse cx="140" cy="300" rx="45" ry="35" fill="#DFEFE3" opacity="0.8" />
        <text x="110" y="300" fill="#4B7E58" fontSize="9" fontWeight="600" opacity="0.65">
          Castelo de S. Jorge
        </text>

        {/* Major Lisbon thoroughfares */}
        {/* Avenida da Liberdade */}
        <line x1="220" y1="280" x2="330" y2="70" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
        <line x1="220" y1="280" x2="330" y2="70" stroke="#CFDFD5" strokeWidth="1" />

        {/* Waterfront drive */}
        <line x1="0" y1="410" x2="400" y2="440" stroke="#FFFFFF" strokeWidth="8" />

        {/* Connecting arteries */}
        <path d="M 80 390 L 150 360 L 220 280 L 180 200 L 290 160" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" />
        <path d="M 290 160 L 380 200" fill="none" stroke="#FFFFFF" strokeWidth="5" />
        <path d="M 320 75 L 390 60" fill="none" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M 320 75 L 240 40" fill="none" stroke="#FFFFFF" strokeWidth="6" />

        {/* Marquês de Pombal Roundabout */}
        <circle cx="320" cy="75" r="16" fill="#FFFFFF" stroke="#D1E0D7" strokeWidth="2" />
        <circle cx="320" cy="75" r="8" fill="#D1E7D6" />

        {/* Active Carpool Route Polyline */}
        <path
          d={svgPathD}
          fill="none"
          stroke="#0284C7"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#routeGlow)"
        />
        <path
          d={svgPathD}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pickup Pin - Alfama */}
        {showPickup && (
          <g transform="translate(120, 380)">
            <circle cx="0" cy="0" r="14" fill="#0284C7" fillOpacity="0.18" className="animate-ping" />
            <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
            <circle cx="0" cy="0" r="3.5" fill="#0284C7" />
          </g>
        )}

        {/* Destination Pin - Marquês de Pombal */}
        {showDestination && (
          <g transform="translate(320, 75)">
            <circle cx="0" cy="0" r="10" fill="#15803D" fillOpacity="0.2" />
            <circle cx="0" cy="0" r="6" fill="#15803D" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        )}

        {/* Moving Car Icon along Route */}
        <g
          transform={`translate(${carPos.x}, ${carPos.y}) rotate(${carPos.angle + 90})`}
          className="transition-all duration-300 ease-out"
        >
          {/* Subtle radar pulse around car */}
          <circle cx="0" cy="0" r="18" fill="#0284C7" fillOpacity="0.2" />
          {/* Car body */}
          <rect x="-8" y="-14" width="16" height="28" rx="5" fill="#1E293B" />
          {/* Windshield */}
          <rect x="-6" y="-8" width="12" height="6" rx="1.5" fill="#38BDF8" />
          {/* Headlights */}
          <circle cx="-5" cy="-13" r="1.5" fill="#FDE047" />
          <circle cx="5" cy="-13" r="1.5" fill="#FDE047" />
          {/* Taillights */}
          <circle cx="-5" cy="13" r="1.5" fill="#EF4444" />
          <circle cx="5" cy="13" r="1.5" fill="#EF4444" />
        </g>
      </svg>

      {/* Street / District Badges */}
      {!compact && (
        <>
          <div className="absolute bottom-28 left-4 pointer-events-none bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 shadow-sm border border-slate-200/60 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {pickupLabel}
          </div>
          <div className="absolute top-16 right-4 pointer-events-none bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 shadow-sm border border-slate-200/60 flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-emerald-600" />
            {destinationLabel}
          </div>
        </>
      )}

      {/* Recenter & Layer controls */}
      {interactive && !compact && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition"
            title="Recenter location"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Navigation className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      )}
    </div>
  );
};
