'use client';

import React from 'react';

interface WiseGuideProps {
  emotion?: 'happy' | 'thinking' | 'explaining' | 'proud' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  animation?: 'idle' | 'nod' | 'speak' | 'gesture'; // kept in interface to avoid breaking usages, but will be ignored
  className?: string;
}

export default function WiseGuide({
  emotion = 'explaining',
  size = 'medium',
  animation = 'idle',
  className = ''
}: WiseGuideProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const getFaceExpression = () => {
    switch (emotion) {
      case 'happy':
        return (
          <>
            <circle cx="32" cy="32" r="3" fill="#000" />
            <circle cx="48" cy="32" r="3" fill="#000" />
            <path d="M 30 42 Q 40 48 50 42" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'thinking':
        return (
          <>
            <line x1="30" y1="30" x2="34" y2="32" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="30" x2="50" y2="32" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <path d="M 35 44 Q 40 42 45 44" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'explaining':
        return (
          <>
            <ellipse cx="32" cy="30" rx="3" ry="4" fill="#000" />
            <ellipse cx="48" cy="30" rx="3" ry="4" fill="#000" />
            <ellipse cx="40" cy="42" rx="6" ry="3" fill="#000" />
          </>
        );
      case 'proud':
        return (
          <>
            <circle cx="32" cy="28" r="3" fill="#000" />
            <circle cx="48" cy="28" r="3" fill="#000" />
            <path d="M 28 44 Q 40 50 52 44" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <circle cx="32" cy="32" r="3" fill="#000" />
            <circle cx="48" cy="32" r="3" fill="#000" />
            <line x1="35" y1="42" x2="45" y2="42" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <div
      className={`${sizeClasses[size]} ${className} relative`}
    >
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Glow behind - STATIC */}
        <circle cx="40" cy="40" r="35" fill={`url(#glow-${emotion})`} opacity="0.4" />

        <defs>
          <radialGradient id={`glow-${emotion}`}>
            <stop offset="0%" stopColor="#d4a574" stopOpacity="1" />
            <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Body/Head (Wise old owl/spirit shape) */}
        <path
          d="M 40 10 Q 60 10 65 30 Q 70 50 60 70 Q 40 80 20 70 Q 10 50 15 30 Q 20 10 40 10"
          fill="white"
          stroke="#b8860b"
          strokeWidth="3"
        />

        {/* Face */}
        {getFaceExpression()}

        {/* Glasses (Wisdom) */}
        <g stroke="#b8860b" strokeWidth="2" fill="none" opacity="0.7">
          <circle cx="32" cy="35" r="8" />
          <circle cx="48" cy="35" r="8" />
          <path d="M 40 35 L 40 35" />
        </g>

        {/* Beard (Wisdom) */}
        <path
          d="M 30 55 Q 40 65 50 55"
          stroke="gray"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2,2"
        />
      </svg>
    </div>
  );
}
