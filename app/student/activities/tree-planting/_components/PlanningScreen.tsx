'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DragDropGame from './DragDropGame';

interface PlanningScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const locations = [
    { id: 'school_yard', label: 'فناء المدرسة', icon: '🏫' },
    { id: 'garden', label: 'الحديقة', icon: '🌳' },
    { id: 'perimeter', label: 'محيط السور', icon: '🏛️' }
];

const treeTypes = [
    { id: 'olive', label: 'زيتون', icon: '🫒' },
    { id: 'palm', label: 'نخيل', icon: '🌴' },
    { id: 'citrus', label: 'حمضيات', icon: '🍊' },
    { id: 'pine', label: 'صنوبر', icon: '🌲' }
];

const roles = [
    { id: 'digging', label: 'الحفر', icon: '🪓' },
    { id: 'planting', label: 'الغرس', icon: '🌱' },
    { id: 'watering', label: 'السقي', icon: '💧' },
    { id: 'documenting', label: 'التوثيق', icon: '📸' }
];

export default function PlanningScreen({ onNext, onUpdate, data }: PlanningScreenProps) {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(data.plantingLocation);
    const [selectedTreeType, setSelectedTreeType] = useState<string | null>(data.treeType);
    const [roleAssigned, setRoleAssigned] = useState(false);
    const [showRoleAssignment, setShowRoleAssignment] = useState(false);

    const handleLocationSelect = (locationId: string) => {
        const location = locations.find(l => l.id === locationId);
        setSelectedLocation(locationId);
        onUpdate({
            plantingLocation: locationId,
            plantingLocationArabic: location?.label
        });
    };

    const handleTreeTypeSelect = (treeId: string) => {
        const tree = treeTypes.find(t => t.id === treeId);
        setSelectedTreeType(treeId);
        onUpdate({ treeType: tree?.label });
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

    const canProceed = selectedLocation && selectedTreeType && roleAssigned;

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                مرحلة التخطيط
            </h2>

            {/* Location Selection */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                    اختر مكان الزراعة:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {locations.map(location => (
                        <motion.button
                            key={location.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleLocationSelect(location.id)}
                            className={`p-6 rounded-xl shadow-lg transition-all ${
                                selectedLocation === location.id
                                    ? 'bg-green-500 text-white border-4 border-green-700'
                                    : 'bg-white hover:bg-green-50 border-4 border-gray-200'
                            }`}
                        >
                            <div className="text-5xl mb-3">{location.icon}</div>
                            <div className="font-bold text-lg">{location.label}</div>
                            {selectedLocation === location.id && (
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

            {/* Tree Type Selection */}
            {selectedLocation && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                        اختر نوع الشجرة:
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {treeTypes.map(tree => (
                            <motion.button
                                key={tree.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleTreeTypeSelect(tree.id)}
                                className={`p-4 rounded-xl shadow-lg transition-all ${
                                    selectedTreeType === tree.id
                                        ? 'bg-green-500 text-white border-4 border-green-700'
                                        : 'bg-white hover:bg-green-50 border-4 border-gray-200'
                                }`}
                            >
                                <div className="text-4xl mb-2">{tree.icon}</div>
                                <div className="font-bold">{tree.label}</div>
                                {selectedTreeType === tree.id && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-2xl mt-1"
                                    >
                                        ✅
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Role Assignment */}
            {selectedLocation && selectedTreeType && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {!roleAssigned ? (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                                حدد دورك في النشاط:
                            </h3>
                            <DragDropGame
                                items={roles}
                                dropZones={[
                                    { id: 'my_role', label: 'دوري في النشاط', acceptedItem: null }
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

            {/* Validation Animation */}
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
