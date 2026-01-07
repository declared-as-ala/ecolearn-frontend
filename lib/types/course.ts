/**
 * Course Type Definitions
 * Clean Architecture & Best Practices for Next.js
 */

/**
 * Video metadata for courses
 */
export interface CourseVideo {
  url: string;
  title: string;
  duration?: number; // في الثواني
  thumbnail?: string;
  description?: string;
}

/**
 * Course metadata organized by level
 */
export interface CourseMetadata {
  level: '5eme' | '6eme' | '7eme'; // قابل للتوسعة
  courseId: number; // 1, 2, 3, 4, 5
  order: number; // ترتيب عرض الدورة
  title: string;
  titleAr: string;
  description?: string;
  icon?: string;
  color?: string;
  videoUrl: string;
  badge?: {
    name: string;
    icon: string;
  };
}

/**
 * Video progress tracking
 */
export interface VideoProgress {
  courseId: string;
  videoUrl: string;
  watchPercentage: number; // 0-100
  lastWatchedTime: number; // في الثواني
  totalDuration: number;
  completed: boolean; // >= 90% = completed
  lastUpdated: Date;
}

/**
 * Grade 5 Course Mapping
 * Best Practice: Centralized data structure
 */
export const GRADE_5_COURSES: CourseMetadata[] = [
  {
    level: '5eme',
    courseId: 1,
    order: 1,
    title: 'Food Chain & Environmental Balance',
    titleAr: 'السلسلة الغذائية وحماية توازن الوسط البيئي',
    icon: '🍃',
    color: 'bg-emerald-100',
    videoUrl: '/videos/5eme-1.mp4',
    badge: { name: 'مهندس السلسلة الغذائية', icon: '🌍' },
  },
  {
    level: '5eme',
    courseId: 2,
    order: 2,
    title: 'Climatic Factors in Environment',
    titleAr: 'العوامل المناخية في الوسط البيئي',
    icon: '🌤️',
    color: 'bg-sky-100',
    videoUrl: '/videos/5eme-2.mp4',
    badge: { name: 'خبير المناخ', icon: '🌦️' },
  },
  {
    level: '5eme',
    courseId: 3,
    order: 3,
    title: 'Environmental Balance',
    titleAr: 'التوازن البيئي',
    icon: '⚖️',
    color: 'bg-green-100',
    videoUrl: '/videos/5eme-3.mp4',
    badge: { name: 'حارس التوازن', icon: '⚖️' },
  },
  {
    level: '5eme',
    courseId: 4,
    order: 4,
    title: 'Causes of Environmental Imbalance',
    titleAr: 'أسباب اختلال التوازن البيئي',
    icon: '📉',
    color: 'bg-red-50',
    videoUrl: '/videos/5eme-4.mp4',
    badge: { name: 'درع التوازن', icon: '🛡️' },
  },
  {
    level: '5eme',
    courseId: 5,
    order: 5,
    title: 'Human Role in Environmental Protection',
    titleAr: 'دور الإنسان في حماية البيئة',
    icon: '🤝',
    color: 'bg-blue-100',
    videoUrl: '/videos/5eme-5.mp4',
    badge: { name: 'صديق البيئة', icon: '🤝' },
  },
];

/**
 * Helper function to get course metadata by ID
 */
export const getCourseMetadata = (
  level: '5eme' | '6eme' | '7eme',
  courseId: number
): CourseMetadata | undefined => {
  if (level === '5eme') {
    return GRADE_5_COURSES.find(c => c.courseId === courseId);
  }
  if (level === '6eme') {
    return GRADE_6_COURSES.find(c => c.courseId === courseId);
  }
  // TODO: Add grade 7 mappings
  return undefined;
};

/**
 * Helper function to get video URL by course ID
 */
export const getVideoUrl = (
  level: '5eme' | '6eme' | '7eme',
  courseId: number
): string | undefined => {
  const metadata = getCourseMetadata(level, courseId);
  return metadata?.videoUrl;
};

/**
 * Grade 6 Course Mapping
 */
export const GRADE_6_COURSES: CourseMetadata[] = [
  {
    level: '6eme',
    courseId: 1,
    order: 1,
    title: 'Ecosystem Components',
    titleAr: 'مكوّنات الوسط البيئي',
    icon: '🌊',
    color: 'bg-cyan-50',
    videoUrl: '/videos/6eme-1.mp4',
    badge: { name: 'حارس التوازن البيئي', icon: '⚖️' },
  },
  {
    level: '6eme',
    courseId: 2,
    order: 2,
    title: 'Food Chains',
    titleAr: 'السلاسل الغذائية',
    icon: '🕸️',
    color: 'bg-amber-50',
    videoUrl: '/videos/6eme-2.mp4',
    badge: { name: 'حارس الدورة الأبدية', icon: '🔄🌍' },
  },
  {
    level: '6eme',
    courseId: 3,
    order: 3,
    title: 'Environmental Balance',
    titleAr: 'التوازن البيئي',
    icon: '⚖️',
    color: 'bg-lime-50',
    videoUrl: '/videos/6eme-3.mp4',
    badge: { name: 'حامي التوازن المتكامل', icon: '🌍⚖️' },
  },
  {
    level: '6eme',
    courseId: 4,
    order: 4,
    title: 'Water Pollution',
    titleAr: 'تلوث الأوساط المائية',
    icon: '🚰',
    color: 'bg-indigo-50',
    videoUrl: '/videos/6eme-4.mp4',
    badge: { name: 'بطل المياه النظيفة', icon: '💧🌊' },
  },
];

/**
 * Post-Test Videos
 */
export const POST_TEST_VIDEOS = {
  '5eme': '/videos/test-5eme.mp4',
  '6eme': '/videos/test-6eme.mp4',
};

/**
 * Validate video URL format
 */
export const isValidVideoUrl = (url: string): boolean => {
  return url.startsWith('/videos/') && url.endsWith('.mp4');
};

/**
 * Get post-test video URL
 */
export const getPostTestVideoUrl = (level: '5eme' | '6eme'): string => {
  return POST_TEST_VIDEOS[level];
};

