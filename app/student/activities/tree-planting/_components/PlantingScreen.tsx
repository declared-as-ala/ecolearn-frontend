'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlantingScreenProps {
    onNext: () => void;
}

export default function PlantingScreen({ onNext }: PlantingScreenProps) {
    const [seedlingInHole, setSeedlingInHole] = useState(false);
    const [soilCovered, setSoilCovered] = useState(false);
    const [soilPressed, setSoilPressed] = useState(false);
    const [treePlanted, setTreePlanted] = useState(false);

    const handleSeedlingDrop = () => {
        setSeedlingInHole(true);
    };

    const handleCoverSoil = () => {
        setSoilCovered(true);
    };

    const handlePressSoil = () => {
        setSoilPressed(true);
        setTimeout(() => {
            setTreePlanted(true);
            setTimeout(() => onNext(), 2000);
        }, 500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                زراعة الشجرة
            </h2>

            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl shadow-2xl p-8 mb-6 relative min-h-[500px]">
                {/* Soil Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-300 rounded-3xl" />

                {/* Hole */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gray-800 rounded-full shadow-inner" />

                {/* Seedling - Draggable */}
                {!seedlingInHole && (
                    <motion.div
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        onDragEnd={(e, info) => {
                            const holeCenterX = window.innerWidth / 2;
                            const holeCenterY = window.innerHeight / 2;
                            const distance = Math.sqrt(
                                Math.pow(info.point.x - holeCenterX, 2) +
                                Math.pow(info.point.y - holeCenterY, 2)
                            );
                            if (distance < 100) {
                                handleSeedlingDrop();
                            }
                        }}
                        className="absolute left-1/4 top-1/4 cursor-move"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="text-6xl">🌱</div>
                    </motion.div>
                )}

                {/* Seedling in Hole */}
                {seedlingInHole && !soilCovered && (
                    <motion.div
                        initial={{ scale: 0, y: -50 }}
                        animate={{ scale: 1, y: 0 }}
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="text-6xl">🌱</div>
                    </motion.div>
                )}

                {/* Soil Cover */}
                {soilCovered && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-400 rounded-full"
                    />
                )}

                {/* Tree - Final State */}
                {treePlanted && (
                    <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
                            className="text-8xl"
                        >
                            🌳
                        </motion.div>
                    </motion.div>
                )}

                {/* Instructions */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-xl p-4 text-center space-y-2">
                    {!seedlingInHole && (
                        <p className="text-lg font-bold text-gray-700">
                            اسحب الشتلة إلى الحفرة
                        </p>
                    )}
                    {seedlingInHole && !soilCovered && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCoverSoil}
                            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-lg shadow-lg"
                        >
                            تغطية الجذور بالتربة
                        </motion.button>
                    )}
                    {soilCovered && !soilPressed && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePressSoil}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-lg shadow-lg"
                        >
                            تثبيت التربة
                        </motion.button>
                    )}
                    {treePlanted && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl font-bold text-green-700"
                        >
                            🎉 تم زراعة الشجرة بنجاح!
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
}
