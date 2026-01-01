'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
    Trophy, Plus, Info, Settings2
} from 'lucide-react';

interface BadgeDefinition {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'Common' | 'Rare' | 'Legendary';
    unlockRate: number;
    condition: string;
    enabled: boolean;
}

interface GamificationManagerProps {
    badges: BadgeDefinition[];
    onToggleBadge: (badgeId: string, enabled: boolean) => void;
    onCreateBadge: () => void;
}

export default function GamificationManager({ badges, onToggleBadge, onCreateBadge }: GamificationManagerProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-arabic" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-black flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-amber-500" />
                        نظام الأوسمة والتحفيز
                    </h3>
                    <p className="text-sm font-bold text-slate-500 mt-1">تحديد وإدارة الإنجازات لزيادة دافعية التلاميذ للتعلم.</p>
                </div>
                <Button onClick={onCreateBadge} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-none shadow-lg shadow-amber-100 font-black rounded-xl px-6 h-12 transition-all hover:scale-105">
                    <Plus className="w-4 h-4 ml-2" />
                    إنشاء وسام جديد
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((badge) => (
                    <Card key={badge.id} className="group relative overflow-hidden border-slate-200 shadow-sm hover:shadow-xl transition-all rounded-3xl">
                        <CardHeader className="pb-4 px-6 pt-6">
                            <div className="flex justify-between items-start">
                                <div className={cn(
                                    "p-4 rounded-2xl shadow-sm transition-transform group-hover:scale-110",
                                    badge.rarity === 'Legendary' && "bg-amber-100 text-amber-600",
                                    badge.rarity === 'Rare' && "bg-purple-100 text-purple-600",
                                    badge.rarity === 'Common' && "bg-blue-100 text-blue-600",
                                )}>
                                    <div className="text-3xl">{badge.icon}</div>
                                </div>
                                <div className="flex flex-col items-start gap-3">
                                    <Switch
                                        checked={badge.enabled}
                                        onCheckedChange={(checked) => onToggleBadge(badge.id, checked)}
                                    />
                                    <Badge variant="outline" className={cn(
                                        "text-[10px] font-black px-2.5 py-0.5 uppercase tracking-tighter rounded-full",
                                        badge.rarity === 'Legendary' && "border-amber-200 text-amber-600 bg-amber-50",
                                        badge.rarity === 'Rare' && "border-purple-200 text-purple-600 bg-purple-50",
                                        badge.rarity === 'Common' && "border-blue-200 text-blue-600 bg-blue-50",
                                    )}>
                                        {badge.rarity === 'Legendary' ? 'أسطوري' : badge.rarity === 'Rare' ? 'نادر' : 'شائع'}
                                    </Badge>
                                </div>
                            </div>
                            <CardTitle className="text-lg mt-4 font-black text-slate-800">{badge.name}</CardTitle>
                            <CardDescription className="text-xs font-bold text-slate-400 line-clamp-2 leading-relaxed mt-1">
                                {badge.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2 pb-6 px-6 space-y-5">
                            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <Settings2 className="w-4 h-4 text-slate-400" />
                                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">شرط الحصول على الوسام</span>
                                </div>
                                <p className="text-xs text-slate-700 font-black italic">"{badge.condition}"</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col flex-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight mb-2">نسبة الحصول عليه بين التلاميذ</span>
                                    <div className="flex items-center gap-3">
                                        <div className="text-base font-black text-slate-800">{badge.unlockRate}%</div>
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                            <div
                                                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${badge.unlockRate}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full mr-4">
                                    <Info className="w-5 h-5" />
                                </Button>
                            </div>
                        </CardContent>

                        {!badge.enabled && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center z-10 transition-all">
                                <Badge variant="secondary" className="bg-slate-900 text-white border-none shadow-2xl px-6 py-1.5 font-black tracking-widest text-xs">
                                    مُعطّل الآن
                                </Badge>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
