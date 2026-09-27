import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { ExploreIntent } from '../../types';
import { MapPin, ShieldCheck } from 'lucide-react';

export const ExploreSubView: React.FC = () => {
  const {
    exploreIntent,
    setExploreIntent,
    matchProfiles,
    setViewingProfile,
    sendWave,
    searchQuery,
  } = useApp();

  const intentTabs: { id: ExploreIntent; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'love', label: 'Looking for Love', icon: '❤️' },
    { id: 'friends', label: 'Just Friends', icon: '🤝' },
    { id: 'activity', label: 'Activity Partner', icon: '🧗' },
  ];

  const filtered = matchProfiles.filter((p) => {
    // Intent filter
    if (exploreIntent !== 'all' && p.intent !== exploreIntent) return false;
    // Search filter
    if (searchQuery.trim()) {
      const matchAlias = p.alias.toLowerCase().includes(searchQuery.toLowerCase());
      const matchInterests = p.interestTags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (!matchAlias && !matchInterests) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-full pb-28 select-none bg-slate-50">
      {/* Intent Filter Pills */}
      <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar bg-white border-b border-slate-200">
        {intentTabs.map((tab) => {
          const isSelected = exploreIntent === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setExploreIntent(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Staggered Grid */}
      <div className="p-4 grid grid-cols-2 gap-3.5">
        {filtered.map((profile, i) => (
          <div
            key={profile.id}
            onClick={() => setViewingProfile(profile)}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 cursor-pointer transition-all hover:scale-[1.02] shadow-xs hover:shadow-md flex flex-col"
            style={{
              height: i % 2 === 0 ? '240px' : '270px',
            }}
          >
            {/* Background Profile Photo */}
            <img
              src={profile.photoUrls[0]}
              alt={profile.alias}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-semibold text-white">
                <MapPin className="w-2.5 h-2.5 text-rose-400" />
                {profile.distanceKm} km
              </span>

              {profile.isOnline && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
              )}
            </div>

            {/* Bottom Info & Wave Action */}
            <div className="absolute inset-x-0 bottom-0 p-3 z-10 space-y-1.5 text-white">
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-extrabold text-sm text-white truncate">
                    {profile.alias}, {profile.age}
                  </h3>
                  {profile.isVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-slate-200 truncate">
                  {profile.occupationCategory}
                </p>
              </div>

              {/* Interest Tag */}
              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-[9px] font-semibold text-white truncate max-w-full">
                  #{profile.interestTags[0]}
                </span>
              </div>

              {/* Direct Wave Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sendWave(profile);
                }}
                className="w-full py-1.5 rounded-xl bg-white/90 hover:bg-slate-900 hover:text-white text-[11px] font-bold text-slate-900 transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <span>👋</span>
                <span>Wave</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
