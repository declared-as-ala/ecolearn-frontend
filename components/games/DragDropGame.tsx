'use client';

import { useState } from 'react';
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

interface DragDropGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

export default function DragDropGame({ game, onComplete }: DragDropGameProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [categories, setCategories] = useState<Record<string, string[]>>({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');

  // Default game data if not provided
  const defaultItems = [
    { id: 'plant1', label: 'نبات', category: 'منتج' },
    { id: 'plant2', label: 'شجرة', category: 'منتج' },
    { id: 'rabbit', label: 'أرنب', category: 'مستهلك' },
    { id: 'lion', label: 'أسد', category: 'مستهلك' },
    { id: 'bacteria', label: 'بكتيريا', category: 'محلل' },
    { id: 'fungus', label: 'فطر', category: 'محلل' },
  ];

  const items = game.gameData?.items || defaultItems;
  const categoryList = Array.from(new Set(items.map((item: any) => item.category))) as string[];

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    setCategories((prev) => {
      const newCategories = { ...prev };
      // Remove from other categories
      Object.keys(newCategories).forEach((cat) => {
        newCategories[cat] = newCategories[cat].filter((id) => id !== draggedItem);
      });
      // Add to new category
      if (!newCategories[category]) {
        newCategories[category] = [];
      }
      if (!newCategories[category].includes(draggedItem)) {
        newCategories[category].push(draggedItem);
      }
      return newCategories;
    });

    setDraggedItem(null);
    setFeedback('تم وضع العنصر! ✅');
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleSubmit = () => {
    let correct = 0;
    items.forEach((item: any) => {
      const userCategory = Object.keys(categories).find((cat) =>
        categories[cat]?.includes(item.id)
      );
      if (userCategory === item.category) {
        correct++;
      }
    });

    const points = Math.round((correct / items.length) * (game.points || 20));
    setScore(correct);
    setGameCompleted(true);
    onComplete(points);
  };

  const handleRestart = () => {
    setCategories({});
    setGameCompleted(false);
    setScore(0);
    setFeedback('');
  };

  if (gameCompleted) {
    const percentage = Math.round((score / items.length) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <div className="mb-6">
          {passed ? (
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">
          {passed ? 'ممتاز! 🎉' : 'حاول مرة أخرى! 💪'}
        </h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {score} / {items.length}
          </p>
          <p className="text-xl text-gray-600">{percentage}%</p>
        </div>
        {passed ? (
          <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-300">
            <p className="text-green-700 font-bold text-lg mb-2">تهانينا! 🏆</p>
            <p className="text-green-600">لقد حصلت على {game.points || 20} نقطة!</p>
          </div>
        ) : (
          <div className="bg-orange-100 rounded-xl p-4 mb-6 border-2 border-orange-300">
            <p className="text-orange-700 font-bold text-lg">النقاط أقل من 70%</p>
            <p className="text-orange-600">حاول مرة أخرى لتحسين نتيجتك!</p>
          </div>
        )}
        <div className="flex justify-center gap-4">
          <Button onClick={handleRestart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
            <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
          </Button>
        </div>
        <EcoHero size="large" emotion={passed ? "celebrating" : "encouraging"} animation="bounce" className="mx-auto mt-6" />
      </Card>
    );
  }

  const unassignedItems = items.filter(
    (item: any) => !Object.values(categories).flat().includes(item.id)
  );

  const allItemsPlaced = unassignedItems.length === 0;

  return (
    <Card className="border-4 border-green-400 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-green-100 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        {feedback && (
          <div className="bg-green-100 border-2 border-green-300 rounded-xl p-3 mb-4 text-center">
            <p className="text-green-700 font-bold">{feedback}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="bird" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700">اسحب العناصر من الأسفل وضعها في الفئة الصحيحة!</p>
        </div>

        {/* Unassigned Items */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">العناصر المتاحة:</h3>
          <div className="flex flex-wrap gap-3">
            {unassignedItems.map((item: any) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-4 rounded-xl cursor-move shadow-lg transform transition-all hover:scale-105 active:scale-95 font-bold text-lg"
              >
                {item.label}
              </div>
            ))}
          </div>
          {unassignedItems.length === 0 && (
            <div className="bg-green-100 border-2 border-green-300 rounded-xl p-3 text-center mt-4">
              <p className="text-green-700 font-bold">✅ تم وضع جميع العناصر!</p>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {categoryList.map((category: string) => (
            <div
              key={category}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
              className={`border-4 border-dashed rounded-2xl p-6 min-h-[200px] transition-all ${
                draggedItem
                  ? 'border-green-400 bg-green-50 scale-105'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <h3 className="font-bold text-xl mb-4 text-center text-gray-700 bg-white rounded-lg py-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories[category]?.map((itemId) => {
                  const item = items.find((i: any) => i.id === itemId);
                  return (
                    <div
                      key={itemId}
                      className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-md"
                    >
                      {item?.label}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!allItemsPlaced}
          className={`w-full py-6 rounded-2xl text-xl font-bold shadow-lg transition-all ${
            allItemsPlaced
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {allItemsPlaced ? (
            <>
              <CheckCircle className="w-6 h-6 ml-2" />
              تحقق من الإجابات ✅
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 ml-2" />
              ضع جميع العناصر أولاً ({unassignedItems.length} متبقية)
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
