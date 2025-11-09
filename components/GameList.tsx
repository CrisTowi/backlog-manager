'use client';

import { Game } from '@/types/game';
import { GameCard } from './GameCard';

interface GameListProps {
  games: Game[];
  onUpdate: (id: string, updates: Partial<Game>) => void;
  onDelete: (id: string) => void;
}

export function GameList({ games, onUpdate, onDelete }: GameListProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-12 bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
        <p className="text-gray-600 text-lg font-medium">No games found in your backlog</p>
        <p className="text-gray-500 text-sm mt-2">Add your first game to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
