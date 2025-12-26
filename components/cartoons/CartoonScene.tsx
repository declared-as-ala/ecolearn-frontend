'use client';

import React, { useState } from 'react';
import EcoHero from './EcoHero';
import WiseGuide from './WiseGuide';

interface CartoonSceneProps {
  type?: 'lesson-intro' | 'lesson-end' | 'game-scenario' | 'feedback' | 'celebration';
  character?: 'eco-hero' | 'wise-guide' | 'both';
  message: string;
  emotion?: 'happy' | 'thinking' | 'sad' | 'celebrating' | 'explaining';
  onContinue?: () => void;
  showButton?: boolean;
  buttonText?: string;
  background?: 'nature' | 'school' | 'park' | 'home' | 'sky';
  className?: string;
}

export default function CartoonScene({
  type = 'lesson-intro',
  character = 'eco-hero',
  message,
  emotion = 'happy',
  onContinue,
  showButton = true,
  buttonText = 'متابعة',
  background = 'nature',
  className = ''
}: CartoonSceneProps) {
  const backgrounds = {
    nature: 'bg-gradient-to-br from-green-200 via-green-100 to-amber-100',
    school: 'bg-gradient-to-br from-blue-200 via-blue-100 to-white',
    park: 'bg-gradient-to-br from-green-300 via-green-200 to-yellow-100',
    home: 'bg-gradient-to-br from-amber-200 via-white to-green-100',
    sky: 'bg-gradient-to-br from-blue-300 via-blue-200 to-white'
  };

  const getCharacterAnimation = () => {
    if (emotion === 'celebrating') return 'jump';
    if (emotion === 'explaining' || emotion === 'thinking') return 'speak';
    if (emotion === 'happy') return 'wave';
    return 'idle';
  };

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`rounded-2xl p-6 shadow-xl ${backgrounds[background]} ${className} ${
        mounted ? 'animate-[fadeInUp_0.5s_ease-out]' : 'opacity-0'
      }`}
      dir="rtl"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Characters */}
        <div className="flex items-center justify-center gap-8">
          {character === 'eco-hero' || character === 'both' ? (
            <EcoHero 
              emotion={emotion as any} 
              size="large"
              animation={getCharacterAnimation()}
            />
          ) : null}
          {character === 'wise-guide' || character === 'both' ? (
            <WiseGuide 
              emotion={emotion as any} 
              size="large"
              animation={getCharacterAnimation()}
            />
          ) : null}
        </div>

        {/* Message bubble */}
        <div
          className={`bg-white rounded-2xl p-6 shadow-lg border-2 border-green-300 max-w-md relative ${
            mounted ? 'animate-[bubbleIn_0.4s_ease-out_0.3s_both]' : 'opacity-0 scale-90'
          }`}
        >
          {/* Speech bubble tail */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white"></div>
          </div>
          
          <p className="text-xl font-semibold text-gray-800 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Continue button */}
        {showButton && onContinue && (
          <button
            className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 ${
              mounted ? 'animate-[buttonIn_0.3s_ease-out_0.6s_both]' : 'opacity-0 scale-90'
            }`}
            onClick={onContinue}
          >
            {buttonText} ←
          </button>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bubbleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes buttonIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

