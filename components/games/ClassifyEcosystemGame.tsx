'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface ClassifyEcosystemGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Element {
  id: string;
  label: string;
  icon: string;
  type: 'living' | 'non-living';
}

export default function ClassifyEcosystemGame({ game, onComplete }: ClassifyEcosystemGameProps) {
  const [elements, setElements] = useState<Element[]>([]);
  const [classifications, setClassifications] = useState<{ [key: string]: 'living' | 'non-living' | null }>({});
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [shakingElements, setShakingElements] = useState<string[]>([]);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;

  useEffect(() => {
    if (round >= rounds) {
      setCompleted(true);
      onComplete?.(game.points || 40);
      return;
    }

    const allElements: Element[] = data.elements || [
      { id: 'plant', label: 'نبات', icon: '🌿', type: 'living' },
      { id: 'animal', label: 'حيوان', icon: '🦌', type: 'living' },
      { id: 'sun', label: 'شمس', icon: '☀️', type: 'non-living' },
      { id: 'water', label: 'ماء', icon: '💧', type: 'non-living' },
      { id: 'soil', label: 'تربة', icon: '🌍', type: 'non-living' },
      { id: 'air', label: 'هواء', icon: '💨', type: 'non-living' },
      { id: 'bacteria', label: 'بكتيريا', icon: '🦠', type: 'living' },
      { id: 'rock', label: 'صخرة', icon: '🪨', type: 'non-living' },
    ];

    // Shuffle and select 6 random elements
    const shuffled = [...allElements].sort(() => Math.random() - 0.5).slice(0, 6);
    setElements(shuffled);
    setClassifications({});
    setFeedback(null);
    setShakingElements([]);
  }, [round, rounds, game.points, onComplete, data.elements]);

  useEffect(() => {
    // Check if all elements are classified correctly
    const allClassified = elements.every(el => classifications[el.id] !== null);
    if (allClassified) {
      const allCorrect = elements.every(el => classifications[el.id] === el.type);
      
      if (allCorrect) {
        setScore(score + 20);
        setFeedback({ type: 'success', message: 'ممتاز! جميع التصنيفات صحيحة! ✨' });
        
        setTimeout(() => {
          setFeedback(null);
          if (round + 1 < rounds) {
            setRound(round + 1);
          } else {
            setCompleted(true);
            onComplete?.(game.points || 40);
          }
        }, 2000);
      } else {
        // Find incorrect classifications
        const incorrect = elements.filter(el => classifications[el.id] !== el.type);
        setShakingElements(incorrect.map(el => el.id));
        setFeedback({ type: 'error', message: '❌ بعض التصنيفات خاطئة! راجع اختياراتك 💔' });
        
        setTimeout(() => {
          setFeedback(null);
          setShakingElements([]);
          // Reset incorrect classifications
          setClassifications(prev => {
            const newClass = { ...prev };
            incorrect.forEach(el => {
              newClass[el.id] = null;
            });
            return newClass;
          });
        }, 2000);
      }
    }
  }, [classifications, elements, round, rounds, score, onComplete, game.points]);

  const handleClassification = (elementId: string, type: 'living' | 'non-living') => {
    setClassifications(prev => ({ ...prev, [elementId]: type }));
    
    const element = elements.find(el => el.id === elementId);
    if (element && element.type === type) {
      setScore(score + 3);
    } else if (element) {
      setShakingElements([elementId]);
      setTimeout(() => setShakingElements([]), 1000);
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
            أنت خبير مكونات الوسط! لقد صنفت جميع العناصر بشكل صحيح!
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

  const livingElements = elements.filter(el => classifications[el.id] === 'living');
  const nonLivingElements = elements.filter(el => classifications[el.id] === 'non-living');
  const unclassifiedElements = elements.filter(el => classifications[el.id] === null);

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
              <div className="text-sm opacity-80">الجولة {round + 1} / {rounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unclassified Elements */}
      {unclassifiedElements.length > 0 && (
        <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-4 border-gray-300 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">اسحب العناصر إلى التصنيف الصحيح:</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {unclassifiedElements.map((element) => {
                const isShaking = shakingElements.includes(element.id);
                return (
                  <motion.div
                    key={element.id}
                    animate={isShaking ? { 
                      x: [0, -10, 10, -10, 10, 0],
                      rotate: [0, -5, 5, -5, 5, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className="p-4 rounded-xl border-2 border-gray-300 bg-white text-center cursor-move"
                  >
                    <div className="text-4xl mb-2">{element.icon}</div>
                    <div className="text-sm font-bold text-gray-800">{element.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Classification Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Living */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 rounded-2xl shadow-lg min-h-[300px]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🟢</span>
              </div>
              <h3 className="text-2xl font-bold text-green-800">حي</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 min-h-[200px]">
              {livingElements.map((element) => {
                const isCorrect = element.type === 'living';
                return (
                  <motion.div
                    key={element.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-4 rounded-xl border-2 text-center ${
                      isCorrect
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                    }`}
                  >
                    <div className="text-3xl mb-2">{element.icon}</div>
                    <div className="text-xs font-bold text-gray-800">{element.label}</div>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mt-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mx-auto mt-2" />
                    )}
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => unclassifiedElements.forEach(el => handleClassification(el.id, 'living'))}
                disabled={unclassifiedElements.length === 0}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ضع هنا
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Non-Living */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-4 border-blue-400 rounded-2xl shadow-lg min-h-[300px]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🔵</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-800">لا حي</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 min-h-[200px]">
              {nonLivingElements.map((element) => {
                const isCorrect = element.type === 'non-living';
                return (
                  <motion.div
                    key={element.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-4 rounded-xl border-2 text-center ${
                      isCorrect
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-red-100 border-red-500'
                    }`}
                  >
                    <div className="text-3xl mb-2">{element.icon}</div>
                    <div className="text-xs font-bold text-gray-800">{element.label}</div>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mx-auto mt-2" />
                    )}
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => unclassifiedElements.forEach(el => handleClassification(el.id, 'non-living'))}
                disabled={unclassifiedElements.length === 0}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ضع هنا
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Click to Classify (Alternative) */}
      {unclassifiedElements.length > 0 && (
        <Card className="bg-yellow-50 border-2 border-yellow-200 rounded-xl">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800 text-center">
              <strong>طريقة بديلة:</strong> اضغط على العنصر ثم اختر تصنيفه من الأسفل
            </p>
            <div className="flex justify-center gap-4 mt-4">
              {unclassifiedElements.map((element) => (
                <div key={element.id} className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleClassification(element.id, 'living')}
                    className="p-3 rounded-lg bg-green-100 border-2 border-green-400 mb-2"
                  >
                    <div className="text-3xl mb-1">{element.icon}</div>
                    <div className="text-xs font-bold">{element.label}</div>
                  </motion.button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleClassification(element.id, 'living')}
                      className="px-3 py-1 bg-green-500 text-white rounded text-xs"
                    >
                      حي
                    </button>
                    <button
                      onClick={() => handleClassification(element.id, 'non-living')}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                    >
                      لا حي
                    </button>
                  </div>
                </div>
              ))}
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
          <span>{round + 1} / {rounds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-cyan-500 h-4 rounded-full relative overflow-hidden"
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

