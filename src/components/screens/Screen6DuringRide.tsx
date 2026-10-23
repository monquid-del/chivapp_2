import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Music,
  MessageCircle,
  FileText,
  ShieldAlert,
  Play,
  Pause,
  FastForward,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { CarSeat, Driver } from '../../types';
import { InteractiveMap } from '../InteractiveMap';

interface Screen6DuringRideProps {
  driver: Driver;
  selectedSeatId?: CarSeat['id'];
  onEndRide: () => void;
  onOpenCall: () => void;
  onOpenChat: () => void;
  onOpenSOS: () => void;
}

export const Screen6DuringRide: React.FC<Screen6DuringRideProps> = ({
  driver,
  selectedSeatId = 'rear_center',
  onEndRide,
  onOpenCall,
  onOpenChat,
  onOpenSOS,
}) => {
  const [progress, setProgress] = useState(28); // 0 to 100%
  const [isSimulating, setIsSimulating] = useState(true);
  const [activeTab, setActiveTab] = useState<'none' | 'music' | 'rules' | 'convo'>('none');
  const [conversationMode, setConversationMode] = useState<'quiet' | 'chatty'>('quiet');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [selectedStation, setSelectedStation] = useState('Lisbon Lo-fi & Fado Lounge');

  // Auto-progress simulation
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsSimulating(false);
          // Automatically trigger arrival after short delay
          setTimeout(onEndRide, 800);
          return 100;
        }
        return prev + 1.2;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isSimulating, onEndRide]);

  const eta = Math.max(1, Math.round(25 * (1 - progress / 100)));

  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 relative overflow-hidden">
      {/* Top Floating App Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-5 sm:pt-3 pb-2 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800">Ride in progress</span>
        </div>
      </div>

      {/* Main Interactive Live Map Area */}
      <div className="relative flex-1 w-full">
        <InteractiveMap
          progress={progress}
          interactive={true}
          compact={false}
          pickupLabel="Alfama (5:35 PM)"
          destinationLabel="Marquês de Pombal"
        />

        {/* Quick Simulation Speed Controls Floating Overlay */}
        <div className="absolute top-14 left-4 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-md border border-slate-200 flex items-center gap-1.5">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
            title={isSimulating ? 'Pause simulation' : 'Play simulation'}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              setProgress((p) => Math.min(100, p + 25));
            }}
            className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[10px] font-bold flex items-center gap-1 transition"
            title="Fast forward"
          >
            <FastForward className="w-3 h-3" />
            +25%
          </button>

          <span className="text-[10px] font-mono font-bold text-slate-600 px-1">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* In-Ride Bottom Drawer Sheet (with pb-24 to avoid FAB overlap) */}
      <div className="z-10 bg-white rounded-t-3xl shadow-2xl border-t border-slate-200/80 px-5 pt-3 pb-24 max-h-[54vh] overflow-y-auto no-scrollbar">
        {/* Grab Handle */}
        <div className="w-9 h-1 rounded-full bg-slate-200 mx-auto mb-2 shrink-0" />

        {/* Status ETA Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {progress < 25
                ? "You'll be picked up in 2 min"
                : progress >= 95
                ? 'Arriving at Marquês de Pombal!'
                : `Heading to destination • ETA ${eta} min`}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live carpool route via Av. da Liberdade
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-0.5">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {eta} min left
            </span>
            <span className="text-[10px] font-semibold text-slate-500">
              Seat: <span className="text-emerald-700 font-bold">{selectedSeatId === 'rear_center' ? 'Center' : selectedSeatId === 'rear_left' ? 'Rear Left' : selectedSeatId === 'front_right' ? 'Front Right' : 'Rear'}</span>
            </span>
          </div>
        </div>

        {/* Driver Row with Quick Call & Message */}
        <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={driver.avatar}
              alt={driver.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border border-white shadow-xs"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">{driver.name}</p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                {driver.carModel} • <span className="font-semibold">{driver.licensePlate}</span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCall}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-emerald-700 hover:border-emerald-300 active:scale-95 shadow-xs transition cursor-pointer"
              title="Call driver"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
            </button>
            <button
              onClick={onOpenChat}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-700 hover:border-blue-300 active:scale-95 shadow-xs transition cursor-pointer"
              title="Message driver"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-2.5 text-xs">
          <div className="flex flex-col items-center">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-0.5 h-5 bg-slate-200" />
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-[11px] text-slate-600 flex justify-between">
              <span>Alfama (Pickup point)</span>
              <span className="font-mono text-slate-400">5:35 PM</span>
            </div>
            <div className="text-[11px] text-slate-900 font-semibold flex justify-between">
              <span>Marquês de Pombal</span>
              <span className="font-mono text-emerald-700 font-bold">6:00 PM</span>
            </div>
          </div>
        </div>

        {/* 4 In-Ride Action Buttons from Image */}
        <div className="grid grid-cols-4 gap-2 mt-3.5 pt-3 border-t border-slate-100 text-center">
          {/* Music */}
          <button
            onClick={() => setActiveTab(activeTab === 'music' ? 'none' : 'music')}
            className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 cursor-pointer ${
              activeTab === 'music' || musicPlaying
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Music className="w-4 h-4" />
            <span className="text-[10px] font-semibold">Music</span>
          </button>

          {/* Conversation */}
          <button
            onClick={() => setActiveTab(activeTab === 'convo' ? 'none' : 'convo')}
            className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 cursor-pointer ${
              activeTab === 'convo'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-[10px] font-semibold">Conversation</span>
          </button>

          {/* Ride rules */}
          <button
            onClick={() => setActiveTab(activeTab === 'rules' ? 'none' : 'rules')}
            className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[10px] font-semibold">Ride rules</span>
          </button>

          {/* SOS */}
          <button
            onClick={onOpenSOS}
            className="p-2 rounded-xl flex flex-col items-center justify-center gap-1 text-rose-600 hover:bg-rose-50 transition active:scale-95 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-bold">SOS</span>
          </button>
        </div>

        {/* Contextual In-Ride Sub-panel */}
        {activeTab === 'music' && (
          <div className="mt-2.5 p-3 rounded-2xl bg-slate-900 text-white animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Shared Carpool Radio</p>
                <p className="text-xs font-bold text-white mt-0.5">{selectedStation}</p>
              </div>
              <button
                onClick={() => setMusicPlaying(!musicPlaying)}
                className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center active:scale-95"
              >
                {musicPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-1.5 mt-2">
              {['Lisbon Lo-fi', 'Acoustic Fado', 'Indie Breeze'].map((track) => (
                <button
                  key={track}
                  onClick={() => setSelectedStation(track)}
                  className={`text-[10px] px-2 py-0.5 rounded-md ${
                    selectedStation === track
                      ? 'bg-white/20 text-white font-bold'
                      : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'convo' && (
          <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 animate-fade-in">
            <p className="text-xs font-bold text-emerald-900">Driver conversation vibe</p>
            <div className="flex gap-2 mt-1.5">
              <button
                onClick={() => setConversationMode('quiet')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold ${
                  conversationMode === 'quiet'
                    ? 'bg-[#154331] text-white shadow-xs'
                    : 'bg-white text-slate-700'
                }`}
              >
                🤫 Quiet mode (Rest / Work)
              </button>
              <button
                onClick={() => setConversationMode('chatty')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold ${
                  conversationMode === 'chatty'
                    ? 'bg-[#154331] text-white shadow-xs'
                    : 'bg-white text-slate-700'
                }`}
              >
                🗣️ Chatty (Open to talk)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 animate-fade-in space-y-1">
            <p className="font-bold text-slate-900">CHIVAPP Community Etiquette</p>
            <p className="text-[11px] text-slate-600">• Be at the pickup spot 2 min before scheduled time</p>
            <p className="text-[11px] text-slate-600">• Keep seatbelt fastened during the entire trip</p>
            <p className="text-[11px] text-slate-600">• Respect silence or conversation preferences</p>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) at Bottom for End Ride */}
      <div className="absolute bottom-3 left-4 right-4 z-30 pointer-events-none">
        <button
          onClick={onEndRide}
          className="pointer-events-auto w-full py-3 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all text-white font-bold text-xs tracking-wider shadow-xl shadow-rose-600/35 flex items-center justify-center gap-2 cursor-pointer border border-rose-400/30"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>End Ride</span>
        </button>
      </div>
    </div>
  );
};
