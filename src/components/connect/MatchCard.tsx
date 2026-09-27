import React, { useState } from 'react';
import { MatchProfile } from '../../types';
import {
  MapPin,
  Sparkles,
  Volume2,
  ChevronUp,
  ShieldCheck,
  Play,
  Pause,
  Info,
} from 'lucide-react';
import { AudioVisualizer } from '../common/AudioVisualizer';

interface MatchCardProps {
  profile: MatchProfile;
  isTopCard: boolean;
  onLike: () => void;
  onPass: () => void;
  onSuperConnect: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  profile,
  isTopCard,
  onLike,
  onPass,
  onSuperConnect,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentPhoto = profile.photoUrls[activePhotoIdx] || profile.photoUrls[0];

  // Touch & Mouse Drag Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isTopCard) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !isTopCard) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isTopCard) return;
    setIsDragging(false);

    // Swipe trigger threshold
    if (dragOffset.x > 100) {
      onLike();
    } else if (dragOffset.x < -100) {
      onPass();
    } else if (dragOffset.y < -120) {
      onSuperConnect();
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = dragOffset.x * 0.08;
  const transform = isDragging
    ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) rotate(${rotation}deg)`
    : 'none';

  return (
    <div
      className={`absolute inset-0 rounded-3xl overflow-hidden shadow-xl transition-transform duration-150 select-none bg-white border border-slate-200 ${
        isTopCard ? 'cursor-grab active:cursor-grabbing z-10' : 'scale-95 translate-y-3 z-0 pointer-events-none'
      }`}
      style={{ transform }}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe Direction Badges Overlay */}
      {isDragging && dragOffset.x > 50 && (
        <div className="absolute top-8 left-6 z-30 px-4 py-2 rounded-2xl border-2 border-emerald-500 bg-emerald-500/80 text-white shadow-lg rotate-[-15deg]">
          <span className="font-black text-2xl tracking-wider">LIKE 💚</span>
        </div>
      )}
      {isDragging && dragOffset.x < -50 && (
        <div className="absolute top-8 right-6 z-30 px-4 py-2 rounded-2xl border-2 border-rose-500 bg-rose-500/80 text-white shadow-lg rotate-[15deg]">
          <span className="font-black text-2xl tracking-wider">PASS ❌</span>
        </div>
      )}
      {isDragging && dragOffset.y < -60 && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-2xl border-2 border-amber-400 bg-amber-500 text-white shadow-xl">
          <span className="font-black text-2xl tracking-wider">SUPER CONNECT ⭐</span>
        </div>
      )}

      {/* Main Image */}
      <img
        src={currentPhoto}
        alt={profile.alias}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Top Segmented Photo Indicators */}
      {profile.photoUrls.length > 1 && (
        <div className="absolute top-3 inset-x-3 z-20 flex gap-1.5">
          {profile.photoUrls.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-all ${
                activePhotoIdx === i ? 'bg-white shadow-xs' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Photo Tap Areas (Left / Right) */}
      <div className="absolute inset-x-0 top-12 bottom-32 z-10 flex">
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (activePhotoIdx > 0) setActivePhotoIdx(activePhotoIdx - 1);
          }}
          className="w-1/2 h-full"
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (activePhotoIdx < profile.photoUrls.length - 1)
              setActivePhotoIdx(activePhotoIdx + 1);
          }}
          className="w-1/2 h-full"
        />
      </div>

      {/* Gradient Vignette Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

      {/* Profile Card Header Info */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-20 space-y-3 text-white">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                {profile.alias}
              </h2>
              <span className="text-xl font-semibold text-slate-200">
                {profile.age}
              </span>
              {profile.isVerified && (
                <ShieldCheck className="w-5 h-5 text-sky-400 fill-sky-400/20" />
              )}
            </div>

            {profile.compatibilityScore && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/30 border border-rose-400/50 text-white text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{profile.compatibilityScore}% Match</span>
              </div>
            )}
          </div>

          <p className="text-xs font-medium text-slate-200 mt-1 flex items-center gap-2">
            <span>{profile.occupationCategory}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-sky-300">
              <MapPin className="w-3 h-3 text-sky-300" />
              {profile.distanceKm} km away
            </span>
          </p>
        </div>

        {/* 3 Interest Tags */}
        <div className="flex flex-wrap gap-1.5">
          {profile.interestTags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Pull-Up Bio Bottom Sheet Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsBioExpanded(true);
          }}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white hover:bg-white/25 transition-colors"
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <Info className="w-4 h-4 text-sky-300 flex-shrink-0" />
            <span className="truncate">
              {profile.bioPrompts[0]?.question}: “{profile.bioPrompts[0]?.answer}”
            </span>
          </div>
          <span className="text-sky-300 flex items-center gap-0.5 text-[11px] whitespace-nowrap">
            Bio <ChevronUp className="w-4 h-4" />
          </span>
        </button>
      </div>

      {/* Expanded Bio Bottom Sheet */}
      {isBioExpanded && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-30 bg-white flex flex-col justify-between p-5 overflow-y-auto animate-in slide-in-from-bottom duration-250 text-slate-900"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  {profile.alias}, {profile.age}
                  {profile.isVerified && <ShieldCheck className="w-5 h-5 text-sky-600" />}
                </h3>
                <p className="text-xs text-slate-500">{profile.occupationCategory}</p>
              </div>
              <button
                onClick={() => setIsBioExpanded(false)}
                className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            {/* Audio Voice Intro */}
            {profile.audioIntro && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current pl-0.5" />
                    )}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-rose-500" />
                      Voice Intro Prompt
                    </p>
                    <p className="text-[11px] text-slate-500">Duration: {profile.audioIntro.duration}</p>
                  </div>
                </div>
                <AudioVisualizer isPlaying={isPlayingAudio} barCount={10} height={20} color="coral" />
              </div>
            )}

            {/* About Me */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                About Me
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{profile.aboutMe}</p>
            </div>

            {/* Prompt Cards */}
            <div className="space-y-3">
              {profile.bioPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs"
                >
                  <p className="text-xs font-bold text-sky-600 mb-1.5">{prompt.question}</p>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {prompt.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* All Interest Badges */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Interests & Passions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.interestTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
