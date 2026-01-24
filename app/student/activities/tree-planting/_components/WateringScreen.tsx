'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface WateringScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const CORRECT_AMOUNT = 50; // 50% is the correct amount
const TOLERANCE = 10; // ±10% tolerance

export default function WateringScreen({ onNext, onUpdate, data }: WateringScreenProps) {
    const [waterAmount, setWaterAmount] = useState(data.waterAmount || 0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setWaterAmount(value);
        setFeedback(null);
        setIsCorrect(false);
    };

    const handleWater = () => {
        const difference = Math.abs(waterAmount - CORRECT_AMOUNT);
        
        if (difference <= TOLERANCE) {
            setFeedback('ممتاز! الكمية مناسبة 🌟');
            setIsCorrect(true);
            onUpdate({ waterAmount });
            setTimeout(() => onNext(), 2000);
        } else if (waterAmount < CORRECT_AMOUNT - TOLERANCE) {
            setFeedback('الماء قليل جداً. أضف المزيد 💧');
        } else {
            setFeedback('الماء كثير جداً. قلل الكمية ⚠️');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 pb-32" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                السقي الأول
            </h2>

            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
                {/* Tree Visual */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{
                            scale: isCorrect ? [1, 1.2, 1] : 1,
                            filter: isCorrect ? ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] : 'brightness(1)'
                        }}
                        transition={{ duration: 1 }}
                        className="text-9xl mb-4"
                    >
                        🌳
                    </motion.div>
                    {isCorrect && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-6xl mb-2"
                        >
                            💚
                        </motion.div>
                    )}
                </div>

                {/* Water Amount Slider */}
                <div className="mb-8">
                    <label className="block text-2xl font-bold text-gray-700 mb-4 text-center">
                        كمية الماء: {waterAmount}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={waterAmount}
                        onChange={handleSliderChange}
                        className="w-full h-6 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                        style={{
                            background: `linear-gradient(to right, #10b981 0%, #10b981 ${waterAmount}%, #e5e7eb ${waterAmount}%, #e5e7eb 100%)`
                        }}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2 mb-4">
                        <span>قليل</span>
                        <span>متوسط</span>
                        <span>كثير</span>
                    </div>
                </div>

                {/* Water Button */}
                <div className="text-center mb-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWater}
                        className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-xl shadow-lg"
                    >
                        💧 سقي الشجرة
                    </motion.button>
                </div>

                {/* Feedback */}
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-center p-4 rounded-xl mb-6 ${
                            isCorrect
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                        <p className="text-xl font-bold">{feedback}</p>
                    </motion.div>
                )}

                {/* Visual Water Indicator */}
                <div className="mt-6 mb-4 flex justify-center gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: i < waterAmount / 10 ? 1 : 0.3,
                                scale: i < waterAmount / 10 ? 1 : 0.8
                            }}
                            className="w-8 h-8 bg-blue-400 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
