import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { ChatFilter } from '../../types';
import { ChatListRow } from '../chats/ChatListRow';
import { Pin, MessageSquareDashed, SlidersHorizontal, MessageSquare } from 'lucide-react';

export const ChatsTab: React.FC = () => {
  const {
    conversations,
    chatFilter,
    setChatFilter,
    setSelectedConversation,
    searchQuery,
  } = useApp();

  const totalUnreadCount = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  const filterTabs: { id: ChatFilter; label: string; count?: number; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'All', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'groups', label: 'Groups' },
    { id: 'unread', label: 'Unread', count: totalUnreadCount },
    { id: 'archived', label: 'Archived', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
  ];

  // Filtering logic
  const filteredConversations = conversations.filter((c) => {
    // Search query filter
    if (searchQuery.trim()) {
      const matchName = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchMsg = c.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchName && !matchMsg) return false;
    }

    // Pill tab filter
    if (chatFilter === 'unread') return (c.unreadCount || 0) > 0;
    if (chatFilter === 'groups') return c.isGroup;
    if (chatFilter === 'archived') return c.isArchived;
    return !c.isArchived; // default for 'all'
  });

  const pinnedChats = filteredConversations.filter((c) => c.isPinned);
  const recentChats = filteredConversations.filter((c) => !c.isPinned);

  return (
    <div className="flex flex-col min-h-full pb-28 select-none bg-slate-50">
      {/* Segmented Filter Pills Bar (Clean sticky top-0 inside main) */}
      <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar bg-white sticky top-0 z-10 border-b border-slate-200 shadow-2xs">
        {filterTabs.map((pill) => {
          const isSelected = chatFilter === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setChatFilter(pill.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {pill.icon}
              <span>{pill.label}</span>
              {pill.count !== undefined && pill.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {pill.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {filteredConversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <MessageSquareDashed className="w-12 h-12 text-slate-300 mb-3" />
          <p className="font-bold text-sm text-slate-700">No conversations found</p>
          <p className="text-xs text-slate-400 mt-1">Try switching filter pills</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {/* Pinned Chats Section */}
          {pinnedChats.length > 0 && (
            <div className="bg-white">
              <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <Pin className="w-3 h-3 text-sky-600 rotate-45" />
                <span>Pinned</span>
              </div>
              {pinnedChats.map((chat) => (
                <ChatListRow
                  key={chat.id}
                  conversation={chat}
                  onClick={() => setSelectedConversation(chat)}
                />
              ))}
            </div>
          )}

          {/* Recent Conversations Section */}
          {recentChats.length > 0 && (
            <div className="bg-white">
              <div className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Recent
              </div>
              {recentChats.map((chat) => (
                <ChatListRow
                  key={chat.id}
                  conversation={chat}
                  onClick={() => setSelectedConversation(chat)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
