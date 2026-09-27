import React, { useState } from 'react';
import { useApp } from '../../context/AppStateContext';
import { X, Palette } from 'lucide-react';

export const CreateMomentModal: React.FC = () => {
  const { isCreateMomentModalOpen, setIsCreateMomentModalOpen, addMoment } = useApp();

  const [mode, setMode] = useState<'text' | 'photo'>('text');
  const [textContent, setTextContent] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedBg, setSelectedBg] = useState('#0F172A');
  const [selectedPhoto, setSelectedPhoto] = useState(
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80'
  );

  if (!isCreateMomentModalOpen) return null;

  const bgColors = [
    '#0F172A',
    '#0284C7',
    '#E11D48',
    '#059669',
    '#7C3AED',
    '#EA580C',
    '#475569',
  ];

  const samplePhotos = [
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80',
  ];

  const handlePublish = () => {
    if (mode === 'text') {
      if (!textContent.trim()) return;
      addMoment({
        type: 'text',
        textContent: textContent.trim(),
        bgColor: selectedBg,
        textColor: '#FFFFFF',
        durationSeconds: 5,
      });
    } else {
      addMoment({
        type: 'image',
        mediaUrl: selectedPhoto,
        caption: caption.trim() || undefined,
        durationSeconds: 5,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col justify-between max-w-md mx-auto shadow-2xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 z-10 bg-slate-900/80 backdrop-blur-md">
        <button
          onClick={() => setIsCreateMomentModalOpen(false)}
          className="p-2 rounded-full text-white/80 hover:text-white bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Toggle Mode Pills */}
        <div className="flex items-center bg-slate-800 rounded-full p-1 border border-slate-700">
          <button
            onClick={() => setMode('text')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              mode === 'text' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Text
          </button>
          <button
            onClick={() => setMode('photo')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              mode === 'photo' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Photo / Cam
          </button>
        </div>

        <button
          onClick={handlePublish}
          disabled={mode === 'text' ? !textContent.trim() : false}
          className="px-4 py-1.5 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-md disabled:opacity-40"
        >
          Post
        </button>
      </div>

      {/* Editor Canvas */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {mode === 'text' ? (
          <div
            className="w-full h-full rounded-3xl flex items-center justify-center p-6 transition-colors shadow-2xl relative"
            style={{ backgroundColor: selectedBg }}
          >
            <textarea
              placeholder="Type a status update..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full bg-transparent text-center text-xl md:text-2xl font-bold text-white placeholder-white/50 focus:outline-none resize-none"
              rows={5}
              autoFocus
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-3xl overflow-hidden relative border border-slate-700 flex flex-col justify-end">
            <img
              src={selectedPhoto}
              alt="Selected status media"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Photo selector options */}
            <div className="relative z-10 p-4 space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {samplePhotos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedPhoto === photo ? 'border-white scale-105' : 'border-white/30'
                    }`}
                  >
                    <img src={photo} alt={`Option ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Caption Input */}
              <input
                type="text"
                placeholder="Add a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-white/60 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Toolbar */}
      {mode === 'text' && (
        <div className="p-4 bg-slate-950 flex items-center justify-center gap-3 border-t border-slate-800">
          <Palette className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {bgColors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedBg(color)}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  selectedBg === color ? 'scale-125 border-white shadow-md' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
