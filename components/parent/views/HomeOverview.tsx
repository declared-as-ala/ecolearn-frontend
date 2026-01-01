'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Users, TrendingUp, Calendar, ArrowRight,
    Sparkles, Bell, LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomeOverviewProps {
    children: any[];
    onSelectChild: (id: string) => void;
}

export default function HomeOverview({ children, onSelectChild }: HomeOverviewProps) {
    const getDisplayName = (child: any) => {
        return `${child.profile?.firstName || ''} ${child.profile?.lastName || child.username || ''}`.trim();
    };

    return (
        <div className="space-y-10 font-arabic animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcoming Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-200">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl font-black mb-4 leading-tight">مرحباً بك في لوحة متابعة الأبناء</h2>
                    <p className="text-blue-100 text-lg font-bold">هنا يمكنك متابعة تقدم أطفالك التعليمي، التحقق من إنجازاتهم، والتواصل مباشرة مع معلميهم.</p>
                </div>
                <Sparkles className="absolute top-10 left-10 w-32 h-32 text-white/10 -rotate-12" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-[32px] border-none shadow-sm bg-white p-2">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <Users className="w-7 h-7 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400">عدد الأبناء</p>
                                <p className="text-3xl font-black text-slate-900">{children.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[32px] border-none shadow-sm bg-white p-2">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="w-7 h-7 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400">التقدم العام</p>
                                <p className="text-3xl font-black text-slate-900">84%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[32px] border-none shadow-sm bg-white p-2">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center">
                                <Bell className="w-7 h-7 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400">تنبيهات جديدة</p>
                                <p className="text-3xl font-black text-slate-900">3</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Student Cards Grid */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-slate-900">قائمة الأبناء</h3>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <div className="w-2 h-2 rounded-full bg-blue-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {children.map((child) => (
                        <Card
                            key={child.id}
                            className="group rounded-[40px] border-none bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
                        >
                            <CardContent className="p-8">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex gap-5">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-md ring-1 ring-blue-100">
                                                <img src={child.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.username}`} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl border-4 border-white flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-slate-900 mb-1">{getDisplayName(child)}</h4>
                                            <p className="text-slate-400 font-bold flex items-center gap-2">
                                                المستوى {child.gradeLevel === 5 ? 'الخامس' : 'السادس'}
                                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                {child.points || 0} نقطة
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 px-4 py-2 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الرتبة</p>
                                        <p className="text-lg font-black text-blue-600 text-center">#12</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-sm font-black text-slate-600">اكتمال المنهج</span>
                                        <span className="text-lg font-black text-blue-600">65%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50">
                                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000" style={{ width: '65%' }} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-slate-50/50 rounded-3xl p-4 border border-slate-50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">آخر نشاط</p>
                                        <p className="text-sm font-bold text-slate-700">درس: حماية البيئة</p>
                                    </div>
                                    <div className="bg-slate-50/50 rounded-3xl p-4 border border-slate-50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">أعلى نتيجة</p>
                                        <p className="text-sm font-bold text-slate-700">إختبار: 95/100</p>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => onSelectChild(child.id)}
                                    className="w-full h-14 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black group-hover:shadow-lg group-hover:shadow-blue-200 transition-all flex items-center justify-center gap-3"
                                >
                                    عرض التفاصيل
                                    <LayoutDashboard className="w-5 h-5" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

                    <button className="group relative rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-500">
                        <div className="w-20 h-20 bg-slate-50 rounded-[30px] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                            <Users className="w-10 h-10 text-slate-400 group-hover:text-blue-600" />
                        </div>
                        <p className="text-xl font-black text-slate-400 group-hover:text-blue-600">ربط تلميذ أخر</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
