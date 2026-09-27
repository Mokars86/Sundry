import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isOnline?: boolean;
  ringType?: 'none' | 'unread' | 'viewed' | 'speaking';
  onClick?: () => void;
  className?: string;
  badge?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  isOnline,
  ringType = 'none',
  onClick,
  className = '',
  badge,
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-9 h-9 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
  }[size];

  const ringClasses = {
    none: '',
    unread: 'p-[2px] bg-gradient-to-tr from-sky-400 via-rose-400 to-rose-500 rounded-full shadow-sm',
    viewed: 'p-[2px] bg-slate-300 rounded-full',
    speaking: 'p-[2px] bg-emerald-500 animate-pulse rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]',
  }[ringType];

  const onlineDotSize = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
    xl: 'w-4.5 h-4.5',
    '2xl': 'w-5 h-5',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-block flex-shrink-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className={ringClasses}>
        <div className={`${sizeClasses} rounded-full overflow-hidden bg-slate-100 border-2 border-white flex items-center justify-center shadow-xs`}>
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="font-bold text-slate-600">
              {alt.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {isOnline && (
        <span
          className={`absolute bottom-0 right-0 ${onlineDotSize} bg-emerald-500 rounded-full ring-2 ring-white`}
        />
      )}

      {badge && (
        <div className="absolute -bottom-1 -right-1">
          {badge}
        </div>
      )}
    </div>
  );
};
