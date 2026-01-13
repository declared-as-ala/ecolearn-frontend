'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Sparkles, MapPin, Heart } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface CreaturesJourneyGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface ClimateZone {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  position: { x: number; y: number };
  bgColor: string;
}

interface Creature {
  id: string;
  label: string;
  icon: string;
  suitableClimate: string;
  position: { x: number; y: number };
  isPlaced: boolean;
  animation?: 'bounce' | 'pulse' | 'wiggle';
}

export default function CreaturesJourneyGame({ game, onComplete }: CreaturesJourneyGameProps) {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [selectedCreature, setSelectedCreature] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [correctMatches, setCorrectMatches] = useState(0);

  const data = game.gameData || {};
  const maxLevels = data.maxLevels || 3;

  // Climate zones
  const climateZones: ClimateZone[] = data.climates || [
    {
      id: 'desert',
      label: 'صحراء',
      icon: '☀️',
      color: 'yellow',
      description: 'حار وجاف',
      position: { x: 10, y: 20 },
      bgColor: 'from-yellow-100 to-orange-100',
    },
    {
      id: 'rainforest',
      label: 'غابة ممطرة',
      icon: '🌧️',
      color: 'green',
      description: 'ممطر ورطب',
      position: { x: 70, y: 20 },
      bgColor: 'from-green-100 to-emerald-100',
    },
    {
      id: 'cold',
      label: 'منطقة باردة',
      icon: '❄️',
      color: 'blue',
      description: 'بارد وثلجي',
      position: { x: 10, y: 70 },
      bgColor: 'from-blue-100 to-cyan-100',
    },
    {
      id: 'temperate',
      label: 'منطقة معتدلة',
      icon: '🌤️',
      color: 'emerald',
      description: 'معتدل ومتوازن',
      position: { x: 70, y: 70 },
      bgColor: 'from-emerald-100 to-teal-100',
    },
  ];

  // Initialize creatures for current level
  useEffect(() => {
    if (level > maxLevels) {
      setCompleted(true);
      onComplete?.(game.points || 50);
      return;
    }

    const allCreatures: Creature[] = data.creatures || [
      { id: 'camel', label: 'الجمل', icon: '🐪', suitableClimate: 'desert', position: { x: 20, y: 10 }, isPlaced: false, animation: 'bounce' },
      { id: 'cactus', label: 'الصبار', icon: '🌵', suitableClimate: 'desert', position: { x: 30, y: 10 }, isPlaced: false, animation: 'pulse' },
      { id: 'monkey', label: 'القرد', icon: '🐵', suitableClimate: 'rainforest', position: { x: 50, y: 10 }, isPlaced: false, animation: 'wiggle' },
      { id: 'frog', label: 'الضفدع', icon: '🐸', suitableClimate: 'rainforest', position: { x: 60, y: 10 }, isPlaced: false, animation: 'bounce' },
      { id: 'penguin', label: 'البطريق', icon: '🐧', suitableClimate: 'cold', position: { x: 20, y: 50 }, isPlaced: false, animation: 'wiggle' },
      { id: 'polar-bear', label: 'الدب القطبي', icon: '🐻‍❄️', suitableClimate: 'cold', position: { x: 30, y: 50 }, isPlaced: false, animation: 'pulse' },
      { id: 'deer', label: 'غزال', icon: '🦌', suitableClimate: 'temperate', position: { x: 50, y: 50 }, isPlaced: false, animation: 'bounce' },
      { id: 'oak', label: 'البلوط', icon: '🌳', suitableClimate: 'temperate', position: { x: 60, y: 50 }, isPlaced: false, animation: 'pulse' },
    ];

    // Select creatures for this level (4 creatures per level)
    const creaturesForLevel = allCreatures.slice((level - 1) * 4, level * 4);
    setCreatures(creaturesForLevel.map(c => ({ ...c, isPlaced: false })));
    setSelectedCreature(null);
    setCorrectMatches(0);
    setFeedback(null);
  }, [level, maxLevels, game.points, onComplete, data.creatures]);

  // Check if level is complete
  useEffect(() => {
    const allPlaced = creatures.every(c => c.isPlaced);
    if (allPlaced && creatures.length > 0) {
      const allCorrect = creatures.every(c => {
        const zone = climateZones.find(z => z.id === c.suitableClimate);
        return zone && Math.abs(c.position.x - zone.position.x) < 15 && Math.abs(c.position.y - zone.position.y) < 15;
      });

      if (allCorrect) {
        setScore(score + 30 * level);
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          if (level < maxLevels) {
            setLevel(level + 1);
          } else {
            setCompleted(true);
            onComplete?.(game.points || 50);
          }
        }, 2500);
      }
    }
  }, [creatures, climateZones, level, maxLevels, score, onComplete, game.points]);

  const handleCreatureSelect = (creatureId: string) => {
    const creature = creatures.find(c => c.id === creatureId);
    if (creature?.isPlaced) return;
    setSelectedCreature(creatureId);
    setFeedback(null);
  };

  const handleZoneClick = (zoneId: string) => {
    if (!selectedCreature) {
      setFeedback({ type: 'error', message: '⚠️ اختر كائناً أولاً!' });
      return;
    }

    const creature = creatures.find(c => c.id === selectedCreature);
    if (!creature) return;

    const zone = climateZones.find(z => z.id === zoneId);
    if (!zone) return;

    const isCorrect = creature.suitableClimate === zoneId;

    if (isCorrect) {
      // ✅ Correct placement
      setCreatures(prev => prev.map(c => 
        c.id === selectedCreature 
          ? { ...c, position: { x: zone.position.x, y: zone.position.y }, isPlaced: true }
          : c
      ));
      setScore(score + 10);
      setCorrectMatches(correctMatches + 1);
      setFeedback({ 
        type: 'success', 
        message: `✅ ممتاز! ${creature.label} يعيش في ${zone.label}! ✨` 
      });
      setTimeout(() => setFeedback(null), 2000);
    } else {
      // ❌ Wrong placement
      const correctZone = climateZones.find(z => z.id === creature.suitableClimate);
      setFeedback({ 
        type: 'error', 
        message: `❌ ${creature.label} لا يعيش في ${zone.label}! المكان الصحيح هو ${correctZone?.label}! 💔` 
      });
      setTimeout(() => setFeedback(null), 2500);
    }

    setSelectedCreature(null);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
        dir="rtl"
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4 drop-shadow-lg" />
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-green-800 mb-4"
          >
            رحلة رائعة! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-green-700 mb-6"
          >
            لقد ساعدت جميع الكائنات للوصول إلى مناخها المناسب! 🏆
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex justify-center gap-4 mb-6 text-6xl"
          >
            {climateZones.map((zone, idx) => (
              <motion.span
                key={zone.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
              >
                {zone.icon}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="text-3xl font-bold text-green-600 mb-6"
          >
            النقاط: {score} ⭐
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
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
      <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{game.title}</h2>
              <p className="text-purple-100 text-lg">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                <span className="text-3xl font-bold">{score}</span>
              </div>
              <div className="text-sm opacity-90">المستوى {level} / {maxLevels}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Map */}
      <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-4 border-blue-300 rounded-2xl shadow-xl overflow-hidden">
        <CardContent className="p-6 relative" style={{ minHeight: '500px' }}>
          {/* Climate Zones */}
          {climateZones.map((zone) => {
            const creaturesInZone = creatures.filter(c => 
              c.isPlaced && 
              Math.abs(c.position.x - zone.position.x) < 15 && 
              Math.abs(c.position.y - zone.position.y) < 15
            );
            
            return (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={!selectedCreature ? {} : { scale: 1.05 }}
                onClick={() => handleZoneClick(zone.id)}
                className={`absolute rounded-2xl border-4 cursor-pointer transition-all ${
                  selectedCreature 
                    ? 'border-blue-500 shadow-xl hover:shadow-2xl' 
                    : 'border-gray-300 hover:border-blue-400'
                } bg-gradient-to-br ${zone.bgColor}`}
                style={{
                  left: `${zone.position.x}%`,
                  top: `${zone.position.y}%`,
                  width: '25%',
                  height: '25%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="p-4 h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-2">{zone.icon}</div>
                  <div className="font-bold text-gray-800 text-lg mb-1">{zone.label}</div>
                  <div className="text-sm text-gray-600">{zone.description}</div>
                  {creaturesInZone.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 flex gap-1"
                    >
                      {creaturesInZone.map(c => (
                        <span key={c.id} className="text-2xl">{c.icon}</span>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Creatures (not yet placed) */}
          {creatures.filter(c => !c.isPlaced).map((creature) => {
            const isSelected = selectedCreature === creature.id;
            return (
              <motion.button
                key={creature.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: isSelected ? 1.2 : 1,
                  y: creature.animation === 'bounce' ? [0, -10, 0] : 0,
                }}
                transition={{ 
                  y: creature.animation === 'bounce' ? { repeat: Infinity, duration: 1 } : {},
                  scale: { type: "spring", stiffness: 300 }
                }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCreatureSelect(creature.id)}
                className={`absolute text-6xl transition-all cursor-pointer ${
                  isSelected ? 'drop-shadow-2xl z-10' : 'drop-shadow-lg hover:drop-shadow-xl'
                }`}
                style={{
                  left: `${creature.position.x}%`,
                  top: `${creature.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                title={creature.label}
              >
                {creature.icon}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}

          {/* Celebration Effect */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: [0, 1.5, 1], rotate: 0 }}
                  className="text-8xl"
                >
                  ✨🎉✨
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">كيف تلعب:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>انقر على كائن لاختياره (سيظهر علامة ✓)</li>
                <li>انقر على المنطقة المناخية المناسبة له</li>
                <li>إذا كان الاختيار صحيحاً، سينتقل الكائن إلى مناخه!</li>
                <li>ساعد جميع الكائنات للوصول إلى مناخها المناسب!</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="bg-gradient-to-br from-gray-50 to-yellow-50 border-4 border-yellow-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-800">التقدم</span>
            <span className="text-xl font-bold text-gray-800">
              {creatures.filter(c => c.isPlaced).length} / {creatures.length} كائن تم وضعه
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-purple-400 to-pink-500 h-6 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${(creatures.filter(c => c.isPlaced).length / Math.max(1, creatures.length)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`p-6 rounded-2xl text-center shadow-xl ${
              feedback.type === 'success'
                ? 'bg-green-100 border-4 border-green-500 text-green-800'
                : 'bg-red-100 border-4 border-red-500 text-red-800'
            }`}
          >
            <span className="font-bold text-xl">{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}





