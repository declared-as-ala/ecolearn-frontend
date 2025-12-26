'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, RefreshCw, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartoonScene from '@/components/cartoons/CartoonScene';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

interface VideoPlayerProps {
  videoUrl: string;
  onEnded?: () => void;
  className?: string;
}

export default function VideoPlayer({ videoUrl, onEnded, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isYouTube, setIsYouTube] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showSlides, setShowSlides] = useState(false);

  useEffect(() => {
    // Check if the URL is a YouTube URL
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const embedRegex = /youtube\.com\/embed\/([^"&?\/\s]{11})/;

    if (embedRegex.test(videoUrl)) {
      // Already an embed URL
      setIsYouTube(true);
      setYoutubeUrl(videoUrl);
    } else if (youtubeRegex.test(videoUrl)) {
      // Regular YouTube URL - convert to embed
      const match = videoUrl.match(youtubeRegex);
      if (match && match[1]) {
        setIsYouTube(true);
        setYoutubeUrl(`https://www.youtube.com/embed/${match[1]}`);
      } else {
        setIsYouTube(false);
      }
    } else {
      // Direct video file URL
      setIsYouTube(false);
    }
  }, [videoUrl]);

  // Handle video ended event for direct video files
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isYouTube) return;

    const handleEnded = () => {
      if (onEnded) {
        onEnded();
      }
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded, isYouTube]);

  if (hasError || showSlides) {
    return (
      <div className={`aspect-video bg-amber-50 rounded-2xl overflow-hidden border-4 border-amber-200 p-6 flex items-center justify-center text-center ${className}`} dir="rtl">
        {hasError ? (
          <div className="space-y-4 max-w-lg">
            <FriendlyAnimal type="bird" emotion="happy" size="large" className="mx-auto" />
            <h3 className="text-xl font-bold text-amber-800">❗ حدث مشكل في تشغيل الفيديو، لا تقلق 😊</h3>
            <p className="text-amber-600 font-medium">يمكنك متابعة التمارين والألعاب!</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={() => setHasError(false)} className="bg-amber-500 hover:bg-amber-600 text-white rounded-full">
                <RefreshCw className="ml-2 w-4 h-4" /> إعادة المحاولة
              </Button>
              <Button onClick={() => {
                if (onEnded) onEnded();
              }} variant="outline" className="border-green-500 text-green-700 rounded-full bg-white">
                <BookOpen className="ml-2 w-4 h-4" /> متابعة للتمارين
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-lg">
            <FriendlyAnimal type="rabbit" emotion="happy" size="large" className="mx-auto" />
            <h3 className="text-xl font-bold text-amber-800">عذراً! الفيديو غير متوفر حالياً 😊</h3>
            <p className="text-amber-600 font-medium">لكن لا بأس، يمكنك متابعة التمارين والألعاب مباشرة! ✨</p>
            <Button onClick={() => {
              if (onEnded) onEnded();
            }} className="bg-green-600 hover:bg-green-700 text-white rounded-full">
              متابعة للتمارين
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (isYouTube) {
    return (
      <div className={`aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ${className}`}>
        <iframe
          src={`${youtubeUrl}?rel=0&modestbranding=1&cc_lang_pref=ar`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Lesson Video"
          onLoad={() => {
            // Check if iframe loaded successfully
            setTimeout(() => {
              const iframe = document.querySelector('iframe[title="Lesson Video"]') as HTMLIFrameElement;
              if (iframe && !iframe.contentWindow) {
                setHasError(true);
              }
            }, 2000);
          }}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ${className}`}>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full h-full"
        onError={() => setHasError(true)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}




