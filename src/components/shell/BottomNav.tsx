import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { MessageSquare, Disc, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, conversations, moments } = useApp();

  const totalUnreadChats = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const unreadMomentsCount = moments.filter((m) => !m.isCurrentUser && m.hasUnread).length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 py-2 select-none shadow-lg">
      <div className="flex items-center justify-around">
        {/* Tab 1: Chats */}
        <button
          onClick={() => setActiveTab('chats')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-4 transition-all duration-200 ${
            activeTab === 'chats' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <MessageSquare
              className={`w-6 h-6 transition-transform ${
                activeTab === 'chats' ? 'scale-110 text-slate-900' : 'text-slate-400'
              }`}
            />
            {totalUnreadChats > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-gradient-to-r from-sky-500 to-rose-500 text-white text-[10px] font-bold rounded-full min-w-[18px] text-center shadow-xs">
                {totalUnreadChats}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Chats</span>
        </button>

        {/* Tab 2: Moments */}
        <button
          onClick={() => setActiveTab('moments')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-4 transition-all duration-200 ${
            activeTab === 'moments' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <Disc
              className={`w-6 h-6 transition-transform ${
                activeTab === 'moments' ? 'scale-110 text-slate-900' : 'text-slate-400'
              }`}
            />
            {unreadMomentsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-tr from-sky-400 to-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Moments</span>
        </button>

        {/* Tab 3: Connect */}
        <button
          onClick={() => setActiveTab('connect')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-4 transition-all duration-200 ${
            activeTab === 'connect' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div
              className={`w-6 h-6 rounded-lg overflow-hidden flex items-center justify-center transition-transform ${
                activeTab === 'connect' ? 'scale-110 shadow-xs ring-2 ring-rose-400' : 'opacity-70'
              }`}
            >
              <img
                src="/logo.jpg"
                alt="Connect"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Connect</span>
        </button>
      </div>
    </nav>
  );
};
