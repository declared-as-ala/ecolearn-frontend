'use client';

import React, { useState, useEffect } from 'react';
import EcoHero from './EcoHero';
import WiseGuide from './WiseGuide';

interface CartoonReactionProps {
  isCorrect: boolean;
  message: string;
  explanation?: string;
  onContinue?: () => void;
  showRetry?: boolean;
  onRetry?: () => void;
}

export default function CartoonReaction({
  isCorrect,
  message,
  explanation,
  onContinue,
  showRetry = false,
  onRetry
}: CartoonReactionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-2xl border-2 ${
        mounted ? 'animate-[reactionIn_0.4s_ease-out]' : 'opacity-0 scale-90'
      }`}
      style={{
        borderColor: isCorrect ? '#22c55e' : '#f59e0b',
        background: isCorrect 
          ? 'linear-gradient(135deg, #dcfce7 0%, #ffffff 100%)' 
          : 'linear-gradient(135deg, #fef3c7 0%, #ffffff 100%)'
      }}
      dir="rtl"
    >
      {/* Character with reaction */}
      <div className="mb-4">
        {isCorrect ? (
          <EcoHero 
            emotion="celebrating" 
            size="large"
            animation="jump"
          />
        ) : (
          <WiseGuide 
            emotion="explaining" 
            size="large"
            animation="speak"
          />
        )}
      </div>

      {/* Reaction message */}
      <div className="text-center mb-4">
        <h3 
          className={`text-2xl font-bold mb-2 animate-[fadeIn_0.3s_ease-out_0.2s_both] ${
            isCorrect ? 'text-green-600' : 'text-amber-600'
          }`}
        >
          {isCorrect ? 'ممتاز! 🎉' : 'دعنا نتعلم معاً 💡'}
        </h3>
        
        <p className="text-lg text-gray-800 mb-2 font-semibold">
          {message}
        </p>

        {explanation && (
          <p className="text-base text-gray-600 mt-3 bg-white/50 rounded-lg p-3 animate-[fadeIn_0.3s_ease-out_0.4s_both]">
            {explanation}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            حاول مرة أخرى
          </button>
        )}
        
        {onContinue && (
          <button
            onClick={onContinue}
            className={`${
              isCorrect 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform`}
          >
            {isCorrect ? 'متابعة' : 'فهمت'}
          </button>
        )}
      </div>
      <style jsx>{`
        @keyframes reactionIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
