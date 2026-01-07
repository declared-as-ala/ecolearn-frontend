'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Sparkles, Leaf, BookOpen, Users,
    ArrowRight, Heart, Star, Lightbulb
} from 'lucide-react';

interface Recommendation {
    id: string;
    type: 'support' | 'home_activity' | 'celebration';
    title: string;
    description: string;
    actionLabel: string;
    icon: any;
    priority: 'low' | 'medium' | 'high';
}

interface AIRecommendationsProps {
    childName: string;
    recommendations: Recommendation[];
}

export default function AIRecommendations({ childName, recommendations }: AIRecommendationsProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                        <Sparkles className="w-6 h-6 text-amber-500" />
                        Smart Suggestions for {childName}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">Automatic insights to help you guide the learning process.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                    <Card key={rec.id} className="group relative border-none bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
                        <div className={cn(
                            "absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.03] transition-transform group-hover:scale-110",
                            rec.type === 'support' && "text-blue-500",
                            rec.type === 'home_activity' && "text-emerald-500",
                            rec.type === 'celebration' && "text-amber-500",
                        )}>
                            <rec.icon className="w-full h-full" />
                        </div>

                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className={cn(
                                    "p-2.5 rounded-2xl shadow-sm",
                                    rec.type === 'support' && "bg-blue-50 text-blue-600",
                                    rec.type === 'home_activity' && "bg-emerald-50 text-emerald-600",
                                    rec.type === 'celebration' && "bg-amber-50 text-amber-600",
                                )}>
                                    <rec.icon className="w-5 h-5" />
                                </div>
                                {rec.priority === 'high' && (
                                    <Badge className="bg-red-100 text-red-600 border-none font-bold text-[10px]">
                                        Priority
                                    </Badge>
                                )}
                            </div>
                            <CardTitle className="text-base mt-3">{rec.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {rec.description}
                            </p>
                            <Button size="sm" variant="ghost" className={cn(
                                "p-0 hover:bg-transparent font-bold flex items-center gap-2 group-hover:gap-3 transition-all",
                                rec.type === 'support' && "text-blue-600 hover:text-blue-700",
                                rec.type === 'home_activity' && "text-emerald-600 hover:text-emerald-700",
                                rec.type === 'celebration' && "text-amber-600 hover:text-amber-700",
                            )}>
                                {rec.actionLabel}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Shared Activity Tip */}
            <Card className="border-none bg-slate-50 overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-sm flex-shrink-0">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm">Parenting Tip of the Day</h4>
                            <p className="text-xs text-slate-600 mt-1 leading-normal">
                                Ask your child to explain a concept to you like you're a student.
                                Commonly known as the "Feynman Technique," it's one of the most powerful
                                ways to solidify understanding.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
