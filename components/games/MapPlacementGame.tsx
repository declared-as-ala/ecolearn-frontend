'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw, MapPin } from 'lucide-react';
import EcoHero from '@/components/cartoons/EcoHero';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: unknown;
}

type Cell = { r: number; c: number };

export default function MapPlacementGame({ game, onComplete }: { game: Game; onComplete: (points: number) => void }) {
  const cfg = (game.gameData as Partial<{
    rows: number;
    cols: number;
    sensorIcon: string;
    sensorsToPlace: number;
    hotspots: Cell[];
    mapLabel: string;
  }>) || {};
  const rows = typeof cfg.rows === 'number' ? cfg.rows : 6;
  const cols = typeof cfg.cols === 'number' ? cfg.cols : 8;
  const sensorIcon = cfg.sensorIcon ?? '📍';
  const sensorsToPlace = typeof cfg.sensorsToPlace === 'number' ? cfg.sensorsToPlace : 3;
  const hotspots: Cell[] = cfg.hotspots ?? [{ r: 1, c: 2 }, { r: 3, c: 5 }, { r: 4, c: 1 }];
  const mapLabel = cfg.mapLabel ?? '🗺️ خريطة';

  const [placed, setPlaced] = useState<Cell[]>([]);
  const [done, setDone] = useState<null | { passed: boolean; points: number; correct: number }>(null);

  const hotspotKey = useMemo(() => new Set(hotspots.map(h => `${h.r}:${h.c}`)), [hotspots]);

  const toggleCell = (cell: Cell) => {
    if (done) return;
    const key = `${cell.r}:${cell.c}`;
    const exists = placed.some(p => `${p.r}:${p.c}` === key);
    if (exists) {
      setPlaced(prev => prev.filter(p => `${p.r}:${p.c}` !== key));
      return;
    }
    if (placed.length >= sensorsToPlace) return;
    setPlaced(prev => [...prev, cell]);
  };

  const submit = () => {
    const correct = placed.filter(p => hotspotKey.has(`${p.r}:${p.c}`)).length;
    const max = Math.max(1, sensorsToPlace);
    const percent = Math.round((correct / max) * 100);
    const passed = percent >= 70;
    const pts = passed ? (game.points || 30) : Math.max(0, Math.round((correct / max) * (game.points || 30)));
    setDone({ passed, points: pts, correct });
    onComplete(pts);
  };

  const restart = () => {
    setPlaced([]);
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
          <p className="text-xl font-bold text-gray-800 mb-2">
            حساسات في أماكن صحيحة: {done.correct} / {sensorsToPlace}
          </p>
          <p className="text-gray-700">كلما كانت نقاطك أفضل، كانت جودة المراقبة أعلى ✅</p>
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
    <Card className="border-4 border-indigo-300 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-white/90 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="turtle" emotion="happy" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700 whitespace-pre-wrap">
            ضع {sensorsToPlace} حساسات {sensorIcon} على الخريطة 📌
            {'\n'}
            اختر أماكن مهمة للمراقبة (قرب مصادر التلوث/التجمّعات/المناطق الحساسة) 🧭
          </p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="font-bold text-gray-700 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600" />
            {mapLabel}
          </div>
          <div className="font-bold text-indigo-700">
            تم وضع: {placed.length} / {sensorsToPlace}
          </div>
        </div>

        <div className="grid gap-2 p-4 rounded-2xl border-4 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const key = `${r}:${c}`;
            const isPlaced = placed.some(p => `${p.r}:${p.c}` === key);
            return (
              <button
                key={key}
                onClick={() => toggleCell({ r, c })}
                className={`h-10 rounded-xl border-2 transition-all active:scale-95 ${
                  isPlaced ? 'bg-indigo-600 text-white border-indigo-700 shadow-md' : 'bg-white border-indigo-200 hover:border-indigo-400'
                }`}
                aria-label={`cell-${key}`}
              >
                {isPlaced ? sensorIcon : ''}
              </button>
            );
          })}
        </div>

        <Button
          onClick={submit}
          disabled={placed.length !== sensorsToPlace}
          className={`w-full py-6 rounded-2xl text-xl font-bold shadow-lg ${
            placed.length === sensorsToPlace ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {placed.length === sensorsToPlace ? 'تحقق من أماكن الحساسات ✅' : 'ضع كل الحساسات أولاً'}
        </Button>
      </CardContent>
    </Card>
  );
}


