'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, MessageSquare, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    content: string;
    sender: 'parent' | 'teacher';
    timestamp: string;
}

interface Teacher {
    id: string;
    name: string;
    avatar: string;
    subject: string;
}

interface MessagingHubProps {
    teachers: Teacher[];
    selectedTeacherId: string;
    onSelectTeacher: (id: string) => void;
    messages: Message[];
    onSendMessage: (content: string) => Promise<void>;
}

export default function MessagingHub({
    teachers,
    selectedTeacherId,
    onSelectTeacher,
    messages,
    onSendMessage
}: MessagingHubProps) {
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSend = async () => {
        if (!newMessage.trim() || sending) return;
        setSending(true);
        try {
            await onSendMessage(newMessage);
            setNewMessage('');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex flex-col h-[700px] bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden font-arabic">
            <div className="flex flex-1 overflow-hidden">
                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-slate-50/30">
                    {/* Chat Header */}
                    {selectedTeacher ? (
                        <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
                                    <img src={selectedTeacher.avatar} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-right">
                                    <h4 className="text-lg font-black text-slate-900 leading-none">{selectedTeacher.name}</h4>
                                    <p className="text-xs font-bold text-emerald-600 mt-1">{selectedTeacher.subject}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">متصل الآن</span>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-center">
                            <p className="text-slate-400 font-bold">يرجى اختيار معلم للمراسلة</p>
                        </div>
                    )}

                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex flex-col max-w-[80%]",
                                    msg.sender === 'parent' ? "ml-auto items-start" : "mr-auto items-end"
                                )}
                            >
                                <div className={cn(
                                    "px-6 py-4 rounded-3xl text-sm font-bold shadow-sm",
                                    msg.sender === 'parent'
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white text-slate-700 border border-slate-100 rounded-bl-none text-right"
                                )}>
                                    {msg.content}
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 mt-2 px-2 italic">
                                    {msg.timestamp}
                                </span>
                            </div>
                        ))}
                        {messages.length === 0 && selectedTeacher && (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                                <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
                                <p className="font-bold">لا توجد رسائل سابقة</p>
                                <p className="text-xs font-bold mt-1 uppercase tracking-widest">ابدأ المحادثة الآن</p>
                            </div>
                        )}
                        {!selectedTeacher && (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                                <User className="w-16 h-16 mb-4 opacity-50" />
                                <p className="font-bold">يرجى اختيار معلم</p>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-slate-100">
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-[24px] border border-slate-100">
                            <Input
                                placeholder="اكتب رسالتك هنا..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                disabled={!selectedTeacher}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 border-none bg-transparent focus-visible:ring-0 font-bold placeholder:text-slate-400 text-slate-700 text-right"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!newMessage.trim() || sending || !selectedTeacher}
                                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-200 p-0 flex items-center justify-center transition-all"
                            >
                                {sending ? (
                                    <Loader2 className="w-5 h-5" />
                                ) : (
                                    <Send className="w-5 h-5 -rotate-180" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Search/Teachers) */}
                <div className="w-80 border-r border-slate-100 bg-white hidden lg:flex flex-col">
                    <div className="p-6 border-b border-slate-100">
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 text-right">المعلمون</h4>
                        <div className="relative">
                            <Input
                                placeholder="بحث..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-10 bg-slate-50 border-none rounded-xl pr-10 text-xs font-bold text-right"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {filteredTeachers.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => onSelectTeacher(t.id)}
                                className={cn(
                                    "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all mb-2 text-right",
                                    selectedTeacherId === t.id
                                        ? "bg-blue-50 border-blue-100 shadow-sm"
                                        : "border-transparent hover:bg-slate-50"
                                )}
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-100 overflow-hidden shrink-0">
                                    <img src={t.avatar} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-black text-slate-900 truncate">{t.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 truncate">{t.subject}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Loader2({ className }: { className?: string }) {
    return (
        <svg
            className={cn("", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
}
