'use client';

import { useState, useRef } from 'react';
import {
    Home, TrendingUp, Award, Sparkles,
    MessageCircle, Heart, LogOut, Search,
    Bell, ChevronLeft, ChevronRight, Menu,
    Download, FileText, Share2, Printer,
    Settings, UserPlus, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HomeOverview from './views/HomeOverview';
import DetailedProgress from './views/DetailedProgress';
import BadgeGallery from './views/BadgeGallery';
import MessagingHub from './views/MessagingHub';
import LinkStudentModal from './LinkStudentModal';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ParentDashboardContentProps {
    initialData: {
        parent: any;
        children: any[];
        selectedChildData?: any;
        messages: any[];
        teachers?: any[];
    };
    onLinkChild: (studentIdentifier: string) => Promise<void>;
    onSendMessage: (content: string, teacherId: string) => Promise<void>;
    selectedTeacherId?: string | null;
    onSelectTeacher?: (teacherId: string) => void;
}

export default function ParentDashboardContent({
    initialData,
    onLinkChild,
    onSendMessage,
    selectedTeacherId,
    onSelectTeacher
}: ParentDashboardContentProps) {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'badges' | 'ai' | 'wellbeing' | 'messages'>('overview');
    const [selectedChildId, setSelectedChildId] = useState(initialData.children[0]?.id || null);
    const [localSelectedTeacherId, setLocalSelectedTeacherId] = useState(initialData.teachers?.[0]?.id || null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const activeSelectedTeacherId = selectedTeacherId ?? localSelectedTeacherId;

    const selectedChild = initialData.children.find(c => c.id === selectedChildId);

    const handleTeacherSelect = (id: string) => {
        if (onSelectTeacher) {
            onSelectTeacher(id);
        } else {
            setLocalSelectedTeacherId(id);
        }
    };

    const handleSendMessage = async (content: string) => {
        if (!activeSelectedTeacherId) return;
        await onSendMessage(content, activeSelectedTeacherId);
    };

    const menuItems = [
        { id: 'overview', label: 'لوحة التحكم', icon: Home },
        { id: 'progress', label: 'تقدم التعلم', icon: TrendingUp },
        { id: 'badges', label: 'الإنجازات', icon: Award },
        { id: 'messages', label: 'مراسلة المعلم', icon: MessageCircle },
    ];

    const getDisplayName = (child: any) => {
        return `${child.profile?.firstName || ''} ${child.profile?.lastName || child.username || ''}`.trim();
    };

    const parentFullName = `${initialData?.parent?.profile?.firstName || ''} ${initialData?.parent?.profile?.lastName || initialData?.parent?.username || ''}`.trim();

    const handleExportPDF = async () => {
        if (!contentRef.current) return;
        setIsGeneratingReport(true);
        try {
            const canvas = await html2canvas(contentRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#F8FAFC',
                onclone: (clonedDoc) => {
                    // html2canvas doesn't support oklab/oklch/lab colors yet (Tailwind 4 uses them extensively)
                    // We manually find all elements and flatten their colors and shadows to standard formats.
                    const elements = clonedDoc.querySelectorAll('*');
                    const unsupportedPattern = /oklch|oklab|lab/i;

                    elements.forEach((el: any) => {
                        const style = window.getComputedStyle(el);

                        // Check common properties for unsupported colors
                        const propsToClean = [
                            'backgroundColor', 'color', 'borderColor',
                            'boxShadow', 'backgroundImage', 'outlineColor',
                            'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor',
                            'fill', 'stroke'
                        ];

                        propsToClean.forEach(prop => {
                            if (unsupportedPattern.test(style[prop as any])) {
                                if (prop === 'boxShadow') {
                                    el.style.boxShadow = 'none';
                                } else if (prop === 'backgroundImage') {
                                    el.style.backgroundImage = 'none';
                                } else if (prop === 'fill' || prop === 'stroke') {
                                    el.style[prop] = 'currentColor';
                                } else if (prop.includes('Color')) {
                                    el.style[prop] = 'transparent';
                                } else if (prop === 'color') {
                                    el.style.color = '#000000';
                                } else {
                                    el.style[prop] = 'transparent';
                                }
                            }
                        });

                        // Especially check for SVGs which often cause issues
                        if (el.tagName === 'svg' || el.tagName === 'path') {
                            const fill = el.getAttribute('fill');
                            const stroke = el.getAttribute('stroke');
                            if (fill && unsupportedPattern.test(fill)) el.setAttribute('fill', 'currentColor');
                            if (stroke && unsupportedPattern.test(stroke)) el.setAttribute('stroke', 'currentColor');
                        }
                    });
                }
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`report-${selectedChild?.username || 'student'}.pdf`);
        } catch (error) {
            console.error('Failed to generate PDF', error);
        } finally {
            setIsGeneratingReport(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-arabic" dir="rtl">
            {/* Dynamic Background Elements */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-emerald-100/30 rounded-full blur-[80px] -z-10 pointer-events-none" />

            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-white border-l border-slate-200 transition-all duration-300 flex flex-col z-50 shadow-xl shadow-slate-200/50",
                    isSidebarCollapsed ? "w-20" : "w-64"
                )}
            >
                <div className="p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        {!isSidebarCollapsed && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
                                    <span className="text-white font-bold text-xs">ECO</span>
                                </div>
                                <span className="font-black text-xl text-slate-900 tracking-tight">لوحة الولي</span>
                            </div>
                        )}
                        {isSidebarCollapsed && (
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto shadow-md">
                                <span className="text-white font-black text-xs">P</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Child Selector in Sidebar (if multiple) */}
                {!isSidebarCollapsed && initialData.children.length > 0 && (
                    <div className="px-4 mb-6">
                        <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">أبنائي:</p>
                            {initialData.children.map(child => (
                                <button
                                    key={child.id}
                                    onClick={() => setSelectedChildId(child.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-2 rounded-xl transition-all mb-1",
                                        selectedChildId === child.id ? "bg-white shadow-sm ring-1 ring-slate-200" : "hover:bg-white/50"
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center overflow-hidden">
                                        {child.profile?.avatar ? (
                                            <img src={child.profile.avatar} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[10px] font-bold text-blue-600">{child.username?.[0]?.toUpperCase()}</span>
                                        )}
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 truncate">{getDisplayName(child)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={cn(
                                "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-sm",
                                activeTab === item.id
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isSidebarCollapsed && "mx-auto")} />
                            {!isSidebarCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-slate-100 space-y-2">
                    {!isSidebarCollapsed && (
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 font-bold gap-3 rounded-xl"
                            onClick={() => setIsLinkModalOpen(true)}
                        >
                            <UserPlus className="w-5 h-5" />
                            ربط ابن جديد
                        </Button>
                    )}
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all font-bold"
                    >
                        {isSidebarCollapsed ? <ChevronLeft className="w-5 h-5 mx-auto" /> : <ChevronRight className="w-5 h-5" />}
                        {!isSidebarCollapsed && <span>طي القائمة</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white/60 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between z-40">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                <img src={initialData?.parent?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${initialData?.parent?.username || 'user'}`} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-800 leading-none">{parentFullName}</p>
                                <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-widest">ولي أمر</p>
                            </div>
                        </div>

                        <div className="h-8 w-[1px] bg-slate-200" />

                        <h1 className="text-xl font-black text-slate-800 tracking-tight">
                            متابعة <span className="text-blue-600">{selectedChild ? getDisplayName(selectedChild) : 'الأبناء'}</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex gap-2 mr-4">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={isGeneratingReport}
                                className="rounded-full border-slate-200 text-slate-600 font-bold gap-2 text-xs h-10 px-6"
                                onClick={handleExportPDF}
                            >
                                {isGeneratingReport ? (
                                    <Loader2 className="w-3.5 h-3.5" />
                                ) : (
                                    <Download className="w-3.5 h-3.5" />
                                )}
                                التقرير الشهري
                            </Button>
                        </div>

                        <NotificationCenter />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-slate-100">
                                    <Settings className="w-5 h-5 text-slate-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56 rounded-2xl border-none shadow-2xl p-2 font-arabic">
                                <DropdownMenuLabel className="font-black text-slate-400 text-[10px] uppercase tracking-widest">الإعدادات</DropdownMenuLabel>
                                <DropdownMenuItem className="rounded-xl font-bold py-3 text-slate-600">
                                    <Settings className="w-4 h-4 ml-2" /> ملفي الشخصي
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="rounded-xl font-bold py-3 text-red-500 focus:text-red-600 focus:bg-red-50"
                                    onClick={logout}
                                >
                                    <LogOut className="w-4 h-4 ml-2" /> تسجيل الخروج
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Content View */}
                <div className="flex-1 overflow-y-auto p-8 scroll-smooth custom-scrollbar" ref={contentRef}>
                    <div className="max-w-6xl mx-auto space-y-12 pb-20">
                        {activeTab === 'overview' && (
                            <HomeOverview
                                children={initialData.children}
                                onSelectChild={(id) => {
                                    setSelectedChildId(id);
                                    setActiveTab('progress');
                                }}
                            />
                        )}
                        {activeTab === 'progress' && selectedChild && (
                            <DetailedProgress
                                childName={getDisplayName(selectedChild)}
                                data={initialData.selectedChildData}
                            />
                        )}
                        {activeTab === 'badges' && (
                            <BadgeGallery
                                badges={initialData.selectedChildData?.badges || []}
                            />
                        )}
                        {activeTab === 'messages' && (
                            <MessagingHub
                                teachers={initialData.teachers || []}
                                selectedTeacherId={activeSelectedTeacherId || ''}
                                onSelectTeacher={handleTeacherSelect}
                                messages={initialData.messages}
                                onSendMessage={handleSendMessage}
                            />
                        )}

                        {/* Placeholder for AI and Well-being if not fully Arabized yet */}
                        {(activeTab === 'ai' || activeTab === 'wellbeing') && (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
                                <Sparkles className="w-16 h-16 text-blue-100 mb-4" />
                                <h3 className="text-xl font-black text-slate-800">قيد التطوير</h3>
                                <p className="text-slate-400 font-bold mt-2">ستتوفر هذه الميزة باللغة العربية قريباً.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Report Download Floating Action (Mobile) */}
                <div className="fixed bottom-8 left-8 lg:hidden">
                    <Button
                        onClick={handleExportPDF}
                        disabled={isGeneratingReport}
                        className="rounded-full w-14 h-14 bg-emerald-500 hover:bg-emerald-600 shadow-2xl shadow-emerald-200"
                    >
                        {isGeneratingReport ? <Loader2 className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                    </Button>
                </div>
            </main>

            <LinkStudentModal
                isOpen={isLinkModalOpen}
                onClose={() => setIsLinkModalOpen(false)}
                onLink={onLinkChild}
            />
        </div>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return <ChevronLeft className={className} />;
}
