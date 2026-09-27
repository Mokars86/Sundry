import React, { useState } from 'react';
import { Shield, Lock, Sparkles, ArrowRight, Check, Phone, HeartHandshake } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [aliasName, setAliasName] = useState('Zephyr_99');
  const [contactShielding, setContactShielding] = useState(true);

  const steps = [
    {
      title: 'Phone Authentication',
      subtitle: 'Fast, secure daily communication with your real contacts.',
      tagline: 'Distinct identities are evolving connects of distinct identities.',
    },
    {
      title: 'Decoupled Alias Persona',
      subtitle: 'Explore dating, friendship & peer therapy without revealing your phonebook identity.',
      tagline: 'Your phone contacts will never see your anonymous alias.',
    },
    {
      title: 'Moments & Peer Lounges',
      subtitle: '24-hour disappearing stories and live anonymous peer support stages.',
      tagline: 'Safe, moderated, judgment-free spaces designed for human connection.',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      handleNext();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between select-none max-w-md mx-auto shadow-2xl overflow-y-auto">
      {/* Top Banner & Header */}
      <div className="relative">
        {/* Hero Photo with Gradient Vignette */}
        <div className="h-64 sm:h-72 w-full overflow-hidden relative">
          <img
            src={
              step === 0
                ? 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&auto=format&fit=crop&q=80'
                : step === 1
                ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80'
                : 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80'
            }
            alt="Community Onboarding"
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
        </div>

        {/* Small Brand Logo Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md p-1.5 shadow-lg border border-slate-100 flex items-center justify-center">
            <img src="/logo.jpg" alt="Sundry Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-4 flex-1 flex flex-col justify-between -mt-8 relative z-10 space-y-6">
        {/* Step 0: Phone Input & Verify & Decouple */}
        {step === 0 && (
          <form onSubmit={handleVerify} className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Welcome to Sundry
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                {steps[0].subtitle}
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  🇬🇭 +233
                </div>
                <input
                  type="tel"
                  placeholder="24 555 0192"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                <Lock className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                <span>Your number is verified for messaging & never shared on Connect.</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl shadow-slate-900/15 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isVerifying ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Verify & Decouple</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 1: Create Your Decoupled Alias */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-rose-500" />
                <span>Identity Decoupling</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Create Your Alias
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Choose an anonymous handle for dating, friendships, and anonymous peer therapy.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Anonymous Handle
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                  <span className="text-slate-400 font-bold">🎭</span>
                  <input
                    type="text"
                    value={aliasName}
                    onChange={(e) => setAliasName(e.target.value)}
                    className="w-full bg-transparent text-sm font-extrabold text-slate-900 focus:outline-none"
                    placeholder="e.g. Zephyr_99"
                  />
                </div>
              </div>

              {/* Contact Shielding Switch */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    Hide me from phone contacts
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Ensures complete privacy from coworkers and family
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactShielding(!contactShielding)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    contactShielding ? 'bg-slate-900' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${
                      contactShielding ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl shadow-slate-900/15 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Peer Lounges & Ephemeral Moments */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                <HeartHandshake className="w-3 h-3 text-emerald-600" />
                <span>Peer Support</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Safe Spaces & Moments
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                {steps[2].subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                <div className="text-2xl">⭕</div>
                <h4 className="font-extrabold text-xs text-slate-900">24h Moments</h4>
                <p className="text-[10px] text-slate-500">Auto-disappearing stories with custom privacy</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                <div className="text-2xl">🎙️</div>
                <h4 className="font-extrabold text-xs text-slate-900">Live Lounges</h4>
                <p className="text-[10px] text-slate-500">Peer therapy stages & anonymous listening</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onComplete}
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl shadow-slate-900/15 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Enter Sundry</span>
              <Check className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* Footer Carousel Dots & Tagline */}
        <div className="text-center space-y-3 pt-2">
          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === i ? 'w-6 bg-slate-900' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <p className="text-[11px] text-slate-400 font-medium px-4">
            {steps[step].tagline}
          </p>
        </div>
      </div>
    </div>
  );
};
