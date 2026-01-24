'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface EvaluationScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const indicators = [
    { id: 'participation', label: 'المشاركة الفعالة' },
    { id: 'role_commitment', label: 'الالتزام بالأدوار' },
    { id: 'responsibility', label: 'تحمل المسؤولية' },
    { id: 'teamwork', label: 'العمل الجماعي' },
    { id: 'safety', label: 'احترام السلامة' }
];

const ratings = [
    { value: 'always', label: 'دائمًا', icon: '✅' },
    { value: 'sometimes', label: 'أحيانًا', icon: '🟡' },
    { value: 'rarely', label: 'نادرًا', icon: '🟠' },
    { value: 'never', label: 'أبدًا', icon: '❌' }
];

export default function EvaluationScreen({ onNext, onUpdate, data }: EvaluationScreenProps) {
    const { user } = useAuth();
    const [evaluations, setEvaluations] = useState<Record<string, string>>(data.evaluationData || {});

    // Check if user is teacher
    const isTeacher = user?.role === 'teacher';

    const handleRatingChange = (indicatorId: string, rating: string) => {
        const updated = { ...evaluations, [indicatorId]: rating };
        setEvaluations(updated);
        onUpdate({ evaluationData: updated });
    };

    if (!isTeacher) {
        // For students, show a message that teacher will evaluate
        return (
            <div className="w-full max-w-4xl mx-auto p-6 text-center" dir="rtl">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl shadow-2xl p-12"
                >
                    <div className="text-8xl mb-6">👨‍🏫</div>
                    <h2 className="text-4xl font-bold text-green-800 mb-4">
                        التقييم
                    </h2>
                    <p className="text-2xl text-gray-700">
                        سيقوم المعلم بتقييم أدائك في النشاط
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="mt-8 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-bold text-xl shadow-lg"
                    >
                        ➡️ متابعة
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                شبكة ملاحظة السلوك
            </h2>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
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
                    onClick={onNext}
                    className="w-full mt-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-xl shadow-lg"
                >
                    ➡️ حفظ التقييم
                </motion.button>
            </div>
        </div>
    );
}
