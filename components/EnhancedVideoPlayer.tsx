'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, RefreshCw, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FriendlyAnimal from '@/components/cartoons/FriendlyAnimal';

interface EnhancedVideoPlayerProps {
  videoUrl: string;
  courseId: string;
  lessonTitle: string;
  onProgressUpdate?: (progress: number, timeSpent?: number) => void | Promise<void>;
  onEnded?: () => void;
  className?: string;
  initialProgress?: number;
}

export default function EnhancedVideoPlayer({ 
  videoUrl, 
  courseId, 
  lessonTitle,
  onProgressUpdate,
  onEnded, 
  className = '',
  initialProgress = 0
}: EnhancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isYouTube, setIsYouTube] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the URL is a YouTube URL
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const embedRegex = /youtube\.com\/embed\/([^"&?\/\s]{11})/;

    if (embedRegex.test(videoUrl)) {
      setIsYouTube(true);
      setYoutubeUrl(videoUrl);
      setIsLoading(false);
    } else if (youtubeRegex.test(videoUrl)) {
      const match = videoUrl.match(youtubeRegex);
      if (match && match[1]) {
        setIsYouTube(true);
        setYoutubeUrl(`https://www.youtube.com/embed/${match[1]}`);
        setIsLoading(false);
      } else {
        setIsYouTube(false);
        setIsLoading(false);
      }
    } else {
      setIsYouTube(false);
      setIsLoading(false);
    }
  }, [videoUrl]);

  // Handle video progress updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isYouTube || !onProgressUpdate) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        const timeSpent = Math.floor(video.currentTime);
        onProgressUpdate(progress, timeSpent);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onProgressUpdate, isYouTube]);

  // Handle video ended event
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

  // Handle video can play
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isYouTube) return;

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [isYouTube]);

  if (hasError) {
    return (
      <div className={`aspect-video bg-amber-50 rounded-2xl overflow-hidden border-4 border-amber-200 p-6 flex items-center justify-center text-center ${className}`} dir="rtl">
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
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`aspect-video bg-gray-100 rounded-2xl overflow-hidden border-4 border-gray-200 flex items-center justify-center ${className}`} dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">جاري التحميل...</p>
        </div>
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
          title={lessonTitle}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative ${className}`}>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        controlsList="nodownload"
        preload="metadata"
        className="w-full h-full"
        onError={() => setHasError(true)}
        key={videoUrl}
        onLoadedMetadata={() => {
          if (videoRef.current && initialProgress > 0) {
            const duration = videoRef.current.duration;
            if (duration) {
              videoRef.current.currentTime = (initialProgress / 100) * duration;
            }
          }
        }}
      >
        Your browser does not support the video tag.
      </video>
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="font-medium">جاري التحميل...</p>
          </div>
        </div>
      )}
    </div>
  );
}
