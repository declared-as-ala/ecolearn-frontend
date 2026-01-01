'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { lessonsAPI, Lesson } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';
import CartoonScene from '@/components/cartoons/CartoonScene';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import EcoHero from '@/components/cartoons/EcoHero';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user, updateUser, loading: authLoading } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [showIntro, setShowIntro] = useState(true);
  const [showEndScene, setShowEndScene] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== 'student') {
      router.push('/login');
      return;
    }

    const initPage = async () => {
      try {
        // 1. Check Grade Level
        const gradeLevel = user.gradeLevel || (typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0);
        if (!gradeLevel || (gradeLevel !== 5 && gradeLevel !== 6)) {
          router.push('/student/select-level');
          return;
        }

        // 2. Check Level Test Status
        const levelKey = gradeLevel === 5 ? '5eme' : '6eme';
        const testStatus = await import('@/lib/api').then(m => m.levelTestAPI.getStatus(levelKey));

        if (!testStatus.completed) {
          router.push(`/student/level-test?level=${levelKey}`);
          return;
        }

        // 3. Load Lesson
        loadLesson();

        // Track time spent
        const interval = setInterval(() => {
          setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    };

    const cleanup = initPage();
    // Note: cleanup function from initPage is not a real cleanup, we handle interval inside if needed
    // But since `loadLesson` is async inside, we can't easily return the interval cleanup from `useEffect` directly 
    // if we wrap everything in async. 
    // Simplified approach below:

  }, [user, authLoading, params.id, router, startTime]);

  const loadLesson = async () => {
    try {
      const lessonData = await lessonsAPI.getOne(params.id as string);
      setLesson(lessonData);
      await lessonsAPI.start(params.id as string);
    } catch (error) {
      console.error('Failed to load lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!lesson) return;
    try {
      await lessonsAPI.complete(lesson._id, timeSpent);
      setCompleted(true);
      setShowEndScene(true);

      // Update user points in context
      if (user && updateUser) {
        const newPoints = (user.points || 0) + lesson.points;
        const newLevel = Math.floor(newPoints / 100);
        updateUser({
          ...user,
          points: newPoints,
          level: newLevel
        });
      }

      // Set flag in localStorage to trigger dashboard refresh
      localStorage.setItem('ecolearn_refresh_dashboard', Date.now().toString());
    } catch (error) {
      console.error('Failed to complete lesson:', error);
    }
  };

  if (authLoading || loading || !lesson) {
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

  // Show intro cartoon scene
  if (showIntro && lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3]" dir="rtl">
        <StudentSidebar />
        <div className="mr-64 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-2xl w-full">
            <CartoonScene
              type="lesson-intro"
              character="both"
              message={`مرحباً! اليوم سنتعلم عن ${lesson.title} 🌍

دعنا نبدأ رحلتنا الممتعة لنتعرف على كيفية حماية كوكبنا! 💚`}
              emotion="happy"
              onContinue={() => setShowIntro(false)}
              buttonText="ابدأ الدرس"
              background="nature"
            />
          </div>
        </div>
      </div>
    );
  }

  // Show end cartoon scene
  if (showEndScene && lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3]" dir="rtl">
        <StudentSidebar />
        <div className="mr-64 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-2xl w-full">
            <CartoonScene
              type="lesson-end"
              character="both"
              message={`رائع! لقد أكملت الدرس بنجاح! 🎉

هل أنت مستعد للعب لعبة ممتعة لتطبيق ما تعلمته؟ 🎮`}
              emotion="celebrating"
              onContinue={() => {
                setShowEndScene(false);
                router.push('/student/dashboard');
              }}
              buttonText="العب الآن"
              background="park"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50" dir="rtl">
      <StudentSidebar />
      <main className="mr-64 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{lesson.title}</CardTitle>
                  <CardDescription className="text-base">{lesson.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge>{lesson.category}</Badge>
                  <Badge variant="secondary">{lesson.difficulty}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Player */}
              <VideoPlayer
                videoUrl={lesson.videoUrl}
                onEnded={() => {
                  // Auto-complete when video ends (only works for direct video files, not YouTube)
                  if (!completed) {
                    handleComplete();
                  }
                }}
              />

              {/* Lesson Content */}
              <div className="prose max-w-none">
                <div
                  className="text-gray-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground" dir="rtl">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>المدة: {lesson.duration} دقيقة</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-600">+{lesson.points} نقطة</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>الوقت المستغرق: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* Complete Button */}
              {!completed ? (
                <Button
                  onClick={handleComplete}
                  className="w-full bg-green-500 hover:bg-green-600"
                  size="lg"
                >
                  <CheckCircle className="w-5 h-5 ml-2" />
                  أكمل الدرس
                </Button>
              ) : (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <h3 className="text-xl font-semibold text-green-700 mb-2">
                        تم إكمال الدرس! 🎉
                      </h3>
                      <p className="text-green-600 mb-4">
                        لقد حصلت على {lesson.points} نقطة!
                      </p>
                      <Link href="/student/dashboard">
                        <Button variant="outline">العودة للوحة التحكم</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

