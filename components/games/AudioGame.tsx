'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw, Volume2 } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import FriendlyAnimal from '../cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: any;
}

interface AudioGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

interface SoundOption {
  id: string;
  name: string;
  icon: string;
  sound: string; // Sound description or emoji
}

export default function AudioGame({ game, onComplete }: AudioGameProps) {
  const [currentSound, setCurrentSound] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');

  const soundPairs: { sound: SoundOption; correct: SoundOption; options: SoundOption[] }[] = game.gameData?.sounds || [
    {
      sound: { id: 'rain', name: 'صوت المطر', icon: '🌧️', sound: 'drip drop' },
      correct: { id: 'rain', name: 'مطر', icon: '🌧️', sound: '' },
      options: [
        { id: 'rain', name: 'مطر', icon: '🌧️', sound: '' },
        { id: 'wind', name: 'رياح', icon: '💨', sound: '' },
        { id: 'thunder', name: 'رعد', icon: '⚡', sound: '' },
      ],
    },
    {
      sound: { id: 'wind', name: 'صوت الرياح', icon: '💨', sound: 'whoosh' },
      correct: { id: 'wind', name: 'رياح', icon: '💨', sound: '' },
      options: [
        { id: 'rain', name: 'مطر', icon: '🌧️', sound: '' },
        { id: 'wind', name: 'رياح', icon: '💨', sound: '' },
        { id: 'thunder', name: 'رعد', icon: '⚡', sound: '' },
      ],
    },
  ];

  const current = soundPairs[currentSound];

  const handleAnswerSelect = (optionId: string) => {
    if (gameCompleted) return;

    const isCorrect = optionId === current.correct.id;
    setSelectedAnswers([...selectedAnswers, optionId]);

    if (isCorrect) {
      setFeedback('ممتاز! ✅ إجابة صحيحة!');
      setScore(score + 1);
    } else {
      setFeedback('❌ غير صحيح، حاول مرة أخرى!');
    }

    setTimeout(() => {
      setFeedback('');
      if (currentSound < soundPairs.length - 1) {
        setCurrentSound(currentSound + 1);
      } else {
        handleComplete();
      }
    }, 2000);
  };

  const handleComplete = () => {
    const points = Math.round((score / soundPairs.length) * (game.points || 20));
    setGameCompleted(true);
    onComplete(points);
  };

  const handleRestart = () => {
    setCurrentSound(0);
    setSelectedAnswers([]);
    setGameCompleted(false);
    setScore(0);
    setFeedback('');
  };

  if (gameCompleted) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">رائع! 🎉</h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {score} / {soundPairs.length}
          </p>
          <p className="text-xl text-gray-600">إجابات صحيحة!</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-300">
          <p className="text-green-700 font-bold text-lg mb-2">تهانينا! 🏆</p>
          <p className="text-green-600">لقد حصلت على {Math.round((score / soundPairs.length) * (game.points || 20))} نقطة!</p>
        </div>
        <Button onClick={handleRestart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
          <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
        </Button>
        <EcoHero size="large" emotion="celebrating" animation="bounce" className="mx-auto mt-6" />
      </Card>
    );
  }

  return (
    <Card className="border-4 border-yellow-400 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-yellow-100 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        {feedback && (
          <div className={`rounded-xl p-3 mb-4 text-center border-2 ${
            feedback.includes('✅')
              ? 'bg-green-100 border-green-300 text-green-700'
              : 'bg-red-100 border-red-300 text-red-700'
          }`}>
            <p className="font-bold">{feedback}</p>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="bird" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700">استمع للصوت واختر الظاهرة الصحيحة!</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-8 mb-6 border-4 border-yellow-300 text-center">
          <div className="text-8xl mb-4">{current.sound.icon}</div>
          <p className="text-2xl font-bold text-gray-800 mb-4">{current.sound.name}</p>
          <div className="bg-white rounded-xl p-4 inline-block">
            <Volume2 className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
            <p className="text-gray-600 font-bold">استمع للصوت</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-bold text-lg mb-4 text-center text-gray-700">
            ما هو هذا الصوت؟ ({currentSound + 1} / {soundPairs.length})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {current.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={selectedAnswers.includes(option.id)}
                className={`py-6 px-6 rounded-2xl font-bold text-lg transition-all transform ${
                  selectedAnswers.includes(option.id)
                    ? option.id === current.correct.id
                      ? 'bg-green-500 text-white scale-105'
                      : 'bg-red-500 text-white scale-105'
                    : 'bg-gradient-to-r from-yellow-200 to-amber-200 hover:from-yellow-300 hover:to-amber-300 text-yellow-800 hover:scale-105 active:scale-95'
                }`}
              >
                <div className="text-4xl mb-2">{option.icon}</div>
                <div>{option.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-100 rounded-xl p-4 border-2 border-amber-300 text-center">
          <p className="font-bold text-amber-800">
            النقاط: {score} / {soundPairs.length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}






