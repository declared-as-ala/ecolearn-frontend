'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GoalsScreenProps {
    onNext: () => void;
}

const goals = [
    { icon: '🌍', title: 'تنمية الوعي البيئي' },
    { icon: '👤', title: 'تعزيز المسؤولية الفردية' },
    { icon: '🤝', title: 'تشجيع السلوك الإيجابي' },
    { icon: '🔁', title: 'الاستمرارية بعد النشاط' }
];

export default function GoalsScreen({ onNext }: GoalsScreenProps) {
    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">
                أهداف النشاط
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {goals.map((goal, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white rounded-2xl shadow-xl p-8 text-center border-4 border-green-200 hover:border-green-400 transition-all"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                delay: index * 0.3
                            }}
                            className="text-6xl mb-4"
                        >
                            {goal.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-800">
                            {goal.title}
                        </h3>
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-10 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-bold text-xl shadow-lg transition-all mx-auto block"
            >
                ➡️ لنبدأ العمل
            </motion.button>
        </div>
    );
}
