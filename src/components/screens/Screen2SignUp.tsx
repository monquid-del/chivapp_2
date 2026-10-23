import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Phone, CheckCircle2, ShieldCheck, UserCheck, Camera } from 'lucide-react';
import { UserProfile } from '../../types';

interface Screen2SignUpProps {
  user: UserProfile;
  onBack: () => void;
  onContinue: () => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const Screen2SignUp: React.FC<Screen2SignUpProps> = ({
  user,
  onBack,
  onContinue,
  onUpdateUser,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'google' | 'apple' | 'phone' | null>('google');
  const [showVerificationAlert, setShowVerificationAlert] = useState<string | null>(null);

  const toggleVerification = (key: 'govId' | 'selfie' | 'profile') => {
    const current = user.verificationSteps[key];
    const updatedSteps = {
      ...user.verificationSteps,
      [key]: !current,
    };
    onUpdateUser({
      verificationSteps: updatedSteps,
      isVerified: updatedSteps.govId && updatedSteps.selfie && updatedSteps.profile,
    });
    setShowVerificationAlert(`${key === 'govId' ? 'Government ID' : key === 'selfie' ? 'Selfie' : 'Profile info'} updated`);
    setTimeout(() => setShowVerificationAlert(null), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 overflow-y-auto no-scrollbar">
      {/* Top Navigation & Step indicator */}
      <div className="px-5 pt-5 sm:pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-1.5 rounded-full bg-[#154331]" />
          <div className="w-3 h-1.5 rounded-full bg-[#154331]/30" />
          <div className="w-3 h-1.5 rounded-full bg-[#154331]/30" />
          <div className="w-3 h-1.5 rounded-full bg-[#154331]/30" />
        </div>

        <div className="w-9" />
      </div>

      <div className="px-5 py-2 flex-1">
        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900">Create your account</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Join a verified community for safer and better rides.
        </p>

        {/* Auth Provider Buttons */}
        <div className="mt-3.5 space-y-2">
          {/* Google */}
          <button
            onClick={() => setSelectedMethod('google')}
            className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-3 text-xs font-semibold transition active:scale-[0.99] cursor-pointer ${
              selectedMethod === 'google'
                ? 'bg-white border-[#154331] shadow-xs text-slate-800 ring-1 ring-[#154331]'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Apple */}
          <button
            onClick={() => setSelectedMethod('apple')}
            className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-3 text-xs font-semibold transition active:scale-[0.99] cursor-pointer ${
              selectedMethod === 'apple'
                ? 'bg-white border-[#154331] shadow-xs text-slate-800 ring-1 ring-[#154331]'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <svg className="w-4 h-4 shrink-0 fill-current text-slate-900" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.6-1.28.98-2.65.86-3.87-1.12.05-2.5.76-3.32 1.72-.73.85-1.37 2.22-1.2 3.53 1.25.1 2.57-.69 3.66-1.38z" />
            </svg>
            <span>Continue with Apple</span>
          </button>

          {/* Phone */}
          <button
            onClick={() => setSelectedMethod('phone')}
            className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-3 text-xs font-semibold transition active:scale-[0.99] cursor-pointer ${
              selectedMethod === 'phone'
                ? 'bg-white border-[#154331] shadow-xs text-slate-800 ring-1 ring-[#154331]'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <Phone className="w-4 h-4 text-slate-600" />
            <span>Continue with Phone</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-[#FAF9F5] px-3 text-[11px] font-medium text-slate-400">
            or
          </span>
        </div>

        {/* Verify Identity Header */}
        <div>
          <h3 className="text-sm font-bold text-slate-900">Verify your identity</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Help us keep CHIVAPP safe for everyone.
          </p>
        </div>

        {/* Verification Checklist */}
        <div className="mt-2.5 space-y-2">
          {/* Government ID */}
          <div
            onClick={() => toggleVerification('govId')}
            className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#154331]/40 transition flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                user.verificationSteps.govId ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">Government ID</p>
                <p className="text-[10px] text-slate-500">(Passport / Driving Licence)</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {user.verificationSteps.govId ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Done
                </span>
              ) : (
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Tap to verify
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Selfie verification */}
          <div
            onClick={() => toggleVerification('selfie')}
            className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#154331]/40 transition flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                user.verificationSteps.selfie ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">Selfie verification</p>
                <p className="text-[10px] text-slate-500">Instant biometric match</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {user.verificationSteps.selfie ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Done
                </span>
              ) : (
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Tap to take
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Profile details */}
          <div
            onClick={() => toggleVerification('profile')}
            className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#154331]/40 transition flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                user.verificationSteps.profile ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">Add profile details</p>
                <p className="text-[10px] text-slate-500">Bio & travel preferences</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {user.verificationSteps.profile ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Done
                </span>
              ) : (
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Complete
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Toast confirmation */}
        {showVerificationAlert && (
          <div className="mt-2 text-center text-[11px] text-emerald-700 font-medium bg-emerald-50/80 py-1 rounded-lg border border-emerald-200 animate-fade-in">
            ✓ {showVerificationAlert}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="p-5 mt-auto bg-gradient-to-t from-[#FAF9F5] to-transparent">
        <button
          onClick={onContinue}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#154331] hover:bg-[#1C533E] active:scale-[0.98] transition-all text-white font-semibold text-sm tracking-wide shadow-md shadow-[#154331]/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
