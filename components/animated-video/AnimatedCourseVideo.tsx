'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  AnimatedSun,
  AnimatedPlant,
  AnimatedAnimal,
  AnimatedWater,
  AnimatedCloud,
  AnimatedArrow,
  AnimatedEnergyFlow,
  AnimatedSoil,
  AnimatedFire,
  AnimatedPollution,
  SceneBackground,
} from './AnimatedElements';

// ============== TYPES ==============
export interface SceneElement {
  id: string;
  type: 'sun' | 'plant' | 'animal' | 'water' | 'cloud' | 'arrow' | 'energy-flow' | 'soil' | 'fire' | 'pollution' | 'text' | 'emoji';
  props?: Record<string, unknown>;
  position: { x: string; y: string };
  delay?: number; // Animation delay in seconds
}

export interface VideoScene {
  id: string;
  title: string;
  background: 'forest' | 'ocean' | 'city' | 'farm' | 'desert' | 'sky' | 'underwater' | 'park';
  duration: number; // Scene duration in seconds
  narratorText: string;
  elements: SceneElement[];
  soundEffects: string[];
  educationalHighlight?: string; // Optional highlighted concept
  transition?: 'fade' | 'slide' | 'zoom'; // Transition to next scene
}

export interface AnimatedVideoData {
  title: string;
  totalDuration: number; // Total video duration in seconds
  scenes: VideoScene[];
  finalMessage?: string;
  backgroundMusicUrl?: string;
}

interface AnimatedCourseVideoProps {
  videoData: AnimatedVideoData;
  onComplete?: () => void;
  onMarkWatched?: () => void;
  watched?: boolean;
}

