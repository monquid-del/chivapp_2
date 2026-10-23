import React, { useState } from 'react';
import {
  ChevronLeft,
  MoreHorizontal,
  Star,
  ShieldCheck,
  Car,
  VolumeX,
  CigaretteOff,
  Dog,
  Sparkles,
  ArrowRight,
  Armchair,
} from 'lucide-react';
import { CarSeat, Driver } from '../../types';
import { InteractiveMap } from '../InteractiveMap';
import { SeatSelector } from '../SeatSelector';

interface Screen5RideDetailsProps {
  driver: Driver;
  selectedSeatId: CarSeat['id'];
  onSelectSeat: (seatId: CarSeat['id']) => void;
  onBack: () => void;
  onConfirmAndBook: () => void;
}

export const Screen5RideDetails: React.FC<Screen5RideDetailsProps> = ({
  driver,
  selectedSeatId,
  onSelectSeat,
  onBack,
  onConfirmAndBook,
}) => {
  const [showDriverMenu, setShowDriverMenu] = useState(false);

  const getSeatFriendlyName = (id: CarSeat['id']) => {
    switch (id) {
      case 'front_right':
        return 'Front Right';
      case 'rear_left':
        return 'Rear Left';
      case 'rear_center':
        return 'Center';
      case 'rear_right':
        return 'Rear Right';
      default:
        return 'Rear Seat';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 relative overflow-hidden">
      {/* Top Header */}
      <div className="px-5 pt-5 sm:pt-3 pb-2 flex items-center justify-between sticky top-0 bg-[#FAF9F5]/95 backdrop-blur-md z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ride Details</span>

        <div className="relative">
          <button
            onClick={() => setShowDriverMenu(!showDriverMenu)}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {showDriverMenu && (
            <div className="absolute right-0 top-10 w-40 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-20 text-xs">
              <button
                onClick={() => setShowDriverMenu(false)}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                Share trip info
              </button>
              <button
                onClick={() => setShowDriverMenu(false)}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 text-rose-600"
              >
                Report issue
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content (with pb-32 to prevent FAB overlap) */}
      <div className="px-5 py-2 flex-1 space-y-4 overflow-y-auto no-scrollbar pb-32">
        {/* Driver Profile Card */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={driver.avatar}
                alt={driver.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#154331]/20"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{driver.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                  <span className="flex items-center gap-0.5 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {driver.rating}
                  </span>
                  <span>({driver.ridesCount} rides)</span>
                </div>
              </div>
            </div>

            {driver.verified && (
              <span className="py-1 px-2.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold flex items-center gap-1 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified
              </span>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-600">
            {driver.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/60">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Seat Selection Section (Matching User Reference) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Armchair className="w-4 h-4 text-[#00875A]" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Select Your Seat
              </h4>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {getSeatFriendlyName(selectedSeatId)} selected
            </span>
          </div>

          {/* Reference-Accurate Seat Diagram */}
          <SeatSelector
            driver={driver}
            selectedSeatId={selectedSeatId}
            onSelectSeat={onSelectSeat}
          />
        </div>

        {/* Vehicle Information */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Car className="w-5 h-5 text-[#154331]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{driver.carModel} • {driver.carColor}</p>
              <p className="text-[11px] font-mono text-slate-500 tracking-wider mt-0.5 font-semibold">
                {driver.licensePlate}
              </p>
            </div>
          </div>

          {/* Car Image Preview */}
          <div className="w-20 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0 flex items-center justify-center">
            <img
              src={driver.carImage}
              alt={driver.carModel}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* About Driver */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-800">About</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {driver.about}
          </p>
        </div>

        {/* Route Preview with Mini Map */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex gap-3">
            {/* Timeline */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-slate-900">Alfama</span>
                </div>
                <p className="text-[11px] text-slate-500 pl-4 mt-0.5">5:35 PM</p>
              </div>

              <div className="w-0.5 h-6 bg-slate-200 ml-1 my-1" />

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-slate-900">Marquês de Pombal</span>
                </div>
                <p className="text-[11px] text-slate-500 pl-4 mt-0.5">
                  6:00 PM <span className="text-emerald-700 font-semibold">(≈ 25 min)</span>
                </p>
              </div>
            </div>

            {/* Mini Map Preview */}
            <div className="w-28 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
              <InteractiveMap progress={40} compact={true} interactive={false} />
            </div>
          </div>
        </div>

        {/* Ride Preferences */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 mb-1.5">Ride preferences</h4>
          <div className="flex items-center gap-2">
            <span className="py-1 px-2.5 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 flex items-center gap-1.5">
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              Quiet ride
            </span>
            <span className="py-1 px-2.5 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 flex items-center gap-1.5">
              <CigaretteOff className="w-3.5 h-3.5 text-slate-500" />
              No smoking
            </span>
            <span className="py-1 px-2.5 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 flex items-center gap-1.5">
              <Dog className="w-3.5 h-3.5 text-slate-500" />
              Pets okay
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) at Bottom with Safe Spacing */}
      <div className="absolute bottom-4 left-4 right-4 z-30 pointer-events-none">
        <div className="flex flex-col items-center">
          <button
            onClick={onConfirmAndBook}
            className="pointer-events-auto w-full py-3.5 px-6 rounded-2xl bg-[#00875A] hover:bg-[#00704A] active:scale-[0.98] transition-all text-white font-semibold text-sm tracking-wide shadow-xl shadow-[#00875A]/35 flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/30"
          >
            <span>Confirm & Book • {getSeatFriendlyName(selectedSeatId)} Seat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-center text-[10px] font-bold text-emerald-900 bg-white/95 backdrop-blur-md mt-1.5 py-0.5 px-3 rounded-full shadow-sm border border-emerald-200 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>You'll earn <span className="font-extrabold text-emerald-950">30 points</span> for this ride</span>
          </div>
        </div>
      </div>
    </div>
  );
};
