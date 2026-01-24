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
    { id: 'participation', label: 'المشاركة' },
    { id: 'role_commitment', label: 'الالتزام بالدور' },
    { id: 'recycled_materials', label: 'استعمال مواد الرسكلة' },
    { id: 'renewable_awareness', label: 'الوعي بالطاقة المتجددة' },
    { id: 'clean_transport', label: 'فهم النقل النظيف' },
    { id: 'individual_responsibility', label: 'المسؤولية الفردية' },
    { id: 'teamwork', label: 'العمل الجماعي' },
    { id: 'safety', label: 'السلامة' },
    { id: 'behavior_continuity', label: 'استمرارية السلوك' }
];

const ratings = [
    { value: 'always', label: 'دائمًا', icon: '✅' },
    { value: 'sometimes', label: 'أحيانًا', icon: '🟡' },
    { value: 'rarely', label: 'نادرًا', icon: '🟠' },
    { value: 'never', label: 'أبدًا', icon: '❌' }
];

const reflectionQuestions = [
    {
        id: 'learning',
        question: 'ماذا تعلمت من بناء EcoVillage؟',
        placeholder: 'اكتب إجابتك هنا...'
    },
    {
        id: 'responsibility',
        question: 'كيف ستطبق ما تعلمته في حياتك اليومية؟',
        placeholder: 'اكتب إجابتك هنا...'
    }
];

export default function EvaluationScreen({ onComplete, onUpdate, data }: EvaluationScreenProps) {
    const { user } = useAuth();
    const [evaluations, setEvaluations] = useState<Record<string, string>>(data.evaluationData || {});
    const [responses, setResponses] = useState<Record<string, string>>(data.reflectionResponses || {});
    const [showReflection, setShowReflection] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    const isTeacher = user?.role === 'teacher';
    
    const handleFinish = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (isNavigating) return;
        setIsNavigating(true);
        
        // Immediate navigation
        if (typeof window !== 'undefined') {
            window.location.replace('/student/dashboard');
        } else {
            onComplete();
        }
    };

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
            handleFinish();
        }
    };

    const canComplete = !isTeacher || (Object.keys(evaluations).length > 0 && Object.keys(responses).length === reflectionQuestions.length);

    if (!isTeacher && !showReflection) {
        return (
            <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
                <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
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
                    className="bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl shadow-xl p-8 text-center mb-6"
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
                        🏡💚
                    </motion.div>
                    <p className="text-3xl font-bold text-green-800">
                        أنت الآن باني EcoVillage
                    </p>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-xl font-bold text-xl shadow-lg"
                >
                    ➡️ إنهاء النشاط
                </motion.button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
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
                                                    ? 'bg-green-500 text-white border-green-700'
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
                        className="w-full mt-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-xl font-bold text-xl shadow-lg"
                    >
                        ➡️ حفظ التقييم
                    </motion.button>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <h3 className="text-3xl font-bold text-green-800 mb-6 text-center">
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
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none min-h-[120px]"
                                    placeholder={question.placeholder}
                                />
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFinish}
                        disabled={isNavigating}
                        type="button"
                        className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-all ${
                            isNavigating
                                ? 'bg-gray-400 text-white cursor-wait'
                                : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white'
                        }`}
                    >
                        {isNavigating ? '⏳ جاري الانتقال...' : '➡️ إنهاء النشاط'}
                    </motion.button>
                </div>
            )}
        </div>
    );
}
