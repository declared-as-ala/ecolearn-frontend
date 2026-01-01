'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Users, Activity, BarChart3, TrendingUp, Sparkles, GraduationCap, Target,
    Award, CheckCircle2
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from 'recharts';

interface OverviewProps {
    stats: {
        totalStudents: number;
        count5eme: number;
        count6eme: number;
        activeStudents: number;
        totalLessonsCompleted: number;
        totalGamesCompleted: number;
        avgPoints5eme: number;
        avgPoints6eme: number;
        totalBadges: number;
        topLevelSummary: {
            totalPoints: number;
            participationRate: number;
        };
    };
    engagementData: any[];
    progressData: any[];
}

export default function Overview({ stats, engagementData, progressData }: OverviewProps) {
    const hasStudents = (stats?.totalStudents || 0) > 0;

    const breakdownData = [
        { name: 'السنة الخامسة', count: stats?.count5eme || 0, avgPoints: stats?.avgPoints5eme || 0, color: '#3b82f6' },
        { name: 'السنة السادسة', count: stats?.count6eme || 0, avgPoints: stats?.avgPoints6eme || 0, color: '#8b5cf6' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-arabic" dir="rtl">
            {/* Global Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm bg-white hover:shadow-md transition-all rounded-3xl overflow-hidden group">
                    <div className="h-1.5 w-full bg-blue-500" />
                    <CardHeader className="pb-2 px-6 pt-6">
                        <CardDescription className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            إجمالي التلاميذ
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-2">
                        <div className="flex items-end justify-between">
                            <div className="text-4xl font-black text-slate-900 leading-none">{stats?.totalStudents || 0}</div>
                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white hover:shadow-md transition-all rounded-3xl overflow-hidden group">
                    <div className="h-1.5 w-full bg-amber-500" />
                    <CardHeader className="pb-2 px-6 pt-6">
                        <CardDescription className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            إجمالي النقاط
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-2">
                        <div className="flex items-end justify-between">
                            <div className="text-4xl font-black text-slate-900 leading-none">{stats?.topLevelSummary?.totalPoints || 0}</div>
                            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Award className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white hover:shadow-md transition-all rounded-3xl overflow-hidden group">
                    <div className="h-1.5 w-full bg-violet-500" />
                    <CardHeader className="pb-2 px-6 pt-6">
                        <CardDescription className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-violet-500" />
                            نسبة المشاركة
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-2">
                        <div className="flex items-end justify-between">
                            <div className="text-4xl font-black text-slate-900 leading-none">{stats?.topLevelSummary?.participationRate || 0}%</div>
                            <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-violet-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white hover:shadow-md transition-all rounded-3xl overflow-hidden group">
                    <div className="h-1.5 w-full bg-emerald-500" />
                    <CardHeader className="pb-2 px-6 pt-6">
                        <CardDescription className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            النشطون اليوم
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-2">
                        <div className="flex items-end justify-between">
                            <div className="text-4xl font-black text-slate-900 leading-none">{stats?.activeStudents || 0}</div>
                            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Activity className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {hasStudents ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Grade breakdown Analysis */}
                    <Card className="lg:col-span-2 shadow-sm border-none bg-white rounded-3xl">
                        <CardHeader className="px-8 pt-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl font-black flex items-center gap-3">
                                        <BarChart3 className="w-6 h-6 text-blue-600" />
                                        تحليل المستويات الدراسية
                                    </CardTitle>
                                    <CardDescription className="font-bold mt-1">مقارنة أداء وتعداد تلاميذ السنوات 5 و 6</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={breakdownData} layout="vertical" margin={{ right: 30, left: 60 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#f1f5f9" vertical={false} />
                                            <XAxis type="number" hide />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 13, fontWeight: '900', fill: '#1e293b' }}
                                                width={100}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', direction: 'rtl' }}
                                            />
                                            <Bar dataKey="avgPoints" radius={[0, 10, 10, 0]} barSize={40} name="متوسط النقاط">
                                                {breakdownData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-6">
                                    {breakdownData.map((item, idx) => (
                                        <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all group">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-black text-slate-800 flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                    {item.name}
                                                </span>
                                                <span className="text-xs font-bold text-slate-400">تحصيل أكاديمي</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1.5">العدد</p>
                                                    <p className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase">{item.count} تلميذ</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1.5">متوسط النقاط</p>
                                                    <p className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.avgPoints} ن</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Secondary Global stats column */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl overflow-hidden relative">
                            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                                <Target className="w-32 h-32" />
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-black flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    الإنجاز العام
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2 space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold opacity-80">الدروس المكتملة</span>
                                            <span className="text-lg font-black">{stats?.totalLessonsCompleted || 0}</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-white rounded-full" style={{ width: '65%' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold opacity-80">الأوسمة الممنوحة</span>
                                            <span className="text-lg font-black">{stats?.totalBadges || 0}</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-400 rounded-full" style={{ width: '40%' }} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden h-full">
                            <CardHeader className="pb-3 border-b border-slate-50">
                                <CardTitle className="text-base font-black flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    تلميح المساعد الذكي
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                                    "نلاحظ تفوقاً تدريجياً في مستوى تلاميذ السنة الخامسة في مادة العلوم، ربما حان الوقت لإطلاق تحدي 'البطل البيئي' لتحفيزهم أكثر!"
                                </p>
                                <div className="mt-8 pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-4 rtl:space-x-reverse">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 uppercase">
                                                    S{i}
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[11px] font-black text-slate-400">+5 تلاميذ متفوقين</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border-2 border-dashed border-slate-100 gap-6">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                        <Users className="w-12 h-12 text-slate-200" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-black text-slate-800">لا توجد بيانات متاحة حالياً</h3>
                        <p className="text-slate-400 font-bold max-w-sm mt-3 mx-auto leading-relaxed">
                            بمجرد تسجيل تلاميذ في النظام، ستتمكن من رؤية الإحصائيات التحليلية المفصلة هنا.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
