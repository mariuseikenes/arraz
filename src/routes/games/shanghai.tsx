import { Button } from "@/components/ui/button";
import localStorageHelper from "@/lib/localStorageHelper";
import { generateUUID } from "@/lib/uuid";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Dart from "../../logo.svg?react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/games/shanghai")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Shanghai Scorekeeping Online",
      },
      {
        name: "description",
        content: "Onlne Scorekeeping for Shanghai, Darts.",
      },
    ],
  }),
});

type Player = {
  id: string;
  name: string;
  score: number;
  turns: Turn[];
};

type Turn = {
  player: Player;
  throws: Throw[];
};

type Throw = {
  hit: boolean;
  multiplier: 1 | 2 | 3;
};

function ScoreTable({ players }: { players: Player[] }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-inactive">
          <TableHead className="text-accent">Player</TableHead>
          <TableHead className="text-accent border-l-inactive border-l">
            Points
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((p) => (
          <TableRow className="border-inactive h-12" key={p.id}>
            <TableCell className="font-medium max-w-fit aspect-square">
              <div className="flex items-center justify-center">{p.name}</div>
            </TableCell>
            <TableCell
              key={p.id}
              className={`border-l-inactive border-l text-center`}
            >
              {p.score}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RouteComponent() {
  const playerNames = localStorageHelper.get("playerNames");
  const [players, setPlayers] = useState<Player[]>(
    playerNames
      ? playerNames.map((p: string) => ({
          name: p,
          id: generateUUID(),
          score: 0,
          turns: [],
        }))
      : [
          {
            name: "Player 1",
            score: 0,
            id: generateUUID(),
          },
          {
            name: "Player 2",
            id: generateUUID(),
            score: 0,
            turns: [],
          },
        ],
  );
  const [ready, setReady] = useState(false);
  const [currentRound, setCurrentRound] = useState(1); // 1 - 7
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<Turn>({
    player: players[0],
    throws: [],
  });
  const [winner, setWinner] = useState<Player | undefined>();
  const [winReason, setWinReason] = useState<"shanghai" | "points">("points");

  const handleUpdatePlayerNameById = (idToUpdate: string, newName: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === idToUpdate ? { ...player, name: newName } : player,
      ),
    );
  };

  function handleReady() {
    setReady(true);

    setCurrentTurn({
      player: players[0],
      throws: new Array(3).fill({
        hit: false,
        multiplier: 1,
      }),
    });

    localStorageHelper.set(
      "playerNames",
      players.map((p) => p.name),
    );
  }

  if (!ready) {
    return (
      <main className="flex flex-col p-2 gap-4 md:w-lg items-center w-4/5 mx-auto justify-center">
        <a href="/" aria-label="Back" className="w-full">
          <div className="p-2 border w-fit bg-white/10 rounded-md">
            <FaLongArrowAltLeft className="text-white" />
          </div>
        </a>
        <h1 className="text-3xl text-center font-bold">Shanghai</h1>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xl font-semibold inline-flex justify-between">
            Players:
            <button
              aria-label="Add Player"
              className="bg-text text-bg w-8 h-8 font-normal rounded-sm flex items-center justify-center text-xs"
              onClick={() => {
                setPlayers([
                  ...players,
                  {
                    name: "New Player",
                    id: generateUUID(),
                    score: 0,
                    turns: [],
                  },
                ]);
              }}
            >
              <Plus />
            </button>
          </label>
          {players.map((p) => (
            <div className="inline-flex gap-2" key={p.id}>
              <input
                aria-label="Player Name"
                value={p.name}
                onChange={(e) => {
                  handleUpdatePlayerNameById(p.id, e.target.value);
                }}
                className="bg-text rounded-sm text-bg p-1"
              />
              <button
                aria-label="Remove Player"
                className="text-xl text-text/50 hover:text-text"
                onClick={() => {
                  setPlayers(players.filter((pl) => pl.id !== p.id));
                }}
              >
                <X />
              </button>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="w-full p-8 mt-8 shadow-accent shadow-md border border-accent active:translate-y-1 active:shadow-none text-xl"
          onClick={() => handleReady()}
        >
          Play
        </Button>
      </main>
    );
  }

  function updateThrow(throwNumber: number) {
    const newThrows = [...currentTurn.throws];

    const throwToUpdate = { ...newThrows[throwNumber] };

    if (!throwToUpdate.hit) {
      throwToUpdate.hit = true;
      throwToUpdate.multiplier = 1;
    } else if (throwToUpdate.multiplier === 3) {
      throwToUpdate.multiplier = 1;
      throwToUpdate.hit = false;
    } else {
      throwToUpdate.multiplier = (throwToUpdate.multiplier + 1) as 1 | 2 | 3;
    }

    newThrows[throwNumber] = throwToUpdate;

    setCurrentTurn((ct) => ({
      ...ct,
      throws: newThrows,
    }));
  }

  function handleNextPlayer() {
    const hitBeds = currentTurn.throws.map((t) => (t.hit ? t.multiplier : 0));
    if (hitBeds.includes(1) && hitBeds.includes(2) && hitBeds.includes(3)) {
      setIsGameOver(true);
      setWinReason("shanghai");
      setWinner(currentTurn.player);
      return;
    }

    const awardedScore = currentTurn.throws
      .map((t) => (t.hit ? t.multiplier * currentRound : 0))
      .reduce((acc, curr) => acc + curr, 0);

    const throwDefault = new Array(3).fill({
      hit: false,
      multiplier: 1,
    });

    const updatedPlayers = players.map((p) =>
      p.id === currentTurn.player.id
        ? { ...p, score: p.score + awardedScore }
        : p,
    );

    setPlayers(updatedPlayers);

    if (players.indexOf(currentTurn.player) === players.length - 1) {
      if (currentRound === 7) {
        setIsGameOver(true);
        setWinner([...updatedPlayers].sort((a, b) => b.score - a.score)[0]);
        return;
      }

      setCurrentRound(currentRound + 1);
      setCurrentTurn({ player: players[0], throws: throwDefault });
    } else {
      setCurrentTurn({
        player: players[players.indexOf(currentTurn.player) + 1],
        throws: throwDefault,
      });
    }
  }

  return (
    <div className="flex flex-col px-2 gap-2 md:m-auto h-full">
      <h1 className="text-3xl font-bold text-center">Shanghai</h1>
      <div className="flex mt-14 gap-4 items-center justify-center flex-col h-full md:px-18">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">Current Target:</h2>
          <span className="text-5xl font-semibold mt-2">{currentRound}</span>
          <span className="mt-6 text-lg">{currentTurn.player.name}'s turn</span>
        </div>
        <div className="flex flex-row text-7xl m-auto items-center h-full justify-center">
          <div
            className="relative flex items-center justify-center"
            onClick={() => updateThrow(0)}
          >
            {currentTurn.throws[0].hit && (
              <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                {currentTurn.throws[0].multiplier === 1
                  ? "x1"
                  : currentTurn.throws[0].multiplier === 2
                    ? "x2"
                    : "x3"}
              </p>
            )}
            <Dart
              className={`${currentTurn.throws[0]?.hit ? "opacity-30" : ""} h-20 w-auto`}
            />
          </div>
          <div
            className="relative flex items-center justify-center"
            onClick={() => updateThrow(1)}
          >
            {currentTurn.throws[1].hit && (
              <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                {currentTurn.throws[1].multiplier === 1
                  ? "x1"
                  : currentTurn.throws[1].multiplier === 2
                    ? "x2"
                    : "x3"}
              </p>
            )}
            <Dart
              className={`${currentTurn.throws[1]?.hit ? "opacity-30" : ""} h-20 w-auto`}
            />
          </div>
          <div
            className="relative flex items-center justify-center"
            onClick={() => updateThrow(2)}
          >
            {currentTurn.throws[2].hit && (
              <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                {currentTurn.throws[2].multiplier === 1
                  ? "x1"
                  : currentTurn.throws[2].multiplier === 2
                    ? "x2"
                    : "x3"}
              </p>
            )}
            <Dart
              className={`${currentTurn.throws[2]?.hit ? "opacity-30" : ""} h-20 w-auto`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-2/3">
          <h3 className="font-semibold text-lg text-center">Scoreboard</h3>
          <ScoreTable players={players} />
        </div>
        <Button
          variant="default"
          className={`border shadow shadow-accent border-accent w-1/2 m-auto`}
          size="lg"
          onClick={handleNextPlayer}
        >
          Next
        </Button>

        <p className="text-inactive w-4/5 text-center">
          Click the darts to cycle through the single, double, triple or miss.
        </p>
      </div>

      <GameOverDialog
        winner={winner}
        reason={winReason}
        gameOver={isGameOver}
      />
    </div>
  );
}

function GameOverDialog({
  winner,
  reason,
  gameOver,
}: {
  winner: Player | undefined;
  reason: "points" | "shanghai";
  gameOver: boolean;
}) {
  if (!winner) return;
  const message =
    reason === "points"
      ? `${winner.name} won with the most points (${winner.score})`
      : winner.name + " won by Shanghai!";

  return (
    <Dialog open={gameOver}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{winner.name} won!</DialogTitle>
          <DialogDescription className="flex gap-4 flex-col">
            <span>{message}</span>
            <Button
              onClick={() => window.location.reload()}
              className="border-accent border w-1/2 m-auto"
            >
              Play Again
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
