'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface BuildCorrectChainGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface ChainElement {
  id: string;
  label: string;
  icon: string;
  type: 'producer' | 'consumer1' | 'consumer2' | 'decomposer';
}

export default function BuildCorrectChainGame({ game, onComplete }: BuildCorrectChainGameProps) {
  const [availableElements, setAvailableElements] = useState<ChainElement[]>([]);
  const [selectedChain, setSelectedChain] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [chainBroken, setChainBroken] = useState(false);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;

  useEffect(() => {
    if (round >= rounds) {
      setCompleted(true);
      onComplete?.(game.points || 40);
      return;
    }

    const allElements: ChainElement[] = data.elements || [
      { id: 'grass', label: 'عشب', icon: '🌿', type: 'producer' },
      { id: 'rabbit', label: 'أرنب', icon: '🐰', type: 'consumer1' },
      { id: 'fox', label: 'ثعلب', icon: '🦊', type: 'consumer2' },
      { id: 'bacteria', label: 'بكتيريا', icon: '🦠', type: 'decomposer' },
      { id: 'algae', label: 'طحالب', icon: '🌊', type: 'producer' },
      { id: 'fish', label: 'سمكة', icon: '🐟', type: 'consumer1' },
      { id: 'shark', label: 'قرش', icon: '🦈', type: 'consumer2' },
      { id: 'worm', label: 'دودة', icon: '🪱', type: 'decomposer' },
      { id: 'tree', label: 'شجرة', icon: '🌳', type: 'producer' },
      { id: 'bird', label: 'طائر', icon: '🐦', type: 'consumer1' },
      { id: 'snake', label: 'أفعى', icon: '🐍', type: 'consumer2' },
    ];

    // Shuffle and select random elements
    const shuffled = [...allElements].sort(() => Math.random() - 0.5).slice(0, 8);
    setAvailableElements(shuffled);
    setSelectedChain([]);
    setChainBroken(false);
    setFeedback(null);
  }, [round, rounds, game.points, onComplete, data.elements]);

  useEffect(() => {
    // Check chain validity
    if (selectedChain.length === 4) {
      const chain = selectedChain.map(id => availableElements.find(el => el.id === id)).filter(Boolean) as ChainElement[];
      
      const isValid = 
        chain[0]?.type === 'producer' &&
        chain[1]?.type === 'consumer1' &&
        chain[2]?.type === 'consumer2' &&
        chain[3]?.type === 'decomposer';

      if (isValid) {
        setScore(score + 20);
        setFeedback({ type: 'success', message: 'ممتاز! سلسلة صحيحة! ✨' });
        
        setTimeout(() => {
          setFeedback(null);
          if (round + 1 < rounds) {
            setRound(round + 1);
          } else {
            setCompleted(true);
            onComplete?.(game.points || 40);
          }
        }, 2000);
      } else {
        setChainBroken(true);
        setFeedback({ type: 'error', message: '❌ السلسلة خاطئة! لا تعمل. راجع الترتيب 💔' });
        
        setTimeout(() => {
          setFeedback(null);
          setSelectedChain([]);
          setChainBroken(false);
        }, 2000);
      }
    }
  }, [selectedChain, availableElements, round, rounds, score, onComplete, game.points]);

  const handleElementSelect = (elementId: string) => {
    if (selectedChain.includes(elementId)) {
      // Remove from chain
      setSelectedChain(selectedChain.filter(id => id !== elementId));
      return;
    }

    if (selectedChain.length >= 4) {
      setFeedback({ type: 'error', message: '❌ السلسلة يجب أن تكون 4 عناصر فقط! 💔' });
      setTimeout(() => setFeedback(null), 2000);
      return;
    }

    setSelectedChain([...selectedChain, elementId]);
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
            رائع! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-4"
          >
            أنت مهندس السلاسل الغذائية! لقد بنيت جميع السلاسل بشكل صحيح!
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

  const selectedChainElements = selectedChain.map(id => 
    availableElements.find(el => el.id === id)
  ).filter(Boolean) as ChainElement[];

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
              <div className="text-sm opacity-80">الجولة {round + 1} / {rounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Elements */}
      <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-4 border-gray-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">اختر 4 عناصر لبناء السلسلة:</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {availableElements.map((element) => {
              const isSelected = selectedChain.includes(element.id);
              return (
                <motion.button
                  key={element.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: isSelected ? 0.8 : 1 }}
                  whileHover={!isSelected ? { scale: 1.1, y: -5 } : {}}
                  whileTap={!isSelected ? { scale: 0.9 } : {}}
                  onClick={() => handleElementSelect(element.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-100 opacity-50'
                      : 'border-gray-300 bg-white hover:border-green-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-4xl mb-2">{element.icon}</div>
                  <div className="text-xs font-bold text-gray-800">{element.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {element.type === 'producer' ? 'منتج' :
                     element.type === 'consumer1' ? 'مستهلك 1' :
                     element.type === 'consumer2' ? 'مستهلك 2' : 'مفكك'}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Chain */}
      <Card className={`bg-gradient-to-br ${
        chainBroken ? 'from-red-50 to-orange-50 border-red-400' : 'from-green-50 to-emerald-50 border-green-400'
      } border-4 rounded-2xl shadow-lg`}>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            {chainBroken ? '❌ السلسلة المختارة (خاطئة):' : '✅ السلسلة المختارة:'}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 min-h-[120px]">
            {selectedChainElements.length === 0 ? (
              <span className="text-gray-400 text-lg">ابدأ باختيار العناصر...</span>
            ) : (
              selectedChainElements.map((element, index) => (
                <div key={element.id} className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 ${
                      chainBroken
                        ? 'bg-red-100 border-red-500'
                        : 'bg-green-100 border-green-500'
                    }`}
                  >
                    <div className="text-4xl mb-2">{element.icon}</div>
                    <div className="text-sm font-bold text-gray-800">{element.label}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {index === 0 ? '1️⃣ منتج' :
                       index === 1 ? '2️⃣ مستهلك 1' :
                       index === 2 ? '3️⃣ مستهلك 2' : '4️⃣ مفكك'}
                    </div>
                  </motion.div>
                  {index < selectedChainElements.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <ArrowRight className="w-8 h-8 text-gray-400" />
                    </motion.div>
                  )}
                </div>
              ))
            )}
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
            <span className="font-bold text-lg">{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {rounds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full relative overflow-hidden"
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

