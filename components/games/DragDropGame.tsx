'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, CheckCircle, RefreshCcw, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { gamesAPI } from '@/lib/api';
import EcoHero from '../cartoons/EcoHero';

// --- Interfaces ---

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface DragDropGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface RaceItem {
  id: string;
  label: string;
  emoji: string;
  correctTargetId: string; // The ID of the target (food) this animal eats
}

interface Target {
  id: string;
  label: string;
  emoji: string;
}

interface Lane {
  id: string;
  label: string;
  racer: RaceItem;
}

// --- Component ---

export default function DragDropGame({ game, onComplete }: DragDropGameProps) {
  const { user, updateUser } = useAuth();

  // Game State
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [completedLanes, setCompletedLanes] = useState<string[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Extract Data
  const data = game.gameData || {};
  const lanes: Lane[] = data.lanes || [];
  const targets: Target[] = data.targets || [];

  const handleStart = () => {
    setStarted(true);
    setFeedback({ type: 'info', message: 'اختر الغذاء الصحيح لكل حيوان ليتقدم في السباق! 🏁' });
  };

  const handleSelectTarget = (targetId: string) => {
    setSelectedTarget(targetId);
    setFeedback(null);
  };

  const handleLaneClick = (laneId: string) => {
    if (!started || completedLanes.includes(laneId)) return;

    if (!selectedTarget) {
      setFeedback({ type: 'error', message: '⚠️ اختر غذاءً من القائمة أولاً!' });
      return;
    }

    const lane = lanes.find(l => l.id === laneId);
    if (!lane) return;

    // Strict Validation Logic
    if (lane.racer.correctTargetId === selectedTarget) {
      // ✅ Correct
      handleCorrectMove(laneId);
    } else {
      // ❌ Incorrect
      handleIncorrectMove();
    }

    setSelectedTarget(null); // Reset selection
  };

  const handleCorrectMove = (laneId: string) => {
    setCompletedLanes(prev => [...prev, laneId]);
    setFeedback({ type: 'success', message: 'أحسنت! اختيار صحيح 🌟' });

    // Check for game completion
    if (completedLanes.length + 1 === lanes.length) {
      setTimeout(() => handleGameCompletion(), 1500);
    }
  };

  const handleIncorrectMove = () => {
    setAttempts(prev => prev + 1);
    setFeedback({ type: 'error', message: '❌ خطأ! هذا ليس الغذاء المناسب.' });
  };

  const handleGameCompletion = () => {
    setCompleted(true);
    // Strict scoring: Full points only if accurate.
    // For kids, we give fewer points if many wrong attempts, but never 0 if they finish.
    const maxPoints = game.points || 100;
    const penalty = Math.min(attempts * 5, maxPoints / 2);
    const finalScore = Math.max(maxPoints - penalty, 10);

    setScore(finalScore);
    if (onComplete) onComplete(finalScore);

    // Submit score if standalone
    if (!onComplete) {
      gamesAPI.submitScore(game._id, { score: finalScore, maxScore: maxPoints, answers: [] })
        .catch(console.error);
    }
  };

  const handleRestart = () => {
    setCompleted(false);
    setScore(0);
    setCompletedLanes([]);
    setFeedback(null);
    setStarted(false);
    setAttempts(0);
  };

  // --- Render ---

  if (completed) {
    return (
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-3xl overflow-hidden p-8" dir="rtl">
        <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-yellow-400 rounded-3xl p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <Trophy className="w-32 h-32 text-yellow-500 mx-auto drop-shadow-lg" />
          </motion.div>

          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
            {data.rewardBadgeName || 'سفير السلسلة الغذائية 🏁🌿'}
          </h2>

          <p className="text-xl text-gray-700 font-medium">
            أكملت السباق ببراعة! لقد حافظت على التوازن البيئي.
          </p>

          <div className="bg-green-100 px-8 py-4 rounded-2xl border-2 border-green-300 inline-block">
            <span className="text-3xl font-bold text-green-700">+{score} نقطة</span>
          </div>

          <Button
            onClick={handleRestart}
            className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xl font-bold py-6 px-12 rounded-full shadow-xl"
          >
            <RefreshCcw className="mr-2 w-6 h-6" /> العب مجدداً
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 select-none" dir="rtl">

      {/* Header & Feedback */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md border-2 border-blue-100">
        <div className="flex items-center gap-3">
          <EcoHero size="small" emotion="happy" animation="bounce" />
          <div>
            <h3 className="text-xl font-bold text-blue-800">{game.title}</h3>
            <p className="text-sm text-gray-500">اختر الغذاء الصحيح لتتقدم في السباق</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`px-6 py-2 rounded-xl text-lg font-bold shadow-sm ${feedback.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' :
                  feedback.type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' :
                    'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
            >
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Race Track Area */}
      <Card className="border-4 border-slate-300 bg-slate-50 overflow-hidden shadow-inner relative min-h-[400px]">
        {/* Finish Line */}
        <div className="absolute left-10 top-0 bottom-0 w-16 bg-[url('https://www.transparenttextures.com/patterns/checkered-pattern.png')] opacity-20 z-0 border-l-4 border-dashed border-slate-400 flex flex-col justify-center items-center">
        </div>

        <CardContent className="p-6 space-y-6 relative z-10">
          {!started ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStart}
                className="bg-green-500 text-white rounded-full p-8 shadow-2xl border-4 border-white flex flex-col items-center"
              >
                <Play className="w-12 h-12 mb-2 fill-current" />
                <span className="text-xl font-bold">ابدأ السباق</span>
              </motion.button>
            </div>
          ) : null}

          {/* Lanes */}
          {lanes.map((lane) => (
            <div key={lane.id} className="relative h-24 bg-white rounded-2xl border-2 border-slate-200 shadow-sm flex items-center px-4 overflow-hidden">
              {/* Lane Label */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-slate-100 flex items-center justify-center border-l-2 border-slate-200 z-10 shadow-sm">
                <span className="font-bold text-slate-600 text-sm md:text-base">{lane.label}</span>
              </div>

              {/* Racer */}
              <motion.div
                className="absolute z-20 cursor-pointer flex flex-col items-center"
                initial={{ right: '140px' }}
                animate={{
                  // Move to finish (approx 85% of container) or stay start
                  right: completedLanes.includes(lane.id) ? '85%' : '140px',
                  scale: completedLanes.includes(lane.id) ? 1.2 : 1
                }}
                transition={{ type: "spring", stiffness: 40, damping: 10 }}
                onClick={() => handleLaneClick(lane.id)}
              >
                <span className="text-5xl drop-shadow-md">{lane.racer.emoji}</span>
                <span className="bg-white/80 px-2 rounded-full text-xs font-bold mt-1 shadow-sm whitespace-nowrap">{lane.racer.label}</span>
              </motion.div>

              {/* Status Indicator (Checkmark) */}
              {completedLanes.includes(lane.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-500 text-white rounded-full p-2 z-30"
                >
                  <CheckCircle className="w-6 h-6" />
                </motion.div>
              )}

              {/* Click Hint Layer */}
              {selectedTarget && !completedLanes.includes(lane.id) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-40 bg-blue-500/10 border-2 border-blue-400 border-dashed rounded-xl cursor-pointer flex items-center justify-center group"
                  onClick={() => handleLaneClick(lane.id)}
                >
                  <span className="bg-white px-4 py-2 rounded-full text-blue-600 font-bold shadow-md group-hover:scale-110 transition-transform">
                    اضغط لإطعام {lane.racer.label} 🍽️
                  </span>
                </motion.div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Target Selection Area (Food) */}
      <div className="bg-orange-50 p-6 rounded-3xl shadow-inner border-2 border-orange-100">
        <h4 className="text-xl font-bold text-center text-orange-800 mb-4"> اختر الغذاء ثم اضغط على الحيوان المناسب:</h4>
        <div className="flex flex-wrap justify-center gap-4">
          {targets.map((target) => (
            <motion.button
              key={target.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectTarget(target.id)}
              className={`flex flex-col items-center justify-center p-4 min-w-[100px] h-28 rounded-2xl border-4 transition-all shadow-sm ${selectedTarget === target.id
                  ? 'border-blue-500 bg-white ring-4 ring-blue-200 shadow-xl'
                  : 'border-orange-200 bg-white hover:border-orange-300'
                }`}
            >
              <span className="text-4xl mb-2">{target.emoji}</span>
              <span className={`text-sm font-bold ${selectedTarget === target.id ? 'text-blue-700' : 'text-gray-600'}`}>
                {target.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

    </div>
  );
}
