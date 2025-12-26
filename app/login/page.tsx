'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, User, Lock, Mail, GraduationCap } from 'lucide-react';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'parent'>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message || 'فشل تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password || !role) {
      setError('يرجى ملء جميع الحقول');
      return;
    }
    setLoading(true);
    try {
      await register({ username, email, password, role });
    } catch (err: any) {
      setError(err.message || 'فشل التسجيل');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-sky-50 to-amber-50 p-4" dir="rtl">
      {/* Background eco decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 text-green-200 opacity-30">
          <Leaf className="w-32 h-32" />
        </div>
        <div className="absolute bottom-32 left-32 text-sky-200 opacity-30">
          <Leaf className="w-24 h-24 rotate-45" />
        </div>
        <div className="absolute top-1/2 left-20 text-amber-200 opacity-25">
          <Leaf className="w-20 h-20 -rotate-12" />
        </div>
      </div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden relative z-10">
        {/* Logo Header */}
        <div className="bg-gradient-to-br from-green-400 to-sky-400 p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">EcoLearn</h1>
              <p className="text-sm text-white/90 mt-1">إيكو ليرن</p>
            </div>
          </div>
          <p className="text-white text-lg font-medium mt-4">
            مرحبًا بك في EcoLearn 🌱
          </p>
          <p className="text-white/90 text-sm mt-1">
            لنتعلم كيف نحمي كوكبنا!
          </p>
        </div>

        <CardContent className="p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-green-50 rounded-2xl p-1.5 mb-6">
              <TabsTrigger 
                value="login" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-green-600 font-semibold"
              >
                تسجيل الدخول
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-green-600 font-semibold"
              >
                إنشاء حساب
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-username" className="text-gray-700 font-medium text-base">
                    اسم المستخدم أو البريد الإلكتروني
                  </Label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="login-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="أدخل اسم المستخدم"
                      className="pr-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-green-400 text-lg"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-gray-700 font-medium text-base">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="أدخل كلمة المرور"
                      className="pr-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-green-400 text-lg"
                      dir="rtl"
                    />
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={loading}
                >
                  {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="register-username" className="text-gray-700 font-medium text-base">
                    اسم المستخدم
                  </Label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="register-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="اختر اسم مستخدم"
                      className="pr-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-green-400 text-lg"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-gray-700 font-medium text-base">
                    البريد الإلكتروني
                  </Label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="أدخل بريدك الإلكتروني"
                      className="pr-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-green-400 text-lg"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-role" className="text-gray-700 font-medium text-base">
                    نوع الحساب
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                    <Select value={role} onValueChange={(value: any) => setRole(value)}>
                      <SelectTrigger className="pr-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-green-400 text-lg">
                        <SelectValue placeholder="اختر نوع الحساب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">طالب</SelectItem>
                        <SelectItem value="teacher">معلم</SelectItem>
                        <SelectItem value="parent">ولي أمر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-gray-700 font-medium text-base">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="أنشئ كلمة مرور (6 أحرف على الأقل)"
                      minLength={6}
                      className="pr-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-green-400 text-lg"
                      dir="rtl"
                    />
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={loading}
                >
                  {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Friendly footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center gap-3">
            <FriendlyAnimal type="bird" emotion="happy" size="small" />
            <p className="text-gray-500 text-sm">لنحمي كوكبنا معاً! 🌍</p>
            <FriendlyAnimal type="rabbit" emotion="happy" size="small" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
