'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, Loader2, CheckCircle2 } from 'lucide-react';

interface LinkStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLink: (identifier: string) => Promise<void>;
}

export default function LinkStudentModal({ isOpen, onClose, onLink }: LinkStudentModalProps) {
    const [identifier, setIdentifier] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier.trim()) return;

        setLoading(true);
        setError(null);
        try {
            await onLink(identifier);
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setIdentifier('');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'فشل ربط التلميذ. يرجى التحقق من الاسم أو المعرف.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] font-arabic" dir="rtl">
                <DialogHeader className="text-right">
                    <DialogTitle className="text-2xl font-black text-slate-900">ربط تلميذ جديد</DialogTitle>
                    <DialogDescription className="text-slate-500 font-bold mt-2">
                        أدخل اسم المستخدم أو المعرف الخاص بابنك لربط حسابه بلوحة التحكم الخاصة بك.
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">تم الربط بنجاح!</h3>
                        <p className="text-slate-500 font-bold">يتم الآن تحديث قائمة أبنائك...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 block pr-1">اسم المستخدم أو المعرف</label>
                            <div className="relative">
                                <Input
                                    placeholder="مثال: ahmed_2024"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="h-14 bg-slate-50 border-slate-200 rounded-2xl pr-12 focus:ring-blue-600 focus:border-blue-600 font-bold text-lg"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                            {error && <p className="text-red-500 text-xs font-bold mt-2 pr-1">{error}</p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !identifier.trim()}
                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5" />
                                    جاري المعالجة...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    تأكيد الربط
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
