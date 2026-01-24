'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ExecutionScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const roleActions = {
    collection: {
        title: 'دور الجمع',
        icon: '🟢',
        tasks: ['جمع النفايات', 'وضعها في الأكياس', 'نقلها للمكان المخصص'],
        emoji: '🗑️'
    },
    sorting: {
        title: 'دور الفرز',
        icon: '🔵',
        tasks: ['فرز الورق', 'فرز البلاستيك', 'فرز النفايات العضوية'],
        emoji: '♻️'
    },
    organization: {
        title: 'دور الترتيب',
        icon: '🟡',
        tasks: ['ترتيب المنطقة', 'تنظيف الأسطح', 'تنظيم الأدوات'],
        emoji: '🧹'
    },
    documentation: {
        title: 'دور التوثيق',
        icon: '📸',
        tasks: ['التقاط الصور', 'تسجيل الملاحظات', 'توثيق العمل'],
        emoji: '📷'
    }
};

export default function ExecutionScreen({ onNext, onUpdate, data }: ExecutionScreenProps) {
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [allCompleted, setAllCompleted] = useState(false);

    const role = roleActions[data.assignedRole as keyof typeof roleActions] || roleActions.collection;
    const tasks = role.tasks;

    const handleTaskComplete = (taskIndex: number) => {
        if (!completedTasks.includes(taskIndex)) {
            const updated = [...completedTasks, taskIndex];
            setCompletedTasks(updated);
            onUpdate({ completedTasks: updated });

            if (updated.length === tasks.length) {
                setAllCompleted(true);
                setTimeout(() => onNext(), 2000);
            }
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-4 text-center">
                التنفيذ
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
                قم بدورك في الفريق
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
                {/* Role Display */}
                <div className="text-center mb-8">
                    <div className="text-8xl mb-4">{role.emoji}</div>
                    <h3 className="text-3xl font-bold text-green-800 mb-2">
                        {role.title}
                    </h3>
                    <div className="text-4xl">{role.icon}</div>
                </div>

                {/* Tasks */}
                <div className="space-y-4 mb-6">
                    {tasks.map((task, index) => {
                        const isCompleted = completedTasks.includes(index);
                        return (
                            <motion.button
                                key={index}
                                whileHover={!isCompleted ? { scale: 1.02 } : {}}
                                whileTap={!isCompleted ? { scale: 0.98 } : {}}
                                onClick={() => !isCompleted && handleTaskComplete(index)}
                                disabled={isCompleted}
                                className={`w-full p-6 rounded-xl border-4 transition-all text-right ${
                                    isCompleted
                                        ? 'bg-green-500 text-white border-green-700'
                                        : 'bg-gray-50 hover:bg-green-50 border-gray-300 cursor-pointer'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">{task}</span>
                                    {isCompleted ? (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-4xl"
                                        >
                                            ✅
                                        </motion.span>
                                    ) : (
                                        <span className="text-2xl">⭕</span>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Positive Feedback */}
                {completedTasks.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center p-4 bg-green-100 rounded-xl"
                    >
                        <p className="text-xl font-bold text-green-800">
                            ممتاز! {completedTasks.length} / {tasks.length}
                        </p>
                    </motion.div>
                )}

                {/* Completion Message */}
                {allCompleted && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center mt-6"
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
                            رائع! لقد أكملت جميع المهام
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
