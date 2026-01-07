import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lesson } from '@/lib/api';
import Link from 'next/link';
import { Play, Clock } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  progress?: {
    status: string;
    completedAt?: string;
  };
}

export default function LessonCard({ lesson, progress }: LessonCardProps) {
  const isCompleted = progress?.status === 'completed';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{lesson.title}</CardTitle>
            <CardDescription className="mt-2">{lesson.description}</CardDescription>
          </div>
          {isCompleted && (
            <Badge variant="default" className="bg-green-500">Completed</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration} min</span>
          </div>
          <Badge variant="outline">{lesson.category}</Badge>
          <Badge variant="secondary">{lesson.difficulty}</Badge>
        </div>
        <div className="mt-3">
          <span className="text-sm font-semibold text-green-600">+{lesson.points} points</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/student/lessons/${lesson._id}`} className="w-full">
          <Button className="w-full" variant={isCompleted ? "outline" : "default"}>
            <Play className="w-4 h-4 mr-2" />
            {isCompleted ? 'Review Lesson' : 'Start Lesson'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}









