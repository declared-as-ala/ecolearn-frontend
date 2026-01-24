'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DragDropGame from '../../tree-planting/_components/DragDropGame';

interface PlanningScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const cleaningAreas = [
    { id: 'playground', label: 'ساحة اللعب', icon: '🏃' },
    { id: 'garden', label: 'الحديقة', icon: '🌳' },
    { id: 'corridor', label: 'الممرات', icon: '🚪' },
    { id: 'classroom', label: 'الفصل الدراسي', icon: '📚' }
];

const roles = [
    { id: 'collection', label: 'الجمع', icon: '🟢' },
    { id: 'sorting', label: 'الفرز', icon: '🔵' },
    { id: 'organization', label: 'الترتيب', icon: '🟡' },
    { id: 'documentation', label: 'التوثيق', icon: '📸' }
];

export default function PlanningScreen({ onNext, onUpdate, data }: PlanningScreenProps) {
    const [selectedArea, setSelectedArea] = useState<string | null>(data.cleaningArea);
    const [roleAssigned, setRoleAssigned] = useState(false);

    const handleAreaSelect = (areaId: string) => {
        const area = cleaningAreas.find(a => a.id === areaId);
        setSelectedArea(areaId);
        onUpdate({
            cleaningArea: areaId,
            cleaningAreaArabic: area?.label
        });
    };

    const handleRoleComplete = (assignments: Record<string, string>) => {
        const roleId = Object.values(assignments)[0];
        const role = roles.find(r => r.id === roleId);
        setRoleAssigned(true);
        onUpdate({
            assignedRole: roleId,
            assignedRoleArabic: role?.label
        });
    };

    const canProceed = selectedArea && roleAssigned;

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                التخطيط معًا
            </h2>

            {/* Area Selection */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                    اختر منطقة التنظيف:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {cleaningAreas.map(area => (
                        <motion.button
                            key={area.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAreaSelect(area.id)}
                            className={`p-6 rounded-xl shadow-lg transition-all border-4 ${
                                selectedArea === area.id
                                    ? 'bg-green-500 text-white border-green-700'
                                    : 'bg-white hover:bg-green-50 border-gray-200'
                            }`}
                        >
                            <div className="text-5xl mb-3">{area.icon}</div>
                            <div className="font-bold text-lg">{area.label}</div>
                            {selectedArea === area.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-3xl mt-2"
                                >
                                    ✅
                                </motion.div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Role Assignment */}
            {selectedArea && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {!roleAssigned ? (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                                حدد دورك في الفريق:
                            </h3>
                            <DragDropGame
                                items={roles}
                                dropZones={[
                                    { id: 'my_role', label: 'دوري في الفريق', acceptedItem: null }
                                ]}
                                onComplete={handleRoleComplete}
                                title=""
                                instruction="اسحب الدور الذي تريد القيام به"
                            />
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center p-6 bg-green-100 rounded-xl"
                        >
                            <div className="text-4xl mb-2">✅</div>
                            <div className="text-xl font-bold text-green-800">
                                تم تحديد دورك بنجاح!
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Validation */}
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
                    <p className="text-2xl font-bold text-green-700 mb-4">
                        ممتاز! جاهزون للبدء
                    </p>
                </motion.div>
            )}
        </div>
    );
}
