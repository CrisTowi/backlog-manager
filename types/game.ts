export type GameStatus = 'not_started' | 'in_progress' | 'completed';

export type Platform = 
  | 'PC' 
  | 'PlayStation' 
  | 'Xbox' 
  | 'Nintendo Switch' 
  | 'Mobile' 
  | 'Other';

export interface Game {
  id: string;
  title: string;
  platform?: Platform;
  status: GameStatus;
  dateAdded: string;
  dateCompleted?: string;
  price?: number;
  notes?: string;
}

export interface BacklogStats {
  total: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  totalSpent: number;
  estimatedRemaining: number;
}
