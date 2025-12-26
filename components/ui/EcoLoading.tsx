'use client';

import { Leaf, Sun, Droplet } from 'lucide-react';

export default function EcoLoading({ message = 'جاري التحميل...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-sky-50 to-amber-50" dir="rtl">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Sun */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-spin-slow">
            <Sun className="w-12 h-12 text-yellow-400" />
          </div>
          {/* Water drop */}
          <div className="absolute bottom-0 left-1/4 animate-bounce-slow">
            <Droplet className="w-10 h-10 text-sky-400" />
          </div>
          {/* Leaf - growing */}
          <div className="absolute bottom-0 right-1/4 animate-grow">
            <Leaf className="w-16 h-16 text-green-500" />
          </div>
        </div>
        <p className="text-green-600 font-semibold text-xl">{message} 🌱</p>
        <p className="text-gray-500 text-sm mt-2">لنتعلم كيف نحمي كوكبنا!</p>
      </div>
    </div>
  );
}

