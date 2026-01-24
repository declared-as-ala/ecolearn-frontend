'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DocumentationScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const emojis = ['📸', '🌳', '🌱', '💚', '🌍', '✨', '🌟', '🎉'];

export default function DocumentationScreen({ onNext, onUpdate, data }: DocumentationScreenProps) {
    const [photoTaken, setPhotoTaken] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(data.documentationEmoji || '');
    const [note, setNote] = useState(data.documentationNote || '');

    const handleTakePhoto = () => {
        setPhotoTaken(true);
        // Simulate photo capture
        setTimeout(() => {
            onUpdate({
                documentationEmoji: selectedEmoji,
                documentationNote: note
            });
        }, 500);
    };

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji);
        onUpdate({ documentationEmoji: emoji });
    };

    const handleNoteChange = (value: string) => {
        setNote(value);
        onUpdate({ documentationNote: value });
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                التوثيق
            </h2>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
                {/* Camera Simulation */}
                <div className="mb-8">
                    <div className="bg-gray-200 rounded-2xl p-8 text-center min-h-[300px] flex items-center justify-center relative overflow-hidden">
                        {!photoTaken ? (
                            <>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                    className="text-8xl"
                                >
                                    📷
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleTakePhoto}
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-xl shadow-lg"
                                >
                                    📸 التقاط صورة
                                </motion.button>
                            </>
                        ) : (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <div className="text-9xl mb-4">🌳</div>
                                <p className="text-2xl font-bold text-green-700">
                                    تم التقاط الصورة! ✅
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Emoji Selection */}
                {photoTaken && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <label className="block text-xl font-bold text-gray-700 mb-3">
                            اختر إيموجي:
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {emojis.map(emoji => (
                                <motion.button
                                    key={emoji}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleEmojiSelect(emoji)}
                                    className={`text-4xl p-3 rounded-xl transition-all ${
                                        selectedEmoji === emoji
                                            ? 'bg-green-500 scale-125 border-4 border-green-700'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    {emoji}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Note Input */}
                {photoTaken && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <label className="block text-xl font-bold text-gray-700 mb-3">
                            اكتب ملاحظة قصيرة:
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => handleNoteChange(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none min-h-[100px]"
                            placeholder="مثال: شجرة جميلة، سأعتني بها..."
                            maxLength={100}
                        />
                        <p className="text-sm text-gray-500 mt-2 text-left">
                            {note.length}/100
                        </p>
                    </motion.div>
                )}

                {/* Continue Button */}
                {photoTaken && selectedEmoji && note && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-xl shadow-lg"
                    >
                        ➡️ متابعة
                    </motion.button>
                )}
            </div>
        </div>
    );
}
