import { Player, ChartData } from '@/types/player';

export const players: Player[] = [
  {
    id: '1',
    name: 'Steve Smith',
    country: 'Australia',
    role: 'Batsman',
    battingAvg: 61.80,
    matches: 103,
    runs: 9685,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '2',
    name: 'Marnus Labuschagne',
    country: 'Australia',
    role: 'Batsman',
    battingAvg: 60.80,
    matches: 34,
    runs: 2652,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '3',
    name: 'Kane Williamson',
    country: 'New Zealand',
    role: 'Batsman',
    battingAvg: 54.31,
    matches: 101,
    runs: 8743,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '4',
    name: 'Babar Azam',
    country: 'Pakistan',
    role: 'Batsman',
    battingAvg: 52.35,
    matches: 53,
    runs: 3907,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '5',
    name: 'Virat Kohli',
    country: 'India',
    role: 'Batsman',
    battingAvg: 49.95,
    matches: 113,
    runs: 8848,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '6',
    name: 'Joe Root',
    country: 'England',
    role: 'Batsman',
    battingAvg: 49.44,
    matches: 143,
    runs: 11559,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '7',
    name: 'Rohit Sharma',
    country: 'India',
    role: 'Batsman',
    battingAvg: 46.86,
    matches: 59,
    runs: 3463,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '8',
    name: 'David Warner',
    country: 'Australia',
    role: 'Batsman',
    battingAvg: 44.59,
    matches: 112,
    runs: 8786,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '9',
    name: 'Pat Cummins',
    country: 'Australia',
    role: 'Bowler',
    battingAvg: 19.24,
    bowlingAvg: 21.59,
    matches: 60,
    runs: 985,
    wickets: 269,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '10',
    name: 'Jasprit Bumrah',
    country: 'India',
    role: 'Bowler',
    battingAvg: 4.17,
    bowlingAvg: 20.06,
    matches: 36,
    runs: 138,
    wickets: 159,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '11',
    name: 'Josh Hazlewood',
    country: 'Australia',
    role: 'Bowler',
    battingAvg: 11.53,
    bowlingAvg: 25.34,
    matches: 70,
    runs: 461,
    wickets: 276,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '12',
    name: 'Kagiso Rabada',
    country: 'South Africa',
    role: 'Bowler',
    battingAvg: 12.48,
    bowlingAvg: 22.30,
    matches: 65,
    runs: 786,
    wickets: 281,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '13',
    name: 'James Anderson',
    country: 'England',
    role: 'Bowler',
    battingAvg: 9.43,
    bowlingAvg: 26.45,
    matches: 187,
    runs: 1308,
    wickets: 704,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '14',
    name: 'Ben Stokes',
    country: 'England',
    role: 'All-rounder',
    battingAvg: 35.89,
    bowlingAvg: 31.19,
    matches: 104,
    runs: 6327,
    wickets: 196,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '15',
    name: 'Ravindra Jadeja',
    country: 'India',
    role: 'All-rounder',
    battingAvg: 35.26,
    bowlingAvg: 24.63,
    matches: 73,
    runs: 2804,
    wickets: 294,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '16',
    name: 'Shakib Al Hasan',
    country: 'Bangladesh',
    role: 'All-rounder',
    battingAvg: 31.05,
    bowlingAvg: 30.16,
    matches: 71,
    runs: 4609,
    wickets: 237,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '17',
    name: 'Ravichandran Ashwin',
    country: 'India',
    role: 'All-rounder',
    battingAvg: 27.23,
    bowlingAvg: 23.75,
    matches: 100,
    runs: 3309,
    wickets: 516,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '18',
    name: 'Rishabh Pant',
    country: 'India',
    role: 'Wicket-keeper',
    battingAvg: 43.34,
    matches: 33,
    runs: 2271,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '19',
    name: 'Quinton de Kock',
    country: 'South Africa',
    role: 'Wicket-keeper',
    battingAvg: 38.82,
    matches: 54,
    runs: 3300,
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '20',
    name: 'Jos Buttler',
    country: 'England',
    role: 'Wicket-keeper',
    battingAvg: 31.27,
    matches: 57,
    runs: 2386,
    imageUrl: '/api/placeholder/400/400'
  }
];

