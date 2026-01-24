'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DocumentationScreenProps {
    onNext: () => void;
    onUpdate: (data: any) => void;
    data: any;
}

const emojis = ['📸', '🧹', '♻️', '💚', '🌍', '✨', '🌟', '🎉'];

export default function DocumentationScreen({ onNext, onUpdate, data }: DocumentationScreenProps) {
    const [photoTaken, setPhotoTaken] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(data.documentationPhoto || null);
    const [videoRecorded, setVideoRecorded] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(data.documentationEmoji || '');
    const [reflection, setReflection] = useState(data.reflection || '');
    const [showCamera, setShowCamera] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = async () => {
        try {
            setCameraError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' }
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setShowCamera(true);
            }
        } catch (error: any) {
            console.error('Camera error:', error);
            setCameraError('تعذر الوصول إلى الكاميرا. يمكنك رفع صورة من الملفات.');
            fileInputRef.current?.click();
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowCamera(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);
                
                const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                setCapturedPhoto(photoDataUrl);
                setPhotoTaken(true);
                stopCamera();
                onUpdate({ documentationPhoto: photoDataUrl });
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const photoDataUrl = reader.result as string;
                setCapturedPhoto(photoDataUrl);
                setPhotoTaken(true);
                onUpdate({ documentationPhoto: photoDataUrl });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTakePhoto = () => {
        if (typeof navigator !== 'undefined' && 
            navigator.mediaDevices && 
            typeof navigator.mediaDevices.getUserMedia === 'function') {
            startCamera();
        } else {
            fileInputRef.current?.click();
        }
    };

    const retakePhoto = () => {
        setPhotoTaken(false);
        setCapturedPhoto(null);
        stopCamera();
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const handleRecordVideo = () => {
        setVideoRecorded(true);
    };

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji);
        onUpdate({ documentationEmoji: emoji });
    };

    const handleReflectionChange = (value: string) => {
        setReflection(value);
        onUpdate({ reflection: value, documentationNote: value });
    };

    const canProceed = photoTaken && reflection.trim().length > 0;

    return (
        <div className="w-full max-w-5xl mx-auto p-6" dir="rtl">
            <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
                التوثيق الرقمي
            </h2>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
                {/* Photo Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">📸 التقط صورة:</h3>
                    <div className="bg-gray-200 rounded-2xl p-4 text-center min-h-[250px] flex items-center justify-center relative overflow-hidden">
                        {!photoTaken ? (
                            <>
                                {!showCamera ? (
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
                                        <div className="absolute bottom-4 left-0 right-0 flex flex-col gap-3 items-center">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handleTakePhoto}
                                                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-xl shadow-lg"
                                            >
                                                📸 التقاط صورة
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => fileInputRef.current?.click()}
                                                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold text-lg shadow-lg"
                                            >
                                                📁 رفع صورة
                                            </motion.button>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </>
                                ) : (
                                    <div className="w-full h-full relative">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                        <canvas ref={canvasRef} className="hidden" />
                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={stopCamera}
                                                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold text-lg shadow-lg"
                                            >
                                                إلغاء
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={capturePhoto}
                                                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-xl shadow-lg"
                                            >
                                                📸 التقاط
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                                {cameraError && (
                                    <div className="absolute top-4 left-4 right-4 bg-yellow-100 text-yellow-800 p-3 rounded-lg text-sm">
                                        {cameraError}
                                    </div>
                                )}
                            </>
                        ) : (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-full h-full relative"
                            >
                                {capturedPhoto && (
                                    <img
                                        src={capturedPhoto}
                                        alt="Captured photo"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                )}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={retakePhoto}
                                        className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold text-lg shadow-lg"
                                    >
                                        إعادة التقاط
                                    </motion.button>
                                </div>
                                <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold">
                                    ✅ تم التقاط الصورة
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Video Section (Optional) */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">🎥 سجل فيديو قصير (اختياري):</h3>
                    <div className="bg-gray-200 rounded-2xl p-8 text-center min-h-[200px] flex items-center justify-center relative">
                        {!videoRecorded ? (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleRecordVideo}
                                className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-xl shadow-lg"
                            >
                                🎥 تسجيل فيديو
                            </motion.button>
                        ) : (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <div className="text-6xl mb-2">✅</div>
                                <p className="text-xl font-bold text-green-700">
                                    تم التسجيل!
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Reflection Question */}
                {photoTaken && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <label className="block text-xl font-bold text-gray-700 mb-3">
                            كيف شعرت بعد هذا النشاط؟
                        </label>
                        <textarea
                            value={reflection}
                            onChange={(e) => handleReflectionChange(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-green-500 focus:outline-none min-h-[120px]"
                            placeholder="اكتب مشاعرك وأفكارك..."
                            maxLength={200}
                        />
                        <p className="text-sm text-gray-500 mt-2 text-left">
                            {reflection.length}/200
                        </p>
                    </motion.div>
                )}

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

                {/* Continue Button */}
                {canProceed && (
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
