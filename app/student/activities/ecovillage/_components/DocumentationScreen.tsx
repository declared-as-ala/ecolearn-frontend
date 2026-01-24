'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DocumentationScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const emojis = ['🏡', '🌱', '💚', '🌍', '✨', '🌟', '🎉'];

export default function DocumentationScreen({ onNext, onUpdate, data }: DocumentationScreenProps) {
    const [selectedEmoji, setSelectedEmoji] = useState(data.documentationEmoji || '');
    const [reflection, setReflection] = useState(data.reflection || '');

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji);
        onUpdate({ documentationEmoji: emoji });
    };

    const handleReflectionChange = (value: string) => {
        setReflection(value);
        onUpdate({ reflection: value, documentationNote: value });
    };

    const canProceed = reflection.trim().length > 0;

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                التوثيق
            </h2>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
                {/* Reflection Question */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <label className="block text-xl font-bold text-gray-700 mb-3">
                        ماذا تعلمت من هذا النشاط؟
                    </label>
                    <textarea
                        value={reflection}
                        onChange={(e) => handleReflectionChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none min-h-[120px]"
                        placeholder="اكتب ما تعلمته..."
                        maxLength={200}
                    />
                    <p className="text-sm text-gray-500 mt-2 text-left">
                        {reflection.length}/200
                    </p>
                </motion.div>

                {/* Emoji Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <label className="block text-xl font-bold text-gray-700 mb-3">
                        اختر إيموجي:
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {emojis.map(emoji => (
                            <motion.button
                                key={emoji}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEmojiSelect(emoji)}
                                className={`text-4xl p-3 rounded-xl transition-all ${
                                    selectedEmoji === emoji
                                        ? 'bg-green-500 scale-125 border-4 border-green-700'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                {emoji}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Continue Button */}
                {canProceed && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-xl font-bold text-xl shadow-lg"
                    >
                        ➡️ متابعة
                    </motion.button>
                )}
            </div>
        </div>
    );
}
