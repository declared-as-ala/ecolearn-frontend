'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, RefreshCcw, Sparkles, XCircle, ArrowRight } from 'lucide-react';
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

interface StepItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  feedbackSuccess?: string;
  feedbackError?: string;
}

interface SequenceGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

export default function WaterLabGame({ game, onComplete }: SequenceGameProps) {
  // Config defaults to Water Lab if data missing
  const data = game.gameData || {};
  const steps: StepItem[] = data.steps || [
    { id: 'sedimentation', label: '1. الترسيب', icon: '⚗️', color: 'bg-amber-100 text-amber-800', description: 'إزالة المواد الصلبة الكبيرة', feedbackSuccess: 'رائع! تمت إزالة الرواسب.' },
    { id: 'filtration', label: '2. الترشيح', icon: '🔬', color: 'bg-blue-100 text-blue-800', description: 'تصفية الشوائب الدقيقة', feedbackSuccess: 'جميل! الماء أصبح أصفى.' },
    { id: 'sterilization', label: '3. التعقيم', icon: '✨', color: 'bg-purple-100 text-purple-800', description: 'قتل الجراثيم والبكتيريا', feedbackSuccess: 'ممتاز! ماء نقي تماماً.' }
  ];

  const rewardTitle = data.rewardBadgeName || 'خبير التسلسل';
  const environmentType = data.environment || 'lab'; // 'lab', 'forest', 'desert'

  // State
  const [currentState, setCurrentState] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success', message: string } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Handlers
  const handleStepClick = (stepId: string) => {
    setFeedback(null);
    const expectedId = steps[currentState]?.id;
    if (!expectedId) return;

    if (stepId === expectedId) {
      // Correct
      const step = steps[currentState];
      setCurrentState(prev => {
        const next = prev + 1;
        if (next === steps.length) {
          setFeedback({ type: 'success', message: 'عمل متقن! التسلسل مكتمل وصحيح 🌟' });
          setTimeout(() => handleGameCompletion(), 2000);
        } else {
          setFeedback({ type: 'success', message: step.feedbackSuccess || 'خطوة صحيحة! أحسنت 👍' });
        }
        return next;
      });
    } else {
      // Incorrect
      const step = steps.find(s => s.id === stepId);
      setFeedback({ type: 'error', message: step?.feedbackError || 'ترتيب خاطئ! حاول مجدداً بالتسلسل المنطقي 🤔' });
    }
  };

  const handleGameCompletion = () => {
    setCompleted(true);
    const points = game.points || 100;
    setScore(points);
    if (onComplete) onComplete(points);
    gamesAPI.submitScore(game._id, { score: points, maxScore: points, answers: [] }).catch(console.error);
  };

  const handleRestart = () => {
    setCompleted(false);
    setCurrentState(0);
    setFeedback(null);
    setScore(0);
  };

  // Helper for background style
  const getBackground = () => {
    if (environmentType === 'forest') return 'bg-green-100';
    if (environmentType === 'river') return 'bg-cyan-50';
    return 'bg-gray-50'; // Lab
  };

  if (completed) {
    return (
      <div className={`relative w-full min-h-[500px] flex items-center justify-center rounded-3xl p-8 ${getBackground()}`} dir="rtl">
        <Card className="w-full max-w-2xl bg-white shadow-xl border-4 border-green-400 rounded-3xl p-8 text-center space-y-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Trophy className="w-32 h-32 text-green-500 mx-auto" />
          </motion.div>
          <h2 className="text-4xl font-extrabold text-green-800">{rewardTitle} 🎉</h2>
          <p className="text-xl text-gray-700">لقد أكملت التسلسل بنجاح واستعاد النظام توازنه!</p>
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
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border-2 border-gray-100">
        <div className="flex gap-2 items-center">
          <EcoHero size="small" emotion="happy" />
          <div>
            <h3 className="font-bold text-gray-900">{game.title}</h3>
            <p className="text-sm text-gray-500">رتب العناصر بالتسلسل الصحيح</p>
          </div>
        </div>
        <div className="font-bold text-lg text-blue-600">
          الخطوة: {currentState + 1} / {steps.length}
        </div>
      </div>

      {/* Main Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Display Area (Visual Progress) */}
        <div className={`relative h-[400px] ${getBackground()} rounded-3xl border-4 border-gray-300 overflow-hidden shadow-inner flex flex-col items-center justify-center p-6`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-center"
            >
              <div className="text-9xl mb-4 drop-shadow-xl">
                {currentState < steps.length ? (steps[currentState].icon === '⚗️' ? '🧪' : steps[currentState].icon) : '✅'}
              </div>
              <p className="text-2xl font-bold text-gray-700">
                {currentState < steps.length ? 'ما هي الخطوة التالية؟' : 'اكتملت العملية!'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress chain */}
          <div className="absolute bottom-6 flex gap-2">
            {steps.map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${i < currentState ? 'bg-green-500' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>

        {/* Steps Selection */}
        <div className="space-y-4">
          <h4 className="text-center font-bold text-gray-700 text-lg mb-4">العناصر المتاحة 📋</h4>
          {steps.map((step) => {
            const isCompleted = steps.indexOf(step) < currentState;

            return (
              <motion.button
                key={step.id}
                disabled={isCompleted}
                whileHover={!isCompleted ? { scale: 1.02, x: -5 } : {}}
                whileTap={!isCompleted ? { scale: 0.98 } : {}}
                onClick={() => handleStepClick(step.id)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 border-2 transition-all text-right
                                ${isCompleted ? 'bg-green-50 border-green-200 opacity-60' :
                    step.color + ' border-transparent shadow-sm hover:shadow-md'}
                            `}
              >
                <div className="text-3xl bg-white/50 p-2 rounded-xl">{step.icon}</div>
                <div>
                  <h5 className="font-bold text-lg">{step.label} {isCompleted && '✅'}</h5>
                  <p className="text-sm opacity-90">{step.description}</p>
                </div>
              </motion.button>
            );
          })}

          {/* Feedback Box */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-xl border-l-4 font-bold ${feedback.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'
                  }`}
              >
                {feedback.type === 'error' ? <XCircle className="inline ml-2" /> : <Sparkles className="inline ml-2" />}
                {feedback.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
