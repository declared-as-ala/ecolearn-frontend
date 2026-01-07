'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Clock, Shield, Zap } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import GameUnderDevelopment from './GameUnderDevelopment';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface FoodChainDefenderGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Threat {
  id: string;
  label: string;
  icon: string;
  target: string; // Which element it threatens
  solution: string; // Correct action to defend
  x: number;
  y: number;
}

export default function FoodChainDefenderGame({ game, onComplete }: FoodChainDefenderGameProps) {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [defended, setDefended] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [level, setLevel] = useState(1);

  const data = game.gameData || {};
  const isUnderDevelopment = data.underDevelopment !== false;
  const timeLimit = data.timeLimit || 60;

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft <= 0 && !gameOver) {
      setGameOver(true);
      setTimeout(() => {
        onComplete?.(score);
      }, 2000);
    }
  }, [timeLeft, gameOver, score, onComplete]);

  useEffect(() => {
    if (gameOver || completed) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, completed]);

  useEffect(() => {
    if (gameOver || completed) return;

    const spawnInterval = setInterval(() => {
      if (threats.length < 5) {
        const newThreat: Threat = {
          id: `threat-${Date.now()}`,
          label: data.threats?.[Math.floor(Math.random() * (data.threats?.length || 1))]?.label || 'تهديد',
          icon: data.threats?.[Math.floor(Math.random() * (data.threats?.length || 1))]?.icon || '⚠️',
          target: 'producer',
          solution: 'protect',
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        };
        setThreats(prev => [...prev, newThreat]);
      }
    }, 3000);

    return () => clearInterval(spawnInterval);
  }, [threats.length, gameOver, completed, data]);

  if (isUnderDevelopment) {
    return <GameUnderDevelopment gameTitle={game.title} gameDescription={game.description} />;
  }

  const handleDefend = (threatId: string) => {
    const threat = threats.find(t => t.id === threatId);
    if (!threat) return;

    setDefended([...defended, threatId]);
    setThreats(threats.filter(t => t.id !== threatId));
    setScore(score + 10);

    if (defended.length + 1 >= 10) {
      setCompleted(true);
      setTimeout(() => {
        onComplete?.(game.points || 40);
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
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-red-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8 relative" dir="rtl">
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
            انتصار! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-4"
          >
            لقد دافعت عن السلسلة الغذائية بنجاح!
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-3xl font-bold text-orange-600 mb-6"
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
          {/* Victory Confetti */}
          <AnimatePresence>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 600 - 300,
                  y: -50,
                  opacity: 1,
                  rotate: 0
                }}
                animate={{ 
                  y: 600,
                  opacity: 0,
                  rotate: 720
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2.5,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '0%'
                }}
              >
                {['🎊', '🎉', '⭐', '✨', '🌟', '🏆'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
      </motion.div>
    );
  }

  if (gameOver) {
    return (
      <Card className="border-4 border-red-400 bg-red-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <h2 className="text-3xl font-bold text-red-800 mb-2">انتهى الوقت! ⏰</h2>
        <p className="text-xl text-red-700 mb-4">لكنك دافعت عن {defended.length} تهديد</p>
        <p className="text-2xl font-bold text-red-600 mb-6">النقاط: {score}</p>
        <EcoHero size="large" emotion="worried" />
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-orange-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <motion.div
                animate={timeLeft <= 10 ? { 
                  scale: [1, 1.2, 1],
                  backgroundColor: ['rgba(255,255,255,0.2)', 'rgba(255,0,0,0.5)', 'rgba(255,255,255,0.2)']
                } : {}}
                transition={{ repeat: timeLeft <= 10 ? Infinity : 0, duration: 0.5 }}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg"
              >
                <Clock className="w-5 h-5" />
                <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-200' : ''}`}>
                  {timeLeft}
                </span>
              </motion.div>
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Area */}
      <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-4 border-green-300 rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="relative w-full h-[500px] bg-white/50 rounded-xl border-2 border-dashed border-green-400">
            <AnimatePresence>
              {threats.map((threat) => (
                <motion.button
                  key={threat.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDefend(threat.id)}
                  className="absolute"
                  style={{
                    left: `${threat.x}%`,
                    top: `${threat.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0px rgba(239, 68, 68, 0)',
                        '0 0 20px rgba(239, 68, 68, 0.8)',
                        '0 0 0px rgba(239, 68, 68, 0)'
                      ]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    className="bg-gradient-to-br from-red-500 to-red-600 text-white text-4xl p-4 rounded-full shadow-xl border-4 border-white relative"
                  >
                    {threat.icon}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-400 opacity-0"
                      animate={{ 
                        scale: [1, 1.5, 1.5],
                        opacity: [0.5, 0, 0]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
                  <div className="mt-2 bg-white/90 px-3 py-1 rounded-lg text-sm font-bold text-gray-800 shadow-lg">
                    {threat.label}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="font-bold">اضغط على التهديدات للدفاع!</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>التهديدات المدافعة عنها</span>
              <span>{defended.length} / 10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${(defended.length / 10) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                {defended.length >= 10 && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <span className="text-white font-bold text-sm">🎉 مكتمل!</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

