'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface MiniChallengeProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onComplete: () => void;
}

export default function MiniChallenge({
  question,
  options,
  correctAnswer,
  explanation,
  onComplete,
}: MiniChallengeProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    const correct = index === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <Card className="border-2 border-yellow-400 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <AlertCircle className="w-5 h-5" />
          Mini Challenge
        </CardTitle>
        <CardDescription className="text-yellow-700">
          Let's reinforce what you learned!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-semibold text-lg">{question}</p>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? (isCorrect ? 'default' : 'destructive') : 'outline'}
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => handleAnswer(index)}
              disabled={showResult}
            >
              <div className="flex items-center gap-2 w-full">
                {selectedAnswer === index && (
                  isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )
                )}
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct! Great job!' : 'Not quite right, but keep learning!'}
            </p>
            <p className="text-sm mt-2 text-gray-700">{explanation}</p>
            <Button onClick={handleContinue} className="mt-4 w-full">
              Continue
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}




