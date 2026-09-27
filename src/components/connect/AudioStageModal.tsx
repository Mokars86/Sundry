import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { Avatar } from '../common/Avatar';
import { AudioVisualizer } from '../common/AudioVisualizer';
import {
  X,
  Minimize2,
  Mic,
  MicOff,
  Hand,
  Volume2,
  ShieldAlert,
  Users,
  Heart,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AudioStageModal: React.FC = () => {
  const {
    activeAudioLounge,
    isAudioMinimized,
    setIsAudioMinimized,
    leaveAudioLounge,
    toggleSpeakerMute,
    toggleUserStageHand,
    isUserHandRaised,
  } = useApp();

  if (!activeAudioLounge) return null;

  // Render floating minimizer bar when minimized
  if (isAudioMinimized) {
    return (
      <div
        onClick={() => setIsAudioMinimized(false)}
        className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-3 shadow-xl flex items-center justify-between cursor-pointer animate-in slide-in-from-bottom"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
            🎙️
          </div>
          <div className="min-w-0">
            <h4 className="font-extrabold text-xs text-slate-900 truncate">
              {activeAudioLounge.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <AudioVisualizer isPlaying={true} barCount={6} height={12} color="coral" />
              <span className="text-[10px] text-slate-500">
                {activeAudioLounge.listenerCount} listening
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={toggleUserStageHand}
            className={`p-2 rounded-xl text-xs font-semibold ${
              isUserHandRaised ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Hand className="w-4 h-4" />
          </button>
          <button
            onClick={leaveAudioLounge}
            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const handleStageReaction = () => {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00B4D8', '#FF5E7E', '#34D399'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col justify-between select-none max-w-md mx-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAudioMinimized(true)}
            className="p-2 rounded-full text-slate-500 hover:text-slate-800 bg-slate-100"
            title="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
              LIVE STAGE
            </span>
            <h2 className="font-extrabold text-sm text-slate-900 truncate max-w-[200px] mt-0.5">
              {activeAudioLounge.title}
            </h2>
          </div>
        </div>

        <button
          onClick={leaveAudioLounge}
          className="px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs hover:bg-rose-100 transition-colors"
        >
          Leave Quietly
        </button>
      </div>

      {/* Main Stage Room */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Safe Space Policy Banner */}
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900">
          <ShieldAlert className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>
            Automated toxicity filters and anonymous moderation are active. Speak with empathy.
          </span>
        </div>

        {/* Stage Speakers Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-rose-500" />
              Stage Speakers ({activeAudioLounge.speakers.length})
            </span>
            <AudioVisualizer isPlaying={true} barCount={8} height={16} color="coral" />
          </div>

          <div className="grid grid-cols-3 gap-3.5">
            {activeAudioLounge.speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs relative"
              >
                <div className="relative">
                  <Avatar
                    src={speaker.avatar}
                    alt={speaker.alias}
                    size="lg"
                    ringType={speaker.isSpeaking ? 'speaking' : 'none'}
                  />
                  <div
                    onClick={() => toggleSpeakerMute(speaker.id)}
                    className={`absolute -bottom-1 -right-1 p-1 rounded-full border border-white cursor-pointer ${
                      speaker.isMuted
                        ? 'bg-rose-600 text-white'
                        : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {speaker.isMuted ? (
                      <MicOff className="w-3 h-3" />
                    ) : (
                      <Mic className="w-3 h-3" />
                    )}
                  </div>
                </div>

                <p className="font-bold text-xs text-slate-900 mt-2 truncate w-full">
                  {speaker.alias}
                </p>
                <span className="text-[10px] text-slate-400">
                  {speaker.isHost ? 'Host 👑' : 'Speaker'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Listeners Section */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
            <Users className="w-3.5 h-3.5 text-sky-600" />
            Listeners In The Room ({activeAudioLounge.listenerCount})
          </span>

          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <Avatar
                  src={`https://images.unsplash.com/photo-${1530000000000 + idx * 1000000}?w=100&auto=format&fit=crop&q=80`}
                  alt={`Listener ${idx + 1}`}
                  size="sm"
                />
                <span className="text-[10px] text-slate-500 mt-1 truncate max-w-[60px] font-medium">
                  {idx === 0 ? 'You (Zephyr)' : `Listener_${idx + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stage Controls */}
      <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
        <button
          onClick={handleStageReaction}
          className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-rose-500 flex items-center gap-1.5 text-xs font-bold"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>React ❤️</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Raise Hand button */}
          <button
            onClick={toggleUserStageHand}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              isUserHandRaised
                ? 'bg-amber-500 text-white shadow-md animate-pulse'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <Hand className="w-4 h-4" />
            <span>{isUserHandRaised ? 'Hand Raised ✋' : 'Raise Hand'}</span>
          </button>

          {/* Mute toggle */}
          <button
            onClick={() => alert(isUserHandRaised ? 'Mic unmuted' : 'Raise hand first to request speaking on stage')}
            className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center border border-slate-200"
          >
            <MicOff className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
