'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, CheckCircle2, XCircle, Heart } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface DailyEcoHeroGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Situation {
  id: string;
  title: string;
  description: string;
  icon: string;
  options: Option[];
}

interface Option {
  id: string;
  label: string;
  icon: string;
  correct: boolean;
  impact: string;
}

export default function DailyEcoHeroGame({ game, onComplete }: DailyEcoHeroGameProps) {
  const [currentSituation, setCurrentSituation] = useState<Situation | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [environmentHealth, setEnvironmentHealth] = useState(50); // 0-100
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string; impact?: string } | null>(null);

  const data = game.gameData || {};
  const situations: Situation[] = data.situations || [
    {
      id: 's1',
      title: 'في الحديقة',
      description: 'رأيت زجاجة بلاستيكية على الأرض',
      icon: '🌳',
      options: [
        {
          id: 'pick-up',
          label: 'أرفعها وأضعها في سلة المهملات',
          icon: '♻️',
          correct: true,
          impact: '✅ البيئة أصبحت أنظف! +5 نقاط صحة',
        },
        {
          id: 'ignore',
          label: 'أتركها كما هي',
          icon: '😐',
          correct: false,
          impact: '❌ التلوث يزداد! -3 نقاط صحة',
        },
        {
          id: 'throw-away',
          label: 'أرميها في النهر',
          icon: '🗑️',
          correct: false,
          impact: '❌ تلوث المياه! -5 نقاط صحة',
        },
      ],
    },
    {
      id: 's2',
      title: 'في المنزل',
      description: 'النباتات تحتاج للماء',
      icon: '🏠',
      options: [
        {
          id: 'water-plants',
          label: 'أسقي النباتات بالماء',
          icon: '💧',
          correct: true,
          impact: '✅ النباتات تنمو! +5 نقاط صحة',
        },
        {
          id: 'ignore',
          label: 'أتركها تذبل',
          icon: '🥀',
          correct: false,
          impact: '❌ النباتات تموت! -3 نقاط صحة',
        },
        {
          id: 'waste-water',
          label: 'أستخدم ماء كثير جداً',
          icon: '💦',
          correct: false,
          impact: '❌ إهدار الماء! -2 نقاط صحة',
        },
      ],
    },
    {
      id: 's3',
      title: 'بجانب النهر',
      description: 'النهر يحتوي على نفايات',
      icon: '🌊',
      options: [
        {
          id: 'clean-river',
          label: 'أشارك في تنظيف النهر',
          icon: '🧹',
          correct: true,
          impact: '✅ النهر نظيف! +7 نقاط صحة',
        },
        {
          id: 'ignore',
          label: 'أتركه كما هو',
          icon: '😐',
          correct: false,
          impact: '❌ التلوث يزداد! -4 نقاط صحة',
        },
        {
          id: 'add-waste',
          label: 'أرمي المزيد من النفايات',
          icon: '🗑️',
          correct: false,
          impact: '❌ تلوث شديد! -6 نقاط صحة',
        },
      ],
    },
    {
      id: 's4',
      title: 'في المدرسة',
      description: 'ورقة على الأرض',
      icon: '🏫',
      options: [
        {
          id: 'recycle',
          label: 'أضعها في سلة إعادة التدوير',
          icon: '♻️',
          correct: true,
          impact: '✅ إعادة التدوير! +4 نقاط صحة',
        },
        {
          id: 'throw',
          label: 'أرميها في سلة عادية',
          icon: '🗑️',
          correct: false,
          impact: '❌ فرصة ضائعة! -1 نقطة صحة',
        },
        {
          id: 'burn',
          label: 'أحرقها',
          icon: '🔥',
          correct: false,
          impact: '❌ تلوث الهواء! -5 نقاط صحة',
        },
      ],
    },
    {
      id: 's5',
      title: 'في الحديقة العامة',
      description: 'حيوان صغير يحتاج مساعدة',
      icon: '🦋',
      options: [
        {
          id: 'help',
          label: 'أساعده بحذر',
          icon: '🛡️',
          correct: true,
          impact: '✅ حماية الحيوان! +6 نقاط صحة',
        },
        {
          id: 'ignore',
          label: 'أتركه',
          icon: '😐',
          correct: false,
          impact: '❌ الحيوان في خطر! -3 نقاط صحة',
        },
        {
          id: 'harm',
          label: 'أؤذيه',
          icon: '💔',
          correct: false,
          impact: '❌ إيذاء الحيوان! -7 نقاط صحة',
        },
      ],
    },
  ];

  useEffect(() => {
    if (round < situations.length) {
      setCurrentSituation(situations[round]);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 45);
    }
  }, [round, situations.length, game.points, onComplete]);

  const handleOptionSelect = (optionId: string) => {
    if (!currentSituation) return;

    const option = currentSituation.options.find(o => o.id === optionId);
    if (!option) return;

    setSelectedOption(optionId);

    if (option.correct) {
      const healthIncrease = 5;
      setEnvironmentHealth(prev => Math.min(100, prev + healthIncrease));
      setScore(score + 15);
      setFeedback({ 
        type: 'success', 
        message: 'ممتاز! أنت بطل البيئة! 🌟',
        impact: option.impact 
      });
    } else {
      const healthDecrease = option.id.includes('waste') || option.id.includes('harm') ? 5 : 3;
      setEnvironmentHealth(prev => Math.max(0, prev - healthDecrease));
      setFeedback({ 
        type: 'error', 
        message: '❌ هذا السلوك يضر بالبيئة! فكر مرة أخرى 💔',
        impact: option.impact 
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (round + 1 < situations.length) {
        setRound(round + 1);
      } else {
        setCompleted(true);
        onComplete?.(game.points || 45);
      }
    }, 2500);
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
            أنت بطل البيئة! لقد اخترت السلوكيات الصحيحة!
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-3xl font-bold text-green-600 mb-2"
          >
            النقاط: {score} ⭐
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-2xl font-bold text-emerald-600 mb-6"
          >
            صحة البيئة: {environmentHealth}% ❤️
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <EcoHero size="large" emotion="celebrating" animation="bounce" />
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  if (!currentSituation) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-green-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">الموقف {round + 1} / {situations.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environment Health */}
      <Card className="bg-white border-2 border-green-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-lg font-bold text-gray-800">صحة البيئة</span>
            </div>
            <span className={`text-2xl font-bold ${
              environmentHealth >= 70 ? 'text-green-600' :
              environmentHealth >= 40 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {environmentHealth}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <motion.div
              className={`h-4 rounded-full ${
                environmentHealth >= 70 ? 'bg-green-500' :
                environmentHealth >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${environmentHealth}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Situation */}
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-4 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-4"
            >
              {currentSituation.icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentSituation.title}</h3>
            <p className="text-lg text-gray-700">{currentSituation.description}</p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentSituation.options.map((option, index) => {
              const isSelected = selectedOption === option.id;
              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={selectedOption !== null}
                  className={`w-full p-5 rounded-xl border-2 text-right transition-all ${
                    isSelected
                      ? option.correct
                        ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                        : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                      : selectedOption !== null
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{option.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800 text-lg mb-1">{option.label}</div>
                      {isSelected && option.impact && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`text-sm mt-2 ${
                            option.correct ? 'text-green-700' : 'text-red-700'
                          }`}
                        >
                          {option.impact}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
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
                <div className="flex items-center justify-center gap-2 mb-2">
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-bold text-lg">{feedback.message}</span>
                </div>
                {feedback.impact && (
                  <p className="text-sm mt-2">{feedback.impact}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {situations.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / situations.length) * 100}%` }}
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

