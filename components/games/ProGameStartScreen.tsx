'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Info, Trophy } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import FriendlyAnimal from '../cartoons/FriendlyAnimal';

interface ProGameStartScreenProps {
    title: string;
    description: string;
    goal: string;
    onStart: (level: 'easy' | 'medium' | 'hard') => void;
    levels?: { easy: boolean; medium: boolean; hard: boolean }; // Availability
}

export default function ProGameStartScreen({
    title,
    description,
    goal,
    onStart,
    levels = { easy: true, medium: true, hard: true }
}: ProGameStartScreenProps) {
    const [selectedLevel, setSelectedLevel] = useState<'easy' | 'medium' | 'hard'>('easy');

    // Entry animations for the UI itself are kept for polish, but active "animated icon" loops are removed.

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-sky-300 via-emerald-200 to-lime-200 p-8 shadow-2xl border-8 border-white" dir="rtl">

            {/* Background Ambience - STATIC */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-10 left-10 opacity-40"
                >
                    <div className="text-9xl">☁️</div>
                </div>
                <div
                    className="absolute top-20 right-20 opacity-40"
                >
                    <div className="text-8xl">☀️</div>
                </div>
            </div>

            <Card className="relative w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-4 border-green-400 overflow-hidden z-10">
                <div className="flex flex-col md:flex-row h-full">

                    {/* Left Side: Character & Welcome */}
                    <div className="w-full md:w-5/12 bg-gradient-to-b from-green-50 to-emerald-100 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                            className="z-10"
                        >
                            <EcoHero size="large" emotion="celebrating" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 flex gap-4"
                        >
                            <FriendlyAnimal type="rabbit" emotion="happy" size="medium" />
                            <FriendlyAnimal type="bird" emotion="excited" size="medium" />
                        </motion.div>

                        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-200 to-transparent"></div>
                    </div>

                    {/* Right Side: Game Info & Controls */}
                    <div className="w-full md:w-7/12 p-8 flex flex-col justify-center space-y-8">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Header */}
                            <div className="space-y-2 mb-6">
                                <motion.div variants={itemVariants}>
                                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 text-lg mb-2">مغامرة جديدة 🌟</Badge>
                                </motion.div>
                                <motion.h1
                                    variants={itemVariants}
                                    className="text-4xl md:text-5xl font-extrabold text-green-800 tracking-tight"
                                >
                                    {title}
                                </motion.h1>
                                <motion.p
                                    variants={itemVariants}
                                    className="text-xl text-gray-600 font-medium leading-relaxed"
                                >
                                    {description}
                                </motion.p>
                            </div>

                            {/* Goal */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-start gap-4 mb-8"
                            >
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Trophy className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-800 mb-1">الهدف التعليمي</h3>
                                    <p className="text-blue-700 text-sm">{goal}</p>
                                </div>
                            </motion.div>

                            {/* Level Selection */}
                            <div className="space-y-4 mb-8">
                                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    اختر مستوى الصعوبة:
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: 'easy', label: 'مستكشف 🟢', color: 'bg-green-100 border-green-500 text-green-700', disabled: !levels.easy },
                                        { id: 'medium', label: 'خبير 🟡', color: 'bg-yellow-100 border-yellow-500 text-yellow-700', disabled: !levels.medium },
                                        { id: 'hard', label: 'بطل 🔴', color: 'bg-red-100 border-red-500 text-red-700', disabled: !levels.hard },
                                    ].map((lvl) => (
                                        <motion.button
                                            key={lvl.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedLevel(lvl.id as any)}
                                            disabled={lvl.disabled}
                                            className={`
                        p-3 rounded-xl border-2 font-bold text-sm transition-all
                        ${selectedLevel === lvl.id
                                                    ? `${lvl.color} shadow-md ring-2 ring-offset-2 ring-transparent`
                                                    : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'}
                      `}
                                        >
                                            {lvl.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Start Button */}
                            <motion.div variants={itemVariants}>
                                <Button
                                    onClick={() => onStart(selectedLevel)}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl font-bold py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                                >
                                    <Play className="w-8 h-8 fill-current" />
                                    ابدأ المغامرة
                                </Button>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </Card>

            {/* Decorative Particles (Static) */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white/30 rounded-full blur-xl"
                    style={{
                        width: Math.random() * 100 + 50,
                        height: Math.random() * 100 + 50,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.3
                    }}
                />
            ))}

        </div>
    );
}
