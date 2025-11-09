import { Game, BacklogStats } from '@/types/game';

export function calculateStats(games: Game[]): BacklogStats {
  const stats: BacklogStats = {
    total: games.length,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
    totalSpent: 0,
    estimatedRemaining: 0,
  };

  games.forEach((game) => {
    if (game.status === 'not_started') {
      stats.notStarted++;
    } else if (game.status === 'in_progress') {
      stats.inProgress++;
    } else if (game.status === 'completed') {
      stats.completed++;
    }
    
    if (game.price) {
      stats.totalSpent += game.price;
      if (game.status !== 'completed') {
        stats.estimatedRemaining += game.price;
      }
    }
  });

  return stats;
}

export function checkDuplicate(gameTitle: string, platform: string | undefined, games: Game[]): Game | null {
  return games.find(
    (game) => 
      game.title.toLowerCase() === gameTitle.toLowerCase() && 
      (game.platform === platform || (!game.platform && !platform))
  ) || null;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
