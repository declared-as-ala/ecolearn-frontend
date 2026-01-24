'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InitiativeScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const initiatives = [
    { id: 'posters', label: 'ملصقات', icon: '📋', points: 15 },
    { id: 'awareness_boards', label: 'لوحات توعوية', icon: '📊', points: 20 },
    { id: 'daily_system', label: 'نظام نظافة يومي', icon: '🗓️', points: 25 }
];

export default function InitiativeScreen({ onNext, onUpdate, data }: InitiativeScreenProps) {
    const [selectedInitiatives, setSelectedInitiatives] = useState<string[]>(data.initiatives || []);
    const [totalPoints, setTotalPoints] = useState(0);

    const handleToggle = (initiativeId: string, points: number) => {
        const updated = selectedInitiatives.includes(initiativeId)
            ? selectedInitiatives.filter(id => id !== initiativeId)
            : [...selectedInitiatives, initiativeId];
        
        setSelectedInitiatives(updated);
        
        const newPoints = updated.reduce((sum, id) => {
            const init = initiatives.find(i => i.id === id);
            return sum + (init?.points || 0);
        }, 0);
        
        setTotalPoints(newPoints);
        
        const arabicLabels = updated.map(id => {
            const init = initiatives.find(i => i.id === id);
            return init?.label || '';
        });
        
        onUpdate({
            initiatives: updated,
            initiativesArabic: arabicLabels
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-4 text-center">
                المبادرات الذاتية
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
                اقترح أفكاراً للمحافظة على نظافة المدرسة:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {initiatives.map(initiative => {
                    const isSelected = selectedInitiatives.includes(initiative.id);
                    return (
                        <motion.button
                            key={initiative.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleToggle(initiative.id, initiative.points)}
                            className={`p-6 rounded-2xl shadow-lg transition-all border-4 ${
                                isSelected
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-700'
                                    : 'bg-white hover:bg-green-50 border-gray-200'
                            }`}
                        >
                            <div className="text-6xl mb-3">{initiative.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{initiative.label}</h3>
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-2xl mb-2"
                                >
                                    ✅
                                </motion.div>
                            )}
                            {isSelected && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-lg"
                                >
                                    +{initiative.points} نقطة
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Points Display */}
            {totalPoints > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 text-center mb-6"
                >
                    <div className="text-4xl mb-2">⭐</div>
                    <p className="text-2xl font-bold text-white">
                        إجمالي النقاط: {totalPoints} نقطة
                    </p>
                </motion.div>
            )}

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-xl shadow-lg"
            >
                ➡️ متابعة
            </motion.button>
        </div>
    );
}
