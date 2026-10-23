import React from 'react';
import { User, Check, Luggage, ShieldCheck } from 'lucide-react';
import { CarSeat, Driver } from '../types';

interface SeatSelectorProps {
  driver: Driver;
  selectedSeatId: CarSeat['id'];
  onSelectSeat: (seatId: CarSeat['id']) => void;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({
  driver,
  selectedSeatId,
  onSelectSeat,
}) => {
  // Default seats if driver doesn't have custom ones
  const seats: CarSeat[] = driver.seats || [
    {
      id: 'front_left',
      label: 'Driver',
      isDriver: true,
      isAvailable: false,
      occupant: {
        name: driver.name,
        roleOrCompany: driver.driverRoleOrCompany || 'Driver (Owner)',
        avatar: driver.avatar,
      },
    },
    {
      id: 'front_right',
      label: 'Front Right',
      isAvailable: false,
      occupant: {
        name: 'David Morales',
        roleOrCompany: 'Globant',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      },
    },
    {
      id: 'rear_left',
      label: 'Rear Left',
      isAvailable: true,
    },
    {
      id: 'rear_center',
      label: 'Center',
      isAvailable: true,
    },
    {
      id: 'rear_right',
      label: 'Rear Right',
      isAvailable: false,
      occupant: {
        name: 'Valeria',
        roleOrCompany: 'Mercado Libre',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      },
    },
  ];

  const frontSeats = seats.filter((s) => s.id === 'front_left' || s.id === 'front_right');
  const rearSeats = seats.filter(
    (s) => s.id === 'rear_left' || s.id === 'rear_center' || s.id === 'rear_right'
  );

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 shadow-xs bg-white overflow-hidden text-slate-800">
      {/* Top Header: Front Windshield & Dashboard */}
      <div className="bg-[#EDF4F9] text-slate-700 py-3 text-center text-xs font-bold tracking-tight border-b border-slate-200/70 select-none">
        Front Windshield & Dashboard
      </div>

      {/* Front Row (2 Seats) */}
      <div className="grid grid-cols-2 gap-3.5 p-4 pb-2">
        {frontSeats.map((seat) => {
          const isSelected = selectedSeatId === seat.id;
          const isAvailable = seat.isAvailable;

          if (seat.isDriver) {
            return (
              <div
                key={seat.id}
                className="rounded-2xl border border-slate-200 bg-white p-3 flex flex-col items-center text-center shadow-2xs select-none"
              >
                <div className="relative">
                  <img
                    src={seat.occupant?.avatar || driver.avatar}
                    alt={seat.occupant?.name || driver.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-2xs"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5" title="Verified Driver">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2 truncate w-full">
                  {seat.occupant?.name || driver.name}
                </h4>
                <p className="text-[11px] text-slate-600 font-medium">Driver (Owner)</p>
                <p className="text-[10px] text-slate-400 font-normal truncate w-full">
                  {seat.occupant?.roleOrCompany || 'Community Commuter'}
                </p>
              </div>
            );
          }

          // Front Right seat
          if (!isAvailable && seat.occupant) {
            return (
              <div
                key={seat.id}
                className="rounded-2xl border border-slate-200 bg-white p-3 flex flex-col items-center text-center shadow-2xs select-none"
              >
                <img
                  src={seat.occupant.avatar}
                  alt={seat.occupant.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-2xs"
                />
                <h4 className="text-xs font-bold text-slate-900 mt-2 truncate w-full">
                  {seat.occupant.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-normal truncate w-full">
                  {seat.occupant.roleOrCompany}
                </p>
              </div>
            );
          }

          // If front seat is available
          return (
            <button
              key={seat.id}
              type="button"
              onClick={() => onSelectSeat(seat.id)}
              className={`rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition active:scale-95 shadow-2xs ${
                isSelected
                  ? 'bg-[#00875A] text-white ring-2 ring-emerald-600/40 shadow-sm'
                  : 'bg-white border-2 border-[#00875A] text-slate-800 hover:bg-emerald-50/40'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                  isSelected ? 'bg-white text-emerald-800' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <User className={`w-5 h-5 ${isSelected ? 'stroke-[2.5]' : ''}`} />
              </div>
              <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {seat.label}
              </h4>
              <p
                className={`text-[11px] font-semibold mt-0.5 ${
                  isSelected ? 'text-white' : 'text-emerald-600'
                }`}
              >
                {isSelected ? '✓ Picked' : 'Available'}
              </p>
            </button>
          );
        })}
      </div>

      {/* Center Console Pill Divider */}
      <div className="w-12 h-1.5 rounded-full bg-slate-200/90 mx-auto my-2" />

      {/* Rear Seats Section Title */}
      <p className="text-xs font-semibold text-slate-600 text-center mb-2.5 select-none">
        Rear Seats (3 Slots)
      </p>

      {/* Rear Row (3 Slots) */}
      <div className="grid grid-cols-3 gap-2 px-3.5 pb-4">
        {rearSeats.map((seat) => {
          const isSelected = selectedSeatId === seat.id;
          const isAvailable = seat.isAvailable;

          if (!isAvailable && seat.occupant) {
            // Occupied rear seat
            return (
              <div
                key={seat.id}
                className="rounded-2xl bg-slate-50/80 border border-slate-200/80 p-2.5 flex flex-col items-center justify-center text-center select-none shadow-2xs"
              >
                <img
                  src={seat.occupant.avatar}
                  alt={seat.occupant.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-white shadow-2xs mb-1.5"
                />
                <h4 className="text-xs font-bold text-slate-800 truncate w-full">
                  {seat.occupant.name}
                </h4>
                <p className="text-[10px] text-slate-500 truncate w-full">
                  {seat.occupant.roleOrCompany}
                </p>
              </div>
            );
          }

          // Available or Picked rear seat
          return (
            <button
              key={seat.id}
              type="button"
              onClick={() => onSelectSeat(seat.id)}
              className={`rounded-2xl p-2.5 flex flex-col items-center justify-center text-center cursor-pointer transition active:scale-95 ${
                isSelected
                  ? 'bg-[#00875A] text-white shadow-md ring-2 ring-emerald-600/30'
                  : 'bg-white border-2 border-[#00875A] hover:bg-emerald-50/40 text-slate-800 shadow-2xs'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center mb-1.5 ${
                  isSelected ? 'bg-white text-emerald-800 shadow-xs' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <User className={`w-5 h-5 ${isSelected ? 'stroke-[2.5]' : ''}`} />
              </div>
              <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {seat.label}
              </h4>
              <p
                className={`text-[11px] font-semibold mt-0.5 flex items-center justify-center gap-0.5 ${
                  isSelected ? 'text-white' : 'text-emerald-600'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Picked</span>
                  </>
                ) : (
                  'Available'
                )}
              </p>
            </button>
          );
        })}
      </div>

      {/* Bottom Footer Info Strip */}
      <div className="border-t border-slate-200/80 bg-[#F6F9FC] py-3 px-4 text-xs text-slate-600 font-medium flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <Luggage className="w-4 h-4 text-slate-500" />
          <span>Trunk: {driver.trunkCapacity || '2 Bags'}</span>
        </div>
        <div className="font-mono text-slate-700 tracking-wider">
          <span className="text-slate-400 font-sans mr-1">Plate:</span>
          <span className="font-bold">{driver.licensePlate || 'XX-12-AB'}</span>
        </div>
      </div>
    </div>
  );
};
