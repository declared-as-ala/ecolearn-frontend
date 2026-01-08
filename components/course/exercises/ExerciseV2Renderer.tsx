'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Trophy, CheckCircle2, RefreshCcw } from 'lucide-react';
import EcoHero from '@/components/cartoons/EcoHero';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';
import type {
  ChoiceExerciseV2,
  DragSequenceExerciseV2,
  ExerciseV2,
  MatchingExerciseV2,
  McqSetExerciseV2,
  MultiSelectExerciseV2,
  ScenarioExerciseV2,
  ShortAnswerExerciseV2,
  StickerRepairExerciseV2
} from './types';

export default function ExerciseV2Renderer({
  exercise,
  isCompleted,
  onComplete,
}: {
  exercise: ExerciseV2;
  isCompleted?: boolean;
  onComplete: (score: number, maxScore: number) => void;
}) {
  // Render per-type component to respect hooks rules
  // Always render the exercise component to ensure hooks are called consistently
  if (exercise.type === 'choice') {
    return <ChoiceExercise exercise={exercise} isCompleted={isCompleted} onComplete={onComplete} />;
  }
  if (exercise.type === 'multi') {
    return <MultiExercise exercise={exercise} isCompleted={isCompleted} onComplete={onComplete} />;
  }
  if (exercise.type === 'short') {
    return <ShortExercise exercise={exercise} isCompleted={isCompleted} onComplete={onComplete} />;
  }
  if (exercise.type === 'matching') {
    return <MatchingExercise exercise={exercise} isCompleted={isCompleted} onComplete={onComplete} />;
  }
  if (exercise.type === 'drag-sequence') {
    return <DragSequenceExercise exercise={exercise} isCompleted={isCompleted} onComplete={onComplete} />;
  }
  if (exercise.type === 'mcq-set') {
    return <McqSetExercise exercise={exercise} isCompleted={isCompleted} onComplete={onComplete} />;
  }
  if (exercise.type === 'scenario') {
    return <ScenarioExercise exercise={exercise} isCompleted={isCompleted} onComplete={onComplete} />;
  }
  return <StickerRepairExercise exercise={exercise} isCompleted={isCompleted} onComplete={onComplete} />;
}

function ResultCard({
  passed,
  score,
  maxScore,
  feedback,
  rewardBadge,
  onRetry,
}: {
  passed: boolean;
  score: number;
  maxScore: number;
  feedback: string;
  rewardBadge?: { name: string; icon: string };
  onRetry: () => void;
}) {
  return (
    <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-xl text-center p-8" dir="rtl">
      <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
      <h3 className="text-2xl font-extrabold text-yellow-800 mb-2">
        {passed ? 'رائع! 🎉' : 'حاول مرة أخرى! 💪'}
      </h3>
      <p className="text-lg font-bold text-gray-800 mb-4">{feedback}</p>
      {passed && rewardBadge?.name ? (
        <div className="bg-white rounded-2xl p-4 mb-4 border-2 border-yellow-300">
          <p className="font-extrabold text-gray-800">🏅 شارة التمرين</p>
          <p className="text-xl font-bold text-green-700">
            {rewardBadge.icon} {rewardBadge.name}
          </p>
        </div>
      ) : null}
      <div className="bg-white rounded-2xl p-4 mb-4 border-2 border-yellow-300">
        <p className="text-gray-800 font-bold">نقاطك: {score} / {maxScore}</p>
        <p className="text-gray-600 text-sm">النجاح من 70% فما فوق</p>
      </div>
      <Button
        onClick={onRetry}
        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg"
      >
        <RefreshCcw className="ml-2 w-5 h-5" /> إعادة المحاولة
      </Button>
      <div className="mt-4">
        <FriendlyAnimal type="rabbit" emotion={passed ? "celebrating" : "thinking"} size="medium" />
      </div>
    </Card>
  );
}

// Helper function to remove checkmarks and other answer indicators from option text for display
function cleanOptionText(text: string): string {
  return text.replace(/\s*✅\s*/g, '').replace(/\s*✓\s*/g, '').trim();
}

