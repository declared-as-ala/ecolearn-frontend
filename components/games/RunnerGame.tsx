'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Trophy, RefreshCcw } from 'lucide-react';
import EcoHero from '@/components/cartoons/EcoHero';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

interface Game {
  _id: string;
  title: string;
  description: string;
  points?: number;
  gameData?: unknown;
}

type RunnerTile =
  | { id: string; icon: string; kind: 'collect' }
  | { id: string; icon: string; kind: 'hazard' }
  | { id: string; icon: string; kind: 'empty' };

function hashStringToSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export default function RunnerGame({ game, onComplete }: { game: Game; onComplete: (points: number) => void }) {
  const cfg = (game.gameData as Partial<{
    collectItems: string[];
    hazardItems: string[];
    lives: number;
    timeLimitSec: number;
  }>) || {};
  const collectItems = cfg.collectItems ?? ['🍃', '🍃', '🍃', '🌱', '🌿'];
  const hazardItems = cfg.hazardItems ?? ['💨', '💨', '⚠️'];
  const maxLives = typeof cfg.lives === 'number' ? cfg.lives : 3;
  const timeLimitSec = typeof cfg.timeLimitSec === 'number' ? cfg.timeLimitSec : 40;

  const [runKey, setRunKey] = useState(0);
  const [lives, setLives] = useState(maxLives);
  const [timeLeft, setTimeLeft] = useState(timeLimitSec);
  const [collected, setCollected] = useState(0);
  const [hazardHits, setHazardHits] = useState(0);
  const [finished, setFinished] = useState<null | { passed: boolean; points: number }>(null);
  const [feedback, setFeedback] = useState<string>('');

  const tiles = useMemo((): RunnerTile[] => {
    // Build simple 4x5 grid with random placement
    const pool: RunnerTile[] = [...collectItems.map((icon, i) => ({ id: `c${i}`, icon, kind: 'collect' as const }))];
    pool.push(...hazardItems.map((icon, i) => ({ id: `h${i}`, icon, kind: 'hazard' as const })));
    // Fill remaining with empty path tiles
    const total = 20;
    while (pool.length < total) pool.push({ id: `e${pool.length}`, icon: '⬜', kind: 'empty' as const });
    // Deterministic shuffle (no Math.random) based on game + runKey
    const rng = lcg(hashStringToSeed(`${game._id}:${runKey}:${collectItems.join('')}:${hazardItems.join('')}`));
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }, [collectItems, hazardItems, runKey]);

  useEffect(() => {
    if (finished) return;
    const t = window.setInterval(() => setTimeLeft((p) => Math.max(0, p - 1)), 1000);
    return () => window.clearInterval(t);
  }, [finished]);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      const passed = collected >= collectItems.length && lives > 0;
      const pts = passed ? (game.points || 30) : Math.max(0, Math.round((collected / Math.max(1, collectItems.length)) * (game.points || 30)));
      setFinished({ passed, points: pts });
      onComplete(pts);
    }
  }, [timeLeft, finished, collected, lives, collectItems.length, game.points, onComplete]);

  // Helper to mutate a tile back to an empty state after it has been used
  const clearTile = (tile: RunnerTile) => {
    tile.kind = 'empty';
    tile.icon = '⬜';
  };

  const handleClickTile = (tile: RunnerTile) => {
    if (finished) return;
    if (tile.kind === 'collect') {
      setCollected((p) => {
        const next = p + 1;
        if (next >= collectItems.length) {
          // Win if all collected
          const pts = game.points || 30;
          setFinished({ passed: true, points: pts });
          onComplete(pts);
        }
        return next;
      });
      setFeedback('✅ أحسنت! جمعت عنصراً مفيداً!');
      window.setTimeout(() => setFeedback(''), 1200);
      clearTile(tile);
      return;
    }

    if (tile.kind === 'hazard') {
      setHazardHits((p) => p + 1);
      setLives((p) => {
        const next = Math.max(0, p - 1);
        if (next <= 0) {
          const pts = Math.max(0, Math.round((collected / Math.max(1, collectItems.length)) * (game.points || 30)));
          setFinished({ passed: false, points: pts });
          onComplete(pts);
        }
        return next;
      });
      setFeedback('❌ دخان/خطر! تجنّبه في المرة القادمة 😷');
      window.setTimeout(() => setFeedback(''), 1400);
      clearTile(tile);
      return;
    }

    setFeedback('… استمر! ابحث عن العناصر المفيدة 🌿');
    window.setTimeout(() => setFeedback(''), 900);
  };

  const restart = () => {
    setLives(maxLives);
    setTimeLeft(timeLimitSec);
    setCollected(0);
    setHazardHits(0);
    setFinished(null);
    setFeedback('');
    setRunKey((k) => k + 1);
  };

  if (finished) {
    return (
      <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">
          {finished.passed ? 'رائع! 🎉' : 'حاول مرة أخرى! 💪'}
        </h2>
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-xl font-bold text-gray-800 mb-2">جمعت: {collected} / {collectItems.length}</p>
          <p className="text-gray-700">أخطاء/مخاطر: {hazardHits}</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-300">
          <p className="text-green-700 font-bold text-lg mb-2">مكافأتك ⭐</p>
          <p className="text-green-600">حصلت على {finished.points} نقطة!</p>
        </div>
        <Button onClick={restart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
          <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
        </Button>
        <EcoHero size="large" emotion={finished.passed ? "celebrating" : "encouraging"} animation="bounce" className="mx-auto mt-6" />
      </Card>
    );
  }

  return (
    <Card className="border-4 border-sky-300 bg-white rounded-3xl overflow-hidden shadow-2xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white">
        <CardTitle className="text-2xl font-bold text-center">{game.title}</CardTitle>
        <p className="text-center text-white/90 mt-2">{game.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <FriendlyAnimal type="bird" emotion="excited" size="small" />
            <p className="font-bold text-blue-800">تعليمات اللعبة:</p>
          </div>
          <p className="text-blue-700 whitespace-pre-wrap">
            انقر بسرعة على العناصر المفيدة لجمعها ✅
            {'\n'}
            تجنب عناصر الخطر (الدخان/⚠️) لأنها تُنقص القلوب 😷
            {'\n'}
            أكمل قبل انتهاء الوقت! ⏱️
          </p>
        </div>

        {feedback ? (
          <div className={`rounded-xl p-3 mb-4 text-center border-2 ${feedback.startsWith('✅') ? 'bg-green-100 border-green-300 text-green-700' : feedback.startsWith('❌') ? 'bg-red-100 border-red-300 text-red-700' : 'bg-amber-100 border-amber-300 text-amber-800'}`}>
            <p className="font-bold">{feedback}</p>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: maxLives }).map((_, i) => (
              <Heart key={i} className={`w-6 h-6 ${i < lives ? 'text-red-500' : 'text-gray-300'}`} />
            ))}
            <span className="font-bold text-gray-700">الوقت: {timeLeft}s</span>
          </div>
          <div className="font-bold text-emerald-700">
            تم جمع: {collected} / {collectItems.length} 🌿
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 bg-gradient-to-br from-gray-50 to-sky-50 p-4 rounded-2xl border-4 border-sky-200">
          {tiles.map((t) => (
            <button
              key={t.id}
              onClick={() => handleClickTile(t)}
              className="h-16 rounded-2xl border-2 border-white bg-white shadow-sm hover:shadow-md transition-all text-3xl active:scale-95"
              aria-label={t.kind}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


