'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { CheckCircle, PlayCircle, GraduationCap, Leaf } from 'lucide-react';
import Link from 'next/link';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';
import EcoLoading from '@/components/ui/EcoLoading';
import { coursesAPI, Course as APICourse } from '@/lib/api';
import { coursesData, Course as LocalCourse } from '@/lib/coursesData';

export default function CoursesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [loadingData, setLoadingData] = useState(true);
  const [courses, setCourses] = useState<LocalCourse[]>([]);
  const [apiCourses, setApiCourses] = useState<APICourse[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      if (loading) return;

      if (!user || user.role !== 'student') {
        router.push('/login');
        return;
      }

      // Check if grade level is set
      const gradeLevel = user.gradeLevel || (typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0);
      if (!gradeLevel || (gradeLevel !== 5 && gradeLevel !== 6)) {
        router.push('/student/select-level');
        return;
      }

      setLoadingData(true);
      try {
        // Find local courses for this grade
        const filteredLocal = coursesData.filter(c => c.grade === gradeLevel);
        setCourses(filteredLocal);

        // Fetch progress from API
        const apiData = await coursesAPI.getAll(gradeLevel as 5 | 6);
        setApiCourses(apiData);
      } catch (error: any) {
        console.error('Failed to load course progress:', error);
      } finally {
        setLoadingData(false);
      }
    };

    loadCourses();
  }, [user, loading, router]);

  if (loading || loadingData || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
        <StudentSidebar />
        <div className="mr-20 lg:mr-64 flex items-center justify-center min-h-screen w-full">
          <EcoLoading />
        </div>
      </div>
    );
  }

  const gradeLevel = user.gradeLevel || parseInt(localStorage.getItem('gradeLevel') || '0');
  const levelName = gradeLevel === 5 ? 'السنة الخامسة' : 'السنة السادسة';


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
      <StudentSidebar />
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
        </div>
      </header>
      <main className="mr-20 lg:mr-64 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-gradient-to-br from-green-100/80 to-sky-100/80 backdrop-blur-sm border-2 border-green-200/50 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <FriendlyAnimal type="bird" emotion="happy" size="medium" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">📚 دروس {levelName}</h1>
                  <p className="text-gray-600">اختر دورة لتبدأ مغامرتك التعليمية 🌱</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <Card className="text-center py-12 bg-white/80 backdrop-blur-sm border-2 border-green-200/50 rounded-3xl">
            <CardContent>
              <FriendlyAnimal type="rabbit" emotion="thinking" size="large" className="mx-auto mb-4" />
              <p className="text-xl text-gray-600 font-semibold">لا توجد دورات متاحة حالياً</p>
              <p className="text-gray-500 mt-2">سيتم إضافة الدورات قريباً! 🌱</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const apiMatch = apiCourses.find(c => c.courseId === course.id);
              const progress = apiMatch?.progress || {};
              const isCompleted = progress.completed || false;

              return (
                <Card
                  key={course.id}
                  className={`border-2 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm ${
                    isCompleted
                      ? 'border-green-400 shadow-md'
                      : 'border-green-200 hover:border-green-300'
                  }`}
                >
                  <CardHeader className={`relative pb-3 ${course.color} rounded-t-3xl`}>
                    <div className="absolute top-3 right-3 z-10">
                      {isCompleted ? (
                        <div className="bg-white rounded-full p-1.5 shadow-md">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                      ) : (
                        <FriendlyAnimal
                          type={['bird', 'rabbit', 'butterfly', 'turtle', 'fish'][index % 5] as any}
                          emotion="happy"
                          size="small"
                        />
                      )}
                    </div>
                    <div className="text-center pt-6">
                      <div className="text-5xl mb-3 transform hover:scale-110 transition-transform inline-block">
                        {course.icon}
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-800 leading-tight px-2">
                        {course.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600">التقدم</span>
                        <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                          <Leaf className="w-4 h-4" />
                          {progress.progressPercent || 0}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={progress.progressPercent || 0} 
                        className="h-2.5 rounded-full bg-green-100" 
                      />
                    </div>
                    <Link href={`/student/courses/${course.id}`}>
                      <Button
                        className={`w-full py-4 rounded-2xl text-base font-bold shadow-md hover:shadow-lg transition-all ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                            : 'bg-gradient-to-r from-green-400 to-sky-400 hover:from-green-500 hover:to-sky-500'
                        } text-white`}
                      >
                        <PlayCircle className="w-5 h-5 ml-2" />
                        {isCompleted ? 'مراجعة الدورة' : 'ابدأ الدورة'}
                      </Button>
                    </Link>
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
