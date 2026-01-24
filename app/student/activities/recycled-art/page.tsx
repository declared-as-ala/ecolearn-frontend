'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
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

const TOTAL_SCREENS = 11;

export default function RecycledArtActivityPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(1);
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

    const handleComplete = () => {
        // Immediate navigation - no API calls, no delays
        if (typeof window !== 'undefined') {
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
            onNext={currentScreen === TOTAL_SCREENS ? () => handleComplete() : handleNext}
            onPrevious={currentScreen > 1 ? handlePrevious : undefined}
            showNext={currentScreen !== TOTAL_SCREENS}
            showPrevious={currentScreen > 1}
            nextLabel={currentScreen === TOTAL_SCREENS ? 'إنهاء النشاط ➡️' : 'متابعة ➡️'}
        >
            {renderScreen()}
        </ActivityScreen>
    );
}
