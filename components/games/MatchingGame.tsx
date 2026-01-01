'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import FriendlyAnimal from '../cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: any;
}

interface MatchingGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

interface MatchPair {
  left: string;
  right: string;
  id: string;
}

export default function MatchingGame({ game, onComplete }: MatchingGameProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');

  // Default pairs if not provided
  const defaultPairs: MatchPair[] = [
    { id: '1', left: 'قطع الأشجار', right: 'نقص الأكسجين' },
    { id: '2', left: 'رمي النفايات', right: 'تلوث المياه' },
    { id: '3', left: 'استخدام المبيدات', right: 'موت النحل' },
    { id: '4', left: 'الصيد المفرط', right: 'انقراض الأسماك' },
  ];

  const pairs: MatchPair[] = game.gameData?.pairs || defaultPairs;
  const leftItems = pairs.map(p => p.left);
  const rightItems = pairs.map(p => p.right).sort(() => Math.random() - 0.5); // Shuffle

  const handleLeftClick = (item: string) => {
    if (matchedPairs.includes(item)) return;
    if (selectedLeft === item) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(item);
      setSelectedRight(null);
    }
  };

  const handleRightClick = (item: string) => {
    if (matchedPairs.includes(item)) return;
    if (selectedRight === item) {
      setSelectedRight(null);
    } else {
      setSelectedRight(item);
      if (selectedLeft) {
        checkMatch(selectedLeft, item);
      }
    }
  };

  const checkMatch = (left: string, right: string) => {
    const pair = pairs.find(p => p.left === left);
    if (pair && pair.right === right) {
      // Correct match!
      setMatchedPairs([...matchedPairs, left, right]);
      setSelectedLeft(null);
      setSelectedRight(null);
      setFeedback('ممتاز! ✅ تطابق صحيح!');
      setTimeout(() => setFeedback(''), 2000);
      
      if (matchedPairs.length + 2 === pairs.length * 2) {
        // All matched
        handleComplete();
      }
    } else {
      // Wrong match
      setFeedback('❌ غير صحيح، حاول مرة أخرى!');
      setTimeout(() => {
        setFeedback('');
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 1500);
    }
  };

  const handleComplete = () => {
    const points = game.points || 20;
    setScore(pairs.length);
    setGameCompleted(true);
    onComplete(points);
  };

  const handleRestart = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs([]);
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
            {score} / {pairs.length}
          </p>
          <p className="text-xl text-gray-600">جميع المطابقات صحيحة!</p>
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

  const isLeftMatched = (item: string) => matchedPairs.includes(item);
  const isRightMatched = (item: string) => matchedPairs.includes(item);

  return (
    <Card className="border-4 border-blue-400 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-blue-100 mt-2">{game.description}</p>
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
            <FriendlyAnimal type="rabbit" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700">انقر على عنصر من اليسار ثم على عنصر من اليمين لمطابقتهما!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-center text-gray-700">السبب / الفعل</h3>
            <div className="space-y-3">
              {leftItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLeftClick(item)}
                  disabled={isLeftMatched(item)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
                    isLeftMatched(item)
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : selectedLeft === item
                      ? 'bg-blue-500 text-white scale-105 shadow-lg'
                      : 'bg-blue-200 hover:bg-blue-300 text-blue-800 hover:scale-105'
                  }`}
                >
                  {item}
                  {isLeftMatched(item) && <CheckCircle className="w-5 h-5 inline-block mr-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-center text-gray-700">النتيجة / التأثير</h3>
            <div className="space-y-3">
              {rightItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleRightClick(item)}
                  disabled={isRightMatched(item)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
                    isRightMatched(item)
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : selectedRight === item
                      ? 'bg-purple-500 text-white scale-105 shadow-lg'
                      : 'bg-purple-200 hover:bg-purple-300 text-purple-800 hover:scale-105'
                  }`}
                >
                  {item}
                  {isRightMatched(item) && <CheckCircle className="w-5 h-5 inline-block mr-2" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-amber-100 rounded-xl p-4 border-2 border-amber-300 text-center">
          <p className="font-bold text-amber-800">
            المطابقات: {matchedPairs.length / 2} / {pairs.length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}





