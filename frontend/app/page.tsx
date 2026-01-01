import ButtonContainer from "@/components/ButtonContainer";
import PlayersTable from "@/components/PlayersTable";
import StatCard from "@/components/StatCard";

interface PlayerData {
  stats_for_top_n: number;
  average: number;
  top_players_included: Array<{
    Player: string;
    Year: number;
    Salary: number;
    Level: string;
  }>;
}

async function getPlayerData(): Promise<PlayerData> {
  const response = await fetch("http://localhost:8000/salaries/mean?player_amount=125");

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export default async function Home() {
  const data = await getPlayerData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30 dark:from-zinc-950 dark:to-red-950/10 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
              Player Salaries
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Market analysis for the top {data.stats_for_top_n} MLB players
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-3 italic">
              <span className="font-semibold">Note:</span> The Qualifying Offer is calculated as the average of the top 125 salaries from the previous season.
            </p>
          </div>
          
          <StatCard stat={data.average} title={"Qualifying Offer"} />
        </div>

        <div className="flex items-center gap-3 mb-10">
          <ButtonContainer currentView="mean" />
        </div>

        <PlayersTable players={data.top_players_included} />

      </div>
    </div>
  );
}