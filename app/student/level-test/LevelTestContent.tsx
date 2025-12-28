'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';
import EcoLoading from '@/components/ui/EcoLoading';
import { levelTestAPI, LevelTestStatus } from '@/lib/api';
import { CheckCircle, ShieldAlert, Trophy } from 'lucide-react';

type LevelKey = '5eme' | '6eme';

interface Question {
    id: string;
    text: string;
    options: { id: string; text: string }[];
    correct: string;
}

interface AnswerRecord {
    questionId: string;
    choice: string;
    correct: boolean;
}

const questions5: Question[] = [
    { id: 'q1', text: 'لماذا يُعد البلاستيك و"الميكروبلاستيك" خطراً كوكبياً على الصحة والغذاء؟', options: [{ id: 'A', text: 'لأن البلاستيك يتحول لميكروبلاستيك يدخل السلسلة الغذائية ويصل للإنسان' }, { id: 'B', text: 'لأنه ثقيل ويغرق في البحر فقط' }, { id: 'C', text: 'لأنه يذوب في المطر ولا يبقى في البيئة' }], correct: 'A' },
    { id: 'q2', text: 'ما القرار الأخلاقي الصحيح بين قطع الغابات والتنمية الاقتصادية السريعة؟', options: [{ id: 'A', text: 'حماية الغابات لأنها رئة كوكب وتخزن الكربون وتحمي المناخ' }, { id: 'B', text: 'قطع الغابات لبناء مصانع أكثر مهما كان الثمن' }, { id: 'C', text: 'ترك الأمر للسوق دون قوانين بيئية' }], correct: 'A' },
    { id: 'q3', text: 'لماذا يؤدي اختفاء النحل إلى أزمة غذاء عالمية؟', options: [{ id: 'A', text: 'لأن النحل يلقح أغلب المحاصيل، واختفاؤه يهدد الأمن الغذائي' }, { id: 'B', text: 'لأن النحل يستهلك العسل فقط' }, { id: 'C', text: 'لأنه يسبب الضجيج في المدن' }], correct: 'A' },
    { id: 'q4', text: 'ما المشكلة الكوكبية في نفايات الإلكترونيات؟', options: [{ id: 'A', text: 'تحتوي معادن سامة تلوث الهواء والماء وتضر المجتمعات الفقيرة' }, { id: 'B', text: 'آمنة ويمكن رميها في أي مكان' }, { id: 'C', text: 'تختفي تلقائياً بعد شهرين' }], correct: 'A' },
    { id: 'q5', text: 'لماذا تنظيف الشواطئ وحده لا يكفي لحل تلوث البلاستيك؟', options: [{ id: 'A', text: 'لأن الحل في تقليل الإنتاج والمنع عند المصدر وليس جمع النفايات فقط' }, { id: 'B', text: 'لأنه يفسد المنظر فقط' }, { id: 'C', text: 'لأن البحر ينظف نفسه دائماً' }], correct: 'A' },
    { id: 'q6', text: 'كيف يؤثر ارتفاع مستوى البحر على البشر؟', options: [{ id: 'A', text: 'يؤدي لغرق مدن وهجرة مناخية وفقدان منازل' }, { id: 'B', text: 'لا تأثير لأنه بطيء جداً' }, { id: 'C', text: 'يجعل الشواطئ أوسع للسباحة' }], correct: 'A' },
    { id: 'q7', text: 'لماذا يُعد الماء أزمة عالمية وليست محلية فقط؟', options: [{ id: 'A', text: 'لأن الماء حق إنساني، ونقصه يسبب نزاعات وهجرة ومرض' }, { id: 'B', text: 'لأن المياه المالحة تكفي للشرب' }, { id: 'C', text: 'لأن المطر دائم في كل مكان' }], correct: 'A' },
    { id: 'q8', text: 'ما دور المحميات الطبيعية مثل بوهدمة في حماية المناخ؟', options: [{ id: 'A', text: 'تخزن الكربون وتحمي التنوع البيولوجي وتمنع الانقراض' }, { id: 'B', text: 'تمنع دخول الأطفال فقط' }, { id: 'C', text: 'تزيد الصيد الجائر' }], correct: 'A' },
    { id: 'q9', text: 'أي خيار عائلي يقلل الانبعاثات اليومية؟', options: [{ id: 'A', text: 'تقاسم السيارة أو استخدام النقل العام بدل شراء سيارة ثانية' }, { id: 'B', text: 'تشغيل المحرك أثناء الانتظار' }, { id: 'C', text: 'القيادة بسرعة لنوفر الوقت' }], correct: 'A' },
    { id: 'q10', text: 'ما معنى مبدأ "المسؤولية المشتركة لكن المتباينة" في المناخ؟', options: [{ id: 'A', text: 'الدول الملوِّثة أكثر تتحمل نصيباً أكبر من الحلول والتمويل' }, { id: 'B', text: 'كل الدول متساوية مهما كانت انبعاثاتها' }, { id: 'C', text: 'الدول الفقيرة وحدها تتحمل المسؤولية' }], correct: 'A' },
];

