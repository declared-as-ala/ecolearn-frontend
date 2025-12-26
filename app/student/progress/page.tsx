'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usersAPI, Progress } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award, Trophy, TrendingUp, BookOpen, Gamepad2 } from 'lucide-react';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import EcoHero from '@/components/cartoons/EcoHero';
import WiseGuide from '@/components/cartoons/WiseGuide';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

export default function ProgressPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
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
    
    loadData();
  }, [user, loading, router]);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const progressData = await usersAPI.getProgress().catch(() => []);
      setProgress(progressData || []);
    } catch (error: any) {
      console.error('Failed to load data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const completedLessons = progress.filter(p => p.lesson && p.status === 'completed').length;
  const completedGames = progress.filter(p => p.game && p.status === 'completed').length;
  const totalPoints = user?.points || 0;
  const currentLevel = user?.level || 0;
  const pointsInCurrentLevel = totalPoints % 100;
  const progressPercentage = Math.min((pointsInCurrentLevel / 100) * 100, 100);
  const remainingPoints = Math.max(100 - pointsInCurrentLevel, 0);

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
        {/* Header Section with Cartoons */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white border-0 shadow-xl rounded-2xl">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <WiseGuide size="large" emotion="proud" animation="nod" />
                  <div>
                    <h1 className="text-4xl font-bold mb-2">⭐ تقدّمي</h1>
                    <p className="text-xl text-amber-50">راقب تقدمك وإنجازاتك</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level & Progress Section */}
        <Card className="mb-6 bg-gradient-to-br from-amber-600 to-[#8B4513] text-white border-0 shadow-xl rounded-2xl border-l-4 border-l-yellow-400">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-8 h-8" />
                <h3 className="text-3xl font-bold">المستوى الحالي: المستوى {currentLevel}</h3>
                <FriendlyAnimal type="bird" emotion="excited" size="small" />
              </div>
              
              <div className="bg-white/20 rounded-xl p-4 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">التقدم نحو المستوى التالي</span>
                  <span className="text-xl font-bold">{pointsInCurrentLevel} / 100 نقطة</span>
                </div>
                <ProgressBar 
                  value={progressPercentage} 
                  className="h-4 bg-white/30 rounded-full"
                />
              </div>
              
              <p className="text-lg text-amber-100 font-semibold">
                باقي {remainingPoints} نقطة للوصول إلى المستوى {currentLevel + 1} 🎯
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white border-2 border-green-300 shadow-lg rounded-xl hover:shadow-xl transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">الدروس المكتملة</p>
                  <p className="text-4xl font-bold text-green-600">{completedLessons}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-amber-300 shadow-lg rounded-xl hover:shadow-xl transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">الألعاب المكتملة</p>
                  <p className="text-4xl font-bold text-amber-600">{completedGames}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                  <Gamepad2 className="w-7 h-7 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-[#8B4513] shadow-lg rounded-xl hover:shadow-xl transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">مجموع النقاط</p>
                  <p className="text-4xl font-bold text-[#8B4513]">{totalPoints}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#f5e6d3] flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-[#8B4513]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card className="bg-white shadow-lg rounded-2xl border-2 border-yellow-200">
          <CardHeader className="bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-t-2xl border-b-2 border-yellow-200">
            <CardTitle className="text-2xl font-bold text-yellow-700 flex items-center gap-2">
              <Award className="w-6 h-6" />
              🏅 شاراتي
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {!user.badges || user.badges.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-dashed border-yellow-300">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <EcoHero size="large" emotion="thinking" animation="idle" />
                  <Award className="w-20 h-20 text-yellow-400 opacity-50" />
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  لم تحصل على شارات بعد
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  واصل اللعب وتعلم للحصول على شارات رائعة! 🌟
                </p>
                <div className="flex items-center justify-center gap-3">
                  <FriendlyAnimal type="turtle" emotion="curious" size="small" />
                  <FriendlyAnimal type="fish" emotion="happy" size="small" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user.badges.map((badge, index) => (
                  <Card 
                    key={index}
                    className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 rounded-xl text-center hover:scale-105 transition-transform relative overflow-hidden"
                  >
                    <div className="absolute top-1 right-1">
                      <FriendlyAnimal 
                        type={['bird', 'rabbit', 'butterfly', 'turtle'][index % 4] as any} 
                        emotion="happy" 
                        size="small" 
                      />
                    </div>
                    <CardContent className="pt-6">
                      <Award className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                      <p className="font-bold text-gray-800">{badge}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


