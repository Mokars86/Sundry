export type TabType = 'chats' | 'moments' | 'connect';

export type ConnectSubView = 'match' | 'explore' | 'lounges';

export type ChatFilter = 'all' | 'unread' | 'groups' | 'archived';

export type ExploreIntent = 'all' | 'love' | 'friends' | 'activity';

export type PrivacyMode = 'all' | 'exclude' | 'close_circles';

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'audio' | 'image';
  audioDuration?: string;
  imageUrl?: string;
  reactions?: MessageReaction[];
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  memberCount?: number;
  isPinned: boolean;
  isOnline: boolean;
  lastSeen?: string;
  lastMessage: {
    text: string;
    timestamp: string;
    senderId: string;
    isAudio?: boolean;
    audioDuration?: string;
    status: 'sent' | 'delivered' | 'read';
  };
  unreadCount: number;
  isArchived: boolean;
  messages: Message[];
}

export interface MomentStory {
  id: string;
  mediaUrl?: string;
  type: 'image' | 'text';
  textContent?: string;
  bgColor?: string;
  textColor?: string;
  timestamp: string;
  durationSeconds: number;
  caption?: string;
}

export interface UserMoment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  isCurrentUser: boolean;
  hasUnread: boolean;
  stories: MomentStory[];
  lastUpdated: string;
  viewCount?: number;
}

export interface BioPrompt {
  id: string;
  question: string;
  answer: string;
}

export interface MatchProfile {
  id: string;
  alias: string;
  age: number;
  occupationCategory: string;
  distanceKm: number;
  photoUrls: string[];
  interestTags: string[];
  bioPrompts: BioPrompt[];
  audioIntro?: {
    duration: string;
    waveform: number[];
  };
  isVerified: boolean;
  isOnline: boolean;
  intent: 'love' | 'friends' | 'activity';
  aboutMe: string;
  compatibilityScore?: number;
}

export interface LoungeSpeaker {
  id: string;
  alias: string;
  avatar: string;
  isHost?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
}

export interface AudioLounge {
  id: string;
  title: string;
  category: string;
  listenerCount: number;
  speakers: LoungeSpeaker[];
  isLive: boolean;
  type: 'audio' | 'chat';
  description: string;
}

export interface TopicalCircle {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  recentActivity: string;
}

export interface DailyGrounding {
  id: string;
  prompt: string;
  tip: string;
  responsesCount: number;
  userAnswered: boolean;
}

export interface AliasPersona {
  alias: string;
  age: number;
  location: string;
  distanceRadiusKm: number;
  incognito: boolean;
  contactShielding: boolean;
  photos: string[];
  prompts: BioPrompt[];
  interests: string[];
  voiceIntroSet: boolean;
}
