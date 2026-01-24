'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BuildingScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const plasticElements = [
    { id: 'bottle1', icon: '🧴', label: 'زجاجة 1' },
    { id: 'bottle2', icon: '🧴', label: 'زجاجة 2' },
    { id: 'can1', icon: '🧃', label: 'علبة 1' },
    { id: 'can2', icon: '🧃', label: 'علبة 2' },
    { id: 'cap1', icon: '🛍️', label: 'غطاء 1' },
    { id: 'cap2', icon: '🛍️', label: 'غطاء 2' }
];

export default function BuildingScreen({ onNext, onUpdate, data }: BuildingScreenProps) {
    const [placedElements, setPlacedElements] = useState<any[]>(data.placedElements || []);
    const [draggedElement, setDraggedElement] = useState<string | null>(null);
    const [modelComplete, setModelComplete] = useState(false);

    const handleDragStart = (elementId: string) => {
        setDraggedElement(elementId);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (!draggedElement) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const element = plasticElements.find(el => el.id === draggedElement);
        if (element && !placedElements.find(p => p.id === draggedElement)) {
            const newElement = {
                id: draggedElement,
                icon: element.icon,
                label: element.label,
                x: x - 40,
                y: y - 40,
                rotation: Math.random() * 360
            };
            setPlacedElements([...placedElements, newElement]);
            onUpdate({ placedElements: [...placedElements, newElement] });
        }
        setDraggedElement(null);
    };

    const handleRemove = (elementId: string) => {
        setPlacedElements(placedElements.filter(el => el.id !== elementId));
        onUpdate({ placedElements: placedElements.filter(el => el.id !== elementId) });
    };

    const handleRotate = (elementId: string) => {
        setPlacedElements(placedElements.map(el =>
            el.id === elementId ? { ...el, rotation: (el.rotation || 0) + 45 } : el
        ));
    };

    const handleComplete = () => {
        setModelComplete(true);
        setTimeout(() => onNext(), 2000);
    };

    const availableElements = plasticElements.filter(el => !placedElements.find(p => p.id === el.id));

    return (
        <div className="w-full max-w-6xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-purple-800 mb-4 text-center">
                بناء المجسم
            </h2>
            <p className="text-xl text-gray-600 mb-6 text-center">
                اسحب العناصر وضَعها على اللوحة. يمكنك تدويرها أو إزالتها
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Available Elements */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">العناصر المتاحة:</h3>
                    <div className="space-y-3">
                        {availableElements.map(element => (
                            <motion.div
                                key={element.id}
                                draggable
                                onDragStart={() => handleDragStart(element.id)}
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg cursor-move border-2 border-purple-200"
                            >
                                <span className="text-3xl">{element.icon}</span>
                                <span className="font-semibold">{element.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Canvas */}
                <div className="md:col-span-2">
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 min-h-[500px] relative border-4 border-dashed border-purple-300"
                    >
                        {placedElements.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xl">
                                اسحب العناصر هنا لبناء مجسمك
                            </div>
                        )}

                        <AnimatePresence>
                            {placedElements.map(element => (
                                <motion.div
                                    key={element.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1, x: element.x, y: element.y, rotate: element.rotation }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute cursor-move"
                                    style={{ left: `${element.x}px`, top: `${element.y}px` }}
                                >
                                    <div className="relative group">
                                        <div className="text-6xl">{element.icon}</div>
                                        <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleRotate(element.id)}
                                                className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                                title="تدوير"
                                            >
                                                🔄
                                            </button>
                                            <button
                                                onClick={() => handleRemove(element.id)}
                                                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                                title="إزالة"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Positive Feedback */}
                    {placedElements.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-center"
                        >
                            <p className="text-lg font-bold text-purple-700">
                                🌈 إبداعك فريد ومميز!
                            </p>
                        </motion.div>
                    )}

                    {/* Complete Button */}
                    {placedElements.length >= 2 && !modelComplete && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleComplete}
                            className="w-full mt-4 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold text-xl shadow-lg"
                        >
                            ✅ اكتمل المجسم
                        </motion.button>
                    )}

                    {modelComplete && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center mt-4"
                        >
                            <div className="text-6xl mb-2">🎉</div>
                            <p className="text-2xl font-bold text-purple-700">
                                ممتاز! الآن حان وقت التزيين
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
