'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { gamesAPI, usersAPI, Game, Progress, levelTestAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, PlayCircle, CheckCircle, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import EcoHero from '@/components/cartoons/EcoHero';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

export default function GamesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (user.role !== 'student') {
      router.push(`/${user.role}/dashboard`);
      return;
    }
    
    const gradeLevel = user.gradeLevel || (typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0);
    const levelKey = gradeLevel === 5 ? '5eme' : gradeLevel === 6 ? '6eme' : null;
    if (!levelKey) {
      router.push('/student/select-level');
      return;
    }

    levelTestAPI.getStatus(levelKey)
      .then(status => {
        if (!status.completed) {
          router.push(`/student/level-test?level=${levelKey}`);
          return;
        }
        loadData();
      })
      .catch(err => {
        console.error('Failed to check level test status', err);
        loadData();
      });
  }, [user, loading, router]);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const [gamesData, progressData] = await Promise.all([
        gamesAPI.getAll().catch(() => []),
        usersAPI.getProgress().catch(() => []),
      ]);
      
      setGames(gamesData || []);
      setProgress(progressData || []);
    } catch (error: any) {
      console.error('Failed to load data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const getProgressForGame = (gameId: string) => {
    return progress.find(p => p.game?._id === gameId);
  };

  // Check if game should be unlocked (for now, all games are unlocked)
  const isGameUnlocked = (game: Game) => {
    return true; // Can add logic to check if related lesson is completed
  };

  // Game type Arabic names
  const getGameTypeName = (type: string) => {
    const names: Record<string, string> = {
      'quiz': 'اختبار',
      'dragdrop': 'سحب وإفلات',
      'memory': 'لعبة الذاكرة',
      'scenario': 'مواقف',
      'challenge': 'تحديات'
    };
    return names[type] || type;
  };

  // Game type emoji and animal
  const getGameTypeInfo = (type: string, index: number) => {
    const info: Record<string, { emoji: string; animal: 'bird' | 'rabbit' | 'butterfly' | 'turtle' | 'fish' }> = {
      'quiz': { emoji: '📝', animal: 'bird' },
      'dragdrop': { emoji: '🎯', animal: 'rabbit' },
      'memory': { emoji: '🧠', animal: 'butterfly' },
      'scenario': { emoji: '🎭', animal: 'turtle' },
      'challenge': { emoji: '🏆', animal: 'fish' }
    };
    return info[type] || { emoji: '🎮', animal: ['bird', 'rabbit', 'butterfly', 'turtle', 'fish'][index % 5] as any };
  };

  if (loading || loadingData || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3]" dir="rtl">
        <StudentSidebar />
        <div className="text-center mr-64">
          <EcoHero size="large" emotion="happy" animation="bounce" className="mx-auto mb-4" />
          <p className="text-green-700 font-semibold text-xl">جاري التحميل... 🌱</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3]" dir="rtl">
      <StudentSidebar />
      
      <main className="mr-64 p-6">
        {/* Header Section with Cartoon */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-xl rounded-2xl">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FriendlyAnimal type="bird" emotion="excited" size="medium" />
                    <EcoHero size="large" emotion="celebrating" animation="jump" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">🎮 صندوق الألعاب</h1>
                    <p className="text-xl text-amber-50">العب وتعلم بطريقة ممتعة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Games Grid */}
        {games.length === 0 ? (
          <Card className="bg-white shadow-lg rounded-2xl border-2 border-amber-200">
            <CardContent className="pt-12 pb-12 text-center">
              <EcoHero size="large" emotion="thinking" animation="idle" className="mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">لا توجد ألعاب متاحة حالياً</p>
              <p className="text-gray-500">ستكون الألعاب متاحة قريباً! 🎮</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => {
              const gameProgress = getProgressForGame(game._id);
              const unlocked = isGameUnlocked(game);
              const isCompleted = gameProgress?.status === 'completed';
              const gameInfo = getGameTypeInfo(game.type, index);
              
              return (
                <Card
                  key={game._id}
                  className={`border-2 rounded-2xl hover:shadow-2xl transition-all overflow-hidden ${
                    unlocked 
                      ? isCompleted
                        ? 'border-green-400 bg-green-50 hover:scale-105'
                        : 'border-amber-300 bg-amber-50/50 hover:scale-105 hover:border-green-300'
                      : 'border-gray-200 bg-gray-100 opacity-60'
                  }`}
                >
                  <CardHeader className={`${
                    unlocked 
                      ? 'bg-gradient-to-r from-amber-100 to-green-50' 
                      : 'bg-gray-200'
                  } border-b-2 border-amber-200`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{gameInfo.emoji}</div>
                        <CardTitle className={`text-xl font-bold ${
                          unlocked ? 'text-amber-700' : 'text-gray-500'
                        }`}>
                          {game.title}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {!unlocked && <Lock className="w-6 h-6 text-gray-400" />}
                        {isCompleted && unlocked && <CheckCircle className="w-6 h-6 text-green-500" />}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    {/* Cartoon placeholder */}
                    <div className="mb-4 flex items-center justify-center h-32 bg-gradient-to-br from-amber-100 to-green-100 rounded-xl relative">
                      {unlocked ? (
                        <FriendlyAnimal 
                          type={gameInfo.animal} 
                          emotion={isCompleted ? 'excited' : 'happy'} 
                          size="large" 
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Lock className="w-12 h-12 text-gray-400" />
                          <EcoHero size="medium" emotion="sad" animation="idle" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-2">{game.description}</p>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {getGameTypeName(game.type)}
                        </Badge>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                          {game.difficulty}
                        </Badge>
                        <Badge className="bg-amber-500 text-white">
                          +{game.points} نقطة
                        </Badge>
                      </div>
                      
                      {isCompleted && (
                        <Badge className="bg-green-500 text-white w-full justify-center">
                          <CheckCircle className="w-3 h-3 ml-1" />
                          مكتمل ✅
                        </Badge>
                      )}
                      
                      {unlocked ? (
                        <Link href={`/student/games/${game._id}`}>
                          <Button 
                            className={`w-full ${
                              isCompleted 
                                ? 'bg-amber-600 hover:bg-amber-700' 
                                : 'bg-amber-500 hover:bg-amber-600'
                            } text-white rounded-xl`}
                          >
                            <PlayCircle className="w-4 h-4 ml-2" />
                            {isCompleted ? 'العب مرة أخرى' : 'العب الآن'}
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          className="w-full bg-gray-300 text-gray-500 cursor-not-allowed rounded-xl"
                          disabled
                        >
                          <Lock className="w-4 h-4 ml-2" />
                          مقفل - أكمل الدرس أولاً
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}





