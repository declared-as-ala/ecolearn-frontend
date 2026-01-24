'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface IdentityCardScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

export default function IdentityCardScreen({ onNext, onUpdate, data }: IdentityCardScreenProps) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        studentName: data.studentName || user?.profile?.firstName || user?.username || '',
        classSection: data.classSection || '',
        toolsUsed: data.toolsUsed || [],
        modelIdea: data.modelIdea || '',
        activityDate: data.activityDate || new Date().toISOString().split('T')[0]
    });
    const [showCard, setShowCard] = useState(false);

    const tools = ['✂️ مقص', '🎨 ألوان', '🧴 غراء', '🖌️ فرش'];

    const handleChange = (field: string, value: any) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleToolToggle = (tool: string) => {
        const updated = formData.toolsUsed.includes(tool)
            ? formData.toolsUsed.filter((t: string) => t !== tool)
            : [...formData.toolsUsed, tool];
        handleChange('toolsUsed', updated);
    };

    const handleSubmit = () => {
        if (formData.studentName && formData.classSection && formData.modelIdea) {
            setShowCard(true);
            setTimeout(() => onNext(), 3000);
        }
    };

    const canSubmit = formData.studentName && formData.classSection && formData.modelIdea;

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-purple-800 mb-8 text-center">
                بطاقة تعريف المجسم الإبداعي
            </h2>

            {!showCard ? (
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <div className="space-y-6 mb-6">
                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                🌱 اسم التلميذ
                            </label>
                            <input
                                type="text"
                                value={formData.studentName}
                                onChange={(e) => handleChange('studentName', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none"
                                placeholder="أدخل اسمك"
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                🏫 القسم
                            </label>
                            <input
                                type="text"
                                value={formData.classSection}
                                onChange={(e) => handleChange('classSection', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none"
                                placeholder="مثال: الصف الخامس - القسم أ"
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                ✂️ الأدوات المستعملة
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {tools.map(tool => (
                                    <motion.button
                                        key={tool}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleToolToggle(tool)}
                                        className={`p-3 rounded-xl border-2 transition-all ${
                                            formData.toolsUsed.includes(tool)
                                                ? 'bg-purple-500 text-white border-purple-700'
                                                : 'bg-gray-50 border-gray-300 hover:bg-purple-50'
                                        }`}
                                    >
                                        {tool}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                🎨 فكرة المجسم
                            </label>
                            <textarea
                                value={formData.modelIdea}
                                onChange={(e) => handleChange('modelIdea', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none min-h-[100px]"
                                placeholder="صِف فكرة مجسمك الإبداعي..."
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-bold text-gray-700 mb-2">
                                📅 تاريخ النشاط
                            </label>
                            <input
                                type="date"
                                value={formData.activityDate}
                                onChange={(e) => handleChange('activityDate', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none"
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
                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
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
                    className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-2xl p-8 text-center"
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
                        🎨
                    </motion.div>
                    <div className="bg-white rounded-2xl p-6 mb-4">
                        <h3 className="text-2xl font-bold text-purple-800 mb-4">
                            بطاقة تعريف المجسم الإبداعي
                        </h3>
                        <div className="space-y-2 text-lg text-gray-700 text-right">
                            <p><strong>الاسم:</strong> {formData.studentName}</p>
                            <p><strong>القسم:</strong> {formData.classSection}</p>
                            <p><strong>الأدوات:</strong> {formData.toolsUsed.join('، ')}</p>
                            <p><strong>الفكرة:</strong> {formData.modelIdea}</p>
                            <p><strong>التاريخ:</strong> {new Date(formData.activityDate).toLocaleDateString('ar-SA')}</p>
                        </div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-bold text-purple-700"
                    >
                        "هذا المجسم الإبداعي هو عالمي… أحمي البيئة وأبدع فيها."
                    </motion.p>
                </motion.div>
            )}
        </div>
    );
}
