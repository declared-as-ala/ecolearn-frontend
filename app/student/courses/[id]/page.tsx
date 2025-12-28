'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress as ProgressBar } from '@/components/ui/progress';
import {
  PlayCircle, CheckCircle, Trophy, Award,
  Video, FileText, Gamepad2, TrendingUp
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import VideoPlayer from '@/components/VideoPlayer';
import CourseStoryboardVideo from '@/components/CourseStoryboardVideo';
import AnimatedCourseVideo from '@/components/animated-video/AnimatedCourseVideo';
import CartoonScene from '@/components/cartoons/CartoonScene';
import EcoHero from '@/components/cartoons/EcoHero';
import WiseGuide from '@/components/cartoons/WiseGuide';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';
import Link from 'next/link';
import { coursesAPI, Course as APICourse } from '@/lib/api';
import { coursesData, Course as LocalCourse } from '@/lib/coursesData';
import useWindowSize from '@/lib/hooks/useWindowSize';
import SimpleQuiz from '@/components/SimpleQuiz';
import ExerciseV2Renderer from '@/components/course/exercises/ExerciseV2Renderer';
import GameLauncher from '@/components/GameLauncher';
import { usersAPI } from '@/lib/api';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, updateUser, refreshUser, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('video');
  const [course, setCourse] = useState<LocalCourse | null>(null);
  const [apiCourse, setApiCourse] = useState<APICourse | null>(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedGame, setSelectedGame] = useState<LocalCourse['games'][number] | null>(null);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  useWindowSize(); // keep hook side-effects (if any), avoid unused vars lint

  const courseId = params.id as string;

  useEffect(() => {
    const loadCourse = async () => {
      if (authLoading) return;

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

      // Find local course data
      const localData = coursesData.find(c => c.id === courseId);
      if (localData) {
        setCourse(localData);
      } else {
        router.push('/student/dashboard');
        return;
      }

      try {
        const data = await coursesAPI.getOne(courseId);
        setApiCourse(data);
        setVideoWatched(data.progress?.videoWatched || false);
      } catch (error: unknown) {
        console.error('Failed to load course progress from API:', error);
        // Fallback to local data only
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [user, authLoading, router, courseId]);

  const handleExerciseComplete = async (exerciseId: string, score: number, maxScore: number) => {
    try {
      // First try the course-specific endpoint
      let result;
      try {
        result = await coursesAPI.submitExercise(courseId, exerciseId, {
          score,
          maxScore,
        });
      } catch (err: any) {
        // If course not found in backend, use the fallback points endpoint
        if (err.message?.includes('404') || err.message?.includes('not found')) {
          console.warn('⚠️ Course not found in backend, using fallback addPoints API');
          result = await usersAPI.addPoints({
            points: score,
            type: 'exercise',
            description: `تمرين: ${exerciseId}`,
            courseId: courseId,
            activityId: exerciseId
          });

          // Locally mark exercise as completed so progress UI updates even without backend progress
          setApiCourse(prev => {
            const prevProgress = prev?.progress || {};
            const exercisesStatus = { ...(prevProgress.exercisesStatus || {}), [exerciseId]: { status: 'completed', score, maxScore } };
            const totalPoints = (prevProgress.totalPoints || 0) + score;
            return prev ? { ...prev, progress: { ...prevProgress, exercisesStatus, totalPoints } } : null;
          });
        } else {
          throw err;
        }
      }

      // Update course progress immediately from result
      if (result.progress) {
        setApiCourse(prev => prev ? { ...prev, progress: { ...prev.progress, ...result.progress } } : null);
      }

      // Update user context for points/badges immediately
      if (result.user && updateUser) {
        console.log('✅ [Exercise] Progress saved, updating user:', result.user);
        updateUser(result.user);
      }
    } catch (error) {
      console.error('Failed to submit exercise:', error);
    }
  };

  const handleGameComplete = async (gameId: string, points: number) => {
    try {
      // First try the course-specific endpoint
      let result;
      try {
        result = await coursesAPI.submitGame(courseId, gameId, {
          score: points,
          maxScore: points,
        });
      } catch (err: any) {
        // Fallback to direct points addition if course missing from backend
        if (err.message?.includes('404') || err.message?.includes('not found')) {
          console.warn('⚠️ Course not found in backend, using fallback addPoints API');
          result = await usersAPI.addPoints({
            points: points,
            type: 'game',
            description: `لعبة: ${gameId}`,
            courseId: courseId,
            activityId: gameId
          });

          // Locally mark game as completed so progress UI updates even without backend progress
          setApiCourse(prev => {
            const prevProgress = prev?.progress || {};
            const gamesStatus = { ...(prevProgress.gamesStatus || {}), [gameId]: { status: 'completed', score: points, maxScore: points } };
            const totalPoints = (prevProgress.totalPoints || 0) + points;
            return prev ? { ...prev, progress: { ...prevProgress, gamesStatus, totalPoints } } : null;
          });
        } else {
          throw err;
        }
      }

      // Update course progress immediately
      if (result.progress) {
        setApiCourse(prev => prev ? { ...prev, progress: { ...prev.progress, ...result.progress } } : null);
      }

      // Update user context for points/badges immediately
      if (result.user && updateUser) {
        console.log('✅ [Game] Progress saved, updating user:', result.user);
        updateUser(result.user);
      }
    } catch (error) {
      console.error('Failed to submit game:', error);
    }
  };
  const handleVideoEnd = async () => {
    try {
      try {
        await coursesAPI.watchVideo(courseId);
      } catch (err: any) {
        if (err.message?.includes('404') || err.message?.includes('not found')) {
          console.warn('⚠️ Course not found in backend for video watch');
        } else {
          throw err;
        }
      }
      setVideoWatched(true);

      // Refresh data
      try {
        const updatedCourse = await coursesAPI.getOne(courseId);
        setApiCourse(updatedCourse);
      } catch (e) {}

      // Refresh user data to update points
      if (refreshUser) {
        await refreshUser();
      }
    } catch (error: any) {
      console.error('Failed to mark video as watched:', error);
      // Still mark as watched locally
      setVideoWatched(true);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3] flex items-center justify-center" dir="rtl">
        <StudentSidebar />
        <div className="mr-64 flex items-center justify-center min-h-screen w-full">
          <div className="text-center">
            <EcoHero size="large" emotion="happy" animation="bounce" className="mx-auto mb-4" />
            <p className="text-green-700 font-semibold text-xl">جاري التحميل... 🌱</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return null; // Will redirect or show loading
  }

  // Show intro cartoon scene
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-[#f5e6d3]" dir="rtl">
        <StudentSidebar />
        <div className="mr-64 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-2xl w-full">
            <CartoonScene
              type="lesson-intro"
              character="both"
              message={`مرحباً! اليوم سنتعلم عن ${course.title} 🌍

دعنا نبدأ رحلتنا الممتعة لنتعرف على كيفية حماية كوكبنا! 💚`}
              emotion="happy"
              onContinue={() => setShowIntro(false)}
              buttonText="ابدأ الدورة"
              background="nature"
            />
          </div>
        </div>
      </div>
    );
  }

  const isVideoWatched = videoWatched || apiCourse?.progress?.videoWatched || false;
  const videoUrl = apiCourse?.sections?.video?.url || apiCourse?.videoUrl || course.videoUrl || '';
  const videos = course.videos || [];
  const exercises = course.exercises || [];
  const exercisesV2 = course.exercisesV2 || [];
  const games = course.games || [];
  const hasStoryboard = !!course.videoStoryboard;
  const hasAnimatedVideo = !!course.animatedVideo;
  const hasVideos = hasAnimatedVideo || hasStoryboard || (videos && videos.length > 0) || videoUrl;
  const totalExercises = exercisesV2.length > 0 ? exercisesV2.length : exercises.length;
  const totalGames = games.length;
  const completedExercises = Object.values(apiCourse?.progress?.exercisesStatus || {}).filter((s: unknown) => (s as any)?.status === 'completed').length;
  const completedGames = Object.values(apiCourse?.progress?.gamesStatus || {}).filter((s: unknown) => (s as any)?.status === 'completed').length;
  const isCourseCompletedLocal = isVideoWatched && completedExercises >= totalExercises && completedGames >= totalGames;
  const progressUnitsTotal = 1 + totalExercises + totalGames;
  const progressUnitsDone = (isVideoWatched ? 1 : 0) + completedExercises + completedGames;
  const computedProgressPercent = progressUnitsTotal > 0 ? Math.round((progressUnitsDone / progressUnitsTotal) * 100) : 0;
  const rewardMessages = course.rewardMessages;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
      <StudentSidebar />

      <main className="mr-20 lg:mr-64 p-6 max-w-6xl mx-auto">
        {/* Course Header */}
        <Card className="mb-6 bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl rounded-2xl">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <EcoHero size="large" emotion="happy" animation="wave" />
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                    <p className="text-xl text-green-100">درس ممتع للسنة {course.grade} ابتدائي</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <FriendlyAnimal type="bird" emotion="excited" size="small" />
                  <WiseGuide size="medium" emotion="proud" animation="nod" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl p-2">
            <TabsTrigger
              value="video"
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <Video className="w-4 h-4" />
              🎬 الفيديو الكرتوني
            </TabsTrigger>
            <TabsTrigger
              value="exercises"
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white text-lg font-bold"
            >
              <FileText className="w-5 h-5" />
              ✏️ التمارين
            </TabsTrigger>
            <TabsTrigger
              value="games"
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white text-lg font-bold"
            >
              <Gamepad2 className="w-5 h-5" />
              🎮 الألعاب ({games.length})
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4" />
              🏆 الشارات والتقدم
            </TabsTrigger>
          </TabsList>

          {/* Video Tab */}
          <TabsContent value="video" className="mt-6">
            {/* Priority: AnimatedVideo > Storyboard > VideoPlayer */}
            {course.animatedVideo ? (
              <AnimatedCourseVideo
                videoData={course.animatedVideo}
                onComplete={handleVideoEnd}
                onMarkWatched={handleVideoEnd}
                watched={isVideoWatched}
              />
            ) : course.videoStoryboard ? (
              <CourseStoryboardVideo
                spec={course.videoStoryboard}
                onMarkWatched={handleVideoEnd}
                watched={isVideoWatched}
              />
            ) : (
              <Card className="shadow-lg rounded-2xl overflow-hidden border-4 border-green-200">
                <CardHeader className="bg-green-50 border-b-2 border-green-100">
                  <CardTitle className="text-2xl flex items-center gap-2 text-green-700">
                    <Video className="w-6 h-6" />
                    🎬 الفيديو الكرتوني: {course.videoConcept.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
                    <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                      <FriendlyAnimal type="bird" emotion="happy" size="small" />
                      ماذا سنشاهد اليوم؟
                    </h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {course.videoConcept.scenario}
                    </p>
                    <div className="mt-4 p-3 bg-white/50 rounded-lg text-sm text-green-700 font-bold border border-green-200">
                      💡 الحكمة: {course.videoConcept.moralMessage}
                    </div>
                  </div>

                  {hasVideos ? (
                    <div className="space-y-6">
                      {/* Display multiple videos if available */}
                      {videos && videos.length > 0 ? (
                        videos.map((video, index) => (
                          <div key={index} className="space-y-3">
                            <h4 className="text-xl font-bold text-green-700 flex items-center gap-2 flex-wrap">
                              <Video className="w-6 h-6" />
                              {video.title}
                              {video.needsArabicDub && (
                                <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                                  سيتم إضافة التعليق الصوتي العربي قريباً
                                </span>
                              )}
                              {video.language !== 'ar' && (
                                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                  مع ترجمة عربية
                                </span>
                              )}
                            </h4>
                            <VideoPlayer
                              videoUrl={video.url}
                              onEnded={index === videos.length - 1 ? handleVideoEnd : undefined}
                            />
                          </div>
                        ))
                      ) : videoUrl ? (
                        <VideoPlayer
                          videoUrl={videoUrl}
                          onEnded={handleVideoEnd}
                        />
                      ) : null}

                      {/* Instructions for students */}
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-6 flex items-center gap-4">
                        <WiseGuide size="medium" emotion="happy" animation="nod" />
                        <div>
                          <p className="text-blue-800 font-bold text-lg mb-1">
                            شاهد وتعلّم 🌱
                          </p>
                          <p className="text-blue-700 font-medium">
                            استمتع بمشاهدة الفيديوهات التعليمية، ثم انتقل للتمارين والألعاب! ✨
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl border-4 border-dashed border-gray-200">
                      <div className="flex flex-col items-center gap-4">
                        <FriendlyAnimal type="rabbit" emotion="thinking" size="large" />
                        <Video className="w-24 h-24 text-gray-300" />
                        <p className="text-gray-700 text-xl font-bold">انتظرنا! الفيديو الكرتوني قيد التحضير 🎨</p>
                        <p className="text-gray-600 mb-4">لا تقلق، يمكنك المتابعة للتمارين والألعاب مباشرة!</p>
                        <Button onClick={handleVideoEnd} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg font-bold">
                          متابعة للتمارين ✨
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises" className="mt-6">
            <Card className="shadow-lg rounded-2xl border-4 border-green-200">
              <CardHeader className="bg-green-50 rounded-t-2xl">
                <CardTitle className="text-2xl flex items-center gap-2 text-green-800">
                  <FileText className="w-8 h-8 text-green-600" />
                  التمارين التفاعلية
                </CardTitle>
                <p className="text-green-600 font-medium">أجب عن الأسئلة لجمع النقاط والحصول على الأوسمة! 🏆</p>
              </CardHeader>
              <CardContent className="p-6">
                {exercisesV2.length > 0 ? (
                  <div className="space-y-8">
                    {exercisesV2.map((exercise, index) => {
                      const exerciseProgress = apiCourse?.progress?.exercisesStatus?.[exercise.id];
                      const isCompleted = exerciseProgress?.status === 'completed';

                      return (
                        <div key={exercise.id} className="relative">
                          <div className="absolute -right-3 -top-3 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-10">
                            {index + 1}
                          </div>
                          <ExerciseV2Renderer
                            exercise={exercise as any}
                            isCompleted={isCompleted}
                            onComplete={(score, maxScore) => handleExerciseComplete(exercise.id, score, maxScore)}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : exercises.length > 0 ? (
                  <div className="space-y-8">
                    {exercises.map((exercise, index) => {
                      const exerciseProgress = apiCourse?.progress?.exercisesStatus?.[exercise.id];
                      const isCompleted = exerciseProgress?.status === 'completed';

                      return (
                        <div key={exercise.id} className="relative">
                          <div className="absolute -right-3 -top-3 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-10">
                            {index + 1}
                          </div>
                          <SimpleQuiz
                            exercise={exercise as any}
                            isCompleted={isCompleted}
                            onComplete={(points) => handleExerciseComplete(exercise.id, points, points)}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FriendlyAnimal type="bird" emotion="happy" size="large" />
                    <p className="text-gray-500 text-xl mt-4 font-bold">لا توجد تمارين لهذا الدرس حالياً. أنت رائع! ✨</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="games" className="mt-6">
            <Card className="shadow-lg rounded-2xl border-4 border-amber-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-t-2xl border-b-4 border-amber-300">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold flex items-center gap-3 text-amber-800 mb-2">
                      <Gamepad2 className="w-10 h-10 text-amber-600" />
                      🎮 الألعاب التعليمية
                    </CardTitle>
                    <p className="text-amber-700 font-bold text-lg">العب وتعلم في نفس الوقت! كل لعبة تعلمك شيئاً جديداً ✨</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <EcoHero size="medium" emotion="celebrating" animation="bounce" />
                    <FriendlyAnimal type="rabbit" emotion="excited" size="medium" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50">
                {games.length > 0 ? (
                  <div className="space-y-6">
                    {/* Header Info */}
                    <div className="bg-white/80 rounded-2xl p-4 border-2 border-amber-200 mb-6">
                      <div className="flex items-center gap-3">
                        <WiseGuide size="medium" emotion="happy" animation="nod" />
                        <div>
                          <p className="text-lg font-bold text-amber-800">
                            لديك {games.length} لعبة ممتعة لتلعبها! 🎉
                          </p>
                          <p className="text-sm text-amber-700">
                            كل لعبة تعلّمك مفاهيم مهمة من هذا الدرس بطريقة ممتعة
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {games.map((game, index) => {
                        const gameProgress = apiCourse?.progress?.gamesStatus?.[game.id];
                        const isCompleted = gameProgress?.status === 'completed';
                        const score = gameProgress?.score || 0;
                        const maxScore = gameProgress?.maxScore || game.points || 100;

                        // Game type Arabic labels
                        const gameTypeLabels: Record<string, { label: string; emoji: string; color: string }> = {
                          'dragdrop': { label: 'سحب وإفلات', emoji: '🔄', color: 'from-blue-500 to-blue-600' },
                          'simulation': { label: 'محاكاة', emoji: '🌊', color: 'from-green-500 to-green-600' },
                          'decision': { label: 'اتخاذ قرار', emoji: '🤔', color: 'from-purple-500 to-purple-600' },
                          'matching': { label: 'مطابقة', emoji: '🔗', color: 'from-pink-500 to-pink-600' },
                          'roleplay': { label: 'تمثيل دور', emoji: '👤', color: 'from-orange-500 to-orange-600' },
                          'construction': { label: 'بناء', emoji: '🏗️', color: 'from-teal-500 to-teal-600' },
                          'audio': { label: 'صوتي', emoji: '🔊', color: 'from-yellow-500 to-yellow-600' },
                          'quiz': { label: 'اختبار', emoji: '❓', color: 'from-indigo-500 to-indigo-600' },
                          'scenario': { label: 'موقف', emoji: '🎭', color: 'from-red-500 to-red-600' },
                        };

                        const gameType = gameTypeLabels[game.type] || {
                          label: 'لعبة',
                          emoji: '🎮',
                          color: 'from-amber-500 to-amber-600'
                        };

                        return (
                          <div
                            key={game.id}
                            className={`relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${isCompleted ? 'ring-4 ring-green-300' : ''
                              }`}
                          >
                            {/* Game Number Badge */}
                            <div className="absolute -top-3 -right-3 z-20 w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                              <span className="text-2xl font-bold text-white">{index + 1}</span>
                            </div>

                            {/* Game Card */}
                            <Card className={`border-4 rounded-3xl overflow-hidden h-full ${isCompleted ? 'border-green-400 bg-green-50/50' : 'border-amber-300 bg-white'}`}>
                              <CardHeader className={`bg-gradient-to-br ${gameType.color} text-white p-6 relative`}>
                                {/* Completed Badge */}
                                {isCompleted && (
                                  <div className="absolute top-4 left-4 bg-white/90 rounded-full p-2">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                  </div>
                                )}

                                <div className="text-center mt-4">
                                  {/* Game Icon */}
                                  <div className="text-6xl mb-3 transform hover:scale-110 transition-transform">
                                    {gameType.emoji}
                                  </div>

                                  {/* Game Title with Arabic Number */}
                                  <CardTitle className="text-xl font-bold text-white mb-2 leading-tight">
                                    لعبة {index + 1}: {game.title || `لعبة ${index + 1}`}
                                  </CardTitle>

                                  {/* Game Type */}
                                  <Badge className="bg-white/20 text-white border-white/30 mt-2">
                                    {gameType.label}
                                  </Badge>
                                </div>

                                {/* Animal Character */}
                                <div className="absolute bottom-2 left-2 opacity-80">
                                  <FriendlyAnimal
                                    type={['bird', 'rabbit', 'butterfly', 'turtle', 'fish'][index % 5] as any}
                                    emotion={isCompleted ? "celebrating" : "excited"}
                                    size="small"
                                  />
                                </div>
                              </CardHeader>

                              <CardContent className="p-6">
                                {/* Game Description */}
                                {game.description && (
                                  <p className="text-gray-700 text-center mb-4 font-medium leading-relaxed">
                                    {game.description}
                                  </p>
                                )}

                                {/* Progress Display */}
                                {isCompleted && (
                                  <div className="bg-green-100 rounded-xl p-3 mb-4 border-2 border-green-300">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-bold text-green-700">نقاطك:</span>
                                      <span className="text-lg font-bold text-green-700">
                                        {score} / {maxScore}
                                      </span>
                                    </div>
                                    <ProgressBar
                                      value={(score / maxScore) * 100}
                                      className="h-2 mt-2 bg-green-200"
                                    />
                                  </div>
                                )}

                                {/* Points Info */}
                                <div className="bg-amber-100 rounded-xl p-3 mb-4 border-2 border-amber-300">
                                  <div className="flex items-center justify-center gap-2">
                                    <Award className="w-5 h-5 text-amber-700" />
                                    <span className="font-bold text-amber-800">
                                      +{game.points || 20} نقطة
                                    </span>
                                  </div>
                                </div>

                                {/* Play Button */}
                                <Button
                                  onClick={() => {
                                    setSelectedGame(game);
                                    setIsGameDialogOpen(true);
                                  }}
                                  className={`w-full py-6 rounded-2xl text-xl font-bold shadow-lg transition-transform active:scale-95 ${isCompleted
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                                    }`}
                                  size="lg"
                                >
                                  <PlayCircle className="w-6 h-6 ml-2" />
                                  {isCompleted ? 'العب مرة أخرى' : 'العب الآن'}
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })}
                    </div>

                    {/* Encouragement Message */}
                    <div className="bg-gradient-to-r from-green-100 to-amber-100 rounded-2xl p-6 border-4 border-dashed border-green-300 mt-8">
                      <div className="flex items-center justify-center gap-4">
                        <FriendlyAnimal type="bird" emotion="excited" size="large" />
                        <div className="text-center">
                          <p className="text-xl font-bold text-green-800 mb-2">
                            استمر في اللعب! كل لعبة تعلّمك شيئاً جديداً 🌟
                          </p>
                          <p className="text-green-700">
                            يمكنك لعب الألعاب مراراً وتكراراً لتحسين مهاراتك!
                          </p>
                        </div>
                        <FriendlyAnimal type="butterfly" emotion="excited" size="large" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border-4 border-dashed border-amber-300">
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <FriendlyAnimal type="rabbit" emotion="thinking" size="large" />
                        <Gamepad2 className="w-24 h-24 text-amber-300 absolute -bottom-4 -right-4 opacity-50" />
                      </div>
                      <div>
                        <p className="text-gray-700 text-2xl font-bold mb-2">
                          الألعاب قادمة قريباً! 🎮
                        </p>
                        <p className="text-gray-600 text-lg">
                          نحن نعد ألعاباً ممتعة وتعليمية لك
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="mt-6">
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-green-600" />
                  الشارات والتقدم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {rewardMessages && isCourseCompletedLocal ? (
                    <div className="bg-gradient-to-br from-amber-50 to-green-50 rounded-2xl p-6 border-4 border-amber-300">
                      <h3 className="text-2xl font-extrabold text-amber-800 mb-2">🏆 مكافأة النهاية</h3>
                      <p className="text-lg font-bold text-gray-800 mb-3 whitespace-pre-wrap">
                        {rewardMessages.student}
                      </p>
                      <div className="bg-white rounded-2xl border-2 border-amber-200 p-4">
                        <p className="font-extrabold text-gray-800 mb-1">Gold Badge</p>
                        <p className="text-xl font-extrabold text-green-700">
                          {rewardMessages.universalGoldBadge.icon} {rewardMessages.universalGoldBadge.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          (سيصل إشعار لولي الأمر أيضاً)
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {/* Progress Overview */}
                  <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                      <h3 className="text-xl font-bold">تقدمك في هذه الدورة</h3>
                    </div>
                    <ProgressBar value={computedProgressPercent} className="h-4 mb-2" />
                    <p className="text-sm text-gray-600">{computedProgressPercent}% مكتمل</p>
                  </div>

                  {/* Points Earned */}
                  <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="w-8 h-8 text-amber-600" />
                        <div>
                          <p className="font-semibold text-lg">النقاط المكتسبة</p>
                          <p className="text-gray-600">في هذه الدورة</p>
                        </div>
                      </div>
                      <span className="text-4xl font-bold text-amber-600">{apiCourse?.progress?.totalPoints || 0}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-yellow-600" />
                      أوسمتي المستحقة
                    </h3>
                    {(!user || !user.badges || user.badges.length === 0) ? (
                      <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <FriendlyAnimal type="rabbit" emotion="thinking" size="medium" className="mx-auto mb-2" />
                        <p className="text-gray-500 font-bold">لم تحصل على أوسمة بعد. أكمل الدروس والتمارين لتحصل عليها! 🌱</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {user.badges.map((badge, idx) => (
                          <div key={idx} className="bg-white border-2 border-yellow-200 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition-all transform hover:scale-105">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Award className="w-6 h-6 text-yellow-600" />
                            </div>
                            <p className="text-sm font-bold text-gray-800">{badge}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Back Button */}
        <div className="mt-6">
          <Link href="/student/courses">
            <Button variant="outline" className="bg-white">
              ← العودة إلى قائمة الدروس
            </Button>
          </Link>
        </div>
      </main>

      {/* Game Dialog/Modal */}
      <Dialog open={isGameDialogOpen} onOpenChange={setIsGameDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-green-50 to-amber-50 border-4 border-green-300 rounded-3xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-700 text-center mb-4">
              {selectedGame && `🎮 ${selectedGame.title}`}
            </DialogTitle>
          </DialogHeader>
          {selectedGame && (
            <div className="mt-4">
              <GameLauncher
                game={selectedGame}
                onComplete={(points) => {
                  handleGameComplete(selectedGame.id, points);
                  // Don't close dialog immediately, let user see completion
                  setTimeout(() => {
                    setIsGameDialogOpen(false);
                  }, 2000);
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
