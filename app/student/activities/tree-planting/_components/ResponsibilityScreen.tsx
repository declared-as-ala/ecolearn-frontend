'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface ResponsibilityScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

export default function ResponsibilityScreen({ onNext, onUpdate, data }: ResponsibilityScreenProps) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        studentName: data.studentName || user?.profile?.firstName || user?.username || '',
        treeType: data.treeType || '',
        plantingDate: data.plantingDate || new Date().toISOString().split('T')[0],
        school: data.school || ''
    });
    const [showTreeCard, setShowTreeCard] = useState(false);

    const handleChange = (field: string, value: string) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleSubmit = () => {
        if (formData.studentName && formData.treeType && formData.school) {
            setShowTreeCard(true);
            setTimeout(() => onNext(), 3000);
        }
    };

    const canSubmit = formData.studentName && formData.treeType && formData.school;

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                المسؤولية الفردية
            </h2>

            {!showTreeCard ? (
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <div className="space-y-6 mb-6">
                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                🧒 اسم التلميذ
                            </label>
                            <input
                                type="text"
                                value={formData.studentName}
                                onChange={(e) => handleChange('studentName', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none"
                                placeholder="أدخل اسمك"
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                🌳 نوع الشجرة
                            </label>
                            <input
                                type="text"
                                value={formData.treeType}
                                onChange={(e) => handleChange('treeType', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none"
                                placeholder="مثال: زيتون، نخيل، صنوبر..."
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                📅 تاريخ الغرس
                            </label>
                            <input
                                type="date"
                                value={formData.plantingDate}
                                onChange={(e) => handleChange('plantingDate', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                🏫 المؤسسة
                            </label>
                            <input
                                type="text"
                                value={formData.school}
                                onChange={(e) => handleChange('school', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none"
                                placeholder="اسم المدرسة"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-all ${
                            canSubmit
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        حفظ المعلومات
                    </motion.button>
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-2xl p-8 text-center"
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
                        className="text-9xl mb-6"
                    >
                        🌳
                    </motion.div>
                    <div className="bg-white rounded-2xl p-6 mb-4">
                        <h3 className="text-2xl font-bold text-green-800 mb-4">
                            بطاقة الشجرة
                        </h3>
                        <div className="space-y-2 text-lg text-gray-700">
                            <p><strong>الاسم:</strong> {formData.studentName}</p>
                            <p><strong>نوع الشجرة:</strong> {formData.treeType}</p>
                            <p><strong>التاريخ:</strong> {new Date(formData.plantingDate).toLocaleDateString('ar-SA')}</p>
                            <p><strong>المؤسسة:</strong> {formData.school}</p>
                        </div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-bold text-green-700"
                    >
                        "هذه الشجرة مسؤوليتي… أحميها لتكبر."
                    </motion.p>
                </motion.div>
            )}
        </div>
    );
}
