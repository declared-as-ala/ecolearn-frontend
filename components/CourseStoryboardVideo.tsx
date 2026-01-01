'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PauseCircle, PlayCircle, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';
import WiseGuide from '@/components/cartoons/WiseGuide';

export type StoryboardVideoSpec = {
  title: string;
  scenes: string; // Keep as provided (single string)
  narratorText: string; // Keep as provided (single string)
  soundEffects: string[]; // Keep emojis
};

function splitScenes(scenes: string): string[] {
  // Provided as comma-separated phrases; keep original phrasing trimmed
  return scenes
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

export default function CourseStoryboardVideo({
  spec,
  description,
  onMarkWatched,
  watched,
}: {
  spec: StoryboardVideoSpec;
  description?: string;
  onMarkWatched: () => void;
  watched?: boolean;
}) {
  const sceneList = useMemo(() => splitScenes(spec.scenes), [spec.scenes]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const t = window.setInterval(() => {
      setIdx((p) => (p + 1) % Math.max(1, sceneList.length));
    }, 2200);
    return () => window.clearInterval(t);
  }, [isPlaying, sceneList.length]);

  const currentScene = sceneList[idx] || sceneList[0] || '';

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden border-4 border-green-200" dir="rtl">
      <CardHeader className="bg-green-50 border-b-2 border-green-100">
        <CardTitle className="text-2xl flex items-center gap-2 text-green-700 flex-wrap">
          🎬 {spec.title}
          {watched ? (
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
              ✅ تمّت المشاهدة
            </span>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        {description ? (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-2xl border-2 border-dashed border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <FriendlyAnimal type="bird" emotion="happy" size="small" />
              <p className="font-bold text-blue-800">وصف الفيديو</p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
          </div>
        ) : null}

        <div className="bg-white rounded-2xl border-4 border-emerald-200 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-emerald-100 to-sky-100 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <WiseGuide size="small" emotion="happy" animation="nod" />
              <div>
                <p className="font-bold text-emerald-800">المشهد {Math.min(idx + 1, sceneList.length || 1)} / {sceneList.length || 1}</p>
                <p className="text-emerald-700 text-sm">حركة/مشاهد ديناميكية 🎞️</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setIdx((p) => (p - 1 + Math.max(1, sceneList.length)) % Math.max(1, sceneList.length))}
              >
                <SkipBack className="w-4 h-4 ml-1" />
                السابق
              </Button>
              <Button
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setIsPlaying((p) => !p)}
              >
                {isPlaying ? <PauseCircle className="w-5 h-5 ml-2" /> : <PlayCircle className="w-5 h-5 ml-2" />}
                {isPlaying ? 'إيقاف' : 'تشغيل'}
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setIdx((p) => (p + 1) % Math.max(1, sceneList.length))}
              >
                <SkipForward className="w-4 h-4 ml-1" />
                التالي
              </Button>
            </div>
          </div>

          <div className="p-6 min-h-[220px] bg-gradient-to-br from-gray-50 via-white to-emerald-50">
            <div className="text-center">
              <div className="inline-block px-6 py-4 rounded-3xl border-4 border-emerald-300 bg-white shadow-sm">
                <p className="text-xl font-extrabold text-gray-800 whitespace-pre-wrap">{currentScene}</p>
              </div>
              <p className="mt-4 text-gray-700 font-semibold whitespace-pre-wrap">
                🎙️ {spec.narratorText}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-5 h-5 text-amber-700" />
            <p className="font-bold text-amber-800">Sound Effects</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {spec.soundEffects.map((s) => (
              <span key={s} className="bg-white border border-amber-200 text-amber-800 px-3 py-1 rounded-full font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <FriendlyAnimal type="rabbit" emotion="excited" size="small" />
            <p className="text-gray-700 font-bold">بعد المشاهدة، انتقل للتمارين والألعاب ✨</p>
          </div>
          <Button
            onClick={onMarkWatched}
            className="rounded-2xl px-6 py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white"
          >
            {watched ? 'إعادة تأكيد المشاهدة ✅' : 'تمّت المشاهدة ✅'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}




