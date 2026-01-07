'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

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

interface Scenario {
  id: string;
  title: string;
  deadAnimal: { label: string; icon: string };
  hasDecomposer: boolean;
  consequences: string[];
  mineralsReturned: boolean;
}

export default function WithoutDecomposersGame({ game, onComplete }: WithoutDecomposersGameProps) {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [addedDecomposer, setAddedDecomposer] = useState(false);
  const [showConsequences, setShowConsequences] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [accumulatedBodies, setAccumulatedBodies] = useState(0);

  const data = game.gameData || {};
  const scenarios: Scenario[] = data.scenarios || [
    {
      id: 's1',
      title: 'جثة حيوان في الغابة',
      deadAnimal: { label: 'أرنب ميت', icon: '🐰' },
      hasDecomposer: false,
      consequences: [
        '💀 الجثة تتراكم',
        '💀 المزيد من الجثث',
        '🌍 التربة لا تحصل على معادن',
        '🌿 النباتات لا تنمو',
        '💔 النظام البيئي يختل',
      ],
      mineralsReturned: false,
    },
    {
      id: 's2',
      title: 'سمكة ميتة في البحر',
      deadAnimal: { label: 'سمكة ميتة', icon: '🐟' },
      hasDecomposer: false,
      consequences: [
        '💀 الجثة تتراكم',
        '🌊 المياه تتلوث',
        '🌊 المعادن لا تعود',
        '🌿 الطحالب لا تنمو',
        '💔 النظام المائي ينهار',
      ],
      mineralsReturned: false,
    },
    {
      id: 's3',
      title: 'طائر ميت على الأرض',
      deadAnimal: { label: 'طائر ميت', icon: '🐦' },
      hasDecomposer: false,
      consequences: [
        '💀 الجثة تتراكم',
        '🌍 التربة لا تحصل على غذاء',
        '🌿 النباتات تضعف',
        '💔 النظام البيئي يختل',
      ],
      mineralsReturned: false,
    },
  ];

  useEffect(() => {
    if (round < scenarios.length) {
      setCurrentScenario(scenarios[round]);
      setAddedDecomposer(false);
      setShowConsequences(false);
      setAccumulatedBodies(0);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 50);
    }
  }, [round, scenarios.length, game.points, onComplete]);

  useEffect(() => {
    if (!addedDecomposer && currentScenario) {
      // Simulate accumulation of bodies
      const timer = setInterval(() => {
        setAccumulatedBodies(prev => prev + 1);
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [addedDecomposer, currentScenario]);

  const handleAddDecomposer = () => {
    if (!currentScenario) return;

    setAddedDecomposer(true);
    setShowConsequences(true);
    setScore(score + 20);
    setFeedback({ type: 'success', message: 'ممتاز! المفككات تعيد المعادن للتربة! ✨' });
    
    setTimeout(() => {
      setFeedback(null);
      if (round + 1 < scenarios.length) {
        setRound(round + 1);
      } else {
        setCompleted(true);
        onComplete?.(game.points || 50);
      }
    }, 3000);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
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
            لقد فهمت أهمية المفككات في دورة المادة!
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

  if (!currentScenario) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-purple-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">السيناريو {round + 1} / {scenarios.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario */}
      <Card className="bg-gradient-to-br from-gray-50 to-red-50 border-4 border-gray-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{currentScenario.title}</h3>
          
          {/* Dead Animal */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl mb-4"
            >
              {currentScenario.deadAnimal.icon}
            </motion.div>
            <p className="text-xl font-bold text-gray-800">{currentScenario.deadAnimal.label}</p>
          </div>

          {/* Accumulated Bodies */}
          {!addedDecomposer && accumulatedBodies > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border-2 border-red-400 rounded-xl p-4 mb-6 text-center"
            >
              <p className="text-red-800 font-bold">
                ⚠️ الجثث المتراكمة: {accumulatedBodies}
              </p>
            </motion.div>
          )}

          {/* Decomposer Action */}
          {!addedDecomposer ? (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">ماذا يحدث بدون المفككات؟</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddDecomposer}
                className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg"
              >
                أضف المفككات (بكتيريا) 🦠
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🦠</div>
              <p className="text-xl font-bold text-green-700 mb-4">المفككات تعمل!</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-100 p-4 rounded-xl border-2 border-green-400">
                  <div className="text-3xl mb-2">💀</div>
                  <div className="text-sm font-bold text-gray-800">الجثث تتحلل</div>
                </div>
                <div className="bg-green-100 p-4 rounded-xl border-2 border-green-400">
                  <div className="text-3xl mb-2">🌍</div>
                  <div className="text-sm font-bold text-gray-800">المعادن تعود</div>
                </div>
                <div className="bg-green-100 p-4 rounded-xl border-2 border-green-400">
                  <div className="text-3xl mb-2">🌿</div>
                  <div className="text-sm font-bold text-gray-800">النباتات تنمو</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Consequences */}
          <AnimatePresence>
            {showConsequences && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-6 p-4 rounded-xl ${
                  addedDecomposer
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                }`}
              >
                <h4 className="font-bold text-gray-800 mb-3 text-center">
                  {addedDecomposer ? '✅ مع المفككات:' : '❌ بدون المفككات:'}
                </h4>
                <div className="space-y-2">
                  {currentScenario.consequences.map((consequence, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="text-lg">{consequence}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
          <span>{round + 1} / {scenarios.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full relative overflow-hidden"
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

