'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DraggableItem {
    id: string;
    label: string;
    icon: string;
}

interface DropZone {
    id: string;
    label: string;
    acceptedItem: string | null;
}

interface DragDropGameProps {
    items: DraggableItem[];
    dropZones: DropZone[];
    onComplete: (assignments: Record<string, string>) => void;
    title: string;
    instruction: string;
}

export default function DragDropGame({
    items,
    dropZones: initialDropZones,
    onComplete,
    title,
    instruction
}: DragDropGameProps) {
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dropZones, setDropZones] = useState(initialDropZones);
    const [usedItems, setUsedItems] = useState<Set<string>>(new Set());

    const handleDragStart = (itemId: string) => {
        setDraggedItem(itemId);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleDrop = (zoneId: string) => {
        if (!draggedItem) return;

        const updatedZones = dropZones.map(zone =>
            zone.id === zoneId ? { ...zone, acceptedItem: draggedItem } : zone
        );

        setDropZones(updatedZones);
        setUsedItems(prev => new Set(prev).add(draggedItem));
        setDraggedItem(null);

        // Check if all zones are filled
        if (updatedZones.every(zone => zone.acceptedItem !== null)) {
            const assignments: Record<string, string> = {};
            updatedZones.forEach(zone => {
                if (zone.acceptedItem) {
                    assignments[zone.id] = zone.acceptedItem;
                }
            });
            setTimeout(() => onComplete(assignments), 500);
        }
    };

    const handleRemoveFromZone = (zoneId: string) => {
        const zone = dropZones.find(z => z.id === zoneId);
        if (zone?.acceptedItem) {
            setUsedItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(zone.acceptedItem!);
                return newSet;
            });
            setDropZones(zones =>
                zones.map(z => (z.id === zoneId ? { ...z, acceptedItem: null } : z))
            );
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6" dir="rtl">
            <h2 className="text-3xl font-bold text-green-800 mb-2 text-center">{title}</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">{instruction}</p>

            {/* Draggable Items */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        draggable={!usedItems.has(item.id)}
                        onDragStart={() => handleDragStart(item.id)}
                        onDragEnd={handleDragEnd}
                        whileHover={!usedItems.has(item.id) ? { scale: 1.05 } : {}}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg cursor-move shadow-md ${usedItems.has(item.id)
                                ? 'bg-gray-200 opacity-50 cursor-not-allowed'
                                : 'bg-white hover:shadow-lg'
                            }`}
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-semibold text-gray-700">{item.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Drop Zones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dropZones.map(zone => (
                    <div
                        key={zone.id}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDrop(zone.id)}
                        className={`relative min-h-[100px] border-4 border-dashed rounded-xl p-4 transition-all ${zone.acceptedItem
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-300 bg-gray-50 hover:border-green-300'
                            }`}
                    >
                        <div className="font-bold text-gray-700 mb-2">{zone.label}</div>
                        {zone.acceptedItem ? (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center justify-between bg-green-100 px-3 py-2 rounded-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">
                                        {items.find(i => i.id === zone.acceptedItem)?.icon}
                                    </span>
                                    <span className="font-semibold">
                                        {items.find(i => i.id === zone.acceptedItem)?.label}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromZone(zone.id)}
                                    className="text-red-500 hover:text-red-700 font-bold"
                                >
                                    ✕
                                </button>
                            </motion.div>
                        ) : (
                            <div className="text-gray-400 text-center py-4">اسحب العنصر هنا</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
