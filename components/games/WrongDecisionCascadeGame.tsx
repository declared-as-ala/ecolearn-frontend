'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface WrongDecisionCascadeGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Decision {
  id: string;
  label: string;
  icon: string;
  correct: boolean;
}

interface Cascade {
  id: string;
  decision: Decision;
  consequences: string[];
}

export default function WrongDecisionCascadeGame({ game, onComplete }: WrongDecisionCascadeGameProps) {
  const [currentCascade, setCurrentCascade] = useState<Cascade | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [showConsequences, setShowConsequences] = useState(false);
  const [consequenceIndex, setConsequenceIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const cascades: Cascade[] = data.cascades || [
    {
      id: 'c1',
      decision: {
        id: 'cut-tree',
        label: 'قطع شجرة',
        icon: '🪓',
        correct: false,
      },
      consequences: [
        '🌳 الشجرة تُقطع',
        '🌍 التربة تفقد حماية الجذور',
        '💨 الرياح تجرف التربة',
        '🌊 النهر يمتلئ بالطين',
        '🐟 الأسماك تموت',
        '💔 النظام البيئي ينهار',
      ],
    },
    {
      id: 'c2',
      decision: {
        id: 'overhunt',
        label: 'صيد جائر',
        icon: '🏹',
        correct: false,
      },
      consequences: [
        '🦌 الحيوانات تُصاد بكثرة',
        '📉 عدد الحيوانات ينخفض',
        '🐺 المفترسات لا تجد غذاء',
        '🌿 النباتات تزداد بدون رعي',
        '🔥 خطر الحرائق يزداد',
        '💔 النظام البيئي يختل',
      ],
    },
    {
      id: 'c3',
      decision: {
        id: 'pollute',
        label: 'رمي النفايات',
        icon: '🗑️',
        correct: false,
      },
      consequences: [
        '💨 النفايات تُرمى في النهر',
        '🌊 المياه تتلوث',
        '🐟 الأسماك تموت',
        '🦅 الطيور لا تجد غذاء',
        '🌿 النباتات تمتص السموم',
        '💔 النظام البيئي ينهار',
      ],
    },
    {
      id: 'c4',
      decision: {
        id: 'protect',
        label: 'حماية البيئة',
        icon: '🛡️',
        correct: true,
      },
      consequences: [
        '✅ القرار صحيح',
        '🌿 النباتات تنمو',
        '🦌 الحيوانات تتكاثر',
        '🌊 المياه نظيفة',
        '⚖️ التوازن محفوظ',
        '✨ النظام البيئي مستقر',
      ],
    },
  ];

  useEffect(() => {
    if (round < cascades.length) {
      setCurrentCascade(cascades[round]);
      setSelectedDecision(null);
      setShowConsequences(false);
      setConsequenceIndex(0);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 40);
    }
  }, [round, cascades.length, game.points, onComplete]);

  useEffect(() => {
    if (showConsequences && currentCascade && consequenceIndex < currentCascade.consequences.length) {
      const timer = setTimeout(() => {
        setConsequenceIndex(prev => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    } else if (showConsequences && currentCascade && consequenceIndex >= currentCascade.consequences.length) {
      // All consequences shown
      setTimeout(() => {
        if (round + 1 < cascades.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 40);
        }
      }, 2000);
    }
  }, [showConsequences, consequenceIndex, currentCascade, round, cascades.length, game.points, onComplete]);

  const handleDecisionSelect = (decisionId: string) => {
    if (!currentCascade) return;

    setSelectedDecision(decisionId);
    const isCorrect = decisionId === currentCascade.decision.id && currentCascade.decision.correct;

    if (isCorrect) {
      setScore(score + 15);
      setFeedback({ type: 'success', message: 'ممتاز! قرار صحيح يحمي البيئة ✨' });
      setShowConsequences(true);
    } else {
      setFeedback({ type: 'error', message: '❌ قرار خاطئ! شاهد العواقب... 💔' });
      setShowConsequences(true);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-red-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
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
            لقد فهمت كيف تؤثر القرارات على البيئة!
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

  if (!currentCascade) return null;

  const decisions: Decision[] = [
    currentCascade.decision,
    ...cascades.filter(c => c.id !== currentCascade.id).map(c => c.decision).slice(0, 2),
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-red-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">السؤال {round + 1} / {cascades.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decision Selection */}
      {!showConsequences && (
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-200 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              اختر قراراً بشرياً:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {decisions.map((decision, index) => (
                <motion.button
                  key={decision.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDecisionSelect(decision.id)}
                  disabled={selectedDecision !== null}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedDecision === decision.id
                      ? decision.correct
                        ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                        : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                      : selectedDecision !== null
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : 'border-gray-300 bg-white hover:border-amber-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-5xl mb-3">{decision.icon}</div>
                  <div className="font-bold text-gray-800 text-lg">{decision.label}</div>
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
          </CardContent>
        </Card>
      )}

      {/* Cascade Consequences */}
      {showConsequences && currentCascade && (
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-300 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {currentCascade.decision.correct ? '✅ العواقب الإيجابية:' : '❌ سلسلة الكوارث:'}
            </h3>

            <div className="space-y-4">
              {currentCascade.consequences.slice(0, consequenceIndex + 1).map((consequence, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl border-2 border-gray-200 shadow-md"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
                    className="text-3xl"
                  >
                    {index < currentCascade.consequences.length - 1 ? (
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    ) : (
                      <span>💔</span>
                    )}
                  </motion.div>
                  <div className="flex-1 text-right">
                    <span className="text-lg font-bold text-gray-800">{consequence}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {consequenceIndex >= currentCascade.consequences.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-500 rounded-xl text-center"
              >
                <span className="font-bold text-yellow-800 text-lg">
                  {currentCascade.decision.correct 
                    ? '✨ القرار الصحيح يحمي البيئة!' 
                    : '⚠️ القرار الخاطئ يؤدي لكارثة!'}
                </span>
              </motion.div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {cascades.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-red-400 to-orange-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / cascades.length) * 100}%` }}
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

