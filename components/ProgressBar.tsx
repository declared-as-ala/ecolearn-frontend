import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
}

export default function ProgressBar({ current, max, label }: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm text-muted-foreground">{current} / {max}</span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
}






