import React, { useState } from 'react';
import { AppStateProvider, useApp } from './context/AppStateContext';
import { SplashScreen } from './components/common/SplashScreen';
import { OnboardingScreen } from './components/common/OnboardingScreen';
import { Header } from './components/shell/Header';
import { BottomNav } from './components/shell/BottomNav';
import { DynamicFAB } from './components/shell/DynamicFAB';
import { AliasDrawer } from './components/shell/AliasDrawer';
import { PrivacySheet } from './components/shell/PrivacySheet';
import { DesktopSidebar } from './components/desktop/DesktopSidebar';
import { DesktopDetailPane } from './components/desktop/DesktopDetailPane';
import { ChatsTab } from './components/tabs/ChatsTab';
import { MomentsTab } from './components/tabs/MomentsTab';
import { ConnectTab } from './components/tabs/ConnectTab';
import { ChatDetailModal } from './components/chats/ChatDetailModal';
import { NewChatModal } from './components/chats/NewChatModal';
import { MomentPlayerModal } from './components/moments/MomentPlayerModal';
import { CreateMomentModal } from './components/moments/CreateMomentModal';
import { MatchCelebrationModal } from './components/connect/MatchCelebrationModal';
import { ProfileDetailModal } from './components/connect/ProfileDetailModal';
import { AudioStageModal } from './components/connect/AudioStageModal';
import { PeerListeningModal } from './components/connect/PeerListeningModal';

const MainShell: React.FC = () => {
  const { activeTab } = useApp();
  const [authState, setAuthState] = useState<'splash' | 'onboarding' | 'app'>('splash');

  if (authState === 'splash') {
    return <SplashScreen onDismiss={() => setAuthState('onboarding')} />;
  }

  if (authState === 'onboarding') {
    return <OnboardingScreen onComplete={() => setAuthState('app')} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-stretch font-sans antialiased text-slate-900 overflow-x-hidden">
      {/* DESKTOP LAYOUT (>= 1024px) */}
      <div className="hidden lg:flex w-full min-h-screen bg-white shadow-xl max-w-[1600px] mx-auto overflow-hidden">
        {/* 1. Left Sidebar Navigation */}
        <DesktopSidebar />

        {/* 2. Middle Feed / List Column */}
        <div className="w-[420px] flex-shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col h-screen overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto no-scrollbar relative">
            {activeTab === 'chats' && <ChatsTab />}
            {activeTab === 'moments' && <MomentsTab />}
            {activeTab === 'connect' && <ConnectTab />}
          </main>
        </div>

        {/* 3. Right Detail / Active Workspace Pane */}
        <div className="flex-1 bg-white flex flex-col h-screen overflow-hidden">
          <DesktopDetailPane />
        </div>
      </div>

      {/* MOBILE LAYOUT (< 1024px) */}
      <div className="flex lg:hidden w-full max-w-md min-h-screen bg-slate-50 relative flex-col">
        {/* Global Dynamic Top Header */}
        <Header />

        {/* Active Screen View */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {activeTab === 'chats' && <ChatsTab />}
          {activeTab === 'moments' && <MomentsTab />}
          {activeTab === 'connect' && <ConnectTab />}
        </main>

        {/* Floating Action Button (Dynamic per tab) */}
        <DynamicFAB />

        {/* Persistent Bottom 3-Tab Shell */}
        <BottomNav />

        {/* Mobile Push Modals */}
        <div className="lg:hidden">
          <ChatDetailModal />
        </div>
      </div>

      {/* Shared Modals & Overlays (Available on all screen sizes) */}
      <NewChatModal />
      <MomentPlayerModal />
      <CreateMomentModal />
      <PrivacySheet />
      <AliasDrawer />
      <MatchCelebrationModal />
      <ProfileDetailModal />
      <AudioStageModal />
      <PeerListeningModal />
    </div>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <MainShell />
    </AppStateProvider>
  );
}
