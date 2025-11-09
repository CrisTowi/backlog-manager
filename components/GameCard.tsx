'use client';

import { Game, GameStatus } from '@/types/game';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Check, Play, Clock, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface GameCardProps {
  game: Game;
  onUpdate: (id: string, updates: Partial<Game>) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<GameStatus, string> = {
  not_started: 'bg-slate-200 text-slate-700',
  in_progress: 'bg-blue-200 text-blue-700',
  completed: 'bg-emerald-200 text-emerald-700',
};

const statusIcons: Record<GameStatus, typeof Check> = {
  not_started: Clock,
  in_progress: Play,
  completed: Check,
};

const statusLabels: Record<GameStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export function GameCard({ game, onUpdate, onDelete }: GameCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    status: game.status,
    notes: game.notes || '',
  });

  const StatusIcon = statusIcons[game.status];

  const handleStatusChange = (newStatus: GameStatus) => {
    onUpdate(game.id, { status: newStatus });
    setIsEditing(false);
  };

  const handleSave = () => {
    onUpdate(game.id, {
      status: editForm.status,
      notes: editForm.notes || undefined,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{game.title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">{game.platform}</span>
            {game.price && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-indigo-600 font-semibold">
                  {formatCurrency(game.price)}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(game.id)}
            className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Status
            </label>
            <select
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value as GameStatus })}
              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={editForm.notes}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-indigo-500 resize-none"
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-semibold text-sm transition-all"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditForm({
                  status: game.status,
                  notes: game.notes || '',
                });
              }}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[game.status]}`}>
              <StatusIcon className="w-4 h-4" />
              <span>{statusLabels[game.status]}</span>
            </div>
          </div>

          {game.notes && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{game.notes}</p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
            <span>Added: {formatDate(game.dateAdded)}</span>
            {game.dateCompleted && (
              <span>Completed: {formatDate(game.dateCompleted)}</span>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            {game.status !== 'completed' && (
              <button
                onClick={() => handleStatusChange('completed')}
                className="flex-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Mark Complete
              </button>
            )}
            {game.status === 'not_started' && (
              <button
                onClick={() => handleStatusChange('in_progress')}
                className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Start Playing
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
