import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { TabType } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { Avatar } from '../common/Avatar';
import {
  MessageSquare,
  Disc,
  Sparkles,
  MapPin,
  EyeOff,
  Shield,
  Settings,
  Lock,
  Plus,
} from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    conversations,
    moments,
    aliasPersona,
    updateAliasPersona,
    setIsAliasDrawerOpen,
    setIsNewChatModalOpen,
  } = useApp();

  const totalUnreadChats = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const unreadMomentsCount = moments.filter((m) => !m.isCurrentUser && m.hasUnread).length;

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    {
      id: 'chats',
      label: 'Chats',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: totalUnreadChats > 0 ? (
        <span className="px-2 py-0.5 bg-slate-900 text-white text-[11px] font-extrabold rounded-full shadow-xs">
          {totalUnreadChats}
        </span>
      ) : null,
    },
    {
      id: 'moments',
      label: 'Moments',
      icon: <Disc className="w-5 h-5" />,
      badge: unreadMomentsCount > 0 ? (
        <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
      ) : null,
    },
    {
      id: 'connect',
      label: 'Connect & Lounges',
      icon: (
        <div className="w-5 h-5 rounded-md overflow-hidden flex items-center justify-center">
          <img src="/logo.jpg" alt="Connect" className="w-full h-full object-cover" />
        </div>
      ),
      badge: (
        <span className="px-2 py-0.5 bg-gradient-to-r from-sky-500/20 to-rose-500/20 text-rose-600 text-[10px] font-bold rounded-full border border-rose-200">
          Alias
        </span>
      ),
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between p-5 select-none h-screen sticky top-0">
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <BrandLogo size={36} showText={true} />
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="New Chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
            Navigation
          </span>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Persona & Security Card */}
      <div className="space-y-3">
        {/* Alias Persona Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Decoupled Alias
            </span>
            <button
              onClick={() => setIsAliasDrawerOpen(true)}
              className="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-0.5"
            >
              <Settings className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <Avatar
              src={aliasPersona.photos[0]}
              alt={aliasPersona.alias}
              size="sm"
              ringType="unread"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-extrabold text-xs text-slate-900 truncate">
                {aliasPersona.alias}
              </h4>
              <p className="text-[10px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-rose-500" />
                <span>{aliasPersona.distanceRadiusKm} km radius</span>
              </p>
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
            <button
              onClick={() => updateAliasPersona({ incognito: !aliasPersona.incognito })}
              className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                aliasPersona.incognito
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <EyeOff className="w-3 h-3" />
              <span>Incognito: {aliasPersona.incognito ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() =>
                updateAliasPersona({ contactShielding: !aliasPersona.contactShielding })
              }
              className={`py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                aliasPersona.contactShielding
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
              title="Contact Shielding"
            >
              <Shield className="w-3 h-3" />
              <span>Shielded</span>
            </button>
          </div>
        </div>

        {/* E2EE Info */}
        <div className="flex items-center gap-2 px-2 text-[10px] text-slate-400 font-medium">
          <Lock className="w-3 h-3 text-sky-600" />
          <span>All chats and moments are end-to-end encrypted.</span>
        </div>
      </div>
    </aside>
  );
};
