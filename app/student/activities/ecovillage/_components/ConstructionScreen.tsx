'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ConstructionScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const constructionPhases = {
    houses: {
        title: 'بناء البيوت البيئية',
        icon: '🏠',
        description: 'أنشئ بيوتاً من مواد معاد تدويرها',
        instruction: 'اسحب المواد لبناء البيت',
        completedMessage: 'تم بناء البيت بنجاح!'
    },
    solar: {
        title: 'وحدة الطاقة الشمسية',
        icon: '☀️',
        description: 'أضف لوحة شمسية رمزية',
        instruction: 'اضغط لإضافة اللوحة الشمسية',
        explanation: 'الطاقة الشمسية تقلّل من الاحتباس الحراري وتحمي كوكبنا',
        completedMessage: 'تم إضافة الطاقة الشمسية!'
    },
    bikes: {
        title: 'مسارات الدراجات',
        icon: '🚲',
        description: 'ارسم مسارات للدراجات وأنشئ دراجات صغيرة',
        instruction: 'ارسم المسار واضغط لإضافة الدراجة',
        explanation: 'النقل النظيف يحمي البيئة',
        completedMessage: 'تم إنشاء مسارات الدراجات!'
    },
    recycling: {
        title: 'منطقة الرسكلة والفرز',
        icon: '♻️',
        description: 'أنشئ 3 حاويات صغيرة للفرز',
        instruction: 'اضغط على كل حاوية لإنشائها',
        explanation: 'النفايات تصبح مورداً عند إعادة التدوير',
        completedMessage: 'تم إنشاء منطقة الرسكلة!'
    }
};

export default function ConstructionScreen({ onNext, onUpdate, data }: ConstructionScreenProps) {
    const [currentPhase, setCurrentPhase] = useState<string>(data.assignedRole || 'houses');
    const [phaseCompleted, setPhaseCompleted] = useState<Record<string, boolean>>(data.phasesCompleted || {});
    const [allPhasesCompleted, setAllPhasesCompleted] = useState(false);

    const phase = constructionPhases[currentPhase as keyof typeof constructionPhases];
    const isCompleted = phaseCompleted[currentPhase];

    const handlePhaseComplete = () => {
        const updated = { ...phaseCompleted, [currentPhase]: true };
        setPhaseCompleted(updated);
        onUpdate({ phasesCompleted: updated, completedPart: currentPhase });

        // Check if all phases are done (or if student's role is done)
        if (updated[currentPhase]) {
            setTimeout(() => {
                setAllPhasesCompleted(true);
                setTimeout(() => onNext(), 2000);
            }, 1000);
        }
    };

    const handleAction = () => {
        if (!isCompleted) {
            handlePhaseComplete();
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-4 text-center">
                {phase.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
                {phase.description}
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
                {/* Visual Construction Area */}
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 mb-6 min-h-[400px] flex items-center justify-center relative">
                    {!isCompleted ? (
                        <div className="text-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                                className="text-9xl mb-4"
                            >
                                {phase.icon}
                            </motion.div>
                            <p className="text-xl font-bold text-gray-700 mb-4">
                                {phase.instruction}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAction}
                                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-full font-bold text-xl shadow-lg"
                            >
                                {currentPhase === 'houses' && '🏠 بناء البيت'}
                                {currentPhase === 'solar' && '☀️ إضافة اللوحة'}
                                {currentPhase === 'bikes' && '🚲 إضافة المسار'}
                                {currentPhase === 'recycling' && '♻️ إنشاء الحاوية'}
                            </motion.button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: 'reverse'
                                }}
                                className="text-9xl mb-4"
                            >
                                {phase.icon}
                            </motion.div>
                            <p className="text-2xl font-bold text-green-700">
                                {phase.completedMessage}
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Explanation */}
                {'explanation' in phase && phase.explanation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-blue-50 rounded-xl p-6 mb-4"
                    >
                        <p className="text-lg text-blue-800 text-center">
                            💡 {phase.explanation}
                        </p>
                    </motion.div>
                )}

                {/* Completion Message */}
                {allPhasesCompleted && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 360]
                            }}
                            transition={{ duration: 0.8 }}
                            className="text-8xl mb-4"
                        >
                            🎉
                        </motion.div>
                        <p className="text-3xl font-bold text-green-700">
                            ممتاز! تم بناء EcoVillage
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
