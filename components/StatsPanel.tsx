'use client';

import { BacklogStats } from '@/types/game';
import { formatCurrency } from '@/lib/utils';
import { Gamepad2, Clock, Play, CheckCircle, DollarSign } from 'lucide-react';

interface StatsPanelProps {
  stats: BacklogStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const statCards = [
    {
      label: 'Total Games',
      value: stats.total,
      icon: Gamepad2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
    },
    {
      label: 'Not Started',
      value: stats.notStarted,
      icon: Clock,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Play,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      label: 'Total Spent',
      value: formatCurrency(stats.totalSpent),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      isCurrency: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.isCurrency ? stat.value : stat.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
