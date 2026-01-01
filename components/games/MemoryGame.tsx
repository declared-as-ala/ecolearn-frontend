'use client';

import { useState, useEffect } from 'react';
import { Game, gamesAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MemoryGameProps {
  game: Game;
  onComplete?: (points: number) => void;
}

export default function MemoryGame({ game, onComplete }: MemoryGameProps) {
  const router = useRouter();
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const gameCards = game.gameData?.cards || [];
    // Create pairs
    const pairs = [...gameCards, ...gameCards];
    // Shuffle
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled.map((card, index) => ({ ...card, id: index })));
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first]?.pair === cards[second]?.pair) {
        setMatched([...matched, cards[first].pair]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  useEffect(() => {
    const allPairs = Array.from(new Set(cards.map((c) => c.pair)));
    if (matched.length === allPairs.length && allPairs.length > 0) {
      handleComplete();
    }
  }, [matched]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index]?.pair)) {
      return;
    }
    setFlipped([...flipped, index]);
  };

  const handleComplete = async () => {
    setGameCompleted(true);
    const totalPairs = Array.from(new Set(cards.map((c) => c.pair))).length;
    const score = totalPairs; // Perfect score if all matched

    try {
      if (onComplete) {
        onComplete(game.points);
      } else {
        await gamesAPI.submitScore(game._id, {
          score,
          maxScore: totalPairs,
          answers: [],
        });
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  if (gameCompleted) {
    const totalPairs = Array.from(new Set(cards.map((c) => c.pair))).length;
    const percentage = Math.round((matched.length / totalPairs) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Game Complete!</CardTitle>
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
            <p className="text-3xl font-bold">{matched.length} / {totalPairs} pairs</p>
            <p className="text-xl text-muted-foreground">Moves: {moves}</p>
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
        <CardTitle>Memory Game</CardTitle>
        <CardDescription>Match the pairs</CardDescription>
        <div className="flex gap-4 mt-2">
          <span>Moves: {moves}</span>
          <span>Matched: {matched.length} / {Array.from(new Set(cards.map((c) => c.pair))).length}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index);
            const isMatched = matched.includes(card.pair);

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`aspect-square flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all ${isFlipped || isMatched
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
                  }`}
              >
                {isFlipped || isMatched ? (
                  <span className="text-lg font-semibold">{card.content}</span>
                ) : (
                  <span className="text-2xl">?</span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}








