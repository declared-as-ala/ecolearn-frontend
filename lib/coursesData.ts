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
import { respiratorySafetyCourse } from '@/lib/courses/grade6/respiratorySafety';
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
        | 'lab';
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
    respiratorySafetyCourse,
    ecoComponentsCourse,
    foodChainsCourse,
    ecoBalanceCourse,
    waterPollutionCourse,
];
