import React from 'react';
import { UserMoment } from '../../types';
import { Avatar } from '../common/Avatar';
import { Plus, Heart, MessageCircle } from 'lucide-react';

interface MomentTileProps {
  moment: UserMoment;
  onClick: () => void;
  onAddClick?: () => void;
  isFeedCard?: boolean;
}

export const MomentTile: React.FC<MomentTileProps> = ({
  moment,
  onClick,
  onAddClick,
  isFeedCard = false,
}) => {
  const { userName, userAvatar, isCurrentUser, hasUnread, lastUpdated, viewCount, stories } = moment;
  const latestStory = stories[0];

  if (isCurrentUser) {
    return (
      <div
        onClick={stories.length > 0 ? onClick : onAddClick}
        className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md flex items-center justify-between cursor-pointer select-none group hover:shadow-lg transition-all"
      >
        <div className="flex items-center gap-3.5">
          <Avatar
            src={userAvatar}
            alt={userName}
            size="md"
            ringType={stories.length > 0 ? 'unread' : 'none'}
            badge={
              stories.length === 0 ? (
                <div className="w-5 h-5 rounded-full bg-sky-500 border-2 border-slate-900 text-white flex items-center justify-center">
                  <Plus className="w-3 h-3 stroke-[3]" />
                </div>
              ) : undefined
            }
          />
          <div>
            <h3 className="font-extrabold text-sm text-white">
              My Moment
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {stories.length > 0 ? `${lastUpdated} • ${viewCount || 0} views` : 'Tap to add an update'}
            </p>
          </div>
        </div>

        {stories.length > 0 && onAddClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddClick();
            }}
            className="p-2 rounded-full bg-slate-700/80 text-sky-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Add another moment"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // Feed card representation
  if (isFeedCard && latestStory) {
    return (
      <div
        onClick={onClick}
        className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3 cursor-pointer hover:border-slate-300 transition-all select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              src={userAvatar}
              alt={userName}
              size="sm"
              ringType={hasUnread ? 'unread' : 'viewed'}
            />
            <div>
              <h4 className="font-bold text-xs text-slate-900">{userName}</h4>
              <p className="text-[10px] text-slate-400">{lastUpdated}</p>
            </div>
          </div>
          <span className="text-xs text-slate-400">•••</span>
        </div>

        {/* Content Preview */}
        {latestStory.type === 'image' && latestStory.mediaUrl ? (
          <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 relative">
            <img
              src={latestStory.mediaUrl}
              alt={userName}
              className="w-full h-full object-cover"
            />
            {latestStory.caption && (
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-medium">
                {latestStory.caption}
              </div>
            )}
          </div>
        ) : (
          <div
            className="p-6 rounded-xl text-center text-sm font-bold shadow-xs text-white"
            style={{ backgroundColor: latestStory.bgColor || '#0F172A' }}
          >
            {latestStory.textContent}
          </div>
        )}

        {/* Reactions Counter */}
        <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 font-semibold">
          <span className="flex items-center gap-1.5 hover:text-rose-500">
            <Heart className="w-4 h-4" /> 10
          </span>
          <span className="flex items-center gap-1.5 hover:text-sky-500">
            <MessageCircle className="w-4 h-4" /> Reply
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3.5 px-4 py-3 hover:bg-slate-100/80 active:bg-slate-200/60 transition-colors cursor-pointer select-none group bg-white border-b border-slate-100"
    >
      <Avatar
        src={userAvatar}
        alt={userName}
        size="md"
        ringType={hasUnread ? 'unread' : 'viewed'}
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-sky-600 transition-colors">
          {userName}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">{lastUpdated}</p>
      </div>
    </div>
  );
};