// Test Cricket Performance Data by Player ID (runs per year in Test matches)
const performanceData: Record<string, ChartData[]> = {
  '1': [ // Steve Smith
    { year: '2019', runs: 774, average: 64.50, matches: 7 },
    { year: '2020', runs: 313, average: 31.30, matches: 4 },
    { year: '2021', runs: 1039, average: 69.27, matches: 8 },
    { year: '2022', runs: 1200, average: 66.67, matches: 9 },
    { year: '2023', runs: 1346, average: 67.30, matches: 11 },
    { year: '2024', runs: 890, average: 59.33, matches: 8 }
  ],
  '2': [ // Marnus Labuschagne
    { year: '2019', runs: 1104, average: 64.94, matches: 11 },
    { year: '2020', runs: 426, average: 53.25, matches: 4 },
    { year: '2021', runs: 602, average: 60.20, matches: 6 },
    { year: '2022', runs: 930, average: 58.13, matches: 8 },
    { year: '2023', runs: 1038, average: 69.20, matches: 7 },
    { year: '2024', runs: 612, average: 51.00, matches: 6 }
  ],
  '3': [ // Kane Williamson
    { year: '2019', runs: 1154, average: 72.13, matches: 8 },
    { year: '2020', runs: 368, average: 52.57, matches: 3 },
    { year: '2021', runs: 426, average: 42.60, matches: 5 },
    { year: '2022', runs: 1026, average: 73.29, matches: 7 },
    { year: '2023', runs: 1089, average: 60.50, matches: 9 },
    { year: '2024', runs: 756, average: 54.00, matches: 7 }
  ],
  '4': [ // Babar Azam
    { year: '2019', runs: 474, average: 47.40, matches: 5 },
    { year: '2020', runs: 338, average: 48.29, matches: 4 },
    { year: '2021', runs: 906, average: 69.69, matches: 7 },
    { year: '2022', runs: 1184, average: 65.78, matches: 9 },
    { year: '2023', runs: 1312, average: 72.89, matches: 11 },
    { year: '2024', runs: 968, average: 60.50, matches: 8 }
  ],
  '5': [ // Virat Kohli
    { year: '2019', runs: 612, average: 38.25, matches: 8 },
    { year: '2020', runs: 218, average: 31.14, matches: 3 },
    { year: '2021', runs: 536, average: 38.29, matches: 7 },
    { year: '2022', runs: 1088, average: 54.40, matches: 10 },
    { year: '2023', runs: 1241, average: 56.41, matches: 12 },
    { year: '2024', runs: 742, average: 49.47, matches: 8 }
  ],
  '6': [ // Joe Root
    { year: '2019', runs: 1563, average: 52.10, matches: 15 },
    { year: '2020', runs: 464, average: 42.18, matches: 6 },
    { year: '2021', runs: 1708, average: 58.90, matches: 15 },
    { year: '2022', runs: 1098, average: 45.75, matches: 12 },
    { year: '2023', runs: 1472, average: 49.07, matches: 16 },
    { year: '2024', runs: 1087, average: 43.48, matches: 13 }
  ],
  '7': [ // Rohit Sharma
    { year: '2019', runs: 556, average: 46.33, matches: 6 },
    { year: '2020', runs: 128, average: 25.60, matches: 2 },
    { year: '2021', runs: 906, average: 47.68, matches: 9 },
    { year: '2022', runs: 1123, average: 56.15, matches: 11 },
    { year: '2023', runs: 1347, average: 59.87, matches: 12 },
    { year: '2024', runs: 876, average: 48.67, matches: 9 }
  ],
  '8': [ // David Warner
    { year: '2019', runs: 647, average: 35.94, matches: 9 },
    { year: '2020', runs: 212, average: 35.33, matches: 3 },
    { year: '2021', runs: 997, average: 52.47, matches: 9 },
    { year: '2022', runs: 1216, average: 50.67, matches: 12 },
    { year: '2023', runs: 1089, average: 40.33, matches: 14 },
    { year: '2024', runs: 723, average: 38.05, matches: 10 }
  ],
  '9': [ // Pat Cummins (Bowling focus)
    { year: '2019', runs: 145, average: 14.50, matches: 7 },
    { year: '2020', runs: 89, average: 17.80, matches: 3 },
    { year: '2021', runs: 198, average: 24.75, matches: 6 },
    { year: '2022', runs: 223, average: 22.30, matches: 8 },
    { year: '2023', runs: 267, average: 26.70, matches: 9 },
    { year: '2024', runs: 156, average: 19.50, matches: 6 }
  ],
  '10': [ // Jasprit Bumrah (Bowling focus)
    { year: '2019', runs: 34, average: 5.67, matches: 4 },
    { year: '2020', runs: 12, average: 4.00, matches: 2 },
    { year: '2021', runs: 45, average: 7.50, matches: 5 },
    { year: '2022', runs: 67, average: 8.38, matches: 6 },
    { year: '2023', runs: 89, average: 11.13, matches: 7 },
    { year: '2024', runs: 56, average: 9.33, matches: 5 }
  ],
  '11': [ // Josh Hazlewood (Bowling focus)
    { year: '2019', runs: 78, average: 9.75, matches: 6 },
    { year: '2020', runs: 45, average: 11.25, matches: 3 },
    { year: '2021', runs: 89, average: 12.71, matches: 5 },
    { year: '2022', runs: 134, average: 16.75, matches: 7 },
    { year: '2023', runs: 156, average: 15.60, matches: 8 },
    { year: '2024', runs: 98, average: 14.00, matches: 6 }
  ],
  '12': [ // Kagiso Rabada (Bowling focus)
    { year: '2019', runs: 145, average: 14.50, matches: 8 },
    { year: '2020', runs: 67, average: 13.40, matches: 3 },
    { year: '2021', runs: 89, average: 12.71, matches: 5 },
    { year: '2022', runs: 198, average: 19.80, matches: 7 },
    { year: '2023', runs: 223, average: 20.27, matches: 9 },
    { year: '2024', runs: 134, average: 16.75, matches: 6 }
  ],
  '13': [ // James Anderson (Bowling focus)
    { year: '2019', runs: 56, average: 7.00, matches: 5 },
    { year: '2020', runs: 34, average: 8.50, matches: 3 },
    { year: '2021', runs: 78, average: 9.75, matches: 6 },
    { year: '2022', runs: 89, average: 11.13, matches: 7 },
    { year: '2023', runs: 134, average: 13.40, matches: 8 },
    { year: '2024', runs: 67, average: 11.17, matches: 5 }
  ],
  '14': [ // Ben Stokes (All-rounder)
    { year: '2019', runs: 821, average: 39.10, matches: 10 },
    { year: '2020', runs: 267, average: 33.38, matches: 4 },
    { year: '2021', runs: 946, average: 43.00, matches: 11 },
    { year: '2022', runs: 1134, average: 42.00, matches: 14 },
    { year: '2023', runs: 1267, average: 45.25, matches: 15 },
    { year: '2024', runs: 823, average: 39.19, matches: 11 }
  ],
  '15': [ // Ravindra Jadeja (All-rounder)
    { year: '2019', runs: 423, average: 32.54, matches: 7 },
    { year: '2020', runs: 156, average: 26.00, matches: 3 },
    { year: '2021', runs: 534, average: 38.14, matches: 8 },
    { year: '2022', runs: 612, average: 40.80, matches: 9 },
    { year: '2023', runs: 689, average: 42.94, matches: 10 },
    { year: '2024', runs: 445, average: 35.60, matches: 7 }
  ],
  '16': [ // Shakib Al Hasan (All-rounder)
    { year: '2019', runs: 534, average: 33.38, matches: 8 },
    { year: '2020', runs: 189, average: 27.00, matches: 4 },
    { year: '2021', runs: 445, average: 31.79, matches: 7 },
    { year: '2022', runs: 612, average: 34.00, matches: 9 },
    { year: '2023', runs: 723, average: 36.15, matches: 10 },
    { year: '2024', runs: 456, average: 30.40, matches: 8 }
  ],
  '17': [ // Ravichandran Ashwin (All-rounder)
    { year: '2019', runs: 234, average: 23.40, matches: 6 },
    { year: '2020', runs: 134, average: 22.33, matches: 3 },
    { year: '2021', runs: 298, average: 27.09, matches: 7 },
    { year: '2022', runs: 423, average: 30.21, matches: 8 },
    { year: '2023', runs: 534, average: 33.38, matches: 10 },
    { year: '2024', runs: 356, average: 28.48, matches: 7 }
  ],
  '18': [ // Rishabh Pant (Wicket-keeper)
    { year: '2019', runs: 445, average: 40.45, matches: 6 },
    { year: '2020', runs: 134, average: 22.33, matches: 3 },
    { year: '2021', runs: 534, average: 48.55, matches: 7 },
    { year: '2022', runs: 723, average: 51.64, matches: 8 },
    { year: '2023', runs: 812, average: 58.00, matches: 9 },
    { year: '2024', runs: 445, average: 40.45, matches: 6 }
  ],
  '19': [ // Quinton de Kock (Wicket-keeper)
    { year: '2019', runs: 612, average: 40.80, matches: 8 },
    { year: '2020', runs: 234, average: 33.43, matches: 4 },
    { year: '2021', runs: 534, average: 42.70, matches: 6 },
    { year: '2022', runs: 689, average: 43.06, matches: 9 },
    { year: '2023', runs: 756, average: 37.80, matches: 10 },
    { year: '2024', runs: 423, average: 35.25, matches: 7 }
  ],
  '20': [ // Jos Buttler (Wicket-keeper)
    { year: '2019', runs: 423, average: 30.21, matches: 7 },
    { year: '2020', runs: 156, average: 26.00, matches: 3 },
    { year: '2021', runs: 356, average: 32.36, matches: 6 },
    { year: '2022', runs: 534, average: 33.38, matches: 8 },
    { year: '2023', runs: 612, average: 34.00, matches: 9 },
    { year: '2024', runs: 445, average: 31.79, matches: 7 }
  ]
};

