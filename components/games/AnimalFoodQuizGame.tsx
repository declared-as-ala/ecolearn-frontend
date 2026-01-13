'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import { playSuccessSound, playErrorSound, playCompletionSound } from '@/lib/sounds';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: {
    questions: Array<{
      id: string;
      animal: { label: string; icon: string };
      correctFood: { label: string; icon: string };
      wrongFoods: Array<{ label: string; icon: string }>;
    }>;
  };
}

interface AnimalFoodQuizGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

export default function AnimalFoodQuizGame({ game, onComplete }: AnimalFoodQuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const data = game.gameData || {} as { questions?: Array<{
    id: string;
    animal: { label: string; icon: string };
    correctFood: { label: string; icon: string };
    wrongFoods: Array<{ label: string; icon: string }>;
  }> };
  const questions = data.questions || [
    { id: 'q1', animal: { label: 'أرنب', icon: '🐰' }, correctFood: { label: 'جزر', icon: '🥕' }, wrongFoods: [{ label: 'سمك', icon: '🐟' }, { label: 'عسل', icon: '🍯' }] },
    { id: 'q2', animal: { label: 'قطة', icon: '🐱' }, correctFood: { label: 'سمك', icon: '🐟' }, wrongFoods: [{ label: 'جزر', icon: '🥕' }, { label: 'عشب', icon: '🌿' }] },
    { id: 'q3', animal: { label: 'بقرة', icon: '🐄' }, correctFood: { label: 'عشب', icon: '🌿' }, wrongFoods: [{ label: 'لحم', icon: '🥩' }, { label: 'عسل', icon: '🍯' }] },
    { id: 'q4', animal: { label: 'دب', icon: '🐻' }, correctFood: { label: 'عسل', icon: '🍯' }, wrongFoods: [{ label: 'جزر', icon: '🥕' }, { label: 'سمك', icon: '🐟' }] },
    { id: 'q5', animal: { label: 'طائر', icon: '🐦' }, correctFood: { label: 'حبوب', icon: '🌾' }, wrongFoods: [{ label: 'لحم', icon: '🥩' }, { label: 'أوراق', icon: '🍃' }] },
  ];

  const question = questions[currentQuestion];
  const allFoods = question ? [
    question.correctFood,
    ...question.wrongFoods
  ].sort(() => Math.random() - 0.5) : [];

  const handleFoodSelect = (foodLabel: string) => {
    if (showFeedback || !question) return;
    
    setSelectedFood(foodLabel);
    const correct = foodLabel === question.correctFood.label;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedFood(null);
        setShowFeedback(false);
      } else {
        setCompleted(true);
        playCompletionSound();
        onComplete?.(game.points || 50);
      }
    }, 2000);
  };

  // Completion screen
  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
        dir="rtl"
      >
        <Card className={`border-4 ${passed ? 'border-green-400' : 'border-yellow-400'} bg-gradient-to-br ${passed ? 'from-green-50 via-blue-50 to-cyan-50' : 'from-yellow-50 via-orange-50 to-red-50'} rounded-3xl overflow-hidden shadow-2xl text-center p-8`}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {passed ? (
              <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4 drop-shadow-lg" />
            ) : (
              <CheckCircle2 className="w-24 h-24 text-blue-500 mx-auto mb-4 drop-shadow-lg" />
            )}
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-5xl font-bold mb-4 ${passed ? 'text-green-800' : 'text-yellow-800'}`}
          >
            {passed ? 'رائع! 🎉' : 'جيد! 💪'}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl mb-6 text-gray-700"
          >
            {passed 
              ? 'أنت تعرف ما يأكله كل حيوان! 🐾✨' 
              : 'استمر في التعلم! 🐾📚'}
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="bg-white rounded-2xl p-6 mb-6 border-4 border-blue-200"
          >
            <p className="text-3xl font-bold text-blue-800 mb-2">
              النقاط: {score} / {questions.length}
            </p>
            <p className="text-xl text-gray-600">
              النسبة: {percentage}%
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <EcoHero size="large" emotion={passed ? "celebrating" : "happy"} animation="bounce" />
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  if (!question) {
    return (
      <Card className="border-4 border-blue-200 rounded-3xl p-8 text-center" dir="rtl">
        <p className="text-2xl font-bold text-gray-800">لا توجد أسئلة للعرض</p>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{game.title}</h2>
              <p className="text-orange-100 text-lg">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                <span className="text-3xl font-bold">{score}</span>
              </div>
              <div className="text-sm opacity-90">
                سؤال {currentQuestion + 1} / {questions.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Game Area */}
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-4 border-purple-300 rounded-3xl shadow-xl overflow-hidden">
        <CardContent className="p-8">
          {/* Question */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              ماذا يأكل {question.animal.label}؟
            </h3>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="text-9xl mb-6"
            >
              {question.animal.icon}
            </motion.div>
          </div>

          {/* Food Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {allFoods.map((food, index) => {
              const isSelected = selectedFood === food.label;
              const isCorrectOption = food.label === question.correctFood.label;
              const showResult = showFeedback && isSelected;

              return (
                <motion.button
                  key={food.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFoodSelect(food.label)}
                  disabled={showFeedback}
                  className={`p-6 rounded-2xl border-4 font-bold text-2xl transition-all ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-100 text-green-800'
                        : 'border-red-500 bg-red-100 text-red-800'
                      : 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-gray-800'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">{food.icon}</span>
                    <span>{food.label}</span>
                    {showResult && (
                      <span className="text-3xl">
                        {isCorrect ? '✅' : '❌'}
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className={`mt-8 p-6 rounded-2xl text-center border-4 ${
                  isCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                }`}
              >
                <p className="text-3xl font-bold mb-2">
                  {isCorrect ? '✅ صحيح!' : '❌ خطأ'}
                </p>
                <p className="text-xl">
                  {isCorrect
                    ? `ممتاز! ${question.animal.label} يأكل ${question.correctFood.label} 🎉`
                    : `${question.animal.label} لا يأكل ${selectedFood}! الجواب الصحيح هو ${question.correctFood.label} ❌`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-gray-700">التقدم</span>
              <span className="text-lg font-bold text-gray-700">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

