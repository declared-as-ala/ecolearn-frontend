'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Clock, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface FoodChainRaceGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface ChainLink {
  id: string;
  label: string;
  icon: string;
  type: 'producer' | 'consumer1' | 'consumer2' | 'decomposer';
  order: number;
}

export default function FoodChainRaceGame({ game, onComplete }: FoodChainRaceGameProps) {
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [availableLinks, setAvailableLinks] = useState<ChainLink[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [chainBroken, setChainBroken] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errorCountdown, setErrorCountdown] = useState(0);

  const data = game.gameData || {};
  const chains = data.chains || [
    {
      links: [
        { id: 'grass', label: 'العشب', icon: '🌿', type: 'producer', order: 1 },
        { id: 'rabbit', label: 'الأرنب', icon: '🐰', type: 'consumer1', order: 2 },
        { id: 'fox', label: 'الثعلب', icon: '🦊', type: 'consumer2', order: 3 },
        { id: 'bacteria', label: 'البكتيريا', icon: '🦠', type: 'decomposer', order: 4 },
      ],
    },
  ];

  useEffect(() => {
    if (round < chains.length && !completed) {
      const currentChain = chains[round];
      const shuffled = [...currentChain.links].sort(() => Math.random() - 0.5);
      setAvailableLinks(shuffled);
      setSelectedLinks([]);
      setTimeLeft(15);
      setChainBroken(false);
    }
  }, [round, chains, completed]);

  useEffect(() => {
    if (chainBroken || completed || round >= chains.length) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [chainBroken, completed, round, chains.length]);

  const handleTimeOut = () => {
    setChainBroken(true);
    setFeedback({ type: 'error', message: '⏰ انتهى الوقت! السلسلة انكسرت 💔' });
    setTimeout(() => {
      setFeedback(null);
      if (round + 1 < chains.length) {
        setRound(round + 1);
      } else {
        setCompleted(true);
        onComplete?.(score);
      }
    }, 2000);
  };

  const handleLinkSelect = (linkId: string) => {
    if (chainBroken || selectedLinks.includes(linkId)) return;

    const link = availableLinks.find(l => l.id === linkId);
    if (!link) return;

    const newSelection = [...selectedLinks, linkId];
    setSelectedLinks(newSelection);

    // Check if order is correct
    const currentChain = chains[round];
    const correctOrder = currentChain.links.map((l: ChainLink) => l.id);
    const isCorrect = newSelection.length <= correctOrder.length && 
                     newSelection.every((id, idx) => id === correctOrder[idx]);

    if (!isCorrect) {
      // Wrong order - break chain
      setChainBroken(true);
      setFeedback({ type: 'error', message: '❌ الترتيب خاطئ! السلسلة انكسرت 💔' });
      setErrorCountdown(15);
      
      // Countdown timer on error
      const errorTimer = setInterval(() => {
        setErrorCountdown(prev => {
          if (prev <= 1) {
            clearInterval(errorTimer);
            setFeedback(null);
            if (round + 1 < chains.length) {
              setRound(round + 1);
            } else {
              setCompleted(true);
              onComplete?.(score);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return;
    }

    // Correct selection
    if (newSelection.length === correctOrder.length) {
      // Chain complete!
      const pointsEarned = 10 + Math.floor(timeLeft);
      setScore(score + pointsEarned);
      setFeedback({ type: 'success', message: 'ممتاز! السلسلة متوازنة... هكذا تستمر الحياة 🌿✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < chains.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 40);
        }
      }, 2000);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 drop-shadow-lg" />
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-green-800 mb-2"
          >
            رائع! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-6"
          >
            لقد أكملت جميع السلاسل الغذائية بنجاح!
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-3xl font-bold text-green-600 mb-6"
          >
            النقاط: {score} ⭐
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <EcoHero size="large" emotion="celebrating" animation="bounce" />
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  const currentChain = chains[round];
  const correctOrder = currentChain.links.map((l: ChainLink) => l.id);
  const isChainComplete = selectedLinks.length === correctOrder.length && !chainBroken;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-green-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-200 animate-pulse' : ''}`}>
                  {timeLeft}
                </span>
              </div>
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">الجولة {round + 1} / {chains.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Area */}
      <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-4 border-green-300 rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
            {chainBroken ? '💔 السلسلة انكسرت!' : '🏁 اربط السلسلة الغذائية بالترتيب الصحيح'}
          </h3>

          {/* Available Links */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3 text-center">اسحب الكائنات بالترتيب الصحيح:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {availableLinks.map((link) => {
                const isSelected = selectedLinks.includes(link.id);
                const isDisabled = chainBroken || isSelected;
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: isDisabled ? 0.5 : 1, 
                      scale: isSelected ? 0.8 : 1,
                      x: isSelected ? 200 : 0
                    }}
                    whileHover={!isDisabled ? { scale: 1.1, y: -5 } : {}}
                    whileTap={!isDisabled ? { scale: 0.9 } : {}}
                    onClick={() => !isDisabled && handleLinkSelect(link.id)}
                    disabled={isDisabled}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-green-500 bg-green-100 opacity-50'
                        : chainBroken
                        ? 'border-red-300 bg-red-50 opacity-50'
                        : 'border-gray-300 bg-white hover:border-green-400 hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-4xl mb-2">{link.icon}</div>
                    <div className="font-bold text-gray-800 text-sm">{link.label}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Selected Chain */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3 text-center">السلسلة المختارة:</p>
            <div className="flex flex-wrap justify-center gap-2 items-center min-h-[80px] bg-white/50 rounded-xl p-4">
              {selectedLinks.length === 0 ? (
                <span className="text-gray-400">ابدأ بسحب الكائنات...</span>
              ) : (
                selectedLinks.map((linkId, index) => {
                  const link = availableLinks.find(l => l.id === linkId);
                  return (
                    <motion.div
                      key={linkId}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                        <span className="text-2xl">{link?.icon}</span>
                        <span className="font-bold">{link?.label}</span>
                      </div>
                      {index < selectedLinks.length - 1 && (
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          <span className="text-2xl">→</span>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Chain Glow Effect */}
          {isChainComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/30 to-green-400/20 rounded-xl pointer-events-none"
            />
          )}

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-xl mb-4 text-center ${
                  feedback.type === 'success'
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-red-100 border-2 border-red-500 text-red-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-bold text-lg">{feedback.message}</span>
                  {feedback.type === 'error' && errorCountdown > 0 && (
                    <span className="text-red-600 font-bold"> ({errorCountdown} ثانية)</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>التقدم</span>
              <span>{round + 1} / {chains.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${((round + 1) / chains.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