export const getPlayerChartData = (playerId: string): ChartData[] => {
  return performanceData[playerId] || [
    { year: '2019', runs: 500, average: 35.00, matches: 8 },
    { year: '2020', runs: 300, average: 30.00, matches: 4 },
    { year: '2021', runs: 650, average: 40.00, matches: 9 },
    { year: '2022', runs: 800, average: 45.00, matches: 10 },
    { year: '2023', runs: 900, average: 50.00, matches: 11 },
    { year: '2024', runs: 600, average: 42.00, matches: 8 }
  ];
};

// Test Cricket specific utility functions
export const getTopTestBatsmen = (limit: number = 5) => {
  return players
    .filter(player => player.role === 'Batsman')
    .sort((a, b) => b.battingAvg - a.battingAvg)
    .slice(0, limit);
};

export const getTopTestBowlers = (limit: number = 5) => {
  return players
    .filter(player => player.role === 'Bowler' && player.bowlingAvg)
    .sort((a, b) => (a.bowlingAvg || 50) - (b.bowlingAvg || 50))
    .slice(0, limit);
};

export const getTopTestAllRounders = (limit: number = 4) => {
  return players
    .filter(player => player.role === 'All-rounder')
    .sort((a, b) => b.battingAvg - a.battingAvg)
    .slice(0, limit);
};

