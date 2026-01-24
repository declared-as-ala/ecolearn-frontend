'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChecklistItem {
    id: string;
    label: string;
    icon: string;
}

interface InteractiveChecklistProps {
    items: ChecklistItem[];
    onComplete: () => void;
    title: string;
}

export default function InteractiveChecklist({
    items,
    onComplete,
    title
}: InteractiveChecklistProps) {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const handleCheck = (itemId: string) => {
        const newChecked = new Set(checkedItems);
        newChecked.add(itemId);
        setCheckedItems(newChecked);

        // Check if all items are checked
        if (newChecked.size === items.length) {
            setTimeout(() => onComplete(), 500);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6" dir="rtl">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">{title}</h2>

            <div className="grid grid-cols-2 gap-4">
                {items.map(item => (
                    <motion.button
                        key={item.id}
                        onClick={() => !checkedItems.has(item.id) && handleCheck(item.id)}
                        disabled={checkedItems.has(item.id)}
                        whileHover={!checkedItems.has(item.id) ? { scale: 1.05 } : {}}
                        whileTap={!checkedItems.has(item.id) ? { scale: 0.95 } : {}}
                        className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow-lg transition-all ${checkedItems.has(item.id)
                                ? 'bg-green-500 text-white'
                                : 'bg-white hover:bg-green-50 text-gray-700'
                            }`}
                    >
                        <span className="text-4xl">{item.icon}</span>
                        <span className="font-bold text-lg text-center">{item.label}</span>
                        {checkedItems.has(item.id) && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-3xl"
                            >
                                ✅
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
