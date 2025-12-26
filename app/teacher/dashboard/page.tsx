'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { teachersAPI, lessonsAPI, gamesAPI, feedbackAPI, Lesson, Game, User } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { 
  LogOut, Users, TrendingUp, BookOpen, Gamepad2, Plus, X, 
  Search, Eye, Send, Bell, Award, Activity, Calendar,
  CheckCircle, Clock, AlertCircle, Target, Download, FileText,
  ThumbsUp, ThumbsDown, Sparkles, BarChart3, UserCircle
} from 'lucide-react';

// Toast notification helper
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

interface StudentWithProgress extends User {
  stats: {
    completedLessons: number;
    completedGames: number;
    inProgressLessons: number;
    totalProgress: number;
  };
  isActive: boolean;
  lastActivity: Date | null;
}

interface ClassOverview {
  totalStudents: number;
  activeStudents: number;
  averageLevel: number;
  totalLessonsCompleted: number;
  totalGamesCompleted: number;
  averagePoints: number;
  classCode: string | null;
}

export default function TeacherDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [overview, setOverview] = useState<ClassOverview | null>(null);
  const [students, setStudents] = useState<StudentWithProgress[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<StudentWithProgress | null>(null);
  const [studentProgress, setStudentProgress] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dialog states
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showAssignStudent, setShowAssignStudent] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFeedbackMultiple, setShowFeedbackMultiple] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showClassNotification, setShowClassNotification] = useState(false);

  // Form states
  const [studentUsername, setStudentUsername] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackStudentId, setFeedbackStudentId] = useState('');
  const [selectedStudentsForFeedback, setSelectedStudentsForFeedback] = useState<string[]>([]);
  const [classNotificationTitle, setClassNotificationTitle] = useState('');
  const [classNotificationMessage, setClassNotificationMessage] = useState('');

  useEffect(() => {
    if (loading) {
      return; // Wait for auth to finish loading
    }
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (user.role !== 'teacher') {
      router.push(`/${user.role}/dashboard`);
      return;
    }
    
    // Load data for teacher
    loadData();
  }, [user, loading, router]);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const [overviewData, studentsData, lessonsData, gamesData] = await Promise.all([
        teachersAPI.getClassOverview(),
        teachersAPI.getStudents(),
        lessonsAPI.getAll(),
        gamesAPI.getAll(),
      ]);
      
      console.log('Loaded overview data:', overviewData);
      console.log('Loaded students data:', studentsData);
      
      setOverview(overviewData || {
        totalStudents: 0,
        activeStudents: 0,
        averageLevel: 0,
        totalLessonsCompleted: 0,
        totalGamesCompleted: 0,
        averagePoints: 0,
        classCode: null
      });
      setStudents(studentsData || []);
      setLessons(lessonsData || []);
      setGames(gamesData || []);
    } catch (error: any) {
      console.error('Failed to load data:', error);
      // Set defaults on error so UI can still render
      const defaultOverview = {
        totalStudents: 0,
        activeStudents: 0,
        averageLevel: 0,
        totalLessonsCompleted: 0,
        totalGamesCompleted: 0,
        averagePoints: 0,
        classCode: null
      };
      setOverview(defaultOverview);
      setStudents([]);
      setLessons([]);
      setGames([]);
      
      // Only show error toast if it's not a 404 or "no class" type error
      if (!error.message?.includes('class') && error.message !== 'Unauthorized') {
        showToast(error.message || 'Failed to load dashboard data', 'error');
      }
    } finally {
      setLoadingData(false);
    }
  };

  const handleCreateClass = async () => {
    try {
      const result = await teachersAPI.createClass();
      showToast(`Classroom created! Your class code is: ${result.classCode}`, 'success');
      setShowCreateClass(false);
      await loadData();
    } catch (error: any) {
      showToast(error.message || 'Failed to create class', 'error');
    }
  };

  const handleAssignStudent = async () => {
    if (!studentUsername.trim()) {
      showToast('Please enter a student username', 'error');
      return;
    }
    try {
      await teachersAPI.assignStudent(studentUsername.trim());
      showToast('Student assigned successfully!', 'success');
      setShowAssignStudent(false);
      setStudentUsername('');
      await loadData();
    } catch (error: any) {
      showToast(error.message || 'Failed to assign student', 'error');
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to remove this student from your class?')) {
      return;
    }
    try {
      await teachersAPI.removeStudent(studentId);
      showToast('Student removed successfully', 'success');
      await loadData();
    } catch (error: any) {
      showToast(error.message || 'Failed to remove student', 'error');
    }
  };

  const handleSendFeedback = async () => {
    if (!feedbackMessage.trim() || !feedbackStudentId) {
      showToast('Please enter a message and select a student', 'error');
      return;
    }
    try {
      await feedbackAPI.sendFeedback(feedbackStudentId, feedbackMessage);
      showToast('Feedback sent successfully!', 'success');
      setShowFeedback(false);
      setFeedbackMessage('');
      setFeedbackStudentId('');
    } catch (error: any) {
      showToast(error.message || 'Failed to send feedback', 'error');
    }
  };

  const handleSendFeedbackMultiple = async () => {
    if (!feedbackMessage.trim() || selectedStudentsForFeedback.length === 0) {
      showToast('Please enter a message and select at least one student', 'error');
      return;
    }
    try {
      await feedbackAPI.sendFeedbackToMultiple(selectedStudentsForFeedback, feedbackMessage);
      showToast(`Feedback sent successfully to ${selectedStudentsForFeedback.length} student(s)!`, 'success');
      setShowFeedbackMultiple(false);
      setFeedbackMessage('');
      setSelectedStudentsForFeedback([]);
    } catch (error: any) {
      showToast(error.message || 'Failed to send feedback', 'error');
    }
  };

  const handleSendClassNotification = async () => {
    if (!classNotificationMessage.trim()) {
      showToast('Please enter a notification message', 'error');
      return;
    }
    try {
      await feedbackAPI.sendClassNotification(classNotificationTitle || 'Class Announcement', classNotificationMessage);
      showToast(`Notification sent successfully to all ${students.length} student(s)!`, 'success');
      setShowClassNotification(false);
      setClassNotificationTitle('');
      setClassNotificationMessage('');
    } catch (error: any) {
      showToast(error.message || 'Failed to send notification', 'error');
    }
  };

  const handleDownloadReport = async () => {
    try {
      await feedbackAPI.generateReport('csv');
      showToast('Report downloaded successfully!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to download report', 'error');
    }
  };

  const handleViewStudent = async (student: StudentWithProgress) => {
    try {
      const progress = await teachersAPI.getStudentProgress(student.id);
      setStudentProgress(progress);
      setSelectedStudent(student);
      setShowStudentDetails(true);
    } catch (error: any) {
      showToast(error.message || 'Failed to load student progress', 'error');
    }
  };

  const filteredStudents = students.filter(student =>
    student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading only if auth is still loading or data is loading
  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-green-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If no user, show nothing (redirect should happen)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EcoLearn - Teacher Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome, {user.username}!</p>
          </div>
          <div className="flex items-center gap-4">
            {overview?.classCode && (
              <Badge variant="outline" className="text-base px-4 py-2 bg-green-50 border-green-200">
                Class Code: <span className="font-mono font-bold text-green-600 ml-1">{overview.classCode}</span>
              </Badge>
            )}
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Class Overview Section - Always Show */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Total Students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-blue-600">{overview?.totalStudents || 0}</span>
                <Users className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Active Students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-green-600">{overview?.activeStudents || 0}</span>
                <Activity className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Lessons Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-purple-600">{overview?.totalLessonsCompleted || 0}</span>
                <BookOpen className="w-10 h-10 text-purple-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Games Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-orange-600">{overview?.totalGamesCompleted || 0}</span>
                <Gamepad2 className="w-10 h-10 text-orange-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        {overview && overview.classCode && overview.totalStudents > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Class Average
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Level</span>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {overview.averageLevel.toFixed(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Points</span>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {overview.averagePoints.toFixed(0)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => setShowClassNotification(true)} 
                  variant="outline" 
                  className="w-full justify-start"
                  disabled={students.length === 0}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notify Class
                </Button>
                <Button 
                  onClick={handleDownloadReport} 
                  variant="outline" 
                  className="w-full justify-start"
                  disabled={students.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  Class Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => setShowAssignStudent(true)} 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
                <Button 
                  onClick={() => setShowFeedbackMultiple(true)} 
                  variant="outline" 
                  className="w-full justify-start"
                  disabled={students.length === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* B. Student List - Always Show */}
        <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Students</CardTitle>
                  <CardDescription>Monitor progress and manage your students</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button onClick={() => setShowAssignStudent(true)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {students.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold mb-2">No students assigned yet</p>
                  <p className="text-muted-foreground mb-4">Add students to your class to get started</p>
                  <Button onClick={() => setShowAssignStudent(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              ) : (
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <Card key={student.id} className="hover:shadow-md transition-all border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
                              {student.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{student.username}</h3>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                            {student.isActive ? (
                              <Badge variant="default" className="bg-green-500">
                                <Activity className="w-3 h-3 mr-1" />
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Level</div>
                              <div className="text-2xl font-bold text-blue-600">{student.level || 1}</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Points</div>
                              <div className="text-2xl font-bold text-green-600">{student.points || 0}</div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Lessons</div>
                              <div className="text-2xl font-bold text-purple-600">{student.stats.completedLessons}</div>
                            </div>
                            <div className="bg-orange-50 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Games</div>
                              <div className="text-2xl font-bold text-orange-600">{student.stats.completedGames}</div>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Badges</div>
                              <div className="text-2xl font-bold text-yellow-600 flex items-center gap-1">
                                {student.badges?.length || 0}
                                {student.badges && student.badges.length > 0 && (
                                  <Award className="w-5 h-5 text-yellow-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewStudent(student)}
                            className="flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setFeedbackStudentId(student.id);
                              setShowFeedback(true);
                            }}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveStudent(student.id)}
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Student Details Dialog */}
      <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <UserCircle className="w-6 h-6" />
              {selectedStudent?.username} - Detailed Progress
            </DialogTitle>
            <DialogDescription>
              Complete overview of student performance, lessons, games, and behavior
            </DialogDescription>
          </DialogHeader>
          {studentProgress && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">Lessons Completed</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {studentProgress.summary.completedLessons} / {studentProgress.summary.totalLessons}
                    </div>
                    <ProgressBar 
                      value={(studentProgress.summary.completedLessons / studentProgress.summary.totalLessons) * 100} 
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">Games Completed</div>
                    <div className="text-3xl font-bold text-purple-600">
                      {studentProgress.summary.completedGames} / {studentProgress.summary.totalGames}
                    </div>
                    <ProgressBar 
                      value={(studentProgress.summary.completedGames / studentProgress.summary.totalGames) * 100} 
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">Total Points</div>
                    <div className="text-3xl font-bold text-green-600">{studentProgress.summary.totalPoints}</div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">Current Level</div>
                    <div className="text-3xl font-bold text-orange-600">{studentProgress.summary.currentLevel}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Lessons Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Lessons Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentProgress.lessonProgress.map((lp: any) => (
                      <div key={lp.lesson._id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{lp.lesson.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {lp.lesson.category} • {lp.lesson.difficulty}
                            </div>
                          </div>
                          <Badge 
                            variant={lp.status === 'completed' ? 'default' : lp.status === 'in_progress' ? 'secondary' : 'outline'}
                            className="ml-4"
                          >
                            {lp.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {lp.status === 'in_progress' && <Clock className="w-3 h-3 mr-1" />}
                            {lp.status === 'not_started' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {lp.status === 'completed' ? 'Completed' : lp.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                          </Badge>
                        </div>
                        {lp.status === 'completed' && (
                          <div className="text-sm text-muted-foreground mt-2">
                            Completed in {Math.floor(lp.timeSpent / 60)} minutes • {lp.attempts} attempt(s)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Games Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5" />
                    Games Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentProgress.gameProgress.map((gp: any) => (
                      <div key={gp.game._id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{gp.game.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {gp.game.type} • {gp.game.category} • {gp.game.difficulty}
                            </div>
                          </div>
                          <Badge 
                            variant={gp.status === 'completed' ? 'default' : gp.status === 'in_progress' ? 'secondary' : 'outline'}
                            className="ml-4"
                          >
                            {gp.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {gp.status === 'in_progress' && <Clock className="w-3 h-3 mr-1" />}
                            {gp.status === 'not_started' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {gp.status === 'completed' ? 'Completed' : gp.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                          </Badge>
                        </div>
                        {gp.status === 'completed' && (
                          <div className="text-sm text-muted-foreground mt-2">
                            Score: {gp.score} / {gp.maxScore} • {gp.attempts} attempt(s)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Behavioral Indicators */}
              {studentProgress.behavioralIndicators && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Behavioral Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <ThumbsUp className="w-5 h-5 text-green-600" />
                          <div className="text-sm font-medium text-green-800">Positive Behaviors</div>
                        </div>
                        <div className="text-3xl font-bold text-green-600">
                          {studentProgress.behavioralIndicators.positive}
                        </div>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <ThumbsDown className="w-5 h-5 text-red-600" />
                          <div className="text-sm font-medium text-red-800">Negative Behaviors</div>
                        </div>
                        <div className="text-3xl font-bold text-red-600">
                          {studentProgress.behavioralIndicators.negative}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Badges */}
              {selectedStudent?.badges && selectedStudent.badges.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Badges Earned
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.badges.map((badge: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                          <Award className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Single Student Feedback Dialog */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>
              Send personalized feedback to {students.find(s => s.id === feedbackStudentId)?.username || 'student'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Feedback Message</Label>
              <Textarea
                placeholder="Enter your feedback message..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                rows={5}
                className="mt-2"
              />
            </div>
            <Button onClick={handleSendFeedback} disabled={!feedbackMessage.trim()} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Multiple Students Feedback Dialog */}
      <Dialog open={showFeedbackMultiple} onOpenChange={setShowFeedbackMultiple}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Feedback to Multiple Students</DialogTitle>
            <DialogDescription>
              Select students and send feedback to all of them at once
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Students</Label>
              <div className="border rounded-md p-4 max-h-64 overflow-y-auto space-y-2 mt-2">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`feedback-student-${student.id}`}
                      checked={selectedStudentsForFeedback.includes(student.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudentsForFeedback([...selectedStudentsForFeedback, student.id]);
                        } else {
                          setSelectedStudentsForFeedback(selectedStudentsForFeedback.filter(id => id !== student.id));
                        }
                      }}
                      className="rounded"
                    />
                    <label htmlFor={`feedback-student-${student.id}`} className="flex-1 cursor-pointer">
                      {student.username}
                    </label>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    if (selectedStudentsForFeedback.length === students.length) {
                      setSelectedStudentsForFeedback([]);
                    } else {
                      setSelectedStudentsForFeedback(students.map(s => s.id));
                    }
                  }}
                >
                  {selectedStudentsForFeedback.length === students.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
            </div>
            <div>
              <Label>Feedback Message</Label>
              <Textarea
                placeholder="Enter your feedback message..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                rows={5}
                className="mt-2"
              />
            </div>
            <Button 
              onClick={handleSendFeedbackMultiple} 
              disabled={!feedbackMessage.trim() || selectedStudentsForFeedback.length === 0} 
              className="w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Send to {selectedStudentsForFeedback.length} Student(s)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Class Notification Dialog */}
      <Dialog open={showClassNotification} onOpenChange={setShowClassNotification}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Send Class Notification
            </DialogTitle>
            <DialogDescription>
              Send a notification to all {students.length} student(s) in your class
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title (Optional)</Label>
              <Input
                placeholder="Class Announcement"
                value={classNotificationTitle}
                onChange={(e) => setClassNotificationTitle(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                placeholder="Enter your notification message..."
                value={classNotificationMessage}
                onChange={(e) => setClassNotificationMessage(e.target.value)}
                rows={5}
                className="mt-2"
              />
            </div>
            <Button 
              onClick={handleSendClassNotification} 
              disabled={!classNotificationMessage.trim()} 
              className="w-full"
            >
              <Bell className="w-4 h-4 mr-2" />
              Send to All Students
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Classroom Dialog */}
      <Dialog open={showCreateClass} onOpenChange={setShowCreateClass}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Classroom</DialogTitle>
            <DialogDescription>
              Create a new classroom and get a unique class code to share with your students.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Once created, you'll receive a 6-character class code that students can use to join your classroom.
            </p>
            <Button onClick={handleCreateClass} className="w-full">
              Create Classroom
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Student Dialog */}
      <Dialog open={showAssignStudent} onOpenChange={setShowAssignStudent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Student to Class</DialogTitle>
            <DialogDescription>
              Add a student to your class by entering their username.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Student Username</Label>
              <Input
                placeholder="Enter student username"
                value={studentUsername}
                onChange={(e) => setStudentUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAssignStudent()}
                className="mt-2"
              />
            </div>
            <Button onClick={handleAssignStudent} className="w-full" disabled={!studentUsername.trim() || !overview?.classCode}>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
            {!overview?.classCode && (
              <p className="text-sm text-red-500">Please create a classroom first</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
