'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import FriendlyAnimal from '../cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: any;
}

interface RolePlayGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

interface Role {
  id: string;
  name: string;
  icon: string;
  problems: string[];
  solutions: string[];
}

export default function RolePlayGame({ game, onComplete }: RolePlayGameProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const roles: Role[] = game.gameData?.roles || [
    {
      id: 'fish',
      name: 'أنا سمكة',
      icon: '🐟',
      problems: ['الماء ملوث', 'لا يوجد أكسجين', 'النفايات في الماء'],
      solutions: ['تنظيف الماء', 'إزالة النفايات', 'حماية البحر'],
    },
    {
      id: 'tree',
      name: 'أنا شجرة',
      icon: '🌳',
      problems: ['قطع الأشجار', 'لا يوجد ماء', 'الهواء ملوث'],
      solutions: ['زراعة أشجار جديدة', 'ري الأشجار', 'تنظيف الهواء'],
    },
    {
      id: 'soil',
      name: 'أنا تربة',
      icon: '🌍',
      problems: ['المبيدات تضرني', 'لا يوجد نباتات', 'التلوث'],
      solutions: ['استخدام طرق طبيعية', 'زراعة النباتات', 'حماية التربة'],
    },
  ];

  const currentRole = roles.find(r => r.id === selectedRole);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setSelectedSolutions([]);
  };

  const handleSolutionSelect = (solution: string) => {
    if (selectedSolutions.includes(solution)) {
      setSelectedSolutions(selectedSolutions.filter(s => s !== solution));
    } else {
      setSelectedSolutions([...selectedSolutions, solution]);
    }
  };

  const handleSubmit = () => {
    if (!currentRole) return;
    
    const correctSolutions = currentRole.solutions.filter(s => selectedSolutions.includes(s));
    const points = Math.round((correctSolutions.length / currentRole.solutions.length) * (game.points || 20));
    
    setScore(correctSolutions.length);
    setGameCompleted(true);
    onComplete(points);
  };

  const handleRestart = () => {
    setSelectedRole(null);
    setSelectedSolutions([]);
    setGameCompleted(false);
    setScore(0);
  };

  if (gameCompleted && currentRole) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">رائع! 🎉</h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-4xl mb-2">{currentRole.icon}</p>
          <p className="text-2xl font-bold text-gray-800 mb-2">{currentRole.name}</p>
          <p className="text-xl text-gray-600">اخترت {score} حل صحيح من {currentRole.solutions.length}</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-300">
          <p className="text-green-700 font-bold text-lg mb-2">تهانينا! 🏆</p>
          <p className="text-green-600">لقد حصلت على {Math.round((score / currentRole.solutions.length) * (game.points || 20))} نقطة!</p>
        </div>
        <Button onClick={handleRestart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
          <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
        </Button>
        <EcoHero size="large" emotion="celebrating" animation="bounce" className="mx-auto mt-6" />
      </Card>
    );
  }

  return (
    <Card className="border-4 border-orange-400 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-orange-100 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="turtle" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700">اختر دوراً واختر الحلول التي تساعد هذا الكائن!</p>
        </div>

        {!selectedRole ? (
          <div>
            <h3 className="font-bold text-lg mb-4 text-center text-gray-700">اختر دورك:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400 text-orange-800 py-8 px-6 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
                >
                  <div className="text-6xl mb-3">{role.icon}</div>
                  <div className="text-xl">{role.name}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-orange-100 rounded-xl p-6 mb-6 border-2 border-orange-300 text-center">
              <div className="text-6xl mb-3">{currentRole?.icon}</div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">{currentRole?.name}</h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="font-bold text-gray-700 mb-2">المشاكل التي أواجهها:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentRole?.problems.map((problem, idx) => (
                    <span key={idx} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-bold">
                      {problem}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-4 text-center text-gray-700">اختر الحلول التي تساعدني:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentRole?.solutions.map((solution, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSolutionSelect(solution)}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                      selectedSolutions.includes(solution)
                        ? 'bg-green-500 text-white scale-105'
                        : 'bg-orange-200 hover:bg-orange-300 text-orange-800 hover:scale-105'
                    }`}
                  >
                    {solution}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={selectedSolutions.length === 0}
              className={`w-full py-6 rounded-2xl text-xl font-bold shadow-lg ${
                selectedSolutions.length > 0
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              تحقق من الحلول ✅
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}





