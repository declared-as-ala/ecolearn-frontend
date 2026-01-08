import type { StoryboardVideoSpec } from '@/components/CourseStoryboardVideo';
import type { ExerciseV2 } from '@/components/course/exercises/types';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// Grade 5 courses
import { foodRelationshipsGrade5 } from '@/lib/courses/grade5/foodRelationships';
import { climaticFactorsGrade5 } from '@/lib/courses/grade5/climaticFactors';
import { ecoBalanceGrade5 } from '@/lib/courses/grade5/ecoBalance';
import { imbalanceCausesGrade5 } from '@/lib/courses/grade5/imbalanceCauses';
import { humanRoleGrade5 } from '@/lib/courses/grade5/humanRole';

// Grade 6 courses
import { ecoComponentsCourse } from '@/lib/courses/grade6/ecoComponents';
import { foodChainsCourse } from '@/lib/courses/grade6/foodChains';
import { ecoBalanceCourse } from '@/lib/courses/grade6/ecoBalance';
import { waterPollutionCourse } from '@/lib/courses/grade6/waterPollution';

export interface Exercise {
    id: string;
    type: 'quiz' | 'drag-drop' | 'matching' | 'sequencing' | 'truefalse' | 'scenario' | 'decision' | 'sticker';
    question: string;
    options?: string[];
    correctAnswer: unknown;
    points: number;
}

export interface Game {
    id: string;
    type:
    | 'simulation'
    | 'roleplay'
    | 'construction'
    | 'matching'
    | 'audio'
    | 'decision'
    | 'sticker'
    | 'rescue'
    | 'dragdrop'
    | 'scenario'
    | 'runner'
    | 'map'
    | 'flow'
    | 'lab'
    | 'water-lab'
    | 'guardian'
    | 'life-chain'
    | 'decision-maker'
    | 'climate-balance'
    | 'who-can-live-here'
    | 'creatures-journey'
    | 'junior-weather-observer'
    | 'balance-of-life'
    | 'broken-chain'
    | 'save-ecosystem'
    | 'food-chain-race'
    | 'guardian-balance'
    | 'food-web-builder'
    | 'daily-eco-hero'
    | 'build-sustainable-ecosystem'
    | 'collective-rescue-mission'
    | 'wrong-decision-cascade'
    | 'discover-collapse-cause'
    | 'before-after'
    | 'eco-equation'
    | 'domino-effect'
    | 'stability-or-chaos'
    | 'classify-ecosystem'
    | 'who-depends-on-who'
    | 'incomplete-system'
    | 'build-correct-chain'
    | 'where-did-energy-go'
    | 'without-decomposers'
    | 'pollution-source'
    | 'water-quality-test'
    | 'smart-cleanup'
    | 'river-cleanup-mission';
    title: string;
    description: string;
    points?: number;
    gameData?: unknown;
}

export interface Video {
    title: string;
    url: string;
    language: 'ar' | 'en' | 'fr';
    verified: boolean;
    needsArabicDub?: boolean;
}

export interface Course {
    id: string;
    title: string;
    grade: 5 | 6;
    icon: string;
    color: string;
    backgroundMusicUrl?: string;
    videoUrl?: string; // Keep for backward compatibility
    videos?: Video[]; // Array of videos
    videoConcept: {
        title: string;
        scenario: string;
        moralMessage: string;
    };
    exercises: Exercise[];
    // New: richer exercises for grade 5 & 6
    exercisesV2?: ExerciseV2[];
    games: Game[];
    // Legacy: storyboard-like video spec (fallback)
    videoStoryboard?: StoryboardVideoSpec;
    // NEW: Full animated video data with multiple scenes
    animatedVideo?: AnimatedVideoData;
    // Motivational messages for student/parent + universal badge
    rewardMessages?: {
        student: string;
        parent: string;
        universalGoldBadge: { name: string; icon: string };
    };
    badge: {
        name: string;
        icon: string;
    };
}

export const coursesData: Course[] = [
    // --- YEAR 5 (5ème) ---
    foodRelationshipsGrade5,
    climaticFactorsGrade5,
    ecoBalanceGrade5,
    imbalanceCausesGrade5,
    humanRoleGrade5,

    // --- YEAR 6 (6ème) ---
    ecoComponentsCourse,
    foodChainsCourse,
    ecoBalanceCourse,
    waterPollutionCourse,
];
