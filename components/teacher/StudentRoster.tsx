'use client';

import { useState } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';
import {
    Search, MoreVertical, Eye, MessageSquare,
    RotateCcw, Trophy, Users
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
    id: string;
    username: string;
    email: string;
    points: number;
    gradeLevel?: number;
    level: number;
    badges: string[];
    stats: {
        completedLessons: number;
        completedGames: number;
        totalProgress: number;
    };
    isActive: boolean;
    lastActivity: string | Date | null;
}

interface StudentRosterProps {
    students: Student[];
    onViewProfile: (student: Student) => void;
    onResetProgress: (student: Student) => void;
    onSendMessage: (student: Student) => void;
}

export default function StudentRoster({
    students,
    onViewProfile,
    onResetProgress,
    onSendMessage
}: StudentRosterProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState<'all' | '5' | '6'>('all');

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = levelFilter === 'all' || student.gradeLevel?.toString() === levelFilter;
        return matchesSearch && matchesLevel;
    });

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-arabic" dir="rtl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="relative w-full lg:w-[450px]">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                        placeholder="ابحث عن تلميذ بالاسم أو البريد الإلكتروني..."
                        className="pr-12 border-slate-200 rounded-2xl font-bold h-12 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex-1 lg:flex-none">
                        <button
                            onClick={() => setLevelFilter('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${levelFilter === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            الكل
                        </button>
                        <button
                            onClick={() => setLevelFilter('5')}
                            className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${levelFilter === '5' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            السنة 5
                        </button>
                        <button
                            onClick={() => setLevelFilter('6')}
                            className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${levelFilter === '6' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            السنة 6
                        </button>
                    </div>
                </div>
            </div>

            <div className="border border-slate-100 rounded-[32px] bg-white shadow-xl shadow-slate-200/20 overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="text-right font-black py-6 px-6 text-slate-500 text-xs uppercase tracking-widest">التلميذ</TableHead>
                            <TableHead className="text-right font-black py-6 text-slate-500 text-xs uppercase tracking-widest">المستوى الدراسي</TableHead>
                            <TableHead className="text-right font-black py-6 text-slate-500 text-xs uppercase tracking-widest">النقاط</TableHead>
                            <TableHead className="text-right font-black py-6 text-slate-500 text-xs uppercase tracking-widest">المستوى</TableHead>
                            <TableHead className="text-right font-black py-6 text-slate-500 text-xs uppercase tracking-widest">الأوسمة</TableHead>
                            <TableHead className="text-right font-black py-6 text-slate-500 text-xs uppercase tracking-widest">التقدم</TableHead>
                            <TableHead className="text-left font-black py-6 px-6 text-slate-500 text-xs uppercase tracking-widest">تحكم</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <TableRow key={student.id} className="hover:bg-blue-50/20 transition-all border-slate-50 group">
                                    <TableCell className="py-5 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-blue-100/50">
                                                {student.username.substring(0, 1).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-800">{student.username}</span>
                                                <span className="text-[11px] font-bold text-slate-400">{student.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn(
                                            "px-3 py-1 rounded-full font-black text-[10px] border-none shadow-sm",
                                            student.gradeLevel === 5 ? "bg-amber-50 text-amber-600" : "bg-purple-50 text-purple-600"
                                        )}>
                                            السنة {student.gradeLevel}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                            <span className="text-sm font-black text-slate-700">{student.points}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px]">
                                            المستوى {student.level}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex -space-x-2 space-x-reverse">
                                            {student.badges?.slice(0, 3).map((badge: string, i: number) => (
                                                <div key={i} className="w-7 h-7 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center text-[10px] shadow-sm" title={badge}>
                                                    🏅
                                                </div>
                                            ))}
                                            {student.badges?.length > 3 && (
                                                <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">
                                                    +{student.badges.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1.5 min-w-[120px]">
                                            <div className="flex justify-between text-[11px] font-bold text-slate-500">
                                                <span>{student.stats?.completedLessons || 0} درس</span>
                                                <span className="text-blue-600">{student.stats?.totalProgress || 0}%</span>
                                            </div>
                                            <ProgressBar value={student.stats?.totalProgress || 0} className="h-1.5 bg-slate-100" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left py-5 px-6">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-slate-100 rounded-2xl transition-all">
                                                    <MoreVertical className="w-5 h-5 text-slate-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-60 rounded-2xl shadow-2xl border-none p-2 font-arabic">
                                                <DropdownMenuLabel className="font-black text-[11px] text-slate-400 px-4 py-3 uppercase tracking-widest">إدارة التلميذ</DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-slate-50 mx-2" />
                                                <DropdownMenuItem onClick={() => onViewProfile(student)} className="rounded-xl px-4 py-3 cursor-pointer font-black text-sm gap-4 focus:bg-blue-50 focus:text-blue-700 transition-colors">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                                        <Eye className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    عرض الملف والتقدم
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onSendMessage(student)} className="rounded-xl px-4 py-3 cursor-pointer font-black text-sm gap-4 focus:bg-emerald-50 focus:text-emerald-700 transition-colors">
                                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                    إرسال رسالة توجيهية
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-slate-50 mx-2" />
                                                <DropdownMenuItem
                                                    onClick={() => onResetProgress(student)}
                                                    className="rounded-xl px-4 py-3 cursor-pointer text-red-500 focus:text-red-700 focus:bg-red-50 font-black text-sm gap-4 transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                                        <RotateCcw className="w-4 h-4 text-red-600" />
                                                    </div>
                                                    إعادة تعيين كافة التقدم
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-80 text-center">
                                    <div className="flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-700">
                                        <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center shadow-inner">
                                            <Users className="w-12 h-12 text-slate-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="font-black text-slate-800 text-2xl tracking-tight">لم يتم العثور على تلاميذ</p>
                                            <p className="text-slate-400 font-bold text-base max-w-xs mx-auto">لا توجد بيانات تطابقة حالياً معايير البحث أو المستوى المختار.</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => { setSearchTerm(''); setLevelFilter('all') }}
                                            className="rounded-2xl font-black px-8 border-slate-200"
                                        >
                                            إعادة تعيين البحث
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
