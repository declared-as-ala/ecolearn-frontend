'use client';

import React from 'react';

interface EcoHeroProps {
  emotion?: 'happy' | 'thinking' | 'sad' | 'celebrating' | 'neutral' | 'encouraging' | 'worried';
  size?: 'small' | 'medium' | 'large';
  animation?: 'idle' | 'bounce' | 'wave' | 'jump' | 'pulse';
  className?: string;
}

export default function EcoHero({
  emotion = 'happy',
  size = 'medium',
  animation = 'idle',
  className = ''
}: EcoHeroProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const animationClasses = {
    idle: 'animate-[float_2s_ease-in-out_infinite]',
    bounce: 'animate-[bounce_0.5s_ease-in-out_3]',
    wave: 'animate-[wave_0.5s_ease-in-out_2]',
    jump: 'animate-[jump_0.4s_ease-in-out_2]',
    pulse: 'animate-pulse'
  };

  const getFaceExpression = () => {
    switch (emotion) {
      case 'happy':
        return (
          <>
            {/* Eyes - happy */}
            <circle cx="32" cy="32" r="3" fill="#000" />
            <circle cx="48" cy="32" r="3" fill="#000" />
            {/* Smile */}
            <path d="M 30 42 Q 40 48 50 42" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'thinking':
        return (
          <>
            {/* Eyes - thinking (looking up) */}
            <circle cx="32" cy="28" r="3" fill="#000" />
            <circle cx="48" cy="28" r="3" fill="#000" />
            {/* Thinking mouth */}
            <circle cx="40" cy="42" r="2" fill="#000" />
          </>
        );
      case 'sad':
        return (
          <>
            {/* Eyes - sad */}
            <circle cx="32" cy="30" r="3" fill="#000" />
            <circle cx="48" cy="30" r="3" fill="#000" />
            {/* Frown */}
            <path d="M 30 46 Q 40 40 50 46" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'worried':
        return (
          <>
            {/* Eyes - worried (wide) */}
            <circle cx="32" cy="32" r="4" fill="#000" />
            <circle cx="48" cy="32" r="4" fill="#000" />
            {/* Wavy mouth */}
            <path d="M 30 44 Q 35 40, 40 44 T 50 44" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Sweat drop optional but kept simple */}
          </>
        );
      case 'celebrating':
        return (
          <>
            {/* Eyes - big happy */}
            <ellipse cx="32" cy="30" rx="4" ry="3" fill="#000" />
            <ellipse cx="48" cy="30" rx="4" ry="3" fill="#000" />
            {/* Big smile */}
            <path d="M 28 42 Q 40 52 52 42" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
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
      className={`${sizeClasses[size]} ${className} relative ${animationClasses[animation]}`}
    >
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Body - rounded friendly shape */}
        <ellipse cx="40" cy="50" rx="22" ry="18" fill="#4ade80" stroke="#22c55e" strokeWidth="2" />

        {/* Head */}
        <circle cx="40" cy="30" r="18" fill="#86efac" stroke="#22c55e" strokeWidth="2" />

        {/* Face expression */}
        {getFaceExpression()}

        {/* Eco leaf on head */}
        <path
          d="M 40 15 Q 35 10 30 15 Q 35 12 40 15 Q 45 12 50 15 Q 45 10 40 15"
          fill="#22c55e"
          className="animate-[leafSway_2s_ease-in-out_infinite]"
          style={{ transformOrigin: '40px 15px' }}
        />

        {/* Arms */}
        <ellipse cx="25" cy="45" rx="4" ry="12" fill="#86efac" />
        <ellipse cx="55" cy="45" rx="4" ry="12" fill="#86efac" />
      </svg>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
        @keyframes jump {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(10deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

