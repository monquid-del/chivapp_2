import React, { useState } from 'react';
import {
  ChevronLeft,
  ArrowUpDown,
  Clock,
  Calendar,
  Repeat,
  Sparkles,
  Search,
  Check,
} from 'lucide-react';
import { InteractiveMap } from '../InteractiveMap';
import { RidePlan, RidePreferences } from '../../types';
import { LISBON_POPULAR_PLACES } from '../../data/mockData';

interface Screen3PlanRideProps {
  plan: RidePlan;
  onUpdatePlan: (updated: Partial<RidePlan>) => void;
  onBack: () => void;
  onFindRides: () => void;
}

export const Screen3PlanRide: React.FC<Screen3PlanRideProps> = ({
  plan,
  onUpdatePlan,
  onBack,
  onFindRides,
}) => {
  const [showOriginPicker, setShowOriginPicker] = useState(false);
  const [showDestPicker, setShowDestPicker] = useState(false);

  const swapLocations = () => {
    onUpdatePlan({
      origin: plan.destination,
      destination: plan.origin,
    });
  };

  const updatePrefs = (key: keyof RidePreferences, val: any) => {
    onUpdatePlan({
      preferences: {
        ...plan.preferences,
        [key]: val,
      },
    });
  };

  const cycleDetour = () => {
    const options = [5, 10, 15, 20];
    const currentIndex = options.indexOf(plan.preferences.maxDetourMinutes);
    const nextIndex = (currentIndex + 1) % options.length;
    updatePrefs('maxDetourMinutes', options[nextIndex]);
  };

  const cycleGender = () => {
    updatePrefs('gender', plan.preferences.gender === 'Any' ? 'Women only' : 'Any');
  };

  const cycleQuiet = () => {
    const options: Array<'Preferred' | 'Chatty' | 'Any'> = ['Preferred', 'Chatty', 'Any'];
    const idx = options.indexOf(plan.preferences.quietRide);
    updatePrefs('quietRide', options[(idx + 1) % options.length]);
  };

  const cyclePets = () => {
    updatePrefs('pets', plan.preferences.pets === 'Okay' ? 'No pets' : 'Okay');
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 relative overflow-hidden">
      {/* Top Map Area (compact for seamless fit without scrolling) */}
      <div className="relative h-[28%] min-h-[140px] w-full shrink-0">
        <InteractiveMap
          progress={20}
          interactive={false}
          compact={false}
          pickupLabel={plan.origin.split(',')[0]}
          destinationLabel={plan.destination.split(',')[0]}
        />

        {/* Back Button Overlay */}
        <button
          onClick={onBack}
          className="absolute top-5 sm:top-3 left-4 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white active:scale-95 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Sheet Card Container */}
      <div className="flex-1 -mt-4 z-10 bg-[#FAF9F5] rounded-t-3xl shadow-xl border-t border-slate-200/80 flex flex-col justify-between overflow-y-auto no-scrollbar px-5 pt-3 pb-3">
        {/* Drag Handle indicator */}
        <div className="w-9 h-1 rounded-full bg-slate-300 mx-auto mb-2 shrink-0" />

        {/* Heading */}
        <h2 className="text-base font-bold text-slate-900">Where are you going?</h2>

        {/* Route Input Box */}
        <div className="mt-2 relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-2.5">
          <div className="flex items-center gap-3">
            {/* Visual Route Nodes */}
            <div className="flex flex-col items-center py-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-3 ring-blue-100" />
              <div className="w-0.5 h-6 bg-slate-200 my-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-3 ring-rose-100" />
            </div>

            {/* Inputs */}
            <div className="flex-1 space-y-2">
              {/* Pickup location */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowOriginPicker(!showOriginPicker)}
                  className="w-full text-left py-1 text-xs font-semibold text-slate-800 hover:text-slate-950 truncate flex items-center justify-between"
                >
                  <span className="truncate">{plan.origin}</span>
                </button>
                {showOriginPicker && (
                  <div className="absolute top-7 left-0 right-0 z-30 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 space-y-0.5 text-xs max-h-40 overflow-y-auto">
                    {LISBON_POPULAR_PLACES.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          onUpdatePlan({ origin: p.name });
                          setShowOriginPicker(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between"
                      >
                        <span className="font-medium text-slate-800">{p.name}</span>
                        {plan.origin === p.name && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100" />

              {/* Destination */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDestPicker(!showDestPicker)}
                  className="w-full text-left py-1 text-xs font-semibold text-slate-800 hover:text-slate-950 truncate flex items-center justify-between"
                >
                  <span className="truncate">{plan.destination}</span>
                </button>
                {showDestPicker && (
                  <div className="absolute top-7 left-0 right-0 z-30 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 space-y-0.5 text-xs max-h-40 overflow-y-auto">
                    {LISBON_POPULAR_PLACES.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          onUpdatePlan({ destination: p.name });
                          setShowDestPicker(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between"
                      >
                        <span className="font-medium text-slate-800">{p.name}</span>
                        {plan.destination === p.name && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Swap button */}
            <button
              onClick={swapLocations}
              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 active:scale-95 transition"
              title="Swap pickup and destination"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* When do you want to travel? */}
        <div className="mt-2">
          <h3 className="text-xs font-bold text-slate-800">When do you want to travel?</h3>
          <div className="grid grid-cols-3 gap-2 mt-1">
            <button
              type="button"
              onClick={() => onUpdatePlan({ travelTimeType: 'Now' })}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98] cursor-pointer ${
                plan.travelTimeType === 'Now'
                  ? 'bg-[#154331] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Now</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdatePlan({ travelTimeType: 'Schedule' })}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98] cursor-pointer ${
                plan.travelTimeType === 'Schedule'
                  ? 'bg-[#154331] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdatePlan({ travelTimeType: 'Recurring' })}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98] cursor-pointer ${
                plan.travelTimeType === 'Recurring'
                  ? 'bg-[#154331] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Recurring</span>
            </button>
          </div>
        </div>

        {/* Preferences (optional) */}
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">Preferences (optional)</h3>
            <span className="text-[10px] text-slate-400">Tap to toggle</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mt-1">
            {/* Max detour */}
            <button
              type="button"
              onClick={cycleDetour}
              className="p-1.5 rounded-xl bg-white border border-slate-200/90 text-center hover:border-slate-300 transition active:scale-95"
            >
              <div className="text-[9px] text-slate-500 font-medium">Max detour</div>
              <div className="text-xs font-bold text-[#154331] mt-0.5">
                {plan.preferences.maxDetourMinutes} min
              </div>
            </button>

            {/* Gender */}
            <button
              type="button"
              onClick={cycleGender}
              className="p-1.5 rounded-xl bg-white border border-slate-200/90 text-center hover:border-slate-300 transition active:scale-95"
            >
              <div className="text-[9px] text-slate-500 font-medium">Gender</div>
              <div className="text-xs font-bold text-[#154331] mt-0.5 truncate">
                {plan.preferences.gender}
              </div>
            </button>

            {/* Quiet ride */}
            <button
              type="button"
              onClick={cycleQuiet}
              className="p-1.5 rounded-xl bg-white border border-slate-200/90 text-center hover:border-slate-300 transition active:scale-95"
            >
              <div className="text-[9px] text-slate-500 font-medium">Quiet ride</div>
              <div className="text-xs font-bold text-[#154331] mt-0.5 truncate">
                {plan.preferences.quietRide}
              </div>
            </button>

            {/* Pets */}
            <button
              type="button"
              onClick={cyclePets}
              className="p-1.5 rounded-xl bg-white border border-slate-200/90 text-center hover:border-slate-300 transition active:scale-95"
            >
              <div className="text-[9px] text-slate-500 font-medium">Pets</div>
              <div className="text-xs font-bold text-[#154331] mt-0.5 truncate">
                {plan.preferences.pets}
              </div>
            </button>
          </div>
        </div>

        {/* Primary CTA: Find Rides (cut in half space to avoid scrolling) */}
        <div className="pt-2 mt-2">
          <button
            onClick={onFindRides}
            className="w-full py-2.5 px-5 rounded-2xl bg-[#154331] hover:bg-[#1C533E] active:scale-[0.98] transition-all text-white font-semibold text-xs tracking-wide shadow-md shadow-[#154331]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Find Rides</span>
          </button>
        </div>
      </div>
    </div>
  );
};
