'use client';

import { Game, GameStatus } from '@/types/game';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import { Clock, Play, CheckCircle, Plus } from 'lucide-react';

interface KanbanColumnProps {
  status: GameStatus;
  games: Game[];
  onUpdate: (id: string, updates: Partial<Game>) => void;
  onDelete: (id: string) => void;
  onAddGame: (status: GameStatus) => void;
  onEdit?: (game: Game) => void; // Added for modal editing
}

const statusConfig: Record<GameStatus, { label: string; icon: typeof Clock; color: string; bgColor: string; darkColor: string; darkBgColor: string }> = {
  not_started: {
    label: 'Not Started',
    icon: Clock,
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
    darkColor: 'dark:text-slate-300',
    darkBgColor: 'dark:bg-slate-800',
  },
  in_progress: {
    label: 'In Progress',
    icon: Play,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    darkColor: 'dark:text-blue-300',
    darkBgColor: 'dark:bg-blue-900/30',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    darkColor: 'dark:text-emerald-300',
    darkBgColor: 'dark:bg-emerald-900/30',
  },
};

export function KanbanColumn({ status, games, onUpdate, onDelete, onAddGame, onEdit }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-280px)] min-h-[400px] sm:min-h-[500px]">
      <div className={`${config.bgColor} ${config.darkBgColor} rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 transition-colors`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.color} ${config.darkColor}`} />
            <h2 className={`font-bold text-sm sm:text-base lg:text-lg ${config.color} ${config.darkColor}`}>{config.label}</h2>
          </div>
          <span className={`${config.color} ${config.darkColor} font-semibold text-xs sm:text-sm bg-white/50 dark:bg-gray-700/50 px-2 sm:px-3 py-1 rounded-full`}>
            {games.length}
          </span>
        </div>
        <button
          onClick={() => onAddGame(status)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 sm:py-2 bg-white/70 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-700 active:bg-white/90 dark:active:bg-gray-600 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 touch-manipulation min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          Add Game
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 rounded-xl p-2 sm:p-3 overflow-y-auto transition-colors ${isOver ? 'bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-300 dark:border-indigo-600 border-dashed' : 'bg-gray-50 dark:bg-gray-800/50'
          }`}
      >
        <SortableContext items={games.map((game) => game.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 sm:space-y-3">
            {games.length === 0 ? (
              <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                No games
              </div>
            ) : (
              games.map((game) => (
                <KanbanCard
                  key={game.id}
                  game={game}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
