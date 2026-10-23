import React, { useState } from 'react';
import {
  Bell,
  Leaf,
  Car,
  Star,
  ChevronRight,
  Ticket,
  Coffee,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { RewardItem, UserProfile } from '../../types';
import { MOCK_REWARDS, ASSETS } from '../../data/mockData';

interface Screen8CommunityProps {
  user: UserProfile;
  onOpenNotifications: () => void;
  onStartNewRide: () => void;
  onSelectTab: (tab: string) => void;
  activeTab: string;
}

export const Screen8Community: React.FC<Screen8CommunityProps> = ({
  user,
  onOpenNotifications,
  onStartNewRide,
  onSelectTab,
  activeTab,
}) => {
  const [rewards, setRewards] = useState<RewardItem[]>(MOCK_REWARDS);
  const [userPoints, setUserPoints] = useState(user.points);
  const [redeemedNotice, setRedeemedNotice] = useState<string | null>(null);

  const handleClaimReward = (reward: RewardItem) => {
    if (userPoints >= reward.pointsCost) {
      setUserPoints((p) => p - reward.pointsCost);
      setRewards((prev) =>
        prev.map((r) => (r.id === reward.id ? { ...r, claimed: true } : r))
      );
      setRedeemedNotice(`Redeemed "${reward.title}" voucher!`);
      setTimeout(() => setRedeemedNotice(null), 3000);
    } else {
      setRedeemedNotice(`Need ${reward.pointsCost - userPoints} more points for "${reward.title}". Keep carpooling!`);
      setTimeout(() => setRedeemedNotice(null), 3500);
    }
  };

  const getRewardIcon = (type: RewardItem['iconType']) => {
    switch (type) {
      case 'ride':
        return <Car className="w-5 h-5 text-emerald-700" />;
      case 'discount':
        return <Ticket className="w-5 h-5 text-blue-700" />;
      case 'cafe':
        return <Coffee className="w-5 h-5 text-amber-700" />;
      case 'event':
        return <Calendar className="w-5 h-5 text-purple-700" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div className="px-5 pt-5 sm:pt-3 pb-2 flex items-center justify-between sticky top-0 bg-[#FAF9F5]/95 backdrop-blur-md z-10">
        <div className="flex items-center">
          <img
            src={ASSETS.logo}
            alt="CHIVAPP"
            className="w-[200px] h-[40px] object-contain"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 relative active:scale-95 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover border-2 border-[#154331]/30"
          />
        </div>
      </div>

      <div className="px-5 py-2 flex-1 space-y-4">
        {/* Toast alert */}
        {redeemedNotice && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fade-in shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{redeemedNotice}</span>
          </div>
        )}

        {/* Section 1: Your Impact */}
        <div>
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Your Impact</h2>
          <div className="grid grid-cols-2 gap-2.5 mt-2">
            {/* CO2 Saved */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-900 tabular-nums">
                  {user.co2SavedKg.toFixed(1)} kg
                </p>
                <p className="text-[11px] text-slate-500 font-medium">CO₂ saved</p>
              </div>
            </div>

            {/* Rides this month */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-900 tabular-nums">
                  {user.ridesThisMonth}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Rides this month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Your Rewards */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">Your Rewards</span>
              <span className="py-0.5 px-2 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                {userPoints} points
              </span>
            </div>
            <button
              onClick={() => onSelectTab('rewards')}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-0.5"
            >
              View history <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {rewards.map((rew) => (
              <div
                key={rew.id}
                onClick={() => handleClaimReward(rew)}
                className={`p-2 rounded-2xl border transition text-center flex flex-col items-center justify-between cursor-pointer active:scale-95 shadow-2xs ${
                  rew.claimed
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-1">
                  {rew.claimed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    getRewardIcon(rew.iconType)
                  )}
                </div>
                <p className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight">
                  {rew.title}
                </p>
                <p className="text-[9px] text-amber-700 font-bold mt-1">
                  {rew.claimed ? 'Claimed' : `${rew.pointsCost} pts`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Community */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">Community</span>
            <button
              onClick={() => onSelectTab('community')}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-0.5"
            >
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-2 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">People in your area</p>
              <p className="text-[11px] text-slate-500">56 verified carpoolers near Alfama</p>
            </div>
            {/* Avatars cluster */}
            <div className="flex items-center -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                alt="user 1"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                alt="user 2"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
                alt="user 3"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-[9px] font-bold border-2 border-white flex items-center justify-center">
                +56
              </div>
            </div>
          </div>

          {/* Neighbourhood Rides Banner Card */}
          <div
            onClick={onStartNewRide}
            className="mt-2.5 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-2xs flex items-center justify-between cursor-pointer hover:border-amber-300 transition active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                🏘️
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Neighbourhood Rides</p>
                <p className="text-[11px] text-slate-600">Join regular carpools from your neighbourhood</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-800 shrink-0" />
          </div>
        </div>

        {/* Quick New Trip Action Bar */}
        <div className="pt-1 pb-1">
          <button
            onClick={onStartNewRide}
            className="w-full py-3 px-5 rounded-2xl bg-[#154331] hover:bg-[#1C533E] active:scale-[0.98] transition-all text-white font-semibold text-xs tracking-wide shadow-md shadow-[#154331]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Car className="w-4 h-4" />
            <span>Plan Another Ride in Lisbon</span>
          </button>
        </div>
      </div>
    </div>
  );
};
