'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SoilPrepScreenProps {
    onNext: () => void;
}

interface Stone {
    id: string;
    x: number;
    y: number;
}

interface Weed {
    id: string;
    x: number;
    y: number;
    removed: boolean;
}

export default function SoilPrepScreen({ onNext }: SoilPrepScreenProps) {
    const [stones, setStones] = useState<Stone[]>([
        { id: '1', x: 20, y: 30 },
        { id: '2', x: 60, y: 40 },
        { id: '3', x: 40, y: 60 }
    ]);
    const [weeds, setWeeds] = useState<Weed[]>([
        { id: '1', x: 30, y: 50, removed: false },
        { id: '2', x: 70, y: 30, removed: false }
    ]);
    const [digTaps, setDigTaps] = useState(0);
    const [holeDug, setHoleDug] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleStoneTap = (stoneId: string) => {
        setStones(prev => prev.filter(s => s.id !== stoneId));
    };

    const handleWeedDrag = (weedId: string) => {
        setWeeds(prev => prev.map(w => w.id === weedId ? { ...w, removed: true } : w));
    };

    const handleDig = () => {
        if (digTaps < 2) {
            setDigTaps(prev => prev + 1);
        } else {
            setHoleDug(true);
            checkCompletion();
        }
    };

    const checkCompletion = () => {
        if (stones.length === 0 && weeds.every(w => w.removed) && holeDug) {
            setCompleted(true);
            setTimeout(() => onNext(), 2000);
        }
    };

    React.useEffect(() => {
        checkCompletion();
    }, [stones, weeds, holeDug]);

    return (
        <div className="w-full max-w-4xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                تحضير التربة
            </h2>

            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl shadow-2xl p-8 mb-6 relative min-h-[400px] overflow-hidden">
                {/* Soil Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-300 rounded-3xl" />

                {/* Stones */}
                <AnimatePresence>
                    {stones.map(stone => (
                        <motion.button
                            key={stone.id}
                            initial={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0, rotate: 360 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleStoneTap(stone.id)}
                            className="absolute text-4xl cursor-pointer"
                            style={{ left: `${stone.x}%`, top: `${stone.y}%` }}
                        >
                            🌑
                        </motion.button>
                    ))}
                </AnimatePresence>

                {/* Weeds */}
                <AnimatePresence>
                    {weeds.filter(w => !w.removed).map(weed => (
                        <motion.div
                            key={weed.id}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            onDragEnd={() => handleWeedDrag(weed.id)}
                            initial={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0, x: 200 }}
                            className="absolute text-3xl cursor-move"
                            style={{ left: `${weed.x}%`, top: `${weed.y}%` }}
                        >
                            🌿❌
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Hole */}
                {holeDug && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gray-800 rounded-full shadow-inner"
                    />
                )}

                {/* Instructions */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-xl p-4 text-center">
                    {stones.length > 0 && (
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            اضغط على الحجارة لإزالتها ({stones.length} متبقية)
                        </p>
                    )}
                    {weeds.some(w => !w.removed) && (
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            اسحب الأعشاب لإزالتها ({weeds.filter(w => !w.removed).length} متبقية)
                        </p>
                    )}
                    {!holeDug && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDig}
                            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-lg shadow-lg"
                        >
                            اضغط للحفر ({digTaps}/3)
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Completion Animation */}
            {completed && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 360]
                        }}
                        transition={{ duration: 0.8 }}
                        className="text-8xl mb-4"
                    >
                        🎉
                    </motion.div>
                    <p className="text-3xl font-bold text-green-700">
                        ممتاز! التربة جاهزة للزراعة
                    </p>
                </motion.div>
            )}
        </div>
    );
}
