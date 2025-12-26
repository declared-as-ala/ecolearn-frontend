'use client';

import { useState } from 'react';
import { Game, gamesAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trophy, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChallengeGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

export default function ChallengeGame({ game, onComplete }: ChallengeGameProps) {
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const challenge = game.gameData?.challenge || '';
  const tasks = game.gameData?.tasks || [];

  const handleTaskToggle = (taskId: string) => {
    if (gameCompleted) return;
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSubmit = async () => {
    const completedPoints = tasks
      .filter((t: any) => completedTasks.includes(t.id))
      .reduce((sum: number, t: any) => sum + (t.points || 0), 0);
    const maxPoints = tasks.reduce((sum: number, t: any) => sum + (t.points || 0), 0);
    const scoreValue = Math.round((completedPoints / maxPoints) * tasks.length);

    setScore(scoreValue);
    setGameCompleted(true);

    try {
      if (onComplete) {
        onComplete(game.points);
      } else {
        await gamesAPI.submitScore(game._id, {
          score: scoreValue,
          maxScore: tasks.length,
          answers: tasks.map((task: any) => ({
            questionId: task.id,
            answer: completedTasks.includes(task.id),
            isCorrect: completedTasks.includes(task.id),
          })),
        });
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  if (gameCompleted) {
    const percentage = Math.round((score / tasks.length) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Challenge Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            {passed ? (
              <Trophy className="w-16 h-16 text-yellow-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <div>
            <p className="text-3xl font-bold">{completedTasks.length} / {tasks.length} tasks</p>
            <p className="text-xl text-muted-foreground">{percentage}%</p>
          </div>
          {passed ? (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 font-semibold">Congratulations! You passed!</p>
              <p className="text-green-600">You earned {game.points} points!</p>
            </div>
          ) : (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-700 font-semibold">Score below 70%</p>
              <p className="text-red-600">Try again to improve your score!</p>
            </div>
          )}
          <Button onClick={() => router.push('/student/dashboard')}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenge</CardTitle>
        <CardDescription>Complete the tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-base whitespace-pre-wrap">{challenge}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Tasks:</h3>
          {tasks.map((task: any) => {
            const isCompleted = completedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 border rounded-lg"
              >
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  disabled={gameCompleted}
                />
                <div className="flex-1">
                  <p className={isCompleted ? 'line-through text-muted-foreground' : ''}>
                    {task.description}
                  </p>
                  <p className="text-sm text-green-600 mt-1">+{task.points || 0} points</p>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={completedTasks.length === 0 || gameCompleted}
          className="w-full"
        >
          Submit Challenge
        </Button>
      </CardContent>
    </Card>
  );
}





