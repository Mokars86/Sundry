import React from 'react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-50 bg-gradient-to-b from-white via-slate-50 to-slate-100 flex flex-col items-center justify-between p-8 select-none cursor-pointer transition-opacity duration-500 animate-in fade-in"
    >
      {/* Top ambient space */}
      <div className="w-full flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-full bg-slate-200/60 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Center Branding Block */}
      <div className="flex flex-col items-center text-center space-y-6 -mt-4">
        {/* Glowing Logo Card */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/30 via-rose-400/30 to-rose-500/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
          <div className="relative w-36 h-36 rounded-3xl overflow-hidden shadow-2xl shadow-rose-500/20 border border-slate-100 bg-white p-2">
            <img
              src="/logo.jpg"
              alt="Sundry Logo"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-wider text-slate-900 uppercase">
            SUNDRY
          </h1>
          <p className="text-sm font-semibold tracking-wide text-slate-500">
            Connect, Share, Grow
          </p>
        </div>
      </div>

      {/* Bottom Action & Powered by Mokars Tech */}
      <div className="w-full max-w-xs flex flex-col items-center space-y-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl shadow-slate-900/10 active:scale-95 transition-all"
        >
          Get Started
        </button>

        {/* Powered by: Mokars Tech */}
        <div className="flex flex-col items-center space-y-1.5 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Powered by
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
            <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src="/mokars-tech-logo.png"
                alt="Mokars Tech Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs font-extrabold text-slate-800 tracking-tight">
              Mokars Tech
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
