'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface BeforeAfterGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Comparison {
  id: string;
  title: string;
  before: Scene;
  after: Scene;
  changes: Change[];
  correctCause: string;
}

interface Scene {
  elements: SceneElement[];
  description: string;
}

interface SceneElement {
  id: string;
  label: string;
  icon: string;
  present: boolean;
}

interface Change {
  id: string;
  label: string;
  icon: string;
  correct: boolean;
}

export default function BeforeAfterGame({ game, onComplete }: BeforeAfterGameProps) {
  const [currentComparison, setCurrentComparison] = useState<Comparison | null>(null);
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const comparisons: Comparison[] = data.comparisons || [
    {
      id: 'c1',
      title: 'الغابة',
      before: {
        description: 'غابة خضراء مزدهرة',
        elements: [
          { id: 'trees', label: 'أشجار', icon: '🌳', present: true },
          { id: 'animals', label: 'حيوانات', icon: '🦌', present: true },
          { id: 'water', label: 'ماء', icon: '💧', present: true },
          { id: 'birds', label: 'طيور', icon: '🐦', present: true },
        ],
      },
      after: {
        description: 'غابة متضررة',
        elements: [
          { id: 'trees', label: 'أشجار', icon: '🌳', present: false },
          { id: 'animals', label: 'حيوانات', icon: '🦌', present: false },
          { id: 'water', label: 'ماء', icon: '💧', present: true },
          { id: 'birds', label: 'طيور', icon: '🐦', present: false },
        ],
      },
      changes: [
        { id: 'deforestation', label: 'قطع الأشجار', icon: '🪓', correct: true },
        { id: 'drought', label: 'جفاف', icon: '🏜️', correct: false },
        { id: 'fire', label: 'حرائق', icon: '🔥', correct: false },
      ],
      correctCause: 'deforestation',
    },
    {
      id: 'c2',
      title: 'النهر',
      before: {
        description: 'نهر نظيف وصحي',
        elements: [
          { id: 'fish', label: 'أسماك', icon: '🐟', present: true },
          { id: 'plants', label: 'نباتات مائية', icon: '🌿', present: true },
          { id: 'clean-water', label: 'مياه نظيفة', icon: '💧', present: true },
          { id: 'birds', label: 'طيور', icon: '🦅', present: true },
        ],
      },
      after: {
        description: 'نهر ملوث',
        elements: [
          { id: 'fish', label: 'أسماك', icon: '🐟', present: false },
          { id: 'plants', label: 'نباتات مائية', icon: '🌿', present: false },
          { id: 'clean-water', label: 'مياه نظيفة', icon: '💧', present: false },
          { id: 'birds', label: 'طيور', icon: '🦅', present: false },
        ],
      },
      changes: [
        { id: 'pollution', label: 'تلوث', icon: '💨', correct: true },
        { id: 'drought', label: 'جفاف', icon: '🏜️', correct: false },
        { id: 'overfishing', label: 'صيد جائر', icon: '🎣', correct: false },
      ],
      correctCause: 'pollution',
    },
    {
      id: 'c3',
      title: 'السافانا',
      before: {
        description: 'سافانا متوازنة',
        elements: [
          { id: 'grass', label: 'عشب', icon: '🌿', present: true },
          { id: 'herbivores', label: 'آكلات أعشاب', icon: '🦓', present: true },
          { id: 'predators', label: 'مفترسات', icon: '🦁', present: true },
          { id: 'balance', label: 'توازن', icon: '⚖️', present: true },
        ],
      },
      after: {
        description: 'سافانا مختلة',
        elements: [
          { id: 'grass', label: 'عشب', icon: '🌿', present: true },
          { id: 'herbivores', label: 'آكلات أعشاب', icon: '🦓', present: true },
          { id: 'predators', label: 'مفترسات', icon: '🦁', present: false },
          { id: 'balance', label: 'توازن', icon: '⚖️', present: false },
        ],
      },
      changes: [
        { id: 'overhunting', label: 'صيد جائر', icon: '🏹', correct: true },
        { id: 'drought', label: 'جفاف', icon: '🏜️', correct: false },
        { id: 'disease', label: 'أمراض', icon: '🦠', correct: false },
      ],
      correctCause: 'overhunting',
    },
  ];

  useEffect(() => {
    if (round < comparisons.length) {
      setCurrentComparison(comparisons[round]);
      setSelectedChanges([]);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 50);
    }
  }, [round, comparisons.length, game.points, onComplete]);

  const handleChangeSelect = (changeId: string) => {
    if (!currentComparison) return;

    if (selectedChanges.includes(changeId)) {
      setSelectedChanges(selectedChanges.filter(id => id !== changeId));
      return;
    }

    const newSelection = [...selectedChanges, changeId];
    setSelectedChanges(newSelection);

    // Check if correct cause is selected
    if (newSelection.includes(currentComparison.correctCause)) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'ممتاز! حددت السبب الصحيح! ✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < comparisons.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 50);
        }
      }, 2000);
    } else if (newSelection.length >= currentComparison.changes.length) {
      setFeedback({ type: 'error', message: '❌ السبب غير صحيح! فكر في التغييرات مرة أخرى 💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedChanges([]);
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
            أنت كاشف الأخطاء البيئية! لقد ربطت بين السبب والنتيجة!
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

  if (!currentComparison) return null;

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
              <div className="text-sm opacity-80">المقارنة {round + 1} / {comparisons.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{currentComparison.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Before */}
            <div className="bg-white p-6 rounded-xl border-2 border-green-400 shadow-lg">
              <h4 className="text-xl font-bold text-green-700 mb-4 text-center">قبل ⏪</h4>
              <p className="text-sm text-gray-600 mb-4 text-center">{currentComparison.before.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {currentComparison.before.elements.map((element) => (
                  <motion.div
                    key={element.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-lg border-2 text-center ${
                      element.present
                        ? 'bg-green-100 border-green-400'
                        : 'bg-gray-100 border-gray-300 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{element.icon}</div>
                    <div className="text-xs font-bold text-gray-800">{element.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight className="w-12 h-12 text-gray-400" />
              </motion.div>
            </div>

            {/* After */}
            <div className="bg-white p-6 rounded-xl border-2 border-red-400 shadow-lg">
              <h4 className="text-xl font-bold text-red-700 mb-4 text-center">بعد ⏩</h4>
              <p className="text-sm text-gray-600 mb-4 text-center">{currentComparison.after.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {currentComparison.after.elements.map((element) => (
                  <motion.div
                    key={element.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-lg border-2 text-center ${
                      element.present
                        ? 'bg-green-100 border-green-400'
                        : 'bg-red-100 border-red-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">{element.icon}</div>
                    <div className="text-xs font-bold text-gray-800">{element.label}</div>
                    {!element.present && (
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="text-xl mt-1"
                      >
                        ❌
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Changes */}
          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
              ما الذي تغيّر؟ لماذا؟
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentComparison.changes.map((change, index) => {
                const isSelected = selectedChanges.includes(change.id);
                return (
                  <motion.button
                    key={change.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleChangeSelect(change.id)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? change.correct
                          ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                          : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                        : 'border-gray-300 bg-white hover:border-purple-400 hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-4xl mb-3">{change.icon}</div>
                    <div className="font-bold text-gray-800 text-lg">{change.label}</div>
                  </motion.button>
                );
              })}
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
          <span>{round + 1} / {comparisons.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / comparisons.length) * 100}%` }}
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

