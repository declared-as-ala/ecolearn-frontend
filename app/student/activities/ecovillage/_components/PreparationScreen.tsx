'use client';

import React from 'react';
import InteractiveChecklist from '../../tree-planting/_components/InteractiveChecklist';
import { motion } from 'framer-motion';

interface PreparationScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const materials = [
    { id: 'recycled', label: 'مواد معاد تدويرها', icon: '♻️', subItems: ['كرتون', 'قوارير', 'أغطية'] },
    { id: 'scissors', label: 'مقص آمن', icon: '✂️' },
    { id: 'glue', label: 'لاصق', icon: '🧴' },
    { id: 'colors', label: 'ألوان وفرش', icon: '🎨' }
];

export default function PreparationScreen({ onNext, onUpdate, data }: PreparationScreenProps) {
    const [showSafetyRules, setShowSafetyRules] = React.useState(false);

    const handleComplete = () => {
        setShowSafetyRules(true);
        onUpdate({ materialsChecked: true });
    };

    const handleContinue = () => {
        onNext();
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            {!showSafetyRules ? (
                <>
                    <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                        مرحلة التحضير
                    </h2>
                    <InteractiveChecklist
                        items={materials}
                        onComplete={handleComplete}
                        title="تأكد من وجود جميع المواد والأدوات:"
                    />
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                        className="text-8xl mb-6"
                    >
                        ⚠️
                    </motion.div>
                    <h3 className="text-3xl font-bold text-orange-700 mb-6">
                        تذكير السلامة
                    </h3>
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-right">
                        <ul className="space-y-4 text-xl text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">✅</span>
                                <span>استخدم المقص بحذر</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">✅</span>
                                <span>لا تلمس المواد الحادة</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">✅</span>
                                <span>اغسل يديك بعد العمل</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">✅</span>
                                <span>اطلب المساعدة عند الحاجة</span>
                            </li>
                        </ul>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleContinue}
                        className="px-10 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-full font-bold text-xl shadow-lg transition-all"
                    >
                        ➡️ متابعة
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
