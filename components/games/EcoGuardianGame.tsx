'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Droplets, Sprout, Shield, Frown, Smile, Heart, RefreshCcw, CheckCircle } from 'lucide-react';
import ProGameStartScreen from './ProGameStartScreen';
import { gamesAPI } from '@/lib/api';
import confetti from 'canvas-confetti';

interface GuardianProps {
    game: any;
    onComplete: (points: number) => void;
}

export default function EcoGuardianGame({ game, onComplete }: GuardianProps) {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start');
    const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [health, setHealth] = useState(50); // Environmental Health (0-100)
    const [issues, setIssues] = useState<any[]>([]); // Active issues
    const [tools, setTools] = useState<any[]>([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);

    // Game Data from props or defaults
    const data = game.gameData || {};
    const maxPoints = game.points || 100;

    useEffect(() => {
        if (gameState === 'playing') {
            const timer = setInterval(() => {
                // Decrease health based on active issues
                setHealth((prev) => Math.max(0, prev - (issues.length * 0.5)));
            }, 1000);

            // Check failure
            if (health <= 0) {
                setGameState('lost');
            }

            return () => clearInterval(timer);
        }
    }, [gameState, issues, health]);

    const startGame = (selectedLevel: 'easy' | 'medium' | 'hard') => {
        setLevel(selectedLevel);
        setGameState('playing');
        setHealth(50); // Start at 50%
        setScore(0);

        // Setup Level
        const levelConfig = getLevelConfig(selectedLevel);
        setIssues(levelConfig.initialIssues);
        setTools(levelConfig.tools);
    };

    const getLevelConfig = (lvl: string) => {
        // Defines issues and tools based on level
        const allTools = [
            { id: 'water', label: 'تنظيف المياه', icon: <Droplets className="w-6 h-6 text-blue-500" />, type: 'water_pollution' },
            { id: 'plant', label: 'إعادة التشجير', icon: <Sprout className="w-6 h-6 text-green-500" />, type: 'deforestation' },
            { id: 'law', label: 'منع الصيد', icon: <Shield className="w-6 h-6 text-red-500" />, type: 'poaching' },
        ];

        const allIssues = [
            { id: 1, type: 'water_pollution', x: 20, y: 70, icon: '🛢️', solved: false },
            { id: 2, type: 'deforestation', x: 70, y: 40, icon: '🪓', solved: false },
            { id: 3, type: 'poaching', x: 40, y: 50, icon: '🕸️', solved: false },
        ];

        if (lvl === 'easy') return { initialIssues: [allIssues[1]], tools: [allTools[1]] };
        if (lvl === 'medium') return { initialIssues: [allIssues[0], allIssues[1]], tools: [allTools[0], allTools[1]] };
        return { initialIssues: allIssues, tools: allTools };
    };

    const handleToolDrop = (toolId: string, issueId: number) => {
        const tool = tools.find(t => t.id === toolId);
        const issue = issues.find(i => i.id === issueId);

        if (tool && issue && tool.type === issue.type) {
            // Correct!
            setIssues(prev => prev.filter(i => i.id !== issueId));
            setHealth(prev => Math.min(100, prev + 25));
            setScore(prev => prev + 20);
            setFeedback('أحسنت! 🌟');
            setTimeout(() => setFeedback(null), 1500);

            // Check Win
            if (issues.length === 1) { // This was the last one
                handleWin();
            }
        } else {
            // Incorrect - No points lost, just feedback
            setFeedback('هذه الأداة لا تصلح هنا 🤔');
            setTimeout(() => setFeedback(null), 1500);
        }
    };

    const handleWin = () => {
        setGameState('won');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        if (onComplete) onComplete(maxPoints);
    };

    if (gameState === 'start') {
        return (
            <ProGameStartScreen
                title={game.title}
                description={game.description}
                goal="أعد التوازن للنظام البيئي المنهار قبل فوات الأوان!"
                onStart={startGame}
                levels={{ easy: true, medium: true, hard: true }}
            />
        );
    }

    if (gameState === 'won') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] bg-green-50 rounded-3xl p-8 text-center space-y-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500">
                    <CheckCircle className="w-32 h-32" />
                </motion.div>
                <h2 className="text-4xl font-bold text-green-800">أنت الحارس الحقيقي! 🛡️🌍</h2>
                <p className="text-gray-600 text-xl">لقد أنقذت البيئة وأعدت لها الحياة.</p>
                <div className="bg-white px-8 py-4 rounded-xl shadow-lg border-2 border-green-200">
                    <span className="text-2xl font-bold text-green-600">+{maxPoints} نقطة</span>
                </div>
                <Button onClick={() => setGameState('start')} className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-xl">
                    العب مستوى آخر
                </Button>
            </div>
        );
    }

    if (gameState === 'lost') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] bg-red-50 rounded-3xl p-8 text-center space-y-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-500">
                    <Frown className="w-32 h-32" />
                </motion.div>
                <h2 className="text-4xl font-bold text-red-800">انهار النظام البيئي 💔</h2>
                <p className="text-gray-600 text-xl">انخفضت صحة البيئة لدرجة خطيرة. حاول مرة أخرى بسرعة أكبر!</p>
                <Button onClick={() => startGame(level)} className="mt-4 bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-xl">
                    <RefreshCcw className="mr-2 w-6 h-6" /> المحاولة مجدداً
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto space-y-4" dir="rtl">
            {/* HUD */}
            <Card className="p-4 flex justify-between items-center bg-white shadow-md border-b-4 border-gray-100 rounded-2xl">
                <div className="flex items-center gap-4 w-1/3">
                    <Heart className={`w-8 h-8 ${health < 30 ? 'text-red-500' : 'text-green-500'}`} fill="currentColor" />
                    <div className="w-full">
                        <div className="flex justify-between text-sm mb-1 font-bold text-gray-600">
                            <span>صحة البيئة</span>
                            <span>{Math.round(health)}%</span>
                        </div>
                        <Progress value={health} className={`h-4 ${health < 30 ? 'bg-red-100' : 'bg-green-100'}`} />
                    </div>
                </div>
                <div className="text-2xl font-bold text-gray-700">المستوى: {level === 'easy' ? 'مستكشف' : level === 'medium' ? 'خبير' : 'بطل'}</div>
                <div className="w-1/3 text-left">
                    {feedback && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block font-bold">{feedback}</motion.div>}
                </div>
            </Card>

            {/* Game Area */}
            <div className="relative w-full h-[500px] bg-gradient-to-b from-blue-200 to-green-100 rounded-3xl border-4 border-green-300 overflow-hidden shadow-inner cursor-default">
                {/* Background Scenery - Changes based on health */}
                <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{ filter: `grayscale(${100 - health}%) satutate(${health}%)` }}
                >
                    <div className="absolute bottom-0 w-full h-1/3 bg-[#8bc34a]"></div> {/* Grass */}
                    <div className="absolute top-10 left-10 text-6xl opacity-60">☁️</div>
                </div>

                {/* Issues to Fix */}
                <AnimatePresence>
                    {issues.map((issue) => (
                        <motion.div
                            key={issue.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute flex flex-col items-center justify-center"
                            style={{ left: `${issue.x}%`, top: `${issue.y}%` }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const toolId = e.dataTransfer.getData('toolId');
                                handleToolDrop(toolId, issue.id);
                            }}
                        >
                            <div className="text-6xl drop-shadow-lg">{issue.icon}</div>
                            <div className="bg-white/80 px-2 py-1 rounded-full text-xs font-bold mt-1 text-red-600">يحتاج إصلاح!</div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Success Effects */}
                {issues.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-green-500/20 pointer-events-none"
                    >
                        <div className="text-center">
                            <h2 className="text-6xl font-bold text-white drop-shadow-xl mb-4">بيئة نظيفة! ✨</h2>
                            <Smile className="w-32 h-32 text-white mx-auto" />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Tools Deck */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-gray-100">
                <h3 className="text-center font-bold text-gray-500 mb-4">اسحب الحل المناسب للمشكلة 👇</h3>
                <div className="flex justify-center gap-6">
                    {tools.map((tool) => (
                        <div
                            key={tool.id}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData('toolId', tool.id)}
                            className="flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                        >
                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-gray-200 shadow-sm hover:border-green-400 hover:bg-green-50">
                                {tool.icon}
                            </div>
                            <span className="font-bold text-sm text-gray-700">{tool.label}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
