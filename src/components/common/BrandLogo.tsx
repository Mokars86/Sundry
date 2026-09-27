import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 32,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white"
        style={{ width: size, height: size }}
      >
        <img
          src="/logo.jpg"
          alt="Sundry Logo"
          className="w-full h-full object-cover"
        />
      </div>
      {showText && (
        <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center font-sans">
          Sundry
        </span>
      )}
    </div>
  );
};
