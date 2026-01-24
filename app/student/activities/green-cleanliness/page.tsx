'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ActivityScreen from '../tree-planting/_components/ActivityScreen';
import WelcomeScreen from './_components/WelcomeScreen';
import QuoteScreen from './_components/QuoteScreen';
import ObjectivesScreen from './_components/ObjectivesScreen';
import PlanningScreen from './_components/PlanningScreen';
import PreparationScreen from './_components/PreparationScreen';
import ExecutionScreen from './_components/ExecutionScreen';
import SortingScreen from './_components/SortingScreen';
import DocumentationScreen from './_components/DocumentationScreen';
import InitiativeScreen from './_components/InitiativeScreen';
import EvaluationScreen from './_components/EvaluationScreen';

const TOTAL_SCREENS = 10;

export default function GreenCleanlinessActivityPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(1);
    const [activityData, setActivityData] = useState<any>({
        cleaningArea: null,
        cleaningAreaArabic: null,
        assignedRole: null,
        assignedRoleArabic: null,
        studentName: '',
        classSection: '',
        toolsUsed: [],
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

    const handleComplete = () => {
        // Immediate navigation - no API calls, no delays
        if (typeof window !== 'undefined') {
            window.location.replace('/student/dashboard');
        }
    };

    const handleExit = () => {
        // Navigate back to activities page
        if (typeof window !== 'undefined') {
            window.location.href = '/student/activities';
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
                return <ExecutionScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 7:
                return <SortingScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 8:
                return <DocumentationScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 9:
                return <InitiativeScreen onNext={handleNext} onUpdate={updateActivityData} data={activityData} />;
            case 10:
                return <EvaluationScreen onComplete={handleComplete} onUpdate={updateActivityData} data={activityData} />;
            default:
                return null;
        }
    };

    if (!user) {
        return null;
    }


    return (
        <ActivityScreen
            currentScreen={currentScreen}
            totalScreens={TOTAL_SCREENS}
            onNext={currentScreen === TOTAL_SCREENS ? () => {
                // Direct navigation - no API calls
                if (typeof window !== 'undefined') {
                    window.location.replace('/student/dashboard');
                }
            } : handleNext}
            onPrevious={currentScreen > 1 ? handlePrevious : undefined}
            showNext={currentScreen !== TOTAL_SCREENS}
            showPrevious={currentScreen > 1}
            nextLabel={currentScreen === TOTAL_SCREENS ? 'إنهاء النشاط ➡️' : 'متابعة ➡️'}
            onExit={handleExit}
        >
            {renderScreen()}
        </ActivityScreen>
    );
}
