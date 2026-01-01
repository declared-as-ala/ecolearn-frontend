'use client';

import { useState } from 'react';
import {
    Plus, Edit2, Trash2, GripVertical, Settings, Save,
    Eye, CheckCircle2, XCircle, Type, ImageIcon,
    MessageSquare, ChevronUp, ChevronDown, Rocket, Clock, Target, BarChart2,
    ArrowRight, BrainCircuit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Reorder, AnimatePresence, motion } from 'framer-motion';
import { Quiz, QuizQuestion, quizzesAPI } from '@/lib/api';
import InlineQuestionEditor from './InlineQuestionEditor';

const toast = {
    success: (msg: string) => console.log('SUCCESS:', msg),
    error: (msg: string) => console.error('ERROR:', msg)
};

interface QuizEditorProps {
    quiz: Quiz;
    onSave: (updatedQuiz: Quiz) => void;
    onCancel: () => void;
}

export default function QuizEditor({ quiz, onSave, onCancel }: QuizEditorProps) {
    const [editedQuiz, setEditedQuiz] = useState<Quiz>(quiz);
    const [editingQuestion, setEditingQuestion] = useState<Partial<QuizQuestion> | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSaveQuiz = async () => {
        try {
            setSaving(true);
            const updated = await quizzesAPI.update(editedQuiz._id, editedQuiz);
            toast.success('تم حفظ التغييرات بنجاح');
            onSave(updated);
        } catch (error) {
            toast.error('فشل في حفظ التغييرات');
        } finally {
            setSaving(false);
        }
    };

    const handleAddQuestion = () => {
        setEditingQuestion({
            text: '',
            type: 'mcq',
            options: [
                { text: '', isCorrect: true },
                { text: '', isCorrect: false }
            ],
            points: 5,
            order: editedQuiz.questions.length
        });
        setIsAdding(true);
    };

    const handleEditQuestion = (question: QuizQuestion) => {
        setEditingQuestion(question);
        setIsAdding(false);
    };

    const handleSaveQuestion = (question: Partial<QuizQuestion>) => {
        let updatedQuestions = [...editedQuiz.questions];

        if ('_id' in question && question._id && !question._id.startsWith('temp-')) {
            // Update existing
            updatedQuestions = updatedQuestions.map(q => q._id === question._id ? (question as QuizQuestion) : q);
        } else {
            // Add new
            updatedQuestions.push({ ...question, _id: `temp-${Date.now()}` } as QuizQuestion);
        }

        const totalPoints = updatedQuestions.reduce((sum, q) => sum + (q.points || 0), 0);
        setEditedQuiz({ ...editedQuiz, questions: updatedQuestions, totalPoints });
        setEditingQuestion(null);
        setIsAdding(false);
    };

    const handleDeleteQuestion = (id: string) => {
        setEditedQuiz({
            ...editedQuiz,
            questions: editedQuiz.questions.filter(q => q._id !== id)
        });
    };

    const handleReorder = (newOrder: QuizQuestion[]) => {
        setEditedQuiz({
            ...editedQuiz,
            questions: newOrder.map((q, idx) => ({ ...q, order: idx }))
        });
    };

    const publishQuiz = async () => {
        try {
            setSaving(true);
            const updated = await quizzesAPI.update(editedQuiz._id, { ...editedQuiz, status: 'published' });
            toast.success('تم نشر الاختبار بنجاح');
            onSave(updated);
        } catch (error) {
            toast.error('فشل في نشر الاختبار');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 font-arabic animate-in fade-in slide-in-from-bottom-4 duration-500" dir="rtl">
            {/* Header */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCancel}
                        className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all shrink-0"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </Button>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <Settings className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800">{editedQuiz.title}</h2>
                            <div className="flex items-center gap-3 mt-1">
                                <Badge className={`${editedQuiz.status === 'published' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'} border-none font-black text-[10px]`}>
                                    {editedQuiz.status === 'published' ? 'منشور' : 'مسودة'}
                                </Badge>
                                <span className="text-slate-400 font-bold text-sm">المستوى {editedQuiz.gradeLevel}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleSaveQuiz}
                        disabled={saving}
                        className="rounded-xl border-slate-200 font-bold gap-2"
                    >
                        <Save className="w-4 h-4" />
                        حفظ التغييرات
                    </Button>
                    {editedQuiz.status === 'draft' && (
                        <Button
                            onClick={publishQuiz}
                            disabled={saving || editedQuiz.questions.length === 0}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black gap-2 transition-all hover:scale-105"
                        >
                            <Rocket className="w-4 h-4" />
                            نشر الآن
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor: Questions */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-800">الأسئلة ({editedQuiz.questions.length})</h3>
                        {!isAdding && !editingQuestion && (
                            <Button onClick={handleAddQuestion} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
                                <Plus className="w-4 h-4" />
                                إضافة سؤال جديد
                            </Button>
                        )}
                    </div>

                    {isAdding && (
                        <InlineQuestionEditor
                            question={editingQuestion}
                            onSave={handleSaveQuestion}
                            onCancel={() => { setEditingQuestion(null); setIsAdding(false); }}
                        />
                    )}

                    <Reorder.Group axis="y" values={editedQuiz.questions} onReorder={handleReorder} className="space-y-4">
                        <AnimatePresence initial={false}>
                            {editedQuiz.questions.map((question) => (
                                <Reorder.Item
                                    key={question._id}
                                    value={question}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative"
                                >
                                    {editingQuestion?._id === question._id ? (
                                        <InlineQuestionEditor
                                            question={question}
                                            onSave={handleSaveQuestion}
                                            onCancel={() => setEditingQuestion(null)}
                                        />
                                    ) : (
                                        <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-[24px] overflow-hidden group bg-white">
                                            <CardContent className="p-0">
                                                <div className="flex items-center">
                                                    <div className="w-12 flex flex-col items-center justify-center text-slate-300 cursor-grab active:cursor-grabbing hover:text-blue-400 transition-colors py-8 border-l border-slate-50">
                                                        <GripVertical className="w-6 h-6" />
                                                    </div>

                                                    <div className="flex-grow p-6">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-none font-bold text-[10px] uppercase">
                                                                        {question.type}
                                                                    </Badge>
                                                                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-none font-bold text-[10px]">
                                                                        {question.points} نقاط
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-lg font-black text-slate-800 leading-snug">
                                                                    {question.text}
                                                                </p>
                                                            </div>

                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleEditQuestion(question)}
                                                                    className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleDeleteQuestion(question._id!)}
                                                                    className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            {question.options?.map((opt, i) => (
                                                                <div key={i} className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-bold ${opt.isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                                                    {opt.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                                    {opt.text}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </Reorder.Item>
                            ))}
                        </AnimatePresence>
                    </Reorder.Group>

                    {editedQuiz.questions.length === 0 && !isAdding && (
                        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
                            <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6">
                                <BrainCircuit className="w-10 h-10 text-blue-200" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800">لا توجد أسئلة بعد</h3>
                            <p className="text-slate-400 font-bold mt-2 text-center max-w-xs leading-relaxed">
                                ابدأ ببناء محتوى الاختبار بإضافة أسئلة متنوعة (اختيار من متعدد، صح/خطأ)
                            </p>
                            <Button onClick={handleAddQuestion} className="mt-8 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl font-black px-8 py-6">
                                <Plus className="w-5 h-5 ml-2" />
                                إضافة أول سؤال
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar: Quiz Settings */}
            <div className="space-y-6">
                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                    <div className="bg-slate-50 p-6 border-b border-white">
                        <h3 className="font-black text-slate-800 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-blue-500" />
                            إعدادات الاختبار
                        </h3>
                    </div>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">عنوان الاختبار</label>
                                <Input
                                    value={editedQuiz.title}
                                    onChange={e => setEditedQuiz({ ...editedQuiz, title: e.target.value })}
                                    className="rounded-xl border-slate-100 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">الوصف</label>
                                <textarea
                                    value={editedQuiz.description}
                                    onChange={e => setEditedQuiz({ ...editedQuiz, description: e.target.value })}
                                    className="w-full min-h-[100px] rounded-xl border-slate-100 font-bold p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="أدخل وصفاً مشوقاً للتلاميذ..."
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-50 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-600 font-bold">
                                    <Clock className="w-4 h-4" />
                                    <span>المدة الزمنية (دقائق)</span>
                                </div>
                                <Input
                                    type="number"
                                    value={editedQuiz.timeLimit || ''}
                                    onChange={e => setEditedQuiz({ ...editedQuiz, timeLimit: parseInt(e.target.value) || null })}
                                    className="w-20 h-10 rounded-lg border-slate-100 text-center font-bold"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-600 font-bold">
                                    <Target className="w-4 h-4" />
                                    <span>علامة النجاح (%)</span>
                                </div>
                                <Input
                                    type="number"
                                    min="1" max="100"
                                    value={editedQuiz.passScore}
                                    onChange={e => setEditedQuiz({ ...editedQuiz, passScore: parseInt(e.target.value) || 70 })}
                                    className="w-20 h-10 rounded-lg border-slate-100 text-center font-bold"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                                    <BarChart2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-400 uppercase">إجمالي النقاط</p>
                                    <p className="text-xl font-black text-blue-700">{editedQuiz.totalPoints} نقطة</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Button variant="outline" className="w-full rounded-2xl py-6 border-slate-100 bg-white hover:bg-slate-50 text-slate-600 font-bold gap-2">
                    <Eye className="w-5 h-5" />
                    معاينة كطالب
                </Button>
            </div>
        </div>
    );
}
