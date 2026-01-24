'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import StudentSidebar from '@/components/navigation/StudentSidebar';
import Link from 'next/link';

const activities = [
    {
        id: 'tree-planting',
        title: 'يوم التشجير',
        subtitle: 'من السلوك البيئي إلى المسؤولية الفردية',
        icon: '🌱',
        color: 'from-green-500 to-emerald-600',
        hoverColor: 'from-green-600 to-emerald-700',
        description: 'نشاط بيئي تطبيقي: زراعة شجرة والاعتناء بها',
        path: '/student/activities/tree-planting'
    },
    {
        id: 'recycled-art',
        title: 'أبطال الفن الأخضر',
        subtitle: 'مجسمي الإبداعي',
        icon: '🎨',
        color: 'from-purple-500 to-pink-600',
        hoverColor: 'from-purple-600 to-pink-700',
        description: 'صناعة مجسم إبداعي من البلاستيك المعاد تدويره',
        path: '/student/activities/recycled-art'
    },
    {
        id: 'green-cleanliness',
        title: 'حملة النظافة الخضراء',
        subtitle: 'أبطال بيئتنا يحافظون على نظافة مدرستهم',
        icon: '🧹',
        color: 'from-green-500 to-emerald-600',
        hoverColor: 'from-green-600 to-emerald-700',
        description: 'نشاط تنظيف وفرز النفايات مع الفريق',
        path: '/student/activities/green-cleanliness'
    },
    {
        id: 'ecovillage',
        title: 'EcoVillage',
        subtitle: 'بناء مجسّم قرية بيئية',
        icon: '🏡',
        color: 'from-green-500 to-teal-600',
        hoverColor: 'from-green-600 to-teal-700',
        description: 'بناء قرية بيئية صغيرة بأيدينا',
        path: '/student/activities/ecovillage'
    }
];

export default function ActivitiesPage() {
    const router = useRouter();
    const { user } = useAuth();

    React.useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
            <StudentSidebar />

            <main className="mr-20 lg:mr-64 p-6 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-green-800 mb-4"
                    >
                        الأنشطة التطبيقية الميدانية
                    </motion.h1>
                    <p className="text-xl text-gray-600">
                        اختر نشاطاً وابدأ رحلتك البيئية
                    </p>
                </div>

                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <Link href={activity.path}>
                                <div className={`bg-gradient-to-br ${activity.color} hover:${activity.hoverColor} rounded-3xl shadow-xl p-8 text-white cursor-pointer transition-all duration-300 h-full flex flex-col`}>
                                    <div className="text-8xl mb-4 text-center">{activity.icon}</div>
                                    <h2 className="text-3xl font-bold mb-2 text-center">
                                        {activity.title}
                                    </h2>
                                    <p className="text-xl mb-4 text-center opacity-90">
                                        {activity.subtitle}
                                    </p>
                                    <p className="text-lg mb-6 text-center opacity-80 flex-grow">
                                        {activity.description}
                                    </p>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white/20 hover:bg-white/30 rounded-xl p-4 text-center font-bold text-lg backdrop-blur-sm transition-all"
                                    >
                                        ➡️ ابدأ النشاط
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-green-200"
                >
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">💡</div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                معلومات مهمة
                            </h3>
                            <ul className="text-gray-600 space-y-2 text-right">
                                <li>• كل نشاط يحتوي على عدة مراحل تفاعلية</li>
                                <li>• ستحصل على نقاط وشارات عند إكمال النشاط</li>
                                <li>• يمكنك العودة إلى النشاط في أي وقت</li>
                                <li>• المعلم سيقوم بتقييم أدائك</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
