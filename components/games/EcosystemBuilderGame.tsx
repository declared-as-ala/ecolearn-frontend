'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, RefreshCcw, Sparkles, XCircle, CheckCircle2, Star } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import GameUnderDevelopment from './GameUnderDevelopment';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface EcosystemBuilderGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface EcosystemElement {
  id: string;
  label: string;
  icon: string;
  type: 'producer' | 'consumer' | 'decomposer';
  position?: { x: number; y: number };
}

export default function EcosystemBuilderGame({ game, onComplete }: EcosystemBuilderGameProps) {
  const [placedElements, setPlacedElements] = useState<EcosystemElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const data = game.gameData || {};
  const availableElements: EcosystemElement[] = data.elements || [];
  const requiredElements = data.requiredElements || 5;
  const isUnderDevelopment = data.underDevelopment !== false; // Default to true

  // Show under development message if not ready
  if (isUnderDevelopment) {
    return <GameUnderDevelopment gameTitle={game.title} gameDescription={game.description} />;
  }

  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId);
  };

  const handlePlaceElement = (x: number, y: number) => {
    if (!selectedElement) return;

    const element = availableElements.find(e => e.id === selectedElement);
    if (!element) return;

    const newElement: EcosystemElement = {
      ...element,
      position: { x, y }
    };

    setPlacedElements([...placedElements, newElement]);
    setSelectedElement(null);
    setScore(score + 10);
    setShowSuccessAnimation(true);
    setTimeout(() => setShowSuccessAnimation(false), 1000);

    if (placedElements.length + 1 >= requiredElements) {
      setTimeout(() => {
        setCompleted(true);
        onComplete?.(game.points || 30);
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
            className="text-xl text-green-700 mb-6"
          >
            لقد بنيت نظاماً بيئياً متكاملاً!
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <EcoHero size="large" emotion="celebrating" animation="bounce" />
          </motion.div>
          {/* Confetti Effect */}
          <AnimatePresence>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 400 - 200,
                  y: -50,
                  opacity: 1,
                  rotate: 0
                }}
                animate={{ 
                  y: 500,
                  opacity: 0,
                  rotate: 360
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '0%'
                }}
              >
                {['⭐', '🎉', '✨', '🌟'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
            <p className="text-green-100">{game.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-sm">نقاط</div>
          </div>
        </CardContent>
      </Card>

      {/* Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Elements */}
        <Card className="lg:col-span-1 bg-blue-50 border-2 border-blue-200 rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">العناصر المتاحة</h3>
            <div className="space-y-3">
              {availableElements.map((element, index) => {
                const isPlaced = placedElements.some(e => e.id === element.id);
                return (
                  <motion.button
                    key={element.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !isPlaced && handleElementSelect(element.id)}
                    disabled={isPlaced}
                    className={`w-full p-4 rounded-xl border-2 transition-all relative ${
                      isPlaced
                        ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                        : selectedElement === element.id
                        ? 'border-blue-500 bg-blue-100 shadow-lg ring-2 ring-blue-300'
                        : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    {isPlaced && (
                      <div className="absolute top-2 left-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <motion.span
                        animate={selectedElement === element.id ? { 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        } : {}}
                        transition={{ repeat: selectedElement === element.id ? Infinity : 0, duration: 0.5 }}
                        className="text-3xl"
                      >
                        {element.icon}
                      </motion.span>
                      <div className="text-right flex-1">
                        <div className="font-bold text-gray-800">{element.label}</div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                          {element.type}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Ecosystem Canvas */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-green-100 to-blue-100 border-4 border-green-300 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
              لوحة بناء النظام البيئي
            </h3>
            <div 
              className="relative w-full h-[500px] bg-white/50 rounded-xl border-2 border-dashed border-green-400 cursor-crosshair"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                handlePlaceElement(x, y);
              }}
            >
              <AnimatePresence>
                {placedElements.map((element, index) => (
                  <motion.div
                    key={`${element.id}-${index}`}
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1, 
                      rotate: 0,
                      y: [0, -10, 0]
                    }}
                    exit={{ scale: 0, opacity: 0, rotate: 180 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="absolute z-10"
                    style={{
                      left: `${element.position?.x || 0}%`,
                      top: `${element.position?.y || 0}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="text-5xl bg-white rounded-full p-3 shadow-xl border-4 border-green-400 relative"
                    >
                      {element.icon}
                      {showSuccessAnimation && index === placedElements.length - 1 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0] }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Success Particles */}
              <AnimatePresence>
                {showSuccessAnimation && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        initial={{ 
                          scale: 0,
                          x: 0,
                          y: 0,
                          opacity: 1
                        }}
                        animate={{ 
                          scale: [0, 1, 0],
                          x: Math.cos(i * Math.PI / 4) * 100,
                          y: Math.sin(i * Math.PI / 4) * 100,
                          opacity: [1, 1, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 1,
                          ease: "easeOut"
                        }}
                        className="absolute text-2xl"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>

              {selectedElement && (
                <motion.div
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  اضغط على اللوحة لوضع العنصر
                </motion.div>
              )}
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="font-bold text-gray-700">التقدم</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">{placedElements.length} / {requiredElements}</span>
                  {placedElements.length === requiredElements && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${(placedElements.length / requiredElements) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

