'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, CheckCircle2 } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import { playSuccessSound, playErrorSound, playCompletionSound } from '@/lib/sounds';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface WithoutDecomposersGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface FoodPair {
  id: string;
  animal: { label: string; icon: string };
  food: { label: string; icon: string };
}

export default function WithoutDecomposersGame({ game, onComplete }: WithoutDecomposersGameProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const rounds: FoodPair[][] = data.rounds || [
    // Round 1: Simple pairs
    [
      { id: 'p1', animal: { label: 'أرنب', icon: '🐰' }, food: { label: 'جزر', icon: '🥕' } },
      { id: 'p2', animal: { label: 'قطة', icon: '🐱' }, food: { label: 'سمك', icon: '🐟' } },
      { id: 'p3', animal: { label: 'بقرة', icon: '🐄' }, food: { label: 'عشب', icon: '🌿' } },
    ],
    // Round 2: More pairs
    [
      { id: 'p4', animal: { label: 'دب', icon: '🐻' }, food: { label: 'عسل', icon: '🍯' } },
      { id: 'p5', animal: { label: 'طائر', icon: '🐦' }, food: { label: 'حبوب', icon: '🌾' } },
      { id: 'p6', animal: { label: 'أسد', icon: '🦁' }, food: { label: 'غزال', icon: '🦌' } },
    ],
    // Round 3: Final round
    [
      { id: 'p7', animal: { label: 'فيل', icon: '🐘' }, food: { label: 'أوراق', icon: '🍃' } },
      { id: 'p8', animal: { label: 'باندا', icon: '🐼' }, food: { label: 'خيزران', icon: '🎋' } },
      { id: 'p9', animal: { label: 'نمر', icon: '🐯' }, food: { label: 'لحم', icon: '🥩' } },
    ],
  ];

  const currentRoundData = rounds[currentRound] || [];
  const allAnimals = currentRoundData.map(p => ({ id: p.id, ...p.animal }));
  const allFoods = currentRoundData.map(p => ({ id: p.id, ...p.food })).sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (matchedPairs.length === currentRoundData.length && currentRoundData.length > 0) {
      // Round completed
      const newScore = score + 20;
      setScore(newScore);
      playSuccessSound();
      setFeedback({ type: 'success', message: 'ممتاز! لقد ربطت كل الحيوانات بطعامها! 🌟' });
      
      setTimeout(() => {
        setFeedback(null);
        setMatchedPairs([]);
        setSelectedAnimal(null);
        setSelectedFood(null);
        
        if (currentRound + 1 < rounds.length) {
          setCurrentRound(currentRound + 1);
        } else {
          setCompleted(true);
          playCompletionSound();
          onComplete?.(game.points || 50);
        }
      }, 2000);
    }
  }, [matchedPairs, currentRoundData.length, currentRound, rounds.length, score, game.points, onComplete]);

  const handleAnimalClick = (pairId: string) => {
    if (matchedPairs.includes(pairId)) return;
    if (selectedAnimal === pairId) {
      setSelectedAnimal(null);
      return;
    }
    setSelectedAnimal(pairId);
    
    if (selectedFood === pairId) {
      // Match found!
      setMatchedPairs([...matchedPairs, pairId]);
      playSuccessSound();
      setSelectedAnimal(null);
      setSelectedFood(null);
    } else if (selectedFood) {
      // Wrong match
      playErrorSound();
      setFeedback({ type: 'error', message: '❌ هذا ليس الطعام الصحيح! حاول مرة أخرى 💪' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedAnimal(null);
        setSelectedFood(null);
      }, 1500);
    }
  };

  const handleFoodClick = (pairId: string) => {
    if (matchedPairs.includes(pairId)) return;
    if (selectedFood === pairId) {
      setSelectedFood(null);
      return;
    }
    setSelectedFood(pairId);
    
    if (selectedAnimal === pairId) {
      // Match found!
      setMatchedPairs([...matchedPairs, pairId]);
      playSuccessSound();
      setSelectedAnimal(null);
      setSelectedFood(null);
    } else if (selectedAnimal) {
      // Wrong match
      playErrorSound();
      setFeedback({ type: 'error', message: '❌ هذا ليس الطعام الصحيح! حاول مرة أخرى 💪' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedAnimal(null);
        setSelectedFood(null);
      }, 1500);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
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
            className="text-xl text-green-700 mb-4"
          >
            لقد تعلمت ما تأكله الحيوانات!
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

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title || 'من يأكل ماذا؟'}</h2>
              <p className="text-blue-100">{game.description || 'اربط كل حيوان بطعامه المفضل!'}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">المستوى {currentRound + 1} / {rounds.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-300 rounded-2xl shadow-lg">
        <CardContent className="p-6 text-center">
          <p className="text-xl font-bold text-gray-800 mb-2">
            🎯 اختر حيواناً ثم اختر طعامه!
          </p>
          <p className="text-lg text-gray-700">
            المطابقات: {matchedPairs.length} / {currentRoundData.length}
          </p>
        </CardContent>
      </Card>

      {/* Game Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Animals Side */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-300 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">الحيوانات 🐾</h3>
            <div className="grid grid-cols-1 gap-4">
              {allAnimals.map((animal) => {
                const isMatched = matchedPairs.includes(animal.id);
                const isSelected = selectedAnimal === animal.id;
                return (
                  <motion.button
                    key={animal.id}
                    whileHover={{ scale: isMatched ? 1 : 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnimalClick(animal.id)}
                    disabled={isMatched}
                    className={`p-6 rounded-2xl border-4 font-bold text-center transition-all ${
                      isMatched
                        ? 'border-green-500 bg-green-100 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-blue-500 bg-blue-100 shadow-lg ring-4 ring-blue-300'
                        : 'border-blue-200 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-6xl mb-3">{animal.icon}</div>
                    <div className="text-xl text-gray-800">{animal.label}</div>
                    {isMatched && (
                      <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mt-2" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Food Side */}
        <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-4 border-green-300 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">الطعام 🍽️</h3>
            <div className="grid grid-cols-1 gap-4">
              {allFoods.map((food) => {
                const isMatched = matchedPairs.includes(food.id);
                const isSelected = selectedFood === food.id;
                return (
                  <motion.button
                    key={food.id}
                    whileHover={{ scale: isMatched ? 1 : 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFoodClick(food.id)}
                    disabled={isMatched}
                    className={`p-6 rounded-2xl border-4 font-bold text-center transition-all ${
                      isMatched
                        ? 'border-green-500 bg-green-100 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                        : 'border-green-200 bg-white hover:border-green-400 hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-6xl mb-3">{food.icon}</div>
                    <div className="text-xl text-gray-800">{food.label}</div>
                    {isMatched && (
                      <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mt-2" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl text-center ${
              feedback.type === 'success'
                ? 'bg-green-100 border-2 border-green-500 text-green-800'
                : 'bg-red-100 border-2 border-red-500 text-red-800'
            }`}
          >
            <span className="font-bold text-lg">{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>المستوى {currentRound + 1} / {rounds.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-green-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((currentRound + 1) / rounds.length) * 100}%` }}
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
    </div>
  );
}
