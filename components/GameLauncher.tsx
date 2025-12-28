'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Trophy, RefreshCcw } from 'lucide-react';
import EcoHero from './cartoons/EcoHero';
import FriendlyAnimal from './cartoons/FriendlyAnimal';

// Import real game components
import DragDropGame from './games/DragDropGame';
import MatchingGame from './games/MatchingGame';
import DecisionGame from './games/DecisionGame';
import SimulationGame from './games/SimulationGame';
import ConstructionGame from './games/ConstructionGame';
import QuizGame from './games/QuizGame';
import ScenarioGame from './games/ScenarioGame';
import MemoryGame from './games/MemoryGame';
import ChallengeGame from './games/ChallengeGame';
import RescueGame from './games/RescueGame';
import RolePlayGame from './games/RolePlayGame';
import AudioGame from './games/AudioGame';
import RunnerGame from './games/RunnerGame';
import MapPlacementGame from './games/MapPlacementGame';
import EnergyFlowGame from './games/EnergyFlowGame';
import WaterLabGame from './games/WaterLabGame';

interface Game {
    id: string;
    type: string;
    title: string;
    description: string;
    points?: number;
    gameData?: any;
}

interface GameLauncherProps {
    game: Game;
    onComplete: (points: number) => void;
}

export default function GameLauncher({ game, onComplete }: GameLauncherProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(0);

    const startGame = () => {
        setIsPlaying(true);
        setIsFinished(false);
        setEarnedPoints(0);
    };

    const handleGameComplete = (points: number) => {
        setEarnedPoints(points);
        setIsPlaying(false);
        setIsFinished(true);
        onComplete(points);
    };

    const handleRestart = () => {
        setIsPlaying(true);
        setIsFinished(false);
        setEarnedPoints(0);
    };

    // Render the appropriate game component based on type
    const renderGame = () => {
        // Convert game type to match component names
        const gameType = game.type.toLowerCase();

        // Create a game object compatible with the game components
        const gameObj = {
            _id: game.id,
            title: game.title,
            description: game.description,
            type: game.type,
            points: game.points || 20,
            gameData: game.gameData || {},
            timeLimit: 0,
        };

        switch (gameType) {
            case 'dragdrop':
            case 'drag-drop':
                return <DragDropGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'matching':
                return <MatchingGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'decision':
            case 'decision-making':
                return <DecisionGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'simulation':
                return <SimulationGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'construction':
            case 'build':
                return <ConstructionGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'quiz':
                return <QuizGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'scenario':
                return <ScenarioGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'sequencing':
                // For now use quiz for sequencing or a dedicated component if available
                return <QuizGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'memory':
                return <MemoryGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'challenge':
                return <ChallengeGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'rescue':
                return <RescueGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'roleplay':
            case 'role-play':
                return <RolePlayGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'audio':
                return <AudioGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'runner':
                return <RunnerGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'map':
            case 'map-placement':
                return <MapPlacementGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'energy-flow':
            case 'flow':
                return <EnergyFlowGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'lab':
            case 'water-lab':
                return <WaterLabGame game={gameObj as any} onComplete={handleGameComplete} />;
            case 'sticker':
                // ConstructionGame can double as a sticker/repair game
                return <ConstructionGame game={gameObj as any} onComplete={handleGameComplete} />;
            default:
                // Fallback to drag-drop for unknown types
                return <DragDropGame game={gameObj as any} onComplete={handleGameComplete} />;
        }
    };

    if (isFinished) {
        return (
            <Card className="border-4 border-yellow-400 bg-yellow-50 rounded-3xl overflow-hidden shadow-2xl text-center p-8 animate-reactionIn" dir="rtl">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-yellow-800 mb-2">رائــــع! 🎉</h2>
                <p className="text-xl text-yellow-700 mb-2">لقد أنهيت لعبة "{game.title}" بنجاح!</p>
                <p className="text-2xl font-bold text-yellow-600 mb-6">حصلت على {earnedPoints} نقطة! ⭐</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={handleRestart} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg">
                        <RefreshCcw className="ml-2 w-5 h-5" /> العب ثانية
                    </Button>
                </div>
                <EcoHero size="large" emotion="celebrating" animation="bounce" className="mx-auto mt-6" />
            </Card>
        );
    }

    if (isPlaying) {
        return (
            <div className="w-full" dir="rtl">
                {renderGame()}
            </div>
        );
    }

    return (
        <Card className="border-4 border-amber-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group" dir="rtl">
            <CardHeader className="bg-amber-50 border-b-2 border-amber-100 text-center pb-2">
                <CardTitle className="text-2xl font-bold text-amber-800">{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-6">
                    <FriendlyAnimal type="rabbit" emotion="excited" size="large" />
                    <div className="absolute -top-4 -right-4 bg-yellow-400 text-white rounded-full p-2 shadow-lg animate-bounce">
                        <PlayCircle className="w-8 h-8" />
                    </div>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {game.description}
                </p>
                {game.points && (
                    <div className="mb-4">
                        <span className="text-xl font-bold text-amber-700">+{game.points} نقطة</span>
                    </div>
                )}
                <Button onClick={startGame} className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl py-8 text-2xl font-bold shadow-lg transition-transform active:scale-95 group-hover:scale-105">
                    ابدأ اللعب الآن 🎮
                </Button>
            </CardContent>
        </Card>
    );
}