const questions6: Question[] = [
    { id: 'q1', text: 'كيف تحمي الغابات المناخ؟', options: [{ id: 'A', text: 'تمتص الكربون وتخفض حرارة الكوكب' }, { id: 'B', text: 'تنتج النفط' }, { id: 'C', text: 'لا علاقة لها بالمناخ' }], correct: 'A' },
    { id: 'q2', text: 'لماذا التسرّب النفطي كارثي؟', options: [{ id: 'A', text: 'يسمّم الماء والكائنات ويقتل السواحل' }, { id: 'B', text: 'يختفي فوراً بالشمس' }, { id: 'C', text: 'يزيد الأسماك' }], correct: 'A' },
    { id: 'q3', text: 'ما أثر الاستهلاك المفرط على الماء؟', options: [{ id: 'A', text: 'يستنزف المياه العذبة ويزيد الندرة' }, { id: 'B', text: 'لا يؤثر لأنها موارد لا تنتهي' }, { id: 'C', text: 'يجعل الماء أرخص' }], correct: 'A' },
    { id: 'q4', text: 'لماذا العوالق النباتية (فيتوبلانكتون) مهمة للأكسجين؟', options: [{ id: 'A', text: 'تنتج جزءاً كبيراً من أكسجين الكوكب' }, { id: 'B', text: 'تقلل الأكسجين' }, { id: 'C', text: 'لا تنتج شيئاً' }], correct: 'A' },
    { id: 'q5', text: 'ما جوهر العدالة المناخية؟', options: [{ id: 'A', text: 'من يلوث أكثر يدفع أكثر ويحمي الفئات الهشة' }, { id: 'B', text: 'الكل يدفع بالتساوي مهما كان' }, { id: 'C', text: 'لا يوجد مفهوم كهذا' }], correct: 'A' },
    { id: 'q6', text: 'لماذا الزراعة الصناعية مشكلة مناخية؟', options: [{ id: 'A', text: 'تستهلك ماء وطاقة وتطلق ميثان وتفقر التربة' }, { id: 'B', text: 'دائماً صديقة للمناخ' }, { id: 'C', text: 'لا علاقة لها بالانبعاثات' }], correct: 'A' },
    { id: 'q7', text: 'كيف يظهر تغيّر المناخ في تونس؟', options: [{ id: 'A', text: 'موجات حر وجفاف وحرائق وفيضانات مفاجئة' }, { id: 'B', text: 'برد دائم' }, { id: 'C', text: 'لا تغيّر' }], correct: 'A' },
    { id: 'q8', text: 'ما فائدة الاقتصاد الدائري؟', options: [{ id: 'A', text: 'تقليل الهدر وإعادة الاستخدام وكسب وظائف خضراء' }, { id: 'B', text: 'حرق النفايات بسرعة' }, { id: 'C', text: 'زيادة الإنتاج دون حدود' }], correct: 'A' },
    { id: 'q9', text: 'ما حقيقة البلاستيك الحيوي (Bioplastic)؟', options: [{ id: 'A', text: 'ليس حلاً كاملاً؛ قد يلوث إذا لم يُدار بشكل صحيح' }, { id: 'B', text: 'يختفي فورياً في البحر' }, { id: 'C', text: 'آمن تماماً بلا إدارة' }], correct: 'A' },
    { id: 'q10', text: 'كيف يرتبط فقدان التنوع البيولوجي بالأوبئة؟', options: [{ id: 'A', text: 'يقرّب الحيوانات من البشر ويزيد احتمالات انتقال الفيروسات' }, { id: 'B', text: 'يمنع كل الفيروسات' }, { id: 'C', text: 'لا علاقة' }], correct: 'A' },
    { id: 'q11', text: 'ما الخطر في نفايات الإلكترونيات على الأطفال؟', options: [{ id: 'A', text: 'التعرض للرصاص والسموم يضر الدماغ والتنفس' }, { id: 'B', text: 'آمنة كلعب' }, { id: 'C', text: 'تزيد الذكاء' }], correct: 'A' },
    { id: 'q12', text: 'ما مسؤوليتك الفردية تجاه الكوكب؟', options: [{ id: 'A', text: 'تقليل الاستهلاك، فرز النفايات، اختيار نقل نظيف' }, { id: 'B', text: 'رمي النفايات في أي مكان' }, { id: 'C', text: 'لا مسؤولية لي' }], correct: 'A' },
];

