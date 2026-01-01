'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    BookOpen, CheckCircle2, Clock,
    PlayCircle, Trophy, BarChart3,
    AlertCircle, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetailedProgress {
    overallProgress: number;
    subjects: {
        name: string;
        progress: number;
        completedLessons: number;
        totalLessons: number;
        color: string;
    }[];
    recentLessons: {
        id: string;
        title: string;
        subject: string;
        date: string;
        score: number;
        status: 'completed' | 'in-progress';
    }[];
}

interface DetailedProgressProps {
    childName: string;
    data: DetailedProgress;
}

export default function DetailedProgress({ childName, data }: DetailedProgressProps) {
    return (
        <div className="space-y-10 font-arabic animate-in fade-in duration-500">
            {/* Subject Progress Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 rounded-[40px] border-none bg-white shadow-sm p-4">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-black text-slate-800 flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                            التقدم حسب المواد
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 pt-6">
                        {data.subjects.map((subject, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h5 className="font-black text-slate-800 text-lg">{subject.name}</h5>
                                        <p className="text-xs font-bold text-slate-400">
                                            تم إكمال {subject.completedLessons} من أصل {subject.totalLessons} دروس
                                        </p>
                                    </div>
                                    <span className="text-xl font-black" style={{ color: subject.color }}>{subject.progress}%</span>
                                </div>
                                <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Overall Summary Card */}
                <Card className="rounded-[40px] border-none bg-slate-900 text-white shadow-2xl shadow-slate-200 overflow-hidden relative">
                    <CardContent className="p-10 flex flex-col h-full">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-10 text-slate-300">الملخص العام لـ {childName}</h3>

                            <div className="flex flex-col items-center justify-center mb-12">
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            fill="transparent"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="12"
                                        />
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            fill="transparent"
                                            stroke="url(#gradient)"
                                            strokeWidth="12"
                                            strokeDasharray={440}
                                            strokeDashoffset={440 - (440 * data.overallProgress) / 100}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#10b981" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black">{data.overallProgress}%</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">مكتمل</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">إجمالي الدروس</p>
                                        <p className="text-sm font-black text-white">42 درس مكتمل</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">وقت المذاكرة</p>
                                        <p className="text-sm font-black text-white">12 ساعة هذا الأسبوع</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
                    </CardContent>
                </Card>
            </div>

            {/* Recent Lessons List */}
            <div>
                <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-slate-400" />
                    النشاط الأخير
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {data.recentLessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
                                    lesson.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                                )}>
                                    {lesson.status === 'completed' ? <CheckCircle2 className="w-7 h-7" /> : <PlayCircle className="w-7 h-7" />}
                                </div>
                                <div>
                                    <h5 className="font-black text-slate-800 text-lg">{lesson.title}</h5>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold hover:bg-slate-200">
                                            {lesson.subject}
                                        </Badge>
                                        <span className="text-xs font-bold text-slate-400">{lesson.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-10">
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">النتيجة</p>
                                    <p className={cn(
                                        "text-xl font-black leading-none",
                                        lesson.score >= 80 ? "text-emerald-600" : "text-blue-600"
                                    )}>{lesson.score}%</p>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50">
                                    <ArrowRight className="w-5 h-5 text-slate-300 rotate-180" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

