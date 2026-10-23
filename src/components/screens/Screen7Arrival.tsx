import React, { useEffect, useState } from 'react';
import { Star, Clock, MapPin, Leaf, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ASSETS } from '../../data/mockData';

interface Screen7ArrivalProps {
  onCompleteFeedback: (rating: number, compliments: string[]) => void;
}

export const Screen7Arrival: React.FC<Screen7ArrivalProps> = ({ onCompleteFeedback }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedCompliments, setSelectedCompliments] = useState<string[]>([
    'Great driver',
    'On time',
  ]);

  const complimentsList = ['Great driver', 'Clean car', 'On time', 'Friendly', 'Smooth drive'];

  useEffect(() => {
    // Fire confetti celebration on arrive
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#154331', '#10B981', '#FBBF24', '#38BDF8'],
      });
    } catch {
      // ignore
    }
  }, []);

  const toggleCompliment = (comp: string) => {
    if (selectedCompliments.includes(comp)) {
      setSelectedCompliments(selectedCompliments.filter((c) => c !== comp));
    } else {
      setSelectedCompliments([...selectedCompliments, comp]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 overflow-y-auto no-scrollbar">
      <div className="px-5 pt-5 sm:pt-3 pb-2 flex-1 flex flex-col">
        {/* Celebration Illustration Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 bg-amber-50/40 aspect-[16/9] max-h-[170px] w-full shrink-0 shadow-2xs">
          <img
            src={ASSETS.arrivalHero}
            alt="You have arrived at Marquês de Pombal"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Header Texts */}
        <div className="text-center mt-3">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">You've arrived!</h2>
          <p className="text-xs text-slate-500 mt-0.5">Thanks for riding with CHIVA</p>
        </div>

        {/* Trip details card */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="text-xs font-semibold text-slate-700 flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Trip details</span>
            <span className="text-[11px] text-slate-500">Alfama → Marquês de Pombal</span>
          </div>

          {/* 3 Metric Pills */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-center text-slate-400 mb-0.5">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <p className="text-[10px] text-slate-500">Duration</p>
              <p className="text-xs font-bold text-slate-800">25 min</p>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-center text-slate-400 mb-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <p className="text-[10px] text-slate-500">Distance</p>
              <p className="text-xs font-bold text-slate-800">8.4 km</p>
            </div>

            <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <div className="flex items-center justify-center text-emerald-600 mb-0.5">
                <Leaf className="w-3.5 h-3.5" />
              </div>
              <p className="text-[10px] text-emerald-800">CO₂ saved</p>
              <p className="text-xs font-bold text-emerald-700">1.8 kg</p>
            </div>
          </div>

          {/* Points Reward Banner */}
          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-slate-900">
                <Star className="w-4 h-4 fill-slate-900" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-amber-800">Trip Reward</p>
                <p className="text-xs font-bold text-amber-950">+ 30 points earned</p>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-900 text-center">How was your ride?</h3>

          {/* Interactive Star Rating */}
          <div className="flex items-center justify-center gap-2 my-2.5">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = (hoverRating ?? rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => setRating(star)}
                  className="p-1 text-slate-300 hover:scale-110 active:scale-95 transition cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      active ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Compliment Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
            {complimentsList.map((comp) => {
              const isSelected = selectedCompliments.includes(comp);
              return (
                <button
                  key={comp}
                  type="button"
                  onClick={() => toggleCompliment(comp)}
                  className={`py-1 px-2.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#154331] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {comp}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3 pb-2 mt-auto">
          <button
            onClick={() => onCompleteFeedback(rating, selectedCompliments)}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#154331] hover:bg-[#1C533E] active:scale-[0.98] transition-all text-white font-semibold text-sm tracking-wide shadow-md shadow-[#154331]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Submit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
