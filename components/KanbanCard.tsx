'use client';

import { Game } from '@/types/game';
import { formatCurrency } from '@/lib/utils';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface KanbanCardProps {
  game: Game;
  onUpdate: (id: string, updates: Partial<Game>) => void;
  onDelete: (id: string) => void;
  onEdit?: (game: Game) => void; // Added for modal editing
}

export function KanbanCard({ game, onUpdate, onDelete, onEdit }: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    notes: game.notes || '',
  });
  const [isMobile, setIsMobile] = useState(false);

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: game.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdate(game.id, {
      notes: editForm.notes || undefined,
    });
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all cursor-grab active:cursor-grabbing touch-manipulation"
    >
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              value={editForm.notes}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 resize-none"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-semibold text-sm transition-all touch-manipulation min-h-[44px]"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditForm({
                  notes: game.notes || '',
                });
              }}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm transition-colors touch-manipulation min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-2 mb-2">
            {!isMobile && (
              <div
                {...attributes}
                {...listeners}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 cursor-grab active:cursor-grabbing touch-manipulation p-1 -ml-1"
              >
                <GripVertical className="w-5 h-5 sm:w-4 sm:h-4" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 mb-1.5 break-words">{game.title}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {game.platform && (
                  <>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{game.platform}</span>
                    {game.price && <span className="text-gray-400 dark:text-gray-600">•</span>}
                  </>
                )}
                {game.price && (
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {formatCurrency(game.price)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // On mobile, always open modal. On desktop, use inline editing
                  if (isMobile && onEdit) {
                    onEdit(game);
                  } else if (!isMobile) {
                    setIsEditing(true);
                  }
                }}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Edit"
              >
                <Edit2 className="w-5 h-5 sm:w-3.5 sm:h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(game.id);
                }}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Delete"
              >
                <Trash2 className="w-5 h-5 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>

          {game.notes && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 break-words">{game.notes}</p>
          )}
        </>
      )}
    </div>
  );
}
