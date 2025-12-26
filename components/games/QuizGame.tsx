'use client';

import { useState, useEffect } from 'react';
import { Game, gamesAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import CartoonScene from '@/components/cartoons/CartoonScene';
import CartoonReaction from '@/components/cartoons/CartoonReaction';
import EcoHero from '@/components/cartoons/EcoHero';

interface QuizGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

export default function QuizGame({ game, onComplete }: QuizGameProps) {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Array<{ questionId: string; answer: number; isCorrect: boolean }>>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(game.timeLimit || 0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showAnswerReaction, setShowAnswerReaction] = useState<{
    isCorrect: boolean;
    message: string;
    explanation?: string;
  } | null>(null);

  const questions = game.gameData?.questions || [];

  useEffect(() => {
    if (game.timeLimit > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion]);

  const handleAnswerSelect = (index: number) => {
    if (showResult || gameCompleted) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    setAnswers([...answers, {
      questionId: `q${currentQuestion}`,
      answer: selectedAnswer,
      isCorrect,
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Show cartoon reaction
    setShowAnswerReaction({
      isCorrect,
      message: isCorrect
        ? 'إجابة صحيحة! 🌟 أنت ذكي جداً!'
        : 'دعنا نفكر معاً... 💭',
      explanation: question.explanation
    });

    setTimeout(() => {
      setShowAnswerReaction(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        if (game.timeLimit > 0) {
          setTimeRemaining(game.timeLimit);
        }
      } else {
        handleSubmit();
      }
    }, 3000);
  };

  const handleSubmit = async () => {
    if (gameCompleted) return;

    setGameCompleted(true);
    const finalScore = selectedAnswer !== null &&
      selectedAnswer === questions[currentQuestion]?.correctAnswer
      ? score + 1
      : score;

    try {
      const percentage = Math.round((finalScore / questions.length) * 100);
      const passed = percentage >= 70;

      if (passed) {
        if (onComplete) {
          onComplete(game.points);
        } else {
          // Fallback if no onComplete provided
          await gamesAPI.submitScore(game._id, {
            score: finalScore,
            maxScore: questions.length,
            answers: answers.map((a, idx) => ({
              questionId: `q${idx}`,
              answer: a.answer,
              isCorrect: a.isCorrect,
              timestamp: new Date(),
            })),
            timeSpent: game.timeLimit > 0 ? game.timeLimit - timeRemaining : 0,
          });
        }
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
            message={`مرحباً! دعنا نختبر معلوماتك البيئية! 🌍

سنطرح عليك أسئلة ممتعة عن البيئة. اختر الإجابة الصحيحة! 🎯`}
            emotion="happy"
            onContinue={() => setShowIntro(false)}
            buttonText="ابدأ الاختبار"
            background="school"
          />
        </div>
      </div>
    );
  }

  // Show answer reaction overlay
  if (showAnswerReaction) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
        <div className="max-w-md w-full">
          <CartoonReaction
            isCorrect={showAnswerReaction.isCorrect}
            message={showAnswerReaction.message}
            explanation={showAnswerReaction.explanation}
            onContinue={() => setShowAnswerReaction(null)}
          />
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3] flex items-center justify-center p-4" dir="rtl">
        <div className="max-w-2xl w-full">
          <CartoonReaction
            isCorrect={passed}
            message={passed
              ? `رائع! حصلت على ${score} / ${questions.length} 🎉

لقد كسبت ${game.points} نقطة! أنت بطل بيئي! 🌟`
              : `حصلت على ${score} / ${questions.length}

لا بأس! يمكنك المحاولة مرة أخرى! 💪`}
            explanation={passed
              ? 'أنت تفهم الكثير عن البيئة! استمر في العمل الجيد! 🌍'
              : 'كل سؤال إضافي يساعدك على التعلم! حاول مرة أخرى! 📚'}
            onContinue={() => router.push('/student/dashboard')}
            showRetry={!passed}
            onRetry={() => {
              setGameCompleted(false);
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setAnswers([]);
              setScore(0);
              setShowIntro(true);
            }}
          />
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <Card><CardContent>No questions available</CardContent></Card>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3] p-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-xl border-2 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-100 to-amber-100 rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-green-700">
                السؤال {currentQuestion + 1} من {questions.length}
              </CardTitle>
              {game.timeLimit > 0 && (
                <Badge variant="outline" className="bg-white">⏱️ {timeRemaining} ثانية</Badge>
              )}
            </div>
            <CardDescription className="text-lg mt-4 text-gray-800 font-semibold">
              {question.question}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                return (
                  <Button
                    key={index}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`w-full justify-start text-right h-auto py-4 rounded-xl transition-all ${isSelected
                        ? isCorrect
                          ? 'bg-green-500 hover:bg-green-600 text-white border-2 border-green-600'
                          : 'bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-600'
                        : 'bg-white hover:bg-green-50 border-2 border-gray-300 hover:border-green-400'
                      }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={gameCompleted}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <span className="flex-1 text-base font-semibold">{option}</span>
                      {isSelected && (
                        <span className="text-2xl">
                          {isCorrect ? '✅' : '❌'}
                        </span>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null || gameCompleted}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg"
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? 'السؤال التالي →' : 'إنهاء الاختبار'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



