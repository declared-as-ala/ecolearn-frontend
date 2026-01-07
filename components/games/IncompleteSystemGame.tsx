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

interface IncompleteSystemGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface System {
  id: string;
  title: string;
  elements: SystemElement[];
  missingElement: string;
  consequences: string[];
}

interface SystemElement {
  id: string;
  label: string;
  icon: string;
  present: boolean;
}

export default function IncompleteSystemGame({ game, onComplete }: IncompleteSystemGameProps) {
  const [currentSystem, setCurrentSystem] = useState<System | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showConsequences, setShowConsequences] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const systems: System[] = data.systems || [
    {
      id: 's1',
      title: 'نظام نباتي',
      elements: [
        { id: 'plant', label: 'نبات', icon: '🌿', present: true },
        { id: 'water', label: 'ماء', icon: '💧', present: false },
        { id: 'sun', label: 'شمس', icon: '☀️', present: true },
        { id: 'soil', label: 'تربة', icon: '🌍', present: true },
      ],
      missingElement: 'water',
      consequences: [
        '🌿 النبات يذبل',
        '🥀 الأوراق تجف',
        '💔 النبات يموت',
        '🌍 النظام البيئي يختل',
      ],
    },
    {
      id: 's2',
      title: 'نظام حيواني',
      elements: [
        { id: 'animal', label: 'حيوان', icon: '🦌', present: true },
        { id: 'plant', label: 'نبات', icon: '🌿', present: false },
        { id: 'water', label: 'ماء', icon: '💧', present: true },
        { id: 'air', label: 'هواء', icon: '💨', present: true },
      ],
      missingElement: 'plant',
      consequences: [
        '🦌 الحيوان جائع',
        '📉 الحيوان يضعف',
        '💔 الحيوان يموت',
        '🌍 النظام البيئي ينهار',
      ],
    },
    {
      id: 's3',
      title: 'نظام مائي',
      elements: [
        { id: 'fish', label: 'سمكة', icon: '🐟', present: true },
        { id: 'water', label: 'ماء', icon: '💧', present: false },
        { id: 'algae', label: 'طحالب', icon: '🌊', present: true },
        { id: 'oxygen', label: 'أكسجين', icon: '💨', present: true },
      ],
      missingElement: 'water',
      consequences: [
        '🐟 السمكة لا تستطيع التنفس',
        '💔 السمكة تموت',
        '🌊 النظام المائي ينهار',
      ],
    },
  ];

  useEffect(() => {
    if (round < systems.length) {
      setCurrentSystem(systems[round]);
      setSelectedElement(null);
      setShowConsequences(false);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 50);
    }
  }, [round, systems.length, game.points, onComplete]);

  const handleElementSelect = (elementId: string) => {
    if (!currentSystem) return;

    setSelectedElement(elementId);
    const isCorrect = elementId === currentSystem.missingElement;

    if (isCorrect) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'صحيح! هذا هو العنصر المفقود! ✨' });
      setShowConsequences(true);
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < systems.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 50);
        }
      }, 3000);
    } else {
      setFeedback({ type: 'error', message: '❌ خطأ! النظام لا يعمل. فكر مرة أخرى 💔' });
      setShowConsequences(true);
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedElement(null);
        setShowConsequences(false);
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
            لقد اكتشفت جميع العناصر المفقودة! كل عنصر ضروري!
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

  const missingElementData = currentSystem.elements.find(el => !el.present);
  const allPossibleElements = [
    ...currentSystem.elements,
    ...systems.flatMap(s => s.elements).filter(el => 
      !currentSystem.elements.some(ce => ce.id === el.id)
    ),
  ].filter((el, index, self) => 
    index === self.findIndex(e => e.id === el.id)
  );

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
              <div className="text-sm opacity-80">النظام {round + 1} / {systems.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Display */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">{currentSystem.title} - غير مكتمل!</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {currentSystem.elements.map((element) => (
              <motion.div
                key={element.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: element.present ? 1 : 0.7,
                  opacity: element.present ? 1 : 0.5
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
                    <div className="text-4xl mb-2">❓</div>
                    <div className="text-sm font-bold text-red-600">مفقود</div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Question */}
          <div className="bg-white p-4 rounded-xl mb-6 border-2 border-blue-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
              ما هو العنصر المفقود؟
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allPossibleElements.slice(0, 8).map((element) => {
                const isSelected = selectedElement === element.id;
                const isCorrect = element.id === currentSystem.missingElement;
                const isInSystem = currentSystem.elements.some(el => el.id === element.id);
                
                return (
                  <motion.button
                    key={element.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleElementSelect(element.id)}
                    disabled={isSelected && !isCorrect}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                          : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                        : isInSystem && currentSystem.elements.find(el => el.id === element.id)?.present
                        ? 'border-gray-300 bg-gray-100 opacity-50'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-4xl mb-2">{element.icon}</div>
                    <div className="text-sm font-bold text-gray-800">{element.label}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Consequences */}
          <AnimatePresence>
            {showConsequences && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-xl ${
                  selectedElement === currentSystem.missingElement
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'bg-orange-100 border-2 border-orange-500'
                }`}
              >
                <h4 className="font-bold text-gray-800 mb-3 text-center">
                  {selectedElement === currentSystem.missingElement 
                    ? '❌ ماذا يحدث بدون هذا العنصر؟' 
                    : '⚠️ العواقب:'}
                </h4>
                <div className="space-y-2">
                  {currentSystem.consequences.map((consequence, index) => (
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
          <span>{round + 1} / {systems.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-red-400 to-orange-500 h-4 rounded-full relative overflow-hidden"
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

