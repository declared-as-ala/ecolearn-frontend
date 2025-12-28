'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { lessonsAPI, usersAPI, Lesson, Progress } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, PlayCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import EcoHero from '@/components/cartoons/EcoHero';
import CartoonScene from '@/components/cartoons/CartoonScene';

export default function LessonsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
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
      const [lessonsData, progressData] = await Promise.all([
        lessonsAPI.getAll().catch(() => []),
        usersAPI.getProgress().catch(() => []),
      ]);
      
      setLessons(lessonsData || []);
      setProgress(progressData || []);
    } catch (error: any) {
      console.error('Failed to load data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const getProgressForLesson = (lessonId: string) => {
    return progress.find(p => p.lesson?._id === lessonId);
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
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl rounded-2xl">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <EcoHero size="large" emotion="happy" animation="wave" />
                  <div>
                    <h1 className="text-4xl font-bold mb-2">📘 الدروس</h1>
                    <p className="text-xl text-green-50">استكشف واتعلم عن البيئة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lessons Grid */}
        {lessons.length === 0 ? (
          <Card className="bg-white shadow-lg rounded-2xl border-2 border-green-200">
            <CardContent className="pt-12 pb-12 text-center">
              <EcoHero size="large" emotion="thinking" animation="idle" className="mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">لا توجد دروس متاحة حالياً</p>
              <p className="text-gray-500">ستكون الدروس متاحة قريباً! 🌱</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => {
              const lessonProgress = getProgressForLesson(lesson._id);
              const isCompleted = lessonProgress?.status === 'completed';
              
              return (
                <Card
                  key={lesson._id}
                  className={`border-2 rounded-2xl hover:shadow-2xl transition-all hover:scale-105 overflow-hidden ${
                    isCompleted 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <CardHeader className="bg-gradient-to-r from-green-100 to-amber-50 border-b-2 border-green-200">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-green-700">
                        {lesson.title}
                      </CardTitle>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : null}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    {/* Cartoon placeholder */}
                    <div className="mb-4 flex items-center justify-center h-32 bg-gradient-to-br from-green-100 to-amber-100 rounded-xl">
                      <EcoHero 
                        size="large" 
                        emotion={isCompleted ? 'celebrating' : 'happy'} 
                        animation={isCompleted ? 'jump' : 'idle'} 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {lesson.category}
                        </Badge>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                          {lesson.difficulty}
                        </Badge>
                        <Badge className="bg-green-500 text-white">
                          +{lesson.points} نقطة
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <Badge 
                          variant={isCompleted ? 'default' : 'secondary'}
                          className={isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle className="w-3 h-3 ml-1" />
                              مكتمل ✅
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 ml-1" />
                              غير مكتمل 🔒
                            </>
                          )}
                        </Badge>
                        
                        <Link href={`/student/lessons/${lesson._id}`}>
                          <Button 
                            className={`${
                              isCompleted 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-green-500 hover:bg-green-600'
                            } text-white rounded-xl`}
                          >
                            {isCompleted ? (
                              <>
                                <PlayCircle className="w-4 h-4 ml-2" />
                                مراجعة
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4 ml-2" />
                                ابدأ الدرس
                              </>
                            )}
                          </Button>
                        </Link>
                      </div>
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





