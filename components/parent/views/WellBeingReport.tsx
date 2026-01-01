'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Heart, Zap, Battery, Clock,
    Brain, Sun, AlertCircle, Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';

interface WellBeingReportProps {
    childName: string;
    data: {
        focusScore: number;
        screenTime: number; // in mins
        rhythm: 'Stable' | 'Inconsistent' | 'Exceptional';
        indicators: {
            rushing: boolean;
            losingFocus: boolean;
            optimalLearningHour: string;
        };
    };
}

export default function WellBeingReport({ childName, data }: WellBeingReportProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                        <Heart className="w-6 h-6 text-pink-500" />
                        Well-being & Focus Report
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">Monitoring the balance between learning and health.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Focus Score */}
                <Card className="border-none bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm relative overflow-hidden text-blue-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
                            <Brain className="w-4 h-4" />
                            Focus Level
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-6">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64" cy="64" r="58"
                                    stroke="currentColor" strokeWidth="8"
                                    fill="transparent" className="opacity-10"
                                />
                                <circle
                                    cx="64" cy="64" r="58"
                                    stroke="currentColor" strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={364}
                                    strokeDashoffset={364 - (364 * data.focusScore) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-3xl font-black">{data.focusScore}%</span>
                                <span className="text-[10px] font-bold uppercase">Optimal</span>
                            </div>
                        </div>
                        <p className="text-xs font-medium mt-4 text-center text-blue-800/70">
                            {data.focusScore > 80 ? "Deep focus detected today!" : "Stable attention span."}
                        </p>
                    </CardContent>
                </Card>

                {/* Learning Rhythm */}
                <Card className="border-none bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm text-emerald-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
                            <Zap className="w-4 h-4" />
                            Learning Rhythm
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 py-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold">Rhythm Status</span>
                            <Badge className="bg-emerald-200 text-emerald-800 border-none font-bold text-[10px]">
                                {data.rhythm}
                            </Badge>
                        </div>
                        <div className="bg-white/50 p-3 rounded-2xl border border-emerald-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Sun className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-[10px] uppercase font-bold text-emerald-600">Golden Hour</span>
                            </div>
                            <p className="text-lg font-black text-emerald-900">{data.indicators.optimalLearningHour}</p>
                            <p className="text-[10px] text-emerald-700/60 font-medium">When focus is at its peak.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Screen Time Balance */}
                <Card className="border-none bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm text-amber-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
                            <Clock className="w-4 h-4" />
                            Digital Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 py-4">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-bold italic">Today's Screen Time</span>
                            <span className="text-xl font-black">{data.screenTime} min</span>
                        </div>
                        <ProgressBar value={(data.screenTime / 60) * 100} className="h-2 bg-amber-100/50" />
                        <div className="flex items-start gap-2 bg-white/40 p-2.5 rounded-xl text-[10px] leading-relaxed font-medium text-amber-800/70 border border-amber-100">
                            <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            <p>Digital fatigue usually sets after 45 mins. We recommend a 15 min rest now.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Behavioral Alerts */}
            {(data.indicators.rushing || data.indicators.losingFocus) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.indicators.rushing && (
                        <Card className="border-none bg-red-50 shadow-sm border-l-4 border-l-red-500">
                            <CardContent className="p-4 flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-900 text-sm">Gentle Alert: Rushing detected</h4>
                                    <p className="text-xs text-red-700 mt-0.5">
                                        {childName} is completing exercises faster than average. This might lead to small mistakes.
                                        Suggest reading the instructions aloud together!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    {data.indicators.losingFocus && (
                        <Card className="border-none bg-indigo-50 shadow-sm border-l-4 border-l-indigo-500">
                            <CardContent className="p-4 flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                    <Battery className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-indigo-900 text-sm">Advice: Break Time Nearby</h4>
                                    <p className="text-xs text-indigo-700 mt-0.5">
                                        Response times are increasing slightly. A 5-minute movement break (jumping jacks or water)
                                        would be very beneficial right now.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