const computeCategory5 = (score: number) => score >= 8 ? '🌍 خبير بيئي كوكبي' : score >= 5 ? '🌱 محلل بيئي' : '🐾 مبتدئ ناقد';
const computeCategory6 = (score: number) => score >= 10 ? '🌍🌎 خبير بيئي عالمي' : score >= 6 ? '🔍 محلل بيئي ناقد' : '🌱 مبتدئ واعٍ';

export default function LevelTestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading, updateUser } = useAuth();

    const levelParam = searchParams.get('level');
    const normalizedLevel: LevelKey | null = levelParam === '5' || levelParam === '5eme' || levelParam === '5ème' ? '5eme' : levelParam === '6' || levelParam === '6eme' || levelParam === '6ème' ? '6eme' : null;

    const [statusLoading, setStatusLoading] = useState(true);
    const [testCompleted, setTestCompleted] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<AnswerRecord[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<LevelTestStatus | null>(null);

    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIdx];
    const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

    useEffect(() => {
        if (loading) return;
        if (!user) { router.push('/login'); return; }
        if (user.role !== 'student') { router.push(`/${user.role}/dashboard`); return; }
        const level = normalizedLevel || (user.gradeLevel === 5 ? '5eme' : user.gradeLevel === 6 ? '6eme' : null);
        if (!level) { router.push('/student/select-level'); return; }
        setQuestions(level === '5eme' ? questions5 : questions6);
        const checkStatus = async () => {
            try {
                const status = await levelTestAPI.getStatus(level);
                if (status.completed) { setTestCompleted(true); setResult(status); }
            } catch (e: any) { console.error('Failed to load level-test status', e); }
            finally { setStatusLoading(false); }
        };
        checkStatus();
    }, [loading, user, router, normalizedLevel]);

    const handleSelect = (optionId: string) => {
        if (!currentQuestion || currentAnswer) return;
        const isCorrect = optionId === currentQuestion.correct;
        setAnswers(prev => [...prev, { questionId: currentQuestion.id, choice: optionId, correct: isCorrect }]);
    };

    const handleNext = () => { if (currentIdx < totalQuestions - 1) setCurrentIdx(currentIdx + 1); };

    const handleSubmit = async () => {
        if (answers.length !== totalQuestions || !normalizedLevel) return;
        setSubmitting(true); setError(null);
        const score = answers.filter(a => a.correct).length;
        const category = normalizedLevel === '5eme' ? computeCategory5(score) : computeCategory6(score);
        try {
            const result = await levelTestAPI.submit({ level: normalizedLevel, answers, score, category });
            setTestCompleted(true); setResult(result);
            if (updateUser) {
                updateUser({ levelTests: { '5eme': result.level === '5eme' ? result : user?.levelTests?.['5eme'], '6eme': result.level === '6eme' ? result : user?.levelTests?.['6eme'] } as Record<'5eme' | '6eme', LevelTestStatus> });
            }
        } catch (e: any) { console.error(e); setError(e.message || 'فشل حفظ النتيجة. حاول مجدداً.'); }
        finally { setSubmitting(false); }
    };

    const progressPercent = totalQuestions > 0 ? Math.round(((currentIdx) / totalQuestions) * 100) : 0;

    if (loading || statusLoading || !normalizedLevel || !user) return <EcoLoading message="تحميل الاختبار التشخيصي..." />;

    if (testCompleted && result) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-sky-50 flex items-center justify-center p-4" dir="rtl">
                <Card className="w-full max-w-3xl border-4 border-green-200 shadow-2xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-100 to-amber-100 border-b-2 border-green-200">
                        <div className="flex items-center gap-3">
                            <FriendlyAnimal type="owl" emotion="proud" size="medium" />
                            <div>
                                <CardTitle className="text-2xl text-gray-800">✅ تم إنهاء الاختبار التشخيصي</CardTitle>
                                <p className="text-sm text-gray-600 font-semibold">يمكنك الآن متابعة الدروس والألعاب.</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center justify-between">
                            <div><p className="text-sm text-gray-600">المستوى</p><p className="text-lg font-bold text-gray-800">{result.level === '5eme' ? 'السنة الخامسة' : 'السنة السادسة'}</p></div>
                            <div><p className="text-sm text-gray-600">النتيجة</p><p className="text-2xl font-extrabold text-green-700">{result.score}/{result.level === '5eme' ? 10 : 12}</p></div>
                            <div><p className="text-sm text-gray-600">التصنيف</p><p className="text-xl font-bold text-amber-700">{result.category}</p></div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600"><Trophy className="w-5 h-5 text-amber-500" /><span>يمكنك تغيير المستوى لاحقاً من الإعدادات لإعادة الاختبار لمستوى آخر.</span></div>
                        <div className="flex justify-end"><Button className="rounded-2xl px-6 py-3 font-bold bg-green-600 hover:bg-green-700 text-white" onClick={() => router.replace('/student/courses')}>الانتقال إلى الدروس</Button></div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-sky-50 flex items-center justify-center p-4" dir="rtl">
            <Card className="w-full max-w-4xl border-4 border-green-200 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-100 to-amber-100 border-b-2 border-green-200">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                            <FriendlyAnimal type="owl" emotion="proud" size="medium" />
                            <div>
                                <CardTitle className="text-2xl text-gray-800">🧠🎓 اختبار تشخيصي إلزامي - {normalizedLevel === '5eme' ? 'السنة الخامسة' : 'السنة السادسة'}</CardTitle>
                                <p className="text-sm text-gray-600 font-semibold">لا يمكن الدخول للدروس قبل إنهائه</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-red-600"><ShieldAlert className="w-5 h-5" /><span>لا رجوع بعد الاختيار، ولا يمكن تخطي الاختبار</span></div>
                    </div>
                    <div className="mt-3"><Progress value={progressPercent} className="h-2" /><div className="text-xs text-gray-700 mt-1">السؤال {currentIdx + 1} / {totalQuestions}</div></div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {currentQuestion && (
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-extrabold text-lg shadow">{currentIdx + 1}</div>
                                <p className="text-xl font-bold text-gray-800 leading-relaxed">{currentQuestion.text}</p>
                            </div>
                            <div className="grid gap-3">
                                {currentQuestion.options.map((opt) => {
                                    const isSelected = currentAnswer?.choice === opt.id;
                                    const isCorrect = currentQuestion.correct === opt.id;
                                    return (
                                        <button key={opt.id} onClick={() => handleSelect(opt.id)} disabled={!!currentAnswer} className={`w-full text-right border-2 rounded-2xl px-4 py-4 font-bold transition-all ${isSelected ? isCorrect ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'} ${!!currentAnswer ? 'cursor-not-allowed' : ''}`}>
                                            <span className="mr-2 text-gray-600">({opt.id})</span>{opt.text}
                                        </button>
                                    );
                                })}
                            </div>
                            {currentAnswer && (<div className={`flex items-center gap-2 text-sm font-bold ${currentAnswer.correct ? 'text-green-700' : 'text-red-700'}`}>{currentAnswer.correct ? <CheckCircle className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}{currentAnswer.correct ? 'إجابة صحيحة!' : 'إجابة غير صحيحة. المتابعة للسؤال التالي.'}</div>)}
                        </div>
                    )}
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-xs text-gray-500">لا يوجد زر رجوع بعد الإجابة.</div>
                        {currentIdx < totalQuestions - 1 ? (<Button onClick={handleNext} disabled={!currentAnswer} className="rounded-2xl px-6 py-3 font-bold">التالي →</Button>) : (<Button onClick={handleSubmit} disabled={answers.length !== totalQuestions || submitting} className="rounded-2xl px-6 py-3 font-bold bg-green-600 hover:bg-green-700 text-white">{submitting ? 'جاري الحفظ...' : 'إنهاء الاختبار وحفظ النتيجة'}</Button>)}
                    </div>
                    {error && (<div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-700 font-bold">{error}</div>)}
                    <div className="flex items-center gap-3 text-sm text-gray-600"><Trophy className="w-5 h-5 text-amber-500" /><span>التصنيف يُحسب تلقائياً حسب مجموع الإجابات الصحيحة.</span></div>
                </CardContent>
            </Card>
        </div>
    );
}
