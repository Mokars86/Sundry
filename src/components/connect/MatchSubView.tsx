import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { MatchCard } from './MatchCard';
import { RotateCcw, X, Star, Heart, Sparkles } from 'lucide-react';

export const MatchSubView: React.FC = () => {
  const {
    matchProfiles,
    likeProfile,
    passProfile,
    superConnectProfile,
    rewindProfile,
    swipedProfilesHistory,
  } = useApp();

  const topProfile = matchProfiles[0];
  const nextProfile = matchProfiles[1];

  return (
    <div className="flex flex-col h-[calc(100vh-175px)] max-h-[640px] relative px-4 select-none">
      {/* Card Stack Viewport */}
      <div className="flex-1 relative w-full my-2">
        {matchProfiles.length === 0 ? (
          <div className="absolute inset-0 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl">
              ✨
            </div>
            <h3 className="font-bold text-lg text-white">No More Profiles Nearby</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              You’ve reviewed all active personas in your 5 km radius. Expand your radius or check back soon!
            </p>
            {swipedProfilesHistory.length > 0 && (
              <button
                onClick={rewindProfile}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold text-xs flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rewind Last Swiped Profile</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Background Card (2nd in stack) */}
            {nextProfile && (
              <MatchCard
                key={nextProfile.id}
                profile={nextProfile}
                isTopCard={false}
                onLike={() => {}}
                onPass={() => {}}
                onSuperConnect={() => {}}
              />
            )}

            {/* Foreground Active Card (1st in stack) */}
            {topProfile && (
              <MatchCard
                key={topProfile.id}
                profile={topProfile}
                isTopCard={true}
                onLike={() => likeProfile(topProfile)}
                onPass={() => passProfile(topProfile)}
                onSuperConnect={() => superConnectProfile(topProfile)}
              />
            )}
          </>
        )}
      </div>

      {/* Floating Match Control Bar */}
      {topProfile && (
        <div className="flex items-center justify-center gap-4 py-2 z-20">
          {/* Rewind */}
          <button
            onClick={rewindProfile}
            disabled={swipedProfilesHistory.length === 0}
            className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100"
            title="Undo Pass"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Pass (Swipe Left) */}
          <button
            onClick={() => passProfile(topProfile)}
            className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 text-rose-500 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 hover:bg-rose-500/10 hover:border-rose-500/50 transition-all"
            title="Pass"
          >
            <X className="w-7 h-7 stroke-[2.5]" />
          </button>

          {/* Super Connect (Direct Ping) */}
          <button
            onClick={() => superConnectProfile(topProfile)}
            className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 text-sky-400 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 hover:bg-sky-500/10 hover:border-sky-500/50 transition-all"
            title="Super Connect"
          >
            <Star className="w-5 h-5 fill-current" />
          </button>

          {/* Like (Swipe Right) */}
          <button
            onClick={() => likeProfile(topProfile)}
            className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all"
            title="Like"
          >
            <Heart className="w-7 h-7 fill-current stroke-[1.5]" />
          </button>
        </div>
      )}
    </div>
  );
};
