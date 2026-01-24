'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DocumentationScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const emojis = ['🎨', '✨', '🌟', '💚', '♻️', '🌈', '🎉'];

export default function DocumentationScreen({ onNext, onUpdate, data }: DocumentationScreenProps) {
    const [selectedEmoji, setSelectedEmoji] = useState(data.documentationEmoji || '');
    const [note, setNote] = useState(data.documentationNote || '');

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji);
        onUpdate({ documentationEmoji: emoji });
    };

    const handleNoteChange = (value: string) => {
        setNote(value);
        onUpdate({ documentationNote: value });
    };

    const canProceed = selectedEmoji && note.trim().length > 0;

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-purple-800 mb-4 text-center">
                التوثيق والمعرض
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
                🎨 معرض الفن الأخضر
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
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
                                        ? 'bg-purple-500 scale-125 border-4 border-purple-700'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                {emoji}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Note Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <label className="block text-xl font-bold text-gray-700 mb-3">
                        اكتب شرح قصير:
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => handleNoteChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none min-h-[100px]"
                        placeholder="مثال: مجسمي يمثل..."
                        maxLength={150}
                    />
                    <p className="text-sm text-gray-500 mt-2 text-left">
                        {note.length}/150
                    </p>
                </motion.div>

                {/* Gallery Preview */}
                {canProceed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 text-center mb-6"
                    >
                        <h3 className="text-2xl font-bold text-purple-800 mb-4">
                            🎨 معرض الفن الأخضر
                        </h3>
                        <p className="text-lg text-purple-700">
                            سيتم إضافة إبداعك إلى المعرض الافتراضي
                        </p>
                    </motion.div>
                )}

                {/* Continue Button */}
                {canProceed && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold text-xl shadow-lg"
                    >
                        ➡️ متابعة
                    </motion.button>
                )}
            </div>
        </div>
    );
}
