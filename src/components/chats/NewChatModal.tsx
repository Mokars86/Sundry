import React, { useState } from 'react';
import { useApp } from '../../context/AppStateContext';
import {
  X,
  Users,
  UserPlus,
  Search,
  ShieldCheck,
  ArrowLeft,
  Check,
  Lock,
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import confetti from 'canvas-confetti';

interface ContactItem {
  name: string;
  phone: string;
  avatar: string;
  id: string;
}

const INITIAL_CONTACT_BOOK: ContactItem[] = [
  { name: 'Sarah Mensah', phone: '+233 24 555 0192', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', id: 'conv-1' },
  { name: 'Kwame Boateng', phone: '+233 20 888 1234', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', id: 'conv-3' },
  { name: 'Akua Serwaa', phone: '+233 55 999 4321', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80', id: 'conv-5' },
  { name: 'Kofi Mensah', phone: '+233 27 123 4567', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', id: 'conv-6' },
  { name: 'Daniel Owusu', phone: '+233 50 444 8877', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', id: 'conv-dan' },
  { name: 'Ama Adobea', phone: '+233 24 333 7711', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', id: 'conv-ama' },
  { name: 'Esi K.', phone: '+233 26 111 2233', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', id: 'conv-esi' },
];

export const NewChatModal: React.FC = () => {
  const { isNewChatModalOpen, setIsNewChatModalOpen, setSelectedConversation, conversations } = useApp();
  
  const [modalMode, setModalMode] = useState<'contacts' | 'new_group' | 'add_contact'>('contacts');
  const [contacts, setContacts] = useState<ContactItem[]>(INITIAL_CONTACT_BOOK);
  const [search, setSearch] = useState('');

  // New Group State
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<ContactItem[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupIcon, setGroupIcon] = useState('✨');

  // Add Contact State
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  if (!isNewChatModalOpen) return null;

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  const resetModal = () => {
    setModalMode('contacts');
    setSearch('');
    setSelectedGroupMembers([]);
    setGroupName('');
    setNewContactName('');
    setNewContactPhone('');
    setIsNewChatModalOpen(false);
  };

  const toggleMemberSelection = (contact: ContactItem) => {
    const isSelected = selectedGroupMembers.some((m) => m.name === contact.name);
    if (isSelected) {
      setSelectedGroupMembers((prev) => prev.filter((m) => m.name !== contact.name));
    } else {
      setSelectedGroupMembers((prev) => [...prev, contact]);
    }
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim() || selectedGroupMembers.length === 0) return;

    const newGroupConversation = {
      id: `conv-group-${Date.now()}`,
      name: `${groupIcon} ${groupName.trim()} (${selectedGroupMembers.length + 1})`,
      avatar: selectedGroupMembers[0].avatar,
      isGroup: true,
      memberCount: selectedGroupMembers.length + 1,
      isPinned: true,
      isOnline: true,
      lastSeen: `${selectedGroupMembers.length + 1} members`,
      lastMessage: {
        text: 'Group created with end-to-end encryption 🔒',
        timestamp: 'Just now',
        senderId: 'me',
        status: 'read' as const,
      },
      unreadCount: 0,
      isArchived: false,
      messages: [
        {
          id: `m-init-${Date.now()}`,
          senderId: 'me',
          text: `Created group "${groupName.trim()}" with ${selectedGroupMembers.map((m) => m.name).join(', ')}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read' as const,
          type: 'text' as const,
        },
      ],
    };

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });

    setSelectedConversation(newGroupConversation);
    resetModal();
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    const sampleAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    ];
    const randomAvatar = sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)];

    const createdContact: ContactItem = {
      id: `c-${Date.now()}`,
      name: newContactName.trim(),
      phone: `+233 ${newContactPhone.trim()}`,
      avatar: randomAvatar,
    };

    setContacts((prev) => [createdContact, ...prev]);

    const newConv = {
      id: `conv-contact-${Date.now()}`,
      name: createdContact.name,
      avatar: createdContact.avatar,
      isGroup: false,
      isPinned: false,
      isOnline: true,
      lastMessage: {
        text: 'Started new encrypted chat',
        timestamp: 'Just now',
        senderId: 'me',
        status: 'read' as const,
      },
      unreadCount: 0,
      isArchived: false,
      messages: [],
    };

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });

    setSelectedConversation(newConv);
    resetModal();
  };

  const groupEmojis = ['✨', '🚀', '💻', '🎨', '☕', '⚽', '🌿', '💡', '🎵'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={resetModal}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
      />

      {/* Responsive Modal Container (iPhone SE 667px Height Aware) */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 z-10 flex flex-col max-h-[94vh] sm:max-h-[85vh] shadow-2xl animate-in zoom-in-95 text-slate-900 overflow-hidden">
        
        {/* ================= MODE 1: CONTACTS LIST ================= */}
        {modalMode === 'contacts' && (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 flex-shrink-0">
              <div>
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900">New Message</h2>
                <p className="text-[11px] text-slate-500">Start an encrypted chat</p>
              </div>
              <button
                onClick={resetModal}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Contact Bar */}
            <div className="my-2.5 flex items-center bg-slate-100 border border-slate-200 rounded-2xl px-3 py-1.5 flex-shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search name or number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Quick Actions (New Group & Add Contact) */}
            <div className="grid grid-cols-2 gap-2 mb-2 flex-shrink-0">
              <button
                onClick={() => setModalMode('new_group')}
                className="flex items-center gap-2 p-2 rounded-2xl bg-sky-50/70 border border-sky-100 hover:bg-sky-100 text-left transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-900 truncate">New Group</p>
                  <p className="text-[9px] text-slate-500 truncate">E2EE Group</p>
                </div>
              </button>

              <button
                onClick={() => setModalMode('add_contact')}
                className="flex items-center gap-2 p-2 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100 text-left transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-900 truncate">Add Contact</p>
                  <p className="text-[9px] text-slate-500 truncate">Save & Chat</p>
                </div>
              </button>
            </div>

            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 py-1 border-t border-slate-100 flex-shrink-0">
              Contacts on Sundry ({filtered.length})
            </div>

            {/* Contacts List (Scrollable Area) */}
            <div className="flex-1 min-h-[140px] overflow-y-auto space-y-1 py-1 pr-1">
              {filtered.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    const existing = conversations.find((c) => c.name === contact.name);
                    if (existing) {
                      setSelectedConversation(existing);
                    } else {
                      const newConv = {
                        id: `conv-contact-${Date.now()}`,
                        name: contact.name,
                        avatar: contact.avatar,
                        isGroup: false,
                        isPinned: false,
                        isOnline: true,
                        lastMessage: {
                          text: 'Started new encrypted chat',
                          timestamp: 'Just now',
                          senderId: 'me',
                          status: 'read' as const,
                        },
                        unreadCount: 0,
                        isArchived: false,
                        messages: [],
                      };
                      setSelectedConversation(newConv);
                    }
                    resetModal();
                  }}
                  className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar src={contact.avatar} alt={contact.name} size="sm" isOnline={true} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{contact.name}</h4>
                      <p className="text-[10px] text-slate-400">{contact.phone}</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MODE 2: NEW GROUP CONVERSATION (iPhone SE Responsive) ================= */}
        {modalMode === 'new_group' && (
          <form onSubmit={handleCreateGroup} className="flex flex-col flex-1 min-h-0 overflow-hidden space-y-2.5">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode('contacts')}
                  className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="font-extrabold text-sm text-slate-900">New Group</h2>
                  <p className="text-[10px] text-slate-500">
                    {selectedGroupMembers.length} selected
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetModal}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Group Subject & Icon */}
            <div className="space-y-1.5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg flex-shrink-0 shadow-2xs">
                  {groupIcon}
                </div>
                <input
                  type="text"
                  placeholder="Group Name (e.g. Core Team)..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs"
                  autoFocus
                />
              </div>

              {/* Group Emoji quick choices */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {groupEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setGroupIcon(emoji)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition-transform flex-shrink-0 ${
                      groupIcon === emoji
                        ? 'bg-slate-900 text-white scale-105 shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Members Chips */}
            {selectedGroupMembers.length > 0 && (
              <div className="space-y-1 flex-shrink-0">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {selectedGroupMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => toggleMemberSelection(member)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-800 cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors flex-shrink-0"
                    >
                      <Avatar src={member.avatar} alt={member.name} size="xs" />
                      <span>{member.name.split(' ')[0]}</span>
                      <X className="w-2.5 h-2.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Member Selection List (Flexible scrollable area) */}
            <div className="flex-1 min-h-[120px] overflow-y-auto space-y-1 pr-1 border-t border-slate-100 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Select Members
              </span>
              {contacts.map((contact) => {
                const isSelected = selectedGroupMembers.some((m) => m.name === contact.name);
                return (
                  <div
                    key={contact.id}
                    onClick={() => toggleMemberSelection(contact)}
                    className={`flex items-center justify-between p-2 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50 border border-sky-200'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar src={contact.avatar} alt={contact.name} size="sm" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{contact.name}</h4>
                        <p className="text-[9px] text-slate-400">{contact.phone}</p>
                      </div>
                    </div>

                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-sky-600 border-sky-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Button (Sticky bottom in modal) */}
            <div className="pt-2 border-t border-slate-100 flex-shrink-0">
              <button
                type="submit"
                disabled={!groupName.trim() || selectedGroupMembers.length === 0}
                className="w-full py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Create Group ({selectedGroupMembers.length + 1})</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= MODE 3: ADD NEW CONTACT (iPhone SE Responsive) ================= */}
        {modalMode === 'add_contact' && (
          <form onSubmit={handleSaveContact} className="flex flex-col flex-1 min-h-0 overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode('contacts')}
                  className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="font-extrabold text-sm text-slate-900">Add Contact</h2>
                  <p className="text-[10px] text-slate-500">Save & start encrypted chat</p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetModal}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contact Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Abena Osei"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs"
                autoFocus
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  🇬🇭 +233
                </div>
                <input
                  type="tel"
                  placeholder="24 123 4567"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs"
                />
              </div>
            </div>

            {/* Security Assurance Card */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Lock className="w-3.5 h-3.5 text-sky-600" />
                <span>Automatic E2EE Key Exchange</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Adding this contact exchanges end-to-end cryptographic keys automatically.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex-shrink-0">
              <button
                type="submit"
                disabled={!newContactName.trim() || !newContactPhone.trim()}
                className="w-full py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Save & Chat</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
