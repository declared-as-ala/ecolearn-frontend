'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Search, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface DiscoverCollapseCauseGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface CollapsedSystem {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  correctCause: string;
  possibleCauses: Cause[];
}

interface Cause {
  id: string;
  label: string;
  icon: string;
  description: string;
  correct: boolean;
}

export default function DiscoverCollapseCauseGame({ game, onComplete }: DiscoverCollapseCauseGameProps) {
  const [currentSystem, setCurrentSystem] = useState<CollapsedSystem | null>(null);
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [investigationStep, setInvestigationStep] = useState<'symptoms' | 'causes'>('symptoms');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const systems: CollapsedSystem[] = data.systems || [
    {
      id: 's1',
      title: 'نظام مائي منهار',
      description: 'نهر ملوث، أسماك ميتة، نباتات ذابلة',
      symptoms: [
        '🐟 أسماك ميتة على سطح الماء',
        '🌿 نباتات مائية ذابلة',
        '💨 رائحة كريهة',
        '🌊 مياه عكرة',
      ],
      correctCause: 'pollution',
      possibleCauses: [
        {
          id: 'pollution',
          label: 'تلوث',
          icon: '💨',
          description: 'رمي النفايات في النهر',
          correct: true,
        },
        {
          id: 'drought',
          label: 'جفاف',
          icon: '🏜️',
          description: 'نقص في المياه',
          correct: false,
        },
        {
          id: 'overfishing',
          label: 'صيد جائر',
          icon: '🎣',
          description: 'صيد مفرط للأسماك',
          correct: false,
        },
      ],
    },
    {
      id: 's2',
      title: 'غابة متضررة',
      description: 'أشجار مقطوعة، حيوانات نادرة، تربة جرداء',
      symptoms: [
        '🪓 أشجار مقطوعة',
        '🌍 تربة عارية',
        '🦌 حيوانات نادرة',
        '💨 رياح قوية تجرف التربة',
      ],
      correctCause: 'deforestation',
      possibleCauses: [
        {
          id: 'deforestation',
          label: 'قطع الأشجار',
          icon: '🪓',
          description: 'قطع مفرط للأشجار',
          correct: true,
        },
        {
          id: 'fire',
          label: 'حرائق',
          icon: '🔥',
          description: 'حرائق طبيعية',
          correct: false,
        },
        {
          id: 'disease',
          label: 'أمراض',
          icon: '🦠',
          description: 'أمراض النباتات',
          correct: false,
        },
      ],
    },
    {
      id: 's3',
      title: 'نظام غذائي مختل',
      description: 'حيوانات مفترسة نادرة، أعداد كبيرة من الفرائس',
      symptoms: [
        '🐺 مفترسات نادرة',
        '🐰 فرائس كثيرة جداً',
        '🌿 نباتات قليلة',
        '⚖️ عدم توازن',
      ],
      correctCause: 'overhunting',
      possibleCauses: [
        {
          id: 'overhunting',
          label: 'صيد جائر',
          icon: '🏹',
          description: 'صيد مفرط للمفترسات',
          correct: true,
        },
        {
          id: 'disease',
          label: 'أمراض',
          icon: '🦠',
          description: 'أمراض المفترسات',
          correct: false,
        },
        {
          id: 'migration',
          label: 'هجرة',
          icon: '🦅',
          description: 'هجرة المفترسات',
          correct: false,
        },
      ],
    },
  ];

  useEffect(() => {
    if (round < systems.length) {
      setCurrentSystem(systems[round]);
      setSelectedCause(null);
      setInvestigationStep('symptoms');
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 45);
    }
  }, [round, systems.length, game.points, onComplete]);

  const handleCauseSelect = (causeId: string) => {
    if (!currentSystem) return;

    setSelectedCause(causeId);
    const isCorrect = causeId === currentSystem.correctCause;

    if (isCorrect) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'ممتاز! اكتشفت السبب الحقيقي! 🔍✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < systems.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 45);
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: '❌ هذا ليس السبب! النظام لا يتعافى. فكر مرة أخرى 💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedCause(null);
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
            أنت محلل الاختلال البيئي! لقد اكتشفت جميع الأسباب!
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

  if (!currentSystem) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-blue-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">الحالة {round + 1} / {systems.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collapsed System */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">{currentSystem.title}</h3>
          </div>
          <p className="text-lg text-gray-700 mb-6">{currentSystem.description}</p>

          {/* Symptoms */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-bold text-gray-800">الأعراض (علامات الانهيار):</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentSystem.symptoms.map((symptom, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-md"
                >
                  <span className="text-gray-800 font-medium">{symptom}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Causes */}
          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
              ما هو سبب الانهيار؟
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentSystem.possibleCauses.map((cause, index) => (
                <motion.button
                  key={cause.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCauseSelect(cause.id)}
                  disabled={selectedCause !== null}
                  className={`p-6 rounded-xl border-2 transition-all text-right ${
                    selectedCause === cause.id
                      ? cause.correct
                        ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                        : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                      : selectedCause !== null
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-4xl mb-3">{cause.icon}</div>
                  <div className="font-bold text-gray-800 mb-2">{cause.label}</div>
                  <div className="text-sm text-gray-600">{cause.description}</div>
                </motion.button>
              ))}
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
                <div className="flex items-center justify-center gap-2">
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-bold text-lg">{feedback.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {systems.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / systems.length) * 100}%` }}
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