export const getPlayersByCountry = (country: string) => {
  return players.filter(player => 
    player.country.toLowerCase() === country.toLowerCase()
  );
};

// Test Cricket specific comparison data
export const getComparisonData = (playerIds: string[]) => {
  const years = ['2019', '2020', '2021', '2022', '2023', '2024'];
  
  return years.map(year => {
    const yearData: any = { year };
    
    playerIds.forEach(id => {
      const player = players.find(p => p.id === id);
      const playerData = getPlayerChartData(id);
      const yearStats = playerData.find(d => d.year === year);
      
      if (player && yearStats) {
        yearData[player.name] = yearStats.average;
      }
    });
    
    return yearData;
  });
};

// Test Cricket team compositions (typical Test squad)
export const testTeamCompositions = [
  {
    team: 'Australia',
    batsmen: 6,
    bowlers: 4,
    allRounders: 2,
    wicketKeepers: 1,
    totalPlayers: 13
  },
  {
    team: 'India',
    batsmen: 5,
    bowlers: 4,
    allRounders: 3,
    wicketKeepers: 1,
    totalPlayers: 13
  },
  {
    team: 'England',
    batsmen: 5,
    bowlers: 4,
    allRounders: 3,
    wicketKeepers: 1,
    totalPlayers: 13
  }
];

