'use client';

import React from 'react';

interface FriendlyAnimalProps {
  type?: 'bird' | 'rabbit' | 'turtle' | 'fish' | 'butterfly' | 'owl';
  emotion?: 'happy' | 'excited' | 'curious' | 'proud' | 'thinking' | 'celebrating';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function FriendlyAnimal({
  type = 'bird',
  emotion = 'happy',
  size = 'medium',
  className = ''
}: FriendlyAnimalProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-28 h-28'
  };

  const renderAnimal = () => {
    switch (type) {
      case 'bird':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            {/* Bird body */}
            <ellipse cx="30" cy="35" rx="12" ry="10" fill="#4a90e2" />
            {/* Head */}
            <circle cx="30" cy="20" r="10" fill="#7bb3f0" />
            {/* Beak */}
            <path d="M 25 20 L 20 18 L 25 22 Z" fill="#ffa500" />
            {/* Eyes */}
            <circle cx="27" cy="18" r="2" fill="#000" />
            {/* Wing */}
            <ellipse cx="25" cy="32" rx="6" ry="8" fill="#6ba3e0" />
            {/* Tail */}
            <path d="M 42 35 Q 48 30 50 35 Q 48 40 42 35" fill="#4a90e2" />
          </svg>
        );
      case 'rabbit':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            {/* Body */}
            <ellipse cx="30" cy="38" rx="10" ry="12" fill="#f0e6d2" />
            {/* Head */}
            <circle cx="30" cy="20" r="12" fill="#fff8e7" />
            {/* Ears */}
            <ellipse cx="25" cy="10" rx="3" ry="10" fill="#fff8e7" />
            <ellipse cx="35" cy="10" rx="3" ry="10" fill="#fff8e7" />
            <ellipse cx="25" cy="11" rx="2" ry="8" fill="#ffb3ba" />
            <ellipse cx="35" cy="11" rx="2" ry="8" fill="#ffb3ba" />
            {/* Eyes */}
            <circle cx="27" cy="20" r="2" fill="#000" />
            <circle cx="33" cy="20" r="2" fill="#000" />
            {/* Nose */}
            <ellipse cx="30" cy="24" rx="2" ry="1.5" fill="#ffb3ba" />
            {/* Mouth */}
            <path d="M 30 26 Q 28 28 26 27" stroke="#ffb3ba" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'turtle':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            {/* Shell */}
            <ellipse cx="30" cy="30" rx="18" ry="12" fill="#8b7355" />
            {/* Shell pattern */}
            <path d="M 30 20 L 20 25 L 30 30 L 40 25 Z" fill="#6b5b3d" />
            {/* Head */}
            <circle cx="30" cy="42" r="8" fill="#a08a6f" />
            {/* Eyes */}
            <circle cx="27" cy="40" r="1.5" fill="#000" />
            <circle cx="33" cy="40" r="1.5" fill="#000" />
            {/* Legs */}
            <ellipse cx="18" cy="28" rx="3" ry="5" fill="#a08a6f" />
            <ellipse cx="42" cy="28" rx="3" ry="5" fill="#a08a6f" />
          </svg>
        );
      case 'fish':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            {/* Body */}
            <ellipse cx="30" cy="30" rx="15" ry="10" fill="#ff6b6b" />
            {/* Tail */}
            <path d="M 15 30 Q 5 25 8 30 Q 5 35 15 30" fill="#ff5252" />
            {/* Eye */}
            <circle cx="35" cy="27" r="4" fill="#fff" />
            <circle cx="36" cy="27" r="2" fill="#000" />
            {/* Fin */}
            <path d="M 25 22 Q 22 18 25 20" fill="#ff8a80" />
          </svg>
        );
      case 'butterfly':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            {/* Body */}
            <ellipse cx="30" cy="30" rx="2" ry="12" fill="#6b4423" />
            {/* Upper wings */}
            <ellipse cx="22" cy="25" rx="8" ry="10" fill="#ff6b9d" />
            <ellipse cx="38" cy="25" rx="8" ry="10" fill="#ff6b9d" />
            {/* Lower wings */}
            <ellipse cx="22" cy="35" rx="6" ry="8" fill="#ff6b9d" />
            <ellipse cx="38" cy="35" rx="6" ry="8" fill="#ff6b9d" />
            {/* Wing spots */}
            <circle cx="22" cy="25" r="3" fill="#fff" />
            <circle cx="38" cy="25" r="3" fill="#fff" />
          </svg>
        );
      case 'owl':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            {/* Body */}
            <ellipse cx="30" cy="35" rx="14" ry="12" fill="#8b7355" />
            {/* Head */}
            <circle cx="30" cy="20" r="13" fill="#a08a6f" />
            {/* Eyes */}
            <circle cx="25" cy="20" r="5" fill="#fff" />
            <circle cx="35" cy="20" r="5" fill="#fff" />
            <circle cx="25" cy="20" r="3" fill="#000" />
            <circle cx="35" cy="20" r="3" fill="#000" />
            {/* Beak */}
            <path d="M 30 22 L 28 26 L 32 26 Z" fill="#ffa500" />
            {/* Ear tufts */}
            <path d="M 20 12 L 18 8 L 22 10 Z" fill="#8b7355" />
            <path d="M 40 12 L 42 8 L 38 10 Z" fill="#8b7355" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${sizeClasses[size]} ${className} inline-block`}>
      {renderAnimal()}
    </div>
  );
}







