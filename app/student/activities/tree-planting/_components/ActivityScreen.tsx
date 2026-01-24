'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ActivityScreenProps {
    children: ReactNode;
    currentScreen: number;
    totalScreens: number;
    onNext?: () => void;
    onPrevious?: () => void;
    showNext?: boolean;
    showPrevious?: boolean;
    nextLabel?: string;
    className?: string;
}

export default function ActivityScreen({
    children,
    currentScreen,
    totalScreens,
    onNext,
    onPrevious,
    showNext = true,
    showPrevious = false,
    nextLabel = 'متابعة ➡️',
    className = ''
}: ActivityScreenProps) {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden" dir="rtl">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200">
                <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentScreen / totalScreens) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>

            {/* Progress Text */}
            <div className="absolute top-4 left-4 text-sm text-gray-600 font-medium bg-white px-3 py-1 rounded-full shadow-sm">
                {currentScreen} / {totalScreens}
            </div>

            {/* Main Content */}
            <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col items-center justify-center min-h-screen p-6 pb-32 overflow-y-auto ${className}`}
            >
                {children}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-6 z-10">
                {showPrevious && onPrevious && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onPrevious}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-bold text-lg transition-colors shadow-lg"
                    >
                        ⬅️ السابق
                    </motion.button>
                )}

                {showNext && onNext && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-bold text-lg transition-all shadow-lg"
                    >
                        {nextLabel}
                    </motion.button>
                )}
            </div>
        </div>
    );
}