function ChoiceExercise({ exercise, isCompleted, onComplete }: { exercise: ChoiceExerciseV2; isCompleted?: boolean; onComplete: (score: number, maxScore: number) => void }) {
  const maxScore = exercise.points;
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<null | { passed: boolean; score: number; feedback: string }>(null);
  const correct = selected === exercise.correct;

  // Completed view (server says completed)
  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden" dir="rtl">
        <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
              <p className="text-green-600 font-bold">حصلت على {exercise.points} نقطة ✨</p>
            </div>
          </div>
          <EcoHero size="medium" emotion="happy" animation="bounce" />
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <ResultCard
        passed={result.passed}
        score={result.score}
        maxScore={maxScore}
        feedback={result.feedback}
        rewardBadge={exercise.rewardBadge}
        onRetry={() => setResult(null)}
      />
    );
  }

  return (
    <Card className="border-4 border-blue-200 rounded-3xl overflow-hidden shadow-xl" dir="rtl">
      <CardHeader className="bg-blue-50 border-b-2 border-blue-100">
        <CardTitle className="text-xl font-extrabold text-blue-900">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-lg font-bold text-gray-800 mb-5 whitespace-pre-wrap">{exercise.prompt}</p>
        <div className="grid grid-cols-1 gap-3">
          {exercise.options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={`p-4 rounded-2xl border-4 font-bold text-right transition-all active:scale-95 ${selected === opt ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-gray-100 bg-white hover:border-blue-300'
                }`}
            >
              {cleanOptionText(opt)}
            </button>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
          <p className="font-bold text-amber-700">+{exercise.points} نقطة</p>
          <Button
            onClick={() => {
              const score = correct ? maxScore : 0;
              const passed = score >= maxScore * 0.7;
              const feedback = correct ? exercise.successMessage : exercise.errorMessage;
              setResult({ passed, score, feedback });
              onComplete(score, maxScore);
            }}
            disabled={!selected}
            className="rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            تحقّق ✅
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MultiExercise({ exercise, isCompleted, onComplete }: { exercise: MultiSelectExerciseV2; isCompleted?: boolean; onComplete: (score: number, maxScore: number) => void }) {
  const maxScore = exercise.points;
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<null | { passed: boolean; score: number; feedback: string }>(null);
  const correctSet = useMemo(() => new Set(exercise.correct), [exercise.correct]);
  const toggle = (opt: string) => setSelected(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);

  // Completed view (server says completed)
  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden" dir="rtl">
        <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
              <p className="text-green-600 font-bold">حصلت على {exercise.points} نقطة ✨</p>
            </div>
          </div>
          <EcoHero size="medium" emotion="happy" animation="bounce" />
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <ResultCard
        passed={result.passed}
        score={result.score}
        maxScore={maxScore}
        feedback={result.feedback}
        rewardBadge={exercise.rewardBadge}
        onRetry={() => setResult(null)}
      />
    );
  }

  const correctCount = selected.filter(s => correctSet.has(s)).length;
  const wrongCount = selected.filter(s => !correctSet.has(s)).length;
  const raw = correctCount - wrongCount;
  const score = Math.max(0, Math.round((raw / Math.max(1, exercise.correct.length)) * maxScore));
  const passed = score >= maxScore * 0.7;

  return (
    <Card className="border-4 border-purple-200 rounded-3xl overflow-hidden shadow-xl" dir="rtl">
      <CardHeader className="bg-purple-50 border-b-2 border-purple-100">
        <CardTitle className="text-xl font-extrabold text-purple-900">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-lg font-bold text-gray-800 whitespace-pre-wrap">{exercise.prompt}</p>
        <div className="space-y-3">
          {exercise.options.map((opt: string) => (
            <div key={opt} className="flex items-center gap-3 p-3 rounded-2xl border-2 border-purple-100 bg-white">
              <Checkbox checked={selected.includes(opt)} onCheckedChange={() => toggle(opt)} />
              <p className="font-bold text-gray-800">{opt}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="font-bold text-amber-700">+{exercise.points} نقطة</p>
          <Button
            onClick={() => {
              const feedback = passed ? exercise.successMessage : exercise.errorMessage;
              setResult({ passed, score, feedback });
              onComplete(score, maxScore);
            }}
            disabled={selected.length === 0}
            className="rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            تحقّق ✅
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ShortExercise({ exercise, isCompleted, onComplete }: { exercise: ShortAnswerExerciseV2; isCompleted?: boolean; onComplete: (score: number, maxScore: number) => void }) {
  const maxScore = exercise.points;
  const [text, setText] = useState('');
  const [result, setResult] = useState<null | { passed: boolean; score: number; feedback: string }>(null);

  // Completed view (server says completed)
  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden" dir="rtl">
        <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
              <p className="text-green-600 font-bold">حصلت على {exercise.points} نقطة ✨</p>
            </div>
          </div>
          <EcoHero size="medium" emotion="happy" animation="bounce" />
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <ResultCard
        passed={result.passed}
        score={result.score}
        maxScore={maxScore}
        feedback={result.feedback}
        rewardBadge={exercise.rewardBadge}
        onRetry={() => setResult(null)}
      />
    );
  }

  const normalized = (text || '').toLowerCase();
  const hits = exercise.requiredKeywords.filter((k: string) => normalized.includes(k.toLowerCase())).length;
  const score = Math.round((hits / Math.max(1, exercise.requiredKeywords.length)) * maxScore);
  const passed = score >= maxScore * 0.7;

  return (
    <Card className="border-4 border-emerald-200 rounded-3xl overflow-hidden shadow-xl" dir="rtl">
      <CardHeader className="bg-emerald-50 border-b-2 border-emerald-100">
        <CardTitle className="text-xl font-extrabold text-emerald-900">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-lg font-bold text-gray-800 whitespace-pre-wrap">{exercise.prompt}</p>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={exercise.placeholder || 'اكتب إجابتك هنا...'}
          className="h-14 rounded-2xl text-lg"
        />
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="font-bold text-amber-700">+{exercise.points} نقطة</p>
          <Button
            onClick={() => {
              const feedback = passed ? exercise.successMessage : exercise.errorMessage;
              setResult({ passed, score, feedback });
              onComplete(score, maxScore);
            }}
            disabled={text.trim().length < 3}
            className="rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            إرسال ✅
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function stableHash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function MatchingExercise({ exercise, isCompleted, onComplete }: { exercise: MatchingExerciseV2; isCompleted?: boolean; onComplete: (score: number, maxScore: number) => void }) {
  const maxScore = exercise.points;
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [result, setResult] = useState<null | { passed: boolean; score: number; feedback: string }>(null);

  const leftItems = useMemo(() => exercise.pairs.map((p) => p.left), [exercise.pairs]);
  // Deterministic "shuffle" (no Math.random) to satisfy purity lint
  const rightItems = useMemo(() => {
    const items = exercise.pairs.map((p) => p.right);
    return items.sort((a, b) => stableHash(`${exercise.id}:${a}`) - stableHash(`${exercise.id}:${b}`));
  }, [exercise.id, exercise.pairs]);
  const isMatched = (x: string) => matched.includes(x);

  // Completed view (server says completed)
  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden" dir="rtl">
        <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
              <p className="text-green-600 font-bold">حصلت على {exercise.points} نقطة ✨</p>
            </div>
          </div>
          <EcoHero size="medium" emotion="happy" animation="bounce" />
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <ResultCard
        passed={result.passed}
        score={result.score}
        maxScore={maxScore}
        feedback={result.feedback}
        rewardBadge={exercise.rewardBadge}
        onRetry={() => setResult(null)}
      />
    );
  }

  const finishAll = () => {
    const score = maxScore;
    const passed = true;
    const fb = exercise.successMessage;
    setResult({ passed, score, feedback: fb });
    onComplete(score, maxScore);
  };

  const pickRight = (right: string) => {
    if (!selectedLeft || isMatched(right)) return;
    const pair = exercise.pairs.find((p) => p.left === selectedLeft);
    if (pair && pair.right === right) {
      setMatched(prev => [...prev, selectedLeft, right]);
      setSelectedLeft(null);
      setFeedback('✅ تطابق صحيح!');
      window.setTimeout(() => setFeedback(''), 1000);
      if (matched.length + 2 === exercise.pairs.length * 2) {
        finishAll();
      }
    } else {
      setFeedback('❌ غير صحيح، حاول مرة أخرى!');
      window.setTimeout(() => { setFeedback(''); setSelectedLeft(null); }, 1000);
    }
  };

  return (
    <Card className="border-4 border-sky-200 rounded-3xl overflow-hidden shadow-xl" dir="rtl">
      <CardHeader className="bg-sky-50 border-b-2 border-sky-100">
        <CardTitle className="text-xl font-extrabold text-sky-900">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-lg font-bold text-gray-800 whitespace-pre-wrap">{exercise.prompt}</p>
        {feedback ? (
          <div className={`rounded-xl p-3 text-center border-2 ${feedback.startsWith('✅') ? 'bg-green-100 border-green-300 text-green-700' : 'bg-red-100 border-red-300 text-red-700'}`}>
            <p className="font-bold">{feedback}</p>
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="font-bold text-gray-700 text-center">اليسار</p>
            {leftItems.map((l: string) => (
              <button
                key={l}
                onClick={() => { if (!isMatched(l)) setSelectedLeft(l); }}
                disabled={isMatched(l)}
                className={`w-full p-4 rounded-2xl border-4 font-bold text-right transition-all active:scale-95 ${isMatched(l) ? 'bg-green-500 text-white border-green-600' : selectedLeft === l ? 'bg-sky-500 text-white border-sky-600' : 'bg-white border-sky-100 hover:border-sky-300'
                  }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-bold text-gray-700 text-center">اليمين</p>
            {rightItems.map((r: string) => (
              <button
                key={r}
                onClick={() => pickRight(r)}
                disabled={isMatched(r)}
                className={`w-full p-4 rounded-2xl border-4 font-bold text-right transition-all active:scale-95 ${isMatched(r) ? 'bg-green-500 text-white border-green-600' : 'bg-white border-purple-100 hover:border-purple-300'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-amber-100 rounded-xl p-4 border-2 border-amber-300 text-center">
          <p className="font-bold text-amber-800">
            المطابقات: {matched.length / 2} / {exercise.pairs.length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function StickerRepairExercise({ exercise, isCompleted, onComplete }: { exercise: StickerRepairExerciseV2; isCompleted?: boolean; onComplete: (score: number, maxScore: number) => void }) {
  const maxScore = exercise.points;
  const [dragId, setDragId] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [result, setResult] = useState<null | { passed: boolean; score: number; feedback: string }>(null);

  // Completed view (server says completed)
  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden" dir="rtl">
        <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
              <p className="text-green-600 font-bold">حصلت على {exercise.points} نقطة ✨</p>
            </div>
          </div>
          <EcoHero size="medium" emotion="happy" animation="bounce" />
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <ResultCard
        passed={result.passed}
        score={result.score}
        maxScore={maxScore}
        feedback={result.feedback}
        rewardBadge={exercise.rewardBadge}
        onRetry={() => { setResult(null); setPlacements({}); setDragId(null); }}
      />
    );
  }

  const placedCount = Object.keys(placements).length;

  const onDrop = (slotId: string) => {
    if (!dragId) return;
    const sticker = exercise.stickers.find((s) => s.id === dragId);
    if (!sticker) return;
    setPlacements(prev => ({ ...prev, [slotId]: dragId }));
    setDragId(null);
  };

  const submitSticker = () => {
    const correct = exercise.slots.filter((slot) => {
      const sid = placements[slot.id];
      const st = exercise.stickers.find((s) => s.id === sid);
      return st?.slotId === slot.id;
    }).length;
    const score = Math.round((correct / Math.max(1, exercise.slots.length)) * maxScore);
    const passed = score >= maxScore * 0.7;
    const fb = passed ? exercise.successMessage : exercise.errorMessage;
    setResult({ passed, score, feedback: fb });
    onComplete(score, maxScore);
  };

  return (
    <Card className="border-4 border-rose-200 rounded-3xl overflow-hidden shadow-xl" dir="rtl">
      <CardHeader className="bg-rose-50 border-b-2 border-rose-100">
        <CardTitle className="text-xl font-extrabold text-rose-900">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-lg font-bold text-gray-800 whitespace-pre-wrap">{exercise.prompt}</p>
        <div className="bg-white rounded-2xl border-4 border-rose-200 p-4">
          <p className="font-extrabold text-gray-800 mb-3">{exercise.sceneTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {exercise.slots.map((slot) => {
              const sid = placements[slot.id];
              const st = exercise.stickers.find((s) => s.id === sid);
              return (
                <div
                  key={slot.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(slot.id)}
                  className="min-h-[90px] rounded-2xl border-4 border-dashed border-rose-300 bg-rose-50 p-4"
                >
                  <p className="font-bold text-rose-800 mb-2">{slot.label}</p>
                  <div className="text-3xl">
                    {st ? st.emoji : '⬇️'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-rose-50 rounded-2xl border-2 border-rose-200 p-4">
          <p className="font-bold text-rose-800 mb-3">الملصقات:</p>
          <div className="flex flex-wrap gap-3">
            {exercise.stickers.map((s) => (
              <div
                key={s.id}
                draggable
                onDragStart={() => setDragId(s.id)}
                className="cursor-move select-none px-4 py-3 rounded-2xl border-2 border-rose-200 bg-white shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <span className="text-2xl ml-2">{s.emoji}</span>
                <span className="font-bold text-gray-800">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="font-bold text-amber-700">+{exercise.points} نقطة</p>
          <Button
            onClick={submitSticker}
            disabled={placedCount === 0}
            className="rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            تحقّق ✅
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DragSequenceExercise({ exercise, isCompleted, onComplete }: { exercise: DragSequenceExerciseV2; isCompleted?: boolean; onComplete: (score: number, maxScore: number) => void }) {
  const maxScore = exercise.points;
  
  // ALL hooks must be called before any conditional returns
  const byId = useMemo(() => new Map(exercise.items.map((i) => [i.id, i])), [exercise.items]);
  
  // Shuffle initial order using deterministic hash (same shuffle every render for same exercise)
  const initialOrder = useMemo(() => {
    const items = [...exercise.items];
    // Use exercise ID for deterministic shuffle
    return items.sort((a, b) => {
      const hashA = stableHash(`${exercise.id}:${a.id}`);
      const hashB = stableHash(`${exercise.id}:${b.id}`);
      return hashA - hashB;
    }).map(i => i.id);
  }, [exercise.id, exercise.items]);
  
  const [order, setOrder] = useState<string[]>(initialOrder);
  const [dragId, setDragId] = useState<string | null>(null);
  const [result, setResult] = useState<null | { passed: boolean; score: number; feedback: string }>(null);

  // Completed view (server says completed)
  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden" dir="rtl">
        <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
              <p className="text-green-600 font-bold">حصلت على {exercise.points} نقطة ✨</p>
            </div>
          </div>
          <EcoHero size="medium" emotion="happy" animation="bounce" />
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <ResultCard
        passed={result.passed}
        score={result.score}
        maxScore={maxScore}
        feedback={result.feedback}
        rewardBadge={exercise.rewardBadge}
        onRetry={() => { setResult(null); setOrder(initialOrder); setDragId(null); }}
      />
    );
  }

  const move = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    setOrder((prev) => {
      const next = [...prev];
      const si = next.indexOf(sourceId);
      const ti = next.indexOf(targetId);
      if (si < 0 || ti < 0) return prev;
      next.splice(si, 1);
      next.splice(ti, 0, sourceId);
      return next;
    });
  };

  const submit = () => {
    const correctPositions = order.filter((id, idx) => id === exercise.correctOrder[idx]).length;
    const score = Math.round((correctPositions / Math.max(1, exercise.correctOrder.length)) * maxScore);
    const passed = score >= maxScore * 0.7;
    const fb = passed ? exercise.successMessage : exercise.errorMessage;
    setResult({ passed, score, feedback: fb });
    onComplete(score, maxScore);
  };

  return (
    <Card className="border-4 border-sky-200 rounded-3xl overflow-hidden shadow-xl" dir="rtl">
      <CardHeader className="bg-sky-50 border-b-2 border-sky-100">
        <CardTitle className="text-xl font-extrabold text-sky-900">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-lg font-bold text-gray-800 whitespace-pre-wrap">{exercise.prompt}</p>
        <div className="bg-white rounded-2xl border-4 border-sky-200 p-4">
          <p className="font-bold text-sky-800 mb-3">اسحب العناصر لتعديل الترتيب 👇</p>
          <div className="flex flex-col gap-3">
            {order.map((id) => {
              const item = byId.get(id);
              return (
                <div
                  key={id}
                  draggable
                  onDragStart={() => setDragId(id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => { if (dragId) move(dragId, id); }}
                  className="cursor-move select-none rounded-2xl border-2 border-sky-100 bg-gradient-to-r from-white to-sky-50 p-4 font-extrabold text-gray-800 shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <span className="ml-2 text-2xl">{item?.emoji || '🔸'}</span>
                  {item?.label || id}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="font-bold text-amber-700">+{exercise.points} نقطة</p>
          <Button
            onClick={submit}
            className="rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            تحقّق ✅
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function McqSetExercise({ exercise, isCompleted, onComplete }: { exercise: McqSetExerciseV2; isCompleted?: boolean; onComplete: (score: number, maxScore: number) => void }) {
  const maxScore = exercise.points;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<null | { passed: boolean; score: number; feedback: string }>(null);

  // Completed view (server says completed)
  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden" dir="rtl">
        <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
              <p className="text-green-600 font-bold">حصلت على {exercise.points} نقطة ✨</p>
            </div>
          </div>
          <EcoHero size="medium" emotion="happy" animation="bounce" />
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <ResultCard
        passed={result.passed}
        score={result.score}
        maxScore={maxScore}
        feedback={result.feedback}
        rewardBadge={exercise.rewardBadge}
        onRetry={() => { setResult(null); setAnswers({}); }}
      />
    );
  }

  const correctCount = exercise.questions.filter((q) => answers[q.id] === q.correct).length;
  const score = Math.round((correctCount / Math.max(1, exercise.questions.length)) * maxScore);
  const passed = score >= maxScore * 0.7;

  const submit = () => {
    const fb = passed ? exercise.successMessage : exercise.errorMessage;
    setResult({ passed, score, feedback: fb });
    onComplete(score, maxScore);
  };

  return (
    <Card className="border-4 border-indigo-200 rounded-3xl overflow-hidden shadow-xl" dir="rtl">
      <CardHeader className="bg-indigo-50 border-b-2 border-indigo-100">
        <CardTitle className="text-xl font-extrabold text-indigo-900">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-lg font-bold text-gray-800 whitespace-pre-wrap">{exercise.prompt}</p>
        <div className="space-y-4">
          {exercise.questions.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-2xl border-2 border-indigo-100 p-4">
              <p className="font-extrabold text-gray-800 mb-3">س{idx + 1}: {q.question}</p>
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                    className={`p-3 rounded-2xl border-2 font-bold text-right transition-all active:scale-95 ${
                      answers[q.id] === opt ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-gray-100 bg-white hover:border-indigo-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="font-bold text-amber-700">+{exercise.points} نقطة</p>
          <Button
            onClick={submit}
            disabled={Object.keys(answers).length < exercise.questions.length}
            className="rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            إرسال ✅
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ScenarioExercise({ exercise, isCompleted, onComplete }: { exercise: ScenarioExerciseV2; isCompleted?: boolean; onComplete: (score: number, maxScore: number) => void }) {
  const maxScore = exercise.points;
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<null | { passed: boolean; score: number; feedback: string }>(null);

  // Completed view (server says completed)
  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500 bg-green-50 rounded-2xl overflow-hidden" dir="rtl">
        <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xl font-bold text-green-800">أحسنت! لقد أكملت هذا التمرين بنجاح</p>
              <p className="text-green-600 font-bold">حصلت على {exercise.points} نقطة ✨</p>
            </div>
          </div>
          <EcoHero size="medium" emotion="happy" animation="bounce" />
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <ResultCard
        passed={result.passed}
        score={result.score}
        maxScore={maxScore}
        feedback={result.feedback}
        rewardBadge={exercise.rewardBadge}
        onRetry={() => { setResult(null); setSelected(null); }}
      />
    );
  }

  const submit = () => {
    const correct = selected === exercise.correct;
    const score = correct ? maxScore : 0;
    const passed = score >= maxScore * 0.7;
    const fb = correct ? exercise.successMessage : exercise.errorMessage;
    setResult({ passed, score, feedback: fb });
    onComplete(score, maxScore);
  };

  return (
    <Card className="border-4 border-emerald-200 rounded-3xl overflow-hidden shadow-xl" dir="rtl">
      <CardHeader className="bg-emerald-50 border-b-2 border-emerald-100">
        <CardTitle className="text-xl font-extrabold text-emerald-900">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-lg font-bold text-gray-800 whitespace-pre-wrap">{exercise.prompt}</p>
        <div className="bg-white rounded-2xl border-2 border-emerald-100 p-4">
          <p className="font-extrabold text-gray-800 whitespace-pre-wrap">{exercise.scenario}</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {exercise.options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={`p-4 rounded-2xl border-4 font-bold text-right transition-all active:scale-95 ${
                selected === opt ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-gray-100 bg-white hover:border-emerald-300'
              }`}
            >
              {cleanOptionText(opt)}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="font-bold text-amber-700">+{exercise.points} نقطة</p>
          <Button
            onClick={submit}
            disabled={!selected}
            className="rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            تأكيد ✅
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


