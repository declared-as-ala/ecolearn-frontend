'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Sparkles, XCircle, CheckCircle2 } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface SmartCleanupGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Tool {
  id: string;
  label: string;
  icon: string;
  correct: boolean;
  order: number;
  description: string;
  impact: number; // positive = reduces pollution, negative = increases
}

export default function SmartCleanupGame({ game, onComplete }: SmartCleanupGameProps) {
  const [availableTools, setAvailableTools] = useState<Tool[]>([]);
  const [usedTools, setUsedTools] = useState<string[]>([]);
  const [pollutionLevel, setPollutionLevel] = useState(100);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [correctSequence, setCorrectSequence] = useState<string[]>([]);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;

  useEffect(() => {
    if (round >= rounds) {
      setCompleted(true);
      onComplete?.(game.points || 50);
      return;
    }

    // Generate tools for this round
    const tools: Tool[] = data.tools || [
      {
        id: 'filter',
        label: 'فلترة الماء',
        icon: '🔍',
        correct: true,
        order: 1,
        description: 'إزالة الشوائب الكبيرة',
        impact: -20,
      },
      {
        id: 'chemical',
        label: 'معالجة كيميائية',
        icon: '⚗️',
        correct: true,
        order: 2,
        description: 'قتل البكتيريا والجراثيم',
        impact: -30,
      },
      {
        id: 'aeration',
        label: 'تهوية الماء',
        icon: '💨',
        correct: true,
        order: 3,
        description: 'إضافة الأكسجين',
        impact: -25,
      },
      {
        id: 'wrong1',
        label: 'صب مواد سامة',
        icon: '☠️',
        correct: false,
        order: 0,
        description: 'يزيد التلوث!',
        impact: +30,
      },
      {
        id: 'wrong2',
        label: 'خلط مع مياه ملوثة',
        icon: '💧',
        correct: false,
        order: 0,
        description: 'يزيد التلوث!',
        impact: +25,
      },
    ];

    // Shuffle tools
    const shuffled = [...tools].sort(() => Math.random() - 0.5);
    setAvailableTools(shuffled);
    setUsedTools([]);
    setPollutionLevel(100);
    setCorrectSequence(tools.filter(t => t.correct).sort((a, b) => a.order - b.order).map(t => t.id));
    setFeedback(null);
  }, [round, rounds, game.points, onComplete, data.tools]);

  useEffect(() => {
    if (pollutionLevel <= 0) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'ممتاز! نظفت الماء بنجاح! ✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < rounds) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 50);
        }
      }, 2000);
    } else if (pollutionLevel >= 150) {
      setFeedback({ type: 'error', message: '❌ التلوث زاد كثيراً! استخدم الأدوات الصحيحة بالترتيب! 💔' });
      setTimeout(() => {
        setFeedback(null);
        setPollutionLevel(100);
        setUsedTools([]);
      }, 2000);
    }
  }, [pollutionLevel, round, rounds, score, onComplete, game.points]);

  const handleToolUse = (toolId: string) => {
    if (usedTools.includes(toolId)) return;

    const tool = availableTools.find(t => t.id === toolId);
    if (!tool) return;

    setUsedTools([...usedTools, toolId]);
    setPollutionLevel(Math.max(0, Math.min(200, pollutionLevel + tool.impact)));

    // Check if using correct tool in correct order
    const correctIndex = correctSequence.indexOf(toolId);
    const expectedIndex = usedTools.length;

    if (tool.correct && correctIndex === expectedIndex) {
      // Correct tool in correct order
      setFeedback({ type: 'success', message: `✅ ${tool.label}: ${tool.description}` });
    } else if (tool.correct) {
      // Correct tool but wrong order
      setFeedback({ type: 'error', message: '❌ ترتيب خاطئ! استخدم الأدوات بالترتيب الصحيح! 💔' });
    } else {
      // Wrong tool
      setFeedback({ type: 'error', message: `❌ ${tool.label}: ${tool.description} 💔` });
    }

    setTimeout(() => setFeedback(null), 2000);
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
            لقد تعلمت الحلول العلمية! نظفت جميع المياه بنجاح!
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

  const pollutionColor = pollutionLevel <= 30 ? 'text-green-600' :
                         pollutionLevel <= 60 ? 'text-yellow-600' :
                         pollutionLevel <= 100 ? 'text-orange-600' : 'text-red-600';
  const pollutionBg = pollutionLevel <= 30 ? 'bg-green-500' :
                      pollutionLevel <= 60 ? 'bg-yellow-500' :
                      pollutionLevel <= 100 ? 'bg-orange-500' : 'bg-red-500';

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-teal-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">الجولة {round + 1} / {rounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pollution Level */}
      <Card className="bg-gradient-to-br from-gray-50 to-red-50 border-4 border-gray-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">مستوى التلوث</h3>
          <div className="text-center mb-6">
            <motion.div
              animate={{ scale: pollutionLevel > 100 ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: pollutionLevel > 100 ? Infinity : 0, duration: 1 }}
              className="text-8xl mb-4"
            >
              {pollutionLevel <= 30 ? '💧' : pollutionLevel <= 60 ? '🌊' : pollutionLevel <= 100 ? '⚠️' : '☠️'}
            </motion.div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">نظيف</span>
              <span className={`text-3xl font-bold ${pollutionColor}`}>
                {Math.round(pollutionLevel)}%
              </span>
              <span className="text-sm text-gray-600">ملوث</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <motion.div
                className={`h-6 rounded-full ${pollutionBg}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, pollutionLevel)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {pollutionLevel <= 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-4 p-4 bg-green-100 border-2 border-green-500 rounded-xl"
              >
                <span className="text-green-800 font-bold text-lg">✨ الماء نظيف الآن! ✨</span>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Tools */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">الأدوات المتاحة:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {availableTools.map((tool, index) => {
              const isUsed = usedTools.includes(tool.id);
              return (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!isUsed ? { scale: 1.05, y: -5 } : {}}
                  whileTap={!isUsed ? { scale: 0.95 } : {}}
                  onClick={() => handleToolUse(tool.id)}
                  disabled={isUsed}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isUsed
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : tool.correct
                      ? 'border-green-300 bg-white hover:border-green-400 hover:shadow-lg cursor-pointer'
                      : 'border-red-300 bg-white hover:border-red-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-4xl mb-2">{tool.icon}</div>
                  <div className="text-sm font-bold text-gray-800 mb-1">{tool.label}</div>
                  <div className="text-xs text-gray-600">{tool.description}</div>
                  {tool.correct && (
                    <div className="text-xs text-green-600 mt-1">✅ صحيح</div>
                  )}
                  {!tool.correct && (
                    <div className="text-xs text-red-600 mt-1">❌ خاطئ</div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Used Tools Sequence */}
      {usedTools.length > 0 && (
        <Card className="bg-gradient-to-br from-gray-50 to-yellow-50 border-4 border-yellow-200 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">الأدوات المستخدمة:</h3>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {usedTools.map((toolId, index) => {
                const tool = availableTools.find(t => t.id === toolId);
                if (!tool) return null;
                return (
                  <motion.div
                    key={toolId}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border-2 ${
                      tool.correct
                        ? 'bg-green-100 border-green-400'
                        : 'bg-red-100 border-red-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{tool.icon}</div>
                    <div className="text-xs font-bold text-gray-800">{tool.label}</div>
                  </motion.div>
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
          <span>{round + 1} / {rounds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-teal-400 to-green-500 h-4 rounded-full relative overflow-hidden"
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

