'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { activitiesAPI, usersAPI } from '@/lib/api';
import ActivityScreen from '../tree-planting/_components/ActivityScreen';
import WelcomeScreen from './_components/WelcomeScreen';
import QuoteScreen from './_components/QuoteScreen';
import GoalsScreen from './_components/GoalsScreen';
import PreparationScreen from './_components/PreparationScreen';
import DesignScreen from './_components/DesignScreen';
import BuildingScreen from './_components/BuildingScreen';
import DecorationScreen from './_components/DecorationScreen';
import IdentityCardScreen from './_components/IdentityCardScreen';
import DocumentationScreen from './_components/DocumentationScreen';
import InitiativeScreen from './_components/InitiativeScreen';
import EvaluationScreen from './_components/EvaluationScreen';
import CompletionScreen from '../tree-planting/_components/CompletionScreen';

const TOTAL_SCREENS = 11;

export default function RecycledArtActivityPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(1);
    const [completionData, setCompletionData] = useState<{ pointsEarned?: number; badgesEarned?: string[] } | null>(null);
    const [activityData, setActivityData] = useState<any>({
        studentName: '',
        classSection: '',
        toolsUsed: [],
        modelIdea: '',
        activityDate: new Date().toISOString().split('T')[0],
        modelImage: null,
        documentationNote: '',
        documentationEmoji: '',
        initiatives: [],
        initiativesArabic: [],
        evaluationData: {},
        reflectionResponses: {}
    });

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleNext = () => {
        if (currentScreen < TOTAL_SCREENS) {
            setCurrentScreen(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentScreen > 1) {
            setCurrentScreen(prev => prev - 1);
        }
    };

    const handleComplete = async () => {
        if (!user) return;
        
        try {
            // Submit the activity
            const result = await activitiesAPI.submitRecycledArt({
                activityId: 'recycled-art-activity',
                userId: user.id || user._id || '',
                ...activityData
            });

            // Store completion data
            setCompletionData({
                pointsEarned: result.pointsEarned || 100,
                badgesEarned: result.badgesEarned || ['🎨 بطل الفن الأخضر']
            });

            // Add points to user
            if (result.pointsEarned) {
                try {
                    await usersAPI.addPoints({
                        points: result.pointsEarned,
                        type: 'activity',
                        description: 'نشاط تطبيقي ميداني: صناعة مجسم إبداعي من البلاستيك المعاد تدويره',
                        activityId: 'recycled-art-activity'
                    });
                } catch (err) {
                    console.log('Points may already be added by backend');
                }
            }

            // Navigate to completion screen
            setCurrentScreen(TOTAL_SCREENS + 1);
        } catch (error) {
            console.error('Error completing activity:', error);
            alert('حدث خطأ أثناء حفظ النشاط. يرجى المحاولة مرة أخرى.');
        }
    };

    const updateActivityData = (updates: any) => {
        setActivityData((prev: any) => ({ ...prev, ...updates }));
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 1:
                return <WelcomeScreen onNext={handleNext} />;
            case 2:
                return <QuoteScreen onNext={handleNext} />;
            case 3:
                return <GoalsScreen onNext={handleNext} />;
            case 4:
                return <PreparationScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 5:
                return <DesignScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 6:
                return <BuildingScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 7:
                return <DecorationScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 8:
                return <IdentityCardScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 9:
                return <DocumentationScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 10:
                return <InitiativeScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 11:
                return <EvaluationScreen onComplete={handleComplete} onUpdate={updateActivityData} data={activityData} />;
            default:
                return (
                    <CompletionScreen
                        pointsEarned={completionData?.pointsEarned || 100}
                        badgesEarned={completionData?.badgesEarned || ['🎨 بطل الفن الأخضر']}
                        onFinish={() => router.push('/student/dashboard')}
                    />
                );
        }
    };

    if (!user) {
        return null;
    }

    const showCompletion = currentScreen > TOTAL_SCREENS;

    if (showCompletion) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-auto" dir="rtl">
                {renderScreen()}
            </div>
        );
    }

    return (
        <ActivityScreen
            currentScreen={currentScreen}
            totalScreens={TOTAL_SCREENS}
            onNext={currentScreen === TOTAL_SCREENS ? handleComplete : handleNext}
            onPrevious={currentScreen > 1 ? handlePrevious : undefined}
            showNext={currentScreen !== TOTAL_SCREENS}
            showPrevious={currentScreen > 1}
            nextLabel={currentScreen === TOTAL_SCREENS ? 'إنهاء النشاط ➡️' : 'متابعة ➡️'}
        >
            {renderScreen()}
        </ActivityScreen>
    );
}
