import RefreshButton from "./RefreshButton";

interface StatCardProps {
  stat: number;
  title: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

const StatCard = ({ stat, title }: StatCardProps) => {
  return (
    <div>
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 shadow-xl shadow-red-200/50 dark:shadow-red-900/30 min-w-[260px] border border-red-500/20">
        <p className="text-xs font-bold uppercase tracking-wider text-red-100 mb-2">
          { title }
        </p>
        <p className="text-4xl font-black text-white">
          {formatCurrency(stat)}
        </p>
      </div>
      <div className="mt-3 flex justify-center">
        <RefreshButton refreshMean={title === "Mean"}/>
      </div>
    </div>
  );
};

export default StatCard;
