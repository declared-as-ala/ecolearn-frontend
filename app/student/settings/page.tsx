'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';
import EcoLoading from '@/components/ui/EcoLoading';
import { Leaf, GraduationCap, Bell, Globe, User, Mail, Award } from 'lucide-react';
import { usersAPI, authAPI } from '@/lib/api';

export default function SettingsPage() {
  const router = useRouter();
  const { user, updateUser, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<5 | 6 | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== 'student') {
      router.push('/login');
      return;
    }
    setSelectedLevel(user.gradeLevel || null);
  }, [user, authLoading, router]);

  const handleChangeLevel = async (level: 5 | 6) => {
    if (selectedLevel === level) return;

    setLoading(true);
    try {
      const updatedUser = await usersAPI.updateGradeLevel(level);
      if (updateUser && updatedUser) {
        updateUser(updatedUser);
      }
      setSelectedLevel(level);
      alert('✅ تم تغيير المستوى الدراسي بنجاح! سيتم توجيهك للاختبار التشخيصي.');

      // Redirect to level test page with the correct level parameter
      const levelKey = level === 5 ? '5eme' : '6eme';
      router.push(`/student/level-test?level=${levelKey}`);
    } catch (error: any) {
      console.error('Failed to update level:', error);
      alert(error.message || '❌ فشل تحديث المستوى الدراسي. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return <EcoLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
      <StudentSidebar />
      <main className="mr-20 lg:mr-64 p-6 max-w-5xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-gradient-to-br from-green-100/80 to-sky-100/80 backdrop-blur-sm border-2 border-green-200/50 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                <FriendlyAnimal type="bird" emotion="happy" size="medium" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">الإعدادات ⚙️</h1>
                <p className="text-gray-600">إدارة حسابك وإعداداتك</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Level Section */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-2 border-green-200/50 shadow-md rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-sky-50 rounded-t-3xl border-b border-green-200/50">
            <CardTitle className="text-2xl font-bold text-green-700 flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              تغيير المستوى الدراسي
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              يمكنك تغيير مستواك الدراسي. سيتم حفظ تقدمك في كل مستوى بشكل منفصل.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 border-4 rounded-2xl ${selectedLevel === 5
                    ? 'border-green-500 bg-green-50 shadow-xl'
                    : 'border-green-200 hover:border-green-400 hover:shadow-lg'
                  }`}
                onClick={() => !loading && handleChangeLevel(5)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">🟢</div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    السنة الخامسة ابتدائي
                  </h3>
                  {selectedLevel === 5 && (
                    <Badge className="bg-green-500 text-white mt-2">المستوى الحالي</Badge>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 border-4 rounded-2xl ${selectedLevel === 6
                    ? 'border-sky-500 bg-sky-50 shadow-xl'
                    : 'border-sky-200 hover:border-sky-400 hover:shadow-lg'
                  }`}
                onClick={() => !loading && handleChangeLevel(6)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">🔵</div>
                  <h3 className="text-2xl font-bold text-sky-700 mb-2">
                    السنة السادسة ابتدائي
                  </h3>
                  {selectedLevel === 6 && (
                    <Badge className="bg-sky-500 text-white mt-2">المستوى الحالي</Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            {loading && (
              <div className="mt-6 text-center">
                <EcoLoading message="جاري التحديث..." />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-2 border-green-200/50 shadow-md rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-sky-50 rounded-t-3xl border-b border-green-200/50">
            <CardTitle className="text-2xl font-bold text-green-700 flex items-center gap-3">
              <Bell className="w-6 h-6" />
              الإعدادات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border-2 border-green-200">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-green-600" />
                <div>
                  <Label htmlFor="notifications" className="text-base font-semibold text-gray-800">
                    الإشعارات
                  </Label>
                  <p className="text-sm text-gray-600">تلقي تحديثات وتنبيهات</p>
                </div>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* User Info */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200/50 shadow-md rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-sky-50 rounded-t-3xl border-b border-green-200/50">
            <CardTitle className="text-2xl font-bold text-green-700 flex items-center gap-3">
              <User className="w-6 h-6" />
              معلومات الحساب
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-2xl border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-600">اسم المستخدم</p>
                </div>
                <p className="text-xl font-bold text-gray-800">{user.username}</p>
              </div>
              {user.email && (
                <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-sky-600" />
                    <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{user.email}</p>
                </div>
              )}
              <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-amber-600" />
                  <p className="text-sm text-gray-600">النقاط الإجمالية</p>
                </div>
                <p className="text-3xl font-bold text-amber-600">{user.points || 0}</p>
                {user.points && user.points > 0 && (
                  <p className="text-xs text-green-600 mt-1">🌟 أحسنت!</p>
                )}
              </div>
              <div className="p-4 bg-green-50 rounded-2xl border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-600">المستوى الحالي</p>
                </div>
                <p className="text-3xl font-bold text-green-600">المستوى {user.level || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
