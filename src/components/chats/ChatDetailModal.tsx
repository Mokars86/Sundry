import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppStateContext';
import {
  ArrowLeft,
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
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { AudioVisualizer } from '../common/AudioVisualizer';

export const ChatDetailModal: React.FC = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    sendMessage,
    toggleReaction,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [activeReactionMessageId, setActiveReactionMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  if (!selectedConversation) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(selectedConversation.id, inputText.trim());
    setInputText('');
  };

  const handleSendAudio = () => {
    sendMessage(selectedConversation.id, 'Audio Note (0:12)', 'audio');
  };

  const handleSendPhoto = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
    ];
    const chosen = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    sendMessage(selectedConversation.id, 'Photo', 'image', chosen);
  };

  const emojis = ['❤️', '🔥', '😂', '👏', '😮', '😢'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in slide-in-from-right duration-250 max-w-md mx-auto shadow-2xl h-[100dvh]">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-slate-200 shadow-xs flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedConversation(null)}
            className="p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <Avatar
            src={selectedConversation.avatar}
            alt={selectedConversation.name}
            size="sm"
            isOnline={selectedConversation.isOnline}
          />

          <div className="min-w-0">
            <h2 className="font-extrabold text-sm text-slate-900 truncate max-w-[150px]">
              {selectedConversation.name}
            </h2>
            <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
              <span>Direct encrypted</span>
              <Lock className="w-2.5 h-2.5 text-sky-600" />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => alert(`Starting encrypted voice call with ${selectedConversation.name}`)}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            title="Voice Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert(`Starting encrypted video call with ${selectedConversation.name}`)}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            title="Video Call"
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('Conversation details')}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            title="More"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-2.5 bg-slate-50">
        {/* E2EE Assurance Pill */}
        <div className="flex justify-center my-1.5">
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] text-slate-500 shadow-2xs">
            <Lock className="w-2.5 h-2.5 text-sky-600" />
            <span>Messages & calls are end-to-end encrypted.</span>
          </div>
        </div>

        {/* Message Bubbles */}
        {selectedConversation.messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group relative`}
            >
              <div
                onClick={() =>
                  setActiveReactionMessageId(
                    activeReactionMessageId === msg.id ? null : msg.id
                  )
                }
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs relative transition-all ${
                  isMe
                    ? 'bg-slate-900 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-2xs'
                }`}
              >
                {/* Image message */}
                {msg.type === 'image' && msg.imageUrl && (
                  <div className="rounded-xl overflow-hidden mb-1.5 max-w-xs">
                    <img
                      src={msg.imageUrl}
                      alt="Shared photo"
                      className="w-full h-auto object-cover max-h-48"
                    />
                  </div>
                )}

                {/* Audio message */}
                {msg.type === 'audio' && (
                  <div className="flex items-center gap-2.5 py-1 min-w-[170px]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingAudioId(
                          playingAudioId === msg.id ? null : msg.id
                        );
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                        isMe ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                      }`}
                    >
                      {playingAudioId === msg.id ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current pl-0.5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <AudioVisualizer
                        isPlaying={playingAudioId === msg.id}
                        barCount={12}
                        height={16}
                        color={isMe ? 'cyan' : 'coral'}
                      />
                      <span className="text-[9px] opacity-80 mt-0.5 block">
                        {msg.audioDuration || '0:15'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Text content */}
                {msg.type !== 'audio' && msg.text && (
                  <p className="leading-relaxed break-words text-xs">{msg.text}</p>
                )}

                {/* Timestamp & Status */}
                <div
                  className={`flex items-center justify-end gap-1 mt-0.5 text-[9px] ${
                    isMe ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isMe && (
                    <span>
                      {msg.status === 'read' ? (
                        <CheckCheck className="w-3 h-3 text-sky-400 inline" />
                      ) : (
                        <Check className="w-3 h-3 text-slate-300 inline" />
                      )}
                    </span>
                  )}
                </div>

                {/* Message Reactions display */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="absolute -bottom-2 right-2 flex items-center gap-1 bg-white border border-slate-200 rounded-full px-1.5 py-0.2 shadow-sm">
                    {msg.reactions.map((r, i) => (
                      <span key={i} className="text-[10px]">
                        {r.emoji} {r.count > 1 ? r.count : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Emoji Reaction Selector Bar */}
              {activeReactionMessageId === msg.id && (
                <div className="flex items-center gap-1 p-1 mt-1 bg-white border border-slate-200 rounded-full shadow-lg z-10 animate-in fade-in zoom-in-95">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        toggleReaction(selectedConversation.id, msg.id, emoji);
                        setActiveReactionMessageId(null);
                      }}
                      className="hover:scale-125 transition-transform text-sm px-1"
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

      {/* Message Composer Bar */}
      <form
        onSubmit={handleSend}
        className="p-2 sm:p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 flex-shrink-0"
      >
        <button
          type="button"
          onClick={handleSendPhoto}
          className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Attach Image"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 focus-within:border-sky-500 transition-colors">
          <input
            type="text"
            placeholder="Type encrypted message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setInputText((prev) => prev + ' 😊')}
            className="text-slate-400 hover:text-slate-700 p-0.5"
          >
            <Smile className="w-3.5 h-3.5" />
          </button>
        </div>

        {inputText.trim() ? (
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSendAudio}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center border border-slate-200 active:scale-95 transition-all flex-shrink-0"
            title="Send Voice Note"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        )}
      </form>
    </div>
  );
};
