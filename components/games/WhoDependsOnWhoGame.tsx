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

interface WhoDependsOnWhoGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Element {
  id: string;
  label: string;
  icon: string;
  dependencies: string[]; // IDs of elements it depends on
}

interface Relationship {
  from: string;
  to: string;
  selected: boolean;
}

export default function WhoDependsOnWhoGame({ game, onComplete }: WhoDependsOnWhoGameProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const elements: Element[] = data.elements || [
    {
      id: 'plant',
      label: 'النبات',
      icon: '🌿',
      dependencies: ['water', 'sun', 'soil'],
    },
    {
      id: 'animal',
      label: 'الحيوان',
      icon: '🦌',
      dependencies: ['plant', 'water', 'air'],
    },
    {
      id: 'water',
      label: 'الماء',
      icon: '💧',
      dependencies: [],
    },
    {
      id: 'sun',
      label: 'الشمس',
      icon: '☀️',
      dependencies: [],
    },
    {
      id: 'soil',
      label: 'التربة',
      icon: '🌍',
      dependencies: [],
    },
    {
      id: 'air',
      label: 'الهواء',
      icon: '💨',
      dependencies: [],
    },
  ];

  useEffect(() => {
    if (round >= 3) {
      setCompleted(true);
      onComplete?.(game.points || 45);
      return;
    }

    setSelectedElement(null);
    setRelationships([]);
    setFeedback(null);
  }, [round, game.points, onComplete]);

  useEffect(() => {
    if (!selectedElement) return;

    const element = elements.find(el => el.id === selectedElement);
    if (!element) return;

    // Check if all dependencies are correctly selected
    const selectedDeps = relationships
      .filter(rel => rel.from === selectedElement && rel.selected)
      .map(rel => rel.to);

    const allCorrect = element.dependencies.every(dep => selectedDeps.includes(dep)) &&
                      selectedDeps.length === element.dependencies.length;

    if (allCorrect && element.dependencies.length > 0) {
      setScore(score + 15);
      setFeedback({ type: 'success', message: 'ممتاز! حددت جميع الاعتمادات! ✨' });
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedElement(null);
        if (round + 1 < 3) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 45);
        }
      }, 2000);
    }
  }, [relationships, selectedElement, elements, round, score, onComplete, game.points]);

  const handleElementClick = (elementId: string) => {
    if (selectedElement === elementId) {
      setSelectedElement(null);
      return;
    }

    setSelectedElement(elementId);
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    // Initialize relationships for this element
    const newRelationships: Relationship[] = element.dependencies.map(dep => ({
      from: elementId,
      to: dep,
      selected: false,
    }));

    setRelationships(prev => [
      ...prev.filter(rel => rel.from !== elementId),
      ...newRelationships,
    ]);
  };

  const handleDependencyToggle = (dependencyId: string) => {
    if (!selectedElement) return;

    setRelationships(prev => prev.map(rel => {
      if (rel.from === selectedElement && rel.to === dependencyId) {
        return { ...rel, selected: !rel.selected };
      }
      return rel;
    }));
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
            أنت مكتشف العلاقات البيئية! لقد فهمت الاعتماد المتبادل!
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

  const selectedElementData = selectedElement ? elements.find(el => el.id === selectedElement) : null;
  const availableDependencies = selectedElementData
    ? elements.filter(el => selectedElementData.dependencies.includes(el.id))
    : [];

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
              <div className="text-sm opacity-80">السؤال {round + 1} / 3</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800 text-center">
            <strong>كيف تلعب:</strong> اضغط على عنصر لرؤية ما يحتاج إليه. ثم اختر العناصر التي يعتمد عليها!
          </p>
        </CardContent>
      </Card>

      {/* Elements */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">اختر عنصراً:</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {elements.map((element) => {
              const isSelected = selectedElement === element.id;
              return (
                <motion.button
                  key={element.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: isSelected ? 1.1 : 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleElementClick(element.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-100 shadow-lg ring-4 ring-purple-300'
                      : 'border-gray-300 bg-white hover:border-green-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-4xl mb-2">{element.icon}</div>
                  <div className="text-sm font-bold text-gray-800">{element.label}</div>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dependencies */}
      {selectedElementData && (
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-300 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4"
              >
                {selectedElementData.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedElementData.label}</h3>
              <p className="text-lg text-gray-700">يحتاج إلى:</p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              {/* Selected Element */}
              <div className="p-4 rounded-xl bg-purple-100 border-2 border-purple-400">
                <div className="text-4xl mb-2">{selectedElementData.icon}</div>
                <div className="text-sm font-bold">{selectedElementData.label}</div>
              </div>

              <ArrowRight className="w-8 h-8 text-gray-400" />

              {/* Dependencies */}
              <div className="flex flex-wrap gap-3">
                {availableDependencies.map((dep) => {
                  const relationship = relationships.find(
                    rel => rel.from === selectedElement && rel.to === dep.id
                  );
                  const isSelected = relationship?.selected || false;
                  const isCorrect = selectedElementData.dependencies.includes(dep.id);

                  return (
                    <motion.button
                      key={dep.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDependencyToggle(dep.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? isCorrect
                            ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                            : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                          : 'border-gray-300 bg-white hover:border-yellow-400 hover:shadow-lg cursor-pointer'
                      }`}
                    >
                      <div className="text-4xl mb-2">{dep.icon}</div>
                      <div className="text-sm font-bold text-gray-800">{dep.label}</div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2"
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                          )}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
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
          <span>{round + 1} / 3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / 3) * 100}%` }}
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

