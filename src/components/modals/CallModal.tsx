import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, ShieldCheck } from 'lucide-react';
import { Driver } from '../../types';

interface CallModalProps {
  driver: Driver;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ driver, onClose }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected'>('connecting');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus('connected');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (callStatus !== 'connected') return;
    const interval = setInterval(() => {
      setCallDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md text-white flex flex-col justify-between p-6 animate-fade-in">
      {/* Top info */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-medium text-emerald-400 mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted Community Call</span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight">{driver.name}</h3>
        <p className="text-xs text-slate-400 mt-1">{driver.carModel} • {driver.licensePlate}</p>

        <p className="text-sm font-mono text-emerald-400 font-semibold mt-3">
          {callStatus === 'connecting' ? 'Connecting to driver...' : formatSeconds(callDuration)}
        </p>
      </div>

      {/* Driver Avatar pulse */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-emerald-500/20 animate-ping" />
          <img
            src={driver.avatar}
            alt={driver.name}
            referrerPolicy="no-referrer"
            className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500/80 shadow-2xl relative z-10"
          />
        </div>

        {callStatus === 'connected' && (
          <p className="text-xs text-slate-300 mt-6 max-w-xs text-center italic bg-white/5 py-2 px-4 rounded-xl border border-white/10">
            "Olá! I'm just turning onto Rua dos Remédios, see you in 1 minute at the corner!"
          </p>
        )}
      </div>

      {/* Action controls */}
      <div className="pb-8 space-y-6">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition active:scale-95 ${
              isMuted ? 'bg-rose-500 text-white' : 'bg-white/15 text-white hover:bg-white/20'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition active:scale-95 ${
              isSpeaker ? 'bg-emerald-600 text-white' : 'bg-white/15 text-white hover:bg-white/20'
            }`}
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* End Call Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 flex items-center justify-center text-white shadow-xl shadow-rose-600/40 transition cursor-pointer"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};
