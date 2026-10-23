import React, { useState } from 'react';
import { X, ShieldAlert, Phone, Share2, Check, AlertTriangle } from 'lucide-react';
import { Driver } from '../../types';

interface SOSModalProps {
  driver: Driver;
  onClose: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ driver, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);

  const handleShareTrip = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end animate-fade-in">
      <div className="w-full bg-white rounded-t-3xl p-5 border-t border-slate-200 shadow-2xl space-y-4 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-rose-600">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-900">Safety & Emergency Hub</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Carpool Status */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <p className="font-semibold text-slate-700">Active Ride Reference</p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Driver: {driver.name} • {driver.carModel} ({driver.licensePlate})
          </p>
          <p className="text-[11px] text-slate-500">Route: Alfama → Marquês de Pombal</p>
        </div>

        {/* Action 1: Call Emergency (112 Portugal) */}
        <div>
          <button
            onClick={() => setSosTriggered(true)}
            className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition shadow-md shadow-rose-600/30"
          >
            <Phone className="w-4 h-4" />
            <span>Call Emergency Services (112)</span>
          </button>
          {sosTriggered && (
            <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold text-center">
              ⚠️ In a live app this dials 112 with your GPS coordinates and driver ID XX-12-AB dispatched.
            </div>
          )}
        </div>

        {/* Action 2: Share Live Trip */}
        <button
          onClick={handleShareTrip}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 active:scale-98 transition"
        >
          {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          <span>{copiedLink ? 'Live Tracking Link Copied!' : 'Share Live Tracking with Trusted Contact'}</span>
        </button>

        {/* Safety standards */}
        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          CHIVA 24/7 Safety Operations monitors carpools with geofence anomaly detection.
        </p>
      </div>
    </div>
  );
};
