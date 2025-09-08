"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // Add this
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { players } from "@/lib/data";
import { Search } from "lucide-react";
import Link from "next/link";

export function PlayerSearch() {
  const router = useRouter(); // Add this
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredPlayers = useMemo(() => {
    if (!searchTerm) return [];
    return players
      .filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  }, [searchTerm]);
  const handlePlayerClick = (playerId: string) => {
    setIsOpen(false);
    setSearchTerm("");
    router.push(`/player/${playerId}`);
  };
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)} // closes dropdown after click
          className="pl-8"
        />
      </div>

      {isOpen && filteredPlayers.length > 0 && (
        <Card className="absolute top-full mt-1 w-full z-50 shadow-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 pointer-events-auto">
          <div className="py-2">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="block px-4 py-2 hover:bg-accent cursor-pointer rounded transition text-black dark:text-white"
                onClick={() => handlePlayerClick(player.id)}
              >
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {player.country} • {player.role}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
