'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface DominoEffectGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Element {
  id: string;
  label: string;
  icon: string;
  present: boolean;
}

interface Cascade {
  id: string;
  removedElement: string;
  effects: string[];
  solutions: Solution[];
}

interface Solution {
  id: string;
  label: string;
  icon: string;
  correct: boolean;
}

export default function DominoEffectGame({ game, onComplete }: DominoEffectGameProps) {
  const [currentCascade, setCurrentCascade] = useState<Cascade | null>(null);
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [showEffects, setShowEffects] = useState(false);
  const [effectIndex, setEffectIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const cascades: Cascade[] = data.cascades || [
    {
      id: 'c1',
      removedElement: 'plant',
      effects: [
        '🌿 النباتات تختفي',
        '🦌 الحيوانات لا تجد غذاء',
        '🦌 الحيوانات تموت جوعاً',
        '🦊 المفترسات لا تجد غذاء',
        '💔 النظام البيئي ينهار',
      ],
      solutions: [
        { id: 'replant', label: 'إعادة التشجير', icon: '🌱', correct: true },
        { id: 'feed', label: 'إطعام الحيوانات', icon: '🍖', correct: false },
        { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
      ],
    },
    {
      id: 'c2',
      removedElement: 'water',
      effects: [
        '💧 الماء يختفي',
        '🌿 النباتات تذبل',
        '🦌 الحيوانات لا تجد ماء',
        '💔 النظام البيئي ينهار',
      ],
      solutions: [
        { id: 'irrigate', label: 'ري النباتات', icon: '💧', correct: true },
        { id: 'cut-trees', label: 'قطع الأشجار', icon: '🪓', correct: false },
        { id: 'wait', label: 'انتظار المطر', icon: '⏳', correct: false },
      ],
    },
    {
      id: 'c3',
      removedElement: 'decomposer',
      effects: [
        '🦠 المفككات تختفي',
        '💀 الجثث تتراكم',
        '🌍 التربة لا تحصل على معادن',
        '🌿 النباتات لا تنمو',
        '💔 النظام البيئي ينهار',
      ],
      solutions: [
        { id: 'add-bacteria', label: 'إضافة بكتيريا', icon: '🦠', correct: true },
        { id: 'burn', label: 'حرق الجثث', icon: '🔥', correct: false },
        { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
      ],
    },
  ];

  useEffect(() => {
    if (round < cascades.length) {
      const cascade = cascades[round];
      setCurrentCascade(cascade);
      
      // Initialize elements
      const initialElements: Element[] = [
        { id: 'plant', label: 'نبات', icon: '🌿', present: cascade.removedElement !== 'plant' },
        { id: 'animal', label: 'حيوان', icon: '🦌', present: cascade.removedElement !== 'animal' },
        { id: 'water', label: 'ماء', icon: '💧', present: cascade.removedElement !== 'water' },
        { id: 'decomposer', label: 'مفكك', icon: '🦠', present: cascade.removedElement !== 'decomposer' },
      ];
      setElements(initialElements);
      
      setSelectedElement(null);
      setSelectedSolution(null);
      setShowEffects(false);
      setEffectIndex(0);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 45);
    }
  }, [round, cascades.length, game.points, onComplete]);

  useEffect(() => {
    if (showEffects && currentCascade && effectIndex < currentCascade.effects.length) {
      const timer = setTimeout(() => {
        setEffectIndex(prev => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showEffects, effectIndex, currentCascade]);

  const handleElementRemove = (elementId: string) => {
    if (!currentCascade) return;

    setSelectedElement(elementId);
    setShowEffects(true);
    setEffectIndex(0);
  };

  const handleSolutionSelect = (solutionId: string) => {
    if (!currentCascade) return;

    setSelectedSolution(solutionId);
    const solution = currentCascade.solutions.find(s => s.id === solutionId);
    if (!solution) return;

    if (solution.correct) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'ممتاز! أوقفت الانهيار! ✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < cascades.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 45);
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: '❌ هذا الحل لا يوقف الانهيار! فكر مرة أخرى 💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedSolution(null);
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
            رائع! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-4"
          >
            أنت حارس النظام المتكامل! لقد أوقفت جميع التأثيرات المتسلسلة!
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

  const removedElement = elements.find(el => !el.present);

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
              <div className="text-sm opacity-80">السلسلة {round + 1} / {cascades.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Elements */}
      <Card className="bg-gradient-to-br from-gray-50 to-red-50 border-4 border-gray-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">العناصر في النظام:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {elements.map((element) => (
              <motion.div
                key={element.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: element.present ? 1 : 0.5,
                  opacity: element.present ? 1 : 0.3
                }}
                className={`p-4 rounded-xl border-2 text-center ${
                  element.present
                    ? 'bg-green-100 border-green-400'
                    : 'bg-red-100 border-red-400 border-dashed'
                }`}
              >
                {element.present ? (
                  <>
                    <div className="text-4xl mb-2">{element.icon}</div>
                    <div className="text-sm font-bold text-gray-800">{element.label}</div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-2">❌</div>
                    <div className="text-sm font-bold text-red-600">محذوف</div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cascade Effects */}
      {showEffects && (
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-300 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">سلسلة التأثيرات المتتالية:</h3>
            <div className="space-y-3">
              {currentCascade.effects.slice(0, effectIndex + 1).map((effect, index) => (
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
                    className="text-2xl"
                  >
                    {index < currentCascade.effects.length - 1 ? (
                      <ArrowRight className="w-6 h-6 text-red-400" />
                    ) : (
                      <span>💔</span>
                    )}
                  </motion.div>
                  <div className="flex-1 text-right">
                    <span className="text-lg font-bold text-gray-800">{effect}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Solutions */}
      {showEffects && effectIndex >= currentCascade.effects.length && (
        <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-4 border-blue-300 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              كيف توقف الانهيار؟
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCascade.solutions.map((solution, index) => {
                const isSelected = selectedSolution === solution.id;
                return (
                  <motion.button
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSolutionSelect(solution.id)}
                    disabled={selectedSolution !== null}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? solution.correct
                          ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                          : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                        : selectedSolution !== null
                        ? 'border-gray-300 bg-gray-100 opacity-50'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-4xl mb-3">{solution.icon}</div>
                    <div className="font-bold text-gray-800 text-lg">{solution.label}</div>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

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

