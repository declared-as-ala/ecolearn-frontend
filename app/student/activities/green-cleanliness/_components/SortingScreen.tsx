'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SortingScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const wasteItems = [
    { id: 'paper1', type: 'paper', label: 'ورقة', icon: '📄' },
    { id: 'paper2', type: 'paper', label: 'كرتون', icon: '📦' },
    { id: 'plastic1', type: 'plastic', label: 'زجاجة', icon: '🧴' },
    { id: 'plastic2', type: 'plastic', label: 'علبة', icon: '🥤' },
    { id: 'organic1', type: 'organic', label: 'قشرة موز', icon: '🍌' },
    { id: 'organic2', type: 'organic', label: 'قشرة تفاح', icon: '🍎' }
];

const bins = [
    { id: 'paper', label: 'ورق', icon: '📄', color: 'bg-blue-500' },
    { id: 'plastic', label: 'بلاستيك', icon: '🧴', color: 'bg-yellow-500' },
    { id: 'organic', label: 'نفايات عضوية', icon: '🍎', color: 'bg-green-500' }
];

export default function SortingScreen({ onNext, onUpdate, data }: SortingScreenProps) {
    const [sortedItems, setSortedItems] = useState<Record<string, string>>(data.sortedItems || {});
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [allSorted, setAllSorted] = useState(false);

    const handleDragStart = (itemId: string) => {
        setDraggedItem(itemId);
    };

    const handleDrop = (binId: string) => {
        if (!draggedItem) return;

        const item = wasteItems.find(i => i.id === draggedItem);
        if (item && item.type === binId) {
            setSortedItems({ ...sortedItems, [draggedItem]: binId });
            onUpdate({ sortedItems: { ...sortedItems, [draggedItem]: binId } });

            // Check if all items are sorted
            const remaining = wasteItems.filter(i => !sortedItems[i.id] && i.id !== draggedItem);
            if (remaining.length === 0) {
                setAllSorted(true);
                setTimeout(() => onNext(), 2000);
            }
        } else {
            // Wrong bin - show gentle feedback
            alert('هذا ليس المكان الصحيح. حاول مرة أخرى!');
        }
        setDraggedItem(null);
    };

    const availableItems = wasteItems.filter(item => !sortedItems[item.id]);

    return (
        <div className="w-full max-w-6xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-4 text-center">
                الفرز الذكي
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
                اسحب النفايات إلى الحاوية الصحيحة
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Available Items */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">النفايات:</h3>
                    <div className="space-y-3">
                        {availableItems.map(item => (
                            <motion.div
                                key={item.id}
                                draggable
                                onDragStart={() => handleDragStart(item.id)}
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move border-2 border-gray-200"
                            >
                                <span className="text-3xl">{item.icon}</span>
                                <span className="font-semibold">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sorting Bins */}
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {bins.map(bin => (
                            <div
                                key={bin.id}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleDrop(bin.id)}
                                className={`${bin.color} rounded-2xl shadow-xl p-6 text-center min-h-[200px] border-4 border-dashed border-white`}
                            >
                                <div className="text-6xl mb-4">{bin.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-4">{bin.label}</h3>
                                <div className="space-y-2">
                                    {wasteItems
                                        .filter(item => sortedItems[item.id] === bin.id)
                                        .map(item => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="bg-white/90 rounded-lg p-2 text-sm font-semibold"
                                            >
                                                {item.icon} {item.label}
                                            </motion.div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Completion Message */}
            {allSorted && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mt-8"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                        }}
                        transition={{ duration: 0.8 }}
                        className="text-8xl mb-4"
                    >
                        🎉
                    </motion.div>
                    <p className="text-3xl font-bold text-green-700">
                        ممتاز! تم الفرز بنجاح
                    </p>
                </motion.div>
            )}
        </div>
    );
}
