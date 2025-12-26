import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award } from 'lucide-react';
import { User } from '@/lib/api';

interface LeaderboardProps {
  users: User[];
}

export default function Leaderboard({ users }: LeaderboardProps) {
  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Award className="w-5 h-5 text-orange-500" />;
    return <span className="w-6 text-center font-bold">{index + 1}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>Top performers in EcoLearn</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user, index) => (
            <div
              key={user.id || `user-${index}`}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                index < 3 ? 'bg-gradient-to-r from-green-50 to-blue-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(index)}
              </div>
              <Avatar>
                <AvatarFallback>
                  {user.username?.substring(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{user.username}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">Level {user.level || 1}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {user.points || 0} points
                  </span>
                </div>
              </div>
              {user.badges && user.badges.length > 0 && (
                <div className="flex gap-1">
                  {user.badges.slice(0, 3).map((badge, idx) => (
                    <Badge key={`${user.id || index}-badge-${idx}-${badge}`} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

