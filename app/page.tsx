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
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);

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
    // If editing, update existing game
    if (gameToEdit) {
      const updatedGames = games.map((game) => {
        if (game.id === gameToEdit.id) {
          const updated = { ...game, ...gameData };
          // Handle completion date
          if (updated.status === 'completed' && !updated.dateCompleted) {
            updated.dateCompleted = new Date().toISOString();
          }
          if (updated.status !== 'completed' && updated.dateCompleted) {
            delete updated.dateCompleted;
          }
          return updated;
        }
        return game;
      });
      setGames(updatedGames);
      saveGames(updatedGames);
      setShowAddForm(false);
      setGameToEdit(null);
      setPreSelectedStatus(null);
      setDuplicateWarning(null);
      return true;
    }

    // If adding new game, check for duplicates
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

  const handleEditGame = (game: Game) => {
    setGameToEdit(game);
    setShowAddForm(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 pb-20 sm:pb-safe">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                Gaming Backlog Manager
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1 hidden sm:block">Track your games and avoid unnecessary spending</p>
            </div>
          </div>
          {/* Desktop buttons - hidden on mobile */}
          <div className="hidden sm:flex items-center gap-3">
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
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-300 dark:border-amber-700 rounded-lg sm:rounded-xl shadow-md transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-amber-800 dark:text-amber-200 font-semibold">⚠️ Duplicate Game Detected!</p>
                <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 mt-1">
                  You already have &quot;{duplicateWarning.title}&quot; {duplicateWarning.platform && `(${duplicateWarning.platform})`} in your backlog
                  {duplicateWarning.status === 'completed' && ' (completed)'}
                  {duplicateWarning.status === 'in_progress' && ' (in progress)'}
                  {duplicateWarning.status === 'not_started' && ' (not started)'}
                </p>
              </div>
              <button
                onClick={() => setDuplicateWarning(null)}
                className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 font-semibold px-2 sm:px-3 py-1 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-lg transition-colors text-sm touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Game Modal */}
        <Modal
          isOpen={showAddForm}
          onClose={() => {
            setShowAddForm(false);
            setPreSelectedStatus(null);
            setDuplicateWarning(null);
            setGameToEdit(null);
          }}
          title={gameToEdit ? 'Edit Game' : 'Add New Game'}
        >
          <AddGameForm
            initialStatus={preSelectedStatus || undefined}
            gameToEdit={gameToEdit || undefined}
            onSubmit={handleAddGame}
            onCancel={() => {
              setShowAddForm(false);
              setPreSelectedStatus(null);
              setDuplicateWarning(null);
              setGameToEdit(null);
            }}
          />
        </Modal>

        {/* Filter Bar */}
        <div className="mb-4 sm:mb-6">
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
        <div className="mt-4 sm:mt-6">
          <KanbanBoard
            games={filteredGames}
            onUpdate={handleUpdateGame}
            onDelete={handleDeleteGame}
            onAddGame={handleAddGameFromColumn}
            onEdit={handleEditGame}
          />
        </div>
      </div>

      {/* Floating buttons for mobile */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden z-40 flex items-center justify-between pointer-events-none">
        {/* Theme Toggle - Bottom Left */}
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>

        {/* Add Game Button - Bottom Right */}
        <button
          onClick={() => {
            setPreSelectedStatus(null);
            setShowAddForm(true);
          }}
          className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all shadow-2xl active:scale-95 touch-manipulation"
          aria-label="Add Game"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
}
