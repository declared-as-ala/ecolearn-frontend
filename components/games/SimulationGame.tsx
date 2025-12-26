'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw, Plus, Minus } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import FriendlyAnimal from '../cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: any;
}

interface SimulationGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

export default function SimulationGame({ game, onComplete }: SimulationGameProps) {
  const [temperature, setTemperature] = useState(20);
  const [waterLevel, setWaterLevel] = useState(50);
  const [plantCount, setPlantCount] = useState(5);
  const [animalCount, setAnimalCount] = useState(3);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [balance, setBalance] = useState(50);

  const calculateBalance = () => {
    // Balance calculation based on all factors
    let bal = 50;
    if (temperature > 30) bal -= 20;
    if (temperature < 10) bal -= 15;
    if (waterLevel < 30) bal -= 25;
    if (waterLevel > 80) bal -= 10;
    if (plantCount < 3) bal -= 20;
    if (animalCount < 2) bal -= 15;
    if (plantCount > 8) bal -= 10;
    if (animalCount > 6) bal -= 10;
    return Math.max(0, Math.min(100, bal));
  };

  const handleSubmit = () => {
    const finalBalance = calculateBalance();
    setBalance(finalBalance);
    setGameCompleted(true);
    
    const points = Math.round((finalBalance / 100) * (game.points || 20));
    onComplete(points);
  };

  const handleRestart = () => {
    setTemperature(20);
    setWaterLevel(50);
    setPlantCount(5);
    setAnimalCount(3);
    setGameCompleted(false);
    setBalance(50);
  };

  const currentBalance = calculateBalance();
  const balanceStatus = currentBalance >= 70 ? 'متوازن' : currentBalance >= 40 ? 'متوسط' : 'غير متوازن';
  const balanceColor = currentBalance >= 70 ? 'green' : currentBalance >= 40 ? 'yellow' : 'red';

  if (gameCompleted) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">
          {balance >= 70 ? 'ممتاز! 🎉' : balance >= 40 ? 'جيد! 👍' : 'حاول مرة أخرى! 💪'}
        </h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-2xl font-bold text-gray-800 mb-2">التوازن: {balance}%</p>
          <p className={`text-xl font-bold ${
            balanceColor === 'green' ? 'text-green-600' :
            balanceColor === 'yellow' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {balanceStatus}
          </p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-300">
          <p className="text-green-700 font-bold text-lg mb-2">تهانينا! 🏆</p>
          <p className="text-green-600">لقد حصلت على {Math.round((balance / 100) * (game.points || 20))} نقطة!</p>
        </div>
        <Button onClick={handleRestart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
          <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
        </Button>
        <EcoHero size="large" emotion={balance >= 70 ? "celebrating" : "encouraging"} animation="bounce" className="mx-auto mt-6" />
      </Card>
    );
  }

  return (
    <Card className="border-4 border-green-400 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-green-100 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="rabbit" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700">غيّر العوامل وشاهد تأثيرها على التوازن البيئي!</p>
        </div>

        {/* Balance Indicator */}
        <div className={`bg-${balanceColor}-100 rounded-xl p-6 mb-6 border-4 border-${balanceColor}-300 text-center`}>
          <p className="text-2xl font-bold mb-2">التوازن البيئي</p>
          <div className="w-full bg-gray-200 rounded-full h-8 mb-2">
            <div
              className={`h-8 rounded-full transition-all ${
                balanceColor === 'green' ? 'bg-green-500' :
                balanceColor === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${currentBalance}%` }}
            />
          </div>
          <p className={`text-xl font-bold ${
            balanceColor === 'green' ? 'text-green-700' :
            balanceColor === 'yellow' ? 'text-yellow-700' : 'text-red-700'
          }`}>
            {currentBalance}% - {balanceStatus}
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-6 mb-6">
          {/* Temperature */}
          <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg text-red-800">🌡️ الحرارة: {temperature}°C</span>
              <div className="flex gap-2">
                <Button
                  onClick={() => setTemperature(Math.max(0, temperature - 5))}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  size="sm"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setTemperature(Math.min(50, temperature + 5))}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Water Level */}
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg text-blue-800">💧 مستوى الماء: {waterLevel}%</span>
              <div className="flex gap-2">
                <Button
                  onClick={() => setWaterLevel(Math.max(0, waterLevel - 10))}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  size="sm"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setWaterLevel(Math.min(100, waterLevel + 10))}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Plant Count */}
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg text-green-800">🌱 عدد النباتات: {plantCount}</span>
              <div className="flex gap-2">
                <Button
                  onClick={() => setPlantCount(Math.max(0, plantCount - 1))}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg"
                  size="sm"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setPlantCount(Math.min(10, plantCount + 1))}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Animal Count */}
          <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg text-amber-800">🐾 عدد الحيوانات: {animalCount}</span>
              <div className="flex gap-2">
                <Button
                  onClick={() => setAnimalCount(Math.max(0, animalCount - 1))}
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
                  size="sm"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setAnimalCount(Math.min(8, animalCount + 1))}
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full py-6 rounded-2xl text-xl font-bold shadow-lg bg-green-600 hover:bg-green-700 text-white"
        >
          تحقق من التوازن ✅
        </Button>
      </CardContent>
    </Card>
  );
}

