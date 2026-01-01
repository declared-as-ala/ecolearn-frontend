'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, RefreshCcw, XCircle, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { gamesAPI } from '@/lib/api';
import EcoHero from '../cartoons/EcoHero';

// --- Interfaces ---

interface Game {
  _id: string;
  title: string;
  description: string;
  points: number;
  gameData?: any;
}

interface ConstructionGameProps {
  game: Game;
  onComplete: (points: number) => void;
}

interface NodeElement {
  id: string;
  label: string;
  type: 'producer' | 'consumer' | 'decomposer' | 'source';
  icon: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

interface Connection {
  from: string;
  to: string;
}

// --- Component ---

export default function ConstructionGame({ game, onComplete }: ConstructionGameProps) {
  const { user } = useAuth();

  // State
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Data
  const data = game.gameData || {};
  const nodes: NodeElement[] = data.nodes || [];
  const validConnections: Connection[] = data.validConnections || [];
  const minConnectionsToWin = data.minConnections || 5;

  // --- Handlers ---

  const handleNodeClick = (nodeId: string) => {
    setFeedback(null);

    // If selecting first node (Source)
    if (!selectedNode) {
      setSelectedNode(nodeId);
      return;
    }

    // If clicking same node -> deselect
    if (selectedNode === nodeId) {
      setSelectedNode(null);
      return;
    }

    // Try to connect Source -> Target
    validateConnection(selectedNode, nodeId);
    setSelectedNode(null);
  };

  const validateConnection = (sourceId: string, targetId: string) => {
    // Check if connection already exists
    const exists = connections.some(c => c.from === sourceId && c.to === targetId);
    if (exists) {
      setFeedback({ type: 'error', message: 'هذه الرابطة موجودة بالفعل!' });
      return;
    }

    // Check validity strictness
    const isValid = validConnections.some(
      vc => (vc.from === sourceId && vc.to === targetId)
    );

    if (isValid) {
      const newConnections = [...connections, { from: sourceId, to: targetId }];
      setConnections(newConnections);
      setFeedback({ type: 'success', message: 'رابط صحيح! أحسنت 🌟' });

      // Check win condition
      if (newConnections.length >= minConnectionsToWin) {
        // Optionally wait for user to click "Finish" or auto-finish.
        // Let's auto-finish if all possible valid connections are made OR show a button.
        // For better UX, we'll show a "Finish" button once min is reached.
      }
    } else {
      setFeedback({ type: 'error', message: 'خطأ! لا توجد علاقة غذائية مباشرة هنا ❌' });
    }
  };

  const removeConnection = (index: number) => {
    const newConnections = [...connections];
    newConnections.splice(index, 1);
    setConnections(newConnections);
  };

  const handleFinish = () => {
    // Double check logic (though we validate on add)
    if (connections.length < minConnectionsToWin) {
      setFeedback({ type: 'error', message: `تحتاج إلى ${minConnectionsToWin} روابط على الأقل!` });
      return;
    }

    setCompleted(true);
    const maxPoints = game.points || 100;
    setScore(maxPoints);
    if (onComplete) onComplete(maxPoints);

    // Submit score
    gamesAPI.submitScore(game._id, { score: maxPoints, maxScore: maxPoints, answers: [] })
      .catch(console.error);
  };

  const handleRestart = () => {
    setConnections([]);
    setSelectedNode(null);
    setCompleted(false);
    setScore(0);
    setFeedback(null);
  };

  // --- Render Helpers ---

  // Helper to draw SVG lines safely
  const getLineCoords = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return { x: node.x, y: node.y };
  };

  if (completed) {
    return (
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl overflow-hidden p-8" dir="rtl">
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur shadow-xl border-4 border-indigo-400 rounded-3xl p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <Trophy className="w-32 h-32 text-indigo-500 mx-auto drop-shadow-lg" />
          </motion.div>

          <h2 className="text-4xl font-extrabold text-indigo-800">
            {data.rewardBadgeName || 'مهندس الشبكة الغذائية 🦉🌍'}
          </h2>

          <p className="text-xl text-gray-700 font-medium">
            مذهل! لقد بنيت شبكة غذائية متوازنة وقوية.
          </p>

          <div className="bg-purple-100 px-8 py-4 rounded-2xl border-2 border-purple-300 inline-block">
            <span className="text-3xl font-bold text-purple-700">+{score} نقطة</span>
          </div>

          <Button
            onClick={handleRestart}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-6 px-12 rounded-full shadow-lg"
          >
            <RefreshCcw className="mr-2 w-6 h-6" /> العب مجدداً
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none" dir="rtl">

      {/* Header */}
      <Card className="bg-white border-none shadow-md rounded-2xl p-4 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-3">
          <EcoHero size="small" emotion="happy" animation="bounce" />
          <div>
            <h3 className="font-bold text-lg text-gray-800">{game.title}</h3>
            <p className="text-sm text-gray-500">صل الكائنات ببعضها لبناء الشبكة (الأكل ⬅️ المأكول)</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block text-sm text-gray-400">الروابط</span>
            <span className={`text-xl font-bold ${connections.length >= minConnectionsToWin ? 'text-green-600' : 'text-orange-500'}`}>
              {connections.length} / {minConnectionsToWin}
            </span>
          </div>
          {connections.length >= minConnectionsToWin && (
            <Button onClick={handleFinish} className="bg-green-500 hover:bg-green-600 text-white font-bold animate-pulse">
              إنهاء اللعبة ✅
            </Button>
          )}
        </div>
      </Card>

      {/* Main Canvas */}
      <div className="relative w-full h-[600px] bg-slate-50 rounded-3xl overflow-hidden border-4 border-slate-200 shadow-inner">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10 pointer-events-none"></div>

        {/* SVG Layer for Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>
          {connections.map((conn, idx) => {
            const start = getLineCoords(conn.from);
            const end = getLineCoords(conn.to);
            return (
              <motion.line
                key={`${conn.from}-${conn.to}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1={`${start.x}%`} y1={`${start.y}%`}
                x2={`${end.x}%`} y2={`${end.y}%`}
                stroke="#94a3b8"
                strokeWidth="4"
                markerEnd="url(#arrowhead)"
                strokeDasharray="5,5"
              />
            );
          })}
          {selectedNode && (
            // Hint line from selected node to specific position? Not easy with mouse tracking in SVG in React standard way without heavy listeners.
            // We will skip dynamic line preview for simplicity, or just highlight selected node.
            null
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNode === node.id;
          const isConnected = connections.some(c => c.from === node.id || c.to === node.id);

          return (
            <motion.div
              key={node.id}
              className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer transform transition-all z-20 border-4 ${isSelected ? 'border-blue-500 bg-blue-50 scale-110 ring-4 ring-blue-200' :
                  isConnected ? 'border-green-400 bg-white' :
                    'border-gray-300 bg-white hover:border-gray-400'
                }`}
              style={{ left: `calc(${node.x}% - 40px)`, top: `calc(${node.y}% - 40px)` }}
              onClick={() => handleNodeClick(node.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-4xl">{node.icon}</span>
              <span className="text-xs font-bold text-gray-600 mt-1 bg-white/80 px-2 rounded-full">{node.label}</span>
            </motion.div>
          );
        })}

        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-xl font-bold z-50 flex items-center gap-2 ${feedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
            >
              {feedback.type === 'success' ? <LinkIcon className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
