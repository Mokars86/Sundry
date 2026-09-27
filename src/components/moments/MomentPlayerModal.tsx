import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppStateContext';
import { Avatar } from '../common/Avatar';
import { X, Heart, MessageCircle, Send, MoreVertical, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MomentPlayerModal: React.FC = () => {
  const { activeMoment, setActiveMoment, markMomentAsViewed, moments } = useApp();

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [showReplySheet, setShowReplySheet] = useState(false);

  const stories = activeMoment?.stories || [];
  const currentStory = stories[currentStoryIndex];
  const storyDuration = (currentStory?.durationSeconds || 5) * 1000;

  // Track timer progress
  useEffect(() => {
    if (!activeMoment || isPaused || showReplySheet) return;

    const interval = 50; // update every 50ms
    const step = (interval / storyDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next story or close
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex((idx) => idx + 1);
            return 0;
          } else {
            // Find next user moment if available
            const currentIndex = moments.findIndex((m) => m.id === activeMoment.id);
            if (currentIndex !== -1 && currentIndex < moments.length - 1) {
              const nextMoment = moments[currentIndex + 1];
              setActiveMoment(nextMoment);
              setCurrentStoryIndex(0);
              return 0;
            } else {
              markMomentAsViewed(activeMoment.id);
              setActiveMoment(null);
              return 0;
            }
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeMoment, currentStoryIndex, isPaused, showReplySheet, stories.length, storyDuration, moments]);

  if (!activeMoment || !currentStory) return null;

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      markMomentAsViewed(activeMoment.id);
      setActiveMoment(null);
    }
  };

  const handlePrev = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleEmojiReaction = (emoji: string) => {
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.8 },
    });
    alert(`Reacted ${emoji} to ${activeMoment.userName}'s moment!`);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    alert(`Reply sent to ${activeMoment.userName}: "${replyText}"`);
    setReplyText('');
    setShowReplySheet(false);
    setIsPaused(false);
  };

  const emojis = ['🔥', '❤️', '😂', '👏', '😮', '😢'];

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none max-w-md mx-auto shadow-2xl overflow-hidden"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background Media / Text Content */}
      <div className="absolute inset-0 -z-10 bg-slate-950 flex items-center justify-center">
        {currentStory.type === 'image' && currentStory.mediaUrl ? (
          <img
            src={currentStory.mediaUrl}
            alt="Moment media"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center p-8 text-center"
            style={{
              backgroundColor: currentStory.bgColor || '#0F172A',
            }}
          >
            <p
              className="text-xl md:text-2xl font-bold leading-relaxed shadow-text"
              style={{ color: currentStory.textColor || '#FFFFFF' }}
            >
              {currentStory.textContent}
            </p>
          </div>
        )}
        {/* Subtle gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Top Header & Segmented Progress Bars */}
      <div className="p-3.5 space-y-3 z-10">
        {/* Segmented Bars */}
        <div className="flex items-center gap-1.5 w-full">
          {stories.map((s, idx) => {
            let width = '0%';
            if (idx < currentStoryIndex) width = '100%';
            else if (idx === currentStoryIndex) width = `${progress}%`;

            return (
              <div
                key={s.id}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm"
              >
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{ width }}
                />
              </div>
            );
          })}
        </div>

        {/* User Info & Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar
              src={activeMoment.userAvatar}
              alt={activeMoment.userName}
              size="sm"
            />
            <div>
              <h3 className="font-bold text-sm text-white drop-shadow-md">
                {activeMoment.userName}
              </h3>
              <p className="text-[11px] text-slate-300 drop-shadow-md">
                {currentStory.timestamp}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                markMomentAsViewed(activeMoment.id);
                setActiveMoment(null);
              }}
              className="p-2 rounded-full text-white/90 hover:text-white bg-black/40 backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Left / Right Tap Areas for Story Navigation */}
      <div className="absolute inset-0 top-20 bottom-28 flex z-0">
        <div
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="w-1/3 h-full cursor-pointer"
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="w-2/3 h-full cursor-pointer"
        />
      </div>

      {/* Bottom Area: Caption & Swipe-up Reply */}
      <div className="p-4 z-10 space-y-3">
        {/* Caption text */}
        {currentStory.caption && (
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-white text-sm">
            <p>{currentStory.caption}</p>
          </div>
        )}

        {/* Swipe-up & Emoji Reaction Bar */}
        {!activeMoment.isCurrentUser ? (
          <div className="space-y-2">
            {/* Quick emoji reaction pills */}
            <div className="flex items-center justify-center gap-3">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmojiReaction(emoji);
                  }}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-lg flex items-center justify-center hover:scale-125 transition-transform active:scale-95"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Quick Reply Trigger Bar */}
            <form
              onSubmit={handleSendReply}
              className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder={`Reply to ${activeMoment.userName}...`}
                value={replyText}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-white/60 focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 rounded-full text-white hover:text-sky-400"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-md rounded-full">
            <ChevronUp className="w-4 h-4" />
            <span>{activeMoment.viewCount || 0} contacts viewed your status</span>
          </div>
        )}
      </div>
    </div>
  );
};
