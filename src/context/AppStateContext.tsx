import React, { createContext, useContext, useState, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  TabType,
  ConnectSubView,
  ChatFilter,
  ExploreIntent,
  PrivacyMode,
  Conversation,
  UserMoment,
  MatchProfile,
  AudioLounge,
  TopicalCircle,
  DailyGrounding,
  AliasPersona,
  MomentStory,
} from '../types';
import {
  INITIAL_CONVERSATIONS,
  INITIAL_MOMENTS,
  INITIAL_MATCH_PROFILES,
  INITIAL_AUDIO_LOUNGES,
  INITIAL_TOPICAL_CIRCLES,
  INITIAL_DAILY_GROUNDING,
  INITIAL_ALIAS_PERSONA,
} from '../mock/data';

interface PeerListeningSessionState {
  isOpen: boolean;
  role: 'listener' | 'venter' | null;
  status: 'idle' | 'matching' | 'connected';
  partnerAlias?: string;
  topic?: string;
  secondsElapsed: number;
}

interface AppContextType {
  // Navigation
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  connectSubView: ConnectSubView;
  setConnectSubView: (view: ConnectSubView) => void;
  chatFilter: ChatFilter;
  setChatFilter: (filter: ChatFilter) => void;
  exploreIntent: ExploreIntent;
  setExploreIntent: (intent: ExploreIntent) => void;
  privacyMode: PrivacyMode;
  setPrivacyMode: (mode: PrivacyMode) => void;

  // Search & Global
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Data
  conversations: Conversation[];
  moments: UserMoment[];
  matchProfiles: MatchProfile[];
  swipedProfilesHistory: MatchProfile[];
  audioLounges: AudioLounge[];
  topicalCircles: TopicalCircle[];
  dailyGrounding: DailyGrounding;
  aliasPersona: AliasPersona;

  // Modals & Overlays
  selectedConversation: Conversation | null;
  setSelectedConversation: (conv: Conversation | null) => void;
  activeMoment: UserMoment | null;
  setActiveMoment: (moment: UserMoment | null) => void;
  isNewChatModalOpen: boolean;
  setIsNewChatModalOpen: (open: boolean) => void;
  isCreateMomentModalOpen: boolean;
  setIsCreateMomentModalOpen: (open: boolean) => void;
  isAliasDrawerOpen: boolean;
  setIsAliasDrawerOpen: (open: boolean) => void;
  isPrivacySheetOpen: boolean;
  setIsPrivacySheetOpen: (open: boolean) => void;
  matchedProfile: MatchProfile | null;
  setMatchedProfile: (profile: MatchProfile | null) => void;
  viewingProfile: MatchProfile | null;
  setViewingProfile: (profile: MatchProfile | null) => void;
  activeAudioLounge: AudioLounge | null;
  setActiveAudioLounge: (lounge: AudioLounge | null) => void;
  isAudioMinimized: boolean;
  setIsAudioMinimized: (minimized: boolean) => void;
  peerListening: PeerListeningSessionState;
  setPeerListening: React.Dispatch<React.SetStateAction<PeerListeningSessionState>>;

  // Actions
  sendMessage: (convId: string, text: string, type?: 'text' | 'audio' | 'image', mediaUrl?: string) => void;
  toggleReaction: (convId: string, messageId: string, emoji: string) => void;
  addMoment: (story: Omit<MomentStory, 'id' | 'timestamp'>) => void;
  markMomentAsViewed: (momentId: string) => void;
  likeProfile: (profile: MatchProfile) => void;
  passProfile: (profile: MatchProfile) => void;
  superConnectProfile: (profile: MatchProfile) => void;
  rewindProfile: () => void;
  sendWave: (profile: MatchProfile) => void;
  updateAliasPersona: (updates: Partial<AliasPersona>) => void;
  answerDailyGrounding: (answer: string) => void;
  startPeerListening: (role: 'listener' | 'venter') => void;
  endPeerListening: () => void;
  joinAudioLounge: (lounge: AudioLounge) => void;
  leaveAudioLounge: () => void;
  toggleSpeakerMute: (speakerId: string) => void;
  toggleUserStageHand: () => void;
  isUserHandRaised: boolean;
  isUserSpeaking: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [connectSubView, setConnectSubView] = useState<ConnectSubView>('match');
  const [chatFilter, setChatFilter] = useState<ChatFilter>('all');
  const [exploreIntent, setExploreIntent] = useState<ExploreIntent>('all');
  const [privacyMode, setPrivacyMode] = useState<PrivacyMode>('all');

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Core Data
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [moments, setMoments] = useState<UserMoment[]>(INITIAL_MOMENTS);
  const [matchProfiles, setMatchProfiles] = useState<MatchProfile[]>(INITIAL_MATCH_PROFILES);
  const [swipedProfilesHistory, setSwipedProfilesHistory] = useState<MatchProfile[]>([]);
  const [audioLounges, setAudioLounges] = useState<AudioLounge[]>(INITIAL_AUDIO_LOUNGES);
  const [topicalCircles] = useState<TopicalCircle[]>(INITIAL_TOPICAL_CIRCLES);
  const [dailyGrounding, setDailyGrounding] = useState<DailyGrounding>(INITIAL_DAILY_GROUNDING);
  const [aliasPersona, setAliasPersona] = useState<AliasPersona>(INITIAL_ALIAS_PERSONA);

