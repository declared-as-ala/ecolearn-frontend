'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check, RefreshCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProGameStartScreen from './ProGameStartScreen';
import confetti from 'canvas-confetti';

interface LifeChainProps {
    game: any;
    onComplete: (points: number) => void;
}

interface ChainItem {
    id: string;
    label: string;
    icon: string;
    type: 'sun' | 'producer' | 'herbivore' | 'carnivore' | 'decomposer';
}

export default function LifeChainGame({ game, onComplete }: LifeChainProps) {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won'>('start');
    const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [slots, setSlots] = useState<(ChainItem | null)[]>([]);
    const [availableItems, setAvailableItems] = useState<ChainItem[]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);

    const maxPoints = game.points || 100;

    // Level Configurations
    const getLevelConfig = (lvl: string) => {
        const items: ChainItem[] = [
            { id: 'sun', label: 'الشمس', icon: '☀️', type: 'sun' },
            { id: 'plant', label: 'العشب', icon: '🌱', type: 'producer' },
            { id: 'rabbit', label: 'الأرنب', icon: '🐇', type: 'herbivore' },
            { id: 'fox', label: 'الثعلب', icon: '🦊', type: 'carnivore' },
            { id: 'worm', label: 'الديدان', icon: '🪱', type: 'decomposer' },
            { id: 'hawk', label: 'الصقر', icon: '🦅', type: 'carnivore' },
            { id: 'frog', label: 'الضفدع', icon: '🐸', type: 'carnivore' },
            { id: 'insect', label: 'الحشرة', icon: '🦟', type: 'herbivore' },
        ];

        if (lvl === 'easy') {
            // Linear: Sun -> Plant -> Herbivore -> Carnivore
            return {
                slotCount: 4,
                items: [items[0], items[1], items[2], items[3]],
                validation: ['sun', 'producer', 'herbivore', 'carnivore']
            };
        } else if (lvl === 'medium') {
            // Sun -> Plant -> Insect -> Frog -> Hawk
            return {
                slotCount: 5,
                items: [items[0], items[1], items[7], items[6], items[5]],
                validation: ['sun', 'producer', 'herbivore', 'carnivore', 'carnivore']
            }
        } else {
            // Full loop: Sun -> Plant -> Rabbit -> Fox -> Decomposer
            return {
                slotCount: 5,
                items: [items[0], items[1], items[2], items[3], items[4]],
                validation: ['sun', 'producer', 'herbivore', 'carnivore', 'decomposer']
            }
        }
    };

    const [currentConfig, setCurrentConfig] = useState<any>(null);

    const startGame = (lvl: 'easy' | 'medium' | 'hard') => {
        setLevel(lvl);
        const config = getLevelConfig(lvl);
        setCurrentConfig(config);
        setSlots(new Array(config.slotCount).fill(null));
        // Shuffle available items
        setAvailableItems([...config.items].sort(() => Math.random() - 0.5));
        setGameState('playing');
        setFeedback(null);
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData('itemId');
        const item = availableItems.find(i => i.id === itemId);

        if (item) {
            const newSlots = [...slots];
            newSlots[index] = item;
            setSlots(newSlots);
            setAvailableItems(prev => prev.filter(i => i.id !== itemId));
            checkWinCondition(newSlots);
        }
    };

    const checkWinCondition = (currentSlots: (ChainItem | null)[]) => {
        // Logic: Validate chain order against expected types
        if (currentSlots.some(s => s === null)) return; // Not full yet

        const isValid = currentSlots.every((slot, i) => slot?.type === currentConfig.validation[i]);

        if (isValid) {
            setFeedback('رائع! سلسلة متكاملة ✨');
            handleWin();
        } else {
            setFeedback('هناك خطأ في الترتيب. تذكر: الطاقة تبدأ من الشمس، ثم النبات...');
            // Optional: Return items to pool after delay or let user fix manually?
            // For pro vibe, we just show feedback, user drags items out or swaps?
            // Simplification: We allow replacing.
        }
    };

    const removeItem = (index: number) => {
        const item = slots[index];
        if (item) {
            const newSlots = [...slots];
            newSlots[index] = null;
            setSlots(newSlots);
            setAvailableItems(prev => [...prev, item]);
            setFeedback(null);
        }
    }

    const handleWin = () => {
        confetti({ particleCount: 150, spread: 80 });
        setTimeout(() => {
            setGameState('won');
            if (onComplete) onComplete(maxPoints);
        }, 1000);
    };

    if (gameState === 'start') {
        return (
            <ProGameStartScreen
                title={game.title}
                description={game.description}
                goal="بناء سلسلة غذائية صحيحة لضمان بقاء الكائنات الحية!"
                onStart={startGame}
            />
        );
    }

    if (gameState === 'won') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] bg-blue-50 rounded-3xl p-8 text-center space-y-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-blue-500">
                    <CheckCircle className="w-32 h-32" />
                </motion.div>
                <h2 className="text-4xl font-bold text-blue-800">أنت مهندس الحياة! 🧬🧠</h2>
                <p className="text-gray-600 text-xl">لقد فهمت كيف تنتقل الطاقة بين الكائنات بامتياز.</p>
                <div className="bg-white px-8 py-4 rounded-xl shadow-lg border-2 border-blue-200">
                    <span className="text-2xl font-bold text-blue-600">+{maxPoints} نقطة</span>
                </div>
                <Button onClick={() => setGameState('start')} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-xl">
                    العب مرة أخرى
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 min-h-[600px] flex flex-col" dir="rtl">

            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">رتب الكائنات لبناء سلسلة الحياة</h2>
                <p className="text-gray-500">من أين تبدأ الطاقة؟ ومن يأكل من؟ 🤔</p>
            </div>

            {/* Feedback Area */}
            <div className="h-8 text-center">
                {feedback && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`inline-block px-4 py-2 rounded-full font-bold ${feedback.includes('رائع') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {feedback}
                    </motion.div>
                )}
            </div>

            {/* Chain Slots */}
            <div className="flex-1 flex items-center justify-center gap-2 md:gap-4 overflow-x-auto p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border-4 border-dashed border-blue-200">
                {slots.map((slot, i) => (
                    <div key={i} className="flex items-center">
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, i)}
                            onClick={() => removeItem(i)}
                            className={`
                            w-24 h-32 md:w-32 md:h-40 rounded-2xl border-4 flex flex-col items-center justify-center cursor-pointer transition-all
                            ${slot ? 'bg-white border-blue-500 shadow-lg scale-105' : 'bg-white/50 border-gray-300 border-dashed hover:bg-white'}
                        `}
                        >
                            {slot ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                                    <div className="text-5xl mb-2">{slot.icon}</div>
                                    <div className="font-bold text-sm text-gray-700">{slot.label}</div>
                                </motion.div>
                            ) : (
                                <span className="text-gray-300 text-3xl opacity-50">{i + 1}</span>
                            )}
                        </div>
                        {/* Arrow connector */}
                        {i < slots.length - 1 && (
                            <div className="text-gray-300">
                                <ArrowLeft className="w-8 h-8" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Inventory */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border-t-4 border-gray-100">
                <h3 className="text-center font-bold text-gray-400 mb-4 text-sm">اسحب الكائنات إلى السلسلة بالأعلى</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <AnimatePresence>
                        {availableItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                draggable
                                onDragStart={(e: any) => e.dataTransfer.setData('itemId', item.id)}
                                className="w-24 h-24 bg-gray-50 rounded-2xl border-2 border-gray-200 flex flex-col items-center justify-center cursor-grab hover:bg-blue-50 hover:border-blue-300 shadow-sm"
                            >
                                <div className="text-4xl mb-1">{item.icon}</div>
                                <span className="font-bold text-xs text-gray-600">{item.label}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

        </div>
    );
}
