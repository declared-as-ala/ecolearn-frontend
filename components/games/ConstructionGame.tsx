'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw, X } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import FriendlyAnimal from '../cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: unknown;
}

interface ConstructionGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

interface EcosystemElement {
  id: string;
  name: string;
  type: 'producer' | 'consumer' | 'decomposer' | 'water' | 'sun' | 'soil';
  icon: string;
}

export default function ConstructionGame({ game, onComplete }: ConstructionGameProps) {
  const [ecosystem, setEcosystem] = useState<EcosystemElement[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const cfg = (game.gameData as Partial<{
    availableElements: EcosystemElement[];
    constraints: {
      minLiving?: number;
      minNonLiving?: number;
      mustIncludeType?: EcosystemElement['type'];
      mustIncludeAny?: string[];
      avoidAny?: string[];
    };
  }>) || {};

  const availableElements: EcosystemElement[] = cfg.availableElements || [
    { id: '1', name: 'نبات', type: 'producer', icon: '🌱' },
    { id: '2', name: 'شجرة', type: 'producer', icon: '🌳' },
    { id: '3', name: 'أرنب', type: 'consumer', icon: '🐰' },
    { id: '4', name: 'أسد', type: 'consumer', icon: '🦁' },
    { id: '5', name: 'بكتيريا', type: 'decomposer', icon: '🦠' },
    { id: '6', name: 'ماء', type: 'water', icon: '💧' },
    { id: '7', name: 'شمس', type: 'sun', icon: '☀️' },
    { id: '8', name: 'تربة', type: 'soil', icon: '🌍' },
  ];

  const constraints = cfg.constraints || {};

  const addElement = (element: EcosystemElement) => {
    if (ecosystem.length >= 8) return; // Max 8 elements
    setEcosystem([...ecosystem, element]);
  };

  const removeElement = (index: number) => {
    setEcosystem(ecosystem.filter((_, i) => i !== index));
  };

  const checkEcosystem = () => {
    const hasProducer = ecosystem.some(e => e.type === 'producer');
    const hasConsumer = ecosystem.some(e => e.type === 'consumer');
    const hasDecomposer = ecosystem.some(e => e.type === 'decomposer');
    const hasWater = ecosystem.some(e => e.type === 'water');
    const hasSun = ecosystem.some(e => e.type === 'sun');
    const hasSoil = ecosystem.some(e => e.type === 'soil');

    let points = 0;
    if (hasProducer) points += 5;
    if (hasConsumer) points += 5;
    if (hasDecomposer) points += 5;
    if (hasWater) points += 3;
    if (hasSun) points += 3;
    if (hasSoil) points += 3;

    // Bonus for balanced ecosystem
    if (hasProducer && hasConsumer && hasDecomposer && hasWater && hasSun && hasSoil) {
      points += 10;
    }

    // Custom constraints (used by the grade-6 refreshed courses)
    const livingCount = ecosystem.filter(e => e.type === 'producer' || e.type === 'consumer' || e.type === 'decomposer').length;
    const nonLivingCount = ecosystem.filter(e => e.type === 'water' || e.type === 'sun' || e.type === 'soil').length;

    if (typeof constraints.minLiving === 'number') {
      if (livingCount >= constraints.minLiving) points += 10;
      else points -= 5;
    }
    if (typeof constraints.minNonLiving === 'number') {
      if (nonLivingCount >= constraints.minNonLiving) points += 10;
      else points -= 5;
    }
    if (typeof constraints.mustIncludeType === 'string') {
      const hasType = ecosystem.some((e) => e.type === constraints.mustIncludeType);
      points += hasType ? 10 : -5;
    }
    if (Array.isArray(constraints.mustIncludeAny)) {
      const iconSet = new Set(ecosystem.map(e => e.icon));
      const hasAny = constraints.mustIncludeAny.some((x: string) => iconSet.has(x));
      points += hasAny ? 8 : -4;
    }
    if (Array.isArray(constraints.avoidAny)) {
      const iconSet = new Set(ecosystem.map(e => e.icon));
      const hasBad = constraints.avoidAny.some((x: string) => iconSet.has(x));
      points += hasBad ? -10 : 10;
    }

    const normalizedPoints = Math.max(0, points);
    const finalPoints = Math.min(game.points || 20, normalizedPoints);
    setScore(normalizedPoints);
    setGameCompleted(true);
    onComplete(finalPoints);
  };

  const handleRestart = () => {
    setEcosystem([]);
    setGameCompleted(false);
    setScore(0);
  };

  if (gameCompleted) {
    const hasAll = score >= 25;
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">
          {hasAll ? 'ممتاز! 🎉' : 'جيد! 👍'}
        </h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-2xl font-bold text-gray-800 mb-2">نقاطك: {score}</p>
          <p className="text-xl text-gray-600">
            {hasAll ? 'نظام بيئي متوازن!' : 'يمكنك إضافة المزيد من العناصر'}
          </p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-300">
          <p className="text-green-700 font-bold text-lg mb-2">تهانينا! 🏆</p>
          <p className="text-green-600">لقد حصلت على {Math.min(game.points || 20, score)} نقطة!</p>
        </div>
        <Button onClick={handleRestart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
          <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
        </Button>
        <EcoHero size="large" emotion={hasAll ? "celebrating" : "encouraging"} animation="bounce" className="mx-auto mt-6" />
      </Card>
    );
  }

  return (
    <Card className="border-4 border-teal-400 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-teal-100 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="turtle" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700">انقر على العناصر لبناء نظام بيئي متوازن!</p>
        </div>

        {/* Available Elements */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">العناصر المتاحة:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableElements.map((element) => (
              <button
                key={element.id}
                onClick={() => addElement(element)}
                disabled={ecosystem.length >= 8}
                className="bg-gradient-to-r from-teal-200 to-teal-300 hover:from-teal-300 hover:to-teal-400 text-teal-800 py-4 px-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-3xl mb-1">{element.icon}</div>
                <div className="text-sm">{element.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Built Ecosystem */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">النظام البيئي الذي بنيته:</h3>
          {ecosystem.length === 0 ? (
            <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
              <p className="text-gray-500 font-bold">ابدأ بإضافة عناصر!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ecosystem.map((element, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-green-400 to-green-500 text-white py-4 px-4 rounded-xl font-bold relative"
                >
                  <button
                    onClick={() => removeElement(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-3xl mb-1">{element.icon}</div>
                  <div className="text-sm">{element.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={checkEcosystem}
          disabled={ecosystem.length === 0}
          className={`w-full py-6 rounded-2xl text-xl font-bold shadow-lg ${
            ecosystem.length > 0
              ? 'bg-teal-600 hover:bg-teal-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {ecosystem.length > 0 ? 'تحقق من النظام ✅' : 'أضف عناصر أولاً'}
        </Button>
      </CardContent>
    </Card>
  );
}



