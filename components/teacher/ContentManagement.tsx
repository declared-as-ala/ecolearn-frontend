'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BookOpen, Plus, Settings, Trash2, Users,
    Gamepad2, FileEdit, LayoutGrid, ChevronLeft, Save, X, Edit3, Eye,
    GraduationCap, Info
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Course {
    _id: string;
    courseId: string;
    title: string;
    gradeLevel: number;
    description?: string;
    sections: {
        exercises: any[];
        games: any[];
    };
    enrolledCount: number;
}

interface ContentManagementProps {
    courses: Course[];
    onToggleCourse: (courseId: string, enabled: boolean) => Promise<void>;
    onAddCourse: (data: any) => Promise<void>;
    onDeleteCourse: (courseId: string) => Promise<void>;
    onAddExercise: (courseId: string, data: any) => Promise<void>;
    onUpdateExercise: (courseId: string, exerciseId: string, data: any) => Promise<void>;
    onDeleteExercise: (courseId: string, exerciseId: string) => Promise<void>;
    onAddGame: (courseId: string, data: any) => Promise<void>;
    onUpdateGame: (courseId: string, gameId: string, data: any) => Promise<void>;
    onDeleteGame: (courseId: string, gameId: string) => Promise<void>;
}

export default function ContentManagement({
    courses,
    onToggleCourse,
    onAddCourse,
    onDeleteCourse,
    onAddExercise,
    onUpdateExercise,
    onDeleteExercise,
    onAddGame,
    onUpdateGame,
    onDeleteGame
}: ContentManagementProps) {
    const [selectedLevel, setSelectedLevel] = useState<number>(5);
    const [isExModalOpen, setIsExModalOpen] = useState(false);
    const [isGameModalOpen, setIsGameModalOpen] = useState(false);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isCourseContentOpen, setIsCourseContentOpen] = useState(false);
    const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        points: 10
    });

    const [courseFormData, setCourseFormData] = useState({
        title: '',
        courseId: '',
        gradeLevel: 5,
        description: ''
    });

    const filteredCourses = courses.filter(c => c.gradeLevel === selectedLevel);
    const activeCourse = courses.find(c => c._id === activeCourseId);

    const handleOpenExModal = (courseId: string, exercise?: any) => {
        setActiveCourseId(courseId);
        if (exercise) {
            setSelectedItem(exercise);
            setFormData({ title: exercise.title, type: exercise.type, points: exercise.points || 10 });
        } else {
            setSelectedItem(null);
            setFormData({ title: 'تمرين جديد', type: 'quiz', points: 10 });
        }
        setIsExModalOpen(true);
    };

    const handleOpenGameModal = (courseId: string, game?: any) => {
        setActiveCourseId(courseId);
        if (game) {
            setSelectedItem(game);
            setFormData({ title: game.title, type: game.type, points: game.points || 20 });
        } else {
            setSelectedItem(null);
            setFormData({ title: 'لعبة جديدة', type: 'matching', points: 20 });
        }
        setIsGameModalOpen(true);
    };

    const handleOpenCourseModal = () => {
        setCourseFormData({
            title: '',
            courseId: '',
            gradeLevel: selectedLevel,
            description: ''
        });
        setIsCourseModalOpen(true);
    };

    const handleAddOrUpdateExercise = async () => {
        if (!activeCourseId) return;
        setLoading(true);
        try {
            if (selectedItem) {
                await onUpdateExercise(activeCourseId, selectedItem.id || selectedItem._id, formData);
            } else {
                await onAddExercise(activeCourseId, formData);
            }
            setIsExModalOpen(false);
        } catch (error) {
            console.error("Failed to save exercise", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrUpdateGame = async () => {
        if (!activeCourseId) return;
        setLoading(true);
        try {
            if (selectedItem) {
                await onUpdateGame(activeCourseId, selectedItem.id || selectedItem._id, formData);
            } else {
                await onAddGame(activeCourseId, formData);
            }
            setIsGameModalOpen(false);
        } catch (error) {
            console.error("Failed to save game", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourseSubmit = async () => {
        setLoading(true);
        try {
            await onAddCourse(courseFormData);
            setIsCourseModalOpen(false);
        } catch (error) {
            console.error("Failed to add course", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEx = async (courseId: string, exId: string) => {
        try {
            await onDeleteExercise(courseId, exId);
        } catch (error) {
            console.error("Failed to delete exercise", error);
        }
    };

    const handleDeleteG = async (courseId: string, gameId: string) => {
        try {
            await onDeleteGame(courseId, gameId);
        } catch (error) {
            console.error("Failed to delete game", error);
        }
    };

    return (
        <div className="space-y-8 font-arabic animate-in fade-in duration-500" dir="rtl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">إدارة المحتوى التعليمي</h2>
                    <p className="text-slate-400 font-bold mt-1">إضافة المسارات، التمارين والألعاب وتخصيصها للمستويات.</p>
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm self-start">
                    <button
                        onClick={() => setSelectedLevel(5)}
                        className={`px-6 py-2.5 rounded-xl font-black transition-all ${selectedLevel === 5 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        السنة 5 ابتدائي
                    </button>
                    <button
                        onClick={() => setSelectedLevel(6)}
                        className={`px-6 py-2.5 rounded-xl font-black transition-all ${selectedLevel === 6 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        السنة 6 ابتدائي
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                    <Card key={course._id} className="border-slate-100 shadow-xl shadow-slate-200/20 rounded-[32px] overflow-hidden group hover:border-blue-200 transition-all duration-300">
                        <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] px-3 tracking-widest uppercase py-1 rounded-full">
                                        {course.courseId}
                                    </Badge>
                                    <CardTitle className="text-xl font-black text-slate-900 line-clamp-1">{course.title}</CardTitle>
                                </div>
                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="grid grid-cols-3 border-b border-slate-100 divide-x divide-x-reverse divide-slate-100">
                                <div className="p-4 text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">تمارين</p>
                                    <p className="text-lg font-black text-slate-800">{course.sections?.exercises?.length || 0}</p>
                                </div>
                                <div className="p-4 text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ألعاب</p>
                                    <p className="text-lg font-black text-slate-800">{course.sections?.games?.length || 0}</p>
                                </div>
                                <div className="p-4 text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">تلميذ</p>
                                    <p className="text-lg font-black text-blue-600">{course.enrolledCount || 0}</p>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleOpenExModal(course._id)}
                                        className="rounded-xl font-black text-xs gap-2 border-slate-200 h-11 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                                    >
                                        <FileEdit className="w-3.5 h-3.5" />
                                        إضافة تمرين
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleOpenGameModal(course._id)}
                                        className="rounded-xl font-black text-xs gap-2 border-slate-200 h-11 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                                    >
                                        <Gamepad2 className="w-3.5 h-3.5" />
                                        إضافة لعبة
                                    </Button>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        onClick={() => { setActiveCourseId(course._id); setIsCourseContentOpen(true); }}
                                        className="flex-1 rounded-xl bg-slate-900 hover:bg-slate-800 font-black h-11 shadow-lg shadow-slate-200 gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        عرض وإدارة المحتوى
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDeleteCourse(course._id)}
                                        className="h-11 w-11 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Add New Course Card */}
                <Card
                    onClick={handleOpenCourseModal}
                    className="border-2 border-dashed border-slate-200 bg-slate-50/30 shadow-none rounded-[32px] flex flex-col items-center justify-center p-8 min-h-[350px] group hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-500 cursor-pointer"
                >
                    <div className="w-16 h-16 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-slate-200/50 mb-6">
                        <Plus className="w-8 h-8" />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-xl font-black text-slate-900">إضافة مسار تدريبي جديد</p>
                        <p className="text-sm font-bold text-slate-400 max-w-[200px]">قم بإنشاء مسار جديد وتجهيزه بالدروس والأنشطة.</p>
                    </div>
                </Card>
            </div>

            {/* Course Management Modal (Add Course) */}
            <Dialog open={isCourseModalOpen} onOpenChange={setIsCourseModalOpen}>
                <DialogContent className="sm:max-w-[500px] font-arabic" dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">إنشاء مسار تعليمي جديد</DialogTitle>
                        <DialogDescription className="font-bold text-slate-400">أدخل البيانات الأساسية للمسار التعليمي الجديد.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="c-title" className="font-black">اسم المسار (مثال: التنوع البيئي)</Label>
                            <Input id="c-title" value={courseFormData.title} onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })} className="rounded-xl font-bold" placeholder="أدخل اسم المسار هنا..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="c-id" className="font-black">معرف المسار (ID)</Label>
                                <Input id="c-id" value={courseFormData.courseId} onChange={(e) => setCourseFormData({ ...courseFormData, courseId: e.target.value })} className="rounded-xl font-bold" placeholder="eco-systems" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="c-grade" className="font-black">المستوى الدراسي</Label>
                                <Select value={courseFormData.gradeLevel.toString()} onValueChange={(v) => setCourseFormData({ ...courseFormData, gradeLevel: parseInt(v) })}>
                                    <SelectTrigger className="rounded-xl font-bold">
                                        <SelectValue placeholder="اختر المستوى" />
                                    </SelectTrigger>
                                    <SelectContent className="font-bold">
                                        <SelectItem value="5">السنة الخامسة</SelectItem>
                                        <SelectItem value="6">السنة السادسة</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="c-desc" className="font-black">وصف قصير</Label>
                            <Textarea id="c-desc" value={courseFormData.description} onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })} className="rounded-xl font-bold resize-none h-24" placeholder="اكتب نبذة مختصرة عن أهداف هذا المسار..." />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsCourseModalOpen(false)} className="rounded-xl font-black">إلغاء</Button>
                        <Button onClick={handleAddCourseSubmit} disabled={loading} className="bg-blue-600 rounded-xl font-black">
                            {loading ? 'جاري الإنشاء...' : 'إنشاء المسار'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Course Content Detail Modal */}
            <Dialog open={isCourseContentOpen} onOpenChange={setIsCourseContentOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto font-arabic" dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">{activeCourse?.title}</DialogTitle>
                        <DialogDescription className="font-bold text-slate-400">إدارة محتوى المسار التعليمي بالتفصيل.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-8 py-4">
                        {/* Course Stats Overview within Modal */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-3xl bg-amber-50 border border-amber-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-white border border-amber-200 flex items-center justify-center text-amber-600">
                                        <FileEdit className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-amber-400 uppercase">إجمالي التمارين</p>
                                        <p className="text-xl font-black text-amber-900">{activeCourse?.sections.exercises.length || 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-3xl bg-emerald-50 border border-emerald-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600">
                                        <Gamepad2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-emerald-400 uppercase">إجمالي الألعاب</p>
                                        <p className="text-xl font-black text-emerald-900">{activeCourse?.sections.games.length || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Exercises List */}
                        <div className="space-y-4">
                            <h4 className="font-black text-lg border-r-4 border-amber-500 pr-3 flex items-center justify-between">
                                التمارين التفاعلية
                                <Button size="sm" variant="ghost" onClick={() => handleOpenExModal(activeCourseId!)} className="text-blue-600 gap-1 font-black">
                                    <Plus className="w-4 h-4" /> إضافة
                                </Button>
                            </h4>
                            <div className="grid gap-3">
                                {activeCourse?.sections.exercises.map((ex, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xs">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 text-sm">{ex.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">{ex.type} • {ex.points} نقطة</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenExModal(activeCourseId!, ex)} className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                                                <Edit3 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteEx(activeCourseId!, ex.id || ex._id)} className="h-8 w-8 text-red-500 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Games List */}
                        <div className="space-y-4">
                            <h4 className="font-black text-lg border-r-4 border-emerald-500 pr-3 flex items-center justify-between">
                                الألعاب التعليمية
                                <Button size="sm" variant="ghost" onClick={() => handleOpenGameModal(activeCourseId!)} className="text-blue-600 gap-1 font-black">
                                    <Plus className="w-4 h-4" /> إضافة
                                </Button>
                            </h4>
                            <div className="grid gap-3">
                                {activeCourse?.sections.games.map((game, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 text-sm">{game.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">{game.type} • {game.points} نقطة</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenGameModal(activeCourseId!, game)} className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                                                <Edit3 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteG(activeCourseId!, game.id || game._id)} className="h-8 w-8 text-red-500 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Exercise Modal */}
            <Dialog open={isExModalOpen} onOpenChange={setIsExModalOpen}>
                <DialogContent className="sm:max-w-[425px] font-arabic" dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">{selectedItem ? 'تعديل تمرين' : 'إضافة تمرين جديد'}</DialogTitle>
                        <DialogDescription className="font-bold text-slate-400">أدخل تفاصيل التمرين الأساسية للبدء.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="font-black">عنوان التمرين</Label>
                            <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="rounded-xl font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type" className="font-black">نوع التمرين</Label>
                            <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                                <SelectTrigger className="rounded-xl font-bold">
                                    <SelectValue placeholder="اختر النوع" />
                                </SelectTrigger>
                                <SelectContent className="font-bold">
                                    <SelectItem value="quiz">اختبار (Quiz)</SelectItem>
                                    <SelectItem value="dragdrop">سحب وإفلات</SelectItem>
                                    <SelectItem value="matching">ربط بسهم</SelectItem>
                                    <SelectItem value="truefalse">صواب أو خطأ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="points" className="font-black">النقاط (مكافأة)</Label>
                            <Input id="points" type="number" value={formData.points} onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })} className="rounded-xl font-bold" />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsExModalOpen(false)} className="rounded-xl font-black">إلغاء</Button>
                        <Button onClick={handleAddOrUpdateExercise} disabled={loading} className="bg-blue-600 rounded-xl font-black">
                            {loading ? 'جاري الحفظ...' : 'حفظ التمرين'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Game Modal */}
            <Dialog open={isGameModalOpen} onOpenChange={setIsGameModalOpen}>
                <DialogContent className="sm:max-w-[425px] font-arabic" dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">{selectedItem ? 'تعديل لعبة' : 'إضافة لعبة تعليمية'}</DialogTitle>
                        <DialogDescription className="font-bold text-slate-400">اختر النوع المناسب لمحتوى اللعبة.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="g-title" className="font-black">اسم اللعبة</Label>
                            <Input id="g-title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="rounded-xl font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="g-type" className="font-black">نوع اللعبة</Label>
                            <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                                <SelectTrigger className="rounded-xl font-bold">
                                    <SelectValue placeholder="اختر النوع" />
                                </SelectTrigger>
                                <SelectContent className="font-bold">
                                    <SelectItem value="matching">لعبة الربط</SelectItem>
                                    <SelectItem value="sorting">لعبة التصنيف</SelectItem>
                                    <SelectItem value="rescue">لعبة الإنقاذ</SelectItem>
                                    <SelectItem value="simulation">لعبة محاكاة</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="g-points" className="font-black">النقاط (مكافأة)</Label>
                            <Input id="g-points" type="number" value={formData.points} onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })} className="rounded-xl font-bold" />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsGameModalOpen(false)} className="rounded-xl font-black">إلغاء</Button>
                        <Button onClick={handleAddOrUpdateGame} disabled={loading} className="bg-emerald-600 rounded-xl font-black">
                            {loading ? 'جاري الحفظ...' : 'حفظ اللعبة'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
