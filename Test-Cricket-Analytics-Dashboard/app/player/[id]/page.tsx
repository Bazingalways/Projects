import { notFound } from "next/navigation";
import { players, getPlayerChartData } from "@/lib/data";
import { PlayerCard } from "@/components/Playercard";
import { StatsChart } from "@/components/StatsChart";
import { ChatBot } from "@/components/ChatBot";

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params; // Await the params
  const player = players.find((p) => p.id === id);

  if (!player) {
    notFound();
  }

  const chartData = getPlayerChartData(player.id);

  return (
    <div className="space-y-6">
      <PlayerCard player={player} />
      <h1>{player.name}</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <StatsChart data={chartData} title="Performance Trend" type="line" />
        <StatsChart data={chartData} title="Yearly Runs" type="bar" />
      </div>

      <ChatBot playerName={player.name} />
    </div>
  );
}
