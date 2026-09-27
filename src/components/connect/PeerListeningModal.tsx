import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppStateContext';
import { Send, Lock, Shield } from 'lucide-react';

export const PeerListeningModal: React.FC = () => {
  const { peerListening, endPeerListening } = useApp();
  const [messages, setMessages] = useState<
    { id: string; sender: 'me' | 'partner'; text: string; time: string }[]
  >([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (peerListening.status === 'connected') {
      const welcome =
        peerListening.role === 'listener'
          ? 'You are paired with an anonymous peer who needs a compassionate listening ear. Hold space without unsolicited advice unless asked.'
          : 'You are connected with a vetted, anonymous peer listener. You can safely speak your mind here.';

      setMessages([
        {
          id: 'welcome',
          sender: 'partner',
          text: welcome,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [peerListening.status, peerListening.role]);

  if (!peerListening.isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'me' as const,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const replyMsg = {
        id: `m-${Date.now() + 1}`,
        sender: 'partner' as const,
        text:
          peerListening.role === 'listener'
            ? 'Thank you so much for hearing me out. It felt so heavy holding that alone.'
            : 'I hear you completely. That sounds really exhausting to navigate, but you are not alone.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col justify-between select-none max-w-md mx-auto shadow-2xl animate-in slide-in-from-bottom duration-300 text-slate-900">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {peerListening.role === 'listener' ? '👂' : '🗣️'}
          </span>
          <div>
            <h2 className="font-extrabold text-sm text-slate-900">
              {peerListening.status === 'matching'
                ? 'Matching Peer Session...'
                : `1-on-1 with ${peerListening.partnerAlias}`}
            </h2>
            <p className="text-[11px] text-slate-500">
              {peerListening.status === 'matching'
                ? 'Finding a gentle listener'
                : 'Ephemeral • No transcripts saved'}
            </p>
          </div>
        </div>

        <button
          onClick={endPeerListening}
          className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
        >
          End Session
        </button>
      </div>

      {/* Content */}
      {peerListening.status === 'matching' ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-400 to-rose-500 animate-spin opacity-40 blur-xs" />
            <div className="absolute inset-0 flex items-center justify-center text-3xl animate-bounce">
              🤝
            </div>
          </div>

          <h3 className="font-extrabold text-lg text-slate-900">Connecting with an anonymous peer...</h3>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            Matching you based on intent: {peerListening.role === 'listener' ? 'Compassionate Listening' : 'Emotional Venting & Support'}.
          </p>

          <div className="p-3 rounded-2xl bg-white border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-sky-600" />
            <span>Fully private & decoupled from your real contact book.</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex justify-center">
            <div className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] text-slate-500 flex items-center gap-1.5 shadow-2xs">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>Safe Space Active. All messages evaporate when session ends.</span>
            </div>
          </div>

          {messages.map((m) => {
            const isMe = m.sender === 'me';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-slate-900 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isMe ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Input */}
      {peerListening.status === 'connected' && (
        <form
          onSubmit={handleSend}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={
              peerListening.role === 'listener'
                ? 'Send a warm, supportive response...'
                : 'Share what is on your mind...'
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md flex-shrink-0 hover:scale-105 transition-transform"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
