import React from 'react';

interface AudioVisualizerProps {
  isPlaying?: boolean;
  barCount?: number;
  height?: number;
  color?: 'brand' | 'cyan' | 'coral' | 'emerald';
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying = true,
  barCount = 12,
  height = 24,
  color = 'brand',
  className = '',
}) => {
  const colorClass = {
    brand: 'bg-gradient-to-t from-sky-400 to-rose-400',
    cyan: 'bg-sky-400',
    coral: 'bg-rose-500',
    emerald: 'bg-emerald-400',
  }[color];

  // Deterministic wave pattern
  const heights = [35, 70, 100, 45, 85, 60, 95, 40, 75, 90, 50, 80, 30, 65, 85, 40];

  return (
    <div
      className={`flex items-center gap-[3px] ${className}`}
      style={{ height: `${height}px` }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const barHeightPercent = heights[i % heights.length];
        const animationDelay = `${(i * 0.12).toFixed(2)}s`;
        const animationDuration = `${0.6 + (i % 4) * 0.2}s`;

        return (
          <div
            key={i}
            className={`w-[3px] rounded-full transition-all duration-300 ${colorClass}`}
            style={{
              height: isPlaying ? `${barHeightPercent}%` : '20%',
              animation: isPlaying ? `waveBar ${animationDuration} ease-in-out infinite alternate` : 'none',
              animationDelay,
            }}
          />
        );
      })}
    </div>
  );
};
