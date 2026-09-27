import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { MomentTile } from '../moments/MomentTile';
import { Avatar } from '../common/Avatar';
import { Sparkles, Shield, Clock, Plus } from 'lucide-react';

export const MomentsTab: React.FC = () => {
  const {
    moments,
    setActiveMoment,
    setIsCreateMomentModalOpen,
    setIsPrivacySheetOpen,
    privacyMode,
    searchQuery,
  } = useApp();

  const myMoment = moments.find((m) => m.isCurrentUser);
  const otherMoments = moments.filter((m) => !m.isCurrentUser);

  const filteredMoments = otherMoments.filter((m) =>
    m.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full pb-28 select-none bg-slate-50 space-y-4">
      {/* Top Horizontal Story Avatars Carousel */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-1">
          {/* Add Text / Camera Story */}
          <div
            onClick={() => setIsCreateMomentModalOpen(true)}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 hover:border-slate-500 flex items-center justify-center text-slate-600 transition-colors">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">Add</span>
          </div>

          {/* User stories */}
          {filteredMoments.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveMoment(m)}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            >
              <Avatar
                src={m.userAvatar}
                alt={m.userName}
                size="lg"
                ringType={m.hasUnread ? 'unread' : 'viewed'}
              />
              <span className="text-[11px] font-semibold text-slate-700 mt-1.5 truncate max-w-[60px]">
                {m.userName.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* My Status Card */}
        {myMoment && (
          <MomentTile
            moment={myMoment}
            onClick={() => setActiveMoment(myMoment)}
            onAddClick={() => setIsCreateMomentModalOpen(true)}
          />
        )}

        {/* Moments Feed Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Latest Status Updates
            </span>
            <button
              onClick={() => setIsPrivacySheetOpen(true)}
              className="text-[11px] font-semibold text-sky-600 hover:text-sky-700"
            >
              Privacy: {privacyMode === 'all' ? 'All Contacts' : privacyMode === 'exclude' ? 'Custom' : 'Besties'}
            </button>
          </div>

          <div className="space-y-3">
            {filteredMoments.map((moment) => (
              <MomentTile
                key={moment.id}
                moment={moment}
                onClick={() => setActiveMoment(moment)}
                isFeedCard={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
