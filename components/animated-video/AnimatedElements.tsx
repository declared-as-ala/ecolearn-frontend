'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

// ============== ANIMATED SUN ==============
export const AnimatedSun: React.FC<{
  size?: 'small' | 'medium' | 'large';
  className?: string;
  glowing?: boolean;
}> = ({ size = 'medium', className = '', glowing = true }) => {
  const sizeMap = { small: 60, medium: 100, large: 150 };
  const s = sizeMap[size];

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: s, height: s }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      {/* Glow effect */}
      {glowing && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,220,100,0.8) 0%, rgba(255,180,0,0) 70%)',
            filter: 'blur(10px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      {/* Sun body */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #FFE066 0%, #FFA500 50%, #FF8C00 100%)',
          boxShadow: '0 0 30px rgba(255, 165, 0, 0.6)',
        }}
      />
      {/* Sun rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-yellow-400"
          style={{
            width: 4,
            height: s * 0.3,
            left: '50%',
            top: -s * 0.15,
            transformOrigin: `50% ${s * 0.5 + s * 0.15}px`,
            transform: `translateX(-50%) rotate(${i * 45}deg)`,
            borderRadius: 2,
          }}
          animate={{ height: [s * 0.3, s * 0.4, s * 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      {/* Sun face */}
      <div className="absolute inset-0 flex items-center justify-center text-4xl">
        😊
      </div>
    </motion.div>
  );
};

