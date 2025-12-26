'use client';

import { useState } from 'react';
import { Game, gamesAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import CartoonScene from '@/components/cartoons/CartoonScene';
import CartoonReaction from '@/components/cartoons/CartoonReaction';

interface ScenarioGameProps {
  game: Game;
}

export default function ScenarioGame({ game }: ScenarioGameProps) {
  const router = useRouter();
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [lastChoiceReaction, setLastChoiceReaction] = useState<{
    isCorrect: boolean;
    message: string;
    explanation?: string;
  } | null>(null);

  const scenario = game.gameData?.scenario || '';
  const choices = game.gameData?.choices || [];

  const handleChoiceSelect = (choiceId: string) => {
    if (gameCompleted) return;
    
    const choice = choices.find((c: any) => c.id === choiceId);
    const isCorrect = (choice?.impact || 0) > 0;
    
    setSelectedChoices([...selectedChoices, choiceId]);
    
    // Show immediate cartoon reaction
    setLastChoiceReaction({
      isCorrect,
      message: isCorrect 
        ? 'اختيار ممتاز! 🌟 هذا القرار يساعد كوكبنا!' 
        : 'دعنا نفكر معاً... 💭',
      explanation: choice?.explanation || (isCorrect 
        ? 'أنت بطل بيئي! 🌍' 
        : 'يمكننا دائماً الاختيار الأفضل لحماية البيئة.')
    });
    
    // Auto-hide reaction after 3 seconds
    setTimeout(() => {
      setLastChoiceReaction(null);
    }, 3000);
  };

  const handleSubmit = async () => {
    let totalImpact = 0;
    selectedChoices.forEach((choiceId) => {
      const choice = choices.find((c: any) => c.id === choiceId);
      if (choice) {
        totalImpact += choice.impact || 0;
      }
    });

    // Score is based on positive impact
    const maxImpact = choices
      .filter((c: any) => c.impact > 0)
      .reduce((sum: number, c: any) => sum + c.impact, 0);
    const scoreValue = Math.max(0, Math.round((totalImpact / maxImpact) * choices.length));

    setScore(scoreValue);
    setGameCompleted(true);

    try {
      await gamesAPI.submitScore(game._id, {
        score: scoreValue,
        maxScore: choices.length,
        answers: selectedChoices.map((choiceId) => {
          const choice = choices.find((c: any) => c.id === choiceId);
          return {
            questionId: choiceId,
            answer: choice?.text || '',
            isCorrect: (choice?.impact || 0) > 0,
          };
        }),
      });
      
      // Update user points if game passed
      const percentage = Math.round((scoreValue / choices.length) * 100);
      const passed = percentage >= 70;
      
      if (passed && user && updateUser) {
        const newPoints = (user.points || 0) + game.points;
        const newLevel = Math.floor(newPoints / 100);
        updateUser({
          ...user,
          points: newPoints,
          level: newLevel
        });
        
        // Set flag to trigger dashboard refresh
        localStorage.setItem('ecolearn_refresh_dashboard', Date.now().toString());
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  // Show intro cartoon scene
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3] flex items-center justify-center p-4" dir="rtl">
        <div className="max-w-2xl w-full">
          <CartoonScene
            type="game-scenario"
            character="both"
            message={`${scenario}

اختر القرار الصحيح لحماية كوكبنا! 🌍`}
            emotion="explaining"
            onContinue={() => setShowIntro(false)}
            buttonText="ابدأ اللعبة"
            background="park"
          />
        </div>
      </div>
    );
  }

  // Show completion with cartoon
  if (gameCompleted) {
    const percentage = Math.round((score / choices.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3] flex items-center justify-center p-4" dir="rtl">
        <div className="max-w-2xl w-full">
          <CartoonReaction
            isCorrect={passed}
            message={passed 
              ? `ممتاز! حصلت على ${score} / ${choices.length} 🎉

لقد كسبت ${game.points} نقطة! أنت بطل بيئي حقيقي! 🌟`
              : `حصلت على ${score} / ${choices.length}

لا بأس! يمكنك المحاولة مرة أخرى لتحسين نتائجك! 💪`}
            explanation={passed 
              ? 'أنت تفهم كيفية حماية البيئة! استمر في العمل الجيد! 🌍'
              : 'كل خطوة نحو التعلم مهمة! حاول مرة أخرى وستتحسن! 📚'}
            onContinue={() => router.push('/student/dashboard')}
            showRetry={!passed}
            onRetry={() => {
              setGameCompleted(false);
              setSelectedChoices([]);
              setScore(0);
              setShowIntro(true);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3] p-4" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Show cartoon reaction overlay if last choice was made */}
        {lastChoiceReaction && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full">
              <CartoonReaction
                isCorrect={lastChoiceReaction.isCorrect}
                message={lastChoiceReaction.message}
                explanation={lastChoiceReaction.explanation}
                onContinue={() => setLastChoiceReaction(null)}
                showButton={true}
              />
            </div>
          </div>
        )}

        <Card className="bg-white shadow-xl border-2 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-100 to-amber-100 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-green-700">🎮 لعبة المواقف</CardTitle>
            <CardDescription className="text-base text-gray-700">اختر القرارات الصحيحة لحماية كوكبنا</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Scenario display with cartoon style */}
            <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-xl border-2 border-blue-300">
              <p className="text-lg font-semibold text-gray-800 whitespace-pre-wrap leading-relaxed">
                {scenario}
              </p>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-gray-800 mb-4">خياراتك:</h3>
              {choices.map((choice: any) => {
                const isSelected = selectedChoices.includes(choice.id);
                const isCorrectChoice = (choice?.impact || 0) > 0;
                return (
                  <Button
                    key={choice.id}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`w-full justify-start text-right h-auto py-4 rounded-xl transition-all ${
                      isSelected 
                        ? isCorrectChoice
                          ? 'bg-green-500 hover:bg-green-600 text-white border-2 border-green-600'
                          : 'bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-600'
                        : 'bg-white hover:bg-green-50 border-2 border-gray-300 hover:border-green-400'
                    }`}
                    onClick={() => handleChoiceSelect(choice.id)}
                    disabled={gameCompleted}
                  >
                    <div className="flex-1 text-right">
                      <p className="font-semibold text-base">{choice.text}</p>
                      {isSelected && choice.explanation && (
                        <p className="text-sm mt-2 opacity-90">
                          {choice.explanation}
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <span className="mr-2 text-2xl">
                        {isCorrectChoice ? '✅' : '⚠️'}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={selectedChoices.length === 0 || gameCompleted}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg"
              size="lg"
            >
              تأكيد الاختيارات
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



