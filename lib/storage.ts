import { Game } from '@/types/game';

const STORAGE_KEY = 'backlog-manager-games';

export function saveGames(games: Game[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  }
}

export function loadGames(): Game[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing games from localStorage:', error);
        return [];
      }
    }
  }
  return [];
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

