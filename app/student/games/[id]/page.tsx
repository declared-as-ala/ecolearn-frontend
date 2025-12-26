'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { gamesAPI, Game } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import QuizGame from '@/components/games/QuizGame';
import DragDropGame from '@/components/games/DragDropGame';
import MemoryGame from '@/components/games/MemoryGame';
import ScenarioGame from '@/components/games/ScenarioGame';
import ChallengeGame from '@/components/games/ChallengeGame';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import EcoHero from '@/components/cartoons/EcoHero';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      router.push('/login');
      return;
    }
    loadGame();
  }, [params.id]);

  const loadGame = async () => {
    try {
      const gameData = await gamesAPI.getOne(params.id as string);
      setGame(gameData);
    } catch (error) {
      console.error('Failed to load game:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3]" dir="rtl">
        <StudentSidebar />
        <div className="mr-64 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <EcoHero size="large" emotion="happy" animation="bounce" className="mx-auto mb-4" />
            <p className="text-green-700 font-semibold text-xl">جاري التحميل... 🌱</p>
          </div>
        </div>
      </div>
    );
  }

  const renderGame = () => {
    switch (game.type) {
      case 'quiz':
        return <QuizGame game={game} />;
      case 'dragdrop':
        return <DragDropGame game={game} />;
      case 'memory':
        return <MemoryGame game={game} />;
      case 'scenario':
        return <ScenarioGame game={game} />;
      case 'challenge':
        return <ChallengeGame game={game} />;
      default:
        return <p>Game type not supported</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3]" dir="rtl">
      <StudentSidebar />
      <main className="mr-64 p-6">
        {renderGame()}
      </main>
    </div>
  );
}



