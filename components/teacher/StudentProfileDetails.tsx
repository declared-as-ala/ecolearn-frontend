'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
    BookOpen, Award, CheckCircle2, History, Clock,
    Medal, TrendingUp, Calendar, AlertTriangle,
    RotateCcw, RefreshCw, Lock, Unlock, Trash2,
    StickyNote, Search, Gamepad2, BrainCircuit, Settings
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StudentProfile {
    identity: {
        username: string;
        fullName: string;
        avatar?: string;
        gradeLevel: number;
        points: number;
        badges: string[];
        internalNotes: any[];
    };
    academicProgress: {
        lessons: any[];
        courseStats: any[];
        completedCoursesCount: number;
    };
    games: any[];
    quizzes: any[];
    badges: any[];
}

interface StudentProfileDetailsProps {
    student: any;
    profile: StudentProfile;
}

export default function StudentProfileDetails({ student, profile }: StudentProfileDetailsProps) {
    const [noteText, setNoteText] = useState('');

    const handleAction = (action: string, data?: any) => {
        // Implementation for these actions will be in TeacherDashboardContent handlers
        console.log(`Action: ${action}`, data);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 font-arabic" dir="rtl">
            {/* Main Content Area */}
            <div className="flex-1 space-y-8">
                {/* Header Card */}
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-xl ring-4 ring-blue-50">
                        <AvatarImage src={profile.identity.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.identity.username}`} />
                        <AvatarFallback className="bg-blue-600 text-white font-black text-2xl">
                            {profile.identity.username.substring(0, 1).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-black text-slate-900">{profile.identity.fullName}</h2>
                            <Badge className="bg-blue-50 text-blue-600 border-none font-black px-4">السنة {profile.identity.gradeLevel}</Badge>
                        </div>
                        <p className="text-slate-400 font-bold">@{profile.identity.username}</p>

                        <div className="flex gap-6 pt-2">
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-500" />
                                <span className="font-black text-slate-700">{profile.identity.points} نقطة</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Medal className="w-5 h-5 text-blue-500" />
                                <span className="font-black text-slate-700">{profile.identity.badges.length} وسام</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="bg-slate-100/50 p-1.5 rounded-3xl h-16 w-full flex justify-between">
                        <TabsTrigger value="overview" className="flex-1 rounded-2xl font-black text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm gap-2">
                            <TrendingUp className="w-4 h-4" /> نظرة عامة
                        </TabsTrigger>
                        <TabsTrigger value="lessons" className="flex-1 rounded-2xl font-black text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm gap-2">
                            <BookOpen className="w-4 h-4" /> الدروس
                        </TabsTrigger>
                        <TabsTrigger value="games" className="flex-1 rounded-2xl font-black text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm gap-2">
                            <Gamepad2 className="w-4 h-4" /> الألعاب
                        </TabsTrigger>
                        <TabsTrigger value="quizzes" className="flex-1 rounded-2xl font-black text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm gap-2">
                            <BrainCircuit className="w-4 h-4" /> الاختبارات
                        </TabsTrigger>
                        <TabsTrigger value="badges" className="flex-1 rounded-2xl font-black text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm gap-2">
                            <Medal className="w-4 h-4" /> الأوسمة
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {profile.academicProgress.courseStats.map(course => (
                                <Card key={course.id} className="rounded-[32px] border-slate-100 shadow-sm overflow-hidden group hover:border-blue-200 transition-all">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-black text-slate-800">{course.title}</h4>
                                            {course.isLocked ? <Lock className="w-4 h-4 text-red-400" /> : <Unlock className="w-4 h-4 text-green-400" />}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-black">
                                                <span className="text-slate-400">تقدم المادة</span>
                                                <span className="text-blue-600">{course.percentage}%</span>
                                            </div>
                                            <ProgressBar value={course.percentage} className="h-2 bg-slate-100" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="lessons" className="pt-6">
                        <Card className="rounded-[40px] border-slate-100 shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="text-right font-black">الدرس</TableHead>
                                        <TableHead className="text-right font-black">الحالة</TableHead>
                                        <TableHead className="text-right font-black">النقاط</TableHead>
                                        <TableHead className="text-right font-black">التاريخ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {profile.academicProgress.lessons.map(lesson => (
                                        <TableRow key={lesson.id}>
                                            <TableCell className="font-bold">{lesson.title}</TableCell>
                                            <TableCell>
                                                <Badge className={lesson.status === 'completed' ? 'bg-green-50 text-green-600 border-none' : 'bg-amber-50 text-amber-600 border-none'}>
                                                    {lesson.status === 'completed' ? 'مكتمل' : 'قيد الدراسة'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-black">+{lesson.points}</TableCell>
                                            <TableCell className="text-xs text-slate-400">{new Date(lesson.completedAt).toLocaleDateString('ar-TN')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>

                    <TabsContent value="games" className="pt-6">
                        <div className="grid grid-cols-1 gap-4">
                            {profile.games.map(game => (
                                <div key={game.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                                            <Gamepad2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800">{game.title}</p>
                                            <p className="text-xs font-bold text-slate-400">{new Date(game.playedAt).toLocaleString('ar-TN')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-left">
                                            <span className="block font-black text-lg text-slate-800">+{game.points}</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase">نقطة</span>
                                        </div>
                                        <Badge className="bg-green-50 text-green-600 border-none">ناجح</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="quizzes" className="pt-6">
                        <Card className="rounded-[40px] border-slate-100 shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="text-right font-black">الاختبار</TableHead>
                                        <TableHead className="text-right font-black">النتيجة</TableHead>
                                        <TableHead className="text-right font-black">الحالة</TableHead>
                                        <TableHead className="text-right font-black">الإجراء</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {profile.quizzes.map(quiz => (
                                        <TableRow key={quiz.id}>
                                            <TableCell className="font-bold">{quiz.quizTitle}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-blue-600">{quiz.percentage}%</span>
                                                    <span className="text-[10px] text-slate-400">{quiz.score} نقطة</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={quiz.status === 'passed' ? 'bg-green-50 text-green-600 border-none' : 'bg-red-50 text-red-600 border-none'}>
                                                    {quiz.status === 'passed' ? 'ناجح' : 'راسب'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" className="h-8 gap-2 text-blue-600 hover:bg-blue-50 font-black" onClick={() => handleAction('reassign-quiz', quiz.id)}>
                                                    <RotateCcw className="w-4 h-4" /> إعادة تعيين
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>

                    <TabsContent value="badges" className="pt-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {/* In a real app, we'd have a full list and grey out ones not in profile.identity.badges */}
                            {profile.identity.badges.map((badgeId: string) => (
                                <Card key={badgeId} className="rounded-3xl border-slate-100 shadow-sm p-6 flex flex-col items-center gap-4 group hover:border-amber-200">
                                    <div className="w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                                        🏆
                                    </div>
                                    <p className="font-black text-slate-800">{badgeId}</p>
                                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 gap-1" onClick={() => handleAction('remove-badge', badgeId)}>
                                        <Trash2 className="w-3.5 h-3.5" /> سحب الوسام
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Management Actions Sidebar */}
            <div className="w-full lg:w-96 space-y-6">
                <Card className="rounded-[40px] border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                    <CardHeader className="bg-slate-900 text-white p-8">
                        <CardTitle className="text-xl font-black flex items-center gap-3">
                            <Settings className="w-6 h-6" /> إجراءات الإدارة
                        </CardTitle>
                        <CardDescription className="text-slate-400 font-bold">إدارة حساب التلميذ بشكل مباشر</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                        <Button
                            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black gap-3 shadow-lg shadow-blue-200"
                            onClick={() => handleAction('reset-progress')}
                        >
                            <RefreshCw className="w-5 h-5" /> تصغير تصفير التقدم
                        </Button>

                        <div className="grid grid-cols-1 gap-2">
                            <p className="text-xs font-black text-slate-400 px-2 pb-1">إدارة المحتوى</p>
                            {profile.academicProgress.courseStats.map(course => (
                                <Button
                                    key={course.id}
                                    variant="outline"
                                    className="w-full h-12 rounded-xl justify-between px-5 font-bold border-slate-100 hover:bg-slate-50"
                                    onClick={() => handleAction('toggle-lock', course.id)}
                                >
                                    <span className="text-right truncate">{course.title}</span>
                                    {course.isLocked ? <Lock className="w-4 h-4 text-red-500" /> : <Unlock className="w-4 h-4 text-green-500" />}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Internal Notes */}
                <Card className="rounded-[40px] border-slate-100 shadow-sm overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-lg font-black flex items-center gap-3">
                            <StickyNote className="w-5 h-5 text-blue-600" /> ملاحظات المعلم
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                        <div className="space-y-3">
                            <Input
                                placeholder="أضف ملاحظة داخلية..."
                                className="rounded-xl border-slate-100 h-12 font-bold"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                            />
                            <Button
                                className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 font-black"
                                onClick={() => { handleAction('add-note', noteText); setNoteText(''); }}
                                disabled={!noteText}
                            >
                                حفظ الملاحظة
                            </Button>
                        </div>

                        <div className="h-[200px] w-full overflow-y-auto pr-2 custom-scrollbar">
                            <div className="space-y-4">
                                {profile.identity.internalNotes?.map((note, i) => (
                                    <div key={i} className="bg-slate-50 p-4 rounded-2xl space-y-1">
                                        <p className="text-sm font-bold text-slate-700">{note.text}</p>
                                        <p className="text-[10px] text-slate-400">{new Date(note.createdAt).toLocaleDateString('ar-TN')}</p>
                                    </div>
                                ))}
                                {(!profile.identity.internalNotes || profile.identity.internalNotes.length === 0) && (
                                    <p className="text-center text-slate-400 text-xs py-8">لا توجد ملاحظات سابقة</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
