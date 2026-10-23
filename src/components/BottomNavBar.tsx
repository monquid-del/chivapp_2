import React from 'react';
import { Home, Car, Users, Star, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rides', label: 'Rides', icon: Car },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'rewards', label: 'Rewards', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shrink-0 z-30">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
              isActive
                ? 'text-[#154331] font-bold'
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
