'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RefreshCcw, TestTube2 } from 'lucide-react';
import EcoHero from '@/components/cartoons/EcoHero';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: unknown;
}

export default function WaterLabGame({ game, onComplete }: { game: Game; onComplete: (points: number) => void }) {
  type Sample = { id: string; name: string; ph: number; bacteria: number; minerals: number };
  const cfg = (game.gameData as Partial<{
    samples: Sample[];
    safeRanges: {
      ph: { min: number; max: number };
      bacteria: { min: number; max: number };
      minerals: { min: number; max: number };
    };
  }>) || {};
  const samples: Sample[] = useMemo(() => cfg.samples ?? [
    { id: 's1', name: 'عينة (A)', ph: 6.5, bacteria: 20, minerals: 120 },
    { id: 's2', name: 'عينة (B)', ph: 8.8, bacteria: 80, minerals: 300 },
    { id: 's3', name: 'عينة (C)', ph: 7.2, bacteria: 10, minerals: 160 },
  ], [cfg.samples]);
  const safe = cfg.safeRanges ?? {
    ph: { min: 6.5, max: 8.5 },
    bacteria: { min: 0, max: 30 },
    minerals: { min: 50, max: 220 },
  };

  const [selectedId, setSelectedId] = useState(samples[0]?.id);
  const [done, setDone] = useState<null | { passed: boolean; points: number; correct: number }>(null);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const selected = useMemo(() => samples.find((s) => s.id === selectedId) || samples[0], [samples, selectedId]);

  const isSafe = (s: Sample) => (
    s.ph >= safe.ph.min && s.ph <= safe.ph.max &&
    s.bacteria >= safe.bacteria.min && s.bacteria <= safe.bacteria.max &&
    s.minerals >= safe.minerals.min && s.minerals <= safe.minerals.max
  );

  const toggleCheck = (id: string) => {
    if (done) return;
    setCheckedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const submit = () => {
    const safeIds = samples.filter((s) => isSafe(s)).map((s) => s.id);
    const correct = checkedIds.filter(id => safeIds.includes(id)).length;
    const wrong = checkedIds.filter(id => !safeIds.includes(id)).length;
    const totalTargets = Math.max(1, safeIds.length);
    const scoreRatio = Math.max(0, Math.min(1, (correct - wrong) / totalTargets));
    const pts = Math.round(scoreRatio * (game.points || 35));
    const passed = pts >= Math.round((game.points || 35) * 0.7);
    setDone({ passed, points: pts, correct });
    onComplete(pts);
  };

  const restart = () => {
    setCheckedIds([]);
    setDone(null);
    setSelectedId(samples[0]?.id);
  };

  if (done) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">
          {done.passed ? 'رائع! 🎉' : 'حاول مرة أخرى! 💪'}
        </h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-xl font-bold text-gray-800 mb-2">نتيجة فحصك ✅</p>
          <p className="text-gray-700">عينات صحيحة: {done.correct}</p>
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
    <Card className="border-4 border-cyan-300 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-cyan-600 to-sky-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-white/90 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="turtle" emotion="thinking" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700 whitespace-pre-wrap">
            افحص عينات الماء حسب: pH، البكتيريا، المعادن 🧪
            {'\n'}
            اختر العينات الآمنة فقط ✅
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {samples.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`rounded-2xl border-4 p-4 text-right transition-all active:scale-95 ${
                selectedId === s.id ? 'border-cyan-500 bg-cyan-50' : 'border-cyan-200 bg-white hover:border-cyan-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-gray-800">{s.name}</p>
                <TestTube2 className="w-5 h-5 text-cyan-700" />
              </div>
              <p className="text-gray-600 text-sm mt-1">انقر لعرض النتائج</p>
            </button>
          ))}
        </div>

        {selected ? (
          <div className="bg-white rounded-2xl border-4 border-cyan-200 p-5">
            <p className="font-bold text-gray-800 mb-3">نتائج {selected.name}:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="font-bold text-amber-800">pH</p>
                <p className="text-2xl font-extrabold text-gray-800">{selected.ph}</p>
                <p className="text-sm text-gray-600">الآمن: {safe.ph.min}–{safe.ph.max}</p>
              </div>
              <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4">
                <p className="font-bold text-rose-800">🦠 بكتيريا</p>
                <p className="text-2xl font-extrabold text-gray-800">{selected.bacteria}</p>
                <p className="text-sm text-gray-600">الآمن: ≤ {safe.bacteria.max}</p>
              </div>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
                <p className="font-bold text-emerald-800">🪨 معادن</p>
                <p className="text-2xl font-extrabold text-gray-800">{selected.minerals}</p>
                <p className="text-sm text-gray-600">الآمن: {safe.minerals.min}–{safe.minerals.max}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
              <p className={`font-extrabold ${isSafe(selected) ? 'text-green-700' : 'text-red-700'}`}>
                {isSafe(selected) ? '✅ هذه عينة آمنة' : '❌ هذه عينة ملوّثة'}
              </p>
              <Button
                onClick={() => toggleCheck(selected.id)}
                className={`${checkedIds.includes(selected.id) ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-cyan-600 hover:bg-cyan-700'} text-white rounded-2xl font-bold`}
              >
                {checkedIds.includes(selected.id) ? 'إلغاء الاختيار' : 'اختيار هذه العينة'}
              </Button>
            </div>
          </div>
        ) : null}

        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-4">
          <p className="font-bold text-cyan-800">العينات المختارة: {checkedIds.length}</p>
        </div>

        <Button
          onClick={submit}
          disabled={checkedIds.length === 0}
          className="w-full py-6 rounded-2xl text-xl font-bold shadow-lg bg-cyan-700 hover:bg-cyan-800 text-white"
        >
          إرسال النتائج ✅
        </Button>
      </CardContent>
    </Card>
  );
}


