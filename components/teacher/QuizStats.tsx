'use client';

import { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import {
    Users, Target, Clock, AlertTriangle,
    TrendingUp, Download, ArrowRight, User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Quiz, QuizAttempt, quizzesAPI } from '@/lib/api';

interface QuizStatsProps {
    quiz: Quiz;
    onBack: () => void;
}

export default function QuizStats({ quiz, onBack }: QuizStatsProps) {
    const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, [quiz._id]);

    const fetchResults = async () => {
        try {
            const data = await quizzesAPI.getResults(quiz._id);
            setAttempts(data);
        } catch (error) {
            console.error('Failed to fetch results:', error);
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        totalAttempts: attempts.length,
        passed: attempts.filter(a => a.status === 'pass').length,
        failed: attempts.filter(a => a.status === 'fail').length,
        avgScore: attempts.length > 0
            ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length)
            : 0,
        avgTime: attempts.length > 0
            ? Math.round(attempts.reduce((sum, a) => sum + a.timeSpent, 0) / attempts.length)
            : 0
    };

    const scoreDistribution = [
        { name: '0-20', value: attempts.filter(a => a.percentage < 20).length },
        { name: '20-40', value: attempts.filter(a => a.percentage >= 20 && a.percentage < 40).length },
        { name: '40-60', value: attempts.filter(a => a.percentage >= 40 && a.percentage < 60).length },
        { name: '60-80', value: attempts.filter(a => a.percentage >= 60 && a.percentage < 80).length },
        { name: '80-100', value: attempts.filter(a => a.percentage >= 80).length },
    ].filter(d => d.value > 0);

    const COLORS = ['#ef4444', '#f97316', '#facc15', '#3b82f6', '#10b981'];

    return (
        <div className="space-y-8 font-arabic animate-in fade-in duration-500" dir="rtl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={onBack} className="h-10 w-10 p-0 rounded-full">
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800">إحصائيات: {quiz.title}</h2>
                        <p className="text-slate-500 font-bold">تحليل أداء التلاميذ في الاختبار</p>
                    </div>
                </div>
                <Button variant="outline" className="rounded-xl border-slate-200 font-bold gap-2">
                    <Download className="w-4 h-4" />
                    تصدير التقرير
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white group">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">إجمالي المحاولات</p>
                                <p className="text-3xl font-black text-slate-900">{stats.totalAttempts}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white group">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">متوسط النتيجة</p>
                                <p className="text-3xl font-black text-slate-900">{stats.avgScore}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white group">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">متوسط الوقت</p>
                                <p className="text-3xl font-black text-slate-900">{Math.floor(stats.avgTime / 60)}د {stats.avgTime % 60}ث</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white group">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">نسبة النجاح</p>
                                <p className="text-3xl font-black text-slate-900">
                                    {stats.totalAttempts > 0 ? Math.round((stats.passed / stats.totalAttempts) * 100) : 0}%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="px-8 pt-8">
                        <CardTitle className="text-xl font-black">توزيع الدرجات</CardTitle>
                        <CardDescription className="font-bold">نظرة عامة على مستويات أداء التلاميذ</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={scoreDistribution}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                                    {scoreDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="p-8">
                        <div className="h-14 w-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-4">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl font-black">أسئلة صعبة</CardTitle>
                        <CardDescription className="font-bold">الأسئلة التي واجه التلاميذ صعوبة فيها</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-4">
                        {quiz.questions.slice(0, 3).map((q, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-amber-200 transition-all">
                                <p className="text-sm font-black text-slate-800 line-clamp-2">{q.text}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase">معدل الخطأ</span>
                                    <span className="text-sm font-black text-red-500">45%</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="px-8 pt-8">
                    <CardTitle className="text-xl font-black">تفاصيل المحاولات</CardTitle>
                    <CardDescription className="font-bold">سجل شامل لكل تلميذ قام بحل الاختبار</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="font-black text-slate-500 text-right pr-8">التلميذ</TableHead>
                                <TableHead className="font-black text-slate-500 text-center">النتيجة</TableHead>
                                <TableHead className="font-black text-slate-500 text-center">النسبة</TableHead>
                                <TableHead className="font-black text-slate-500 text-center">الحالة</TableHead>
                                <TableHead className="font-black text-slate-500 text-center">الوقت المستغرق</TableHead>
                                <TableHead className="font-black text-slate-500 text-center">التاريخ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attempts.map((attempt) => (
                                <TableRow key={attempt._id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                                    <TableCell className="font-bold pr-8">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                <User className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <span>{attempt.user?.profile?.firstName} {attempt.user?.profile?.lastName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-black text-slate-700">{attempt.score} / {quiz.totalPoints}</TableCell>
                                    <TableCell className="text-center">
                                        <span className={`font-black ${attempt.percentage >= quiz.passScore ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {attempt.percentage}%
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={`${attempt.status === 'pass' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'} border-none rounded-lg px-3 py-1 font-black text-[10px]`}>
                                            {attempt.status === 'pass' ? 'ناجح' : 'راسب'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-slate-500">
                                        {Math.floor(attempt.timeSpent / 60)}د {attempt.timeSpent % 60}ث
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-slate-400 text-xs">
                                        {new Date(attempt.attemptedAt).toLocaleDateString('ar-TN')}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {attempts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-400 font-bold">
                                        لا توجد محاولات لهذا الاختبار بعد
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