// Recent Test match performances
export const recentTestMatches = [
  {
    id: '1',
    playerId: '1', // Steve Smith
    opponent: 'India',
    runs: 121,
    balls: 244,
    notOut: false,
    innings: 1,
    date: '2024-01-15',
    venue: 'MCG'
  },
  {
    id: '2',
    playerId: '4', // Babar Azam
    opponent: 'England',
    runs: 87,
    balls: 156,
    notOut: true,
    innings: 1,
    date: '2024-01-10',
    venue: 'Lords'
  },
  {
    id: '3',
    playerId: '9', // Pat Cummins
    opponent: 'South Africa',
    runs: 23,
    balls: 45,
    wickets: 5,
    innings: 1,
    date: '2024-01-08',
    venue: 'Gabba'
  }
];

// Test Cricket career milestones
export const testMilestones = {
  '1': [ // Steve Smith
    { achievement: '8,000 Test runs', date: '2021-01-07' },
    { achievement: 'Fastest to 7,000 Test runs (126 innings)', date: '2019-09-12' },
    { achievement: '27 Test centuries', date: '2023-06-28' },
    { achievement: 'Test batting average over 60', date: '2020-01-03' }
  ],
  '2': [ // Marnus Labuschagne
    { achievement: '2,000 Test runs', date: '2021-12-28' },
    { achievement: 'Fastest to 2,000 runs by Australian (34 innings)', date: '2021-12-28' },
    { achievement: 'Test batting average over 60', date: '2020-11-15' }
  ],
  '5': [ // Virat Kohli
    { achievement: '8,000 Test runs', date: '2021-08-19' },
    { achievement: '27 Test centuries', date: '2019-10-19' },
    { achievement: 'Most Test wins as captain (40)', date: '2021-09-09' }
  ],
  '6': [ // Joe Root
    { achievement: '10,000 Test runs', date: '2021-09-08' },
    { achievement: 'Most Test runs by England captain', date: '2021-07-25' },
    { achievement: '26 Test centuries', date: '2022-03-15' }
  ]
};

// Test Cricket format specific stats
export const testCricketStats = {
  averageTestMatchDuration: '4.2 days',
  averageRunsPerInnings: 285,
  averageBattingAverage: 32.5,
  averageBowlingAverage: 35.2,
  mostTestWickets: 704, // James Anderson
  mostTestRuns: 15921, // Sachin Tendulkar (not in current list)
  highestTestScore: 400, // Brian Lara
  bestBowlingFigures: '10/74' // Jim Laker
};