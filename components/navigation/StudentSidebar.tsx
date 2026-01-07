'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, GraduationCap, Settings, LogOut, Leaf, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function StudentSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      href: '/student/courses',
      label: 'الدروس',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      href: '/student/dashboard',
      label: 'مستواي',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      href: '/student/settings',
      label: 'الإعدادات',
      icon: <Settings className="w-5 h-5" />
    },
    {
      href: '#',
      label: 'تسجيل الخروج',
      icon: <LogOut className="w-5 h-5" />,
      onClick: logout
    }
  ];

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';

  return (
    <>
      <aside
        className={`fixed right-0 top-0 h-full ${sidebarWidth} bg-gradient-to-b from-green-50 via-sky-50 to-amber-50 shadow-lg z-40 border-l-2 border-green-200/50 transition-all duration-300`}
        dir="rtl"
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header Section */}
          <div className="p-4 bg-white/50 backdrop-blur-sm border-b border-green-200/50">
            <div className="flex flex-col items-center justify-center gap-2">
              {!isCollapsed && (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-sky-400 flex items-center justify-center shadow-md mb-2">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
              )}
              {isCollapsed && (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-sky-400 flex items-center justify-center shadow-md">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
              )}
              {!isCollapsed && (
                <div className="text-center">
                  <h2 className="text-lg font-bold text-green-700">EcoLearn</h2>
                  <p className="text-xs text-gray-500">إيكو ليرن</p>
                </div>
              )}
            </div>
          </div>

          {/* Collapse Toggle Button */}
          <div className="px-2 py-2 border-b border-green-200/50">
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              variant="ghost"
              size="sm"
              className="w-full rounded-xl text-gray-600 hover:bg-white/70 hover:text-green-600"
            >
              {isCollapsed ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 ml-2" />
                  <span className="text-xs">إخفاء</span>
                </>
              )}
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 space-y-2 overflow-y-auto mt-2">
            {navItems.map((item) => {
              const isActive = item.href === '/student/courses'
                ? pathname.startsWith('/student/courses')
                : item.href === '/student/dashboard'
                  ? pathname === '/student/dashboard'
                  : pathname === item.href;

              const content = (
                <>
                  {/* Icon */}
                  <div className={`
                    transition-transform duration-300
                    ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                  `}>
                    {item.icon}
                  </div>

                  {/* Label */}
                  {!isCollapsed && (
                    <span className={`
                      text-sm font-medium text-center leading-tight
                      ${isActive ? 'text-green-600' : 'text-gray-600'}
                    `}>
                      {item.label}
                    </span>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className={`absolute ${isCollapsed ? 'right-2 top-1/2 transform -translate-y-1/2 w-1 h-8' : 'left-2 top-1/2 transform -translate-y-1/2 w-1 h-8'} bg-green-500 rounded-full`}></div>
                  )}
                </>
              );

              const className = `
                group relative flex ${isCollapsed ? 'flex-col' : 'flex-row'} items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 w-full
                ${isActive
                  ? 'bg-white text-green-600 shadow-md border-2 border-green-200'
                  : 'text-gray-600 hover:bg-white/70 hover:text-green-600 hover:shadow-sm'
                }
              `;

              if (item.onClick) {
                return (
                  <button
                    key={item.href}
                    onClick={item.onClick}
                    className={className}
                    title={item.label}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={className}
                  title={item.label}
                >
                  {content}
                </Link>
              );
            })}
          </nav>

          {/* Footer decoration */}
          <div className="p-3 border-t border-green-200/50 bg-white/30 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center gap-1.5">
              <Leaf className="w-5 h-5 text-green-400 opacity-60" />
              {!isCollapsed && (
                <p className="text-[10px] text-gray-500 text-center leading-tight">
                  EcoLearn 🌱
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Export sidebar state for use in pages */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__SIDEBAR_COLLAPSED__ = ${isCollapsed}; window.__SIDEBAR_WIDTH__ = ${isCollapsed ? 80 : 256};`
        }}
      />
    </>
  );
}
