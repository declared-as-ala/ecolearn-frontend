'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Factory, Home, Wheat, AlertCircle, CheckCircle2 } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface PollutionSourceGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface PollutionScenario {
  id: string;
  riverState: string;
  visualClues: string[];
  correctSource: 'house' | 'factory' | 'farm';
  sources: {
    house: { label: string; icon: string; description: string };
    factory: { label: string; icon: string; description: string };
    farm: { label: string; icon: string; description: string };
  };
}

export default function PollutionSourceGame({ game, onComplete }: PollutionSourceGameProps) {
  const [currentScenario, setCurrentScenario] = useState<PollutionScenario | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showClues, setShowClues] = useState(true);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [pollutionLevel, setPollutionLevel] = useState(0);

  const data = game.gameData || {};
  const scenarios: PollutionScenario[] = data.scenarios || [
    {
      id: 's1',
      riverState: 'نهر ملوث برغوة بيضاء ورائحة كيميائية',
      visualClues: [
        '🌊 ماء عكر مع رغوة بيضاء',
        '💨 رائحة كيميائية قوية',
        '🏭 دخان أسود في الأفق',
        '🐟 أسماك ميتة تطفو',
      ],
      correctSource: 'factory',
      sources: {
        house: { label: 'منزل', icon: '🏠', description: 'مياه صرف صحي من المنازل' },
        factory: { label: 'مصنع', icon: '🏭', description: 'مخلفات كيميائية من المصانع' },
        farm: { label: 'مزرعة', icon: '🚜', description: 'مبيدات وأسمدة من المزارع' },
      },
    },
    {
      id: 's2',
      riverState: 'نهر ملوث برائحة كريهة ومواد عضوية',
      visualClues: [
        '🌊 ماء عكر بني',
        '💩 رائحة كريهة',
        '🏠 منازل قريبة من النهر',
        '🧼 صابون ورغوة',
      ],
      correctSource: 'house',
      sources: {
        house: { label: 'منزل', icon: '🏠', description: 'مياه صرف صحي من المنازل' },
        factory: { label: 'مصنع', icon: '🏭', description: 'مخلفات كيميائية من المصانع' },
        farm: { label: 'مزرعة', icon: '🚜', description: 'مبيدات وأسمدة من المزارع' },
      },
    },
    {
      id: 's3',
      riverState: 'نهر ملوث بمواد خضراء وطحالب كثيفة',
      visualClues: [
        '🌊 ماء أخضر عكر',
        '🌿 طحالب كثيفة',
        '🚜 جرارات زراعية قريبة',
        '🌾 حقول قريبة',
      ],
      correctSource: 'farm',
      sources: {
        house: { label: 'منزل', icon: '🏠', description: 'مياه صرف صحي من المنازل' },
        factory: { label: 'مصنع', icon: '🏭', description: 'مخلفات كيميائية من المصانع' },
        farm: { label: 'مزرعة', icon: '🚜', description: 'مبيدات وأسمدة من المزارع' },
      },
    },
  ];

  useEffect(() => {
    if (round < scenarios.length) {
      setCurrentScenario(scenarios[round]);
      setSelectedSource(null);
      setShowClues(true);
      setPollutionLevel(0);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 40);
    }
  }, [round, scenarios.length, game.points, onComplete]);

  useEffect(() => {
    if (selectedSource && currentScenario) {
      if (selectedSource === currentScenario.correctSource) {
        setScore(score + 20);
        setFeedback({ type: 'success', message: 'ممتاز! حددت مصدر التلوث الصحيح! ✨' });
        
        setTimeout(() => {
          setFeedback(null);
          if (round + 1 < scenarios.length) {
            setRound(round + 1);
          } else {
            setCompleted(true);
            onComplete?.(game.points || 40);
          }
        }, 2000);
      } else {
        setPollutionLevel(prev => Math.min(100, prev + 20));
        setFeedback({ type: 'error', message: '❌ خطأ! التلوث يستمر... فكر مرة أخرى! 💔' });
        
        setTimeout(() => {
          setFeedback(null);
          setSelectedSource(null);
        }, 2000);
      }
    }
  }, [selectedSource, currentScenario, round, scenarios.length, score, onComplete, game.points]);

  const handleSourceSelect = (sourceId: string) => {
    if (selectedSource) return;
    setSelectedSource(sourceId);
    setShowClues(false);
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
            أنت خبير المياه النظيفة! لقد حددت جميع مصادر التلوث!
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

  if (!currentScenario) return null;

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
              <div className="text-sm opacity-80">السيناريو {round + 1} / {scenarios.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* River State */}
      <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-4 border-blue-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">حالة النهر</h3>
          
          <motion.div
            animate={{ 
              scale: pollutionLevel > 0 ? [1, 1.05, 1] : 1,
              filter: pollutionLevel > 0 ? 'hue-rotate(90deg)' : 'none'
            }}
            transition={{ repeat: pollutionLevel > 0 ? Infinity : 0, duration: 1 }}
            className="text-center mb-6"
          >
            <div className="text-8xl mb-4">🌊</div>
            <p className="text-lg font-bold text-gray-700">{currentScenario.riverState}</p>
            {pollutionLevel > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-red-100 border-2 border-red-400 rounded-xl"
              >
                <span className="text-red-800 font-bold">⚠️ مستوى التلوث: {pollutionLevel}%</span>
              </motion.div>
            )}
          </motion.div>

          {/* Visual Clues */}
          {showClues && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6"
            >
              <h4 className="font-bold text-gray-800 mb-3 text-center">🔍 أدلة بصرية:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {currentScenario.visualClues.map((clue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white p-3 rounded-lg border-2 border-yellow-200 text-center"
                  >
                    <span className="text-lg">{clue}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="bg-gradient-to-br from-gray-50 to-red-50 border-4 border-gray-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            ما هو مصدر التلوث؟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(currentScenario.sources).map(([key, source], index) => {
              const isSelected = selectedSource === key;
              const isCorrect = selectedSource === key && key === currentScenario.correctSource;
              const isWrong = selectedSource === key && key !== currentScenario.correctSource;
              
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!selectedSource ? { scale: 1.05, y: -5 } : {}}
                  whileTap={!selectedSource ? { scale: 0.95 } : {}}
                  onClick={() => handleSourceSelect(key)}
                  disabled={selectedSource !== null}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isCorrect
                      ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                      : isWrong
                      ? 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                      : selectedSource !== null
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-6xl mb-4">{source.icon}</div>
                  <div className="font-bold text-gray-800 text-xl mb-2">{source.label}</div>
                  <div className="text-sm text-gray-600">{source.description}</div>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

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
            <div className="flex items-center justify-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
              <span className="font-bold text-lg">{feedback.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {scenarios.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-cyan-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / scenarios.length) * 100}%` }}
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

