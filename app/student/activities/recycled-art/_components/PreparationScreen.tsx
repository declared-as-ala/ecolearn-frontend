'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveChecklist from '../../tree-planting/_components/InteractiveChecklist';

interface PreparationScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const materials = [
    { id: 'bottles', label: 'زجاجات بلاستيكية', icon: '🧴' },
    { id: 'cans', label: 'علب', icon: '🧃' },
    { id: 'caps', label: 'أغطية', icon: '🛍️' }
];

const tools = [
    { id: 'scissors', label: 'مقص آمن', icon: '✂️' },
    { id: 'colors', label: 'ألوان', icon: '🎨' },
    { id: 'glue', label: 'غراء', icon: '🧴' },
    { id: 'brush', label: 'فرش', icon: '🖌️' }
];

export default function PreparationScreen({ onNext, onUpdate, data }: PreparationScreenProps) {
    const [materialsReceived, setMaterialsReceived] = useState<string[]>(data.materialsReceived || []);
    const [toolsChecked, setToolsChecked] = useState(false);

    const handleMaterialClick = (materialId: string) => {
        const updated = materialsReceived.includes(materialId)
            ? materialsReceived.filter(id => id !== materialId)
            : [...materialsReceived, materialId];
        setMaterialsReceived(updated);
        onUpdate({ materialsReceived: updated });
    };

    const handleToolsComplete = () => {
        setToolsChecked(true);
        onUpdate({ toolsChecked: true });
    };

    const canProceed = materialsReceived.length === materials.length && toolsChecked;

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-purple-800 mb-8 text-center">
                التحضير الفردي
            </h2>

            {/* Materials Selection */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                    المواد التي حصلت عليها:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {materials.map(material => {
                        const isSelected = materialsReceived.includes(material.id);
                        return (
                            <motion.button
                                key={material.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMaterialClick(material.id)}
                                className={`p-6 rounded-xl shadow-lg transition-all border-4 ${
                                    isSelected
                                        ? 'bg-purple-500 text-white border-purple-700'
                                        : 'bg-white hover:bg-purple-50 border-gray-200'
                                }`}
                            >
                                <div className="text-5xl mb-3">{material.icon}</div>
                                <div className="font-bold text-lg">{material.label}</div>
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl mt-2"
                                    >
                                        ✅
                                    </motion.div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Tools Checklist */}
            {materialsReceived.length === materials.length && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <InteractiveChecklist
                        items={tools}
                        onComplete={handleToolsComplete}
                        title="تأكد من وجود جميع الأدوات:"
                    />
                </motion.div>
            )}

            {/* Success Animation */}
            {canProceed && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mt-8"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                        }}
                        transition={{ duration: 0.6 }}
                        className="text-6xl mb-4"
                    >
                        ✔️
                    </motion.div>
                    <p className="text-2xl font-bold text-purple-700 mb-4">
                        ممتاز! جاهزون للبدء
                    </p>
                </motion.div>
            )}
        </div>
    );
}
