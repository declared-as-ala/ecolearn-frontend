'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, RefreshCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { gamesAPI } from '@/lib/api';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface RunnerGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface GameStage {
  id: string;
  title: string;
  instruction: string;
  background: string; // Tailwind class
  playerIcon: string;
  hazards: string[];
  collectables: string[];
  direction: 'horizontal' | 'vertical-up' | 'vertical-down';
}

export default function RunnerGame({ game, onComplete }: RunnerGameProps) {
  const data = game.gameData || {};
  const stages: GameStage[] = data.stages || [
    // Default: Water Cycle (as fallback)
    {
      id: 'default',
      title: 'المرحلة 1',
      instruction: 'اجمع النقاط وتجنب الخطر',
      background: 'bg-blue-100',
      playerIcon: '🏃',
      hazards: ['⚠️'],
      collectables: ['🌟'],
      direction: 'horizontal'
    }
  ];

  const rewardTitle = data.rewardBadgeName || 'البطل السريع';

  // State
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(50);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<{ id: number, type: 'hazard' | 'collect', icon: string, x: number, y: number }[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success', message: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentStage = stages[currentStageIdx];
  const spawnRate = 1200;
  const speed = 2;

  // Game Loop
  useEffect(() => {
    if (!isPlaying || feedback || completed) return;
    const loop = setInterval(() => {
      setItems(prev => {
        const moved = prev.map(item => ({
          ...item,
          x: currentStage.direction === 'horizontal' ? item.x - speed : item.x,
          y: currentStage.direction === 'vertical-up' ? item.y + speed :
            currentStage.direction === 'vertical-down' ? item.y - speed : item.y
        })).filter(item =>
          (currentStage.direction === 'horizontal' && item.x > -10) ||
          (currentStage.direction === 'vertical-up' && item.y < 110) ||
          (currentStage.direction === 'vertical-down' && item.y > -10)
        );

        // Simple Collision
        let pRect = { x: 0, y: 0, w: 10, h: 10 };
        if (currentStage.direction === 'horizontal') { pRect.x = 10; pRect.y = position; }
        else if (currentStage.direction === 'vertical-up') { pRect.x = position; pRect.y = 80; }
        else { pRect.x = position; pRect.y = 20; }

        for (const item of moved) {
          const iRect = { x: item.x, y: item.y, w: 8, h: 8 };
          const collision = pRect.x < iRect.x + iRect.w && pRect.x + pRect.w > iRect.x && pRect.y < iRect.y + iRect.h && pRect.y + pRect.h > iRect.y;
          if (collision) {
            handleCollision(item);
            return prev.filter(i => i.id !== item.id);
          }
        }
        return moved;
      });
    }, 50);
    return () => clearInterval(loop);
  }, [isPlaying, position, currentStage, feedback, completed]);

  // Spawner
  useEffect(() => {
    if (!isPlaying || feedback || completed) return;
    const spawner = setInterval(() => {
      const isHazard = Math.random() > 0.6;
      const pool = isHazard ? currentStage.hazards : currentStage.collectables;
      const icon = pool[Math.floor(Math.random() * pool.length)];

      let newItem: { id: number; type: 'hazard' | 'collect'; icon: string; x: number; y: number } = { id: Date.now(), type: isHazard ? 'hazard' : 'collect', icon, x: 0, y: 0 };

      if (currentStage.direction === 'horizontal') { newItem.x = 110; newItem.y = Math.random() * 80 + 10; }
      else if (currentStage.direction === 'vertical-up') { newItem.x = Math.random() * 80 + 10; newItem.y = -10; }
      else { newItem.x = Math.random() * 80 + 10; newItem.y = 110; }

      setItems(prev => [...prev, newItem]);
    }, spawnRate);
    return () => clearInterval(spawner);
  }, [isPlaying, currentStage, feedback, completed]);

  // Timer/Success
  useEffect(() => {
    if (!isPlaying || feedback || completed) return;
    const timer = setTimeout(() => {
      nextStage();
    }, 15000); // 15s per stage
    return () => clearTimeout(timer);
  }, [isPlaying, feedback, completed, currentStageIdx]);

  const handleCollision = (item: { type: 'hazard' | 'collect', icon: string }) => {
    if (item.type === 'hazard') {
      setIsPlaying(false);
      setFeedback({ type: 'error', message: `تجنب هذا! ${item.icon}` });
      setTimeout(() => {
        setItems([]); setFeedback(null); setIsPlaying(true);
      }, 2000);
    } else {
      setScore(s => s + 5);
    }
  };

  const nextStage = () => {
    setIsPlaying(false);
    if (currentStageIdx + 1 < stages.length) {
      setFeedback({ type: 'success', message: 'مرحلة مكتملة! التالي... 👏' });
      setTimeout(() => {
        setCurrentStageIdx(p => p + 1); setItems([]); setFeedback(null);
      }, 2000);
    } else {
      handleGameCompletion();
    }
  };

  const handleGameCompletion = () => {
    setCompleted(true);
    const maxPoints = game.points || 100;
    if (onComplete) onComplete(maxPoints);
    gamesAPI.submitScore(game._id, { score: maxPoints, maxScore: maxPoints, answers: [] }).catch(console.error);
  };

  const handleRestart = () => {
    setCompleted(false); setCurrentStageIdx(0); setScore(0); setItems([]); setFeedback(null); setIsPlaying(false);
  };

  const handleMove = (val: number) => setPosition(val);

  if (completed) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">{rewardTitle} 🔥</h2>
        <p className="text-xl text-gray-700">لقد تجاوزت كل العقبات وأكملت المهمة!</p>
        <div className="bg-white px-8 py-4 rounded-2xl border-2 border-yellow-200 inline-block mt-4">
          <span className="text-3xl font-bold text-yellow-700">+{game.points} نقطة</span>
        </div>
        <div>
          <Button onClick={handleRestart} className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full px-8 py-4 text-xl">
            <RefreshCcw className="ml-2" /> العب مجدداً
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 select-none" dir="rtl">
      <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-gray-100 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="text-2xl">{currentStage.playerIcon}</span>
          <div>
            <h3 className="font-bold text-gray-900">{currentStage.title}</h3>
            <p className="text-sm text-gray-500">{currentStage.instruction}</p>
          </div>
        </div>
        <div className="text-xl font-bold text-green-600">النقاط: {score}</div>
      </div>

      <div
        className={`relative w-full h-[400px] ${currentStage.background} rounded-3xl overflow-hidden border-4 border-white shadow-inner cursor-crosshair touch-none`}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          if (currentStage.direction === 'horizontal') {
            handleMove(Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100)));
          } else {
            handleMove(Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100)));
          }
        }}
        onTouchMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          if (currentStage.direction === 'horizontal') {
            handleMove(Math.max(0, Math.min(100, ((e.touches[0].clientY - rect.top) / rect.height) * 100)));
          } else {
            handleMove(Math.max(0, Math.min(100, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
          }
        }}
      >
        {!isPlaying && !feedback && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-white text-blue-600 rounded-full w-24 h-24 flex items-center justify-center font-bold text-xl shadow-xl"
              onClick={() => setIsPlaying(true)}
            >
              ابدأ
            </motion.button>
          </div>
        )}
        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-50 bg-black/60 text-white font-bold text-2xl p-8 text-center">
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="absolute text-5xl z-20" animate={{
          left: currentStage.direction === 'horizontal' ? '10%' : `${position}%`,
          top: currentStage.direction === 'horizontal' ? `${position}%` : (currentStage.direction === 'vertical-up' ? '80%' : '20%'),
        }}>
          {currentStage.playerIcon}
        </motion.div>

        {items.map(item => (
          <div key={item.id} className="absolute text-4xl" style={{ left: `${item.x}%`, top: `${item.y}%` }}>{item.icon}</div>
        ))}
      </div>
    </div>
  );
}
