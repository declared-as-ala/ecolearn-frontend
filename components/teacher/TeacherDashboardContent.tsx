'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
    LayoutDashboard, Users, Trophy, BookOpen,
    Settings, LogOut, Medal, Sparkles, ClipboardCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Overview from './Overview';
import StudentRoster from './StudentRoster';
import StudentProfileDetails from './StudentProfileDetails';
import ContentManagement from './ContentManagement';
import QuizManagement from './QuizManagement';
import MessagingHub from './views/MessagingHub';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { MessageCircle } from 'lucide-react';

interface TeacherDashboardContentProps {
    initialData: {
        overview: any;
        students: any[];
        courses: any[];
    };
    onSendFeedback: (studentId: string, message: string) => Promise<void>;
    onResetProgress: (studentId: string) => Promise<void>;
    onUpdateBadge: (badgeId: string, enabled: boolean) => Promise<void>;
    onUpdateCourse: (courseId: string, enabled: boolean) => Promise<void>;
    onAddCourse: (data: any) => Promise<void>;
    onDeleteCourse: (courseId: string) => Promise<void>;
    onFetchStudentProgress: (studentId: string) => Promise<any>;
    onAddExercise: (courseId: string, data: any) => Promise<void>;
    onUpdateExercise: (courseId: string, exerciseId: string, data: any) => Promise<void>;
    onDeleteExercise: (courseId: string, exerciseId: string) => Promise<void>;
    onAddGame: (courseId: string, data: any) => Promise<void>;
    onUpdateGame: (courseId: string, gameId: string, data: any) => Promise<void>;
    onDeleteGame: (courseId: string, gameId: string) => Promise<void>;
    onAdjustDifficulty: (courseId: string, level: string) => void;
    parents: any[];
    selectedParentId: string | null;
    onSelectParent: (id: string) => void;
    messages: any[];
    onSendMessageToParent: (content: string) => Promise<void>;
}

