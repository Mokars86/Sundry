import React, { useState } from 'react';
import { useApp } from '../../context/AppStateContext';
import { BrandLogo } from '../common/BrandLogo';
import {
  Search,
  MoreVertical,
  Shield,
  MapPin,
  Settings,
  X,
  Lock,
  UserCheck,
  EyeOff,
  ShieldAlert,
  Edit,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    aliasPersona,
    updateAliasPersona,
    setIsAliasDrawerOpen,
    setIsPrivacySheetOpen,
    privacyMode,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setIsNewChatModalOpen,
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 select-none">
      {/* Search Input Bar Mode */}
      {isSearchOpen ? (
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 focus-within:border-sky-500 transition-colors">
            <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder={
                activeTab === 'chats'
                  ? 'Search chats & messages...'
                  : activeTab === 'moments'
                  ? 'Search contacts...'
                  : 'Search by alias or interests...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 px-2 py-1"
          >
            Cancel
          </button>
        </div>
      ) : (
        /* Normal Header Mode */
        <div className="flex items-center justify-between">
          {/* Left Area based on activeTab */}
          {activeTab === 'chats' && (
            <div className="flex items-center gap-2">
              <BrandLogo size={32} showText={false} />
              <h1 className="font-extrabold text-xl tracking-tight text-slate-900">
                Chat List
              </h1>
            </div>
          )}

          {activeTab === 'moments' && (
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">Moments</span>
              <button
                onClick={() => setIsPrivacySheetOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-all"
              >
                <Lock className="w-3 h-3 text-sky-600" />
                <span>
                  {privacyMode === 'all'
                    ? 'All Contacts'
                    : privacyMode === 'exclude'
                    ? 'Custom'
                    : 'Close Circles'}
                </span>
              </button>
            </div>
          )}

          {activeTab === 'connect' && (
            <div className="flex items-center gap-2">
              {/* Alias Persona Pill Trigger */}
              <button
                onClick={() => setIsAliasDrawerOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-bold transition-all shadow-xs"
              >
                <span className="text-base">🎭</span>
                <span>{aliasPersona.alias}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>

              {/* Distance Pill */}
              <button
                onClick={() => {
                  const nextRadius = aliasPersona.distanceRadiusKm === 5 ? 15 : aliasPersona.distanceRadiusKm === 15 ? 30 : 5;
                  updateAliasPersona({ distanceRadiusKm: nextRadius });
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-slate-900"
                title="Change distance radius"
              >
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>{aliasPersona.distanceRadiusKm} km</span>
              </button>
            </div>
          )}

          {/* Right Action Icons */}
          <div className="flex items-center gap-1">
            {activeTab === 'chats' && (
              <button
                onClick={() => setIsNewChatModalOpen(true)}
                className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="New Message"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}

            {activeTab === 'connect' && (
              <>
                {/* Incognito Shield Toggle */}
                <button
                  onClick={() => updateAliasPersona({ incognito: !aliasPersona.incognito })}
                  className={`p-2 rounded-full transition-all ${
                    aliasPersona.incognito
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                  title={aliasPersona.incognito ? 'Incognito Mode Active' : 'Enable Incognito'}
                >
                  {aliasPersona.incognito ? (
                    <EyeOff className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                </button>

                {/* Settings / Preferences */}
                <button
                  onClick={() => setIsAliasDrawerOpen(true)}
                  className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  title="Connect Preferences"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </>
            )}

            {activeTab !== 'connect' && (
              <>
                {/* Global Search Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* More Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {isMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95">
                        {activeTab === 'chats' ? (
                          <>
                            <button
                              onClick={() => {
                                setIsMenuOpen(false);
                                alert('New Broadcast feature');
                              }}
                              className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <UserCheck className="w-4 h-4 text-sky-600" />
                              <span>New Broadcast</span>
                            </button>
                            <button
                              onClick={() => {
                                setIsMenuOpen(false);
                                alert('Linked devices verified (E2EE)');
                              }}
                              className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Lock className="w-4 h-4 text-rose-500" />
                              <span>Linked Devices</span>
                            </button>
                            <button
                              onClick={() => {
                                setIsMenuOpen(false);
                                alert('Opening Sundry settings');
                              }}
                              className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100"
                            >
                              <Settings className="w-4 h-4 text-slate-400" />
                              <span>App Settings</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsPrivacySheetOpen(true);
                              }}
                              className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <ShieldAlert className="w-4 h-4 text-sky-600" />
                              <span>Status Privacy</span>
                            </button>
                            <button
                              onClick={() => {
                                setIsMenuOpen(false);
                                alert('Moments are encrypted & auto-expire in 24 hours');
                              }}
                              className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Lock className="w-4 h-4 text-emerald-600" />
                              <span>24h Ephemeral Info</span>
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
