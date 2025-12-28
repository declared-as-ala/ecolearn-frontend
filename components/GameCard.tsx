import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Game } from '@/lib/api';
import Link from 'next/link';
import { Gamepad2, Clock } from 'lucide-react';

interface GameCardProps {
  game: Game;
  progress?: {
    status: string;
    score?: number;
    maxScore?: number;
  };
}

const gameTypeLabels: Record<string, string> = {
  quiz: 'Quiz',
  dragdrop: 'Drag & Drop',
  memory: 'Memory',
  scenario: 'Scenario',
  challenge: 'Challenge',
};

export default function GameCard({ game, progress }: GameCardProps) {
  const isCompleted = progress?.status === 'completed';
  const score = progress?.score && progress?.maxScore 
    ? Math.round((progress.score / progress.maxScore) * 100) 
    : null;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{game.title}</CardTitle>
            <CardDescription className="mt-2">{game.description}</CardDescription>
          </div>
          {isCompleted && (
            <Badge variant="default" className="bg-green-500">Completed</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <Badge variant="outline">{gameTypeLabels[game.type] || game.type}</Badge>
          <Badge variant="secondary">{game.difficulty}</Badge>
          {game.timeLimit > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{game.timeLimit}s</span>
            </div>
          )}
        </div>
        {score !== null && (
          <div className="mt-2">
            <span className="text-sm font-semibold">Best Score: {score}%</span>
          </div>
        )}
        <div className="mt-2">
          <span className="text-sm font-semibold text-green-600">+{game.points} points</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/student/games/${game._id}`} className="w-full">
          <Button className="w-full" variant={isCompleted ? "outline" : "default"}>
            <Gamepad2 className="w-4 h-4 mr-2" />
            {isCompleted ? 'Play Again' : 'Play Game'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}






