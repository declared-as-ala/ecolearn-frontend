'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Sparkles, Fish, Waves, AlertCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface RiverCleanupMissionGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface PollutionSource {
  id: string;
  type: 'factory' | 'trash' | 'chemical' | 'sewage';
  label: string;
  icon: string;
  position: { x: number; y: number };
  correctTool: string;
  description: string;
}

interface Tool {
  id: string;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export default function RiverCleanupMissionGame({ game, onComplete }: RiverCleanupMissionGameProps) {
  const [riverHealth, setRiverHealth] = useState(30); // 0-100
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [pollutionSources, setPollutionSources] = useState<PollutionSource[]>([]);
  const [cleanedSources, setCleanedSources] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [animalsVisible, setAnimalsVisible] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const data = game.gameData || {};
  const maxLevels = data.maxLevels || 3;
  const sourcesPerLevel = data.sourcesPerLevel || 4;

  // Tools available
  const tools: Tool[] = data.tools || [
    {
      id: 'filter',
      label: 'فلترة الماء',
      icon: '🔍',
      description: 'إزالة الشوائب الكبيرة',
      color: 'bg-blue-500',
    },
    {
      id: 'chemical',
      label: 'معالجة كيميائية',
      icon: '⚗️',
      description: 'قتل البكتيريا والجراثيم',
      color: 'bg-purple-500',
    },
    {
      id: 'aeration',
      label: 'تهوية الماء',
      icon: '💨',
      description: 'إضافة الأكسجين',
      color: 'bg-cyan-500',
    },
    {
      id: 'plant',
      label: 'زرع نباتات مائية',
      icon: '🌿',
      description: 'تنظيف طبيعي',
      color: 'bg-green-500',
    },
  ];

  // Generate pollution sources for current level
  useEffect(() => {
    if (level > maxLevels) {
      setCompleted(true);
      onComplete?.(game.points || 60);
      return;
    }

    const sources: PollutionSource[] = [];
    const sourceTypes: Array<{ type: PollutionSource['type']; tool: string; label: string; icon: string; description: string }> = [
      { type: 'factory', tool: 'filter', label: 'مصنع يرمي نفايات', icon: '🏭', description: 'نفايات صناعية' },
      { type: 'trash', tool: 'filter', label: 'نفايات بلاستيكية', icon: '🗑️', description: 'بلاستيك في الماء' },
      { type: 'chemical', tool: 'chemical', label: 'مواد كيميائية', icon: '☠️', description: 'مواد سامة' },
      { type: 'sewage', tool: 'aeration', label: 'مياه صرف صحي', icon: '💧', description: 'بكتيريا ضارة' },
    ];

    for (let i = 0; i < sourcesPerLevel; i++) {
      const sourceType = sourceTypes[Math.floor(Math.random() * sourceTypes.length)];
      sources.push({
        id: `source-${level}-${i}`,
        type: sourceType.type,
        label: sourceType.label,
        icon: sourceType.icon,
        position: {
          x: 10 + (i * 25) + Math.random() * 5,
          y: 20 + Math.random() * 40,
        },
        correctTool: sourceType.tool,
        description: sourceType.description,
      });
    }

    setPollutionSources(sources);
    setCleanedSources([]);
    setSelectedTool(null);
    setRiverHealth(30 + (level - 1) * 10);
    setFeedback(null);
  }, [level, maxLevels, sourcesPerLevel, game.points, onComplete]);

  // Update river health based on cleaned sources
  useEffect(() => {
    if (pollutionSources.length === 0) return;

    const cleanedCount = cleanedSources.length;
    const totalCount = pollutionSources.length;
    const healthPercentage = 30 + (cleanedCount / totalCount) * 70;
    setRiverHealth(Math.min(100, healthPercentage));

    // Show animals when river is clean enough
    if (healthPercentage >= 70 && animalsVisible.length === 0) {
      const newAnimals = ['🐟', '🦆', '🐢', '🦢'];
      setAnimalsVisible(newAnimals);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    // Level complete when all sources cleaned
    if (cleanedCount === totalCount && totalCount > 0) {
      setScore(score + 20 * level);
      setTimeout(() => {
        setLevel(level + 1);
      }, 2000);
    }
  }, [cleanedSources, pollutionSources.length, level, score]);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    setFeedback(null);
  };

  const handleSourceClick = (source: PollutionSource) => {
    if (cleanedSources.includes(source.id)) return;
    if (!selectedTool) {
      setFeedback({ type: 'error', message: '⚠️ اختر أداة من الأسفل أولاً!' });
      return;
    }

    if (selectedTool === source.correctTool) {
      // ✅ Correct tool
      setCleanedSources([...cleanedSources, source.id]);
      setScore(score + 10);
      setFeedback({ 
        type: 'success', 
        message: `✅ ممتاز! نظفت ${source.label} بنجاح! ✨` 
      });
      setTimeout(() => setFeedback(null), 2000);
    } else {
      // ❌ Wrong tool
      const correctTool = tools.find(t => t.id === source.correctTool);
      setFeedback({ 
        type: 'error', 
        message: `❌ هذه الأداة غير مناسبة! استخدم ${correctTool?.label} بدلاً منها! 💔` 
      });
      setTimeout(() => setFeedback(null), 2000);
    }
    setSelectedTool(null);
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
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8">
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
            مهمة رائعة! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-green-700 mb-6"
          >
            لقد أنقذت النهر! 🏆
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex justify-center gap-4 mb-6 text-6xl"
          >
            {animalsVisible.map((animal, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
              >
                {animal}
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

  const riverColor = riverHealth >= 70 ? 'from-blue-400 to-cyan-400' :
                     riverHealth >= 40 ? 'from-blue-300 to-green-300' :
                     riverHealth >= 20 ? 'from-yellow-400 to-orange-400' :
                     'from-gray-500 to-red-500';

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{game.title}</h2>
              <p className="text-teal-100 text-lg">{game.description}</p>
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

      {/* River Scene */}
      <Card className="bg-gradient-to-br from-sky-100 to-blue-100 border-4 border-blue-300 rounded-2xl shadow-xl overflow-hidden">
        <CardContent className="p-0 relative" style={{ minHeight: '400px' }}>
          {/* Sky */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-200 to-transparent"></div>
          
          {/* River */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-r ${riverColor} transition-all duration-1000`}
            style={{ height: `${60 + (riverHealth / 100) * 20}%` }}
          >
            <Waves className="absolute bottom-0 left-0 right-0 w-full h-20 text-blue-300 opacity-30" />
          </motion.div>

          {/* Pollution Sources */}
          <div className="absolute inset-0">
            {pollutionSources.map((source) => {
              const isCleaned = cleanedSources.includes(source.id);
              return (
                <motion.button
                  key={source.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isCleaned ? 0.3 : 1, 
                    scale: isCleaned ? 0.5 : 1,
                    y: isCleaned ? -20 : 0,
                  }}
                  whileHover={!isCleaned ? { scale: 1.2, y: -5 } : {}}
                  whileTap={!isCleaned ? { scale: 0.9 } : {}}
                  onClick={() => handleSourceClick(source)}
                  disabled={isCleaned}
                  className={`absolute text-6xl transition-all ${
                    isCleaned ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:drop-shadow-2xl'
                  }`}
                  style={{
                    left: `${source.position.x}%`,
                    top: `${source.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  title={source.label}
                >
                  {source.icon}
                </motion.button>
              );
            })}
          </div>

          {/* Animals (appear when river is clean) */}
          <AnimatePresence>
            {animalsVisible.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-20 left-0 right-0 flex justify-around"
              >
                {animalsVisible.map((animal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.2, type: "spring" }}
                    className="text-5xl"
                  >
                    {animal}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Celebration Effect */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  className="text-8xl"
                >
                  ✨🎉✨
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* River Health Indicator */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Waves className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-800">صحة النهر</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className={`h-4 rounded-full ${
                    riverHealth >= 70 ? 'bg-green-500' :
                    riverHealth >= 40 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${riverHealth}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xl font-bold text-gray-800">{Math.round(riverHealth)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools Selection */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {selectedTool ? '✅ اختر مصدر التلوث لتنظيفه' : '🔧 اختر أداة التنظيف:'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool) => {
              const isSelected = selectedTool === tool.id;
              return (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToolSelect(tool.id)}
                  className={`p-6 rounded-xl border-4 transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-100 shadow-xl scale-105'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg'
                  }`}
                >
                  <div className="text-5xl mb-3">{tool.icon}</div>
                  <div className="font-bold text-gray-800 mb-1 text-lg">{tool.label}</div>
                  <div className="text-sm text-gray-600">{tool.description}</div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 text-green-600 font-bold"
                    >
                      ✓ محددة
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="bg-gradient-to-br from-gray-50 to-yellow-50 border-4 border-yellow-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-800">التقدم</span>
            <span className="text-xl font-bold text-gray-800">
              {cleanedSources.length} / {pollutionSources.length} مصدر تم تنظيفه
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-teal-400 to-green-500 h-6 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${(cleanedSources.length / Math.max(1, pollutionSources.length)) * 100}%` }}
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