export default function TeacherDashboardContent({
    initialData,
    onSendFeedback,
    onResetProgress,
    onUpdateBadge,
    onUpdateCourse,
    onAddCourse,
    onDeleteCourse,
    onFetchStudentProgress,
    onAddExercise,
    onUpdateExercise,
    onDeleteExercise,
    onAddGame,
    onUpdateGame,
    onDeleteGame,
    onAdjustDifficulty,
    parents,
    selectedParentId,
    onSelectParent,
    messages,
    onSendMessageToParent
}: TeacherDashboardContentProps) {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'content' | 'messages'>('overview');
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [studentProfile, setStudentProfile] = useState<any>(null);
    const [loadingStudent, setLoadingStudent] = useState(false);

    const handleViewStudent = async (student: any) => {
        setLoadingStudent(true);
        setSelectedStudent(student);
        try {
            const profile = await onFetchStudentProgress(student.id);
            setStudentProfile(profile);
            setActiveTab('students');
        } catch (error) {
            console.error("Failed to fetch student profile", error);
        } finally {
            setLoadingStudent(false);
        }
    };

    const handleBackToRoster = () => {
        setSelectedStudent(null);
        setStudentProfile(null);
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-arabic" dir="rtl">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-l border-slate-100 flex flex-col shadow-xl shadow-slate-200/50 z-20">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <Sparkles className="text-white w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">إيكو ليرن</h1>
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] -mt-1">لوحة المعلم</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <SidebarItem
                            icon={<LayoutDashboard />}
                            label="نظرة عامة"
                            active={activeTab === 'overview'}
                            onClick={() => { setActiveTab('overview'); handleBackToRoster(); }}
                        />
                        <SidebarItem
                            icon={<Users />}
                            label="قائمة التلاميذ"
                            active={activeTab === 'students'}
                            onClick={() => { setActiveTab('students'); handleBackToRoster(); }}
                        />
                        <SidebarItem
                            icon={<BookOpen />}
                            label="إدارة المحتوى"
                            active={activeTab === 'content'}
                            onClick={() => { setActiveTab('content'); handleBackToRoster(); }}
                        />
                        <SidebarItem
                            icon={<MessageCircle />}
                            label="بريد أولياء الأمور"
                            active={activeTab === 'messages'}
                            onClick={() => setActiveTab('messages')}
                        />
                    </nav>
                </div>

                <div className="mt-auto p-8 border-t border-slate-50 bg-slate-50/50">
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-black">
                                {user?.username?.substring(0, 1).toUpperCase() || 'P'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-black text-slate-800 text-sm">{user?.username || 'الأستاذ'}</p>
                            <p className="text-[11px] font-bold text-slate-400">معلم معتمد</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-black transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        تسجيل الخروج
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                            {activeTab === 'overview' && 'الإحصائيات العامة'}
                            {activeTab === 'students' && (selectedStudent ? 'ملف التلميذ' : 'إدارة التلاميذ')}
                            {activeTab === 'content' && 'المحتوى التعليمي'}
                            {activeTab === 'messages' && 'بريد أولياء الأمور'}
                        </h2>
                        <p className="text-slate-400 font-bold mt-2 text-lg">
                            {activeTab === 'overview' && 'تابع تقدم تلاميذك وأداء الفصول الدراسية في مكان واحد.'}
                            {activeTab === 'students' && (selectedStudent ? `متابعة مفصلة لتقدم ${selectedStudent.username}` : 'شاهد قائمة التلاميذ وتابع نشاطهم الأخير.')}
                            {activeTab === 'content' && 'قم بإدارة المسارات والدروس والأنشطة التفاعلية.'}
                            {activeTab === 'messages' && 'تواصل مع أولياء الأمور وتابع استفساراتهم.'}
                        </p>
                    </div>

                    {activeTab === 'students' && selectedStudent && (
                        <Button
                            variant="outline"
                            onClick={handleBackToRoster}
                            className="rounded-2xl font-black border-slate-200 px-6 h-12 shadow-sm hover:bg-white"
                        >
                            العودة للقائمة
                        </Button>
                    )}

                    {!selectedStudent && (
                        <div className="flex items-center gap-4">
                            <NotificationCenter />
                        </div>
                    )}
                </header>

                <div className="max-w-7xl mx-auto">
                    {activeTab === 'overview' && (
                        <Overview stats={initialData.overview} engagementData={[]} progressData={[]} />
                    )}

                    {activeTab === 'students' && !selectedStudent && (
                        <StudentRoster
                            students={initialData.students}
                            onViewProfile={handleViewStudent}
                            onResetProgress={(s) => onResetProgress(s.id)}
                            onSendMessage={(s) => { }}
                        />
                    )}

                    {activeTab === 'students' && selectedStudent && (
                        loadingStudent ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <p className="font-black text-slate-400">جاري تحميل بيانات التلميذ...</p>
                            </div>
                        ) : studentProfile && (
                            <StudentProfileDetails
                                student={selectedStudent}
                                profile={studentProfile}
                            />
                        )
                    )}

                    {activeTab === 'content' && (
                        <ContentManagement
                            courses={initialData.courses}
                            onToggleCourse={onUpdateCourse}
                            onAddCourse={onAddCourse}
                            onDeleteCourse={onDeleteCourse}
                            onAddExercise={onAddExercise}
                            onUpdateExercise={onUpdateExercise}
                            onDeleteExercise={onDeleteExercise}
                            onAddGame={onAddGame}
                            onUpdateGame={onUpdateGame}
                            onDeleteGame={onDeleteGame}
                        />
                    )}

                    {activeTab === 'messages' && (
                        <MessagingHub
                            parents={parents || []}
                            selectedParentId={selectedParentId || ''}
                            onSelectParent={onSelectParent}
                            messages={messages}
                            onSendMessage={onSendMessageToParent}
                        />
                    )}
                </div>
            </main>
        </div >
    );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-black text-[15px] ${active
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 translate-x-1'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
        >
            <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}>
                {icon}
            </span>
            {label}
        </button>
    );
}
