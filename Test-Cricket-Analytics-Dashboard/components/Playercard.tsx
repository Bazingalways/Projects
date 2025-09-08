import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/types/player";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">
              {player.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <CardTitle>{player.name}</CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{player.country}</Badge>
              <Badge variant="outline">{player.role}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Batting Average</p>
            <p className="text-2xl font-bold">{player.battingAvg}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Runs</p>
            <p className="text-2xl font-bold">{player.runs.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Matches</p>
            <p className="text-2xl font-bold">{player.matches}</p>
          </div>
          {player.wickets && (
            <div>
              <p className="text-sm text-muted-foreground">Wickets</p>
              <p className="text-2xl font-bold">{player.wickets}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
