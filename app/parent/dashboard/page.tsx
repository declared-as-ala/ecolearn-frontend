'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  parentAPI,
  User
} from '@/lib/api';
import ParentDashboardContent from '@/components/parent/ParentDashboardContent';
import { Heart } from 'lucide-react';

export default function ParentDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  const loadInitialData = React.useCallback(async (showLoader = true) => {
    try {
      if (showLoader && !dashboardData) setLoadingData(true);

      const [children, teachers] = await Promise.all([
        parentAPI.getLinkedStudents().catch(() => []),
        parentAPI.getTeachers().catch(() => [])
      ]);

      let selectedChildData = null;
      if (children.length > 0) {
        selectedChildData = await parentAPI.getStudentProfile(children[0]._id || children[0].id).catch(() => null);
      }

      let currentTeacherId = selectedTeacherId;
      if (!currentTeacherId && teachers.length > 0) {
        currentTeacherId = teachers[0]._id || teachers[0].id;
        setSelectedTeacherId(currentTeacherId);
      }

      let messages = [];
      if (currentTeacherId) {
        messages = await parentAPI.getMessages(currentTeacherId).catch(() => []);
      }

      const adaptedData = {
        parent: user ? {
          ...user,
          username: user.username || 'Parent',
          profile: user.profile || { firstName: '', lastName: '', avatar: '' }
        } : null,
        children: children.map((c: any) => ({
          id: c._id || c.id,
          username: c.username,
          profile: c.profile,
          gradeLevel: c.gradeLevel,
          points: c.points || 0,
          badges: c.badges || []
        })),
        selectedChildData: selectedChildData ? {
          overallProgress: selectedChildData.overallProgress || 0,
          subjects: selectedChildData.subjectsProgress || [],
          recentLessons: selectedChildData.recentAttempts?.map((attempt: any) => ({
            id: attempt._id,
            title: attempt.lesson?.title || attempt.quiz?.title || 'نشاط',
            subject: attempt.lesson?.category || 'عام',
            date: new Date(attempt.completedAt || attempt.attemptedAt).toLocaleDateString('ar-EG'),
            score: attempt.percentage || attempt.score || 0,
            status: 'completed'
          })) || [],
          badges: selectedChildData.badges?.map((b: any) => ({
            id: b._id,
            name: b.name,
            description: b.description,
            icon: b.icon || '🏅',
            rarity: b.rarity || 'Common',
            skillMap: b.skillMap || 'مهارة عامة',
            earnedAt: b.earnedAt
          })) || []
        } : null,
        teachers: teachers.map((t: any) => ({
          id: t._id || t.id,
          name: `${t.profile?.firstName || ''} ${t.profile?.lastName || t.username || ''}`.trim(),
          avatar: t.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.username}`,
          subject: 'العلوم والبيئة'
        })),
        messages: messages.map((m: any) => {
          const senderId = m.sender?._id?.toString() || m.sender?.toString() || m.sender;
          const userId = user?.id?.toString() || user?._id?.toString();
          const isParent = senderId === userId;

          return {
            id: m._id,
            content: m.content,
            sender: isParent ? 'parent' : 'teacher',
            timestamp: new Date(m.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
          };
        })
      };

      setDashboardData(adaptedData);
    } catch (error: any) {
      console.error('Failed to load parent dashboard data:', error);
    } finally {
      setLoadingData(false);
    }
  }, [user?.id, selectedTeacherId]); // Remove dashboardData from dependencies

  const hasLoadedRef = React.useRef(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.role !== 'parent') {
      router.replace(`/${user.role}/dashboard`);
      return;
    }

    // Load data only once
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadInitialData(true);
    }

    // Remove auto-refresh to prevent loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user?.id]);

  const handleLinkChild = async (identifier: string) => {
    try {
      await parentAPI.linkStudent(identifier);
      await loadInitialData(true);
    } catch (error: any) {
      throw error;
    }
  };

  const handleSendMessage = async (content: string, teacherId: string) => {
    try {
      await parentAPI.sendMessage(teacherId, content);
      // Refresh immediately
      loadInitialData(false);
    } catch (error: any) {
      console.error('Failed to send message:', error);
    }
  };

  const handleTeacherSelect = (teacherId: string) => {
    // console.log('[Parent Dashboard] Teacher selected:', teacherId);
    setSelectedTeacherId(teacherId);
  };

  if (loading || loadingData) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 font-arabic" dir="rtl">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
          </div>
        </div>
        <p className="mt-6 font-black text-slate-800 tracking-tight text-xl">جاري تحضير لوحة التحكم...</p>
        <p className="text-slate-400 font-bold text-xs uppercase mt-2 tracking-widest">متابعة الأبناء - ECOLEARN</p>
      </div>
    );
  }

  return (
    <ParentDashboardContent
      initialData={dashboardData}
      onLinkChild={handleLinkChild}
      onSendMessage={handleSendMessage}
      selectedTeacherId={selectedTeacherId}
      onSelectTeacher={handleTeacherSelect}
    />
  );
}
