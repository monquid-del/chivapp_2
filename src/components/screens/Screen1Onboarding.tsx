import React from 'react';
import { Leaf, DollarSign, Users, Award, ArrowRight } from 'lucide-react';
import { ASSETS } from '../../data/mockData';

interface Screen1OnboardingProps {
  onGetStarted: () => void;
}

export const Screen1Onboarding: React.FC<Screen1OnboardingProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 overflow-y-auto no-scrollbar">
      {/* Top Header Brand */}
      <div className="pt-6 sm:pt-4 pb-1 text-center px-6 flex flex-col items-center">
        <img
          src={ASSETS.logo}
          alt="CHIVAPP"
          className="w-[280px] h-[60px] object-contain mx-auto"
        />
        <p className="text-xs font-semibold text-slate-700 tracking-wide mt-1">
          Share the ride <span className="text-[#2D6A4F] mx-1">•</span> Build the city
        </p>
      </div>

      {/* Hero Illustration */}
      <div className="px-5 mt-2 flex-1 flex flex-col justify-center">
        <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 bg-amber-50/40 aspect-[4/3.2] max-h-[260px] mx-auto w-full">
          <img
            src={ASSETS.onboardingHero}
            alt="CHIVA Carpooling Community in Lisbon"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Community Mission statement */}
        <p className="text-center text-[13px] text-slate-600 font-medium leading-relaxed mt-4 px-2">
          A carpooling community for greener cities, closer neighbourhoods and better everyday journeys.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 leading-tight">
              Lower CO₂ emissions
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 leading-tight">
              Save on travel costs
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0 text-teal-800">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 leading-tight">
              Meet people nearby
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 leading-tight">
              Rewards for riding
            </span>
          </div>
        </div>
      </div>

      {/* Primary Bottom CTA */}
      <div className="p-5 mt-auto bg-gradient-to-t from-[#FAF9F5] to-transparent">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#154331] hover:bg-[#1C533E] active:scale-[0.98] transition-all text-white font-semibold text-sm tracking-wide shadow-md shadow-[#154331]/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
