'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DecorationScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const colors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚪', '⚫'];
const stickers = ['⭐', '💫', '✨', '🌟', '🎨', '🌈', '🦋', '🌸'];

export default function DecorationScreen({ onNext, onUpdate, data }: DecorationScreenProps) {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedStickers, setSelectedStickers] = useState<string[]>(data.selectedStickers || []);
    const [decorated, setDecorated] = useState(false);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        onUpdate({ selectedColor: color });
    };

    const handleStickerToggle = (sticker: string) => {
        const updated = selectedStickers.includes(sticker)
            ? selectedStickers.filter(s => s !== sticker)
            : [...selectedStickers, sticker];
        setSelectedStickers(updated);
        onUpdate({ selectedStickers: updated });
    };

    const handleComplete = () => {
        setDecorated(true);
        setTimeout(() => onNext(), 2000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-purple-800 mb-4 text-center">
                التزيين والتلوين
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
                كل مجسم فريد… مثل صاحبه 🌟
            </p>

            {/* Model Display */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 mb-6 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        animate={{
                            scale: decorated ? [1, 1.1, 1] : 1,
                            rotate: decorated ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ duration: 2, repeat: decorated ? Infinity : 0 }}
                        className="text-9xl mb-4"
                    >
                        🎨
                    </motion.div>
                    {selectedStickers.length > 0 && (
                        <div className="flex justify-center gap-2 flex-wrap">
                            {selectedStickers.map((sticker, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="text-4xl"
                                >
                                    {sticker}
                                </motion.span>
                            ))}
                        </div>
                    )}
                    {selectedColor && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-6xl mt-4"
                        >
                            {selectedColor}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Color Palette */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-700 mb-4">🎨 اختر الألوان:</h3>
                <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                        <motion.button
                            key={color}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleColorSelect(color)}
                            className={`text-5xl p-3 rounded-xl transition-all ${
                                selectedColor === color
                                    ? 'bg-purple-200 scale-125 border-4 border-purple-500'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            {color}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Stickers */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-700 mb-4">✨ اختر الملصقات:</h3>
                <div className="flex flex-wrap gap-3">
                    {stickers.map(sticker => (
                        <motion.button
                            key={sticker}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleStickerToggle(sticker)}
                            className={`text-5xl p-3 rounded-xl transition-all ${
                                selectedStickers.includes(sticker)
                                    ? 'bg-pink-200 scale-125 border-4 border-pink-500'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            {sticker}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Complete Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold text-xl shadow-lg"
            >
                ✅ اكتمل التزيين
            </motion.button>

            {decorated && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mt-4"
                >
                    <div className="text-6xl mb-2">🌟</div>
                    <p className="text-2xl font-bold text-purple-700">
                        مجسمك رائع ومميز!
                    </p>
                </motion.div>
            )}
        </div>
    );
}
