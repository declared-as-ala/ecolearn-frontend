'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, CheckCircle, RefreshCcw, XCircle, Trash2, Shovel, ShieldCheck } from 'lucide-react';
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

interface RescueGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface RescueItem {
  id: string;
  type: string; // e.g., 'waste', 'plant_cut'
  label: string;
  x: number;
  y: number;
  icon: string;
  correctAction: string; // 'clean', 'plant', 'protect'
  successIcon: string; // Icon to show after fix (e.g., '🌱')
}

interface ActionTool {
  id: string; // 'clean', 'plant', 'protect'
  label: string;
  icon: React.ReactNode;
  color: string;
}

// --- Component ---

export default function RescueGame({ game, onComplete }: RescueGameProps) {
  const { user } = useAuth();

  // Game State
  const [solvedItems, setSolvedItems] = useState<string[]>([]); // IDs of solved items
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Data
  const data = game.gameData || {};
  const items: RescueItem[] = data.items || [];

  const tools: ActionTool[] = [
    { id: 'plant', label: 'زرع / علاج', icon: <Shovel className="w-6 h-6" />, color: 'bg-green-500' },
    { id: 'clean', label: 'تنظيف', icon: <Trash2 className="w-6 h-6" />, color: 'bg-blue-500' },
    { id: 'protect', label: 'حماية', icon: <ShieldCheck className="w-6 h-6" />, color: 'bg-orange-500' },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    setFeedback(null);
  };

  const handleItemClick = (item: RescueItem) => {
    if (solvedItems.includes(item.id)) return;

    if (!selectedTool) {
      setFeedback({ type: 'error', message: '⚠️ اختر أداة من الأسفل أولاً!' });
      return;
    }

    if (item.correctAction === selectedTool) {
      // ✅ Correct
      handleCorrectAction(item.id);
    } else {
      // ❌ Incorrect
      handleIncorrectAction(selectedTool, item.type);
    }
  };

  const handleCorrectAction = (itemId: string) => {
    const newSolved = [...solvedItems, itemId];
    setSolvedItems(newSolved);
    setFeedback({ type: 'success', message: 'عمل رائع! لقد حسّنت البيئة 🌿✨' });

    if (newSolved.length === items.length) {
      setTimeout(handleGameCompletion, 1500);
    }
  };

  const handleIncorrectAction = (toolId: string, itemType: string) => {
    // Provide specific educational feedback
    let msg = 'هذه الأداة لا تعمل هنا. حاول مرة أخرى!';
    if (toolId === 'clean' && itemType.includes('plant')) msg = 'لا يمكننا تنظيف النباتات! نحن نحتاج لعلاجها أو زراعتها 🌱';
    if (toolId === 'plant' && itemType.includes('waste')) msg = 'لا تزرع فوق النفايات! نظفها أولاً 🧹';

    setFeedback({ type: 'error', message: msg });
  };

  const handleGameCompletion = () => {
    setCompleted(true);
    const maxPoints = game.points || 100;
    setScore(maxPoints);
    if (onComplete) onComplete(maxPoints);

    if (!onComplete) {
      gamesAPI.submitScore(game._id, { score: maxPoints, maxScore: maxPoints, answers: [] })
        .catch(console.error);
    }
  };

  const handleRestart = () => {
    setSolvedItems([]);
    setCompleted(false);
    setScore(0);
    setFeedback(null);
    setSelectedTool(null);
  };

  if (completed) {
    return (
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl overflow-hidden p-8" dir="rtl">
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur shadow-xl border-4 border-green-400 rounded-3xl p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <CheckCircle className="w-32 h-32 text-green-500 mx-auto drop-shadow-lg" />
          </motion.div>

          <h2 className="text-4xl font-extrabold text-green-800">
            {data.rewardBadgeName || 'بطل إنقاذ الطبيعة 💧🌸'}
          </h2>

          <p className="text-xl text-gray-700 font-medium">
            ممتاز! الطبيعة سعيدة الآن بفضل مساعدتك.
          </p>

          <div className="bg-yellow-100 px-8 py-4 rounded-2xl border-2 border-yellow-300 inline-block">
            <span className="text-3xl font-bold text-yellow-700">+{score} نقطة</span>
          </div>

          <Button
            onClick={handleRestart}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-6 px-12 rounded-full shadow-lg"
          >
            <RefreshCcw className="mr-2 w-6 h-6" /> العب مجدداً
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none" dir="rtl">

      {/* Header */}
      <Card className="bg-white border-none shadow-md rounded-2xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <EcoHero size="small" emotion="encouraging" animation="pulse" />
          <div>
            <h3 className="font-bold text-lg text-gray-800">{game.title}</h3>
            <p className="text-sm text-gray-500">اختر الأداة المناسبة لحل المشكلة البيئية</p>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-sm text-gray-400">التقدم</span>
          <span className="text-xl font-bold text-green-600">{solvedItems.length} / {items.length}</span>
        </div>
      </Card>

      {/* Main Scene (Problem Area) */}
      <div className="relative w-full h-[500px] bg-[#dffedd] rounded-3xl overflow-hidden border-4 border-green-200 shadow-inner group cursor-crosshair">
        {/* Background Elements (Decorative) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/nature.png')] opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#8bc34a]"></div> {/* Grass */}
        <div className="absolute top-10 left-10 text-6xl opacity-50">☁️</div>
        <div className="absolute top-20 right-20 text-5xl opacity-50">☁️</div>

        {/* Items */}
        {items.map((item) => {
          const isSolved = solvedItems.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: isSolved ? 1 : 1.1 }}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => handleItemClick(item)}
            >
              <AnimatePresence mode="wait">
                {isSolved ? (
                  <motion.div
                    key="solved"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    className="text-6xl drop-shadow-md"
                  >
                    {item.successIcon || '✨'}
                  </motion.div>
                ) : (
                  <motion.div
                    key="unsolved"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-6xl drop-shadow-xl filter grayscale-[20%]"
                  >
                    {item.icon}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSolved && (
                <span className="bg-white/80 px-2 rounded-full text-xs font-bold mt-2 shadow-sm whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </motion.div>
          );
        })}

        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl shadow-2xl text-xl font-bold z-50 flex items-center gap-2 ${feedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
            >
              {feedback.type === 'success' ? <CheckCircle /> : <XCircle />}
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toolbar (Tools) */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToolSelect(tool.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-b-4 transition-all ${selectedTool === tool.id
                  ? `${tool.color} text-white border-transparent shadow-inner transform translate-y-1`
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
            >
              <div className={`p-3 rounded-full mb-2 ${selectedTool === tool.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                {tool.icon}
              </div>
              <span className="font-bold text-lg">{tool.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

    </div>
  );
}
