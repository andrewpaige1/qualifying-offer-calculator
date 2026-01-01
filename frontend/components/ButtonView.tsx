"use client"

import Link from 'next/link';

interface ButtonViewProps {
  viewMode: 'mean' | 'median' | 'distribution';
  isActive: boolean;
  href: string;
}

const ButtonView = ({ viewMode, isActive, href }: ButtonViewProps) => {
  const labels = {
    mean: 'Mean',
    median: 'Median',
    distribution: 'Distribution'
  };

  return (
    <Link
      href={href}
      className={`
        px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
        ${isActive 
          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-200/50 dark:shadow-red-900/50 scale-105' 
          : 'bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
        }
      `}
    >
      {labels[viewMode]}
    </Link>
  );
};

export default ButtonView;