'use client';

import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, Award, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EcoHero from '@/components/cartoons/EcoHero';
import { notificationsAPI } from '@/lib/api';

interface Notification {
  _id: string;
  message: string;
  type: 'lesson_completed' | 'badge_earned' | 'feedback' | 'general' | 'teacher_feedback';
  read: boolean;
  createdAt: string;
}

interface NotificationCenterProps {
  userId?: string;
}

export default function NotificationCenter({ userId }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const notifications = await notificationsAPI.getAll(true);
      setNotifications(notifications || []);
      setUnreadCount((notifications || []).filter((n: Notification) => !n.read).length);
    } catch (error) {
      console.error('Failed to load notifications:', error);
      // Silently fail - don't show error to user
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await notificationsAPI.markAsRead(notificationId);
      setNotifications(notifications.map(n => 
        n._id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'lesson_completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'badge_earned':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'feedback':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationMessage = (notification: Notification) => {
    if (notification.message) return notification.message;
    switch (notification.type) {
      case 'lesson_completed':
        return '🎉 لقد أكملت درساً جديداً!';
      case 'badge_earned':
        return '🏅 حصلت على شارة جديدة!';
      case 'feedback':
        return '💬 لديك رسالة من معلمك!';
      default:
        return '🔔 إشعار جديد';
    }
  };

  return (
    <div className="relative" dir="rtl">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -left-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-12 left-0 z-50 w-80 max-h-96 overflow-y-auto shadow-xl border-2 border-green-200">
            <CardContent className="p-0">
              <div className="sticky top-0 bg-gradient-to-r from-green-100 to-amber-100 p-4 border-b-2 border-green-200 flex items-center justify-between">
                <h3 className="font-bold text-lg text-green-700">الإشعارات</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <EcoHero size="medium" emotion="happy" className="mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد إشعارات جديدة</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 hover:bg-green-50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => !notification.read && markAsRead(notification._id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">
                            {getNotificationMessage(notification)}
                          </p>
                          {!notification.read && (
                            <Badge className="mt-1 bg-blue-500 text-xs">جديد</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

