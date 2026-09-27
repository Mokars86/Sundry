import React, { useState } from 'react';
import { useApp } from '../../context/AppStateContext';
import {
  X,
  Shield,
  EyeOff,
  Mic,
  Camera,
  Plus,
  Trash2,
  Check,
  Sparkles,
  MapPin,
  Lock,
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { AudioVisualizer } from '../common/AudioVisualizer';

export const AliasDrawer: React.FC = () => {
  const {
    isAliasDrawerOpen,
    setIsAliasDrawerOpen,
    aliasPersona,
    updateAliasPersona,
  } = useApp();

  const [aliasInput, setAliasInput] = useState(aliasPersona.alias);
  const [bioInput, setBioInput] = useState(
    'Creating visual poetry and collecting memories across West Africa.'
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isAliasDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsAliasDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Slide-over Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎭</span>
              <div>
                <h2 className="font-extrabold text-base text-slate-900">Create your Alias</h2>
                <p className="text-xs text-slate-500">Decoupled persona for Connect & Lounges</p>
              </div>
            </div>
            <button
              onClick={() => setIsAliasDrawerOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-slate-50">
            {/* Alias Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Alias Name
              </label>
              <input
                type="text"
                value={aliasInput}
                onChange={(e) => setAliasInput(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-2xl px-4 py-3 text-slate-900 font-bold text-sm focus:outline-none focus:border-slate-900 shadow-2xs"
                placeholder="e.g. Zephyr_99"
              />
            </div>

            {/* Bio Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Bio
              </label>
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                rows={3}
                className="w-full bg-white border border-slate-300 rounded-2xl px-4 py-3 text-slate-900 text-xs leading-relaxed focus:outline-none focus:border-slate-900 shadow-2xs resize-none"
                placeholder="Write a brief introduction..."
              />
            </div>

            {/* Photos Row with (+) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Photos ({aliasPersona.photos.length}/6)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {aliasPersona.photos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 group shadow-2xs"
                  >
                    <img src={photo} alt={`Alias photo ${i}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => {
                          const updated = aliasPersona.photos.filter((_, idx) => idx !== i);
                          updateAliasPersona({ photos: updated });
                        }}
                        className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {aliasPersona.photos.length < 6 && (
                  <button
                    onClick={() => {
                      const newSamplePhoto =
                        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80';
                      updateAliasPersona({ photos: [...aliasPersona.photos, newSamplePhoto] });
                    }}
                    className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 bg-white hover:border-slate-600 flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shadow-2xs"
                  >
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>

            {/* Hide me from phone contacts Toggle (From Design) */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-sky-600" />
                    Hide me from phone contacts
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Your real contact book cannot see this alias
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateAliasPersona({ contactShielding: !aliasPersona.contactShielding })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    aliasPersona.contactShielding ? 'bg-slate-900' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                      aliasPersona.contactShielding ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Incognito Mode Toggle */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <EyeOff className="w-3.5 h-3.5 text-purple-600" />
                    Incognito Mode
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Only profiles you like first can see you
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateAliasPersona({ incognito: !aliasPersona.incognito })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    aliasPersona.incognito ? 'bg-purple-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                      aliasPersona.incognito ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Voice Intro */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-rose-500" />
                  Voice Intro Prompt (0:15)
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Recorded</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs"
                  >
                    {isPlayingAudio ? (
                      <span className="text-xs font-bold">⏸</span>
                    ) : (
                      <span className="text-xs font-bold pl-0.5">▶</span>
                    )}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-slate-900">“Hey, I’m Zephyr...”</p>
                    <p className="text-[10px] text-slate-400">Audio Voice Note (0:15)</p>
                  </div>
                </div>
                <AudioVisualizer isPlaying={isPlayingAudio} barCount={8} height={18} color="coral" />
              </div>
            </div>
          </div>

          {/* Footer with "Next / Save" button */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <button
              onClick={() => {
                if (aliasInput.trim()) {
                  updateAliasPersona({ alias: aliasInput.trim() });
                }
                setIsAliasDrawerOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-sm shadow-md hover:bg-slate-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
