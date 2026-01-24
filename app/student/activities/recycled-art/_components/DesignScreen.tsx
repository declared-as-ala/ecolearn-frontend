'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DesignScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const inspirationOptions = [
    { id: 'fantasy', label: 'شكل خيالي', icon: '🐉', description: 'مخلوقات خيالية وأسطورية' },
    { id: 'artistic', label: 'مجسم فني', icon: '🎭', description: 'أعمال فنية تعبيرية' },
    { id: 'geometric', label: 'شكل هندسي', icon: '🔺', description: 'أشكال هندسية متناسقة' },
    { id: 'custom', label: 'فكرة من خيالك', icon: '💡', description: 'ابدع فكرتك الخاصة' }
];

export default function DesignScreen({ onNext, onUpdate, data }: DesignScreenProps) {
    const [selectedInspiration, setSelectedInspiration] = useState<string | null>(data.selectedInspiration || null);
    const [customIdea, setCustomIdea] = useState(data.customIdea || '');

    const handleInspirationSelect = (id: string) => {
        setSelectedInspiration(id);
        onUpdate({ selectedInspiration: id });
    };

    const handleCustomIdeaChange = (value: string) => {
        setCustomIdea(value);
        onUpdate({ customIdea: value });
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-purple-800 mb-4 text-center">
                التصميم الشخصي
            </h2>
            <p className="text-2xl text-gray-700 mb-8 text-center">
                تخيّل… واصنع مجسمك بحرية ✨
            </p>

            {/* Inspiration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {inspirationOptions.map(option => {
                    const isSelected = selectedInspiration === option.id;
                    return (
                        <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleInspirationSelect(option.id)}
                            className={`p-6 rounded-2xl shadow-lg transition-all border-4 text-right ${
                                isSelected
                                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-700'
                                    : 'bg-white hover:bg-purple-50 border-gray-200'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <span className="text-6xl">{option.icon}</span>
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">{option.label}</h3>
                                    <p className="text-sm opacity-90">{option.description}</p>
                                </div>
                            </div>
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-3xl text-center mt-2"
                                >
                                    ✅
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Custom Idea Input (Optional) */}
            {selectedInspiration === 'custom' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 mb-6"
                >
                    <label className="block text-xl font-bold text-gray-700 mb-3">
                        💡 اكتب فكرتك الإبداعية:
                    </label>
                    <textarea
                        value={customIdea}
                        onChange={(e) => handleCustomIdeaChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none min-h-[100px]"
                        placeholder="صِف مجسمك الإبداعي..."
                    />
                </motion.div>
            )}

            {/* Encouragement Message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 text-center mb-6"
            >
                <p className="text-xl text-purple-800 font-semibold">
                    🌈 لا توجد إجابة صحيحة أو خاطئة... فقط إبداعك!
                </p>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold text-xl shadow-lg"
            >
                ➡️ انتقل للتنفيذ
            </motion.button>
        </div>
    );
}
