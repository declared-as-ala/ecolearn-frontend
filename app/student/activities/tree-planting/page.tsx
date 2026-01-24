'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { activitiesAPI, usersAPI } from '@/lib/api';
import ActivityScreen from './_components/ActivityScreen';
import WelcomeScreen from './_components/WelcomeScreen';
import QuoteScreen from './_components/QuoteScreen';
import GoalsScreen from './_components/GoalsScreen';
import PlanningScreen from './_components/PlanningScreen';
import PreparationScreen from './_components/PreparationScreen';
import SoilPrepScreen from './_components/SoilPrepScreen';
import PlantingScreen from './_components/PlantingScreen';
import WateringScreen from './_components/WateringScreen';
import ResponsibilityScreen from './_components/ResponsibilityScreen';
import DocumentationScreen from './_components/DocumentationScreen';
import InitiativesScreen from './_components/InitiativesScreen';
import EvaluationScreen from './_components/EvaluationScreen';
import ReflectionScreen from './_components/ReflectionScreen';
import CompletionScreen from './_components/CompletionScreen';

const TOTAL_SCREENS = 13;

export default function TreePlantingActivityPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(1);
    const [completionData, setCompletionData] = useState<{ pointsEarned?: number; badgesEarned?: string[] } | null>(null);
    const [activityData, setActivityData] = useState<any>({
        plantingLocation: null,
        plantingLocationArabic: null,
        treeType: null,
        assignedRole: null,
        assignedRoleArabic: null,
        studentName: '',
        school: '',
        plantingDate: new Date().toISOString().split('T')[0],
        waterAmount: 0,
        documentationNote: '',
        documentationEmoji: '',
        careInitiatives: [],
        careInitiativesArabic: [],
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
            const result = await activitiesAPI.submitTreePlanting({
                activityId: 'tree-planting-day', // This should match backend activity ID
                userId: user.id || user._id || '',
                ...activityData
            });

            // Store completion data
            setCompletionData({
                pointsEarned: result.pointsEarned || 100,
                badgesEarned: result.badgesEarned || ['🌳 حامي الطبيعة']
            });

            // Add points to user (if not already added by backend)
            if (result.pointsEarned) {
                try {
                    await usersAPI.addPoints({
                        points: result.pointsEarned,
                        type: 'activity',
                        description: 'نشاط بيئي تطبيقي: يوم التشجير',
                        activityId: 'tree-planting-day'
                    });
                } catch (err) {
                    // Points might already be added by backend
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
                return (
                    <PlanningScreen
                        onNext={handleNext}
                        onUpdate={updateActivityData}
                        data={activityData}
                    />
                );
            case 5:
                return <PreparationScreen onNext={handleNext} />;
            case 6:
                return <SoilPrepScreen onNext={handleNext} />;
            case 7:
                return <PlantingScreen onNext={handleNext} />;
            case 8:
                return (
                    <WateringScreen
                        onNext={handleNext}
                        onUpdate={updateActivityData}
                        data={activityData}
                    />
                );
            case 9:
                return (
                    <ResponsibilityScreen
                        onNext={handleNext}
                        onUpdate={updateActivityData}
                        data={activityData}
                    />
                );
            case 10:
                return (
                    <DocumentationScreen
                        onNext={handleNext}
                        onUpdate={updateActivityData}
                        data={activityData}
                    />
                );
            case 11:
                return (
                    <InitiativesScreen
                        onNext={handleNext}
                        onUpdate={updateActivityData}
                        data={activityData}
                    />
                );
            case 12:
                return (
                    <EvaluationScreen
                        onNext={handleNext}
                        onUpdate={updateActivityData}
                        data={activityData}
                    />
                );
            case 13:
                return (
                    <ReflectionScreen
                        onComplete={handleComplete}
                        onUpdate={updateActivityData}
                        data={activityData}
                    />
                );
            default:
                return (
                    <CompletionScreen
                        pointsEarned={completionData?.pointsEarned || 100}
                        badgesEarned={completionData?.badgesEarned || ['🌳 حامي الطبيعة']}
                        onFinish={() => router.push('/student/dashboard')}
                    />
                );
        }
    };

    if (!user) {
        return null;
    }

    const showCompletion = currentScreen > TOTAL_SCREENS;

    // Don't wrap completion screen with ActivityScreen
    if (showCompletion) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-auto" dir="rtl">
                {renderScreen()}
            </div>
        );
    }

    return (
        <ActivityScreen
            currentScreen={currentScreen}
            totalScreens={TOTAL_SCREENS}
            onNext={handleNext}
            onPrevious={currentScreen > 1 ? handlePrevious : undefined}
            showNext={true}
            showPrevious={currentScreen > 1}
            nextLabel={currentScreen === TOTAL_SCREENS ? 'إنهاء النشاط ➡️' : 'متابعة ➡️'}
        >
            {renderScreen()}
        </ActivityScreen>
    );
}
