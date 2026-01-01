const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: string;
  _id?: string;
  username: string;
  email: string;
  role: 'student' | 'teacher' | 'parent';
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  points?: number;
  level?: number;
  badges?: string[];
  gradeLevel?: 5 | 6; // Year 5 or Year 6
  levelTests?: Record<'5eme' | '6eme', LevelTestStatus>;
}

export interface LevelTestStatus {
  completed: boolean;
  score?: number;
  category?: string | null;
  level: '5eme' | '6eme';
  completedAt?: string | null;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  thumbnail?: string;
  category: string;
  difficulty: string;
  duration: number;
  points: number;
  order: number;
}

export interface Game {
  _id: string;
  title: string;
  description: string;
  type: 'quiz' | 'dragdrop' | 'memory' | 'scenario' | 'challenge';
  category: string;
  difficulty: string;
  gameData: any;
  points: number;
  timeLimit: number;
}

export interface Course {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  gradeLevel: 5 | 6;
  order: number;
  videoUrl?: string;
  thumbnail?: string;
  sections?: {
    video?: {
      url?: string;
      duration?: number;
    };
    exercises?: Array<{
      id: string;
      type: string;
      title: string;
      content: any;
      points: number;
      order: number;
    }>;
    games?: Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      gameData: any;
      points: number;
      order: number;
      unlockAfter?: string;
    }>;
  };
  progress?: {
    videoWatched?: boolean;
    completedExercises?: number;
    completedGames?: number;
    totalExercises?: number;
    totalGames?: number;
    progressPercent?: number;
    completed?: boolean;
    exercisesStatus?: Record<string, any>;
    gamesStatus?: Record<string, any>;
    totalPoints?: number;
    videoProgress?: any;
  };
}

export interface Progress {
  _id: string;
  user: string;
  lesson?: Lesson;
  game?: Game;
  courseSection?: 'video' | 'exercise' | 'game';
  sectionId?: string;
  status: string;
  score: number;
  maxScore: number;
  timeSpent: number;
  attempts: number;
  completedAt?: string;
}

export interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface QuizQuestion {
  _id?: string;
  text: string;
  image?: string;
  type: 'mcq' | 'truefalse' | 'multiple' | 'image' | 'scenario';
  options: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  explanation?: string;
  points: number;
  order: number;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  gradeLevel: 5 | 6;
  courseId: string;
  totalPoints: number;
  timeLimit?: number | null;
  passScore: number;
  status: 'draft' | 'published';
  version: number;
  questions: QuizQuestion[];
  teacher: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttempt {
  _id: string;
  user: string | any;
  quiz: string | Quiz;
  quizVersion: number;
  score: number;
  percentage: number;
  results: Array<{
    questionId: string;
    studentAnswer: any;
    isCorrect: boolean;
    pointsEarned: number;
  }>;
  timeSpent: number;
  status: 'pass' | 'fail';
  attemptedAt: string;
}

// Get auth token from localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Set auth token
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Remove auth token
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// API request helper
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Add timestamp to prevent caching for GET requests
  let url = `${API_URL}${endpoint}`;
  if ((options.method === 'GET' || !options.method) && !endpoint.includes('_t=')) {
    url += endpoint.includes('?') ? `&_t=${Date.now()}` : `?_t=${Date.now()}`;
  }

  console.log(`🌐 [apiRequest] Making ${options.method || 'GET'} request to:`, url);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });

  console.log(`📡 [apiRequest] Response status:`, response.status, 'for', endpoint);

  if (response.status === 401) {
    // Unauthorized - throw error and let the caller (AuthContext) handle it
    throw new Error('Unauthorized');
  }

  // Allow 304 (Not Modified) as a valid response
  if (!response.ok && response.status !== 304) {
    const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response;
};

// Auth API
export const authAPI = {
  register: async (data: {
    username: string;
    email: string;
    password: string;
    role: string;
    profile?: any;
  }): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Registration failed');
    return result;
  },

  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Login failed');
    return result;
  },

  getMe: async (): Promise<User> => {
    const response = await apiRequest('/auth/me');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to get user');
    return result;
  },
};

