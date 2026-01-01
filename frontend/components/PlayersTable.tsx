'use client';

import Link from 'next/link';

interface Player {
  Player: string;
  Year: number;
  Salary: number;
  Level: string;
}

interface PlayersTableProps {
  players: Player[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function PlayersTable({ players }: PlayersTableProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-zinc-200/80 dark:shadow-none border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b-2 border-zinc-200 dark:border-zinc-700">
            <th className="px-6 py-5 text-xs font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-5 text-xs font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Player Info</th>
            <th className="px-6 py-5 text-right text-xs font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Salary</th>
            <th className="px-6 py-5 text-center text-xs font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
          {players.map((player, index) => {
            const nameParts = player.Player.split(', ');
            const wikiSlug = nameParts.length > 1 
              ? `${nameParts[1]}_${nameParts[0]}` 
              : player.Player;
            
            return (
              <tr 
                key={`${player.Player}-${player.Year}-${index}`}
                className="group hover:bg-gradient-to-r hover:from-red-50/50 hover:to-transparent dark:hover:from-red-950/20 dark:hover:to-transparent transition-all duration-200"
              >
                <td className="px-6 py-5">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-200">
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <Link 
                    href={`https://en.wikipedia.org/wiki/${wikiSlug}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block"
                  >
                    <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {player.Player}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Class of {player.Year}</div>
                  </Link>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-200">
                    {formatCurrency(player.Salary)}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-800/50 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    {player.Level}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
