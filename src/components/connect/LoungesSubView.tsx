import React, { useState } from 'react';
import { useApp } from '../../context/AppStateContext';
import { Avatar } from '../common/Avatar';
import {
  Sparkles,
  Users,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Volume2,
} from 'lucide-react';
import { AudioVisualizer } from '../common/AudioVisualizer';

export const LoungesSubView: React.FC = () => {
  const {
    dailyGrounding,
    answerDailyGrounding,
    audioLounges,
    joinAudioLounge,
    startPeerListening,
  } = useApp();

  const [groundingInput, setGroundingInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSubmitGrounding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groundingInput.trim()) return;
    answerDailyGrounding(groundingInput.trim());
    setGroundingInput('');
    setShowInput(false);
  };

  return (
    <div className="flex flex-col min-h-full pb-28 px-4 py-3 space-y-5 select-none bg-slate-50">
      {/* 1. Daily Grounding Reflection Card */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-wider border border-sky-100">
            <Sparkles className="w-3 h-3 text-sky-600" />
            <span>Daily Grounding</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {dailyGrounding.responsesCount} shared
          </span>
        </div>

        <h3 className="font-extrabold text-sm text-slate-900 leading-snug my-1.5">
          “{dailyGrounding.prompt}”
        </h3>

        <p className="text-xs text-slate-500 italic mb-3">
          {dailyGrounding.tip}
        </p>

        {dailyGrounding.userAnswered ? (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Reflection completed for today! Keep glowing ✨</span>
          </div>
        ) : showInput ? (
          <form onSubmit={handleSubmitGrounding} className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Share what brought you joy..."
              value={groundingInput}
              onChange={(e) => setGroundingInput(e.target.value)}
              className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm"
            >
              Share
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Reflect & Answer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 2. Audio Rooms (Matching design: Pear Therapy Lounge) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Audio rooms
          </h3>
          <span className="text-[11px] font-bold text-emerald-600">3 Live Rooms</span>
        </div>

        <div className="space-y-3">
          {audioLounges.map((lounge) => (
            <div
              key={lounge.id}
              onClick={() => joinAudioLounge(lounge)}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-base">
                    🎙️
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {lounge.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">Audio room • Safe space</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">•••</span>
              </div>

              {/* Avatars with speaking status badges */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {lounge.speakers.map((s, idx) => (
                      <Avatar
                        key={idx}
                        src={s.avatar}
                        alt={s.alias}
                        size="sm"
                        ringType={s.isSpeaking ? 'speaking' : 'none'}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">
                    <span>{lounge.speakers[0]?.alias} (Host)</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-[10px] text-slate-700 font-bold">
                  <AudioVisualizer isPlaying={true} barCount={4} height={10} color="coral" />
                  <span>{lounge.listenerCount} Listening</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Peer-to-peer counseling gateway (Matching design) */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Peer-to-peer counseling gateway
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Anonymous, 1-on-1 safe space sessions
          </p>
        </div>

        <div className="space-y-2.5">
          {/* Lend an Ear */}
          <button
            onClick={() => startPeerListening('listener')}
            className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center text-lg">
                👂
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">Lend an Ear</h4>
                <p className="text-[11px] text-slate-400">Hold space for an anonymous peer in need</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Need an Ear (Venting) */}
          <button
            onClick={() => startPeerListening('venter')}
            className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-lg">
                🗣️
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">I Need to Vent</h4>
                <p className="text-[11px] text-slate-400">Safely share your feelings without judgment</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