  // Modals
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [activeMoment, setActiveMoment] = useState<UserMoment | null>(null);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isCreateMomentModalOpen, setIsCreateMomentModalOpen] = useState(false);
  const [isAliasDrawerOpen, setIsAliasDrawerOpen] = useState(false);
  const [isPrivacySheetOpen, setIsPrivacySheetOpen] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<MatchProfile | null>(null);
  const [viewingProfile, setViewingProfile] = useState<MatchProfile | null>(null);

  // Audio Lounge & Peer Therapy
  const [activeAudioLounge, setActiveAudioLounge] = useState<AudioLounge | null>(null);
  const [isAudioMinimized, setIsAudioMinimized] = useState(false);
  const [isUserHandRaised, setIsUserHandRaised] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);

  // Peer Listening Gateway
  const [peerListening, setPeerListening] = useState<PeerListeningSessionState>({
    isOpen: false,
    role: null,
    status: 'idle',
    secondsElapsed: 0,
  });

  // Action: Send Message
  const sendMessage = (
    convId: string,
    text: string,
    type: 'text' | 'audio' | 'image' = 'text',
    mediaUrl?: string
  ) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as const,
      type,
      imageUrl: type === 'image' ? mediaUrl : undefined,
      audioDuration: type === 'audio' ? '0:12' : undefined,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            lastMessage: {
              text: type === 'audio' ? 'Audio Note (0:12)' : type === 'image' ? 'Sent a photo 📷' : text,
              timestamp: newMessage.timestamp,
              senderId: 'me',
              status: 'sent' as const,
              isAudio: type === 'audio',
              audioDuration: type === 'audio' ? '0:12' : undefined,
            },
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );

    // If conversation is open, update selected conversation as well
    setSelectedConversation((prev) =>
      prev && prev.id === convId
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        : prev
    );

    // Auto simulated reply after 1.8s
    setTimeout(() => {
      const replyMessage = {
        id: `msg-reply-${Date.now()}`,
        senderId: 'partner',
        text: 'Got it! Sounds like a great plan 😊',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read' as const,
        type: 'text' as const,
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === convId) {
            return {
              ...c,
              lastMessage: {
                text: replyMessage.text,
                timestamp: replyMessage.timestamp,
                senderId: 'partner',
                status: 'read' as const,
              },
              messages: [...c.messages, replyMessage],
            };
          }
          return c;
        })
      );

      setSelectedConversation((prev) =>
        prev && prev.id === convId
          ? {
              ...prev,
              messages: [...prev.messages, replyMessage],
            }
          : prev
      );
    }, 1800);
  };

  // Action: Toggle Message Reaction
  const toggleReaction = (convId: string, messageId: string, emoji: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const updatedMessages = c.messages.map((m) => {
            if (m.id === messageId) {
              const reactions = m.reactions || [];
              const existing = reactions.find((r) => r.emoji === emoji);
              if (existing) {
                return {
                  ...m,
                  reactions: reactions.map((r) =>
                    r.emoji === emoji ? { ...r, count: r.count + 1 } : r
                  ),
                };
              } else {
                return {
                  ...m,
                  reactions: [...reactions, { emoji, count: 1, users: ['me'] }],
                };
              }
            }
            return m;
          });
          return { ...c, messages: updatedMessages };
        }
        return c;
      })
    );
  };

  // Action: Add Moment
  const addMoment = (storyData: Omit<MomentStory, 'id' | 'timestamp'>) => {
    const newStory: MomentStory = {
      ...storyData,
      id: `story-${Date.now()}`,
      timestamp: 'Just now',
    };

    setMoments((prev) =>
      prev.map((m) => {
        if (m.isCurrentUser) {
          return {
            ...m,
            lastUpdated: 'Just now',
            stories: [newStory, ...m.stories],
          };
        }
        return m;
      })
    );
    setIsCreateMomentModalOpen(false);
  };

  // Action: Mark Moment as Viewed
  const markMomentAsViewed = (momentId: string) => {
    setMoments((prev) =>
      prev.map((m) => (m.id === momentId ? { ...m, hasUnread: false } : m))
    );
  };

  // Action: Matchmaking Swipes
  const likeProfile = (profile: MatchProfile) => {
    setSwipedProfilesHistory((prev) => [profile, ...prev]);
    setMatchProfiles((prev) => prev.filter((p) => p.id !== profile.id));

    // High compatibility match celebration
    if ((profile.compatibilityScore || 80) >= 88) {
      setTimeout(() => {
        setMatchedProfile(profile);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00B4D8', '#FF5E7E', '#38BDF8', '#F43F5E'],
        });
      }, 300);
    }
  };

  const passProfile = (profile: MatchProfile) => {
    setSwipedProfilesHistory((prev) => [profile, ...prev]);
    setMatchProfiles((prev) => prev.filter((p) => p.id !== profile.id));
  };

  const superConnectProfile = (profile: MatchProfile) => {
    setSwipedProfilesHistory((prev) => [profile, ...prev]);
    setMatchProfiles((prev) => prev.filter((p) => p.id !== profile.id));
    // Trigger match celebration with special flare
    setMatchedProfile(profile);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FF5E7E', '#00B4D8'],
    });
  };

  const rewindProfile = () => {
    if (swipedProfilesHistory.length === 0) return;
    const [lastSwiped, ...remainingHistory] = swipedProfilesHistory;
    setMatchProfiles((prev) => [lastSwiped, ...prev]);
    setSwipedProfilesHistory(remainingHistory);
  };

  const sendWave = (profile: MatchProfile) => {
    alert(`👋 Sent an icebreaker wave to ${profile.alias}!`);
  };

  const updateAliasPersona = (updates: Partial<AliasPersona>) => {
    setAliasPersona((prev) => ({ ...prev, ...updates }));
  };

  const answerDailyGrounding = (_answer: string) => {
    setDailyGrounding((prev) => ({
      ...prev,
      responsesCount: prev.responsesCount + 1,
      userAnswered: true,
    }));
  };

  // Peer Listening
  const startPeerListening = (role: 'listener' | 'venter') => {
    setPeerListening({
      isOpen: true,
      role,
      status: 'matching',
      secondsElapsed: 0,
    });

    // Simulate match connection in 2.5s
    setTimeout(() => {
      setPeerListening((prev) => ({
        ...prev,
        status: 'connected',
        partnerAlias: role === 'listener' ? 'Seeking_Solace_22' : 'Gentle_Anchor_7',
        topic: 'Navigating boundary conversations with partner',
      }));
    }, 2500);
  };

  const endPeerListening = () => {
    setPeerListening({
      isOpen: false,
      role: null,
      status: 'idle',
      secondsElapsed: 0,
    });
  };

  // Audio Lounges
  const joinAudioLounge = (lounge: AudioLounge) => {
    setActiveAudioLounge(lounge);
    setIsAudioMinimized(false);
  };

  const leaveAudioLounge = () => {
    setActiveAudioLounge(null);
    setIsAudioMinimized(false);
    setIsUserHandRaised(false);
    setIsUserSpeaking(false);
  };

  const toggleSpeakerMute = (speakerId: string) => {
    if (!activeAudioLounge) return;
    setActiveAudioLounge((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        speakers: prev.speakers.map((s) =>
          s.id === speakerId ? { ...s, isMuted: !s.isMuted } : s
        ),
      };
    });
  };

  const toggleUserStageHand = () => {
    setIsUserHandRaised((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        connectSubView,
        setConnectSubView,
        chatFilter,
        setChatFilter,
        exploreIntent,
        setExploreIntent,
        privacyMode,
        setPrivacyMode,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        conversations,
        moments,
        matchProfiles,
        swipedProfilesHistory,
        audioLounges,
        topicalCircles,
        dailyGrounding,
        aliasPersona,
        selectedConversation,
        setSelectedConversation,
        activeMoment,
        setActiveMoment,
        isNewChatModalOpen,
        setIsNewChatModalOpen,
        isCreateMomentModalOpen,
        setIsCreateMomentModalOpen,
        isAliasDrawerOpen,
        setIsAliasDrawerOpen,
        isPrivacySheetOpen,
        setIsPrivacySheetOpen,
        matchedProfile,
        setMatchedProfile,
        viewingProfile,
        setViewingProfile,
        activeAudioLounge,
        setActiveAudioLounge,
        isAudioMinimized,
        setIsAudioMinimized,
        peerListening,
        setPeerListening,
        sendMessage,
        toggleReaction,
        addMoment,
        markMomentAsViewed,
        likeProfile,
        passProfile,
        superConnectProfile,
        rewindProfile,
        sendWave,
        updateAliasPersona,
        answerDailyGrounding,
        startPeerListening,
        endPeerListening,
        joinAudioLounge,
        leaveAudioLounge,
        toggleSpeakerMute,
        toggleUserStageHand,
        isUserHandRaised,
        isUserSpeaking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppStateProvider');
  }
  return context;
};
