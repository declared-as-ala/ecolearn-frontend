'use client';

import { useState, useEffect } from 'react';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Plus, Search, Edit2, Trash2, Layout,
    Clock, Target, CheckCircle2, AlertCircle, Eye,
    BarChart2, Filter, MoreVertical, BookOpen
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { quizzesAPI, Quiz, Course } from '@/lib/api';
import QuizEditor from './QuizEditor';
import QuizStats from './QuizStats';

const toast = {
    success: (msg: string) => console.log('SUCCESS:', msg),
    error: (msg: string) => console.error('ERROR:', msg)
};

interface QuizManagementProps {
    courses: Course[];
}

export default function QuizManagement({ courses }: QuizManagementProps) {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState<'all' | '5' | '6'>('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // View State
    const [currentView, setCurrentView] = useState<'list' | 'editor' | 'stats'>('list');
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

    // Create Modal State
    const [newQuiz, setNewQuiz] = useState({
        title: '',
        gradeLevel: 5 as 5 | 6,
        courseId: '',
        description: ''
    });

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const data = await quizzesAPI.getAll();
            setQuizzes(data);
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
            toast.error('فشل في تحميل الاختبارات');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateQuiz = async () => {
        if (!newQuiz.title || !newQuiz.courseId) {
            toast.error('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        try {
            const created = await quizzesAPI.create(newQuiz);
            toast.success('تم إنشاء المسودة بنجاح');
            setIsCreateModalOpen(false);
            setNewQuiz({ title: '', gradeLevel: 5, courseId: '', description: '' });
            setSelectedQuiz(created);
            setCurrentView('editor');
        } catch (error) {
            toast.error('فشل في إنشاء الاختبار');
        }
    };

    const handleDeleteQuiz = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا الاختبار؟')) return;
        try {
            await quizzesAPI.delete(id);
            toast.success('تم حذف الاختبار');
            fetchQuizzes();
        } catch (error) {
            toast.error('فشل في حذف الاختبار');
        }
    };

    const handleEditQuiz = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setCurrentView('editor');
    };

    const handleViewStats = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setCurrentView('stats');
    };

    const filteredQuizzes = quizzes.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = levelFilter === 'all' || quiz.gradeLevel.toString() === levelFilter;
        return matchesSearch && matchesLevel;
    });

    if (currentView === 'editor' && selectedQuiz) {
        return (
            <QuizEditor
                quiz={selectedQuiz}
                onSave={() => { fetchQuizzes(); setCurrentView('list'); }}
                onCancel={() => setCurrentView('list')}
            />
        );
    }

    if (currentView === 'stats' && selectedQuiz) {
        return (
            <QuizStats
                quiz={selectedQuiz}
                onBack={() => setCurrentView('list')}
            />
        );
    }

    return (
        <div className="space-y-6 font-arabic" dir="rtl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800">إدارة الاختبارات</h2>
                    <p className="text-slate-500 font-bold">إنشاء وتعديل ومراقبة أداء الاختبارات التقييمية</p>
                </div>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 h-12 flex items-center gap-2 transition-all hover:scale-105"
                >
                    <Plus className="w-5 h-5" />
                    إنشاء اختبار جديد
                </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative col-span-1 md:col-span-2">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                        placeholder="بحث عن اختبار..."
                        className="pr-12 h-12 rounded-2xl border-slate-100 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500 font-bold"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={levelFilter} onValueChange={(v: any) => setLevelFilter(v)}>
                    <SelectTrigger className="h-12 rounded-2xl bg-white border-slate-100 shadow-sm font-bold">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-slate-400" />
                            <SelectValue placeholder="تصفية حسب المستوى" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="font-arabic font-bold">
                        <SelectItem value="all">كل المستويات</SelectItem>
                        <SelectItem value="5">السنة الخامسة</SelectItem>
                        <SelectItem value="6">السنة السادسة</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Quizzes List */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-3xl" />
                    ))}
                </div>
            ) : filteredQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuizzes.map(quiz => (
                        <Card key={quiz._id} className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden group flex flex-col h-full bg-white">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge className={`${quiz.status === 'published' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'} border-none px-3 py-1 rounded-full font-black text-[10px]`}>
                                        {quiz.status === 'published' ? 'منشور' : 'مسودة'}
                                    </Badge>
                                    <Badge variant="outline" className="text-slate-400 border-slate-200">
                                        السنة {quiz.gradeLevel}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-black text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                    {quiz.title}
                                </CardTitle>
                                <CardDescription className="font-bold text-slate-400 line-clamp-2 mt-1">
                                    {quiz.description || 'لا يوجد وصف متاح لهذا الاختبار'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4 flex-grow">
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{quiz.questions.length} أسئلة</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                        <Target className="w-4 h-4" />
                                        <span>{quiz.totalPoints} نقطة</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                        <Clock className="w-4 h-4" />
                                        <span>{quiz.timeLimit ? `${quiz.timeLimit} دقيقة` : 'بدون وقت'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>{quiz.passScore}% للنجاح</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0 border-t border-slate-50 p-4 grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => handleEditQuiz(quiz)}
                                    className="w-full rounded-xl border-slate-100 font-bold gap-2 text-slate-600"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    تعديل
                                </Button>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleViewStats(quiz)}
                                        className="rounded-xl text-slate-400 hover:text-blue-600"
                                    >
                                        <BarChart2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteQuiz(quiz._id)}
                                        className="rounded-xl text-slate-400 hover:text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
                    <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-4">
                        <Layout className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800">لا توجد اختبارات</h3>
                    <p className="text-slate-400 font-bold mt-2">ابدأ بإنشاء أول اختبار لك اليوم لتفعيل التقييم الذاتي للتلاميذ</p>
                </div>
            )}

            {/* Create Quiz Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="max-w-xl p-0 overflow-hidden rounded-[32px] border-none font-arabic" dir="rtl">
                    <div className="bg-blue-600 p-8 text-white relative">
                        <DialogTitle className="text-2xl font-black mb-2 flex items-center gap-3">
                            <Plus className="w-8 h-8 p-1.5 bg-white/20 rounded-xl" />
                            إنشاء اختبار جديد
                        </DialogTitle>
                        <DialogDescription className="text-blue-100 font-bold">
                            أدخل البيانات الأساسية للبدء في تصميم أسئلة الاختبار
                        </DialogDescription>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">عنوان الاختبار</label>
                                <Input
                                    placeholder="مثال: التنوع البيولوجي في البحر الأبيض المتوسط"
                                    className="h-12 rounded-xl border-slate-100 font-bold"
                                    value={newQuiz.title}
                                    onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700">المستوى الدراسي</label>
                                    <Select
                                        value={newQuiz.gradeLevel.toString()}
                                        onValueChange={(v) => setNewQuiz({ ...newQuiz, gradeLevel: parseInt(v) as 5 | 6 })}
                                    >
                                        <SelectTrigger className="h-12 rounded-xl border-slate-100 font-bold">
                                            <SelectValue placeholder="اختر المستوى" />
                                        </SelectTrigger>
                                        <SelectContent className="font-arabic font-bold">
                                            <SelectItem value="5">السنة الخامسة</SelectItem>
                                            <SelectItem value="6">السنة السادسة</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700">المسار التعليمي</label>
                                    <Select
                                        value={newQuiz.courseId}
                                        onValueChange={(v) => setNewQuiz({ ...newQuiz, courseId: v })}
                                    >
                                        <SelectTrigger className="h-12 rounded-xl border-slate-100 font-bold">
                                            <SelectValue placeholder="اختر المسار" />
                                        </SelectTrigger>
                                        <SelectContent className="font-arabic font-bold">
                                            {courses.filter(c => c.gradeLevel === newQuiz.gradeLevel).map(course => (
                                                <SelectItem key={course._id} value={course.courseId}>{course.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">وصف قصير (اختياري)</label>
                                <Input
                                    placeholder="وصف يساعد التلاميذ على فهم محتوى الاختبار..."
                                    className="h-12 rounded-xl border-slate-100 font-bold"
                                    value={newQuiz.description}
                                    onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                            <p className="text-xs font-bold text-amber-700 leading-relaxed">
                                بعد إنشاء المسودة، ستتمكن من إضافة الأسئلة، تحديد العلامات، وتعيين الوقت المسموح به لكل سؤال.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-0 flex gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="rounded-xl font-bold flex-1"
                        >
                            إلغاء
                        </Button>
                        <Button
                            onClick={handleCreateQuiz}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black py-6 flex-2 transition-all hover:scale-[1.02]"
                        >
                            إنشاء الاختبار
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
