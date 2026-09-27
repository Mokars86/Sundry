import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { PrivacyMode } from '../../types';
import { X, Users, UserX, Star, Check, Shield } from 'lucide-react';

export const PrivacySheet: React.FC = () => {
  const { isPrivacySheetOpen, setIsPrivacySheetOpen, privacyMode, setPrivacyMode } = useApp();

  if (!isPrivacySheetOpen) return null;

  const options: { id: PrivacyMode; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'all',
      title: 'All Contacts',
      desc: 'Shared with everyone in your phone contacts who also uses Sundry.',
      icon: <Users className="w-5 h-5 text-sky-600" />,
    },
    {
      id: 'exclude',
      title: 'My Contacts Except...',
      desc: 'Hide your status updates from specific selected contacts or coworkers.',
      icon: <UserX className="w-5 h-5 text-amber-600" />,
    },
    {
      id: 'close_circles',
      title: 'Close Circles Only (Besties)',
      desc: 'Only share with your curated close friends list (marked with a green ring).',
      icon: <Star className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        onClick={() => setIsPrivacySheetOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white border-t border-slate-200 rounded-t-3xl p-6 z-10 space-y-4 animate-in slide-in-from-bottom duration-250 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-sky-600" />
            <h3 className="font-extrabold text-base text-slate-900">Status Privacy Shield</h3>
          </div>
          <button
            onClick={() => setIsPrivacySheetOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Changes to your privacy settings will apply to future status updates.
        </p>

        <div className="space-y-2.5">
          {options.map((opt) => {
            const isSelected = privacyMode === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setPrivacyMode(opt.id)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                  isSelected
                    ? 'bg-slate-50 border-slate-900 shadow-xs ring-1 ring-slate-900'
                    : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5 pr-2">
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 mt-0.5">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{opt.desc}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsPrivacySheetOpen(false)}
          className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-sm shadow-md hover:bg-slate-800 transition-colors"
        >
          Save Privacy Preference
        </button>
      </div>
    </div>
  );
};
