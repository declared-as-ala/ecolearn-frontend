'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import FriendlyAnimal from '../cartoons/FriendlyAnimal';
import CartoonReaction from '../cartoons/CartoonReaction';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: any;
}

interface DecisionGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  impact: number;
}

interface Scenario {
  id: string;
  question: string;
  choices: Choice[];
}

export default function DecisionGame({ game, onComplete }: DecisionGameProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showReaction, setShowReaction] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Default scenarios if not provided
  const defaultScenarios: Scenario[] = [
    {
      id: '1',
      question: 'أنت في الحديقة وترى صنبور ماء مفتوح. ماذا تفعل؟',
      choices: [
        {
          id: '1a',
          text: 'أغلق الصنبور فوراً',
          isCorrect: true,
          explanation: 'ممتاز! إغلاق الصنبور يوفر الماء ويحمي البيئة.',
          impact: 10,
        },
        {
          id: '1b',
          text: 'أتركه مفتوحاً',
          isCorrect: false,
          explanation: 'هذا يهدر الماء. حاول إغلاق الصنابير دائماً.',
          impact: -5,
        },
        {
          id: '1c',
          text: 'أخبر شخصاً آخر',
          isCorrect: true,
          explanation: 'جيد! إخبار الآخرين يساعد في حماية البيئة.',
          impact: 8,
        },
      ],
    },
    {
      id: '2',
      question: 'وجدت زجاجة بلاستيكية على الأرض. ماذا تفعل؟',
      choices: [
        {
          id: '2a',
          text: 'أرميها في سلة المهملات',
          isCorrect: true,
          explanation: 'رائع! رمي النفايات في مكانها الصحيح يحافظ على البيئة.',
          impact: 10,
        },
        {
          id: '2b',
          text: 'أتركها على الأرض',
          isCorrect: false,
          explanation: 'هذا يلوث البيئة. يجب رمي النفايات في مكانها الصحيح.',
          impact: -10,
        },
        {
          id: '2c',
          text: 'أضعها في صندوق إعادة التدوير',
          isCorrect: true,
          explanation: 'ممتاز! إعادة التدوير أفضل من رميها في القمامة.',
          impact: 15,
        },
      ],
    },
  ];

  const scenarios: Scenario[] = game.gameData?.scenarios || defaultScenarios;
  const current = scenarios[currentScenario];

  const handleChoiceSelect = (choiceId: string) => {
    if (gameCompleted) return;

    const choice = current.choices.find(c => c.id === choiceId);
    if (!choice) return;

    setSelectedChoices([...selectedChoices, choiceId]);

    // Show reaction
    setShowReaction({
      isCorrect: choice.isCorrect,
      message: choice.explanation,
    });

    // Update score
    if (choice.isCorrect) {
      setScore(score + choice.impact);
    }

    // Move to next scenario or complete
    setTimeout(() => {
      setShowReaction(null);
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
      } else {
        handleComplete();
      }
    }, 2500);
  };

  const handleComplete = () => {
    const points = Math.max(10, Math.min(game.points || 20, score));
    setGameCompleted(true);
    onComplete(points);
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setSelectedChoices([]);
    setGameCompleted(false);
    setScore(0);
    setShowReaction(null);
  };

  if (gameCompleted) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">رائع! 🎉</h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-2xl font-bold text-gray-800 mb-2">نقاطك: {score}</p>
          <p className="text-xl text-gray-600">لقد أكملت جميع المواقف!</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-300">
          <p className="text-green-700 font-bold text-lg mb-2">تهانينا! 🏆</p>
          <p className="text-green-600">لقد حصلت على {game.points || 20} نقطة!</p>
        </div>
        <Button onClick={handleRestart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
          <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
        </Button>
        <EcoHero size="large" emotion="celebrating" animation="bounce" className="mx-auto mt-6" />
      </Card>
    );
  }

  return (
    <Card className="border-4 border-purple-400 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-purple-100 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        {showReaction && (
          <div className="mb-6">
            <CartoonReaction
              isCorrect={showReaction.isCorrect}
              message={showReaction.message}
            />
          </div>
        )}

        <div className="bg-purple-50 rounded-xl p-4 mb-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="turtle" emotion="thinking" size="small" />
            <p className="font-bold text-purple-800">الموقف {currentScenario + 1} من {scenarios.length}:</p>
          </div>
          <p className="text-lg text-purple-700 font-semibold">{current.question}</p>
        </div>

        <div className="space-y-4 mb-6">
          {current.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoiceSelect(choice.id)}
              disabled={selectedChoices.includes(choice.id)}
              className={`w-full py-6 px-6 rounded-2xl font-bold text-lg transition-all transform text-right ${
                selectedChoices.includes(choice.id)
                  ? choice.isCorrect
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-red-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400 text-purple-800 hover:scale-105 active:scale-95'
              }`}
            >
              {choice.text}
            </button>
          ))}
        </div>

        <div className="bg-amber-100 rounded-xl p-4 border-2 border-amber-300 text-center">
          <p className="font-bold text-amber-800">
            النقاط الحالية: {score}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}



