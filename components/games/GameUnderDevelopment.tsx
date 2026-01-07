'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Construction, Sparkles } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface GameUnderDevelopmentProps {
  gameTitle: string;
  gameDescription?: string;
}

export default function GameUnderDevelopment({ 
  gameTitle, 
  gameDescription 
}: GameUnderDevelopmentProps) {
  return (
    <div className="w-full max-w-4xl mx-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl overflow-hidden shadow-2xl">
          <CardContent className="p-8 md:p-12 text-center">
            {/* Animated Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block mb-6"
            >
              <Construction className="w-20 h-20 text-amber-600" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-amber-800 mb-4"
            >
              🎮 هذه اللعبة قيد التطوير!
            </motion.h2>

            {/* Game Title */}
            {gameTitle && (
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-semibold text-amber-700 mb-6"
              >
                {gameTitle}
              </motion.p>
            )}

            {/* Description */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-amber-200"
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                المحتوى الكامل للعبة سيُضاف قريباً. في الوقت الحالي، يمكنك استكشاف المعلومات أعلاه!
              </p>
            </motion.div>

            {/* Sparkles Animation */}
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity
              }}
              className="flex justify-center gap-2 mb-6"
            >
              <Sparkles className="w-6 h-6 text-amber-500" />
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <Sparkles className="w-6 h-6 text-amber-500" />
            </motion.div>

            {/* EcoHero */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <EcoHero 
                size="large" 
                emotion="encouraging" 
                animation="bounce"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

