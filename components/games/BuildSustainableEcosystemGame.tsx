'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, CheckCircle2, XCircle, Leaf } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface BuildSustainableEcosystemGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Component {
  id: string;
  label: string;
  icon: string;
  type: 'energy' | 'green' | 'water' | 'waste';
  sustainable: boolean;
  description: string;
}

export default function BuildSustainableEcosystemGame({ game, onComplete }: BuildSustainableEcosystemGameProps) {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [sustainability, setSustainability] = useState(0); // 0-100
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;
  const targetSustainability = 80;

  const availableComponents: Component[] = data.components || [
    // Sustainable
    { id: 'solar', label: 'طاقة شمسية', icon: '☀️', type: 'energy', sustainable: true, description: 'طاقة نظيفة ومتجددة' },
    { id: 'wind', label: 'طاقة الرياح', icon: '💨', type: 'energy', sustainable: true, description: 'طاقة نظيفة ومتجددة' },
    { id: 'trees', label: 'تشجير', icon: '🌳', type: 'green', sustainable: true, description: 'امتصاص ثاني أكسيد الكربون' },
    { id: 'recycle', label: 'إعادة التدوير', icon: '♻️', type: 'waste', sustainable: true, description: 'تقليل النفايات' },
    { id: 'water-save', label: 'ترشيد الماء', icon: '💧', type: 'water', sustainable: true, description: 'استخدام الماء بحكمة' },
    { id: 'protect', label: 'حماية الحيوانات', icon: '🛡️', type: 'green', sustainable: true, description: 'الحفاظ على التنوع' },
    
    // Non-sustainable
    { id: 'coal', label: 'فحم', icon: '⚫', type: 'energy', sustainable: false, description: 'يسبب تلوث الهواء' },
    { id: 'waste', label: 'نفايات', icon: '🗑️', type: 'waste', sustainable: false, description: 'يسبب تلوث البيئة' },
    { id: 'waste-water', label: 'إهدار الماء', icon: '💦', type: 'water', sustainable: false, description: 'استهلاك مفرط' },
    { id: 'cut-trees', label: 'قطع أشجار', icon: '🪓', type: 'green', sustainable: false, description: 'يدمر البيئة' },
  ];

  useEffect(() => {
    if (round >= rounds) {
      setCompleted(true);
      onComplete?.(game.points || 50);
      return;
    }

    // Calculate sustainability
    const sustainableCount = selectedComponents.filter(id => {
      const component = availableComponents.find(c => c.id === id);
      return component?.sustainable;
    }).length;

    const totalSelected = selectedComponents.length;
    const newSustainability = totalSelected > 0 
      ? (sustainableCount / totalSelected) * 100 
      : 0;
    
    setSustainability(newSustainability);

    // Check if target reached
    if (newSustainability >= targetSustainability && totalSelected >= 4) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'ممتاز! نظام مستدام! 🌱✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < rounds) {
          setRound(round + 1);
          setSelectedComponents([]);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 50);
        }
      }, 2000);
    }
  }, [selectedComponents, round, rounds, score, onComplete, game.points, availableComponents, targetSustainability]);

  const handleComponentToggle = (componentId: string) => {
    if (selectedComponents.includes(componentId)) {
      setSelectedComponents(selectedComponents.filter(id => id !== componentId));
    } else {
      if (selectedComponents.length >= 6) {
        setFeedback({ type: 'error', message: '❌ لا يمكن إضافة المزيد! اختر بعناية 💔' });
        setTimeout(() => setFeedback(null), 2000);
        return;
      }
      setSelectedComponents([...selectedComponents, componentId]);
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
            رائع! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-4"
          >
            لقد بنيت نظاماً بيئياً مستداماً!
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

  const selectedComponentsData = selectedComponents.map(id => 
    availableComponents.find(c => c.id === id)
  ).filter(Boolean) as Component[];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-emerald-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">الجولة {round + 1} / {rounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Meter */}
      <Card className="bg-white border-2 border-emerald-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="text-lg font-bold text-gray-800">مستوى الاستدامة</span>
            </div>
            <span className={`text-2xl font-bold ${
              sustainability >= targetSustainability ? 'text-green-600' :
              sustainability >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {sustainability.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <motion.div
              className={`h-4 rounded-full ${
                sustainability >= targetSustainability ? 'bg-green-500' :
                sustainability >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${sustainability}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {sustainability >= targetSustainability && selectedComponents.length >= 4 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-4 text-center"
            >
              <span className="text-green-600 font-bold text-lg">🎯 الهدف: {targetSustainability}%</span>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Selected Components */}
      {selectedComponentsData.length > 0 && (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">المكونات المختارة ({selectedComponentsData.length}/6):</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {selectedComponentsData.map((component) => (
                <motion.div
                  key={component.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`p-4 rounded-xl border-2 text-center ${
                    component.sustainable
                      ? 'bg-green-100 border-green-400'
                      : 'bg-red-100 border-red-400'
                  }`}
                >
                  <div className="text-3xl mb-2">{component.icon}</div>
                  <div className="text-sm font-bold text-gray-800">{component.label}</div>
                  {component.sustainable ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mt-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mx-auto mt-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Components */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">اختر المكونات لبناء نظام مستدام:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {availableComponents.map((component, index) => {
              const isSelected = selectedComponents.includes(component.id);
              return (
                <motion.button
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleComponentToggle(component.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? component.sustainable
                        ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                        : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                      : component.sustainable
                      ? 'border-green-300 bg-white hover:border-green-400 hover:shadow-lg cursor-pointer'
                      : 'border-red-300 bg-white hover:border-red-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-4xl mb-2">{component.icon}</div>
                  <div className="text-xs font-bold text-gray-800 mb-1">{component.label}</div>
                  <div className="text-xs text-gray-600">{component.description}</div>
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
            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-4 rounded-full relative overflow-hidden"
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

