'use client';

import React from 'react';

interface WiseGuideProps {
  emotion?: 'happy' | 'thinking' | 'explaining' | 'proud' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  animation?: 'idle' | 'nod' | 'speak' | 'gesture';
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

  const animationClasses = {
    idle: 'animate-[float_3s_ease-in-out_infinite]',
    nod: 'animate-[nod_0.6s_ease-in-out_3]',
    speak: 'animate-[speak_0.3s_ease-in-out_3]',
    gesture: 'animate-[gesture_0.5s_ease-in-out_2]'
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
      className={`${sizeClasses[size]} ${className} relative ${animationClasses[animation]}`}
    >
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Body - wise rounded shape */}
        <ellipse cx="40" cy="52" rx="24" ry="20" fill="#d4a574" stroke="#b8860b" strokeWidth="2" />
        
        {/* Head */}
        <circle cx="40" cy="28" r="20" fill="#e6c99a" stroke="#b8860b" strokeWidth="2" />
        
        {/* Face expression */}
        {getFaceExpression()}
        
        {/* Wise beard */}
        <path d="M 30 38 Q 40 48 50 38 Q 45 44 40 46 Q 35 44 30 38" fill="#8b6914" />
        
        {/* Glasses frames */}
        <circle cx="32" cy="32" r="8" fill="none" stroke="#8b6914" strokeWidth="2" />
        <circle cx="48" cy="32" r="8" fill="none" stroke="#8b6914" strokeWidth="2" />
        <line x1="40" y1="32" x2="40" y2="32" stroke="#8b6914" strokeWidth="2" />
        
        {/* Arms */}
        <ellipse cx="22" cy="48" rx="5" ry="14" fill="#e6c99a" />
        <ellipse cx="58" cy="48" rx="5" ry="14" fill="#e6c99a" />
        
        {/* Eco badge on chest */}
        <circle cx="40" cy="52" r="6" fill="#22c55e" />
        <path d="M 37 50 Q 40 48 43 50 Q 40 52 37 50" fill="#fff" />
      </svg>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes nod {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes speak {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes gesture {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}

