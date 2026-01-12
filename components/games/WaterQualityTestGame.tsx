'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, TestTube, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import { playSuccessSound, playErrorSound, playCompletionSound } from '@/lib/sounds';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface WaterQualityTestGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface WaterSample {
  id: string;
  name: string;
  pH: number;
  bacteria: number; // 0-100
  chemicals: number; // 0-100
  isSafe: boolean;
  description: string;
}

interface TestResult {
  tool: 'pH' | 'bacteria' | 'chemicals';
  value: number;
  status: 'safe' | 'warning' | 'danger';
}

export default function WaterQualityTestGame({ game, onComplete }: WaterQualityTestGameProps) {
  const [currentSample, setCurrentSample] = useState<WaterSample | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedVerdict, setSelectedVerdict] = useState<'safe' | 'unsafe' | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [testsCompleted, setTestsCompleted] = useState(0);

  const data = game.gameData || {};
  const samples: WaterSample[] = data.samples || [
    {
      id: 's1',
      name: 'عينة ماء من نهر نظيف',
      pH: 7.2,
      bacteria: 5,
      chemicals: 2,
      isSafe: true,
      description: 'ماء نظيف وصالح للشرب',
    },
    {
      id: 's2',
      name: 'عينة ماء من نهر ملوث',
      pH: 4.5,
      bacteria: 85,
      chemicals: 90,
      isSafe: false,
      description: 'ماء ملوث وغير صالح للشرب',
    },
    {
      id: 's3',
      name: 'عينة ماء من بئر',
      pH: 6.8,
      bacteria: 15,
      chemicals: 10,
      isSafe: true,
      description: 'ماء صالح للشرب بعد المعالجة',
    },
  ];

  useEffect(() => {
    if (round < samples.length) {
      setCurrentSample(samples[round]);
      setTestResults([]);
      setSelectedVerdict(null);
      setTestsCompleted(0);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 45);
    }
  }, [round, samples.length, game.points, onComplete]);

  const runTest = (tool: 'pH' | 'bacteria' | 'chemicals') => {
    if (!currentSample || testResults.find(r => r.tool === tool)) return;

    let value: number;
    let status: 'safe' | 'warning' | 'danger';

    if (tool === 'pH') {
      value = currentSample.pH;
      status = value >= 6.5 && value <= 8.5 ? 'safe' : value >= 5 && value <= 9 ? 'warning' : 'danger';
    } else if (tool === 'bacteria') {
      value = currentSample.bacteria;
      status = value < 20 ? 'safe' : value < 50 ? 'warning' : 'danger';
    } else {
      value = currentSample.chemicals;
      status = value < 20 ? 'safe' : value < 50 ? 'warning' : 'danger';
    }

    setTestResults([...testResults, { tool, value, status }]);
    setTestsCompleted(testsCompleted + 1);
  };

  const handleVerdictSelect = (verdict: 'safe' | 'unsafe') => {
    if (!currentSample || testsCompleted < 3) {
      playErrorSound();
      setFeedback({ type: 'error', message: '❌ يجب إجراء جميع الاختبارات أولاً! 💔' });
      setTimeout(() => setFeedback(null), 2000);
      return;
    }

    setSelectedVerdict(verdict);
    const isCorrect = (verdict === 'safe' && currentSample.isSafe) || 
                     (verdict === 'unsafe' && !currentSample.isSafe);

    if (isCorrect) {
      setScore(score + 20);
      playSuccessSound();
      setFeedback({ type: 'success', message: 'ممتاز! قرار صحيح! الماء ' + (currentSample.isSafe ? 'صالح' : 'غير صالح') + ' للشرب! ✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < samples.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          playCompletionSound();
          onComplete?.(game.points || 45);
        }
      }, 2000);
    } else {
      playErrorSound();
      setFeedback({ type: 'error', message: '❌ خطأ! الماء ' + (currentSample.isSafe ? 'صالح' : 'غير صالح') + ' للشرب! 💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedVerdict(null);
      }, 2000);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 drop-shadow-lg" />
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-green-800 mb-2"
          >
            رائع! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-4"
          >
            أنت مراقب جودة الماء! لقد اختبرت جميع العينات بشكل صحيح!
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-3xl font-bold text-green-600 mb-6"
          >
            النقاط: {score} ⭐
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <EcoHero size="large" emotion="celebrating" animation="bounce" />
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  if (!currentSample) return null;

  const getStatusColor = (status: 'safe' | 'warning' | 'danger') => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100 border-green-400';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-400';
      case 'danger': return 'text-red-600 bg-red-100 border-red-400';
    }
  };

  const getStatusIcon = (status: 'safe' | 'warning' | 'danger') => {
    switch (status) {
      case 'safe': return '✅';
      case 'warning': return '⚠️';
      case 'danger': return '❌';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-cyan-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">العينة {round + 1} / {samples.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Water Sample */}
      <Card className="bg-gradient-to-br from-gray-50 to-cyan-50 border-4 border-cyan-300 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{currentSample.name}</h3>
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">🧪</div>
            <p className="text-lg text-gray-600">{currentSample.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Test Tools */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">أدوات الاختبار:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['pH', 'bacteria', 'chemicals'] as const).map((tool, index) => {
              const result = testResults.find(r => r.tool === tool);
              const isTested = !!result;
              
              return (
                <motion.button
                  key={tool}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!isTested ? { scale: 1.05, y: -5 } : {}}
                  whileTap={!isTested ? { scale: 0.95 } : {}}
                  onClick={() => runTest(tool)}
                  disabled={isTested}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isTested
                      ? 'border-gray-300 bg-gray-100 opacity-50'
                      : 'border-blue-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="text-5xl mb-3">
                    {tool === 'pH' ? '📊' : tool === 'bacteria' ? '🦠' : '⚗️'}
                  </div>
                  <div className="font-bold text-gray-800 text-lg mb-2">
                    {tool === 'pH' ? 'اختبار الحموضة' : tool === 'bacteria' ? 'اختبار البكتيريا' : 'اختبار المواد الكيميائية'}
                  </div>
                  {isTested && result && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`mt-3 p-3 rounded-lg border-2 ${getStatusColor(result.status)}`}
                    >
                      <div className="font-bold text-lg">
                        {getStatusIcon(result.status)} {result.value}
                        {tool === 'pH' ? '' : '%'}
                      </div>
                      <div className="text-sm mt-1">
                        {result.status === 'safe' ? 'آمن' : result.status === 'warning' ? 'تحذير' : 'خطر'}
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Verdict */}
      {testsCompleted >= 3 && (
        <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-4 border-green-200 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              بناءً على نتائج الاختبارات، الماء:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVerdictSelect('safe')}
                disabled={selectedVerdict !== null}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedVerdict === 'safe'
                    ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                    : selectedVerdict !== null
                    ? 'border-gray-300 bg-gray-100 opacity-50'
                    : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-lg cursor-pointer'
                }`}
              >
                <div className="text-5xl mb-3">✅</div>
                <div className="font-bold text-gray-800 text-xl">صالح للشرب</div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVerdictSelect('unsafe')}
                disabled={selectedVerdict !== null}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedVerdict === 'unsafe'
                    ? 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                    : selectedVerdict !== null
                    ? 'border-gray-300 bg-gray-100 opacity-50'
                    : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-lg cursor-pointer'
                }`}
              >
                <div className="text-5xl mb-3">❌</div>
                <div className="font-bold text-gray-800 text-xl">غير صالح للشرب</div>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl text-center ${
              feedback.type === 'success'
                ? 'bg-green-100 border-2 border-green-500 text-green-800'
                : 'bg-red-100 border-2 border-red-500 text-red-800'
            }`}
          >
            <span className="font-bold text-lg">{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {samples.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / samples.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

