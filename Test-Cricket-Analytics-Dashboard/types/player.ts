export interface Player {
  id: string;
  name: string;
  country: string;
  role: string;
  battingAvg: number;
  bowlingAvg?: number;
  matches: number;
  runs: number;
  wickets?: number;
  imageUrl: string;
}

export interface ChartData {
  year: string;
  runs: number;
  average: number;
  matches: number;
}