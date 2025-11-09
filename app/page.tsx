'use client';

import { useState, useEffect } from 'react';
import { Game, GameStatus, Platform } from '@/types/game';
import { loadGames, saveGames, generateId } from '@/lib/storage';
import { checkDuplicate } from '@/lib/utils';
import { AddGameForm } from '@/components/AddGameForm';
import { Modal } from '@/components/Modal';
import { KanbanBoard } from '@/components/KanbanBoard';
import { FilterBar } from '@/components/FilterBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PlusCircle, Gamepad2 } from 'lucide-react';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [statusFilter, setStatusFilter] = useState<GameStatus | 'all'>('all');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [preSelectedStatus, setPreSelectedStatus] = useState<GameStatus | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<Game | null>(null);

  useEffect(() => {
    const loadedGames = loadGames();
    setGames(loadedGames);
  }, []);

  useEffect(() => {
    let filtered = [...games];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((game) => game.status === statusFilter);
    }

    if (platformFilter !== 'all') {
      filtered = filtered.filter((game) => game.platform === platformFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.notes?.toLowerCase().includes(query)
      );
    }

    setFilteredGames(filtered);
  }, [games, statusFilter, platformFilter, searchQuery]);

  const handleAddGame = (gameData: Omit<Game, 'id' | 'dateAdded'>) => {
    const duplicate = checkDuplicate(gameData.title, gameData.platform, games);
    
    if (duplicate) {
      setDuplicateWarning(duplicate);
      return false;
    }

    const newGame: Game = {
      ...gameData,
      id: generateId(),
      dateAdded: new Date().toISOString(),
    };

    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    saveGames(updatedGames);
    setShowAddForm(false);
    setPreSelectedStatus(null);
    setDuplicateWarning(null);
    return true;
  };

  const handleAddGameFromColumn = (status: GameStatus) => {
    setPreSelectedStatus(status);
    setShowAddForm(true);
  };

  const handleUpdateGame = (id: string, updates: Partial<Game>) => {
    const updatedGames = games.map((game) => {
      if (game.id === id) {
        const updated = { ...game, ...updates };
        if (updates.status === 'completed' && !updated.dateCompleted) {
          updated.dateCompleted = new Date().toISOString();
        }
        if (updates.status !== 'completed' && updated.dateCompleted) {
          delete updated.dateCompleted;
        }
        return updated;
      }
      return game;
    });
    setGames(updatedGames);
    saveGames(updatedGames);
  };

  const handleDeleteGame = (id: string) => {
    const updatedGames = games.filter((game) => game.id !== id);
    setGames(updatedGames);
    saveGames(updatedGames);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Gaming Backlog Manager
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Track your games and avoid unnecessary spending</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => {
                setPreSelectedStatus(null);
                setShowAddForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <PlusCircle className="w-5 h-5" />
              Add Game
            </button>
          </div>
        </div>

        {/* Duplicate Warning */}
        {duplicateWarning && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-300 dark:border-amber-700 rounded-xl shadow-md transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-800 dark:text-amber-200 font-semibold">⚠️ Duplicate Game Detected!</p>
                <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                  You already have &quot;{duplicateWarning.title}&quot; {duplicateWarning.platform && `(${duplicateWarning.platform})`} in your backlog
                  {duplicateWarning.status === 'completed' && ' (completed)'}
                  {duplicateWarning.status === 'in_progress' && ' (in progress)'}
                  {duplicateWarning.status === 'not_started' && ' (not started)'}
                </p>
              </div>
              <button
                onClick={() => setDuplicateWarning(null)}
                className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 font-semibold px-3 py-1 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-lg transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Add Game Modal */}
        <Modal
          isOpen={showAddForm}
          onClose={() => {
            setShowAddForm(false);
            setPreSelectedStatus(null);
            setDuplicateWarning(null);
          }}
          title="Add New Game"
        >
          <AddGameForm
            initialStatus={preSelectedStatus || undefined}
            onSubmit={handleAddGame}
            onCancel={() => {
              setShowAddForm(false);
              setPreSelectedStatus(null);
              setDuplicateWarning(null);
            }}
          />
        </Modal>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar
            statusFilter={statusFilter}
            platformFilter={platformFilter}
            searchQuery={searchQuery}
            onStatusChange={setStatusFilter}
            onPlatformChange={setPlatformFilter}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Kanban Board */}
        <div className="mt-6">
          <KanbanBoard
            games={filteredGames}
            onUpdate={handleUpdateGame}
            onDelete={handleDeleteGame}
            onAddGame={handleAddGameFromColumn}
          />
        </div>
      </div>
    </main>
  );
}