// ============== ANIMATED PLANT ==============
export const AnimatedPlant: React.FC<{
  type?: 'flower' | 'tree' | 'grass' | 'bush';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  swaying?: boolean;
}> = ({ type = 'flower', size = 'medium', className = '', swaying = true }) => {
  const sizeMap = { small: 40, medium: 70, large: 120 };
  const s = sizeMap[size];

  const plantEmojis = {
    flower: '🌸',
    tree: '🌳',
    grass: '🌿',
    bush: '🌲',
  };

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      style={{ fontSize: s * 0.6 }}
      animate={swaying ? { rotate: [-3, 3, -3] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span>{plantEmojis[type]}</span>
      {/* Growing effect for flowers/grass */}
      {(type === 'flower' || type === 'grass') && (
        <motion.div
          className="absolute -bottom-2 w-1 bg-green-600 rounded"
          style={{ height: s * 0.3 }}
          animate={{ height: [s * 0.3, s * 0.35, s * 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

// ============== ANIMATED ANIMAL ==============
export const AnimatedAnimal: React.FC<{
  type: 'rabbit' | 'lion' | 'bird' | 'fish' | 'mouse' | 'fox' | 'deer' | 'butterfly' | 'worm' | 'bacteria' | 'turtle' | 'owl';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  moving?: boolean;
  direction?: 'left' | 'right';
}> = ({ type, size = 'medium', className = '', moving = true, direction = 'right' }) => {
  const sizeMap = { small: 40, medium: 60, large: 90 };
  const s = sizeMap[size];

  const animalEmojis: Record<string, string> = {
    rabbit: '🐰',
    lion: '🦁',
    bird: '🐦',
    fish: '🐟',
    mouse: '🐭',
    fox: '🦊',
    deer: '🦌',
    butterfly: '🦋',
    worm: '🪱',
    bacteria: '🦠',
    turtle: '🐢',
    owl: '🦉',
  };

  const getAnimation = () => {
    switch (type) {
      case 'bird':
      case 'butterfly':
        return { y: [-5, 5, -5], x: moving ? [0, 20, 0] : 0 };
      case 'fish':
        return { x: moving ? [0, 30, 0] : 0, rotate: [-5, 5, -5] };
      case 'rabbit':
        return { y: moving ? [0, -15, 0] : 0 };
      case 'worm':
        return { scaleX: [1, 1.2, 1], x: moving ? [0, 5, 0] : 0 };
      default:
        return { x: moving ? [0, 10, 0] : 0 };
    }
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{
        fontSize: s,
        transform: direction === 'left' ? 'scaleX(-1)' : 'none',
      }}
      animate={getAnimation()}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {animalEmojis[type] || '🐾'}
    </motion.div>
  );
};

// ============== ANIMATED WATER ==============
export const AnimatedWater: React.FC<{
  type?: 'droplet' | 'wave' | 'river' | 'rain';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({ type = 'droplet', size = 'medium', className = '' }) => {
  const sizeMap = { small: 30, medium: 50, large: 80 };
  const s = sizeMap[size];

  if (type === 'rain') {
    return (
      <div className={`relative ${className}`} style={{ width: s * 3, height: s * 2 }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-400"
            style={{
              left: `${(i * 20) % 100}%`,
              fontSize: s * 0.4,
            }}
            animate={{ y: [0, s * 2], opacity: [1, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            💧
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'wave') {
    return (
      <motion.div
        className={`text-blue-400 ${className}`}
        style={{ fontSize: s }}
        animate={{ y: [-3, 3, -3], rotate: [-5, 5, -5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        🌊
      </motion.div>
    );
  }

  if (type === 'river') {
    return (
      <div className={`flex ${className}`}>
        {[...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            style={{ fontSize: s * 0.6 }}
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            💧
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`text-blue-400 ${className}`}
      style={{ fontSize: s }}
      animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      💧
    </motion.div>
  );
};

// ============== ANIMATED CLOUD ==============
export const AnimatedCloud: React.FC<{
  size?: 'small' | 'medium' | 'large';
  className?: string;
  raining?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
}> = ({ size = 'medium', className = '', raining = false, speed = 'medium' }) => {
  const sizeMap = { small: 50, medium: 80, large: 120 };
  const s = sizeMap[size];
  const speedMap = { slow: 8, medium: 5, fast: 3 };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ fontSize: s }}
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: speedMap[speed], repeat: Infinity, ease: 'easeInOut' }}
    >
      ☁️
      {raining && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <AnimatedWater type="rain" size="small" />
        </div>
      )}
    </motion.div>
  );
};

// ============== ANIMATED ARROW (for food chains) ==============
export const AnimatedArrow: React.FC<{
  direction?: 'right' | 'left' | 'up' | 'down';
  color?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  pulsing?: boolean;
  label?: string;
}> = ({ direction = 'right', color = '#22c55e', size = 'medium', className = '', pulsing = true, label }) => {
  const sizeMap = { small: 40, medium: 60, large: 100 };
  const s = sizeMap[size];

  const rotationMap = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ transform: `rotate(${rotationMap[direction]}deg)` }}
      animate={pulsing ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <svg width={s} height={s * 0.5} viewBox="0 0 100 50">
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 10 25 L 70 25 L 70 15 L 90 25 L 70 35 L 70 25"
          fill="url(#arrowGradient)"
          stroke={color}
          strokeWidth="2"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
      {label && (
        <span
          className="absolute -bottom-6 text-xs font-bold whitespace-nowrap"
          style={{ color, transform: `rotate(-${rotationMap[direction]}deg)` }}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
};

// ============== ANIMATED ENERGY FLOW ==============
export const AnimatedEnergyFlow: React.FC<{
  from: string;
  to: string;
  className?: string;
}> = ({ from, to, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-3xl">{from}</span>
      <motion.div
        className="flex items-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <AnimatedArrow direction="right" size="small" color="#fbbf24" label="طاقة" />
      </motion.div>
      <span className="text-3xl">{to}</span>
    </div>
  );
};

// ============== ANIMATED SOIL ==============
export const AnimatedSoil: React.FC<{
  size?: 'small' | 'medium' | 'large';
  className?: string;
  withWorms?: boolean;
}> = ({ size = 'medium', className = '', withWorms = false }) => {
  const sizeMap = { small: 60, medium: 100, large: 150 };
  const s = sizeMap[size];

  return (
    <div className={`relative ${className}`} style={{ width: s, height: s * 0.4 }}>
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #8B4513 0%, #654321 50%, #3E2723 100%)',
        }}
      />
      {withWorms && (
        <motion.div
          className="absolute"
          style={{ left: '30%', top: '20%', fontSize: s * 0.2 }}
          animate={{ x: [-5, 5, -5], rotate: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🪱
        </motion.div>
      )}
      {/* Nutrients sparkles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + (i % 2) * 20}%`,
            fontSize: s * 0.1,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

// ============== ANIMATED FIRE ==============
export const AnimatedFire: React.FC<{
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({ size = 'medium', className = '' }) => {
  const sizeMap = { small: 40, medium: 60, large: 100 };
  const s = sizeMap[size];

  return (
    <motion.div
      className={className}
      style={{ fontSize: s }}
      animate={{
        scale: [1, 1.1, 0.95, 1.05, 1],
        rotate: [-2, 2, -2, 2, 0],
      }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      🔥
    </motion.div>
  );
};

// ============== ANIMATED POLLUTION ==============
export const AnimatedPollution: React.FC<{
  type?: 'smoke' | 'trash' | 'oil';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({ type = 'smoke', size = 'medium', className = '' }) => {
  const sizeMap = { small: 30, medium: 50, large: 80 };
  const s = sizeMap[size];

  if (type === 'smoke') {
    return (
      <div className={`relative ${className}`}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-400"
            style={{ fontSize: s * 0.6, left: i * 10 }}
            animate={{ y: [-20, -50], opacity: [0.8, 0], scale: [1, 1.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          >
            💨
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'trash') {
    return (
      <motion.div
        className={className}
        style={{ fontSize: s }}
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🗑️
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ fontSize: s }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      🛢️
    </motion.div>
  );
};

// ============== SCENE BACKGROUND COMPONENT ==============
export const SceneBackground: React.FC<{
  type: 'forest' | 'ocean' | 'city' | 'farm' | 'desert' | 'sky' | 'underwater' | 'park' | 'school';
  children: React.ReactNode;
  className?: string;
}> = ({ type, children, className = '' }) => {
  const backgrounds: Record<string, string> = {
    forest: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 40%, #228B22 70%, #1a5a1a 100%)',
    ocean: 'linear-gradient(180deg, #87CEEB 0%, #4169E1 40%, #000080 100%)',
    city: 'linear-gradient(180deg, #B0C4DE 0%, #778899 40%, #2F4F4F 100%)',
    farm: 'linear-gradient(180deg, #87CEEB 0%, #90EE90 50%, #8B4513 100%)',
    desert: 'linear-gradient(180deg, #87CEEB 0%, #FFE4B5 50%, #DEB887 100%)',
    sky: 'linear-gradient(180deg, #1e3a8a 0%, #3b82f6 40%, #87CEEB 100%)',
    underwater: 'linear-gradient(180deg, #00CED1 0%, #008B8B 50%, #004D4D 100%)',
    park: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 60%, #228B22 100%)',
    school: 'linear-gradient(180deg, #F0F8FF 0%, #E6E6FA 40%, #D8BFD8 70%, #FFE4E1 100%)', // School classroom vibe
  };

  return (
    <div
      className={`relative overflow-visible rounded-2xl ${className}`}
      style={{
        background: backgrounds[type] || backgrounds.forest,
        minHeight: 300
      }}
    >
      {children}
    </div>
  );
};

export default {
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
};

