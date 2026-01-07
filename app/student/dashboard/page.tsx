'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { usersAPI, Progress, User } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Leaf, Award, LogOut } from 'lucide-react';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import FeedbackMessage from '@/components/feedback/FeedbackMessage';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import EcoLoading from '@/components/ui/EcoLoading';
import { notificationsAPI, authAPI } from '@/lib/api';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

type Status = 'loading' | 'success' | 'empty' | 'error';

export default function StudentDashboard() {
  const { user, logout, loading: authLoading, updateUser } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [feedbackMessages, setFeedbackMessages] = useState<Array<{ _id: string; message: string; from?: string }>>([]);
  const hasFetchedRef = useRef(false);
  const hasRedirectedRef = useRef(false);

  // Fetch dashboard data - MUST always set status
  const fetchDashboard = React.useCallback(async () => {
    console.log('🔵 DASHBOARD FETCH START');
    
    // Check token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('🔵 TOKEN:', token ? 'EXISTS' : 'MISSING');
    
    if (!token) {
      console.log('❌ NO TOKEN - Setting error status');
      setStatus('error');
      setError('لم يتم العثور على رمز الدخول. يرجى تسجيل الدخول مرة أخرى.');
      return;
    }

    // Try to get user from context or localStorage
    const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null);
    const userId = currentUser?.id || currentUser?._id;
    console.log('🔵 USER:', currentUser ? `EXISTS (id: ${userId})` : 'MISSING');
    
    if (!currentUser) {
      console.log('❌ NO USER - Setting error status');
      setStatus('error');
      setError('لم يتم العثور على بيانات المستخدم.');
      return;
    }
    
    // If no userId, we can still try to fetch (API might work with token only)
    if (!userId) {
      console.log('⚠️ User exists but no id - proceeding anyway (API may work with token)');
    }

    try {
      setStatus('loading');
      setError(null);

      console.log('🔵 Fetching progress and notifications...');
      
      // Fetch data
      const [progressData, notificationsData] = await Promise.all([
        usersAPI.getProgress().catch((e) => {
          console.error('❌ Failed to load progress:', e);
          return [];
        }),
        notificationsAPI.getAll(true).catch((e) => {
          console.error('❌ Failed to load notifications:', e);
          return [];
        }),
      ]);

      console.log('🔵 API RESPONSE - Progress:', progressData?.length || 0, 'items');
      console.log('🔵 API RESPONSE - Notifications:', notificationsData?.length || 0, 'items');

      // Set progress
      setProgress(progressData || []);

      // Process feedback messages
      const feedbacks = (notificationsData || []).filter((n: any) => n.type === 'feedback' || n.type === 'teacher_feedback');
      setFeedbackMessages(feedbacks.map((n: any) => ({
        _id: n._id,
        message: n.message,
        from: n.from || 'معلمك'
      })));

      // Determine status
      const hasProgress = (progressData || []).length > 0;
      const completedLessons = (progressData || []).filter((p: Progress) => p.lesson && p.status === 'completed').length;
      const completedGames = (progressData || []).filter((p: Progress) => p.game && p.status === 'completed').length;
      
      if (!hasProgress && completedLessons === 0 && completedGames === 0) {
        console.log('✅ Setting EMPTY status');
        setStatus('empty');
      } else {
        console.log('✅ Setting SUCCESS status');
        setStatus('success');
      }

    } catch (error: any) {
      console.error('❌ DASHBOARD FETCH ERROR:', error);
      setStatus('error');
      setError(error?.message || 'تعذّر جلب البيانات، الرجاء المحاولة لاحقًا');
    }
  }, [user]);

  // Handle redirects in useEffect (not in render)
  useEffect(() => {
    console.log('🔵 DASHBOARD useEffect RUN', { authLoading, hasUser: !!user, userId: user?.id, hasFetched: hasFetchedRef.current });
    
    if (authLoading) {
      console.log('⏳ Auth still loading, waiting...');
      return;
    }

    // Redirect if no user (only once)
    if (!user) {
      console.log('❌ No user, redirecting to login');
      if (!hasRedirectedRef.current) {
        hasRedirectedRef.current = true;
        router.replace('/login');
      }
      return;
    }

    // Reset redirect flag when user exists
    hasRedirectedRef.current = false;

    // Redirect if wrong role
    if (user.role !== 'student') {
      console.log('❌ Wrong role, redirecting to', `/${user.role}/dashboard`);
      router.replace(`/${user.role}/dashboard`);
      return;
    }

    // Check grade level
    const gradeLevel = user.gradeLevel || (typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0);
    if (!gradeLevel || (gradeLevel !== 5 && gradeLevel !== 6)) {
      console.log('❌ No grade level, redirecting to select-level');
      router.replace('/student/select-level');
      return;
    }

    // Fetch data only once - use user from context or localStorage
    const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null);
    const userId = currentUser?.id || currentUser?._id;
    
    console.log('🔵 Current user check:', { 
      hasUser: !!currentUser, 
      userId: userId,
      userKeys: currentUser ? Object.keys(currentUser) : []
    });
    
    if (!hasFetchedRef.current && userId) {
      console.log('✅ Conditions met, calling fetchDashboard');
      hasFetchedRef.current = true;
      fetchDashboard();
    } else if (!hasFetchedRef.current && currentUser && !userId) {
      // User exists but no id - try to fetch anyway (might work with token)
      console.log('⚠️ User exists but no id, trying fetch anyway...');
      hasFetchedRef.current = true;
      fetchDashboard();
    } else {
      console.log('⏸️ Skipping fetch:', { hasFetched: hasFetchedRef.current, hasUserId: !!userId });
    }
  }, [authLoading, user?.id, router, fetchDashboard]); // Include fetchDashboard

  // Calculate stats
  const completedLessons = progress.filter(p => p.lesson && p.status === 'completed').length;
  const completedGames = progress.filter(p => p.game && p.status === 'completed').length;
  const totalPoints = user?.points || 0;
  const currentLevel = user?.level || 0;
  const gradeLevel = user?.gradeLevel || 5;
  const gradeLevelName = gradeLevel === 5 ? 'السنة الخامسة ابتدائي' : 'السنة السادسة ابتدائي';

  const pointsNeededForNextLevel = 100;
  const pointsInCurrentLevel = totalPoints % 100;
  const progressPercentage = Math.min((pointsInCurrentLevel / pointsNeededForNextLevel) * 100, 100);
  const remainingPoints = Math.max(pointsNeededForNextLevel - pointsInCurrentLevel, 0);

  // UI States - NO BLANK PAGE
  // Add timeout fallback to prevent infinite loading
  useEffect(() => {
    if (status === 'loading') {
      const timeout = setTimeout(() => {
        console.warn('⚠️ Loading timeout - forcing error state');
        setStatus('error');
        setError('استغرق تحميل البيانات وقتاً طويلاً. يرجى إعادة المحاولة.');
      }, 10000); // 10 seconds timeout

      return () => clearTimeout(timeout);
    }
  }, [status]);

  if (authLoading) {
    console.log('⏳ Rendering auth loading...');
    return <EcoLoading message="جاري التحميل..." />;
  }

  if (!user) {
    console.log('⏳ No user yet, showing loading...');
    return <EcoLoading message="جاري التحميل..." />;
  }

  if (status === 'loading') {
    console.log('⏳ Rendering data loading...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
        <StudentSidebar />
        <div className="mr-20 lg:mr-64 flex items-center justify-center min-h-screen w-full">
          <EcoLoading message="جاري تحميل البيانات... 🌱" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
        <StudentSidebar />
        <main className="mr-20 lg:mr-64 p-6 max-w-5xl mx-auto">
          <Card className="bg-red-50 border-2 border-red-300 shadow-lg rounded-3xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">حدث خطأ</h2>
              <p className="text-gray-600 mb-6">{error || 'تعذّر جلب البيانات، الرجاء المحاولة لاحقًا'}</p>
              <Button
                onClick={() => {
                  hasFetchedRef.current = false;
                  fetchDashboard();
                }}
                className="bg-red-500 hover:bg-red-600"
              >
                إعادة المحاولة
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Success or Empty state - show dashboard content
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
      <StudentSidebar />

      {/* Top bar */}
      <header className="mr-20 lg:mr-64 bg-white/60 backdrop-blur-sm shadow-sm sticky top-0 z-30 border-b border-green-200/50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/student/settings">
              <Button
                variant="outline"
                className="text-green-600 border-green-300 hover:bg-green-50 rounded-xl flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                تغيير المستوى
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {user && <NotificationCenter />}
            <Button
              variant="ghost"
              onClick={logout}
              className="text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-xl"
            >
              <LogOut className="w-4 h-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <main className="mr-20 lg:mr-64 p-6 max-w-5xl mx-auto">
        {/* Feedback Messages */}
        {feedbackMessages.length > 0 && (
          <div className="mb-6 space-y-4">
            {feedbackMessages.map((feedback) => (
              <FeedbackMessage
                key={feedback._id}
                message={feedback.message}
                from={feedback.from}
                onClose={() => {
                  setFeedbackMessages(feedbackMessages.filter(f => f._id !== feedback._id));
                  notificationsAPI.markAsRead(feedback._id).catch(console.error);
                }}
              />
            ))}
          </div>
        )}

        {/* Welcome Section - Garden Style */}
        <Card className="mb-6 bg-gradient-to-br from-green-100/80 to-sky-100/80 backdrop-blur-sm border-2 border-green-200/50 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <FriendlyAnimal type="bird" emotion="happy" size="medium" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    مرحباً {user.username}! 🌱
                  </h2>
                  <p className="text-gray-600">أنت الآن في {gradeLevelName}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty State for New Students */}
        {status === 'empty' && (
          <Card className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-sm border-2 border-blue-200/50 shadow-lg rounded-3xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">👋</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                مرحبًا بك!
              </h3>
              <p className="text-gray-600 mb-6">
                لم تبدأ أي درس بعد.
              </p>
              <Button
                onClick={() => router.push('/student/courses')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="lg"
              >
                ابدأ أول دورة الآن 🎯
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Level Badge - Garden Style */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-2 border-green-200/50 shadow-md rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg mb-3">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  أنت الآن في المستوى {currentLevel} 🌿
                </h3>
                {remainingPoints > 0 ? (
                  <p className="text-sm text-gray-600">
                    {remainingPoints} نقطة للوصول إلى المستوى {currentLevel + 1}
                  </p>
                ) : (
                  <p className="text-sm text-green-600 font-bold">
                    🌟 أحسنت! أنت جاهز للمستوى التالي!
                  </p>
                )}
              </div>
              <div className="flex-1 max-w-xs">
                <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">التقدم</span>
                    <span className="text-sm font-bold text-green-600">{pointsInCurrentLevel} / 100</span>
                  </div>
                  <ProgressBar
                    value={progressPercentage}
                    className="h-3 bg-green-100 rounded-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Points Card - Leaf Icon */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 shadow-md rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center shadow-md">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">مجموع النقاط</p>
                <p className="text-4xl font-bold text-amber-600">{totalPoints}</p>
                {totalPoints > 0 && (
                  <p className="text-xs text-green-600 mt-1">🌟 أحسنت! تابع التعلم 🌱</p>
                )}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">الدروس المكتملة</p>
                <p className="text-3xl font-bold text-green-600">{completedLessons}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">الألعاب المكتملة</p>
                <p className="text-3xl font-bold text-sky-600">{completedGames}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        {user.badges && user.badges.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200/50 shadow-md rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                شاراتي 🏅
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 text-center border-2 border-amber-200 hover:shadow-md transition-shadow"
                  >
                    <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="font-bold text-gray-800 text-sm">{badge}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
