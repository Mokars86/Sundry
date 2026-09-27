import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { X, MapPin, Heart, ShieldCheck } from 'lucide-react';

export const ProfileDetailModal: React.FC = () => {
  const { viewingProfile, setViewingProfile, likeProfile, sendWave } = useApp();

  if (!viewingProfile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        onClick={() => setViewingProfile(null)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
      />

      {/* Mini Profile Sheet */}
      <div className="relative w-full max-w-md bg-white border-t border-slate-200 rounded-t-3xl p-5 z-10 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-250 text-slate-900">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-lg text-slate-900">
              {viewingProfile.alias}, {viewingProfile.age}
            </h2>
            {viewingProfile.isVerified && (
              <ShieldCheck className="w-5 h-5 text-sky-600" />
            )}
          </div>
          <button
            onClick={() => setViewingProfile(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Photos Carousel preview */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
          {viewingProfile.photoUrls.map((photo, i) => (
            <div key={i} className="w-44 h-56 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200 shadow-2xs">
              <img src={photo} alt={viewingProfile.alias} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-800">
            {viewingProfile.occupationCategory}
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>{viewingProfile.distanceKm} km away</span>
            <span>•</span>
            <span className={viewingProfile.isOnline ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
              {viewingProfile.isOnline ? 'Online now' : 'Active recently'}
            </span>
          </p>
        </div>

        {/* About me */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-700 leading-relaxed font-medium">{viewingProfile.aboutMe}</p>
        </div>

        {/* Prompts */}
        {viewingProfile.bioPrompts.map((p) => (
          <div key={p.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-bold text-sky-600 mb-1">{p.question}</p>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">{p.answer}</p>
          </div>
        ))}

        {/* Interest tags */}
        <div className="flex flex-wrap gap-1.5">
          {viewingProfile.interestTags.map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              #{t}
            </span>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-2.5 pt-2">
          <button
            onClick={() => {
              sendWave(viewingProfile);
              setViewingProfile(null);
            }}
            className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200"
          >
            <span className="text-base">👋</span>
            <span>Wave</span>
          </button>
          <button
            onClick={() => {
              likeProfile(viewingProfile);
              setViewingProfile(null);
            }}
            className="flex-1 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 hover:bg-slate-800"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Connect & Like</span>
          </button>
        </div>
      </div>
    </div>
  );
};
