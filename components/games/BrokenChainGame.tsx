'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface BrokenChainGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface ChainLink {
  id: string;
  label: string;
  icon: string;
  type: 'producer' | 'consumer1' | 'consumer2' | 'decomposer';
  present: boolean;
}

interface Scenario {
  id: string;
  chain: ChainLink[];
  missingElement: string;
  question: string;
  consequences: string[];
}

export default function BrokenChainGame({ game, onComplete }: BrokenChainGameProps) {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedMissing, setSelectedMissing] = useState<string | null>(null);
  const [selectedConsequence, setSelectedConsequence] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showConsequences, setShowConsequences] = useState(false);

  const data = game.gameData || {};
  const scenarios: Scenario[] = data.scenarios || [
    {
      id: 's1',
      chain: [
        { id: 'grass', label: 'العشب', icon: '🌿', type: 'producer', present: false },
        { id: 'rabbit', label: 'الأرنب', icon: '🐰', type: 'consumer1', present: true },
        { id: 'fox', label: 'الثعلب', icon: '🦊', type: 'consumer2', present: true },
        { id: 'bacteria', label: 'البكتيريا', icon: '🦠', type: 'decomposer', present: true },
      ],
      missingElement: 'grass',
      question: 'ماذا ينقص في هذه السلسلة الغذائية؟',
      consequences: [
        'الأرنب لا يجد غذاء',
        'الأرنب يموت جوعاً',
        'الثعلب لا يجد غذاء',
        'الثعلب يموت جوعاً',
        'النظام البيئي ينهار',
      ],
    },
    {
      id: 's2',
      chain: [
        { id: 'algae', label: 'الطحالب', icon: '🌊', type: 'producer', present: true },
        { id: 'fish', label: 'الأسماك', icon: '🐟', type: 'consumer1', present: true },
        { id: 'shark', label: 'القرش', icon: '🦈', type: 'consumer2', present: true },
        { id: 'bacteria', label: 'البكتيريا', icon: '🦠', type: 'decomposer', present: false },
      ],
      missingElement: 'bacteria',
      question: 'ماذا يحدث إذا اختفى المفكك؟',
      consequences: [
        'الجثث تتراكم',
        'المواد العضوية لا تتحلل',
        'التربة لا تحصل على غذاء',
        'النباتات لا تنمو',
        'النظام البيئي يختل',
      ],
    },
    {
      id: 's3',
      chain: [
        { id: 'tree', label: 'الشجرة', icon: '🌳', type: 'producer', present: true },
        { id: 'bird', label: 'الطائر', icon: '🐦', type: 'consumer1', present: false },
        { id: 'snake', label: 'الأفعى', icon: '🐍', type: 'consumer2', present: true },
        { id: 'bacteria', label: 'البكتيريا', icon: '🦠', type: 'decomposer', present: true },
      ],
      missingElement: 'bird',
      question: 'ماذا يحدث إذا اختفى المستهلك الأول؟',
      consequences: [
        'الأفعى لا تجد غذاء',
        'الأفعى تموت جوعاً',
        'البكتيريا لا تجد جثث',
        'النظام البيئي يختل',
      ],
    },
  ];

  useEffect(() => {
    if (round < scenarios.length) {
      setCurrentScenario(scenarios[round]);
      setSelectedMissing(null);
      setSelectedConsequence(null);
      setShowConsequences(false);
      setFeedback(null);
    } else {
      setCompleted(true);
      onComplete?.(game.points || 45);
    }
  }, [round, scenarios.length, game.points, onComplete]);

  const handleMissingSelect = (elementId: string) => {
    if (!currentScenario) return;

    setSelectedMissing(elementId);
    const isCorrect = elementId === currentScenario.missingElement;

    if (isCorrect) {
      setScore(score + 10);
      setFeedback({ type: 'success', message: 'صحيح! الآن فكر في العواقب...' });
      setShowConsequences(true);
      setTimeout(() => setFeedback(null), 2000);
    } else {
      setFeedback({ type: 'error', message: '❌ خطأ! فكر مرة أخرى 💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedMissing(null);
      }, 2000);
    }
  };

  const handleConsequenceSelect = (consequence: string) => {
    if (!currentScenario || !showConsequences) return;

    setSelectedConsequence(consequence);
    const isCorrect = currentScenario.consequences.includes(consequence);

    if (isCorrect) {
      setScore(score + 10);
      setFeedback({ type: 'success', message: 'ممتاز! فهمت العواقب ✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < scenarios.length) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 45);
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: '❌ هذا ليس صحيحاً! فكر في العواقب الحقيقية 💔' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedConsequence(null);
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
        <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8" dir="rtl">
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
            لقد فهمت أهمية كل عنصر في السلسلة الغذائية!
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

  if (!currentScenario) return null;

  const missingElement = currentScenario.chain.find(l => !l.present);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-purple-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">السؤال {round + 1} / {scenarios.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chain Display */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">السلسلة الغذائية المنكسرة 💔</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            {currentScenario.chain.map((link, index) => (
              <div key={link.id} className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: link.present ? 1 : 0.3,
                    opacity: link.present ? 1 : 0.5
                  }}
                  className={`p-4 rounded-xl border-2 ${
                    link.present
                      ? 'bg-white border-green-400 shadow-lg'
                      : 'bg-gray-200 border-red-400 border-dashed'
                  }`}
                >
                  {link.present ? (
                    <>
                      <div className="text-4xl mb-1">{link.icon}</div>
                      <div className="text-xs font-bold text-gray-800">{link.label}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl mb-1">❓</div>
                      <div className="text-xs font-bold text-red-600">مفقود</div>
                    </>
                  )}
                </motion.div>
                {index < currentScenario.chain.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <span className="text-2xl">→</span>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Question */}
          <div className="bg-white p-4 rounded-xl mb-6 border-2 border-blue-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">{currentScenario.question}</h4>
            
            {!showConsequences ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentScenario.chain.map((link) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMissingSelect(link.id)}
                    disabled={selectedMissing !== null}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedMissing === link.id
                        ? link.id === currentScenario.missingElement
                          ? 'border-green-500 bg-green-100 shadow-lg ring-4 ring-green-300'
                          : 'border-red-500 bg-red-100 shadow-lg ring-4 ring-red-300'
                        : selectedMissing !== null
                        ? 'border-gray-300 bg-gray-100 opacity-50'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-3xl mb-2">{link.icon}</div>
                    <div className="text-sm font-bold text-gray-800">{link.label}</div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-center text-gray-700 mb-4">ما هي العواقب إذا اختفى هذا العنصر؟</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentScenario.consequences.map((consequence, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleConsequenceSelect(consequence)}
                      disabled={selectedConsequence !== null}
                      className={`p-3 rounded-lg border-2 text-right transition-all ${
                        selectedConsequence === consequence
                          ? 'border-green-500 bg-green-100 shadow-lg'
                          : selectedConsequence !== null
                          ? 'border-gray-300 bg-gray-100 opacity-50'
                          : 'border-gray-300 bg-white hover:border-purple-400 hover:shadow-lg cursor-pointer'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-800">{consequence}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

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
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{round + 1} / {scenarios.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / scenarios.length) * 100}%` }}
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

