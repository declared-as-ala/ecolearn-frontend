'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface SaveEcosystemGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Problem {
  id: string;
  label: string;
  icon: string;
  description: string;
  solutions: Solution[];
}

interface Solution {
  id: string;
  label: string;
  icon: string;
  correct: boolean;
}

export default function SaveEcosystemGame({ game, onComplete }: SaveEcosystemGameProps) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [score, setScore] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [targetProblems] = useState(5);

  const data = game.gameData || {};
  const problems: Problem[] = data.problems || [
    {
      id: 'pollution',
      label: 'تلوث',
      icon: '💨',
      description: 'مياه ملوثة تهدد الكائنات المائية',
      solutions: [
        { id: 'clean', label: 'تنظيف المياه', icon: '🧹', correct: true },
        { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
        { id: 'add-chemicals', label: 'إضافة مواد كيميائية', icon: '☠️', correct: false },
      ],
    },
    {
      id: 'drought',
      label: 'جفاف',
      icon: '🏜️',
      description: 'نقص شديد في المياه',
      solutions: [
        { id: 'irrigate', label: 'ري النباتات', icon: '💧', correct: true },
        { id: 'cut-trees', label: 'قطع الأشجار', icon: '🪓', correct: false },
        { id: 'wait', label: 'انتظار المطر', icon: '⏳', correct: false },
      ],
    },
    {
      id: 'overhunting',
      label: 'صيد جائر',
      icon: '🏹',
      description: 'صيد مفرط يهدد الحيوانات',
      solutions: [
        { id: 'protect', label: 'حماية الحيوانات', icon: '🛡️', correct: true },
        { id: 'hunt-more', label: 'الصيد أكثر', icon: '🎯', correct: false },
        { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
      ],
    },
    {
      id: 'deforestation',
      label: 'قطع الأشجار',
      icon: '🪓',
      description: 'قطع مفرط للأشجار',
      solutions: [
        { id: 'replant', label: 'إعادة التشجير', icon: '🌱', correct: true },
        { id: 'cut-more', label: 'قطع المزيد', icon: '🪓', correct: false },
        { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
      ],
    },
    {
      id: 'waste',
      label: 'نفايات',
      icon: '🗑️',
      description: 'تراكم النفايات في البيئة',
      solutions: [
        { id: 'recycle', label: 'إعادة التدوير', icon: '♻️', correct: true },
        { id: 'burn', label: 'حرق النفايات', icon: '🔥', correct: false },
        { id: 'dump', label: 'رمي المزيد', icon: '🗑️', correct: false },
      ],
    },
  ];

  useEffect(() => {
    if (completed || gameOver) return;

    // Start timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [completed, gameOver]);

  useEffect(() => {
    if (completed || gameOver) return;

    // Show random problem
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    setCurrentProblem(randomProblem);
  }, [problemsSolved, problems, completed, gameOver]);

  const handleSolutionSelect = (solution: Solution) => {
    if (!currentProblem || completed || gameOver) return;

    if (solution.correct) {
      setScore(score + 10 + Math.floor(timeLeft / 3)); // Bonus for speed
      setProblemsSolved(prev => prev + 1);
      setFeedback({ type: 'success', message: 'صحيح! أنقذت النظام ✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (problemsSolved + 1 >= targetProblems) {
          setCompleted(true);
          onComplete?.(game.points || 50);
        } else {
          // Show next problem
          const randomProblem = problems[Math.floor(Math.random() * problems.length)];
          setCurrentProblem(randomProblem);
        }
      }, 1500);
    } else {
      setFeedback({ type: 'error', message: '❌ حل خاطئ! فكر بسرعة 💔' });
      setTimeout(() => {
        setFeedback(null);
        // Show next problem anyway (but no points)
        const randomProblem = problems[Math.floor(Math.random() * problems.length)];
        setCurrentProblem(randomProblem);
      }, 1500);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
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
            لقد أنقذت النظام البيئي! أنت منقذ النظام البيئي 🌍
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

  if (gameOver) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-red-400 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-4 drop-shadow-lg" />
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-red-800 mb-2"
          >
            انتهى الوقت! ⏰
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-red-700 mb-4"
          >
            لقد حللت {problemsSolved} مشكلة من {targetProblems}
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-3xl font-bold text-red-600 mb-6"
          >
            النقاط: {score} ⭐
          </motion.p>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              setTimeLeft(30);
              setScore(0);
              setProblemsSolved(0);
              setGameOver(false);
              setCompleted(false);
              const randomProblem = problems[Math.floor(Math.random() * problems.length)];
              setCurrentProblem(randomProblem);
            }}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold shadow-lg"
          >
            إعادة المحاولة
          </motion.button>
        </Card>
      </motion.div>
    );
  }

  if (!currentProblem) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className={`bg-gradient-to-r ${
        timeLeft <= 10 ? 'from-red-500 to-orange-600 animate-pulse' : 'from-orange-500 to-red-600'
      } text-white rounded-2xl shadow-lg`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-orange-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className={`text-3xl font-bold ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
                  {timeLeft}
                </span>
              </div>
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">حللت {problemsSolved} / {targetProblems}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-4"
            >
              {currentProblem.icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentProblem.label}</h3>
            <p className="text-lg text-gray-700">{currentProblem.description}</p>
          </div>

          {/* Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentProblem.solutions.map((solution, index) => (
              <motion.button
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSolutionSelect(solution)}
                className={`p-6 rounded-xl border-2 transition-all border-gray-300 bg-white hover:border-gray-400 hover:shadow-lg cursor-pointer`}
              >
                <div className="text-4xl mb-3">{solution.icon}</div>
                <div className="font-bold text-gray-800 text-lg">{solution.label}</div>
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-6 p-4 rounded-xl text-center ${
                  feedback.type === 'success'
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-red-100 border-2 border-red-500 text-red-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <AlertTriangle className="w-6 h-6" />
                  )}
                  <span className="font-bold text-lg">{feedback.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{problemsSolved} / {targetProblems}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-orange-400 to-red-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${(problemsSolved / targetProblems) * 100}%` }}
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

