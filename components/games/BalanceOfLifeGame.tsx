'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Plus, Minus, Scale } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface BalanceOfLifeGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface EcosystemElements {
  plants: number;
  animals: number;
  water: number;
}

export default function BalanceOfLifeGame({ game, onComplete }: BalanceOfLifeGameProps) {
  const [elements, setElements] = useState<EcosystemElements>({
    plants: 5,
    animals: 4,
    water: 6,
  });
  const [balance, setBalance] = useState(0); // -100 to 100, 0 = balanced
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isBalanced, setIsBalanced] = useState(false);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;
  const targetBalance = 5; // Within ±5 is considered balanced

  // Calculate balance based on elements
  useEffect(() => {
    if (completed) return;

    // Ideal ratios: plants:animals:water = 5:4:6
    const idealPlants = 5;
    const idealAnimals = 4;
    const idealWater = 6;

    const plantDiff = elements.plants - idealPlants;
    const animalDiff = elements.animals - idealAnimals;
    const waterDiff = elements.water - idealWater;

    // Calculate balance (weighted average)
    const newBalance = (plantDiff * 0.3 + animalDiff * 0.3 + waterDiff * 0.4) * 10;
    setBalance(Math.max(-100, Math.min(100, newBalance)));

    // Check if balanced
    if (Math.abs(newBalance) <= targetBalance) {
      if (!isBalanced) {
        setIsBalanced(true);
        setScore(score + 15);
        setFeedback({ type: 'success', message: 'ممتاز! النظام متوازن ⚖️✨' });
        
        setTimeout(() => {
          setFeedback(null);
          setIsBalanced(false);
          if (round + 1 < rounds) {
            setRound(round + 1);
            // Reset with new challenge
            setElements({
              plants: Math.floor(Math.random() * 3) + 3,
              animals: Math.floor(Math.random() * 3) + 2,
              water: Math.floor(Math.random() * 3) + 4,
            });
          } else {
            setCompleted(true);
            onComplete?.(game.points || 40);
          }
        }, 2000);
      }
    } else {
      setIsBalanced(false);
    }
  }, [elements, completed, round, rounds, isBalanced, score, onComplete, game.points, targetBalance]);

  const adjustElement = (type: keyof EcosystemElements, delta: number) => {
    if (completed || isBalanced) return;

    setElements(prev => {
      const newValue = Math.max(0, Math.min(10, prev[type] + delta));
      return { ...prev, [type]: newValue };
    });

    // Check for extreme imbalance
    const newElements = { ...elements, [type]: elements[type] + delta };
    const total = newElements.plants + newElements.animals + newElements.water;
    const avg = total / 3;
    const variance = Math.abs(newElements.plants - avg) + 
                     Math.abs(newElements.animals - avg) + 
                     Math.abs(newElements.water - avg);

    if (variance > 8) {
      setFeedback({ type: 'error', message: '⚠️ الميزان يميل! النظام غير متوازن 💔' });
      setTimeout(() => setFeedback(null), 2000);
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
            ممتاز! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-4"
          >
            لقد حافظت على التوازن البيئي بنجاح!
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

  const balanceColor = Math.abs(balance) <= targetBalance 
    ? 'text-green-600' 
    : balance > 0 
    ? 'text-red-600' 
    : 'text-blue-600';

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-emerald-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">الجولة {round + 1} / {rounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Scale */}
      <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-4 border-gray-300 rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">ميزان الحياة ⚖️</h3>
          
          <div className="flex items-center justify-center mb-8">
            <motion.div
              animate={{ 
                rotate: balance > 0 ? Math.min(balance / 2, 15) : Math.max(balance / 2, -15),
                x: balance * 0.5
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative"
            >
              <Scale className="w-32 h-32 text-gray-600" />
              <motion.div
                animate={{ 
                  scale: Math.abs(balance) <= targetBalance ? [1, 1.2, 1] : 1
                }}
                transition={{ repeat: Math.abs(balance) <= targetBalance ? Infinity : 0, duration: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {Math.abs(balance) <= targetBalance ? (
                  <span className="text-4xl">✨</span>
                ) : (
                  <span className="text-2xl">{balance > 0 ? '→' : '←'}</span>
                )}
              </motion.div>
            </motion.div>
          </div>

          <div className="text-center mb-6">
            <div className={`text-4xl font-bold ${balanceColor} mb-2`}>
              {balance > 0 ? '+' : ''}{balance.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">
              {Math.abs(balance) <= targetBalance ? '⚖️ متوازن' : balance > 0 ? '⚠️ يميل لليمين' : '⚠️ يميل لليسار'}
            </div>
          </div>

          {/* Elements Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plants */}
            <div className="bg-white p-6 rounded-xl border-2 border-green-200 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🌱</div>
                <div className="font-bold text-gray-800">النباتات</div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustElement('plants', -1)}
                  disabled={elements.plants <= 0}
                  className="p-3 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5 text-red-600" />
                </motion.button>
                <div className="text-4xl font-bold text-green-600 w-16 text-center">
                  {elements.plants}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustElement('plants', 1)}
                  disabled={elements.plants >= 10}
                  className="p-3 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 text-green-600" />
                </motion.button>
              </div>
            </div>

            {/* Animals */}
            <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🦌</div>
                <div className="font-bold text-gray-800">الحيوانات</div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustElement('animals', -1)}
                  disabled={elements.animals <= 0}
                  className="p-3 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5 text-red-600" />
                </motion.button>
                <div className="text-4xl font-bold text-blue-600 w-16 text-center">
                  {elements.animals}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustElement('animals', 1)}
                  disabled={elements.animals >= 10}
                  className="p-3 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 text-green-600" />
                </motion.button>
              </div>
            </div>

            {/* Water */}
            <div className="bg-white p-6 rounded-xl border-2 border-cyan-200 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">💧</div>
                <div className="font-bold text-gray-800">الماء</div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustElement('water', -1)}
                  disabled={elements.water <= 0}
                  className="p-3 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5 text-red-600" />
                </motion.button>
                <div className="text-4xl font-bold text-cyan-600 w-16 text-center">
                  {elements.water}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustElement('water', 1)}
                  disabled={elements.water >= 10}
                  className="p-3 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 text-green-600" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-6 p-4 rounded-xl text-center ${
                  feedback.type === 'success'
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-red-100 border-2 border-red-500 text-red-800'
                }`}
              >
                <span className="font-bold text-lg">{feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {rounds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-emerald-400 to-green-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / rounds) * 100}%` }}
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

