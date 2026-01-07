'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Zap, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface WhereDidEnergyGoGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface EnergyLevel {
  stage: string;
  label: string;
  icon: string;
  energy: number;
  explanation: string;
}

export default function WhereDidEnergyGoGame({ game, onComplete }: WhereDidEnergyGoGameProps) {
  const [currentChain, setCurrentChain] = useState<EnergyLevel[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const chains: EnergyLevel[][] = data.chains || [
    [
      { stage: 'producer', label: 'نبات', icon: '🌿', energy: 100, explanation: 'يستقبل 100% من الطاقة الشمسية' },
      { stage: 'consumer1', label: 'أرنب', icon: '🐰', energy: 10, explanation: 'يحصل على 10% فقط (90% ضائعة)' },
      { stage: 'consumer2', label: 'ثعلب', icon: '🦊', energy: 1, explanation: 'يحصل على 1% فقط (99% ضائعة)' },
    ],
    [
      { stage: 'producer', label: 'طحالب', icon: '🌊', energy: 100, explanation: 'يستقبل 100% من الطاقة الشمسية' },
      { stage: 'consumer1', label: 'سمكة صغيرة', icon: '🐟', energy: 10, explanation: 'يحصل على 10% فقط (90% ضائعة)' },
      { stage: 'consumer2', label: 'قرش', icon: '🦈', energy: 1, explanation: 'يحصل على 1% فقط (99% ضائعة)' },
    ],
  ];

  const answers = [
    { id: 'heat', label: 'تتحول إلى حرارة', icon: '🔥', correct: true },
    { id: 'return', label: 'تعود إلى المنتج', icon: '↩️', correct: false },
    { id: 'store', label: 'تُخزن في الحيوان', icon: '📦', correct: false },
    { id: 'disappear', label: 'تختفي تماماً', icon: '💨', correct: false },
  ];

  useEffect(() => {
    if (round < chains.length) {
      setCurrentChain(chains[round]);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 45);
    }
  }, [round, chains.length, game.points, onComplete]);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    const answer = answers.find(a => a.id === answerId);
    if (!answer) return;

    if (answer.correct) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'ممتاز! الطاقة تتحول إلى حرارة ولا تعود! ✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < chains.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 45);
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: '❌ خطأ! فكر في مصير الطاقة الضائعة 💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
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
            أنت خبير تدفق الطاقة! لقد فهمت كيف تضيع الطاقة!
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
      <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-yellow-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">السلسلة {round + 1} / {chains.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Flow */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">تدفق الطاقة في السلسلة الغذائية</h3>
          
          <div className="space-y-6">
            {currentChain.map((level, index) => (
              <motion.div
                key={level.stage}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center gap-6"
              >
                {/* Element */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-2">{level.icon}</div>
                  <div className="font-bold text-gray-800 text-lg">{level.label}</div>
                </div>

                <ArrowRight className="w-8 h-8 text-gray-400" />

                {/* Energy */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    <span className="text-3xl font-bold text-yellow-600">{level.energy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                    <motion.div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${level.energy}%` }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{level.explanation}</p>
                </div>

                {/* Energy Loss */}
                {index < currentChain.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.3 + 0.5 }}
                    className="text-center"
                  >
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-sm font-bold text-red-600">
                      -{currentChain[index].energy - currentChain[index + 1].energy * 10}%
                    </div>
                    <div className="text-xs text-gray-600">ضائعة</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            أين ضاعت الطاقة؟ لماذا لا تعود؟
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {answers.map((answer, index) => {
              const isSelected = selectedAnswer === answer.id;
              return (
                <motion.button
                  key={answer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswerSelect(answer.id)}
                  disabled={selectedAnswer !== null}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isSelected
                      ? answer.correct
                        ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                        : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                      : selectedAnswer !== null
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-4xl mb-3">{answer.icon}</div>
                  <div className="font-bold text-gray-800 text-lg">{answer.label}</div>
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
                <XCircle className="w-6 h-6" />
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
          <span>{round + 1} / {chains.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / chains.length) * 100}%` }}
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

