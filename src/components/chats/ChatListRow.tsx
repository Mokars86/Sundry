import React from 'react';
import { Conversation } from '../../types';
import { Avatar } from '../common/Avatar';
import { Check, CheckCheck, Mic, Image, Pin } from 'lucide-react';

interface ChatListRowProps {
  conversation: Conversation;
  onClick: () => void;
}

export const ChatListRow: React.FC<ChatListRowProps> = ({ conversation, onClick }) => {
  const {
    name,
    avatar,
    isPinned,
    isOnline,
    lastMessage,
    unreadCount,
  } = conversation;

  const renderStatusIcon = () => {
    if (lastMessage.senderId !== 'me') return null;
    if (lastMessage.status === 'read') {
      return <CheckCheck className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />;
    }
    if (lastMessage.status === 'delivered') {
      return <CheckCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />;
    }
    return <Check className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />;
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3.5 px-4 py-3 hover:bg-slate-100/70 active:bg-slate-200/60 transition-colors cursor-pointer select-none group border-b border-slate-100 bg-white"
    >
      {/* Avatar */}
      <Avatar
        src={avatar}
        alt={name}
        size="md"
        isOnline={isOnline}
      />

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        {/* Name and Timestamp row */}
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            {isPinned && (
              <Pin className="w-3 h-3 text-sky-600 flex-shrink-0 rotate-45" />
            )}
            <h3 className="font-bold text-sm text-slate-900 truncate group-hover:text-sky-600 transition-colors">
              {name}
            </h3>
          </div>
          <span
            className={`text-[11px] font-medium flex-shrink-0 ${
              unreadCount > 0 ? 'text-sky-600 font-bold' : 'text-slate-400'
            }`}
          >
            {lastMessage.timestamp}
          </span>
        </div>

        {/* Message preview and unread badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
            {renderStatusIcon()}

            {lastMessage.isAudio ? (
              <span className="flex items-center gap-1 text-sky-600 font-medium">
                <Mic className="w-3.5 h-3.5" />
                <span>Audio Note {lastMessage.audioDuration ? `(${lastMessage.audioDuration})` : ''}</span>
              </span>
            ) : lastMessage.text.includes('photo') ? (
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <Image className="w-3.5 h-3.5 text-rose-500" />
                <span>Photo</span>
              </span>
            ) : (
              <span className="truncate">{lastMessage.text}</span>
            )}
          </div>

          {unreadCount > 0 && (
            <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px] shadow-xs">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
