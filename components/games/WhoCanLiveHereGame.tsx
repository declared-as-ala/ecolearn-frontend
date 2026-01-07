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

interface WhoCanLiveHereGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Climate {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

interface Creature {
  id: string;
  label: string;
  icon: string;
  suitableClimates: string[];
}

export default function WhoCanLiveHereGame({ game, onComplete }: WhoCanLiveHereGameProps) {
  const [selectedCreature, setSelectedCreature] = useState<string | null>(null);
  const [placedCreatures, setPlacedCreatures] = useState<{ [climateId: string]: string }>({});
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const data = game.gameData || {};
  const climates: Climate[] = data.climates || [
    { id: 'desert', label: 'صحراء', icon: '☀️', color: 'yellow', description: 'حار وجاف' },
    { id: 'rainforest', label: 'غابة ممطرة', icon: '🌧️', color: 'green', description: 'ممطر ورطب' },
    { id: 'cold', label: 'منطقة باردة', icon: '❄️', color: 'blue', description: 'بارد وثلجي' },
    { id: 'temperate', label: 'منطقة معتدلة', icon: '🌤️', color: 'emerald', description: 'معتدل ومتوازن' },
  ];

  const creatures: Creature[] = data.creatures || [
    { id: 'camel', label: 'الجمل', icon: '🐪', suitableClimates: ['desert'] },
    { id: 'cactus', label: 'الصبار', icon: '🌵', suitableClimates: ['desert'] },
    { id: 'monkey', label: 'القرد', icon: '🐵', suitableClimates: ['rainforest'] },
    { id: 'frog', label: 'الضفدع', icon: '🐸', suitableClimates: ['rainforest'] },
    { id: 'penguin', label: 'البطريق', icon: '🐧', suitableClimates: ['cold'] },
    { id: 'polar-bear', label: 'الدب القطبي', icon: '🐻‍❄️', suitableClimates: ['cold'] },
    { id: 'deer', label: 'الغزال', icon: '🦌', suitableClimates: ['temperate'] },
    { id: 'oak', label: 'البلوط', icon: '🌳', suitableClimates: ['temperate'] },
  ];

  const currentRoundCreatures = creatures.slice(round * 4, (round + 1) * 4);
  const totalRounds = Math.ceil(creatures.length / 4);

  useEffect(() => {
    checkPlacements();
  }, [placedCreatures, round]);

  const checkPlacements = () => {
    const newErrors: string[] = [];
    
    Object.entries(placedCreatures).forEach(([climateId, creatureId]) => {
      const creature = creatures.find(c => c.id === creatureId);
      if (creature && !creature.suitableClimates.includes(climateId)) {
        newErrors.push(`${creature.label} لا يعيش في ${climates.find(c => c.id === climateId)?.label}!`);
      }
    });

    setErrors(newErrors);

    // Check if all current round creatures are correctly placed
    if (newErrors.length === 0 && currentRoundCreatures.every(c => 
      Object.values(placedCreatures).includes(c.id)
    )) {
      if (round + 1 < totalRounds) {
        setTimeout(() => {
          setRound(round + 1);
          setPlacedCreatures({});
          setSelectedCreature(null);
          setScore(score + 15);
          setFeedback({ type: 'success', message: 'أحسنت! كل كائن له مناخه 🌍✨' });
          setTimeout(() => setFeedback(null), 2000);
        }, 1500);
      } else {
        setCompleted(true);
        onComplete?.(game.points || 45);
      }
    }
  };

  const handleCreatureSelect = (creatureId: string) => {
    setSelectedCreature(creatureId);
  };

  const handleClimateClick = (climateId: string) => {
    if (!selectedCreature) return;

    const creature = creatures.find(c => c.id === selectedCreature);
    if (!creature) return;

    const isCorrect = creature.suitableClimates.includes(climateId);

    if (isCorrect) {
      setPlacedCreatures(prev => ({ ...prev, [climateId]: selectedCreature }));
      setScore(score + 5);
      setFeedback({ type: 'success', message: 'صحيح! ✨' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedCreature(null);
      }, 1000);
    } else {
      setFeedback({ type: 'error', message: '❌ هذا الكائن لا يعيش هنا! فكر مرة أخرى 😢' });
      setTimeout(() => setFeedback(null), 2000);
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
            لقد ربطت كل كائن بمناخه المناسب!
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
              <div className="text-sm opacity-80">الجولة {round + 1} / {totalRounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800 text-center">
            <strong>كيف تلعب:</strong> اختر كائناً، ثم اضغط على المناخ المناسب له. كل كائن يعيش في مناخ محدد! 🌍
          </p>
        </CardContent>
      </Card>

      {/* Creatures */}
      <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-2 border-green-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">اختر الكائن:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentRoundCreatures.map((creature) => {
              const isSelected = selectedCreature === creature.id;
              const isPlaced = Object.values(placedCreatures).includes(creature.id);
              return (
                <motion.button
                  key={creature.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isPlaced ? 0.5 : 1, 
                    scale: isSelected ? 1.1 : 1 
                  }}
                  whileHover={!isPlaced ? { scale: 1.05, y: -5 } : {}}
                  whileTap={!isPlaced ? { scale: 0.95 } : {}}
                  onClick={() => !isPlaced && handleCreatureSelect(creature.id)}
                  disabled={isPlaced}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-100 shadow-lg ring-4 ring-blue-300'
                      : isPlaced
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : 'border-gray-300 bg-white hover:border-green-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-5xl mb-2">{creature.icon}</div>
                  <div className="font-bold text-gray-800 text-sm">{creature.label}</div>
                  {isPlaced && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2"
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Climates */}
      <Card className="bg-gradient-to-br from-yellow-50 to-blue-50 border-2 border-yellow-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">ضع الكائن في مناخه المناسب:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {climates.map((climate) => {
              const placedCreatureId = placedCreatures[climate.id];
              const placedCreature = placedCreatureId ? creatures.find(c => c.id === placedCreatureId) : null;
              const isCorrect = placedCreature ? placedCreature.suitableClimates.includes(climate.id) : null;
              
              return (
                <motion.button
                  key={climate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClimateClick(climate.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    placedCreature
                      ? isCorrect
                        ? 'border-green-500 bg-green-100 shadow-lg'
                        : 'border-red-500 bg-red-100 shadow-lg animate-pulse'
                      : selectedCreature
                      ? 'border-blue-400 bg-blue-50 hover:border-blue-500 hover:shadow-lg'
                      : 'border-gray-300 bg-white hover:border-yellow-400 hover:shadow-lg'
                  }`}
                >
                  <div className="text-5xl mb-2">{climate.icon}</div>
                  <div className="font-bold text-gray-800 mb-1">{climate.label}</div>
                  <div className="text-xs text-gray-600 mb-3">{climate.description}</div>
                  
                  {placedCreature && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring" }}
                      className="mt-2"
                    >
                      <div className="text-4xl mb-1">{placedCreature.icon}</div>
                      <div className="text-xs font-bold">{placedCreature.label}</div>
                      {!isCorrect && (
                        <motion.div
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="text-2xl mt-1"
                        >
                          😢
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Errors */}
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border-2 border-red-500 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="font-bold text-red-800">يجب تصحيح الأخطاء:</span>
          </div>
          <ul className="list-disc list-inside text-red-700">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </motion.div>
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
          <span>{round + 1} / {totalRounds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / totalRounds) * 100}%` }}
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

