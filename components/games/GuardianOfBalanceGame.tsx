'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Shield, Heart, AlertTriangle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface GuardianOfBalanceGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface EcosystemState {
  plants: number;
  animals: number;
  health: number; // 0-100
}

interface Action {
  id: string;
  label: string;
  icon: string;
  description: string;
  impact: { plants: number; animals: number; health: number };
  correct: boolean;
}

export default function GuardianOfBalanceGame({ game, onComplete }: GuardianOfBalanceGameProps) {
  const [ecosystem, setEcosystem] = useState<EcosystemState>({
    plants: 60,
    animals: 50,
    health: 70,
  });
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showImpact, setShowImpact] = useState(false);

  const data = game.gameData || {};
  const scenarios = data.scenarios || [
    {
      id: 's1',
      title: 'النظام البيئي متضرر!',
      description: 'لاحظت نفايات في الغابة وحيوانات تختفي',
      actions: [
        {
          id: 'plant',
          label: 'زرع نباتات',
          icon: '🌱',
          description: 'إعادة التشجير',
          impact: { plants: +20, animals: +10, health: +15 },
          correct: true,
        },
        {
          id: 'hunt',
          label: 'السماح بالصيد',
          icon: '🏹',
          description: 'فتح موسم الصيد',
          impact: { plants: 0, animals: -20, health: -25 },
          correct: false,
        },
        {
          id: 'ignore',
          label: 'عدم التدخل',
          icon: '😐',
          description: 'ترك الأمور كما هي',
          impact: { plants: -10, animals: -15, health: -20 },
          correct: false,
        },
      ],
    },
    {
      id: 's2',
      title: 'تلوث في النهر!',
      description: 'مياه ملوثة تهدد الكائنات المائية',
      actions: [
        {
          id: 'clean',
          label: 'تنظيف النهر',
          icon: '🧹',
          description: 'إزالة التلوث',
          impact: { plants: +10, animals: +20, health: +20 },
          correct: true,
        },
        {
          id: 'pollute',
          label: 'إضافة مواد كيميائية',
          icon: '☠️',
          description: 'معالجة سريعة',
          impact: { plants: -30, animals: -40, health: -35 },
          correct: false,
        },
        {
          id: 'wait',
          label: 'انتظار التحسن',
          icon: '⏳',
          description: 'الانتظار',
          impact: { plants: -15, animals: -25, health: -30 },
          correct: false,
        },
      ],
    },
    {
      id: 's3',
      title: 'نقص في الغذاء!',
      description: 'الحيوانات جائعة بسبب نقص النباتات',
      actions: [
        {
          id: 'protect',
          label: 'حماية النباتات',
          icon: '🛡️',
          description: 'منع القطع',
          impact: { plants: +25, animals: +15, health: +20 },
          correct: true,
        },
        {
          id: 'cut',
          label: 'قطع المزيد',
          icon: '🪓',
          description: 'توسيع المساحة',
          impact: { plants: -40, animals: -30, health: -40 },
          correct: false,
        },
        {
          id: 'feed',
          label: 'إطعام الحيوانات',
          icon: '🍖',
          description: 'طعام صناعي',
          impact: { plants: 0, animals: +5, health: -10 },
          correct: false,
        },
      ],
    },
  ];

  const currentScenario = scenarios[round];

  const handleAction = (action: Action) => {
    if (action.correct) {
      // Correct action
      const newEcosystem = {
        plants: Math.min(100, ecosystem.plants + action.impact.plants),
        animals: Math.min(100, ecosystem.animals + action.impact.animals),
        health: Math.min(100, ecosystem.health + action.impact.health),
      };
      setEcosystem(newEcosystem);
      setScore(score + 15);
      setFeedback({ 
        type: 'success', 
        message: 'أنت تحمي التوازن... قرارك يصنع الفرق 🌍✨' 
      });
      setShowImpact(true);
      
      setTimeout(() => {
        setShowImpact(false);
        setFeedback(null);
        if (round + 1 < scenarios.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 45);
        }
      }, 2000);
    } else {
      // Wrong action - show negative impact
      const newEcosystem = {
        plants: Math.max(0, ecosystem.plants + action.impact.plants),
        animals: Math.max(0, ecosystem.animals + action.impact.animals),
        health: Math.max(0, ecosystem.health + action.impact.health),
      };
      setEcosystem(newEcosystem);
      setFeedback({ 
        type: 'error', 
        message: '❌ هذا القرار يضر بالتوازن! فكر مرة أخرى 💔' 
      });
      setShowImpact(true);
      
      setTimeout(() => {
        setShowImpact(false);
        setFeedback(null);
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

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-blue-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">السيناريو {round + 1} / {scenarios.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ecosystem Health */}
      <Card className="bg-white border-2 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">صحة النظام البيئي</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Plants */}
            <div className="text-center">
              <div className="text-3xl mb-2">🌿</div>
              <div className="text-sm text-gray-600 mb-2">النباتات</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-green-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${ecosystem.plants}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-lg font-bold text-green-600 mt-1">{ecosystem.plants}%</div>
            </div>

            {/* Animals */}
            <div className="text-center">
              <div className="text-3xl mb-2">🦌</div>
              <div className="text-sm text-gray-600 mb-2">الحيوانات</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-blue-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${ecosystem.animals}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-lg font-bold text-blue-600 mt-1">{ecosystem.animals}%</div>
            </div>

            {/* Health */}
            <div className="text-center">
              <div className="text-3xl mb-2">❤️</div>
              <div className="text-sm text-gray-600 mb-2">الصحة العامة</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${
                    ecosystem.health >= 70 ? 'bg-green-500' :
                    ecosystem.health >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${ecosystem.health}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className={`text-lg font-bold mt-1 ${
                ecosystem.health >= 70 ? 'text-green-600' :
                ecosystem.health >= 40 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {ecosystem.health}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentScenario.title}</h3>
          <p className="text-lg text-gray-700 mb-6">{currentScenario.description}</p>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentScenario.actions.map((action: Action, index: number) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(action)}
                className={`p-6 rounded-xl border-2 transition-all text-right ${
                  action.correct
                    ? 'border-green-400 bg-green-50 hover:bg-green-100 hover:border-green-500 hover:shadow-lg'
                    : 'border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400 hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <div className="font-bold text-gray-800 mb-2">{action.label}</div>
                <div className="text-sm text-gray-600">{action.description}</div>
              </motion.button>
            ))}
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

          {/* Impact Animation */}
          <AnimatePresence>
            {showImpact && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 1 }}
                  className="text-6xl"
                >
                  {feedback?.type === 'success' ? '✨' : '💔'}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {scenarios.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-cyan-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / scenarios.length) * 100}%` }}
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

