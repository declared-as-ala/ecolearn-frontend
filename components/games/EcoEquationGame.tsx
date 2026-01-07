'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Plus, Minus, Equal } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface EcoEquationGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface EquationValues {
  plants: number;
  animals: number;
  water: number;
  soil: number;
}

export default function EcoEquationGame({ game, onComplete }: EcoEquationGameProps) {
  const [values, setValues] = useState<EquationValues>({
    plants: 5,
    animals: 4,
    water: 6,
    soil: 5,
  });
  const [result, setResult] = useState(0);
  const [targetResult, setTargetResult] = useState(20);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isBalanced, setIsBalanced] = useState(false);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;

  useEffect(() => {
    if (round >= rounds) {
      setCompleted(true);
      onComplete?.(game.points || 40);
      return;
    }

    // Set new target for this round
    const newTarget = 15 + round * 5;
    setTargetResult(newTarget);
    setValues({
      plants: Math.floor(Math.random() * 3) + 3,
      animals: Math.floor(Math.random() * 3) + 2,
      water: Math.floor(Math.random() * 3) + 4,
      soil: Math.floor(Math.random() * 3) + 3,
    });
    setFeedback(null);
    setIsBalanced(false);
  }, [round, rounds, game.points, onComplete]);

  useEffect(() => {
    // Calculate result
    const newResult = values.plants + values.animals + values.water + values.soil;
    setResult(newResult);

    // Check if balanced
    if (Math.abs(newResult - targetResult) <= 2) {
      if (!isBalanced) {
        setIsBalanced(true);
        setScore(score + 15);
        setFeedback({ type: 'success', message: 'ممتاز! المعادلة متوازنة! ⚖️✨' });
        
        setTimeout(() => {
          setFeedback(null);
          setIsBalanced(false);
          if (round + 1 < rounds) {
            setRound(round + 1);
          } else {
            setCompleted(true);
            onComplete?.(game.points || 40);
          }
        }, 2000);
      }
    } else {
      setIsBalanced(false);
    }
  }, [values, targetResult, isBalanced, round, rounds, score, onComplete, game.points]);

  const adjustValue = (key: keyof EquationValues, delta: number) => {
    if (completed || isBalanced) return;

    setValues(prev => ({
      ...prev,
      [key]: Math.max(0, Math.min(10, prev[key] + delta)),
    }));
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
            أنت محلل التوازن البيئي! لقد وازنت جميع المعادلات!
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

  const resultColor = Math.abs(result - targetResult) <= 2 
    ? 'text-green-600' 
    : result > targetResult 
    ? 'text-red-600' 
    : 'text-blue-600';

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-indigo-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">الجولة {round + 1} / {rounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equation */}
      <Card className="bg-gradient-to-br from-gray-50 to-indigo-50 border-4 border-indigo-300 rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">المعادلة البيئية</h3>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {/* Plants */}
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2">🌿</div>
              <div className="text-sm font-bold text-gray-700 mb-2">نباتات</div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustValue('plants', -1)}
                  disabled={values.plants <= 0}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4 text-red-600" />
                </motion.button>
                <div className="text-4xl font-bold text-green-600 w-16 text-center">
                  {values.plants}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustValue('plants', 1)}
                  disabled={values.plants >= 10}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 text-green-600" />
                </motion.button>
              </div>
            </div>

            <Plus className="w-8 h-8 text-gray-400" />

            {/* Animals */}
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2">🦌</div>
              <div className="text-sm font-bold text-gray-700 mb-2">حيوانات</div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustValue('animals', -1)}
                  disabled={values.animals <= 0}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4 text-red-600" />
                </motion.button>
                <div className="text-4xl font-bold text-blue-600 w-16 text-center">
                  {values.animals}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustValue('animals', 1)}
                  disabled={values.animals >= 10}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 text-green-600" />
                </motion.button>
              </div>
            </div>

            <Plus className="w-8 h-8 text-gray-400" />

            {/* Water */}
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2">💧</div>
              <div className="text-sm font-bold text-gray-700 mb-2">ماء</div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustValue('water', -1)}
                  disabled={values.water <= 0}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4 text-red-600" />
                </motion.button>
                <div className="text-4xl font-bold text-cyan-600 w-16 text-center">
                  {values.water}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustValue('water', 1)}
                  disabled={values.water >= 10}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 text-green-600" />
                </motion.button>
              </div>
            </div>

            <Plus className="w-8 h-8 text-gray-400" />

            {/* Soil */}
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2">🌍</div>
              <div className="text-sm font-bold text-gray-700 mb-2">تربة</div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustValue('soil', -1)}
                  disabled={values.soil <= 0}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4 text-red-600" />
                </motion.button>
                <div className="text-4xl font-bold text-amber-600 w-16 text-center">
                  {values.soil}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustValue('soil', 1)}
                  disabled={values.soil >= 10}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 text-green-600" />
                </motion.button>
              </div>
            </div>

            <Equal className="w-8 h-8 text-gray-400" />

            {/* Result */}
            <motion.div
              animate={{ scale: isBalanced ? [1, 1.2, 1] : 1 }}
              transition={{ repeat: isBalanced ? Infinity : 0, duration: 1 }}
              className="flex flex-col items-center"
            >
              <div className={`text-6xl font-bold ${resultColor} mb-2`}>
                {result}
              </div>
              <div className="text-sm text-gray-600">النتيجة</div>
              <div className="text-xs text-gray-500 mt-1">الهدف: {targetResult}</div>
            </motion.div>
          </div>

          {/* Balance Indicator */}
          {isBalanced && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded-xl text-center"
            >
              <span className="text-green-800 font-bold text-lg">✨ المعادلة متوازنة! ✨</span>
            </motion.div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-4 rounded-xl text-center ${
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
            className="bg-gradient-to-r from-indigo-400 to-purple-500 h-4 rounded-full relative overflow-hidden"
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

