'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Game, GameStatus } from '@/types/game';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

interface KanbanBoardProps {
  games: Game[];
  onUpdate: (id: string, updates: Partial<Game>) => void;
  onDelete: (id: string) => void;
  onAddGame: (status: GameStatus) => void;
}

export function KanbanBoard({ games, onUpdate, onDelete, onAddGame }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const gamesByStatus = {
    not_started: games.filter((game) => game.status === 'not_started'),
    in_progress: games.filter((game) => game.status === 'in_progress'),
    completed: games.filter((game) => game.status === 'completed'),
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const gameId = active.id as string;
    const newStatus = over.id as GameStatus;

    // Find the game to check its current status
    const game = games.find((g) => g.id === gameId);
    if (game && game.status !== newStatus) {
      const updates: Partial<Game> = { status: newStatus };
      
      // Set completion date if moving to completed
      if (newStatus === 'completed' && !game.dateCompleted) {
        updates.dateCompleted = new Date().toISOString();
      }
      
      // Remove completion date if moving away from completed
      if (newStatus !== 'completed' && game.dateCompleted) {
        updates.dateCompleted = undefined;
      }

      onUpdate(gameId, updates);
    }

    setActiveId(null);
  };

  const activeGame = activeId ? games.find((game) => game.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex-shrink-0 w-full lg:w-1/3 lg:min-w-0">
          <KanbanColumn
            status="not_started"
            games={gamesByStatus.not_started}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onAddGame={onAddGame}
          />
        </div>
        <div className="flex-shrink-0 w-full lg:w-1/3 lg:min-w-0">
          <KanbanColumn
            status="in_progress"
            games={gamesByStatus.in_progress}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onAddGame={onAddGame}
          />
        </div>
        <div className="flex-shrink-0 w-full lg:w-1/3 lg:min-w-0">
          <KanbanColumn
            status="completed"
            games={gamesByStatus.completed}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onAddGame={onAddGame}
          />
        </div>
      </div>

      <DragOverlay>
        {activeGame ? (
          <div className="rotate-3 opacity-90">
            <KanbanCard
              game={activeGame}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

