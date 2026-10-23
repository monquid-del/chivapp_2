import React from 'react';
import { X, Bell, Award, Car, Leaf, Check } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  const notifications = [
    {
      id: '1',
      title: 'Milestone reached: 14 kg CO₂ saved!',
      time: '15m ago',
      desc: 'You have avoided equivalent of planting 2 urban trees in Lisbon.',
      icon: Leaf,
      color: 'text-emerald-700 bg-emerald-100',
    },
    {
      id: '2',
      title: 'New driver matching your route',
      time: '2h ago',
      desc: 'Rafael S. drives Alfama → Marquês de Pombal daily at 5:35 PM.',
      icon: Car,
      color: 'text-blue-700 bg-blue-100',
    },
    {
      id: '3',
      title: 'Monthly Reward Voucher Available',
      time: '1d ago',
      desc: 'Pastéis de Belém 10% coupon ready to redeem in your Rewards tab.',
      icon: Award,
      color: 'text-amber-700 bg-amber-100',
    },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end animate-fade-in">
      <div className="w-full bg-[#FAF9F5] rounded-t-3xl p-5 border-t border-slate-200 shadow-2xl space-y-3.5 animate-slide-up max-h-[85%] flex flex-col">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#154331]" />
            <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="p-3 rounded-2xl bg-white border border-slate-200 flex gap-3 shadow-2xs">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800">{item.title}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};
