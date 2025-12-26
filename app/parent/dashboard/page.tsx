'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { usersAPI, notificationsAPI, User, Progress, Notification } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, Bell, Plus, BookOpen, Gamepad2, Trophy } from 'lucide-react';

export default function ParentDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<User[]>([]);
  const [childProgress, setChildProgress] = useState<Record<string, Progress[]>>({});
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [childUsername, setChildUsername] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [linking, setLinking] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user && user.role !== 'parent') {
      router.push(`/${user.role}/dashboard`);
      return;
    }
    if (user) {
      loadData();
    }
  }, [user, loading]);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const [childrenData, notificationsData] = await Promise.all([
        usersAPI.getChildren(),
        notificationsAPI.getAll(true),
      ]);
      setChildren(childrenData);
      setNotifications(notificationsData);
      
      // Load progress for each child
      const progressData: Record<string, Progress[]> = {};
      for (const child of childrenData) {
        try {
          const progress = await usersAPI.getProgress(child.id);
          progressData[child.id] = progress;
        } catch (error) {
          console.error(`Failed to load progress for child ${child.id}:`, error);
        }
      }
      setChildProgress(progressData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLinkChild = async () => {
    if (!childUsername.trim()) return;
    setLinking(true);
    try {
      await usersAPI.linkChild(childUsername.trim());
      setChildUsername('');
      await loadData();
    } catch (error: any) {
      alert(error.message || 'Failed to link child');
    } finally {
      setLinking(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  if (loading || loadingData || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const getChildStats = (childId: string) => {
    const progress = childProgress[childId] || [];
    const completedLessons = progress.filter(p => p.lesson && p.status === 'completed').length;
    const completedGames = progress.filter(p => p.game && p.status === 'completed').length;
    const child = children.find(c => c.id === childId);
    return {
      points: child?.points || 0,
      level: child?.level || 1,
      completedLessons,
      completedGames,
      badges: child?.badges || [],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-600">EcoLearn - Parent Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.username}!</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="children" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              {notifications.length > 0 && (
                <Badge className="ml-2">{notifications.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="children" className="mt-6">
            {/* Link Child */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Link Child Account
                </CardTitle>
                <CardDescription>Enter your child's username to link their account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Child's username"
                    value={childUsername}
                    onChange={(e) => setChildUsername(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLinkChild()}
                  />
                  <Button onClick={handleLinkChild} disabled={linking || !childUsername.trim()}>
                    {linking ? 'Linking...' : 'Link'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Children List */}
            {children.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No children linked yet. Link a child account to view their progress.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {children.map((child) => {
                  const stats = getChildStats(child.id);
                  return (
                    <Card key={child.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{child.username}</CardTitle>
                            <CardDescription>{child.email}</CardDescription>
                          </div>
                          <Badge variant="outline">Level {stats.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Points</p>
                            <p className="text-2xl font-bold flex items-center gap-1">
                              <Trophy className="w-5 h-5 text-yellow-500" />
                              {stats.points}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Lessons</p>
                            <p className="text-2xl font-bold flex items-center gap-1">
                              <BookOpen className="w-5 h-5 text-green-500" />
                              {stats.completedLessons}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Games</p>
                            <p className="text-2xl font-bold flex items-center gap-1">
                              <Gamepad2 className="w-5 h-5 text-purple-500" />
                              {stats.completedGames}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Badges</p>
                            <p className="text-2xl font-bold">{stats.badges.length}</p>
                          </div>
                        </div>
                        {stats.badges.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-semibold mb-2">Badges:</p>
                            <div className="flex flex-wrap gap-2">
                              {stats.badges.map((badge, index) => (
                                <Badge key={index} variant="default">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Updates about your children's progress</CardDescription>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No new notifications
                  </p>
                ) : (
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <Card
                        key={notification._id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleMarkAsRead(notification._id)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                            {!notification.isRead && (
                              <Badge variant="default" className="bg-blue-500">New</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}





