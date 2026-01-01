'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, RefreshCcw, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { gamesAPI } from '@/lib/api';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface SimulationGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

interface GameScenario {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or generic
  correctAction: string;
}

interface GameAction {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export default function SimulationGame({ game, onComplete }: SimulationGameProps) {
  // Config
  const data = game.gameData || {};
  const scenarios: GameScenario[] = data.scenarios || [
    { id: 'heat', title: 'حرارة شديدة! ☀️', description: 'الشمس حارقة اليوم.. النباتات تذبل!', icon: '☀️', correctAction: 'shade' },
    { id: 'wind', title: 'رياح عاصفة! 🌬️', description: 'الرياح تقتلع التربة وتكسر الأغصان!', icon: '🌬️', correctAction: 'windbreak' },
    { id: 'drought', title: 'جفاف ونقص ماء! 🍂', description: 'لم تمطر منذ فترة.. الأرض جافة!', icon: '🚱', correctAction: 'irrigate' }
  ];
  const actions: GameAction[] = data.actions || [
    { id: 'shade', label: 'تظليل الحديقة', icon: '☂️', color: 'bg-orange-100 text-orange-800' },
    { id: 'irrigate', label: 'سقي (ري)', icon: '💧', color: 'bg-blue-100 text-blue-800' },
    { id: 'windbreak', label: 'مصدّات رياح', icon: '🛡️', color: 'bg-gray-100 text-gray-800' },
  ];
  const rewardTitle = data.rewardBadgeName || 'حامي البيئة';

  // State
  const [currentScenario, setCurrentScenario] = useState<GameScenario | null>(null);
  const [status, setStatus] = useState<'normal' | 'happy' | 'bad'>('normal');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  // Start round
  useEffect(() => {
    if (!currentScenario && !completed) {
      startNewRound();
    }
  }, [completed, currentScenario]); // Added currentScenario dependency to trigger round updates properly? No, careful with loops.

  const startNewRound = () => {
    // Pick next scenario sequentially or random? Let's do random if not specified, or sequential if rounds < length
    // Let's cycle through them sequentially for determinism in education
    if (round >= scenarios.length && round > 0) {
      return; // wait for completion logic
    }

    const scenarioIdx = round % scenarios.length;
    const scenario = scenarios[scenarioIdx];

    setFeedback(null);
    setStatus('normal');

    // Delay
    setTimeout(() => {
      if (!completed) setCurrentScenario(scenario);
    }, 1000);
  };

  const handleAction = (actionId: string) => {
    if (!currentScenario) return;

    if (actionId === currentScenario.correctAction) {
      // Success
      setStatus('happy');
      setFeedback({ type: 'success', message: 'قرار ممتاز! التصرف الصحيح أنقذ الموقف 🌟' });

      setTimeout(() => {
        const newScore = score + (game.points || 30) / Math.max(1, scenarios.length); // Distribute points
        setScore(prev => Math.round(prev + 10)); // Simplified scoring

        if (round >= 2) { // End after 3 rounds or All? Let's do 3 rounds max for short games
          handleGameCompletion(score + 10);
        } else {
          setRound(r => r + 1);
          setCurrentScenario(null);
        }
      }, 2000);

    } else {
      // Fail
      setStatus('bad');
      setFeedback({ type: 'error', message: 'احذر! هذا الإجراء لا يحل المشكلة الحالية 🛑' });
    }
  };

  const handleGameCompletion = (finalScore: number) => {
    setCompleted(true);
    if (onComplete) onComplete(finalScore);
    gamesAPI.submitScore(game._id, { score: finalScore, maxScore: 100, answers: [] }).catch(console.error);
  };

  const handleRestart = () => {
    setCompleted(false);
    setScore(0);
    setRound(0);
    setCurrentScenario(null);
    setFeedback(null);
  };

  if (completed) {
    return (
      <div className="relative w-full min-h-[500px] flex items-center justify-center rounded-3xl p-8 bg-gradient-to-br from-green-50 to-blue-50" dir="rtl">
        <Card className="w-full max-w-2xl bg-white shadow-2xl border-4 border-green-400 rounded-3xl p-8 text-center space-y-6">
          <Trophy className="w-32 h-32 text-green-500 mx-auto" />
          <h2 className="text-4xl font-extrabold text-green-800">{rewardTitle} 🎉</h2>
          <p className="text-xl text-gray-700">قراراتك السليمة حافظت على التوازن البيئي!</p>
          <div className="bg-yellow-100 px-6 py-3 rounded-full inline-block">
            <span className="text-2xl font-bold text-yellow-700">+{score} نقطة</span>
          </div>
          <Button onClick={handleRestart} className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-4 text-xl">
            <RefreshCcw className="ml-2" /> العب مجدداً
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 select-none" dir="rtl">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-gray-100 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <EcoHero size="small" emotion={status === 'happy' ? 'happy' : status === 'bad' ? 'worried' : 'encouraging'} />
          <div>
            <h3 className="font-bold text-gray-900">{game.title}</h3>
            <p className="text-sm text-gray-500">جولة {round + 1} / 3</p>
          </div>
        </div>
      </div>

      {/* Scene Area */}
      <div className={`relative h-[400px] bg-slate-100 rounded-3xl border-4 border-slate-200 overflow-hidden shadow-inner transition-colors duration-500 flex flex-col items-center justify-center`}>

        {/* Scenario Display */}
        <AnimatePresence mode="wait">
          {currentScenario ? (
            <motion.div
              key={currentScenario.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center z-10 p-6 bg-white/80 backdrop-blur rounded-3xl shadow-xl max-w-md mx-4"
            >
              <div className="text-8xl mb-4 animate-bounce">{currentScenario.icon}</div>
              <h2 className="text-3xl font-extrabold text-red-600 mb-2">{currentScenario.title}</h2>
              <p className="text-xl text-gray-700">{currentScenario.description}</p>
            </motion.div>
          ) : (
            <div className="text-gray-400 font-bold text-xl animate-pulse">جاري تحميل التحدي التالي...</div>
          )}
        </AnimatePresence>

        {/* Actions Toolbar */}
        <div className="absolute bottom-6 w-full px-6 flex justify-center gap-4 z-20">
          {actions.map(action => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction(action.id)}
              disabled={!!feedback || !currentScenario}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[120px] ${action.color} border-b-4 border-black/10 shadow-lg ${feedback ? 'opacity-50' : ''}`}
            >
              <div className="text-4xl">{action.icon}</div>
              <span className="font-bold text-lg">{action.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`absolute inset-0 flex items-center justify-center bg-black/60 z-50 p-8`}
            >
              <div className={`bg-white p-8 rounded-3xl shadow-2xl text-center max-w-lg border-4 ${feedback.type === 'error' ? 'border-red-400' : 'border-green-400'}`}>
                <div className="text-6xl mb-4">{feedback.type === 'error' ? '🚫' : '🥳'}</div>
                <h3 className="text-2xl font-bold mb-4">{feedback.message}</h3>
                {feedback.type === 'error' && (
                  <Button onClick={() => setFeedback(null)} variant="destructive" className="mt-2 text-lg px-8 py-6 rounded-full">
                    حاول مرة أخرى
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
