'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

interface Player {
  Player: string;
  Salary: number;
}

interface SalaryHistogramProps {
  players: Player[];
  qualifyingOffer: number
}

const BIN_WIDTH = 2000000;

export default function SalaryHistogram({ players, qualifyingOffer }: SalaryHistogramProps) {
  const validSalaries = players
    .map(p => p.Salary)
    .filter((s): s is number => typeof s === 'number' && !isNaN(s) && s > 0)
    .sort((a, b) => b - a);

  const cutoffSalary = validSalaries[124];
  const leftBound = Math.max(0, cutoffSalary);
  const maxDisplay = validSalaries[0];

  const data = Array.from({ length: Math.ceil((maxDisplay - leftBound) / BIN_WIDTH) }, (_, i) => {
    const start = leftBound + (i * BIN_WIDTH);
    const count = validSalaries.filter(s => s >= start && s < start + BIN_WIDTH).length;
    
    return {
      label: `$${Math.round(start / 1000000)}M`,
      count,
      isAboveCutoff: start >= cutoffSalary
    };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const qoLabel = formatCurrency(qualifyingOffer);

  return (
    <div className="w-full space-y-6">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Qualifying Offer Distribution</h2>
          <p className="text-zinc-500 text-sm italic">Top-tier salary distribution (zoomed to market top)</p>
        </div>
        
        <div className="w-full h-96 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              
              <Tooltip 
                cursor={{ fill: '#f4f4f5' }}
                formatter={(value: number | undefined) => [value, 'Players']}
                labelFormatter={(label) => `Salary Range: ${label}`}
              />
              
              <ReferenceLine 
                x={qoLabel} 
                stroke="#dc2626" 
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{ value: 'QO', position: 'top', fill: '#dc2626', fontSize: 12 }} 
              />
              
              <Bar dataKey="count">
                {data.map((entry, index) => (
                  <Cell 
                    key={index} 
                    fill={entry.isAboveCutoff ? '#1e40af' : '#a1a1aa'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <StatBox title="Upcoming QO Value" value={formatCurrency(qualifyingOffer)} highlight />
          <StatBox title="Valid Sample" value={`${validSalaries.length} Players`} />
        </div>
      </div>
    </div>
  );
}

function StatBox({ title, value, highlight = false }: { title: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${highlight ? 'bg-blue-50 border-blue-200' : 'bg-zinc-50 border-zinc-200'}`}>
      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${highlight ? 'text-blue-600' : 'text-zinc-500'}`}>
        {title}
      </p>
      <p className="text-lg font-bold text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
}