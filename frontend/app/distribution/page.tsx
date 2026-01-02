import ButtonContainer from "@/components/ButtonContainer";
import SalaryBellCurve from "@/components/SalaryBellCurve";
import StatCard from "@/components/StatCard";

export default async function Distribution() {
  const apiUrl = process.env.NODE_ENV === 'production' 
    ? 'https://qualifying-offer-calculator-production.up.railway.app'
    : 'http://localhost:8000';
  const response = await fetch(`${apiUrl}/salaries/stats?player_amount=125`,  { cache: 'no-store' })
  const data = await response.json()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30 dark:from-zinc-950 dark:to-red-950/10 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
              Player Salaries
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Salary distribution for the top {data.stats_for_top_n} MLB players
            </p>
          </div>
          
        <StatCard stat={data.average} title={"Qualifying Offer"} />
        </div>

        <div className="flex items-center gap-3 mb-10">
          <ButtonContainer currentView="distribution" />
        </div>

        <SalaryBellCurve players={data.top_players_included} qualifyingOffer={data.average}/>
      </div>
    </div>
  );
}