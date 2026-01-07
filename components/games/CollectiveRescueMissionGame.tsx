'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface CollectiveRescueMissionGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Task {
  id: string;
  label: string;
  icon: string;
  category: 'clean' | 'awareness' | 'plant' | 'protect';
  assigned: number;
  required: number;
}

export default function CollectiveRescueMissionGame({ game, onComplete }: CollectiveRescueMissionGameProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamSize, setTeamSize] = useState(10);
  const [availableMembers, setAvailableMembers] = useState(10);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [missionComplete, setMissionComplete] = useState(false);

  const data = game.gameData || {};
  const rounds = data.rounds || 3;

  useEffect(() => {
    if (round >= rounds) {
      setCompleted(true);
      onComplete?.(game.points || 50);
      return;
    }

    // Initialize tasks for this round
    const initialTasks: Task[] = [
      { id: 'clean', label: 'تنظيف', icon: '🧹', category: 'clean', assigned: 0, required: 3 },
      { id: 'awareness', label: 'توعية', icon: '📢', category: 'awareness', assigned: 0, required: 2 },
      { id: 'plant', label: 'تشجير', icon: '🌱', category: 'plant', assigned: 0, required: 3 },
      { id: 'protect', label: 'حماية', icon: '🛡️', category: 'protect', assigned: 0, required: 2 },
    ];
    setTasks(initialTasks);
    setAvailableMembers(teamSize);
    setMissionComplete(false);
    setFeedback(null);
  }, [round, rounds, teamSize, game.points, onComplete]);

  useEffect(() => {
    // Check if mission is complete
    const allTasksComplete = tasks.every(task => task.assigned >= task.required);
    const membersUsed = tasks.reduce((sum, task) => sum + task.assigned, 0);
    const isBalanced = Math.max(...tasks.map(t => t.assigned)) - Math.min(...tasks.map(t => t.assigned)) <= 2;

    if (allTasksComplete && membersUsed <= teamSize && isBalanced && !missionComplete) {
      setMissionComplete(true);
      setScore(score + 25);
      setFeedback({ type: 'success', message: 'ممتاز! المهمة مكتملة بتوازن! 🤝✨' });
      
      setTimeout(() => {
        setFeedback(null);
        if (round + 1 < rounds) {
          setRound(round + 1);
        } else {
          setCompleted(true);
          onComplete?.(game.points || 50);
        }
      }, 2000);
    } else if (membersUsed > teamSize) {
      setFeedback({ type: 'error', message: '❌ لا يمكن توزيع أعضاء أكثر من المتاح! 💔' });
      setTimeout(() => setFeedback(null), 2000);
    } else if (!isBalanced && allTasksComplete) {
      setFeedback({ type: 'error', message: '⚠️ التوزيع غير متوازن! يجب توزيع المهام بشكل متساوٍ 💔' });
    }
  }, [tasks, teamSize, missionComplete, round, rounds, score, onComplete, game.points]);

  const handleTaskAssign = (taskId: string, delta: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newAssigned = Math.max(0, Math.min(task.required + 2, task.assigned + delta));
        return { ...task, assigned: newAssigned };
      }
      return task;
    }));

    const totalAssigned = tasks.reduce((sum, task) => 
      sum + (task.id === taskId ? Math.max(0, Math.min(task.required + 2, task.assigned + delta)) : task.assigned), 0
    );
    setAvailableMembers(teamSize - totalAssigned);
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
            لقد قادت الفريق بنجاح! العمل الجماعي هو الحل! 🤝
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

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-blue-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-2xl font-bold">{availableMembers}</span>
              </div>
              <div className="text-sm">أعضاء متاحون</div>
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
              <div className="text-sm opacity-80">المهمة {round + 1} / {rounds}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800 text-center">
            <strong>كيف تلعب:</strong> وزع أعضاء الفريق على المهام. يجب إكمال جميع المهام مع التوازن بينها! 🤝
          </p>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-200 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">توزيع المهام</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task, index) => {
              const isComplete = task.assigned >= task.required;
              const isOverAssigned = task.assigned > task.required + 1;
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 ${
                    isComplete && !isOverAssigned
                      ? 'bg-green-100 border-green-400 shadow-lg'
                      : isOverAssigned
                      ? 'bg-yellow-100 border-yellow-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{task.icon}</div>
                      <div>
                        <div className="font-bold text-gray-800 text-lg">{task.label}</div>
                        <div className="text-sm text-gray-600">المطلوب: {task.required} أعضاء</div>
                      </div>
                    </div>
                    {isComplete && !isOverAssigned && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTaskAssign(task.id, -1)}
                      disabled={task.assigned <= 0}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-xl">➖</span>
                    </motion.button>
                    <div className="text-4xl font-bold text-gray-800 w-16 text-center">
                      {task.assigned}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTaskAssign(task.id, 1)}
                      disabled={availableMembers <= 0}
                      className="p-2 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-xl">➕</span>
                    </motion.button>
                  </div>

                  {/* Progress */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className={`h-3 rounded-full ${
                        isComplete ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (task.assigned / task.required) * 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

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
          <span>{round + 1} / {rounds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${((round + 1) / rounds) * 100}%` }}
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

