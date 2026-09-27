import React from 'react';
import { useApp } from '../../context/AppStateContext';
import { ConnectSubView } from '../../types';
import { MatchSubView } from '../connect/MatchSubView';
import { ExploreSubView } from '../connect/ExploreSubView';
import { LoungesSubView } from '../connect/LoungesSubView';

export const ConnectTab: React.FC = () => {
  const { connectSubView, setConnectSubView } = useApp();

  const subViewTabs: { id: ConnectSubView; label: string }[] = [
    { id: 'match', label: 'Match' },
    { id: 'explore', label: 'Explore' },
    { id: 'lounges', label: 'Lounges' },
  ];

  return (
    <div className="flex flex-col min-h-full select-none bg-slate-50">
      {/* Segmented Sub-Navigation Bar at Top (Clean sticky top-0 inside main) */}
      <div className="sticky top-0 z-20 px-4 py-2 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center justify-between p-1 bg-slate-100 border border-slate-200 rounded-2xl shadow-inner">
          {subViewTabs.map((tab) => {
            const isSelected = connectSubView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setConnectSubView(tab.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-View Container */}
      <div className="flex-1">
        {connectSubView === 'match' && <MatchSubView />}
        {connectSubView === 'explore' && <ExploreSubView />}
        {connectSubView === 'lounges' && <LoungesSubView />}
      </div>
    </div>
  );
};
