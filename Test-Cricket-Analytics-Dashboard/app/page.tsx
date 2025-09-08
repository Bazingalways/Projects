import { PlayerSearch } from "@/components/PlayerSearch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { players } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Top Players</h2>
      </div>

      <PlayerSearch />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {players.slice(0, 6).map((player) => (
          <Link key={player.id} href={`/player/${player.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{player.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {player.country} • {player.role}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg</p>
                    <p className="font-bold">{player.battingAvg}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Runs</p>
                    <p className="font-bold">{player.runs.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <h1 className="text-4xl font-bold text-blue-600">Hello, Tailwind!</h1>
//     </div>
//   );
// }
