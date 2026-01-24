'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
    onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
    return (
        <div className="w-full max-w-4xl mx-auto text-center p-6" dir="rtl">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="mb-8"
            >
                <h1 className="text-5xl md:text-6xl font-bold text-purple-800 mb-6">
                    🎨 أبطال الفن الأخضر: مجسمي الإبداعي
                </h1>
            </motion.div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                    className="text-8xl mb-6"
                >
                    🌟
                </motion.div>
                <p className="text-2xl md:text-3xl text-gray-700 mb-4 leading-relaxed">
                    أهلاً بكم يا صانعي المستقبل!
                </p>
                <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
                    اليوم ستتحول النفايات البلاستيكية إلى أعمال فنية مدهشة
                </p>
                <p className="text-xl md:text-2xl text-purple-700 font-semibold leading-relaxed">
                    بلمستك… تحمي البيئة وتُبدع ♻️
                </p>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full font-bold text-2xl shadow-2xl transition-all"
            >
                ➡️ ابدأ النشاط
            </motion.button>
        </div>
    );
}
