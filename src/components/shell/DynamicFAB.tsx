import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { Plus, Edit3, Camera, SlidersHorizontal } from 'lucide-react';

export const DynamicFAB: React.FC = () => {
  const {
    activeTab,
    setIsNewChatModalOpen,
    setIsCreateMomentModalOpen,
    setIsAliasDrawerOpen,
  } = useApp();

  return (
    <div className="fixed bottom-20 right-5 z-20 flex flex-col items-end gap-3 pointer-events-none max-w-md mx-auto">
      {/* Tab 1: Chats FAB (+ New Message) */}
      {activeTab === 'chats' && (
        <button
          onClick={() => setIsNewChatModalOpen(true)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-white font-bold text-xs shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="New Message"
        >
          <Plus className="w-4 h-4" />
          <span>New Message</span>
        </button>
      )}

      {/* Tab 2: Moments Dual Action Pill */}
      {activeTab === 'moments' && (
        <div className="pointer-events-auto flex items-center gap-2 p-1 rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/20 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => setIsCreateMomentModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-800 text-xs font-bold transition-all"
            title="Text Status"
          >
            <Edit3 className="w-3.5 h-3.5 text-sky-400" />
            <span>Text</span>
          </button>
          <div className="w-[1px] h-4 bg-slate-700" />
          <button
            onClick={() => setIsCreateMomentModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-800 text-xs font-bold transition-all"
            title="Camera capture"
          >
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>Camera</span>
          </button>
        </div>
      )}

      {/* Tab 3: Connect FAB */}
      {activeTab === 'connect' && (
        <button
          onClick={() => setIsAliasDrawerOpen(true)}
          className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-md hover:border-slate-300 transition-all hover:scale-105 active:scale-95"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
          <span>Filters</span>
        </button>
      )}
    </div>
  );
};
