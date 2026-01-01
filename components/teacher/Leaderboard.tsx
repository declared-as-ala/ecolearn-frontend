'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown, Star, Users } from 'lucide-react';

interface Student {
    id: string;
    username: string;
    points: number;
    level: number;
}

interface LeaderboardProps {
    students: Student[];
}

export default function Leaderboard({ students }: LeaderboardProps) {
    const sortedStudents = [...students].sort((a, b) => b.points - a.points);
    const top3 = sortedStudents.slice(0, 3);
    const others = sortedStudents.slice(3);

    const hasStudents = students.length > 0;

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 font-arabic" dir="rtl">
            {hasStudents ? (
                <>
                    {/* Podium Section */}
                    <div className="flex flex-col md:flex-row items-end justify-center gap-6 pt-16">
                        {/* Silver - 2nd Place */}
                        {top3[1] && (
                            <div className="flex flex-col items-center order-2 md:order-1 shrink-0">
                                <div className="relative mb-4">
                                    <Avatar className="w-24 h-24 border-4 border-slate-300 shadow-xl ring-4 ring-slate-100">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[1].username}`} />
                                        <AvatarFallback className="bg-slate-100 text-slate-700 font-black uppercase">
                                            {top3[1].username.substring(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -top-3 -right-3 bg-slate-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-black shadow-lg border-2 border-white text-lg">
                                        2
                                    </div>
                                </div>
                                <div className="text-center mb-2">
                                    <div className="font-black text-slate-700 text-lg leading-none mb-1">{top3[1].username}</div>
                                    <div className="text-xs font-bold text-slate-500">{top3[1].points} نقطة</div>
                                </div>
                                <div className="w-28 h-28 bg-gradient-to-t from-slate-200 to-slate-50 rounded-t-3xl shadow-inner border-t border-slate-300 flex items-center justify-center">
                                    <Medal className="w-10 h-10 text-slate-400" />
                                </div>
                            </div>
                        )}

                        {/* Gold - 1st Place */}
                        {top3[0] && (
                            <div className="flex flex-col items-center order-1 md:order-2 z-10 -translate-y-6 shrink-0">
                                <div className="relative mb-6">
                                    <Crown className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 text-amber-500 drop-shadow-lg animate-bounce duration-[2000ms]" />
                                    <Avatar className="w-32 h-32 border-4 border-amber-400 shadow-2xl ring-4 ring-amber-100">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[0].username}`} />
                                        <AvatarFallback className="bg-amber-100 text-amber-900 font-black uppercase">
                                            {top3[0].username.substring(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -top-4 -right-4 bg-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black shadow-xl border-2 border-white text-2xl">
                                        1
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <div className="font-black text-slate-900 text-2xl tracking-tight mb-2">{top3[0].username}</div>
                                    <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-none px-4 py-1 rounded-full font-black text-sm">
                                        {top3[0].points} نقطة
                                    </Badge>
                                </div>
                                <div className="w-36 h-48 bg-gradient-to-t from-amber-400 to-amber-100 rounded-t-3xl shadow-2xl border-t-2 border-amber-300 flex items-center justify-center">
                                    <Trophy className="w-16 h-16 text-amber-500 drop-shadow-md" />
                                </div>
                            </div>
                        )}

                        {/* Bronze - 3rd Place */}
                        {top3[2] && (
                            <div className="flex flex-col items-center order-3 md:order-3 shrink-0">
                                <div className="relative mb-4">
                                    <Avatar className="w-24 h-24 border-4 border-orange-300 shadow-xl ring-4 ring-orange-50">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[2].username}`} />
                                        <AvatarFallback className="bg-orange-100 text-orange-900 font-black uppercase">
                                            {top3[2].username.substring(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -top-3 -right-3 bg-orange-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-black shadow-lg border-2 border-white text-lg">
                                        3
                                    </div>
                                </div>
                                <div className="text-center mb-2">
                                    <div className="font-black text-slate-700 text-lg leading-none mb-1">{top3[2].username}</div>
                                    <div className="text-xs font-bold text-slate-500">{top3[2].points} نقطة</div>
                                </div>
                                <div className="w-28 h-20 bg-gradient-to-t from-orange-200 to-orange-50 rounded-t-3xl shadow-inner border-t border-orange-200 flex items-center justify-center">
                                    <Medal className="w-10 h-10 text-orange-400" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* List Section */}
                    {others.length > 0 && (
                        <Card className="max-w-3xl mx-auto shadow-sm border-slate-100 overflow-hidden rounded-3xl">
                            <CardHeader className="bg-slate-50/50 py-5 px-8">
                                <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                    <Trophy className="w-4 h-4" />
                                    بقية المتصدرين في القسم
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-50">
                                    {others.map((student, idx) => (
                                        <div
                                            key={student.id}
                                            className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-5">
                                                <span className="w-8 text-center font-black text-slate-400 group-hover:text-blue-500 transition-colors text-lg">
                                                    {idx + 4}
                                                </span>
                                                <Avatar className="w-12 h-12 border-2 border-white shadow-sm shrink-0">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.username}`} />
                                                    <AvatarFallback className="font-black bg-blue-50 text-blue-600">
                                                        {student.username.substring(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">{student.username}</div>
                                                    <div className="text-xs text-slate-400 flex items-center gap-1.5 font-bold mt-1">
                                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                        مستوى {student.level}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-left">
                                                <div className="font-black text-xl text-slate-800 leading-none">{student.points}</div>
                                                <div className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mt-1">نقطة</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 gap-6">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center shadow-inner">
                        <Trophy className="w-12 h-12 text-slate-200" />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-slate-800">ترتيب القسم غير متوفر حالياً</h3>
                        <p className="text-slate-500 font-bold max-w-sm mx-auto leading-relaxed">
                            🏆 سيظهر ترتيب القسم وتصدر الطلاب بعد أول نشاط تعليمي يقومون به.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
