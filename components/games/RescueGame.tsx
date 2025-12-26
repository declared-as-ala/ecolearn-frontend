'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw, Trash2, CheckCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import FriendlyAnimal from '../cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: any;
}

interface RescueGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

interface TrashItem {
  id: string;
  type: 'plastic' | 'paper' | 'organic' | 'hazardous';
  icon: string;
  x: number;
  y: number;
}

export default function RescueGame({ game, onComplete }: RescueGameProps) {
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const trashItems: TrashItem[] = game.gameData?.items || [
    { id: '1', type: 'plastic', icon: '🥤', x: 20, y: 30 },
    { id: '2', type: 'paper', icon: '📄', x: 60, y: 40 },
    { id: '3', type: 'plastic', icon: '🫙', x: 40, y: 60 },
    { id: '4', type: 'organic', icon: '🍌', x: 80, y: 50 },
    { id: '5', type: 'plastic', icon: '🛍️', x: 30, y: 70 },
    { id: '6', type: 'paper', icon: '📰', x: 70, y: 30 },
  ];

  const handleCollect = (itemId: string) => {
    if (collectedItems.includes(itemId)) return;
    setCollectedItems([...collectedItems, itemId]);
    
    if (collectedItems.length + 1 === trashItems.length) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const points = game.points || 20;
    setScore(trashItems.length);
    setGameCompleted(true);
    onComplete(points);
  };

  const handleRestart = () => {
    setCollectedItems([]);
    setGameCompleted(false);
    setScore(0);
  };

  if (gameCompleted) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">رائع! 🎉</h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-2xl font-bold text-gray-800 mb-2">جمعت {score} عنصر!</p>
          <p className="text-xl text-gray-600">لقد نظفت البيئة بنجاح!</p>
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
    <Card className="border-4 border-blue-400 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-blue-100 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="fish" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700">انقر على جميع النفايات لجمعها وإنقاذ البيئة!</p>
        </div>

        {/* Game Area */}
        <div className="relative bg-gradient-to-br from-green-200 via-blue-200 to-green-200 rounded-2xl p-8 mb-6 min-h-[400px] border-4 border-green-300">
          {trashItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCollect(item.id)}
              disabled={collectedItems.includes(item.id)}
              className={`absolute text-6xl transition-all transform ${
                collectedItems.includes(item.id)
                  ? 'opacity-0 scale-0'
                  : 'hover:scale-125 active:scale-95 cursor-pointer animate-bounce'
              }`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.icon}
            </button>
          ))}
          {collectedItems.length === trashItems.length && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-green-500 text-white rounded-full p-8 text-4xl animate-bounce">
                <CheckCircle className="w-16 h-16" />
              </div>
            </div>
          )}
        </div>

        <div className="bg-amber-100 rounded-xl p-4 border-2 border-amber-300 text-center">
          <p className="font-bold text-amber-800">
            العناصر المجمعة: {collectedItems.length} / {trashItems.length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}


