'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight } from 'lucide-react';
import ProGameStartScreen from './ProGameStartScreen';
import confetti from 'canvas-confetti';

interface DecisionProps {
    game: any;
    onComplete: (points: number) => void;
}

export default function EcoDecisionGame({ game, onComplete }: DecisionProps) {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'result' | 'finished'>('start');
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [score, setScore] = useState(0);

    const maxPoints = game.points || 100;

    // Mock Scenarios for different levels
    const scenarios = [
        {
            id: 1,
            title: 'الغابة القديمة',
            description: 'شركة تريد قطع جزء من الغابة لبناء مصنع ألعاب كبير. المصنع سيوفر وظائف وألعاب، لكنه سيدمر بيوت الحيوانات.',
            image: '🌳',
            choices: [
                { id: 'build', text: 'بناء المصنع (نحتاج ألعاب!)', type: 'bad', consequence: 'اختفت الحيوانات وأصبح الهواء ملوثاً بالدخان 🏭🍂', visual: '🏭' },
                { id: 'protect', text: 'حماية الغابة (الأشجار أهم)', type: 'good', consequence: 'بقيت الحيوانات سعيدة، والهواء نقي للجميع! 🌲🐿️', visual: '🌳🏡' }
            ]
        },
        {
            id: 2,
            title: 'النهر المجاور',
            description: 'لاحظت أن بعض الناس يرمون النفايات في النهر. هل تبلغ عنهم أم تتجاهل الأمر لكي لا تقع في مشاكل؟',
            image: '🌊',
            choices: [
                { id: 'ignore', text: 'أتجاهل الأمر', type: 'bad', consequence: 'ماتت الأسماك وأصبحت مياه النهر سامة وغير صالحة للشرب ☠️🐟', visual: '🛢️' },
                { id: 'report', text: 'أبلغ وأساعد في التنظيف', type: 'good', consequence: 'عاد النهر صافياً وعادت الحياة إليه! 💧✨', visual: '🏊‍♂️🐠' }
            ]
        },
        {
            id: 3,
            title: 'وسيلة النقل',
            description: 'المدرسة قريبة. هل تذهب بالسيارة (أسرع ومريح) أم بالدراجة/مشياً (متعب قليلاً)؟',
            image: '🚗',
            choices: [
                { id: 'car', text: 'السيارة (مكيف وراحة)', type: 'bad', consequence: 'زاد الزحام وزاد دخان السيارات في مدينتك 🚗💨', visual: '😷' },
                { id: 'bike', text: 'الدراجة أو المشي', type: 'good', consequence: 'صحة أفضل لك، وهواء أنظف لمدينتك! 🚲🏃', visual: '🌟🏙️' }
            ]
        }
    ];

    const [choicesMade, setChoicesMade] = useState<any[]>([]);

    const startGame = (lvl: 'easy' | 'medium' | 'hard') => {
        setLevel(lvl);
        setGameState('playing');
        setCurrentScenarioIndex(0);
        setScore(0);
        setChoicesMade([]);
    };

    const handleChoice = (choice: any) => {
        // Immediate feedback logic
        const isGood = choice.type === 'good';
        if (isGood) setScore(prev => prev + 30);

        const newChoices = [...choicesMade, { ...scenarios[currentScenarioIndex], chosen: choice }];
        setChoicesMade(newChoices);

        // Show mini result for a moment
        setGameState('result');
    };

    const nextScenario = () => {
        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
            setGameState('playing');
        } else {
            finishGame();
        }
    };

    const finishGame = () => {
        setGameState('finished');
        if (score > 60) {
            confetti({ particleCount: 200, spread: 100 });
            if (onComplete) onComplete(maxPoints);
        }
    };

    if (gameState === 'start') {
        return (
            <ProGameStartScreen
                title={game.title}
                description={game.description}
                goal="اتخذ القرارات الصائبة لحماية كوكبنا!"
                onStart={startGame}
            />
        );
    }

    // Result Feedback Screen (Between Decisions)
    if (gameState === 'result') {
        const lastChoice = choicesMade[choicesMade.length - 1];
        const isGood = lastChoice.chosen.type === 'good';

        return (
            <div className={`w-full h-[600px] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-8 ${isGood ? 'bg-green-50' : 'bg-gray-100'}`} dir="rtl">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-9xl mb-4">
                    {lastChoice.chosen.visual}
                </motion.div>
                <div>
                    <h2 className={`text-4xl font-bold mb-4 ${isGood ? 'text-green-700' : 'text-gray-700'}`}>
                        {isGood ? 'قرار حكيم! 🌟' : 'تأثير سلبي... 🌑'}
                    </h2>
                    <p className="text-2xl text-gray-600 max-w-2xl leading-relaxed">
                        {lastChoice.chosen.consequence}
                    </p>
                </div>
                <Button
                    onClick={nextScenario}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-6 rounded-full shadow-xl"
                >
                    المتابعة <ArrowRight className="mr-2" />
                </Button>
            </div>
        )
    }

    if (gameState === 'finished') {
        const isWin = score >= 60;
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] bg-indigo-50 rounded-3xl p-8 text-center space-y-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-indigo-500 text-9xl">
                    {isWin ? '🌍' : '🏚️'}
                </motion.div>
                <h2 className="text-4xl font-bold text-indigo-900">
                    {isWin ? 'أنت قائد بيئي بامتياز! 🌱' : 'قراراتك تحتاج للتفكير...'}
                </h2>
                <p className="text-gray-600 text-xl">
                    {isWin ? 'قراراتك ساهمت في بناء مستقبل مشرق للجميع.' : 'للأسف، القرارات الخاطئة أدت لتدهور البيئة. حاول مرة أخرى!'}
                </p>
                {isWin && (
                    <div className="bg-white px-8 py-4 rounded-xl shadow-lg border-2 border-indigo-200">
                        <span className="text-2xl font-bold text-indigo-600">+{maxPoints} نقطة</span>
                    </div>
                )}
                <Button onClick={() => startGame(level)} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-xl">
                    إعادة المحاولة
                </Button>
            </div>
        );
    }

    const currentScenario = scenarios[currentScenarioIndex];

    return (
        <div className="w-full max-w-5xl mx-auto min-h-[600px] flex items-stretch rounded-3xl overflow-hidden shadow-2xl border-4 border-white" dir="rtl">

            {/* Scenario Side */}
            <div className="w-1/2 bg-blue-50 p-8 flex flex-col justify-center items-center text-center border-l-2 border-blue-100">
                <div className="text-9xl mb-8">{currentScenario.image}</div>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">{currentScenario.title}</h2>
                <p className="text-xl text-blue-800 leading-relaxed font-medium">
                    {currentScenario.description}
                </p>
            </div>

            {/* Choices Side */}
            <div className="w-1/2 bg-white p-8 flex flex-col justify-center gap-6">
                <h3 className="text-center text-gray-400 font-bold mb-4 uppercase tracking-widest">ماذا ستفعل؟</h3>
                {currentScenario.choices.map((choice) => (
                    <motion.button
                        key={choice.id}
                        whileHover={{ scale: 1.02, x: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChoice(choice)}
                        className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200 p-6 text-right shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
                    >
                        <div className="relative z-10 flex items-center justify-between">
                            <span className="font-bold text-lg text-gray-700 group-hover:text-blue-700 transition-colors">
                                {choice.text}
                            </span>
                            <ArrowRight className="text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0" />
                        </div>
                        <div className="absolute inset-0 bg-blue-50 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </motion.button>
                ))}
            </div>

        </div>
    );
}
