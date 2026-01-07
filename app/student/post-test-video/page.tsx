'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import EcoLoading from '@/components/ui/EcoLoading';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

function PostTestVideoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [videoWatched, setVideoWatched] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const level = searchParams.get('level') || (user?.gradeLevel === 5 ? '5eme' : user?.gradeLevel === 6 ? '6eme' : null);

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== 'student') {
      router.replace('/login');
      return;
    }

    // Check if already watched
    const watched = typeof window !== 'undefined' 
      ? localStorage.getItem(`postTestVideoSeen_${level}`) === 'true'
      : false;
    
    if (watched) {
      // Already watched, redirect to courses
      router.replace('/student/courses');
      return;
    }

    // Check if test is completed
    if (!level) {
      router.replace('/student/select-level');
      return;
    }
  }, [authLoading, user, router, level]);

  const handleVideoEnded = () => {
    setVideoWatched(true);
    // Save to localStorage
    if (typeof window !== 'undefined' && level) {
      localStorage.setItem(`postTestVideoSeen_${level}`, 'true');
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    // If video fails, allow navigation anyway
    setVideoWatched(true);
    if (typeof window !== 'undefined' && level) {
      localStorage.setItem(`postTestVideoSeen_${level}`, 'true');
    }
  };

  const handleNavigateToCourses = () => {
    if (!videoWatched) return;
    
    setIsNavigating(true);
    router.push('/student/courses');
  };

  const videoUrl = level === '5eme' 
    ? '/videos/test-5eme.mp4'
    : level === '6eme'
    ? '/videos/test-6eme.mp4'
    : null;

  if (authLoading || !user) {
    return <EcoLoading message="جاري التحميل..." />;
  }

  if (!level || !videoUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50 flex items-center justify-center" dir="rtl">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">❌ لم يتم تحديد المستوى الدراسي</p>
            <Button onClick={() => router.push('/student/select-level')}>
              اختيار المستوى
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
      <StudentSidebar />
      
      <main className="mr-20 lg:mr-64 p-6 max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg mb-4">
                <FriendlyAnimal type="bird" emotion="celebrating" size="large" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                أحسنت! 👏
              </h1>
              <p className="text-lg text-gray-600">
                شاهد هذا الفيديو القصير قبل الانتقال إلى الدروس
              </p>
            </div>

            {/* Video Player */}
            <div className="mb-6">
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl aspect-video">
                {videoError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center text-white p-6">
                      <p className="text-lg mb-4">❌ حدث خطأ في تحميل الفيديو</p>
                      <p className="text-sm text-gray-400 mb-4">
                        يمكنك المتابعة إلى الدروس
                      </p>
                      <Button
                        onClick={handleNavigateToCourses}
                        disabled={!videoWatched || isNavigating}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        الانتقال إلى الدروس
                      </Button>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    className="w-full h-full"
                    onEnded={handleVideoEnded}
                    onError={handleVideoError}
                    preload="metadata"
                  >
                    متصفحك لا يدعم تشغيل الفيديو.
                  </video>
                )}
              </div>
            </div>

            {/* Status Indicator */}
            <div className="mb-6">
              <div className={`flex items-center justify-center gap-3 p-4 rounded-xl ${
                videoWatched 
                  ? 'bg-green-100 border-2 border-green-400' 
                  : 'bg-yellow-100 border-2 border-yellow-400'
              }`}>
                {videoWatched ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800">تمت مشاهدة الفيديو بنجاح! ✅</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6 text-yellow-600" />
                    <span className="font-bold text-yellow-800">يجب مشاهدة الفيديو كاملاً</span>
                  </>
                )}
              </div>
            </div>

            {/* Navigation Button */}
            <div className="text-center">
              <Button
                onClick={handleNavigateToCourses}
                disabled={!videoWatched || isNavigating}
                size="lg"
                className={`w-full md:w-auto min-w-[200px] ${
                  videoWatched
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isNavigating ? (
                  <>
                    <EcoLoading />
                    <span className="mr-2">جاري الانتقال...</span>
                  </>
                ) : videoWatched ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                    الانتقال إلى الدروس
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 ml-2" />
                    🔒 الانتقال إلى الدروس
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function PostTestVideoPage() {
  return (
    <Suspense fallback={<EcoLoading message="جاري التحميل..." />}>
      <PostTestVideoContent />
    </Suspense>
  );
}
