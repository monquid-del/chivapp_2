import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface FilterModalProps {
  onClose: () => void;
  onApply: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ onClose, onApply }) => {
  const [ecoOnly, setEcoOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [womenOnly, setWomenOnly] = useState(false);
  const [minRating, setMinRating] = useState('4.8');

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end animate-fade-in">
      <div className="w-full bg-[#FAF9F5] rounded-t-3xl p-5 border-t border-slate-200 shadow-2xl space-y-4 animate-slide-up">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Filter Rides</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
            <div>
              <p className="text-xs font-semibold text-slate-800">Free rides only</p>
              <p className="text-[10px] text-slate-500">Only show zero-cost community rides</p>
            </div>
            <button
              onClick={() => setFreeOnly(!freeOnly)}
              className={`w-10 h-6 rounded-full transition p-0.5 ${freeOnly ? 'bg-[#154331]' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${freeOnly ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
            <div>
              <p className="text-xs font-semibold text-slate-800">100% Electric / Hybrid</p>
              <p className="text-[10px] text-slate-500">Zero-emission vehicles only</p>
            </div>
            <button
              onClick={() => setEcoOnly(!ecoOnly)}
              className={`w-10 h-6 rounded-full transition p-0.5 ${ecoOnly ? 'bg-[#154331]' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${ecoOnly ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
            <div>
              <p className="text-xs font-semibold text-slate-800">Women-only carpools</p>
              <p className="text-[10px] text-slate-500">Riders & verified female drivers</p>
            </div>
            <button
              onClick={() => setWomenOnly(!womenOnly)}
              className={`w-10 h-6 rounded-full transition p-0.5 ${womenOnly ? 'bg-[#154331]' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${womenOnly ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <button
          onClick={onApply}
          className="w-full py-3 rounded-xl bg-[#154331] text-white text-xs font-bold hover:bg-[#1C533E] active:scale-98 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
