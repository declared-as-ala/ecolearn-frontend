'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, CheckCircle2, XCircle, Waves } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import { playSuccessSound, playErrorSound, playCompletionSound } from '@/lib/sounds';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: {
    items: Array<{
      id: string;
      name: string;
      icon: string;
      pollutes: boolean;
    }>;
  };
}

interface SeaPollutionQuizGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

export default function SeaPollutionQuizGame({ game, onComplete }: SeaPollutionQuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [answeredItems, setAnsweredItems] = useState<Set<string>>(new Set());

  const data = game.gameData || { items: [] };
  const items = data.items || [];
  const currentItem = items[currentIndex];
  const totalItems = items.length;

  // Handle answer selection
  const handleAnswer = (answer: boolean) => {
    if (showFeedback || !currentItem) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === currentItem.pollutes;

    if (isCorrect) {
      setScore(score + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }

    // Mark as answered
    setAnsweredItems(new Set([...answeredItems, currentItem.id]));

    // Move to next item after showing feedback
    setTimeout(() => {
      if (currentIndex < totalItems - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Game completed
        setCompleted(true);
        playCompletionSound();
        onComplete?.(game.points || 50);
      }
    }, 2000);
  };

  // Completion screen
  if (completed) {
    const percentage = Math.round((score / totalItems) * 100);
    const passed = percentage >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
        dir="rtl"
      >
        <Card className={`border-4 ${passed ? 'border-green-400' : 'border-yellow-400'} bg-gradient-to-br ${passed ? 'from-green-50 via-blue-50 to-cyan-50' : 'from-yellow-50 via-orange-50 to-red-50'} rounded-3xl overflow-hidden shadow-2xl text-center p-8`}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {passed ? (
              <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4 drop-shadow-lg" />
            ) : (
              <Waves className="w-24 h-24 text-blue-500 mx-auto mb-4 drop-shadow-lg" />
            )}
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-5xl font-bold mb-4 ${passed ? 'text-green-800' : 'text-yellow-800'}`}
          >
            {passed ? 'رائع! 🎉' : 'جيد! 💪'}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl mb-6 text-gray-700"
          >
            {passed 
              ? 'أنت تعرف ما يلوث البحر! 🌊✨' 
              : 'استمر في التعلم! 🌊📚'}
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="bg-white rounded-2xl p-6 mb-6 border-4 border-blue-200"
          >
            <p className="text-3xl font-bold text-blue-800 mb-2">
              النقاط: {score} / {totalItems}
            </p>
            <p className="text-xl text-gray-600">
              النسبة: {percentage}%
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <EcoHero size="large" emotion={passed ? "celebrating" : "happy"} animation="bounce" />
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  if (!currentItem) {
    return (
      <Card className="border-4 border-blue-200 rounded-3xl p-8 text-center" dir="rtl">
        <p className="text-2xl font-bold text-gray-800">لا توجد عناصر للعرض</p>
      </Card>
    );
  }

  const isCorrect = selectedAnswer === currentItem.pollutes;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{game.title}</h2>
              <p className="text-blue-100 text-lg">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                <span className="text-3xl font-bold">{score}</span>
              </div>
              <div className="text-sm opacity-90">
                {currentIndex + 1} / {totalItems}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Game Area */}
      <Card className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 border-4 border-blue-300 rounded-3xl shadow-xl overflow-hidden">
        <CardContent className="p-8">
          {/* Question */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              هل هذا يلوث البحر؟
            </h3>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="text-9xl mb-6"
            >
              {currentItem.icon}
            </motion.div>
            <p className="text-4xl font-bold text-gray-800">
              {currentItem.name}
            </p>
          </div>

          {/* Answer Buttons */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(true)}
              disabled={showFeedback}
              className={`p-8 rounded-2xl border-4 font-bold text-3xl transition-all ${
                showFeedback && selectedAnswer === true
                  ? isCorrect
                    ? 'border-green-500 bg-green-100 text-green-800'
                    : 'border-red-500 bg-red-100 text-red-800'
                  : 'border-blue-300 bg-white hover:border-blue-500 hover:bg-blue-50 text-gray-800'
              } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center gap-3">
                <XCircle className="w-10 h-10" />
                <span>يلوث البحر</span>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(false)}
              disabled={showFeedback}
              className={`p-8 rounded-2xl border-4 font-bold text-3xl transition-all ${
                showFeedback && selectedAnswer === false
                  ? isCorrect
                    ? 'border-green-500 bg-green-100 text-green-800'
                    : 'border-red-500 bg-red-100 text-red-800'
                  : 'border-green-300 bg-white hover:border-green-500 hover:bg-green-50 text-gray-800'
              } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-10 h-10" />
                <span>لا يلوث البحر</span>
              </div>
            </motion.button>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className={`mt-8 p-6 rounded-2xl text-center border-4 ${
                  isCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                }`}
              >
                <p className="text-3xl font-bold mb-2">
                  {isCorrect ? '✅ صحيح!' : '❌ خطأ'}
                </p>
                <p className="text-xl">
                  {isCorrect
                    ? `ممتاز! ${currentItem.pollutes ? currentItem.name + ' يلوث البحر' : currentItem.name + ' لا يلوث البحر'} 🎉`
                    : currentItem.pollutes
                    ? `${currentItem.name} يلوث البحر! يجب أن تختار "يلوث البحر" ❌`
                    : `${currentItem.name} لا يلوث البحر! يجب أن تختار "لا يلوث البحر" ❌`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-gray-700">التقدم</span>
              <span className="text-lg font-bold text-gray-700">
                {currentIndex + 1} / {totalItems}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-cyan-500 h-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

