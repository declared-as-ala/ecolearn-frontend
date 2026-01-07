'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';
import EcoLoading from '@/components/ui/EcoLoading';
import { usersAPI, levelTestAPI } from '@/lib/api';
import { Leaf, Sun, Droplet, Flower2, Sprout } from 'lucide-react';
import Link from 'next/link';

export default function SelectLevelPage() {
  const router = useRouter();
  const { user, updateUser, loading: authLoading } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<5 | 6 | null>(null);
  const [saving, setSaving] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'student') {
      router.push(`/${user.role}/dashboard`);
      return;
    }

    // Check if user already has a level selected
    if (user.gradeLevel) {
      // If level is already set, redirect to courses
      router.push('/student/courses');
      return;
    }
    
    // Check localStorage for previously selected level
    const savedLevel = typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0;
    if (savedLevel === 5 || savedLevel === 6) {
      setSelectedLevel(savedLevel as 5 | 6);
    }
    
    setPageLoading(false);
  }, [user, authLoading, router]);

  const handleSelectLevel = async (level: 5 | 6) => {
    setSelectedLevel(level);
    setSaving(true);

    try {
      // Save to localStorage immediately for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('gradeLevel', level.toString());
      }

      // Update user's grade level in the backend
      const updatedUser = await usersAPI.updateGradeLevel(level);
      
      // Update user in context
      if (updateUser && updatedUser) {
        updateUser(updatedUser);
      }
      
      // Small delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check mandatory diagnostic test
      const levelKey = level === 5 ? '5eme' : '6eme';
      const status = await levelTestAPI.getStatus(levelKey);
      if (!status.completed) {
        router.push(`/student/level-test?level=${levelKey}`);
      } else {
        router.push('/student/courses');
      }
    } catch (error: any) {
      console.error('Failed to save level:', error);
      alert(error.message || '❌ فشل حفظ المستوى الدراسي. يرجى المحاولة مرة أخرى.');
      setSaving(false);
    }
  };

  if (authLoading || pageLoading) {
    return <EcoLoading message="جاري التحميل..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50 flex items-center justify-center p-4" dir="rtl">
      {/* Background eco decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 text-green-200 opacity-30 animate-float">
          <Leaf className="w-32 h-32" />
        </div>
        <div className="absolute bottom-32 left-32 text-sky-200 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
          <Sun className="w-24 h-24" />
        </div>
        <div className="absolute top-1/2 left-20 text-amber-200 opacity-25 animate-float" style={{ animationDelay: '2s' }}>
          <Flower2 className="w-20 h-20" />
        </div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <FriendlyAnimal type="bird" emotion="happy" size="large" />
            <div className="flex flex-col items-center">
              <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-3">
                مرحباً بك في EcoLearn! 🌱
              </h1>
              <p className="text-2xl md:text-3xl text-gray-800 font-semibold mb-2">
                اختر مستواك الدراسي
              </p>
              <p className="text-lg text-gray-600">
                سنعرض لك الدروس والأنشطة المناسبة لمستواك
              </p>
            </div>
            <FriendlyAnimal type="rabbit" emotion="excited" size="large" />
          </div>
          
          {/* Eco mascots row */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <FriendlyAnimal type="turtle" emotion="happy" size="small" />
            <FriendlyAnimal type="butterfly" emotion="excited" size="small" />
            <FriendlyAnimal type="fish" emotion="happy" size="small" />
          </div>
        </div>

        {/* Level Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Year 5 Card */}
          <Card 
            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              selectedLevel === 5 
                ? 'ring-4 ring-green-500 shadow-2xl bg-gradient-to-br from-green-100 to-green-50' 
                : 'bg-gradient-to-br from-green-50 via-sky-50 to-amber-50 hover:shadow-xl border-3 border-green-300'
            } rounded-3xl overflow-hidden`}
            onClick={() => !saving && handleSelectLevel(5)}
          >
            <CardContent className="p-8 md:p-10 text-center relative">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-200/30 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Large number badge */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mb-6 shadow-xl transform hover:rotate-12 transition-transform">
                  <span className="text-7xl font-bold text-white">5</span>
                </div>
                
                {/* Icons */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                  <Sprout className="w-8 h-8 text-green-600" />
                  <FriendlyAnimal type="turtle" emotion="happy" size="medium" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-3">
                  🟢 السنة الخامسة
                </h2>
                <p className="text-xl text-gray-600 mb-2 font-medium">
                  5ème année primaire
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                  ابدأ مغامرتك في عالم البيئة! 🌿
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  للطلاب في السنة الخامسة من التعليم الابتدائي
                </p>
                
                <Button 
                  className={`w-full text-lg py-6 rounded-2xl font-bold shadow-lg transition-all ${
                    selectedLevel === 5 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  } text-white`}
                  size="lg"
                  disabled={saving}
                >
                  {saving && selectedLevel === 5 ? (
                    <>جاري التحميل... 🌱</>
                  ) : (
                    <>اختر هذا المستوى ✨</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Year 6 Card */}
          <Card 
            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              selectedLevel === 6 
                ? 'ring-4 ring-sky-500 shadow-2xl bg-gradient-to-br from-sky-100 to-sky-50' 
                : 'bg-gradient-to-br from-sky-50 via-blue-50 to-green-50 hover:shadow-xl border-3 border-sky-300'
            } rounded-3xl overflow-hidden`}
            onClick={() => !saving && handleSelectLevel(6)}
          >
            <CardContent className="p-8 md:p-10 text-center relative">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-sky-200/30 rounded-full -ml-16 -mt-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-200/30 rounded-full -mr-12 -mb-12"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Large number badge */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center mb-6 shadow-xl transform hover:rotate-12 transition-transform">
                  <span className="text-7xl font-bold text-white">6</span>
                </div>
                
                {/* Icons */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Droplet className="w-8 h-8 text-sky-600" />
                  <Sun className="w-8 h-8 text-amber-500" />
                  <FriendlyAnimal type="fish" emotion="excited" size="medium" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-3">
                  🔵 السنة السادسة
                </h2>
                <p className="text-xl text-gray-600 mb-2 font-medium">
                  6ème année primaire
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                  استكشف أسرار البيئة والطبيعة! 🌍
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  للطلاب في السنة السادسة من التعليم الابتدائي
                </p>
                
                <Button 
                  className={`w-full text-lg py-6 rounded-2xl font-bold shadow-lg transition-all ${
                    selectedLevel === 6 
                      ? 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800' 
                      : 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700'
                  } text-white`}
                  size="lg"
                  disabled={saving}
                >
                  {saving && selectedLevel === 6 ? (
                    <>جاري التحميل... 🌊</>
                  ) : (
                    <>اختر هذا المستوى ✨</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span>💡</span>
            <span>يمكنك تغيير مستواك لاحقاً من الإعدادات ⚙️</span>
          </p>
        </div>
      </div>
    </div>
  );
}
