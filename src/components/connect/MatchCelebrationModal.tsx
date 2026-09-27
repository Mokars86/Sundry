import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { Avatar } from '../common/Avatar';
import { Sparkles, MessageSquare, Send, X, Heart } from 'lucide-react';

export const MatchCelebrationModal: React.FC = () => {
  const {
    matchedProfile,
    setMatchedProfile,
    aliasPersona,
    setSelectedConversation,
  } = useApp();

  if (!matchedProfile) return null;

  const icebreakers = [
    `Hey ${matchedProfile.alias}! Loved your answer about "${matchedProfile.bioPrompts[0]?.question || 'music'}" ✨`,
    `Hi ${matchedProfile.alias}! Looks like we both love #${matchedProfile.interestTags[0] || 'Coffee'} ☕`,
    `Hey there! You have immaculate taste in creative projects 🎨`,
  ];

  const handleStartChat = (icebreakerText?: string) => {
    const newAliasConv = {
      id: `conv-alias-${matchedProfile.id}`,
      name: `${matchedProfile.alias} 🎭`,
      avatar: matchedProfile.photoUrls[0],
      isGroup: false,
      isPinned: true,
      isOnline: true,
      lastMessage: {
        text: icebreakerText || "It's a Mutual Match! 🎉",
        timestamp: 'Just now',
        senderId: 'me',
        status: 'sent' as const,
      },
      unreadCount: 0,
      isArchived: false,
      messages: icebreakerText
        ? [
            {
              id: `msg-init-${Date.now()}`,
              senderId: 'me',
              text: icebreakerText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'sent' as const,
              type: 'text' as const,
            },
          ]
        : [],
    };

    setMatchedProfile(null);
    setSelectedConversation(newAliasConv);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setMatchedProfile(null)}
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in"
      />

      {/* Celebration Content Card */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 z-10 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300 text-slate-900">
        <button
          onClick={() => setMatchedProfile(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold mb-3 animate-bounce">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mutual Connection</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">
          It's a Match!
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          You and <span className="font-bold text-slate-900">{matchedProfile.alias}</span> liked each other's anonymous persona.
        </p>

        {/* Intersecting Dual Avatars */}
        <div className="relative flex items-center justify-center my-3">
          <div className="relative -mr-4 z-10">
            <Avatar
              src={aliasPersona.photos[0]}
              alt={aliasPersona.alias}
              size="xl"
              ringType="unread"
            />
          </div>
          <div className="relative -ml-4 z-0">
            <Avatar
              src={matchedProfile.photoUrls[0]}
              alt={matchedProfile.alias}
              size="xl"
              ringType="unread"
            />
          </div>
          <div className="absolute -bottom-2 z-20 w-9 h-9 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-white shadow-lg animate-pulse">
            <Heart className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Instant Icebreaker Starters */}
        <div className="w-full mt-6 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Send an instant icebreaker
          </span>
          {icebreakers.map((msg, i) => (
            <button
              key={i}
              onClick={() => handleStartChat(msg)}
              className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-800 transition-all hover:scale-[1.02] flex items-center justify-between group shadow-2xs"
            >
              <span className="truncate mr-2 font-medium">{msg}</span>
              <Send className="w-3.5 h-3.5 text-sky-600 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Custom Message Trigger */}
        <button
          onClick={() => handleStartChat()}
          className="w-full mt-4 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-sm shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Open Alias Chat</span>
        </button>
      </div>
    </div>
  );
};
