'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from './cartoons/EcoHero';

interface Exercise {
    id: string;
    type: string;
    question: string;
    options?: string[];
    correctAnswer: any;
    points: number;
}

interface SimpleQuizProps {
    exercise: Exercise;
    onComplete: (points: number) => void;
    isCompleted?: boolean;
}

export default function SimpleQuiz({ exercise, onComplete, isCompleted = false }: SimpleQuizProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleOptionClick = (option: string) => {
        if (isCompleted || showFeedback) return;

        setSelectedOption(option);
        const correct = option === exercise.correctAnswer;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setTimeout(() => {
                onComplete(exercise.points);
            }, 1500);
        }
    };

    if (isCompleted) {
        return (
            <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                        <div>
                            <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
                            <p className="text-green-600">حصلت على {exercise.points} نقطة ✨</p>
                        </div>
                    </div>
                    <EcoHero size="medium" emotion="happy" animation="bounce" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-4 border-blue-200 rounded-3xl overflow-hidden shadow-xl">
            <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-blue-900 leading-tight">
                    {exercise.question}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                    {exercise.options?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            disabled={showFeedback}
                            className={`p-5 rounded-2xl text-lg font-bold transition-all transform active:scale-95 text-right flex items-center justify-between border-4 ${showFeedback
                                    ? option === exercise.correctAnswer
                                        ? 'border-green-500 bg-green-50 text-green-800'
                                        : option === selectedOption
                                            ? 'border-red-500 bg-red-50 text-red-800'
                                            : 'border-gray-100 bg-white opacity-50'
                                    : 'border-blue-100 bg-white hover:border-blue-400 hover:bg-blue-50 text-gray-700'
                                }`}
                        >
                            <span>{index + 1}. {option}</span>
                            {showFeedback && option === exercise.correctAnswer && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                            {showFeedback && option === selectedOption && option !== exercise.correctAnswer && <XCircle className="w-6 h-6 text-red-500" />}
                        </button>
                    ))}
                </div>

                {showFeedback && (
                    <div className={`mt-8 p-4 rounded-2xl text-center font-bold text-xl animate-bounce ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isCorrect ? 'إجابة رائعة! + ' + exercise.points + ' نقطة 🌟' : 'حاول مرة أخرى! المرة القادمة ستنجح بالتأكيد 💪'}
                        {!isCorrect && (
                            <Button
                                variant="ghost"
                                className="mt-2 block mx-auto text-blue-600 hover:text-blue-800 underline"
                                onClick={() => { setShowFeedback(false); setSelectedOption(null); }}
                            >
                                إعادة المحاولة
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
