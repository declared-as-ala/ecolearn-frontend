'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Plus, Trash2, CheckCircle2, XCircle, Type,
    ImageIcon, MessageSquare, AlertCircle, Info, Save, X
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { QuizQuestion } from '@/lib/api';

interface InlineQuestionEditorProps {
    question: Partial<QuizQuestion> | null;
    onSave: (question: Partial<QuizQuestion>) => void;
    onCancel: () => void;
}

export default function InlineQuestionEditor({
    question, onSave, onCancel
}: InlineQuestionEditorProps) {
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
            newOptions.forEach((opt, i) => opt.isCorrect = i === index);
        } else {
            newOptions[index].isCorrect = !newOptions[index].isCorrect;
        }
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = () => {
        if (!formData.text) return;
        onSave(formData);
    };

    return (
        <div className="bg-slate-900 rounded-[32px] p-8 text-white space-y-6 animate-in zoom-in-95 duration-300 font-arabic" dir="rtl">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black flex items-center gap-3">
                    <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
                        {formData._id ? <Type className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
                    </div>
                    {formData._id ? 'تعديل السؤال' : 'سؤال جديد'}
                </h3>
                <Button variant="ghost" onClick={onCancel} className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="font-black text-slate-300">نص السؤال</Label>
                    <textarea
                        placeholder="أدخل نص السؤال هنا..."
                        className="w-full min-h-[80px] bg-white/5 rounded-xl border-white/10 font-bold p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-white/20"
                        value={formData.text}
                        onChange={e => setFormData({ ...formData, text: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="font-black text-slate-300">نوع السؤال</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(v: any) => setFormData({ ...formData, type: v })}
                        >
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl font-bold">
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
                        <Label className="font-black text-slate-300">النقاط</Label>
                        <Input
                            type="number"
                            className="h-12 bg-white/5 border-white/10 rounded-xl font-bold"
                            value={formData.points}
                            onChange={e => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                    <Label className="font-black text-slate-300">خيارات الإجابة</Label>
                    {formData.type !== 'truefalse' && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAddOption}
                            className="rounded-lg h-8 px-3 border-white/10 bg-white/5 text-white font-bold text-xs gap-1 hover:bg-white/10"
                        >
                            <Plus className="w-3 h-3" />
                            إضافة خيار
                        </Button>
                    )}
                </div>

                <div className="space-y-3">
                    {formData.options?.map((option, index) => (
                        <div key={index} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${option.isCorrect ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/10'}`}>
                            <button
                                onClick={() => handleToggleCorrect(index)}
                                className={`shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-colors ${option.isCorrect ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/20'}`}
                            >
                                <CheckCircle2 className="w-5 h-5" />
                            </button>

                            <Input
                                placeholder={`الخيار ${index + 1}`}
                                value={option.text}
                                onChange={e => handleOptionChange(index, e.target.value)}
                                className="border-none shadow-none bg-transparent font-bold h-8 focus-visible:ring-0 px-0 text-white placeholder:text-white/20"
                            />

                            {formData.options!.length > (formData.type === 'truefalse' ? 2 : 2) && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveOption(index)}
                                    className="h-8 w-8 text-white/20 hover:text-red-400"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 flex gap-3">
                <Button
                    variant="ghost"
                    onClick={onCancel}
                    className="flex-1 rounded-2xl font-bold text-white/50 hover:text-white hover:bg-white/10"
                >
                    تراجع
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="flex-[2] bg-white text-slate-900 hover:bg-white/90 rounded-2xl font-black py-6 transition-all"
                >
                    <Save className="w-5 h-5 ml-2" />
                    حفظ السؤال
                </Button>
            </div>
        </div>
    );
}
