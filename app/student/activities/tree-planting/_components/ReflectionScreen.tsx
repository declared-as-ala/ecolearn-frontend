'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ReflectionScreenProps {
    onComplete: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const reflectionQuestions = [
    {
        id: 'importance',
        question: 'لماذا التشجير مهم؟',
        placeholder: 'اكتب إجابتك هنا...'
    },
    {
        id: 'behavior',
        question: 'كيف كان سلوكك قبل وبعد النشاط؟',
        placeholder: 'اكتب إجابتك هنا...'
    }
];

export default function ReflectionScreen({ onComplete, onUpdate, data }: ReflectionScreenProps) {
    const [responses, setResponses] = useState<Record<string, string>>(
        data.reflectionResponses || {}
    );

    const handleResponseChange = (questionId: string, value: string) => {
        const updated = { ...responses, [questionId]: value };
        setResponses(updated);
        onUpdate({ reflectionResponses: updated });
    };

    const canComplete = Object.keys(responses).length === reflectionQuestions.length &&
        Object.values(responses).every(r => r.trim().length > 0);

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                التأمل والمراجعة
            </h2>

            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
                <div className="space-y-6">
                    {reflectionQuestions.map((question, index) => (
                        <motion.div
                            key={question.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <label className="block text-2xl font-bold text-gray-700 mb-3">
                                {question.question}
                            </label>
                            <textarea
                                value={responses[question.id] || ''}
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none min-h-[120px]"
                                placeholder={question.placeholder}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-xl p-8 text-center mb-6"
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
                    className="text-8xl mb-4"
                >
                    🌍💚
                </motion.div>
                <p className="text-3xl font-bold text-green-800">
                    أنت الآن صديق البيئة
                </p>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                disabled={!canComplete}
                className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-all ${
                    canComplete
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                ➡️ إنهاء النشاط
            </motion.button>
        </div>
    );
}
