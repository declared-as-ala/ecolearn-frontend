'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CompletionScreenProps {
    pointsEarned: number;
    badgesEarned: string[];
    onFinish: () => void;
}

export default function CompletionScreen({ pointsEarned, badgesEarned, onFinish }: CompletionScreenProps) {
    useEffect(() => {
        // Launch confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const interval = setInterval(() => {
            if (Date.now() > end) {
                clearInterval(interval);
                return;
            }

            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#10b981', '#059669', '#34d399']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#10b981', '#059669', '#34d399']
            });
        }, 200);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 text-center" dir="rtl">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                    className="text-9xl mb-6"
                >
                    🎉
                </motion.div>

                <h2 className="text-5xl font-bold text-green-800 mb-6">
                    مبروك! لقد أكملت النشاط
                </h2>

                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
                    {/* Points */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6"
                    >
                        <div className="text-6xl mb-4">🌟</div>
                        <p className="text-3xl font-bold text-gray-700 mb-2">
                            النقاط المكتسبة
                        </p>
                        <p className="text-5xl font-bold text-green-600">
                            +{pointsEarned} نقطة
                        </p>
                    </motion.div>

                    {/* Badges */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-2xl font-bold text-gray-700 mb-4">
                            الشارات المكتسبة
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {badgesEarned.map((badge, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.7 + index * 0.2, type: 'spring' }}
                                    className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-lg"
                                >
                                    <div className="text-6xl mb-2">{badge}</div>
                                    <p className="text-lg font-bold text-white">
                                        حامي الطبيعة
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onFinish}
                    className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-bold text-2xl shadow-2xl transition-all"
                >
                    العودة إلى الصفحة الرئيسية
                </motion.button>
            </motion.div>
        </div>
    );
}
