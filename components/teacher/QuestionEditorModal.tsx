'use client';

import { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Plus, Trash2, CheckCircle2, XCircle, Type,
    ImageIcon, MessageSquare, AlertCircle, Info
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { QuizQuestion } from '@/lib/api';

interface QuestionEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (question: Partial<QuizQuestion>) => void;
    question: Partial<QuizQuestion> | null;
}

export default function QuestionEditorModal({
    isOpen, onClose, onSave, question
}: QuestionEditorModalProps) {
    const [formData, setFormData] = useState<Partial<QuizQuestion>>({
        text: '',
        type: 'mcq',
        options: [{ text: '', isCorrect: true }, { text: '', isCorrect: false }],
        points: 5,
        explanation: ''
    });

    useEffect(() => {
        if (question) {
            setFormData(question);
        }
    }, [question]);

    const handleAddOption = () => {
        setFormData({
            ...formData,
            options: [...(formData.options || []), { text: '', isCorrect: false }]
        });
    };

    const handleRemoveOption = (index: number) => {
        setFormData({
            ...formData,
            options: formData.options?.filter((_, i) => i !== index)
        });
    };

    const handleOptionChange = (index: number, text: string) => {
        const newOptions = [...(formData.options || [])];
        newOptions[index].text = text;
        setFormData({ ...formData, options: newOptions });
    };

    const handleToggleCorrect = (index: number) => {
        const newOptions = [...(formData.options || [])];
        if (formData.type === 'mcq' || formData.type === 'truefalse') {
            // Single correct answer
            newOptions.forEach((opt, i) => opt.isCorrect = i === index);
        } else {
            // Multiple correct answers
            newOptions[index].isCorrect = !newOptions[index].isCorrect;
        }
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = () => {
        if (!formData.text) return;
        onSave(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[32px] border-none font-arabic" dir="rtl">
                <div className="bg-slate-900 p-8 text-white relative">
                    <DialogTitle className="text-2xl font-black mb-2 flex items-center gap-3">
                        <Edit2 className="w-8 h-8 p-1.5 bg-white/10 rounded-xl" />
                        {question?._id ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 font-bold">
                        صمم سؤالاً تفاعلياً وقم بتحديد الإجابات الصحيحة والنقاط
                    </DialogDescription>
                </div>

                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="font-black text-slate-700">نص السؤال</Label>
                            <textarea
                                placeholder="أدخل نص السؤال هنا..."
                                className="w-full min-h-[80px] rounded-xl border-slate-100 font-bold p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.text}
                                onChange={e => setFormData({ ...formData, text: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="font-black text-slate-700">نوع السؤال</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(v: any) => setFormData({ ...formData, type: v })}
                                >
                                    <SelectTrigger className="h-12 rounded-xl border-slate-100 font-bold">
                                        <SelectValue placeholder="اختر النوع" />
                                    </SelectTrigger>
                                    <SelectContent className="font-arabic font-bold">
                                        <SelectItem value="mcq">اختيار من متعدد</SelectItem>
                                        <SelectItem value="truefalse">صح أو خطأ</SelectItem>
                                        <SelectItem value="multiple">إجابات متعددة</SelectItem>
                                        <SelectItem value="scenario">سؤال قصصي</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="font-black text-slate-700">النقاط</Label>
                                <Input
                                    type="number"
                                    className="h-12 rounded-xl border-slate-100 font-bold"
                                    value={formData.points}
                                    onChange={e => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <Label className="font-black text-slate-700 flex items-center gap-2">
                                خيارات الإجابة
                                <Info className="w-4 h-4 text-slate-300" />
                            </Label>
                            {formData.type !== 'truefalse' && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddOption}
                                    className="rounded-lg h-8 px-3 border-blue-100 text-blue-600 font-bold text-xs gap-1"
                                >
                                    <Plus className="w-3 h-3" />
                                    إضافة خيار
                                </Button>
                            )}
                        </div>

                        <div className="space-y-3">
                            {formData.options?.map((option, index) => (
                                <div key={index} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${option.isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100'}`}>
                                    <button
                                        onClick={() => handleToggleCorrect(index)}
                                        className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-colors ${option.isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'}`}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                    </button>

                                    <Input
                                        placeholder={`الخيار ${index + 1}`}
                                        value={option.text}
                                        onChange={e => handleOptionChange(index, e.target.value)}
                                        className="border-none shadow-none bg-transparent font-bold h-8 focus-visible:ring-0 px-0"
                                    />

                                    {formData.options!.length > 2 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveOption(index)}
                                            className="h-8 w-8 text-slate-300 hover:text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-50">
                        <Label className="font-black text-slate-700">شرح الإجابة (يظهر بعد الحل)</Label>
                        <textarea
                            placeholder="شرح مبسط يساعد التلميذ على فهم المعلومة..."
                            className="w-full min-h-[60px] rounded-xl border-slate-100 font-bold p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.explanation}
                            onChange={e => setFormData({ ...formData, explanation: e.target.value })}
                        />
                    </div>
                </div>

                <DialogFooter className="p-8 pt-0 flex gap-3">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="rounded-xl font-bold flex-1"
                    >
                        إلغاء
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black py-6 flex-2 transition-all"
                    >
                        حفظ السؤال
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

import { Edit2 } from 'lucide-react';
