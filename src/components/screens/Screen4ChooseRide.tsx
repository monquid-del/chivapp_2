import React, { useState } from 'react';
import { ChevronLeft, SlidersHorizontal, Star, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Driver, RidePlan } from '../../types';

interface Screen4ChooseRideProps {
  drivers: Driver[];
  selectedDriver: Driver;
  plan: RidePlan;
  onSelectDriver: (driver: Driver) => void;
  onConfirmDriver: (driver: Driver) => void;
  onBack: () => void;
  onOpenFilter: () => void;
}

export const Screen4ChooseRide: React.FC<Screen4ChooseRideProps> = ({
  drivers,
  selectedDriver,
  plan,
  onSelectDriver,
  onConfirmDriver,
  onBack,
  onOpenFilter,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 overflow-y-auto no-scrollbar">
      {/* Top Header Bar */}
      <div className="px-5 pt-5 sm:pt-3 pb-2 flex items-center justify-between sticky top-0 bg-[#FAF9F5]/95 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-slate-900">Available Rides</h2>
        </div>

        {/* Filter Button */}
        <button
          onClick={onOpenFilter}
          className="py-1.5 px-3 rounded-full bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 active:scale-95 transition flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filter</span>
        </button>
      </div>

      {/* Route & Time Sub-strip */}
      <div className="px-5 py-1 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium truncate">
          <span className="text-[#154331] font-semibold">{plan.origin.split(',')[0]}</span>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">{plan.destination.split(',')[0]}</span>
        </div>
        <div className="text-[11px] text-slate-500 shrink-0 font-medium ml-2">
          Today, 5:30 PM
        </div>
      </div>

      {/* Driver Cards List */}
      <div className="px-5 py-3 space-y-3.5 flex-1">
        {drivers.map((driver) => {
          const isSelected = selectedDriver.id === driver.id;
          return (
            <div
              key={driver.id}
              onClick={() => onSelectDriver(driver)}
              className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer shadow-xs relative ${
                isSelected
                  ? 'border-[#154331] ring-2 ring-[#154331]/15 shadow-sm'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Top Row: Driver Profile & Price */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900">{driver.name}</span>
                      {driver.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-0.5 font-semibold text-amber-600">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {driver.rating}
                      </span>
                      <span>({driver.ridesCount} rides)</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{driver.proximityMinutes} min away • On time</span>
                    </div>
                  </div>
                </div>

                {/* Price / Points Badge */}
                <div className="text-right">
                  <div className="text-base font-extrabold text-[#154331]">
                    {driver.price === 0 ? 'Free' : `€${driver.price}`}
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600 flex items-center justify-end gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    +{driver.pointsEarned} pts
                  </div>
                </div>
              </div>

              {/* Middle Row: Route Timeline */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2.5 text-xs text-slate-700">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="w-0.5 h-4 bg-slate-200" />
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="text-[11px] font-medium text-slate-600 flex justify-between">
                    <span>{driver.departureLocation}</span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-900 flex justify-between">
                    <span>{driver.destinationLocation}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Book This Ride */}
              {isSelected ? (
                <div className="mt-3.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onConfirmDriver(driver);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#154331] hover:bg-[#1C533E] active:scale-[0.98] transition text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book This Ride</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mt-2 text-right">
                  <span className="text-[11px] font-semibold text-[#154331] hover:underline">
                    View details →
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
