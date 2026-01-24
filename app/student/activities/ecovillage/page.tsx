'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { activitiesAPI, usersAPI } from '@/lib/api';
import ActivityScreen from '../tree-planting/_components/ActivityScreen';
import WelcomeScreen from './_components/WelcomeScreen';
import QuoteScreen from './_components/QuoteScreen';
import ObjectivesScreen from './_components/ObjectivesScreen';
import PlanningScreen from './_components/PlanningScreen';
import PreparationScreen from './_components/PreparationScreen';
import ConstructionScreen from './_components/ConstructionScreen';
import ResponsibilityScreen from './_components/ResponsibilityScreen';
import DocumentationScreen from './_components/DocumentationScreen';
import InitiativeScreen from './_components/InitiativeScreen';
import EvaluationScreen from './_components/EvaluationScreen';
import CompletionScreen from '../tree-planting/_components/CompletionScreen';

const TOTAL_SCREENS = 11;

export default function EcoVillageActivityPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(1);
    const [completionData, setCompletionData] = useState<{ pointsEarned?: number; badgesEarned?: string[] } | null>(null);
    const [activityData, setActivityData] = useState<any>({
        assignedRole: null,
        assignedRoleArabic: null,
        studentName: '',
        completedPart: null,
        completedPartArabic: null,
        completionDate: new Date().toISOString().split('T')[0],
        school: '',
        environmentalMessage: '',
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
            const result = await activitiesAPI.submitEcoVillage({
                activityId: 'ecovillage-activity',
                userId: user.id || user._id || '',
                ...activityData
            });

            // Store completion data
            setCompletionData({
                pointsEarned: result.pointsEarned || 100,
                badgesEarned: result.badgesEarned || ['🏡 باني EcoVillage']
            });

            // Add points to user
            if (result.pointsEarned) {
                try {
                    await usersAPI.addPoints({
                        points: result.pointsEarned,
                        type: 'activity',
                        description: 'EcoVillage: من السلوك البيئي إلى المسؤولية الفردية',
                        activityId: 'ecovillage-activity'
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
                return <ObjectivesScreen onNext={handleNext} />;
            case 4:
                return <PlanningScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 5:
                return <PreparationScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 6:
                return <ConstructionScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 7:
                return <ResponsibilityScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 8:
                return <DocumentationScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 9:
                return <InitiativeScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 10:
                return <EvaluationScreen onComplete={handleComplete} onUpdate={updateActivityData} data={activityData} />;
            default:
                return (
                    <CompletionScreen
                        pointsEarned={completionData?.pointsEarned || 100}
                        badgesEarned={completionData?.badgesEarned || ['🏡 باني EcoVillage']}
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
            <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 overflow-auto" dir="rtl">
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
