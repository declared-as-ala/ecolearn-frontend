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
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#F1F8E9] to-[#FFFDE7]" dir="rtl">
      <StudentSidebar />

      <main className="mr-64 p-8">
        {/* Header Section with Cartoons - Extra Playful */}
        <div className="mb-10 relative">
          <div className="absolute -top-6 -right-6 animate-pulse hidden lg:block">
            <FriendlyAnimal type="butterfly" emotion="excited" size="large" />
          </div>
          <Card className="bg-gradient-to-r from-[#FF9800] via-[#FFB74D] to-[#FFCC80] text-white border-0 shadow-2xl rounded-[2rem] overflow-hidden transform hover:-rotate-1 transition-transform">
            <CardContent className="py-10 px-8 relative">
              {/* Decorative bubbles */}
              <div className="absolute top-2 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 right-1/4 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl"></div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-6">
                  <div className="bg-white/90 p-3 rounded-3xl shadow-lg transform rotate-3 hover:rotate-0 transition-all">
                    <WiseGuide size="large" emotion="proud" animation="nod" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-black mb-3 drop-shadow-md">🌟 لوحة إنجازاتي</h1>
                    <p className="text-2xl text-amber-50 font-bold opacity-90">شاهد كم أنت رائع يا بطل البيئة! 🌱</p>
                  </div>
                </div>
                <div className="hidden md:block scale-110">
                  <EcoHero size="large" emotion="happy" animation="bounce" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Level & Progress Section - LEFT SIDE (Large) */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="bg-white border-4 border-[#8BC34A] shadow-[0_10px_0_0_rgba(139,195,74,0.3)] rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity"></div>
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl border-4 border-white transform group-hover:scale-110 transition-transform duration-500">
                      <Trophy className="w-20 h-20 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white px-4 py-1 rounded-full shadow-lg border-2 border-yellow-400">
                      <span className="text-xl font-black text-yellow-600">Lvl {currentLevel}</span>
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-3xl font-black text-[#4CAF50]">مستواك الحالي: {currentLevel}</h3>
                      <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl border-2 border-green-100">
                        <FriendlyAnimal type="bird" emotion="happy" size="small" />
                        <span className="font-bold text-green-600">أنت تبلي بلاءً حسناً!</span>
                      </div>
                    </div>

                    <div className="bg-[#F1F8E9] rounded-3xl p-6 border-2 border-green-100 shadow-inner">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-green-700">التقدم نحو المستوى التالي الأسطوري</span>
                        <span className="text-2xl font-black text-[#8BC34A]">{pointsInCurrentLevel} / 100 🌟</span>
                      </div>
                      <div className="relative h-8 bg-white rounded-full overflow-hidden border-2 border-green-200 shadow-sm">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8BC34A] to-[#CDDC39] transition-all duration-1000 ease-out"
                          style={{ width: `${progressPercentage}%`, left: 'auto', right: 0 }}
                        >
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        </div>
                      </div>
                      <p className="mt-4 text-center text-lg text-green-600 font-bold animate-bounce">
                        🚀 باقٍ لك {remainingPoints} نقطة فقط لتصل للقمة!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Cards - Vibrant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'الدروس المكتملة', count: completedLessons, icon: BookOpen, color: '#4DB6AC', bgColor: '#E0F2F1', emoji: '📚' },
                { title: 'الألعاب المكتملة', count: completedGames, icon: Gamepad2, color: '#BA68C8', bgColor: '#F3E5F5', emoji: '🎮' },
                { title: 'نقاط الطاقة', count: totalPoints, icon: TrendingUp, color: '#FFD54F', bgColor: '#FFF8E1', emoji: '⚡' }
              ].map((stat, i) => (
                <Card
                  key={i}
                  className="border-4 shadow-lg rounded-[2rem] overflow-hidden transform hover:translate-y-[-8px] transition-all duration-300"
                  style={{ borderColor: stat.color, backgroundColor: 'white' }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6 shadow-md" style={{ backgroundColor: stat.bgColor }}>
                        <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                      </div>
                      <p className="text-gray-500 font-bold mb-1">{stat.title}</p>
                      <p className="text-4xl font-black" style={{ color: stat.color }}>{stat.count} {stat.emoji}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Badges Section - RIGHT SIDE (3D look) */}
          <div className="lg:col-span-4">
            <Card className="h-full bg-white border-4 border-[#FFA000] shadow-[0_10px_0_0_rgba(255,160,0,0.3)] rounded-[2.5rem] overflow-hidden flex flex-col">
              <CardHeader className="bg-gradient-to-r from-[#FFD54F] to-[#FFA000] p-6 border-b-4 border-[#FFA000]">
                <CardTitle className="text-3xl font-black text-white flex items-center justify-center gap-3 drop-shadow-sm">
                  <Award className="w-8 h-8" />
                  خزانة الأوسمة 🏅
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]">
                {!user.badges || user.badges.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <FriendlyAnimal type="rabbit" emotion="curious" size="large" />
                    <p className="text-2xl font-black text-gray-400 mt-6 mb-2">الخزانة فارغة حالياً!</p>
                    <p className="text-lg text-gray-500 font-medium px-4">أكمل الألعاب والدروس لتبدأ في جمع الأوسمة الملونة! 🌈</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                    {user.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-l from-white to-gray-50 border-4 border-yellow-200 rounded-3xl p-4 flex items-center gap-4 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
                          <Award className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-xl text-gray-800">{badge}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs font-bold text-amber-600 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            وسام الفخر
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200 flex items-center justify-center gap-4">
                  <FriendlyAnimal type="turtle" emotion="happy" size="small" />
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">استمر في العطاء يا بطل! 🌍</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ffd54f;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ffb300;
        }
      `}</style>
    </div>
  );
}


