'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface QuoteScreenProps {
    onNext: () => void;
}

export default function QuoteScreen({ onNext }: QuoteScreenProps) {
    return (
        <div className="w-full max-w-4xl mx-auto text-center p-6" dir="rtl">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="mb-12"
            >
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                    className="text-9xl mb-8"
                >
                    🌍
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl shadow-2xl p-12 md:p-16 mb-8"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-4xl md:text-5xl font-bold text-green-800 leading-relaxed"
                >
                    "البيئة لا تُحكى… بل تُصنع بأيدينا."
                </motion.p>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-10 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-full font-bold text-xl shadow-lg transition-all"
            >
                ➡️ متابعة
            </motion.button>
        </div>
    );
}