// Lessons API
export const lessonsAPI = {
  getAll: async (params?: { category?: string; difficulty?: string }): Promise<Lesson[]> => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const endpoint = `/lessons${query ? `?${query}` : ''}`;
      console.log('📚 [lessonsAPI.getAll] Starting - endpoint:', endpoint);
      const response = await apiRequest(endpoint);
      console.log('📚 [lessonsAPI.getAll] Response received - status:', response.status, 'ok:', response.ok);

      // Check if response is ok (200-299) or 304
      if (response.status === 304) {
        console.warn('Lessons: Got 304 (cached) - making fresh request');
        // For 304, make a fresh request with cache-busting
        const freshEndpoint = `/lessons?_t=${Date.now()}`;
        const freshResponse = await apiRequest(freshEndpoint);
        const result = await freshResponse.json();
        console.log('Lessons result (fresh):', Array.isArray(result) ? `${result.length} items` : 'not an array');
        return Array.isArray(result) ? result : [];
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('Lessons result:', Array.isArray(result) ? `${result.length} items` : 'not an array', result);
      return Array.isArray(result) ? result : [];
    } catch (error: any) {
      console.error('Lessons API error:', error);
      throw error;
    }
  },

  getOne: async (id: string): Promise<Lesson> => {
    try {
      const response = await apiRequest(`/lessons/${id}`);
      const result = await response.json();
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch lesson');
    }
  },

  start: async (id: string): Promise<any> => {
    const response = await apiRequest(`/lessons/${id}/start`, { method: 'POST' });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to start lesson');
    return result;
  },

  complete: async (id: string, timeSpent: number): Promise<any> => {
    const response = await apiRequest(`/lessons/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify({ timeSpent }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to complete lesson');
    return result;
  },
};

// Games API
export const gamesAPI = {
  getAll: async (params?: { type?: string; category?: string; difficulty?: string }): Promise<Game[]> => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const endpoint = `/games${query ? `?${query}` : ''}`;
      console.log('🎮 [gamesAPI.getAll] Starting - endpoint:', endpoint);
      const response = await apiRequest(endpoint);
      console.log('🎮 [gamesAPI.getAll] Response received - status:', response.status);

      // Check if response is ok (200-299) or 304
      if (response.status === 304) {
        console.warn('Games: Got 304 (cached) - making fresh request');
        // For 304, make a fresh request with cache-busting
        const freshEndpoint = `/games?_t=${Date.now()}`;
        const freshResponse = await apiRequest(freshEndpoint);
        const result = await freshResponse.json();
        console.log('Games result (fresh):', Array.isArray(result) ? `${result.length} items` : 'not an array');
        return Array.isArray(result) ? result : [];
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('Games result:', Array.isArray(result) ? `${result.length} items` : 'not an array', result);
      return Array.isArray(result) ? result : [];
    } catch (error: any) {
      console.error('Games API error:', error);
      throw error;
    }
  },

  getOne: async (id: string): Promise<Game> => {
    const response = await apiRequest(`/games/${id}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch game');
    return result;
  },

  submitScore: async (
    id: string,
    data: { score: number; maxScore: number; answers?: any[]; timeSpent?: number }
  ): Promise<any> => {
    const response = await apiRequest(`/games/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to submit score');
    return result;
  },
};

// Users API
export const usersAPI = {
  getProgress: async (userId?: string): Promise<Progress[]> => {
    try {
      const endpoint = userId ? `/users/progress/${userId}` : '/users/progress';
      const response = await apiRequest(endpoint);
      const result = await response.json();
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch progress');
    }
  },

  getLeaderboard: async (limit?: number): Promise<User[]> => {
    try {
      const query = limit ? `?limit=${limit}` : '';
      const response = await apiRequest(`/users/leaderboard${query}`);
      // 304 is ok (cached response)
      if (response.status !== 304 && !response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('Leaderboard API error:', error);
      throw error;
    }
  },

  getChildren: async (): Promise<User[]> => {
    const response = await apiRequest('/users/children');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch children');
    return result;
  },

  linkChild: async (childUsername: string): Promise<any> => {
    const response = await apiRequest('/users/children/link', {
      method: 'POST',
      body: JSON.stringify({ childUsername }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to link child');
    return result;
  },

  getStudents: async (): Promise<User[]> => {
    const response = await apiRequest('/users/students');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch students');
    return result;
  },

  getProfile: async (id: string): Promise<User> => {
    const response = await apiRequest(`/users/profile/${id}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to get profile');
    return result;
  },

  updateProfile: async (profile: any): Promise<User> => {
    const response = await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ profile }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update profile');
    return result;
  },

  updateGradeLevel: async (gradeLevel: 5 | 6): Promise<User> => {
    const response = await apiRequest('/users/grade-level', {
      method: 'PUT',
      body: JSON.stringify({ gradeLevel }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update grade level');
    return result.user || result;
  },

  addPoints: async (data: {
    points: number;
    type?: string;
    description?: string;
    courseId?: string;
    activityId?: string;
  }): Promise<any> => {
    const response = await apiRequest('/users/progress/add-points', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to add points');
    return result;
  },
};

// Courses API
export const coursesAPI = {
  getAll: async (gradeLevel: 5 | 6): Promise<Course[]> => {
    const response = await apiRequest(`/courses?gradeLevel=${gradeLevel}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to get courses');
    return result;
  },

  getOne: async (courseId: string): Promise<Course> => {
    const response = await apiRequest(`/courses/${courseId}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to get course');
    return result;
  },

  watchVideo: async (courseId: string, timeSpent?: number): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/video/watch`, {
      method: 'POST',
      body: JSON.stringify({ timeSpent }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to mark video as watched');
    return result;
  },

  submitExercise: async (courseId: string, exerciseId: string, data: {
    answers?: any;
    score?: number;
    maxScore?: number;
  }): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/exercises/${exerciseId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to submit exercise');
    return result;
  },

  submitGame: async (courseId: string, gameId: string, data: {
    score?: number;
    maxScore?: number;
    results?: any;
  }): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/games/${gameId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to submit game');
    return result;
  },

  // Management
  addExercise: async (courseId: string, data: any): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/exercises`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  updateExercise: async (courseId: string, exerciseId: string, data: any): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/exercises/${exerciseId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  deleteExercise: async (courseId: string, exerciseId: string): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/exercises/${exerciseId}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
  addGame: async (courseId: string, data: any): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/games`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  updateGame: async (courseId: string, gameId: string, data: any): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/games/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  deleteGame: async (courseId: string, gameId: string): Promise<any> => {
    const response = await apiRequest(`/courses/${courseId}/games/${gameId}`, {
      method: 'DELETE',
    });
    return await response.json();
  },

  addCourse: async (data: any): Promise<Course> => {
    const response = await apiRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  deleteCourse: async (id: string): Promise<any> => {
    const response = await apiRequest(`/courses/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
};

// Quizzes API
export const quizzesAPI = {
  getAll: async (params?: { gradeLevel?: number; status?: string }): Promise<Quiz[]> => {
    const query = new URLSearchParams(params as any).toString();
    const response = await apiRequest(`/quizzes${query ? `?${query}` : ''}`);
    return await response.json();
  },

  getOne: async (id: string): Promise<Quiz> => {
    const response = await apiRequest(`/quizzes/${id}`);
    return await response.json();
  },

  create: async (data: Partial<Quiz>): Promise<Quiz> => {
    const response = await apiRequest('/quizzes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  update: async (id: string, data: Partial<Quiz>): Promise<Quiz> => {
    const response = await apiRequest(`/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  delete: async (id: string): Promise<any> => {
    const response = await apiRequest(`/quizzes/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },

  addQuestion: async (quizId: string, data: Partial<QuizQuestion>): Promise<Quiz> => {
    const response = await apiRequest(`/quizzes/${quizId}/questions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  updateQuestion: async (quizId: string, questionId: string, data: Partial<QuizQuestion>): Promise<Quiz> => {
    const response = await apiRequest(`/quizzes/${quizId}/questions/${questionId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  deleteQuestion: async (quizId: string, questionId: string): Promise<Quiz> => {
    const response = await apiRequest(`/quizzes/${quizId}/questions/${questionId}`, {
      method: 'DELETE',
    });
    return await response.json();
  },

  getResults: async (id: string): Promise<QuizAttempt[]> => {
    const response = await apiRequest(`/quizzes/${id}/results`);
    return await response.json();
  },

  submitAttempt: async (data: any): Promise<QuizAttempt> => {
    const response = await apiRequest('/quizzes/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await response.json();
  },
};


// Level Test API
export const levelTestAPI = {
  getStatus: async (level: '5eme' | '6eme'): Promise<LevelTestStatus> => {
    const response = await apiRequest(`/level-test/status?level=${level}`);
    const result = await response.json();
    return {
      completed: !!result.completed,
      score: result.score,
      category: result.category,
      level: result.level || level,
      completedAt: result.completedAt || null,
    };
  },

  submit: async (data: {
    level: '5eme' | '6eme';
    answers: any[];
    score: number;
    category: string;
  }): Promise<LevelTestStatus> => {
    const response = await apiRequest('/level-test/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit level test');
    }
    return {
      completed: !!result.completed,
      score: result.score,
      category: result.category,
      level: result.level,
      completedAt: result.completedAt || null,
    };
  },
};

// Notifications API
export const notificationsAPI = {
  getAll: async (unreadOnly?: boolean): Promise<Notification[]> => {
    const query = unreadOnly ? '?unreadOnly=true' : '';
    const response = await apiRequest(`/notifications${query}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch notifications');
    return result;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await apiRequest(`/notifications/${id}/read`, { method: 'PUT' });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to mark as read');
    return result;
  },

  markAllAsRead: async (): Promise<void> => {
    const response = await apiRequest('/notifications/read-all', { method: 'PUT' });
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'Failed to mark all as read');
    }
  },
};

// Feedback API (for teachers)
export const feedbackAPI = {
  sendFeedback: async (studentId: string, message: string): Promise<any> => {
    const response = await apiRequest('/feedback/send', {
      method: 'POST',
      body: JSON.stringify({ studentId, message }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to send feedback');
    return result;
  },

  sendFeedbackToMultiple: async (studentIds: string[], message: string): Promise<any> => {
    const response = await apiRequest('/feedback/send-multiple', {
      method: 'POST',
      body: JSON.stringify({ studentIds, message }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to send feedback');
    return result;
  },

  sendClassNotification: async (title: string, message: string): Promise<any> => {
    const response = await apiRequest('/feedback/send-class-notification', {
      method: 'POST',
      body: JSON.stringify({ title, message }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to send class notification');
    return result;
  },

  getBehavioralPatterns: async (studentId: string): Promise<any> => {
    const response = await apiRequest(`/feedback/behavior/${studentId}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch behavioral patterns');
    return result;
  },

  generateReport: async (format: 'json' | 'csv' = 'json'): Promise<any> => {
    if (format === 'csv') {
      // For CSV, use fetch directly to get blob
      const token = getToken();
      const url = `${API_URL}/feedback/report?format=csv&_t=${Date.now()}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to download report' }));
        throw new Error(error.message || 'Failed to download report');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `class-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
      return { success: true };
    } else {
      const response = await apiRequest(`/feedback/report?format=${format}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to generate report');
      return result;
    }
  },
};

// Teachers API
export const teachersAPI = {
  // Class management
  createClass: async (): Promise<{ classCode: string }> => {
    const response = await apiRequest('/teachers/class/create', { method: 'POST' });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to create class');
    return result;
  },

  getClassOverview: async (): Promise<any> => {
    const response = await apiRequest('/teachers/class/overview');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to get class overview');
    return result;
  },

  // Student management
  assignStudent: async (username: string): Promise<any> => {
    const response = await apiRequest('/teachers/students/assign', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to assign student');
    return result;
  },

  removeStudent: async (studentId: string): Promise<void> => {
    const response = await apiRequest(`/teachers/students/${studentId}`, { method: 'DELETE' });
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'Failed to remove student');
    }
  },

  getStudents: async (params?: { level?: number }): Promise<any[]> => {
    const query = params?.level ? `?level=${params.level}` : '';
    const response = await apiRequest(`/teachers/students${query}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to get students');
    return result;
  },

  getStudentProgress: async (studentId: string): Promise<any> => {
    const response = await apiRequest(`/teachers/students/${studentId}/progress`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to get student progress');
    return result;
  },

  // Activity assignment
  assignActivity: async (data: {
    activityType: 'lesson' | 'game';
    activityId: string;
    studentIds: string[];
    deadline?: string;
    difficulty?: string;
  }): Promise<any> => {
    const response = await apiRequest('/teachers/assign', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to assign activity');
    return result;
  },

  // Messaging
  getParents: async (): Promise<any[]> => {
    const response = await apiRequest('/teachers/parents');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch parents');
    return result;
  },

  getMessages: async (parentId: string): Promise<any[]> => {
    const response = await apiRequest(`/teachers/messages/${parentId}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch messages');
    return result;
  },

  sendMessage: async (parentId: string, message: string): Promise<any> => {
    const response = await apiRequest('/teachers/messages', {
      method: 'POST',
      body: JSON.stringify({ parentId, message }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to send message');
    return result;
  },
};

// Parent API
export const parentAPI = {
  getLinkedStudents: async (): Promise<any[]> => {
    const response = await apiRequest('/parent/students');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch linked students');
    return result;
  },

  getStudentProfile: async (studentId: string): Promise<any> => {
    const response = await apiRequest(`/parent/students/${studentId}/profile`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch student profile');
    return result;
  },

  linkStudent: async (studentIdentifier: string): Promise<any> => {
    const response = await apiRequest('/parent/link-student', {
      method: 'POST',
      body: JSON.stringify({ studentIdentifier }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to link student');
    return result;
  },

  getTeachers: async (): Promise<any[]> => {
    const response = await apiRequest('/parent/teachers');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch teachers');
    return result;
  },

  sendMessage: async (teacherId: string, message: string): Promise<any> => {
    const response = await apiRequest('/parent/messages', {
      method: 'POST',
      body: JSON.stringify({ teacherId, message }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to send message');
    return result;
  },

  getMessages: async (teacherId: string): Promise<any[]> => {
    const response = await apiRequest(`/parent/messages/${teacherId}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch messages');
    return result;
  },
};

