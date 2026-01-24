'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface EvaluationScreenProps {
    onComplete: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const indicators = [
    { id: 'positive_participation', label: 'المشاركة الإيجابية' },
    { id: 'safety_respect', label: 'احترام السلامة' },
    { id: 'responsible_materials', label: 'استعمال مسؤول للمواد' },
    { id: 'creativity_innovation', label: 'الإبداع والابتكار' },
    { id: 'documentation', label: 'التوثيق' },
    { id: 'responsibility', label: 'تحمل المسؤولية' }
];

const ratings = [
    { value: 'always', label: 'دائمًا', icon: '✅' },
    { value: 'sometimes', label: 'أحيانًا', icon: '🟡' },
    { value: 'rarely', label: 'نادرًا', icon: '🟠' },
    { value: 'never', label: 'أبدًا', icon: '❌' }
];

const reflectionQuestions = [
    {
        id: 'learned',
        question: 'ماذا تعلمت؟',
        placeholder: 'اكتب إجابتك هنا...'
    },
    {
        id: 'creativity_protection',
        question: 'كيف تحمي البيئة بالإبداع؟',
        placeholder: 'اكتب إجابتك هنا...'
    }
];

export default function EvaluationScreen({ onComplete, onUpdate, data }: EvaluationScreenProps) {
    const { user } = useAuth();
    const [evaluations, setEvaluations] = useState<Record<string, string>>(data.evaluationData || {});
    const [responses, setResponses] = useState<Record<string, string>>(data.reflectionResponses || {});
    const [showReflection, setShowReflection] = useState(false);

    const isTeacher = user?.role === 'teacher';

    const handleRatingChange = (indicatorId: string, rating: string) => {
        const updated = { ...evaluations, [indicatorId]: rating };
        setEvaluations(updated);
        onUpdate({ evaluationData: updated });
    };

    const handleResponseChange = (questionId: string, value: string) => {
        const updated = { ...responses, [questionId]: value };
        setResponses(updated);
        onUpdate({ reflectionResponses: updated });
    };

    const handleSaveEvaluation = () => {
        if (isTeacher) {
            setShowReflection(true);
        } else {
            onComplete();
        }
    };

    const canComplete = !isTeacher || (Object.keys(evaluations).length > 0 && Object.keys(responses).length === reflectionQuestions.length);

    if (!isTeacher && !showReflection) {
        return (
            <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
                <h2 className="text-4xl font-bold text-purple-800 mb-8 text-center">
                    التأمل والتقييم
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
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none min-h-[120px]"
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
                    className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-xl p-8 text-center mb-6"
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
                        🎨💚
                    </motion.div>
                    <p className="text-3xl font-bold text-purple-800">
                        أنت الآن بطل الفن الأخضر
                    </p>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold text-xl shadow-lg"
                >
                    ➡️ إنهاء النشاط
                </motion.button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-purple-800 mb-8 text-center">
                {isTeacher ? 'شبكة ملاحظة السلوك' : 'التأمل والتقييم'}
            </h2>

            {!showReflection ? (
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
                    <div className="space-y-6">
                        {indicators.map(indicator => (
                            <div key={indicator.id} className="border-b-2 border-gray-200 pb-6 last:border-0">
                                <h3 className="text-xl font-bold text-gray-700 mb-4">
                                    {indicator.label}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {ratings.map(rating => (
                                        <motion.button
                                            key={rating.value}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleRatingChange(indicator.id, rating.value)}
                                            className={`p-4 rounded-xl border-2 transition-all ${
                                                evaluations[indicator.id] === rating.value
                                                    ? 'bg-purple-500 text-white border-purple-700'
                                                    : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
                                            }`}
                                        >
                                            <div className="text-2xl mb-1">{rating.icon}</div>
                                            <div className="font-bold text-sm">{rating.label}</div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveEvaluation}
                        className="w-full mt-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold text-xl shadow-lg"
                    >
                        ➡️ حفظ التقييم
                    </motion.button>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <h3 className="text-3xl font-bold text-purple-800 mb-6 text-center">
                        التأمل والمناقشة
                    </h3>
                    <div className="space-y-6 mb-6">
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
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none min-h-[120px]"
                                    placeholder={question.placeholder}
                                />
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onComplete}
                        disabled={!canComplete}
                        className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-all ${
                            canComplete
                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        ➡️ إنهاء النشاط
                    </motion.button>
                </div>
            )}
        </div>
    );
}
