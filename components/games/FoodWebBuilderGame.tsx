'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import EcoHero from '../cartoons/EcoHero';

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface FoodWebBuilderGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

interface Node {
  id: string;
  label: string;
  icon: string;
  type: 'producer' | 'consumer1' | 'consumer2' | 'decomposer';
  x: number;
  y: number;
  hasFood?: boolean;
  isEaten?: boolean;
}

interface Connection {
  from: string;
  to: string;
}

export default function FoodWebBuilderGame({ game, onComplete }: FoodWebBuilderGameProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const data = game.gameData || {};
  const initialNodes: Node[] = data.nodes || [
    { id: 'grass', label: 'العشب', icon: '🌿', type: 'producer', x: 20, y: 30 },
    { id: 'rabbit', label: 'الأرنب', icon: '🐰', type: 'consumer1', x: 50, y: 30 },
    { id: 'fox', label: 'الثعلب', icon: '🦊', type: 'consumer2', x: 80, y: 30 },
    { id: 'eagle', label: 'النسر', icon: '🦅', type: 'consumer2', x: 50, y: 60 },
    { id: 'bacteria', label: 'البكتيريا', icon: '🦠', type: 'decomposer', x: 50, y: 80 },
  ];

  const validConnections: Connection[] = data.validConnections || [
    { from: 'grass', to: 'rabbit' },
    { from: 'rabbit', to: 'fox' },
    { from: 'rabbit', to: 'eagle' },
    { from: 'fox', to: 'bacteria' },
    { from: 'eagle', to: 'bacteria' },
  ];

  useEffect(() => {
    setNodes(initialNodes);
  }, []);

  useEffect(() => {
    if (completed) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [completed]);

  useEffect(() => {
    checkWeb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connections]);

  const checkWeb = () => {
    const newErrors: string[] = [];
    const nodeErrors: { [key: string]: boolean } = {};

    nodes.forEach(node => {
      if (node.type === 'producer') {
        // Producer doesn't need food, but should be eaten
        const isEaten = connections.some(c => c.from === node.id);
        if (!isEaten && nodes.some(n => n.type !== 'producer')) {
          newErrors.push(`${node.label} لا يُؤكل!`);
          nodeErrors[node.id] = true;
        }
      } else {
        // Consumer/Decomposer needs food
        const hasFood = connections.some(c => c.to === node.id);
        if (!hasFood) {
          newErrors.push(`${node.label} جائع! يحتاج غذاء 😢`);
          nodeErrors[node.id] = true;
        }
      }
    });

    setErrors(newErrors);
    setNodes(prev => prev.map(n => ({
      ...n,
      hasFood: connections.some(c => c.to === n.id),
      isEaten: connections.some(c => c.from === n.id),
    })));

    // Check if web is complete and correct
    if (newErrors.length === 0 && connections.length >= validConnections.length) {
      const allValid = validConnections.every(vc =>
        connections.some(c => c.from === vc.from && c.to === vc.to)
      );
      const noExtra = connections.length === validConnections.length;
      if (allValid && noExtra) {
        setTimeout(() => {
          setCompleted(true);
          onComplete?.(game.points || 50);
        }, 1000);
      }
    }
  };

  const handleNodeClick = (nodeId: string) => {
    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else if (selectedNode === nodeId) {
      setSelectedNode(null);
    } else {
      // Create connection
      const fromNode = nodes.find(n => n.id === selectedNode);
      const toNode = nodes.find(n => n.id === nodeId);

      if (!fromNode || !toNode) return;

      // Validate: producer can only be "from", consumers can be "to"
      if (fromNode.type === 'producer' && toNode.type !== 'producer') {
        // Valid: producer -> consumer
        const newConnection: Connection = { from: selectedNode, to: nodeId };
        if (!connections.some(c => c.from === selectedNode && c.to === nodeId)) {
          setConnections([...connections, newConnection]);
          setScore(score + 5);
          setFeedback({ type: 'success', message: 'اتصال صحيح! ✨' });
          setTimeout(() => setFeedback(null), 1000);
        }
      } else if (fromNode.type !== 'producer' && toNode.type === 'decomposer') {
        // Valid: consumer -> decomposer
        const newConnection: Connection = { from: selectedNode, to: nodeId };
        if (!connections.some(c => c.from === selectedNode && c.to === nodeId)) {
          setConnections([...connections, newConnection]);
          setScore(score + 5);
          setFeedback({ type: 'success', message: 'اتصال صحيح! ✨' });
          setTimeout(() => setFeedback(null), 1000);
        }
      } else if (fromNode.type !== 'producer' && toNode.type !== 'producer' && toNode.type !== 'decomposer') {
        // Valid: consumer -> consumer (higher level)
        const newConnection: Connection = { from: selectedNode, to: nodeId };
        if (!connections.some(c => c.from === selectedNode && c.to === nodeId)) {
          setConnections([...connections, newConnection]);
          setScore(score + 5);
          setFeedback({ type: 'success', message: 'اتصال صحيح! ✨' });
          setTimeout(() => setFeedback(null), 1000);
        }
      } else {
        setFeedback({ type: 'error', message: '❌ هذا الاتصال غير صحيح! تذكر: المنتج → المستهلك → المحلل' });
        setTimeout(() => setFeedback(null), 2000);
      }

      setSelectedNode(null);
    }
  };

  const handleRemoveConnection = (from: string, to: string) => {
    setConnections(connections.filter(c => !(c.from === from && c.to === to)));
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
            رائع! هذا نظام متوازن يحمي الحياة 🦉🌍
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
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-purple-100">{game.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <span className="text-2xl font-bold">{timeLeft}</span>
              </div>
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">نقاط</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800 text-center">
            <strong>كيف تلعب:</strong> اضغط على كائن أولاً، ثم اضغط على من يأكله. كل كائن يحتاج غذاء! 😢
          </p>
        </CardContent>
      </Card>

      {/* Game Canvas */}
      <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-4 border-green-300 rounded-2xl overflow-hidden relative">
        <CardContent className="p-6">
          <div className="relative w-full h-[500px] bg-white/50 rounded-xl">
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((conn, idx) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                const x1 = (fromNode.x / 100) * 500;
                const y1 = (fromNode.y / 100) * 500;
                const x2 = (toNode.x / 100) * 500;
                const y2 = (toNode.y / 100) * 500;

                return (
                  <motion.line
                    key={`${conn.from}-${conn.to}-${idx}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#10b981"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                    className="cursor-pointer"
                    onClick={() => handleRemoveConnection(conn.from, conn.to)}
                  />
                );
              })}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
                </marker>
              </defs>
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const hasError = errors.some(e => e.includes(node.label));
              const isSelected = selectedNode === node.id;
              return (
                <motion.button
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: hasError ? [1, 1.2, 1] : isSelected ? 1.2 : 1,
                    opacity: 1,
                    boxShadow: hasError 
                      ? ['0 0 0px rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0)']
                      : isSelected
                      ? '0 0 20px rgba(59, 130, 246, 0.8)'
                      : '0 0 0px rgba(0, 0, 0, 0)'
                  }}
                  transition={{ 
                    scale: { duration: 0.2 },
                    boxShadow: { duration: 0.3 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNodeClick(node.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    hasError ? 'animate-pulse' : ''
                  }`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    zIndex: 10,
                  }}
                >
                  <div className={`p-4 rounded-full border-4 ${
                    hasError
                      ? 'bg-red-100 border-red-500'
                      : !node.hasFood && node.type !== 'producer'
                      ? 'bg-yellow-100 border-yellow-500'
                      : isSelected
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-white border-green-400'
                  } shadow-xl`}>
                    <div className="text-4xl mb-1">{node.icon}</div>
                    {hasError && (
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="text-2xl"
                      >
                        😢
                      </motion.div>
                    )}
                    <div className="text-xs font-bold text-gray-800 mt-1">{node.label}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-red-100 border-2 border-red-500 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-800">يجب تصحيح الأخطاء خلال {timeLeft} ثانية:</span>
              </div>
              <ul className="list-disc list-inside text-red-700">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-4 rounded-xl text-center ${
                  feedback.type === 'success'
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-red-100 border-2 border-red-500 text-red-800'
                }`}
              >
                <span className="font-bold">{feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Web Glow Effect */}
          {errors.length === 0 && connections.length >= validConnections.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/30 to-green-400/20 rounded-xl pointer-events-none z-0"
            />
          )}

          {/* Success Message */}
          {errors.length === 0 && connections.length >= validConnections.length && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-xl">
                <span className="font-bold text-lg">✨ الشبكة متوازنة! ✨</span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

