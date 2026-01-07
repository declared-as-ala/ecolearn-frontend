'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Sun, CloudRain, Wind, Snowflake, Droplets } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface ClimateBalanceGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface ClimateState {
  temperature: number; // -50 to 50 (0 = balanced)
  rainfall: number; // 0 to 100 (50 = balanced)
  wind: number; // 0 to 100 (30 = balanced)
}

interface EcosystemState {
  plants: number; // 0 to 100
  animals: number; // 0 to 100
  health: number; // 0 to 100
}

export default function ClimateBalanceGame({ game, onComplete }: ClimateBalanceGameProps) {
  const [climate, setClimate] = useState<ClimateState>({
    temperature: 0,
    rainfall: 50,
    wind: 30,
  });
  const [ecosystem, setEcosystem] = useState<EcosystemState>({
    plants: 70,
    animals: 65,
    health: 75,
  });
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [targetReached, setTargetReached] = useState(false);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;
  const targetHealth = 80; // Target ecosystem health to win

  // Update ecosystem based on climate
  useEffect(() => {
    if (completed) return;

    const updateEcosystem = () => {
      const temp = climate.temperature;
      const rain = climate.rainfall;
      const wind = climate.wind;

      // Calculate health based on balance
      let plantChange = 0;
      let animalChange = 0;
      let healthChange = 0;

      // Temperature effects
      if (Math.abs(temp) > 30) {
        plantChange -= 2;
        animalChange -= 2;
        healthChange -= 3;
      } else if (Math.abs(temp) < 10) {
        plantChange += 0.5;
        animalChange += 0.5;
        healthChange += 1;
      }

      // Rainfall effects
      if (rain < 20) {
        plantChange -= 1.5;
        animalChange -= 1;
        healthChange -= 2;
      } else if (rain > 80) {
        plantChange -= 1;
        animalChange -= 0.5;
        healthChange -= 1;
      } else if (rain >= 40 && rain <= 60) {
        plantChange += 0.5;
        animalChange += 0.3;
        healthChange += 0.5;
      }

      // Wind effects
      if (wind > 70) {
        plantChange -= 1;
        animalChange -= 0.5;
        healthChange -= 1;
      } else if (wind >= 20 && wind <= 40) {
        plantChange += 0.3;
        animalChange += 0.2;
        healthChange += 0.3;
      }

      setEcosystem(prev => {
        const newPlants = Math.max(0, Math.min(100, prev.plants + plantChange));
        const newAnimals = Math.max(0, Math.min(100, prev.animals + animalChange));
        const newHealth = Math.max(0, Math.min(100, prev.health + healthChange));
        
        // Check if target reached
        if (newHealth >= targetHealth && !targetReached) {
          setTargetReached(true);
          setScore(score + 20);
          setFeedback({ type: 'success', message: 'مناخ متوازن... حياة مستقرة 🌱✨' });
          setTimeout(() => {
            if (round + 1 < rounds) {
              setRound(round + 1);
              setTargetReached(false);
              setClimate({ temperature: 0, rainfall: 50, wind: 30 });
            } else {
              setCompleted(true);
              onComplete?.(game.points || 40);
            }
          }, 2000);
        }

        return {
          plants: newPlants,
          animals: newAnimals,
          health: newHealth,
        };
      });
    };

    const interval = setInterval(updateEcosystem, 1000);
    return () => clearInterval(interval);
  }, [climate, completed, round, rounds, targetReached, score, onComplete, game.points]);

  const adjustClimate = (type: 'temperature' | 'rainfall' | 'wind', value: number) => {
    if (completed || targetReached) return;

    setClimate(prev => {
      const newValue = Math.max(
        type === 'temperature' ? -50 : 0,
        Math.min(
          type === 'temperature' ? 50 : 100,
          prev[type] + value
        )
      );

      return { ...prev, [type]: newValue };
    });

    // Check for extreme values
    const newClimate = { ...climate, [type]: climate[type] + value };
    const isExtreme = 
      Math.abs(newClimate.temperature) > 40 ||
      newClimate.rainfall < 10 || newClimate.rainfall > 90 ||
      newClimate.wind > 80;

    if (isExtreme) {
      setFeedback({ type: 'error', message: '⚠️ مناخ متطرف! هذا يضر بالبيئة 💔' });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
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
            ممتاز! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-4"
          >
            لقد حافظت على التوازن المناخي بنجاح!
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

  const isBalanced = Math.abs(climate.temperature) < 15 && 
                    climate.rainfall >= 40 && climate.rainfall <= 60 &&
                    climate.wind >= 20 && climate.wind <= 40;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-blue-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">الجولة {round + 1} / {rounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ecosystem Health */}
      <Card className="bg-white border-2 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">صحة النظام البيئي</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🌿</div>
              <div className="text-sm text-gray-600 mb-2">النباتات</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-green-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${ecosystem.plants}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-lg font-bold text-green-600 mt-1">{Math.round(ecosystem.plants)}%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🦌</div>
              <div className="text-sm text-gray-600 mb-2">الحيوانات</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-blue-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${ecosystem.animals}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-lg font-bold text-blue-600 mt-1">{Math.round(ecosystem.animals)}%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">❤️</div>
              <div className="text-sm text-gray-600 mb-2">الصحة العامة</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${
                    ecosystem.health >= 70 ? 'bg-green-500' :
                    ecosystem.health >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${ecosystem.health}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className={`text-lg font-bold mt-1 ${
                ecosystem.health >= 70 ? 'text-green-600' :
                ecosystem.health >= 40 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {Math.round(ecosystem.health)}%
              </div>
            </div>
          </div>
          {ecosystem.health >= targetHealth && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-4 text-center"
            >
              <span className="text-2xl">🎯 الهدف: {targetHealth}%</span>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Climate Controls */}
      <Card className="bg-gradient-to-br from-yellow-50 to-blue-50 border-2 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">أدوات التحكم في المناخ</h3>
          
          {/* Temperature */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-gray-700">الحرارة</span>
              </div>
              <span className={`font-bold ${
                Math.abs(climate.temperature) < 15 ? 'text-green-600' :
                Math.abs(climate.temperature) < 30 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {climate.temperature > 0 ? '+' : ''}{climate.temperature}°C
              </span>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => adjustClimate('temperature', -5)}
                className="flex-1 p-3 bg-blue-100 hover:bg-blue-200 rounded-lg border-2 border-blue-300 flex items-center justify-center gap-2"
              >
                <Snowflake className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-700">برودة</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => adjustClimate('temperature', 5)}
                className="flex-1 p-3 bg-orange-100 hover:bg-orange-200 rounded-lg border-2 border-orange-300 flex items-center justify-center gap-2"
              >
                <Sun className="w-5 h-5 text-orange-600" />
                <span className="font-bold text-orange-700">حرارة</span>
              </motion.button>
            </div>
          </div>

          {/* Rainfall */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-blue-500" />
                <span className="font-bold text-gray-700">الأمطار</span>
              </div>
              <span className={`font-bold ${
                climate.rainfall >= 40 && climate.rainfall <= 60 ? 'text-green-600' :
                climate.rainfall >= 20 && climate.rainfall <= 80 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {climate.rainfall}%
              </span>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => adjustClimate('rainfall', -10)}
                className="flex-1 p-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg border-2 border-yellow-300 flex items-center justify-center gap-2"
              >
                <Sun className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-700">جفاف</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => adjustClimate('rainfall', 10)}
                className="flex-1 p-3 bg-blue-100 hover:bg-blue-200 rounded-lg border-2 border-blue-300 flex items-center justify-center gap-2"
              >
                <CloudRain className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-700">مطر</span>
              </motion.button>
            </div>
          </div>

          {/* Wind */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-gray-500" />
                <span className="font-bold text-gray-700">الرياح</span>
              </div>
              <span className={`font-bold ${
                climate.wind >= 20 && climate.wind <= 40 ? 'text-green-600' :
                climate.wind >= 10 && climate.wind <= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {climate.wind}%
              </span>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => adjustClimate('wind', -10)}
                className="flex-1 p-3 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 flex items-center justify-center gap-2"
              >
                <span className="text-xl">🍃</span>
                <span className="font-bold text-green-700">هادئة</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => adjustClimate('wind', 10)}
                className="flex-1 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center gap-2"
              >
                <Wind className="w-5 h-5 text-gray-600" />
                <span className="font-bold text-gray-700">قوية</span>
              </motion.button>
            </div>
          </div>

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

          {/* Balance Indicator */}
          {isBalanced && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-4 p-4 bg-green-100 border-2 border-green-500 rounded-xl text-center"
            >
              <span className="text-green-800 font-bold text-lg">✨ المناخ متوازن! ✨</span>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {rounds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-cyan-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / rounds) * 100}%` }}
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

