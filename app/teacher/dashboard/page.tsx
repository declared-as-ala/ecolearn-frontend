'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  teachersAPI, coursesAPI, feedbackAPI,
} from '@/lib/api';
import TeacherDashboardContent from '@/components/teacher/TeacherDashboardContent';

export default function TeacherDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>({
    overview: null,
    students: [],
    courses: [],
  });
  const [parents, setParents] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const selectedParentRef = useRef<string | null>(null);

  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const loadInitialData = useCallback(async () => {
    try {
      // Only show full-screen loading on very first load
      if (!initialLoadComplete) {
        setLoadingData(true);
      }

      const [overviewData, studentsData, coursesData, parentsData] = await Promise.all([
        teachersAPI.getClassOverview().catch(() => null),
        teachersAPI.getStudents().catch(() => []),
        coursesAPI.getAll(5).catch(() => []),
        teachersAPI.getParents().catch(() => []),
      ]);

      const mappedParents = (parentsData || []).map((p: any) => ({
        id: p._id || p.id,
        name: `${p.profile?.firstName || ''} ${p.profile?.lastName || p.username || ''}`.trim(),
        avatar: p.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.username}`,
        email: p.email
      }));

      setParents(mappedParents);

      if (!selectedParentId && mappedParents.length > 0) {
        setSelectedParentId(mappedParents[0].id);
        selectedParentRef.current = mappedParents[0].id;
      }

      // Adapt overview data
      const adaptedOverview = {
        totalStudents: overviewData?.totalStudents || 0,
        count5eme: overviewData?.count5eme || 0,
        count6eme: overviewData?.count6eme || 0,
        activeStudents: overviewData?.activeStudents || 0,
        avgPoints5eme: overviewData?.avgPoints5eme || 0,
        avgPoints6eme: overviewData?.avgPoints6eme || 0,
        totalBadges: studentsData?.reduce((acc: number, s: any) => acc + (s.badges?.length || 0), 0) || 0,
        coursesCompleted: overviewData?.totalLessonsCompleted || 0
      };

      setData({
        overview: adaptedOverview,
        students: studentsData || [],
        courses: coursesData || [],
      });

      setInitialLoadComplete(true);
    } catch (error) {
      console.error('[Teacher Dashboard] Failed to load dashboard data:', error);
      setError('تعذّر جلب البيانات، الرجاء المحاولة لاحقًا');
    } finally {
      setLoadingData(false);
    }
  }, [initialLoadComplete]); // Removed selectedParentId to prevent reload when switching parents

  const refreshMessages = useCallback(async () => {
    const parentId = selectedParentRef.current;
    if (!parentId || !user?.id) return;

    try {
      const messagesData = await teachersAPI.getMessages(parentId).catch(() => []);
      console.log('[Teacher Dashboard] Messages received:', messagesData.length);

      setMessages((messagesData || []).map((m: any) => {
        const senderId = m.sender?._id?.toString() || m.sender?.toString() || m.sender;
        const userId = user.id?.toString() || user._id?.toString();
        const isTeacher = senderId === userId;

        console.log('[Teacher Dashboard] Message:', {
          messageId: m._id,
          sender: senderId,
          currentUser: userId,
          isTeacher
        });

        return {
          id: m._id,
          content: m.content,
          sender: isTeacher ? 'teacher' : 'parent',
          timestamp: new Date(m.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        };
      }));
    } catch (e) {
      console.error("[Teacher Dashboard] Polling messages failed", e);
    }
  }, [user?.id]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.role !== 'teacher') {
      router.push(`/${user.role}/dashboard`);
      return;
    }

    loadInitialData();
  }, [user, loading, router, loadInitialData]);

  useEffect(() => {
    if (!user) return;

    // Refresh messages immediately when parent changes
    refreshMessages();

    // Set up polling for messages
    const interval = setInterval(refreshMessages, 4000);
    return () => clearInterval(interval);
  }, [user, selectedParentId, refreshMessages]);

  const handleSendFeedback = async (studentId: string, message: string) => {
    try {
      await feedbackAPI.sendFeedback(studentId, message);
    } catch (error) {
      console.error("Feedback failed", error);
    }
  };

  const handleResetProgress = async (studentId: string) => {
    if (confirm("هل أنت متأكد من إعادة تعيين تقدم التلميذ؟")) {
      console.log("Resetting progress for", studentId);
    }
  };

  const handleUpdateBadge = async (badgeId: string, enabled: boolean) => {
    setData((prev: any) => ({
      ...prev,
      badges: prev.badges.map((b: any) => b.id === badgeId ? { ...b, enabled } : b)
    }));
  };

  const handleFetchStudentProgress = async (studentId: string) => {
    return await teachersAPI.getStudentProgress(studentId);
  };

  const handleAddExercise = async (courseId: string, data: any) => {
    await coursesAPI.addExercise(courseId, data);
    loadInitialData();
  };

  const handleUpdateExercise = async (courseId: string, exerciseId: string, data: any) => {
    await coursesAPI.updateExercise(courseId, exerciseId, data);
    loadInitialData();
  };

  const handleDeleteExercise = async (courseId: string, exerciseId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا التمرين؟")) {
      await coursesAPI.deleteExercise(courseId, exerciseId);
      loadInitialData();
    }
  };

  const handleAddGame = async (courseId: string, data: any) => {
    await coursesAPI.addGame(courseId, data);
    loadInitialData();
  };

  const handleUpdateGame = async (courseId: string, gameId: string, data: any) => {
    await coursesAPI.updateGame(courseId, gameId, data);
    loadInitialData();
  };

  const handleDeleteGame = async (courseId: string, gameId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه اللعبة؟")) {
      await coursesAPI.deleteGame(courseId, gameId);
      loadInitialData();
    }
  };

  const handleAddCourse = async (data: any) => {
    await coursesAPI.addCourse(data);
    loadInitialData();
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المسار التعليمي نهائياً؟")) {
      await coursesAPI.deleteCourse(courseId);
      loadInitialData();
    }
  };

  const handleUpdateCourse = async (courseId: string, enabled: boolean) => {
    console.log("Updating course", courseId, enabled);
  };

  const handleSendMessageToParent = async (content: string) => {
    if (!selectedParentId) return;

    console.log('[Teacher Dashboard] Sending message to parent:', selectedParentId);

    // Optimistic update - add message immediately to UI
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      content,
      sender: 'teacher' as const,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, optimisticMessage]);

    try {
      await teachersAPI.sendMessage(selectedParentId, content);
      console.log('[Teacher Dashboard] Message sent successfully');

      // Refresh messages to get server version with real ID
      await refreshMessages();
    } catch (error) {
      console.error("[Teacher Dashboard] Failed to send message", error);

      // Remove optimistic message on failure
      setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));

      // Show error to user
      alert('فشل إرسال الرسالة. الرجاء المحاولة مرة أخرى.');
    }
  };

  const handleSelectParent = (id: string) => {
    console.log('[Teacher Dashboard] Selecting parent:', id);

    // Clear current messages immediately for smooth UX
    setMessages([]);

    // Update state
    setSelectedParentId(id);
    selectedParentRef.current = id;

    // Messages will auto-refresh via the useEffect hook
  };

  if (loading || loadingData) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-arabic font-black text-slate-400">جاري تحميل لوحة المعلم...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white font-arabic" dir="rtl">
        <div className="text-center space-y-4">
          <p className="text-red-500 font-black text-xl">{error}</p>
          <button
            onClick={() => loadInitialData()}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <TeacherDashboardContent
      initialData={data}
      onSendFeedback={handleSendFeedback}
      onResetProgress={handleResetProgress}
      onUpdateBadge={handleUpdateBadge}
      onUpdateCourse={handleUpdateCourse}
      onAddCourse={handleAddCourse}
      onDeleteCourse={handleDeleteCourse}
      onFetchStudentProgress={handleFetchStudentProgress}
      onAddExercise={handleAddExercise}
      onUpdateExercise={handleUpdateExercise}
      onDeleteExercise={handleDeleteExercise}
      onAddGame={handleAddGame}
      onUpdateGame={handleUpdateGame}
      onDeleteGame={handleDeleteGame}
      onAdjustDifficulty={() => { }}
      parents={parents}
      messages={messages}
      selectedParentId={selectedParentId}
      onSelectParent={handleSelectParent}
      onSendMessageToParent={handleSendMessageToParent}
    />
  );
}

