import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppStateContext';
import { Avatar } from '../common/Avatar';
import { AudioVisualizer } from '../common/AudioVisualizer';
import {
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Mic,
  Send,
  Lock,
  Smile,
  Check,
  CheckCheck,
  Play,
  Pause,
  Sparkles,
  MapPin,
  ShieldCheck,
  Volume2,
  Heart,
  RotateCcw,
  X as XIcon,
  Star,
  Users,
  MicOff,
  Hand,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DesktopDetailPane: React.FC = () => {
  const {
    activeTab,
    selectedConversation,
    sendMessage,
    toggleReaction,
    activeMoment,
    setActiveMoment,
    matchProfiles,
    likeProfile,
    passProfile,
    superConnectProfile,
    rewindProfile,
    swipedProfilesHistory,
    activeAudioLounge,
    leaveAudioLounge,
    toggleSpeakerMute,
    toggleUserStageHand,
    isUserHandRaised,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [activeReactionMsgId, setActiveReactionMsgId] = useState<string | null>(null);
  const [isPlayingBioVoice, setIsPlayingBioVoice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  const emojis = ['❤️', '🔥', '😂', '👏', '😮', '😢'];
  const topProfile = matchProfiles[0];

  // 1. Tab = Chats & Conversation Selected
  if (activeTab === 'chats' && selectedConversation) {
    const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim()) return;
      sendMessage(selectedConversation.id, inputText.trim());
      setInputText('');
    };

    return (
      <div className="h-full flex flex-col bg-slate-50 relative">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Avatar
              src={selectedConversation.avatar}
              alt={selectedConversation.name}
              size="md"
              isOnline={selectedConversation.isOnline}
            />
            <div>
              <h2 className="font-extrabold text-sm text-slate-900">
                {selectedConversation.name}
              </h2>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span>{selectedConversation.isOnline ? 'Online' : selectedConversation.lastSeen || 'Direct encrypted'}</span>
                <Lock className="w-3 h-3 text-sky-600" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Starting encrypted voice call with ${selectedConversation.name}`)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Voice Call"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert(`Starting encrypted video call with ${selectedConversation.name}`)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Video Call"
            >
              <Video className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert('Conversation info')}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="More"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex justify-center my-2">
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-500 shadow-2xs">
              <Lock className="w-3 h-3 text-sky-600" />
              <span>Messages and calls are end-to-end encrypted.</span>
            </div>
          </div>

          {selectedConversation.messages.map((msg) => {
            const isMe = msg.senderId === 'me';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group relative`}
              >
                <div
                  onClick={() =>
                    setActiveReactionMsgId(
                      activeReactionMsgId === msg.id ? null : msg.id
                    )
                  }
                  className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm relative transition-all ${
                    isMe
                      ? 'bg-slate-900 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.type === 'image' && msg.imageUrl && (
                    <div className="rounded-xl overflow-hidden mb-2 max-w-sm">
                      <img
                        src={msg.imageUrl}
                        alt="Shared media"
                        className="w-full h-auto object-cover max-h-72"
                      />
                    </div>
                  )}

                  {msg.type === 'audio' && (
                    <div className="flex items-center gap-3 py-1 min-w-[220px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingAudioId(
                            playingAudioId === msg.id ? null : msg.id
                          );
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                          isMe ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                        }`}
                      >
                        {playingAudioId === msg.id ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current pl-0.5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <AudioVisualizer
                          isPlaying={playingAudioId === msg.id}
                          barCount={18}
                          height={20}
                          color={isMe ? 'cyan' : 'coral'}
                        />
                        <span className="text-[10px] opacity-80 mt-1 block">
                          {msg.audioDuration || '0:15'}
                        </span>
                      </div>
                    </div>
                  )}

                  {msg.type !== 'audio' && msg.text && (
                    <p className="leading-relaxed break-words">{msg.text}</p>
                  )}

                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isMe ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMe && (
                      <span>
                        {msg.status === 'read' ? (
                          <CheckCheck className="w-3.5 h-3.5 text-sky-400 inline" />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-slate-300 inline" />
                        )}
                      </span>
                    )}
                  </div>

                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="absolute -bottom-2.5 right-2 flex items-center gap-1 bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-sm">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="text-xs">
                          {r.emoji} {r.count > 1 ? r.count : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {activeReactionMsgId === msg.id && (
                  <div className="flex items-center gap-1.5 p-1.5 mt-1 bg-white border border-slate-200 rounded-full shadow-lg z-10 animate-in fade-in zoom-in-95">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          toggleReaction(selectedConversation.id, msg.id, emoji);
                          setActiveReactionMsgId(null);
                        }}
                        className="hover:scale-125 transition-transform text-base px-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
        >
          <button
            type="button"
            onClick={() => {
              const sample =
                'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80';
              sendMessage(selectedConversation.id, 'Photo', 'image', sample);
            }}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2 focus-within:border-slate-900 transition-colors">
            <input
              type="text"
              placeholder={`Type a message to ${selectedConversation.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setInputText((prev) => prev + ' 😊')}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>

          {inputText.trim() ? (
            <button
              type="submit"
              className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md hover:bg-slate-800 transition-all flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => sendMessage(selectedConversation.id, 'Audio Note (0:12)', 'audio')}
              className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center border border-slate-200 transition-all flex-shrink-0"
              title="Voice Note"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    );
  }

  // 2. Tab = Connect & Active Live Audio Lounge
  if (activeTab === 'connect' && activeAudioLounge) {
    return (
      <div className="h-full flex flex-col bg-slate-50 justify-between p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              LIVE THERAPY STAGE
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              {activeAudioLounge.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{activeAudioLounge.description}</p>
          </div>
          <button
            onClick={leaveAudioLounge}
            className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs hover:bg-rose-100"
          >
            Leave Stage
          </button>
        </div>

        {/* Stage Speakers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-rose-500" />
              Active Stage Speakers
            </h3>
            <AudioVisualizer isPlaying={true} barCount={12} height={20} color="coral" />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {activeAudioLounge.speakers.map((s) => (
              <div
                key={s.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 text-center shadow-xs flex flex-col items-center space-y-2 relative"
              >
                <Avatar src={s.avatar} alt={s.alias} size="xl" ringType={s.isSpeaking ? 'speaking' : 'none'} />
                <h4 className="font-bold text-sm text-slate-900">{s.alias}</h4>
                <span className="text-xs text-slate-400">{s.isHost ? 'Host 👑' : 'Speaker'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Listeners Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-600" />
            Listeners ({activeAudioLounge.listenerCount})
          </h3>
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200">
                <Avatar src={`https://images.unsplash.com/photo-${1530000000000 + i * 1000000}?w=100&auto=format&fit=crop&q=80`} alt={`Listener`} size="sm" />
                <span className="text-[10px] text-slate-500 font-bold mt-1">
                  {i === 0 ? 'You (Zephyr)' : `Listener_${i + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Action Controls */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-rose-500 font-bold text-xs flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Applaud Stage</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleUserStageHand}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                isUserHandRaised ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Hand className="w-4 h-4" />
              <span>{isUserHandRaised ? 'Hand Raised ✋' : 'Raise Hand'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Tab = Connect & Match View Active
  if (activeTab === 'connect' && topProfile) {
    return (
      <div className="h-full overflow-y-auto p-8 bg-slate-50 space-y-6 select-none">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">
                {topProfile.alias}, {topProfile.age}
              </h2>
              {topProfile.isVerified && <ShieldCheck className="w-5 h-5 text-sky-600" />}
            </div>
            <p className="text-xs font-semibold text-slate-500 flex items-center gap-2 mt-1">
              <span>{topProfile.occupationCategory}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-sky-600">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {topProfile.distanceKm} km away
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => rewindProfile()}
              disabled={swipedProfilesHistory.length === 0}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-amber-500 flex items-center justify-center hover:bg-slate-100 disabled:opacity-30 shadow-2xs"
              title="Undo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => passProfile(topProfile)}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-rose-500 flex items-center justify-center hover:bg-slate-100 shadow-2xs"
              title="Pass"
            >
              <XIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={() => superConnectProfile(topProfile)}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-sky-500 flex items-center justify-center hover:bg-slate-100 shadow-2xs"
              title="Super Connect"
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={() => likeProfile(topProfile)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center gap-2 hover:bg-slate-800 shadow-md"
            >
              <Heart className="w-4 h-4 fill-current text-rose-500" />
              <span>Connect</span>
            </button>
          </div>
        </div>

        {/* Voice Intro Card */}
        {topProfile.audioIntro && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingBioVoice(!isPlayingBioVoice)}
                className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs"
              >
                {isPlayingBioVoice ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
              </button>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-rose-500" />
                  Voice Intro Prompt
                </h4>
                <p className="text-[11px] text-slate-400">Duration: {topProfile.audioIntro.duration}</p>
              </div>
            </div>
            <AudioVisualizer isPlaying={isPlayingBioVoice} barCount={16} height={20} color="coral" />
          </div>
        )}

        {/* About Me Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            About Me
          </span>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {topProfile.aboutMe}
          </p>
        </div>

        {/* Bio Prompts */}
        <div className="grid grid-cols-2 gap-4">
          {topProfile.bioPrompts.map((p) => (
            <div key={p.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-sky-600 block">{p.question}</span>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">{p.answer}</p>
            </div>
          ))}
        </div>

        {/* Interest Badges */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Interest Badges
          </span>
          <div className="flex flex-wrap gap-2">
            {topProfile.interestTags.map((t, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. Default Empty Desktop State
  return (
    <div className="h-full flex flex-col items-center justify-center p-12 text-center select-none bg-slate-50">
      <div className="w-24 h-24 rounded-3xl bg-white border border-slate-200 shadow-lg p-3 flex items-center justify-center mb-6">
        <img src="/logo.jpg" alt="Sundry" className="w-full h-full object-cover rounded-2xl" />
      </div>

      <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
        Sundry for Web & Desktop
      </h2>
      <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6">
        Select a conversation from the left, explore ephemeral moments, or toggle your alias persona to connect and join peer therapy lounges.
      </p>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-600 shadow-2xs">
        <Lock className="w-3.5 h-3.5 text-sky-600" />
        <span>End-to-End Encrypted & Decoupled Privacy</span>
      </div>
    </div>
  );
};