// ============== SCENE ELEMENT RENDERER ==============
const SceneElementRenderer: React.FC<{ element: SceneElement; isVisible: boolean }> = ({ element, isVisible }) => {
  const { type, props = {}, position, delay = 0 } = element;

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    transform: 'translate(-50%, -50%)',
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const renderElement = () => {
    switch (type) {
      case 'sun':
        return <AnimatedSun {...(props as { size?: 'small' | 'medium' | 'large'; glowing?: boolean })} />;
      case 'plant':
        return <AnimatedPlant {...(props as { type?: 'flower' | 'tree' | 'grass' | 'bush'; size?: 'small' | 'medium' | 'large' })} />;
      case 'animal':
        return <AnimatedAnimal {...(props as { type: 'rabbit' | 'lion' | 'bird' | 'fish' | 'mouse' | 'fox' | 'deer' | 'butterfly' | 'worm' | 'bacteria' | 'turtle' | 'owl'; size?: 'small' | 'medium' | 'large'; moving?: boolean })} />;
      case 'water':
        return <AnimatedWater {...(props as { type?: 'droplet' | 'wave' | 'river' | 'rain'; size?: 'small' | 'medium' | 'large' })} />;
      case 'cloud':
        return <AnimatedCloud {...(props as { size?: 'small' | 'medium' | 'large'; raining?: boolean })} />;
      case 'arrow':
        return <AnimatedArrow {...(props as { direction?: 'right' | 'left' | 'up' | 'down'; color?: string; size?: 'small' | 'medium' | 'large'; label?: string })} />;
      case 'energy-flow':
        return <AnimatedEnergyFlow {...(props as { from: string; to: string })} />;
      case 'soil':
        return <AnimatedSoil {...(props as { size?: 'small' | 'medium' | 'large'; withWorms?: boolean })} />;
      case 'fire':
        return <AnimatedFire {...(props as { size?: 'small' | 'medium' | 'large' })} />;
      case 'pollution':
        return <AnimatedPollution {...(props as { type?: 'smoke' | 'trash' | 'oil'; size?: 'small' | 'medium' | 'large' })} />;
      case 'text':
        return (
          <div
            className="bg-white/90 px-4 py-2 rounded-xl shadow-lg text-lg font-bold text-gray-800"
            style={{ maxWidth: 200, textAlign: 'center' }}
          >
            {props.text as string}
          </div>
        );
      case 'emoji':
        return (
          <motion.span
            style={{ fontSize: (props.size as number) || 50 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {props.emoji as string}
          </motion.span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={baseStyle}
      variants={variants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ duration: 0.5, delay }}
    >
      {renderElement()}
    </motion.div>
  );
};

// ============== SOUND EFFECTS DISPLAY ==============
const SoundEffectsDisplay: React.FC<{ effects: string[]; isMuted: boolean }> = ({ effects, isMuted }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {effects.map((effect, idx) => (
        <motion.div
          key={idx}
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            isMuted ? 'bg-gray-200 text-gray-500' : 'bg-amber-100 text-amber-700'
          }`}
          animate={!isMuted ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity, delay: idx * 0.2 }}
        >
          🔊 {effect}
        </motion.div>
      ))}
    </div>
  );
};

// ============== NARRATOR BOX ==============
const NarratorBox: React.FC<{ text: string; isActive: boolean }> = ({ text, isActive }) => {
  return (
    <motion.div
      className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-4 shadow-lg"
      animate={isActive ? { borderColor: ['#86efac', '#93c5fd', '#86efac'] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="flex items-start gap-3">
        <motion.div
          className="text-4xl"
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🎙️
        </motion.div>
        <div>
          <p className="text-sm font-bold text-green-700 mb-1">الراوي</p>
          <p className="text-lg text-gray-700 leading-relaxed" dir="rtl">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ============== EDUCATIONAL HIGHLIGHT ==============
const EducationalHighlight: React.FC<{ text: string }> = ({ text }) => {
  return (
    <motion.div
      className="bg-yellow-100 border-2 border-yellow-400 rounded-xl px-4 py-2 text-center"
      animate={{ scale: [1, 1.02, 1], boxShadow: ['0 0 0 rgba(250, 204, 21, 0)', '0 0 20px rgba(250, 204, 21, 0.5)', '0 0 0 rgba(250, 204, 21, 0)'] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <p className="text-yellow-800 font-bold">💡 {text}</p>
    </motion.div>
  );
};

// ============== MAIN COMPONENT ==============
export default function AnimatedCourseVideo({
  videoData,
  onComplete,
  onMarkWatched,
  watched = false,
}: AnimatedCourseVideoProps) {
  const DEFAULT_MUSIC = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const MUSIC_FALLBACKS = [
    DEFAULT_MUSIC,
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  ];
  const musicUrl = videoData.backgroundMusicUrl || DEFAULT_MUSIC;

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scenes = useMemo(() => videoData.scenes, [videoData.scenes]);
  const currentScene = scenes[currentSceneIndex];
  const totalScenes = scenes.length;

  // Auto-advance scene timer
  useEffect(() => {
    if (!isPlaying || !currentScene) return;

    const duration = currentScene.duration * 1000; // Convert to ms
    const interval = 100; // Update progress every 100ms
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setSceneProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        if (currentSceneIndex < totalScenes - 1) {
          setCurrentSceneIndex(prev => prev + 1);
          setSceneProgress(0);
        } else {
          setIsPlaying(false);
          setHasCompleted(true);
          onComplete?.();
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentSceneIndex, currentScene, totalScenes, onComplete]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (currentSceneIndex < totalScenes - 1) {
      setCurrentSceneIndex(prev => prev + 1);
      setSceneProgress(0);
    }
  }, [currentSceneIndex, totalScenes]);

  const handlePrev = useCallback(() => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
      setSceneProgress(0);
    }
  }, [currentSceneIndex]);

  const handleRestart = useCallback(() => {
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    setIsPlaying(false);
    setHasCompleted(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, []);

  const handleMarkWatched = useCallback(() => {
    onMarkWatched?.();
  }, [onMarkWatched]);

  const overallProgress = useMemo(() => {
    return ((currentSceneIndex / totalScenes) * 100) + (sceneProgress / totalScenes);
  }, [currentSceneIndex, totalScenes, sceneProgress]);

  // Setup / reload background music when URL changes
  useEffect(() => {
    let disposed = false;

    const tryLoad = (urls: string[], idx = 0) => {
      if (disposed || idx >= urls.length) return;
      const audio = new Audio(urls[idx]);
      audio.loop = true;
      audio.volume = 0.35;
      audio.muted = isMuted;

      const onError = () => {
        audio.removeEventListener('error', onError);
        tryLoad(urls, idx + 1);
      };

      audio.addEventListener('error', onError);
      audioRef.current = audio;

      if (isPlaying && !isMuted) {
        audio.play().catch(() => {
          // Ignore autoplay block; user interaction (play button) will retry
        });
      }
    };

    tryLoad([musicUrl, ...MUSIC_FALLBACKS.filter((u) => u !== musicUrl)]);

    return () => {
      disposed = true;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = null;
    };
  }, [musicUrl, isMuted, isPlaying]);

  // Sync playback/mute with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;

    if (isPlaying && !isMuted) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, isMuted]);

  if (!currentScene) {
    return (
      <Card className="border-4 border-red-200 rounded-2xl">
        <CardContent className="p-8 text-center">
          <p className="text-red-600 font-bold text-xl">⚠️ لا توجد مشاهد متاحة</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-green-200 rounded-2xl overflow-visible shadow-xl" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100 border-b-2 border-green-200">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
            🎬 {videoData.title}
            {watched && (
              <span className="text-sm bg-green-500 text-white px-3 py-1 rounded-full">
                ✅ تمّت المشاهدة
              </span>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-green-700">
              المشهد {currentSceneIndex + 1} / {totalScenes}
            </span>
          </div>
        </div>
        {/* Overall Progress */}
        <div className="mt-3">
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-visible pb-2">
        {/* Scene Display */}
        <div className="relative overflow-visible mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="overflow-visible"
            >
              <SceneBackground type={currentScene.background} className="min-h-[350px] md:min-h-[400px] w-full">
                {/* Scene Title */}
                <motion.div
                  className="absolute top-4 left-4 right-4 z-10"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg inline-block">
                    <h3 className="text-lg font-bold text-gray-800">{currentScene.title}</h3>
                  </div>
                </motion.div>

                {/* Scene Elements */}
                {currentScene.elements.map((element) => (
                  <SceneElementRenderer
                    key={element.id}
                    element={element}
                    isVisible={true}
                  />
                ))}

                {/* Scene Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-10">
                  <motion.div
                    className="h-full bg-green-500"
                    style={{ width: `${sceneProgress}%` }}
                  />
                </div>
              </SceneBackground>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls & Info Section */}
        <div className="p-6 pb-8 space-y-4 bg-gradient-to-b from-white to-green-50">
          {/* Narrator Text */}
          <NarratorBox text={currentScene.narratorText} isActive={isPlaying} />

          {/* Educational Highlight */}
          {currentScene.educationalHighlight && (
            <EducationalHighlight text={currentScene.educationalHighlight} />
          )}

          {/* Sound Effects */}
          {currentScene.soundEffects.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-bold text-gray-600 text-center">المؤثرات الصوتية</p>
              <SoundEffectsDisplay effects={currentScene.soundEffects} isMuted={isMuted} />
            </div>
          )}

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentSceneIndex === 0}
              className="rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <Button
              onClick={handlePlayPause}
              className={`rounded-full w-16 h-16 ${
                isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 mr-1" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentSceneIndex === totalScenes - 1}
              className="rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="border-l-2 border-gray-200 h-8 mx-2" />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-full w-10 h-10"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleRestart}
              className="rounded-full w-10 h-10"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>

          {/* Scene Navigation Dots */}
          <div className="flex justify-center gap-2 flex-wrap">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setCurrentSceneIndex(idx);
                  setSceneProgress(0);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSceneIndex
                    ? 'bg-green-500 scale-125'
                    : idx < currentSceneIndex
                    ? 'bg-green-300'
                    : 'bg-gray-300'
                }`}
                title={scene.title}
              />
            ))}
          </div>

          {/* Completion / Mark Watched */}
          {(hasCompleted || currentSceneIndex === totalScenes - 1) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {videoData.finalMessage && (
                <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-300 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold text-yellow-800">
                    🎉 {videoData.finalMessage}
                  </p>
                </div>
              )}

              <div className="flex justify-center">
                <Button
                  onClick={handleMarkWatched}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-8 py-6 text-lg font-bold"
                >
                  <Check className="w-6 h-6 ml-2" />
                  {watched ? 'تم تأكيد المشاهدة ✅' : 'تأكيد إتمام المشاهدة ✅'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

