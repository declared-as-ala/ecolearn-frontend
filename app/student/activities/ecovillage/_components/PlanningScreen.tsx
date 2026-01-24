'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DragDropGame from '../../tree-planting/_components/DragDropGame';

interface PlanningScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const roles = [
    { id: 'houses', label: 'فريق البيوت', icon: '🏠' },
    { id: 'solar', label: 'فريق الطاقة الشمسية', icon: '☀️' },
    { id: 'bikes', label: 'فريق الدراجات', icon: '🚲' },
    { id: 'recycling', label: 'فريق الرسكلة', icon: '♻️' },
    { id: 'documentation', label: 'فريق التوثيق', icon: '📸' }
];

export default function PlanningScreen({ onNext, onUpdate, data }: PlanningScreenProps) {
    const [roleAssigned, setRoleAssigned] = useState(false);

    const handleRoleComplete = (assignments: Record<string, string>) => {
        const roleId = Object.values(assignments)[0];
        const role = roles.find(r => r.id === roleId);
        setRoleAssigned(true);
        onUpdate({
            assignedRole: roleId,
            assignedRoleArabic: role?.label
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                تقسيم الأدوار
            </h2>

            {!roleAssigned ? (
                <div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                        اختر دورك في بناء EcoVillage:
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
                    className="text-center"
                >
                    <div className="bg-green-100 rounded-xl p-8 mb-6">
                        <div className="text-6xl mb-4">
                            {roles.find(r => r.id === data.assignedRole)?.icon}
                        </div>
                        <div className="text-3xl font-bold text-green-800 mb-2">
                            {data.assignedRoleArabic}
                        </div>
                        <div className="text-4xl mt-4">✅</div>
                    </div>
                    <p className="text-xl text-gray-700 mb-6">
                        تم تحديد دورك بنجاح!
                    </p>
                </motion.div>
            )}
        </div>
    );
}
