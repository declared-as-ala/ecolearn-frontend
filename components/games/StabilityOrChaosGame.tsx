'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface StabilityOrChaosGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface SystemState {
  stability: number; // 0-100, 70+ = stable
  elements: {
    plants: number;
    animals: number;
    water: number;
    balance: number;
  };
}

interface Action {
  id: string;
  label: string;
  icon: string;
  impact: { plants: number; animals: number; water: number; balance: number };
  correct: boolean;
}

export default function StabilityOrChaosGame({ game, onComplete }: StabilityOrChaosGameProps) {
  const [systemState, setSystemState] = useState<SystemState>({
    stability: 50,
    elements: {
      plants: 50,
      animals: 50,
      water: 50,
      balance: 50,
    },
  });
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [targetStability] = useState(70);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;

  useEffect(() => {
    if (round >= rounds) {
      setCompleted(true);
      onComplete?.(game.points || 50);
      return;
    }

    // Reset with random initial state
    setSystemState({
      stability: 30 + Math.floor(Math.random() * 40),
      elements: {
        plants: 40 + Math.floor(Math.random() * 20),
        animals: 40 + Math.floor(Math.random() * 20),
        water: 40 + Math.floor(Math.random() * 20),
        balance: 40 + Math.floor(Math.random() * 20),
      },
    });
    setSelectedAction(null);
    setFeedback(null);
  }, [round, rounds, game.points, onComplete]);

  useEffect(() => {
    // Calculate stability based on elements
    const avg = (systemState.elements.plants + systemState.elements.animals + 
                 systemState.elements.water + systemState.elements.balance) / 4;
    const variance = Math.abs(systemState.elements.plants - avg) +
                     Math.abs(systemState.elements.animals - avg) +
                     Math.abs(systemState.elements.water - avg) +
                     Math.abs(systemState.elements.balance - avg);
    
    const newStability = Math.max(0, Math.min(100, avg - variance / 4));
    setSystemState(prev => ({ ...prev, stability: newStability }));

    // Check if target reached
    if (newStability >= targetStability && selectedAction) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'ممتاز! النظام مستقر الآن! 🟢✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < rounds) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 50);
        }
      }, 2000);
    }
  }, [systemState.elements, targetStability, selectedAction, round, rounds, score, onComplete, game.points]);

  const actions: Action[] = data.actions || [
    {
      id: 'protect',
      label: 'حماية النظام',
      icon: '🛡️',
      impact: { plants: +10, animals: +10, water: +5, balance: +15 },
      correct: true,
    },
    {
      id: 'pollute',
      label: 'تلويث',
      icon: '💨',
      impact: { plants: -20, animals: -20, water: -30, balance: -25 },
      correct: false,
    },
    {
      id: 'restore',
      label: 'استعادة التوازن',
      icon: '🌱',
      impact: { plants: +15, animals: +10, water: +10, balance: +20 },
      correct: true,
    },
    {
      id: 'destroy',
      label: 'تدمير',
      icon: '💥',
      impact: { plants: -30, animals: -30, water: -20, balance: -30 },
      correct: false,
    },
  ];

  const handleActionSelect = (actionId: string) => {
    if (selectedAction) return;

    const action = actions.find(a => a.id === actionId);
    if (!action) return;

    setSelectedAction(actionId);
    setSystemState(prev => ({
      ...prev,
      elements: {
        plants: Math.max(0, Math.min(100, prev.elements.plants + action.impact.plants)),
        animals: Math.max(0, Math.min(100, prev.elements.animals + action.impact.animals)),
        water: Math.max(0, Math.min(100, prev.elements.water + action.impact.water)),
        balance: Math.max(0, Math.min(100, prev.elements.balance + action.impact.balance)),
      },
    }));

    if (!action.correct) {
      setFeedback({ type: 'error', message: '❌ هذا الإجراء يسبب فوضى! النظام غير مستقر 🔴💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedAction(null);
        // Reset to previous state
        setSystemState(prev => ({
          ...prev,
          elements: {
            plants: Math.max(0, Math.min(100, prev.elements.plants - action.impact.plants)),
            animals: Math.max(0, Math.min(100, prev.elements.animals - action.impact.animals)),
            water: Math.max(0, Math.min(100, prev.elements.water - action.impact.water)),
            balance: Math.max(0, Math.min(100, prev.elements.balance - action.impact.balance)),
          },
        }));
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
            لقد حافظت على استقرار جميع الأنظمة! التوازن يحتاج قرارات واعية!
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

  const isStable = systemState.stability >= targetStability;
  const stabilityColor = isStable ? 'text-green-600' : 
                        systemState.stability >= 40 ? 'text-yellow-600' : 'text-red-600';
  const stabilityBg = isStable ? 'bg-green-500' : 
                      systemState.stability >= 40 ? 'bg-yellow-500' : 'bg-red-500';

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

      {/* System State */}
      <Card className="bg-gradient-to-br from-gray-50 to-indigo-50 border-4 border-indigo-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">حالة النظام</h3>
          
          {/* Stability Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {isStable ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                )}
                <span className="text-lg font-bold text-gray-800">
                  {isStable ? '🟢 مستقر' : '🔴 غير مستقر'}
                </span>
              </div>
              <span className={`text-3xl font-bold ${stabilityColor}`}>
                {Math.round(systemState.stability)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <motion.div
                className={`h-6 rounded-full ${stabilityBg}`}
                initial={{ width: 0 }}
                animate={{ width: `${systemState.stability}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">الهدف: {targetStability}%</span>
            </div>
          </div>

          {/* Elements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-4xl mb-2">🌿</div>
              <div className="text-sm text-gray-600 mb-2">نباتات</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-green-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${systemState.elements.plants}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-lg font-bold text-green-600 mt-1">{Math.round(systemState.elements.plants)}%</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🦌</div>
              <div className="text-sm text-gray-600 mb-2">حيوانات</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-blue-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${systemState.elements.animals}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-lg font-bold text-blue-600 mt-1">{Math.round(systemState.elements.animals)}%</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💧</div>
              <div className="text-sm text-gray-600 mb-2">ماء</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-cyan-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${systemState.elements.water}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-lg font-bold text-cyan-600 mt-1">{Math.round(systemState.elements.water)}%</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚖️</div>
              <div className="text-sm text-gray-600 mb-2">توازن</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-purple-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${systemState.elements.balance}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-lg font-bold text-purple-600 mt-1">{Math.round(systemState.elements.balance)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            اختر إجراءاً لإعادة النظام للاستقرار:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actions.map((action, index) => {
              const isSelected = selectedAction === action.id;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleActionSelect(action.id)}
                  disabled={selectedAction !== null}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isSelected
                      ? action.correct
                        ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                        : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                      : selectedAction !== null
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <div className="font-bold text-gray-800 text-lg">{action.label}</div>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

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

