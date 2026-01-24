'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
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

const TOTAL_SCREENS = 13;

export default function TreePlantingActivityPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(1);
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

    const handleComplete = () => {
        // Immediate navigation - no API calls, no delays
        if (typeof window !== 'undefined') {
            // Use replace to prevent back button issues
            window.location.replace('/student/dashboard');
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
        >
            {renderScreen()}
        </ActivityScreen>
    );
}
