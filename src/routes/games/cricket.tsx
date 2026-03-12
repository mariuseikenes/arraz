import { Button } from "@/components/ui/button";
import { generateUUID } from "@/lib/uuid";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowBigRightDash,
  Check,
  CircleX,
  Minus,
  Plus,
  Slash,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaLongArrowAltLeft } from "react-icons/fa";
import localStorageHelper from "@/lib/localStorageHelper";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableFooter,
} from "@/components/ui/table";

export const Route = createFileRoute("/games/cricket")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Cricket Darts Scorekeeping",
      },
      {
        name: "description",
        content:
          "Scorekeeping for the Darts-game Cricket. Open a section to score points before the other team closes it!",
      },
    ],
  }),
});

type Player = {
  name: string;
  id: string;
  points: number;
};

type Section = {
  number: number; // 15 - 20, and 25 for bull
  hits: Map<string, number>; // {playerId: hitCount}
};

const hitsToSymbol = (hits: number) => {
  switch (hits) {
    case 0:
      return <div />;
    case 1:
      return <Slash />;
    case 2:
      return <X />;
    default:
      return <CircleX />;
  }
};

function SectionTable({
  players,
  sections,
  handler,
}: {
  players: Player[];
  sections: Section[];
  handler: (player: Player, section: Section) => void;
}) {
  return (
    <Table className="mt-4 mx-auto min-w-2/3 max-w-fit">
      <TableHeader>
        <TableRow className="border-inactive">
          <TableHead className="text-accent">Section</TableHead>
          {players.map((p) => (
            <TableHead className="text-accent" key={p.id}>
              {p.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sections.map((s) => (
          <TableRow className="border-inactive h-12" key={s.number}>
            <TableCell className="font-medium max-w-fit aspect-square">
              <div className="flex items-center justify-center">{s.number}</div>
            </TableCell>
            {players.map((p, i) => (
              <TableCell
                key={p.id}
                onClick={() => handler(p, s)}
                className={`${i + 1 === players.length ? "" : "border-x border-x-inactive"}`}
              >
                <div className="w-full flex items-center justify-center">
                  {hitsToSymbol(s.hits.get(p.id) ?? 0)}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-none">
        <TableRow className="border-inactive bg-none">
          <TableCell className="font-medium">Points</TableCell>
          {players.map((p) => (
            <TableCell key={p.id}>{p.points}</TableCell>
          ))}
        </TableRow>
      </TableFooter>
    </Table>
  );
}

const startingSections: Section[] = [
  {
    number: 15,
    hits: new Map(),
  },
  {
    number: 16,
    hits: new Map(),
  },
  {
    number: 17,
    hits: new Map(),
  },
  {
    number: 18,
    hits: new Map(),
  },
  {
    number: 19,
    hits: new Map(),
  },
  {
    number: 20,
    hits: new Map(),
  },
  {
    number: 25,
    hits: new Map(),
  },
];

function RouteComponent() {
  const playerNames = localStorageHelper.get("playerNames");
  const [players, setPlayers] = useState<Player[]>(
    playerNames
      ? playerNames.map((p: string) => ({
          name: p,
          id: generateUUID(),
          points: 0,
        }))
      : [
          {
            name: "Player 1",
            number: 1,
            id: generateUUID(),
          },
          {
            name: "Player 2",
            id: generateUUID(),
            points: 0,
          },
        ],
  );
  const [roundCount, setRoundCount] = useState<number>(
    localStorageHelper.get("cricket_roundcount") ?? 0,
  );
  const [roundsPlayed, setRoundsPlayed] = useState<number>(1);
  const [sections, setSections] = useState<Section[]>(startingSections);
  const [cutThroat, setCutThroat] = useState(true);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [isGameOver, setIsGameOver] = useState(false);

  const handleUpdatePlayerNameById = (idToUpdate: string, newName: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === idToUpdate ? { ...player, name: newName } : player,
      ),
    );
  };

  function handleReady() {
    setReady(true);

    localStorageHelper.set(
      "playerNames",
      players.map((p) => p.name),
    );
    localStorageHelper.set("cricket_roundcount", roundCount);
  }

  if (!ready) {
    return (
      <main className="flex flex-col p-2 gap-4 md:w-lg items-center w-4/5 mx-auto justify-center">
        <a href="/" aria-label="Back" className="w-full">
          <div className="p-2 border w-fit bg-white/10 rounded-md">
            <FaLongArrowAltLeft className="text-white" />
          </div>
        </a>
        <h1 className="text-3xl text-center font-bold">Cricket</h1>
        <div className="flex flex-row justify-between w-full">
          <div>
            <label
              className="text-left text-xl font-semibold"
              htmlFor="roundcount"
            >
              Rounds:
            </label>
            <p className="text-sm text-gray-400">
              (use 0 to play until all sections closed)
            </p>
          </div>
          <input
            value={roundCount}
            type="number"
            id="roundcount"
            aria-label="Round Count"
            onChange={(e) => {
              setRoundCount(Number(e.target.value));
            }}
            className="bg-text rounded-sm text-center text-bg   h-8 w-8"
          />
        </div>
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
                    points: 0,
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
          {players.length >= 3 && (
            <div className="inline-flex gap-2">
              <input
                aria-label="Cut-Throat"
                type="checkbox"
                checked={cutThroat}
                onChange={(e) => {
                  setCutThroat(e.target.checked);
                }}
                id="cutthroat"
                className=" accent-accent rounded-sm text-bg p-1 bg-secondary"
              />
              <label
                htmlFor="cutthroat"
                className="text-gray-400 text-sm flex items-center gap-2"
              >
                Cut-Throat
                <span className="text-xs">(Recommended for 3+ players)</span>
              </label>
            </div>
          )}
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

  function updateSections(newSection: Section) {
    setSections((o) =>
      o.map((s) => (s.number === newSection.number ? newSection : s)),
    );
  }

  function updatePlayers(newPlayer: Player) {
    setPlayers((o) => o.map((p) => (p.id === newPlayer.id ? newPlayer : p)));
  }

  const isOpenForPlayer = (playerId: string, section: Section) =>
    (section.hits.get(playerId) ?? 0) >= 3;

  function updateHitsOrAwardPoints(player: Player, section: Section) {
    const hits = section.hits.get(player.id) ?? 0;
    const isClosed = players.every((p) => (section.hits.get(p.id) ?? 0) >= 3);
    const isOpenFor = hits >= 3;

    if (mode === "add") {
      if (isClosed) return;
      if (isOpenFor) {
        if (cutThroat && players.length >= 3) {
          players
            .filter((p) => !isOpenForPlayer(p.id, section))
            .map((p) => ({ ...p, points: (p.points += section.number) }))
            .forEach((p) => updatePlayers(p));
        } else {
          player.points += section.number;
        }
      }
      section.hits.set(player.id, hits + 1);
    } else {
      if (hits <= 0) return;
      if (isOpenFor) {
        if (hits > 3) {
          if (cutThroat && players.length >= 3) {
            players
              .filter((p) => !isOpenForPlayer(p.id, section))
              .map((p) => ({ ...p, points: (p.points -= section.number) }))
              .forEach((p) => updatePlayers(p));
          } else {
            player.points -= section.number;
          }
        }
      }
      section.hits.set(player.id, hits - 1);
    }

    updateSections(section);
    updatePlayers(player);
  }

  const isAllClosed = sections.every((s) => {
    return players.every((p) => {
      return (s.hits.get(p.id) ?? 0) >= 3;
    });
  });

  // TODO: Figure out a neat way to determine if a 3+ player game is already over (without round limit or all sections closed)
  if (isAllClosed && isGameOver === false) {
    setIsGameOver(true);
  }

  return (
    <div className="flex flex-col px-2 gap-2 md:m-auto md:h-full">
      <h1 className="text-3xl font-bold text-center">Cricket</h1>
      <div className="flex md:flex-row md:items-center md:justify-center flex-col md:h-full md:px-18">
        <div className="m-auto w-4/5">
          {roundCount > 0 && (
            <h2 className="text-lg font-bold text-center">
              Round {roundsPlayed}/{roundCount}
            </h2>
          )}
          <div className="flex flex-col px-2 gap-1">
            <SectionTable
              sections={sections}
              players={players}
              handler={updateHitsOrAwardPoints}
            />
          </div>
          <div className="flex flex-row gap-2 mt-8 justify-center items-center">
            {mode === "add" ? (
              <Button
                className={`bg-accent/80 w-fit aspect-square border h-full`}
                onClick={() => setMode("remove")}
              >
                <Plus />
              </Button>
            ) : (
              <Button
                className={`bg-secondary/80 w-fit aspect-square border h-full`}
                onClick={() => setMode("add")}
              >
                <Minus />
              </Button>
            )}
            {roundCount > 0 && (
              <Button
                className="w-fit aspect-square h-full border"
                onClick={() => {
                  if (roundsPlayed === roundCount) return setIsGameOver(true);
                  setRoundsPlayed(roundsPlayed + 1);
                }}
              >
                {roundCount === roundsPlayed ? (
                  <Check />
                ) : (
                  <ArrowBigRightDash />
                )}
              </Button>
            )}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4 prose">
            Use the button above to toggle between adding/removing hits. Click a
            cell in the table to update.
          </p>
          {roundCount > 0 && (
            <p className="text-center text-sm text-gray-500 mt-4 prose">
              Use the button on the right to increase round count.
            </p>
          )}
        </div>
      </div>
      <GameOverDialog players={players} gameOver={isGameOver} />
    </div>
  );
}

function GameOverDialog({
  gameOver,
  players,
}: {
  gameOver: boolean;
  players: Player[];
}) {
  const [winner] = Array.from(players).sort((a, b) => b.points - a.points);

  return (
    <Dialog open={gameOver}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{winner.name} won!</DialogTitle>
          <DialogDescription>
            <p>{winner.name} won the game. </p>
            <Button onClick={() => window.location.reload()}>Play Again</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
