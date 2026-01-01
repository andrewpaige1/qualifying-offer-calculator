"use client"

import { useTransition } from 'react';
import { refreshPlayerData } from '@/app/actions';
import { useRouter } from 'next/navigation';

const RefreshButton = ({ refreshMean }: { refreshMean: boolean }) => {
  
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRefresh = () => {
    startTransition(async () => {
      if (refreshMean) {
        await refreshPlayerData("mean");
      } else {
        await refreshPlayerData("median");
      }
      router.refresh()
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className={`
        text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 
        transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center gap-1.5
      `}
    >
      <svg
        className={`w-3.5 h-3.5 ${isPending ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {isPending ? 'Refreshing...' : 'Refresh data'}
    </button>
  );
};

export default RefreshButton;
