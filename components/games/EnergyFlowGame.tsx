'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw, Zap } from 'lucide-react';
import EcoHero from '@/components/cartoons/EcoHero';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: unknown;
}

type Stage = { id: string; label: string; icon?: string; energy?: number };

export default function EnergyFlowGame({ game, onComplete }: { game: Game; onComplete: (points: number) => void }) {
  const cfg = (game.gameData as Partial<{ stages: Stage[]; lossIcon: string }>) || {};
  const stages: Stage[] = useMemo(() => cfg.stages ?? [
    { id: 'sun', label: 'الشمس', icon: '☀️', energy: 100 },
    { id: 'producer', label: 'منتِج', icon: '🌿', energy: 60 },
    { id: 'consumer1', label: 'مستهلك 1', icon: '🐟', energy: 25 },
    { id: 'consumer2', label: 'مستهلك 2', icon: '🦅', energy: 10 },
  ], [cfg.stages]);
  const lossIcon = cfg.lossIcon ?? '💨';

  const [revealed, setRevealed] = useState<string[]>([]);
  const [done, setDone] = useState<null | { passed: boolean; points: number }>(null);

  const correctOrder = useMemo(() => stages.map(s => s.id), [stages]);

  const reveal = (id: string) => {
    if (done) return;
    if (revealed.includes(id)) return;
    setRevealed(prev => [...prev, id]);
  };

  const submit = () => {
    // Must reveal all stages in correct order to get full points
    const sameLength = revealed.length === correctOrder.length;
    const inOrder = sameLength && revealed.every((id, i) => id === correctOrder[i]);
    const passed = inOrder;
    const pts = passed ? (game.points || 30) : Math.max(0, Math.round((revealed.length / Math.max(1, correctOrder.length)) * (game.points || 30)));
    setDone({ passed, points: pts });
    onComplete(pts);
  };

  const restart = () => {
    setRevealed([]);
    setDone(null);
  };

  if (done) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">
          {done.passed ? 'رائع! 🎉' : 'حاول مرة أخرى! 💪'}
        </h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-xl font-bold text-gray-800 mb-2">اكتشفت تدفق الطاقة عبر المراحل</p>
          <p className="text-gray-700">كل مرحلة تفقد جزءًا من الطاقة {lossIcon}</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-300">
          <p className="text-green-700 font-bold text-lg mb-2">مكافأتك ⭐</p>
          <p className="text-green-600">حصلت على {done.points} نقطة!</p>
        </div>
        <Button onClick={restart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
          <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
        </Button>
        <EcoHero size="large" emotion={done.passed ? "celebrating" : "encouraging"} animation="bounce" className="mx-auto mt-6" />
      </Card>
    );
  }

  return (
    <Card className="border-4 border-amber-300 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-white/90 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="fish" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700 whitespace-pre-wrap">
            اضغط على المراحل بالترتيب الصحيح لتظهر الطاقة 🔋
            {'\n'}
            لاحظ كيف تتناقص الطاقة في كل انتقال {lossIcon}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stages.map((s, i) => {
            const isRevealed = revealed.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => reveal(s.id)}
                className={`rounded-2xl border-4 p-5 text-right transition-all active:scale-95 ${
                  isRevealed ? 'border-green-400 bg-green-50' : 'border-amber-200 bg-white hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{s.icon || '🔸'}</div>
                    <div>
                      <p className="text-xl font-bold text-gray-800">{s.label}</p>
                      <p className="text-sm text-gray-600">المرحلة {i + 1}</p>
                    </div>
                  </div>
                  <Zap className={`w-6 h-6 ${isRevealed ? 'text-amber-600' : 'text-gray-300'}`} />
                </div>
                {isRevealed ? (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-4 bg-gradient-to-r from-amber-400 to-orange-500 transition-all"
                        style={{ width: `${Math.max(0, Math.min(100, s.energy ?? 50))}%` }}
                      />
                    </div>
                    <p className="mt-2 font-bold text-amber-700">طاقة: {s.energy ?? 50}%</p>
                    {i < stages.length - 1 ? (
                      <p className="text-gray-700 font-semibold">انتقال الطاقة {lossIcon}</p>
                    ) : (
                      <p className="text-emerald-700 font-extrabold">✅ نهاية الرحلة!</p>
                    )}
                  </div>
                ) : (
                  <p className="mt-3 text-gray-500 font-semibold">اضغط للكشف 👆</p>
                )}
              </button>
            );
          })}
        </div>

        <Button
          onClick={submit}
          disabled={revealed.length === 0}
          className="w-full py-6 rounded-2xl text-xl font-bold shadow-lg bg-amber-600 hover:bg-amber-700 text-white"
        >
          تحقّق من تدفق الطاقة ✅
        </Button>
      </CardContent>
    </Card>
  );
}


