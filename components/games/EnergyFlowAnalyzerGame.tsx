'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';
import GameUnderDevelopment from './GameUnderDevelopment';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface EnergyFlowAnalyzerGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface EnergyStep {
  id: string;
  label: string;
  icon: string;
  order: number;
}

export default function EnergyFlowAnalyzerGame({ game, onComplete }: EnergyFlowAnalyzerGameProps) {
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  const data = game.gameData || {};
  const questions = data.questions || [];
  const isUnderDevelopment = data.underDevelopment !== false;

  if (isUnderDevelopment) {
    return <GameUnderDevelopment gameTitle={game.title} gameDescription={game.description} />;
  }

  if (completed || currentQuestion >= questions.length) {
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
            ممتاز! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-700 mb-4"
          >
            لقد فهمت تدفق الطاقة في النظام البيئي!
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-3xl font-bold text-purple-600 mb-6"
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

  const currentQ = questions[currentQuestion];
  const availableSteps: EnergyStep[] = currentQ?.steps || [];

  const handleStepSelect = (stepId: string) => {
    if (selectedSteps.includes(stepId)) {
      setSelectedSteps(selectedSteps.filter(id => id !== stepId));
    } else {
      setSelectedSteps([...selectedSteps, stepId]);
    }
  };

  const handleSubmit = () => {
    const correctOrder = availableSteps
      .sort((a, b) => a.order - b.order)
      .map(s => s.id);
    
    const isCorrect = JSON.stringify(selectedSteps) === JSON.stringify(correctOrder);

    if (isCorrect) {
      setScore(score + 20);
      setFeedback({ type: 'success', message: 'صحيح! تدفق الطاقة صحيح 🌟' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedSteps([]);
        if (currentQuestion + 1 >= questions.length) {
          setCompleted(true);
          onComplete?.(game.points || 30);
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
      }, 1500);
    } else {
      setFeedback({ 
        type: 'error', 
        message: 'غير صحيح. تذكر: الطاقة تنتقل من المنتج إلى المستهلك 🔄' 
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
          <p className="text-purple-100">{game.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
            </div>
            <div className="text-right">
              <div className="text-lg">السؤال {currentQuestion + 1} / {questions.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="bg-white border-2 border-purple-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{currentQ?.question}</h3>
          
          {/* Available Steps */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">رتب الخطوات بالترتيب الصحيح:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSteps.map((step, index) => {
                const orderIndex = selectedSteps.indexOf(step.id);
                const isSelected = orderIndex !== -1;
                return (
                  <motion.button
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStepSelect(step.id)}
                    className={`p-4 rounded-xl border-2 transition-all relative ${
                      isSelected
                        ? 'border-purple-500 bg-purple-100 shadow-lg ring-2 ring-purple-300'
                        : 'border-gray-300 bg-white hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg"
                      >
                        {orderIndex + 1}
                      </motion.div>
                    )}
                    <motion.div
                      animate={isSelected ? { 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ repeat: isSelected ? Infinity : 0, duration: 1 }}
                      className="text-3xl mb-2"
                    >
                      {step.icon}
                    </motion.div>
                    <div className="font-bold text-gray-800">{step.label}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Selected Order */}
          {selectedSteps.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">الترتيب المختار:</p>
              <div className="flex flex-wrap gap-2 items-center">
                {selectedSteps.map((stepId, index) => {
                  const step = availableSteps.find(s => s.id === stepId);
                  return (
                    <motion.div
                      key={stepId}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <span className="text-xl">{step?.icon}</span>
                        <span className="font-bold">{step?.label}</span>
                      </div>
                      {index < selectedSteps.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-purple-500" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-xl mb-4 ${
                  feedback.type === 'success'
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-red-100 border-2 border-red-500 text-red-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-bold">{feedback.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            whileHover={selectedSteps.length === availableSteps.length ? { scale: 1.05, y: -2 } : {}}
            whileTap={selectedSteps.length === availableSteps.length ? { scale: 0.95 } : {}}
            onClick={handleSubmit}
            disabled={selectedSteps.length !== availableSteps.length}
            className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all ${
              selectedSteps.length === availableSteps.length
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {selectedSteps.length === availableSteps.length ? (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                تحقق من الإجابة ✨
              </motion.span>
            ) : (
              `اختر ${availableSteps.length - selectedSteps.length} خطوة أخرى`
            )}
          </motion.button>
        </CardContent>
      </Card>
    </div>
  );
}

