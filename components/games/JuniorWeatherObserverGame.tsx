'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Thermometer, CloudRain, Wind, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface JuniorWeatherObserverGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface WeatherReading {
  id: string;
  temperature: number;
  rainfall: number;
  windSpeed: number;
  correctImpact: string;
  correctDescription: string;
}

interface ImpactOption {
  id: string;
  label: string;
  icon: string;
  description: string;
  correct: boolean;
}

export default function JuniorWeatherObserverGame({ game, onComplete }: JuniorWeatherObserverGameProps) {
  const [currentReading, setCurrentReading] = useState<WeatherReading | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showReport, setShowReport] = useState(false);

  const data = game.gameData || {};
  const readings: WeatherReading[] = data.readings || [
    {
      id: 'r1',
      temperature: 35,
      rainfall: 5,
      windSpeed: 15,
      correctImpact: 'drought',
      correctDescription: 'حرارة عالية وقلة أمطار تؤدي للجفاف',
    },
    {
      id: 'r2',
      temperature: 15,
      rainfall: 80,
      windSpeed: 25,
      correctImpact: 'flood',
      correctDescription: 'أمطار غزيرة قد تؤدي للفيضانات',
    },
    {
      id: 'r3',
      temperature: -5,
      rainfall: 0,
      windSpeed: 40,
      correctImpact: 'freeze',
      correctDescription: 'برودة شديدة تؤثر على النباتات والحيوانات',
    },
    {
      id: 'r4',
      temperature: 22,
      rainfall: 50,
      windSpeed: 20,
      correctImpact: 'balanced',
      correctDescription: 'مناخ معتدل ومتوازن مناسب للحياة',
    },
  ];

  const impactOptions: ImpactOption[] = [
    {
      id: 'drought',
      label: 'جفاف',
      icon: '☀️',
      description: 'نقص المياه',
      correct: false,
    },
    {
      id: 'flood',
      label: 'فيضانات',
      icon: '🌊',
      description: 'مياه زائدة',
      correct: false,
    },
    {
      id: 'freeze',
      label: 'تجمد',
      icon: '❄️',
      description: 'برودة شديدة',
      correct: false,
    },
    {
      id: 'balanced',
      label: 'متوازن',
      icon: '🌤️',
      description: 'مناخ مناسب',
      correct: false,
    },
  ];

  useEffect(() => {
    if (round < readings.length) {
      const reading = readings[round];
      setCurrentReading(reading);
      setSelectedImpact(null);
      setShowReport(false);
      setFeedback(null);
      
      // Mark correct option
      impactOptions.forEach(opt => {
        opt.correct = opt.id === reading.correctImpact;
      });
    } else {
      setCompleted(true);
      onComplete?.(game.points || 50);
    }
  }, [round, readings.length, game.points, onComplete]);

  const handleImpactSelect = (impactId: string) => {
    if (!currentReading) return;

    setSelectedImpact(impactId);
    const isCorrect = impactId === currentReading.correctImpact;

    if (isCorrect) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'صحيح! أنت خبير الطقس الصغير ☁️✨' });
      setShowReport(true);
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < readings.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 50);
        }
      }, 2500);
    } else {
      setFeedback({ type: 'error', message: '❌ تحليل خاطئ! فكر في القيم مرة أخرى 💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedImpact(null);
      }, 2000);
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 0) return 'text-blue-600';
    if (temp < 15) return 'text-cyan-600';
    if (temp < 25) return 'text-green-600';
    if (temp < 35) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRainfallColor = (rain: number) => {
    if (rain < 20) return 'text-yellow-600';
    if (rain < 60) return 'text-green-600';
    return 'text-blue-600';
  };

  const getWindColor = (wind: number) => {
    if (wind < 20) return 'text-green-600';
    if (wind < 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-sky-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
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
            أنت خبير الطقس الصغير! لقد حللت جميع القراءات بشكل صحيح ☁️
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

  if (!currentReading) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-sky-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">القراءة {round + 1} / {readings.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Station */}
      <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-4 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">محطة الأرصاد الجوية 📡</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Temperature */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg text-center"
            >
              <Thermometer className={`w-12 h-12 mx-auto mb-3 ${getTemperatureColor(currentReading.temperature)}`} />
              <div className="text-sm text-gray-600 mb-2">الحرارة</div>
              <div className={`text-4xl font-bold ${getTemperatureColor(currentReading.temperature)}`}>
                {currentReading.temperature}°C
              </div>
            </motion.div>

            {/* Rainfall */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg text-center"
            >
              <CloudRain className={`w-12 h-12 mx-auto mb-3 ${getRainfallColor(currentReading.rainfall)}`} />
              <div className="text-sm text-gray-600 mb-2">الأمطار</div>
              <div className={`text-4xl font-bold ${getRainfallColor(currentReading.rainfall)}`}>
                {currentReading.rainfall}%
              </div>
            </motion.div>

            {/* Wind */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg text-center"
            >
              <Wind className={`w-12 h-12 mx-auto mb-3 ${getWindColor(currentReading.windSpeed)}`} />
              <div className="text-sm text-gray-600 mb-2">سرعة الرياح</div>
              <div className={`text-4xl font-bold ${getWindColor(currentReading.windSpeed)}`}>
                {currentReading.windSpeed} km/h
              </div>
            </motion.div>
          </div>

          {/* Impact Options */}
          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">ما هو تأثير هذا الطقس على الوسط البيئي؟</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {impactOptions.map((option, index) => {
                const isSelected = selectedImpact === option.id;
                const isCorrect = option.id === currentReading.correctImpact;
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleImpactSelect(option.id)}
                    disabled={selectedImpact !== null}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                          : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                        : selectedImpact !== null
                        ? 'border-gray-300 bg-gray-100 opacity-50'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-4xl mb-2">{option.icon}</div>
                    <div className="font-bold text-gray-800 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-600">{option.description}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Weather Report */}
          <AnimatePresence>
            {showReport && selectedImpact === currentReading.correctImpact && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-bold text-green-800">تقرير مناخي صحيح ✅</h4>
                </div>
                <p className="text-green-700 font-medium">{currentReading.correctDescription}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-4 rounded-xl text-center ${
                  feedback.type === 'success'
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-red-100 border-2 border-red-500 text-red-800'
                }`}
              >
                <span className="font-bold text-lg">{feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {readings.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-sky-400 to-blue-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / readings.length) * 100}%` }}
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

