'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Award, Info
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface BadgeInfo {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'Common' | 'Rare' | 'Legendary';
    skillMap: string;
    earnedAt?: string;
}

interface BadgeGalleryProps {
    badges: BadgeInfo[];
}

export default function BadgeGallery({ badges }: BadgeGalleryProps) {
    const rarityLabels: Record<string, string> = {
        'Common': 'شائعة',
        'Rare': 'نادرة',
        'Legendary': 'أسطورية'
    };

    return (
        <div className="space-y-8 font-arabic animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900">
                        <Award className="w-8 h-8 text-amber-500" />
                        الأوسمة والشارات
                    </h3>
                    <p className="text-sm font-bold text-slate-400 mt-1">دليل مرئي للمهارات التي أتقنها ابنك خلال رحلته.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {badges.map((badge) => (
                    <TooltipProvider key={badge.id}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Card className={cn(
                                    "relative group overflow-hidden border-none shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all cursor-help rounded-[32px]",
                                    badge.earnedAt ? "bg-white" : "bg-slate-50 grayscale opacity-40"
                                )}>
                                    {badge.earnedAt && (
                                        <div className="absolute -top-1 px-4 py-1 right-[-15px] rotate-12 bg-amber-400 text-[10px] font-black text-white shadow-sm z-10 tracking-widest">
                                            مكتملة!
                                        </div>
                                    )}
                                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                        <div className={cn(
                                            "w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-inner transition-transform group-hover:scale-110",
                                            badge.rarity === 'Legendary' && "bg-amber-100",
                                            badge.rarity === 'Rare' && "bg-purple-100",
                                            badge.rarity === 'Common' && "bg-blue-100",
                                        )}>
                                            {badge.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-800 line-clamp-1">{badge.name}</h4>
                                            <div className="mt-2 text-right">
                                                <Badge variant="outline" className="text-[10px] px-2 py-0.5 h-5 font-bold text-slate-400 border-slate-200">
                                                    {rarityLabels[badge.rarity]}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[240px] p-6 bg-slate-900 text-white rounded-[24px] border-none shadow-2xl font-arabic" dir="rtl">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{badge.icon}</div>
                                        <span className="font-black text-base">{badge.name}</span>
                                    </div>
                                    <p className="text-xs text-slate-300 font-bold leading-relaxed">"{badge.description}"</p>
                                    <div className="pt-3 border-t border-white/10">
                                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">القيمة التربوية</p>
                                        <p className="text-xs leading-normal text-slate-200 font-bold">{badge.skillMap}</p>
                                    </div>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>

            {/* Rarity Legend */}
            <div className="flex flex-wrap gap-8 items-center justify-center p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">دليل الندرة:</span>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400 shadow-sm shadow-blue-200" />
                    <span className="text-xs font-black text-slate-600">شائعة</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400 shadow-sm shadow-purple-200" />
                    <span className="text-xs font-black text-slate-600">نادرة</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-200" />
                    <span className="text-xs font-black text-slate-600">أسطورية</span>
                </div>
            </div>
        </div>
    );
}

