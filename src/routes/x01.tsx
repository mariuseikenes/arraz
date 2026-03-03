import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Plus, X } from "lucide-react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Dart from "../logo.svg?react";

import InteractiveDartboard from "../components/InteractiveDartboard";

import { generateUUID } from "@/lib/uuid.ts";
import localStorageHelper from "@/lib/localStorageHelper.ts";

export const Route = createFileRoute("/x01")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Scorekeeping for the popular dart game 'X01'. Play 301, 501, 701 or 1001 with an interactive dartboard for simple scorekeeping. Configure double ins & outs, legs and sets.",
      },
      {
        title: "X01 Scorekeeping Online",
      },
    ],
  }),
});

type Player = {
  name: string;
  rounds: [Throw, Throw, Throw][];
  id: string;
  score: number;
};

type Turn = {
  playerId: string;
  throws: Throw[];
};

type Throw = {
  multiplier: number;
  score: number;
};

type Config = {
  goal: number;
  doubleout: boolean;
  doublein: boolean;
  legs: number; // first to
  sets: number; // first to
};

type CurrentTurn = {
  player: Player;
  throws: Throw[];
};

type Leg = {
  id: string;
  winnerId: string | null; // player id
  history: Turn[];
};

type Set = {
  winnerId: string | null;
  legs: Leg[];
};

const isSelectedGoal = (goal: number, config: Config) => goal === config.goal;

function RouteComponent() {
  const [config, setConfig] = useState<Config>({
    goal: localStorageHelper.get("x01_goal"),
    doubleout: localStorageHelper.get("x01_doubleout"),
    doublein: localStorageHelper.get("x01_doublein"),
    legs: localStorageHelper.get("x01_legs"),
    sets: localStorageHelper.get("x01_sets"),
  });
  const playerNames: string[] = localStorageHelper.get("playerNames");
  const [players, setPlayers] = useState<Player[]>(
    playerNames
      ? playerNames.map((p: string) => ({
          name: p,
          rounds: [],
          id: generateUUID(),
          score: 0,
        }))
      : [
          {
            name: "Player 1",
            rounds: [],
            id: generateUUID(),
            score: 0,
          },
          {
            name: "Player 2",
            rounds: [],
            id: generateUUID(),
            score: 0,
          },
        ],
  );
  const [ready, setReady] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<CurrentTurn>({
    player: players[0],
    throws: [],
  });
  const [currentScore, setCurrentScore] = useState<number>(501);
  const [gameOver, setGameOver] = useState(false);
  const [legEnded, setLegEnded] = useState(false);
  const [busted, setBusted] = useState(false);
  const [currentLeg, setCurrentLeg] = useState<Leg>({
    id: generateUUID(),
    winnerId: null,
    history: [],
  });

  const [currentSet, setCurrentSet] = useState<Set>({
    winnerId: null,
    legs: [],
  });
  const [setEnded, setSetEnded] = useState(false);
  const [sets, setSets] = useState<Set[]>([]);

  const handleUpdatePlayerNameById = (idToUpdate: string, newName: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === idToUpdate ? { ...player, name: newName } : player,
      ),
    );
  };

  const handleReady = () => {
    localStorageHelper.set("x01_goal", config.goal);
    localStorageHelper.set("x01_doublein", config.doublein);
    localStorageHelper.set("x01_doubleout", config.doubleout);
    localStorageHelper.set("x01_legs", config.legs);
    localStorageHelper.set("x01_sets", config.sets);
    localStorageHelper.set(
      "playerNames",
      players.map((p) => p.name),
    );

    setReady(true);
    setCurrentScore(config.goal);
    setPlayers(players.map((p) => ({ ...p, score: config.goal })));
    setCurrentTurn({
      player: players[0],
      throws: [],
    });
  };

  if (!ready) {
    return (
      <main className="flex flex-col p-2 gap-4 items-center w-4/5 md:w-2/3 mx-auto justify-center">
        <a href="/" className="w-full" aria-label="Back">
          <div className="p-2 border w-fit bg-white/10 rounded-md">
            <FaLongArrowAltLeft className="text-white" />
          </div>
        </a>
        <h1 className="text-3xl text-center font-bold">X01</h1>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="starting-score"
            className="text-left text-xl font-semibold"
          >
            Starting Score:
          </label>
          <ButtonGroup
            id="starting-score"
            className="border border-accent rounded-md mx-auto"
          >
            <Button
              className={`${isSelectedGoal(301, config) ? "text-bg bg-text border " : ""}`}
              onClick={() => setConfig((old) => ({ ...old, goal: 301 }))}
            >
              301
            </Button>
            <Button
              className={`${isSelectedGoal(501, config) ? "text-bg bg-text border " : ""}`}
              onClick={() => setConfig((old) => ({ ...old, goal: 501 }))}
            >
              501
            </Button>
            <Button
              className={`${isSelectedGoal(701, config) ? "text-bg bg-text border " : ""}`}
              onClick={() => setConfig((old) => ({ ...old, goal: 701 }))}
            >
              701
            </Button>
            <Button
              className={`${isSelectedGoal(1001, config) ? "text-bg bg-text border" : ""}`}
              onClick={() => setConfig((old) => ({ ...old, goal: 1001 }))}
            >
              1001
            </Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-xl font-semibold">Double Ins & Outs</h2>
          <div className="inline-flex justify-between w-full">
            <label className="text-left" htmlFor="double-in">
              Double In:
            </label>
            <Switch
              id="double-in"
              onCheckedChange={(checked) =>
                setConfig((old) => ({ ...old, doublein: checked }))
              }
              checked={config.doublein}
            />
          </div>
          <div className="inline-flex justify-between w-full">
            <label className="text-left" htmlFor="double-out">
              Double Out:
            </label>
            <Switch
              id="double-out"
              onCheckedChange={(checked) =>
                setConfig((old) => ({ ...old, doubleout: checked }))
              }
              checked={config.doubleout}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-xl font-semibold">Legs & Sets</h2>
          <div className="inline-flex justify-between w-full">
            <label className="text-left" htmlFor="legs">Legs: </label>
            <input
              id="legs"
              type="number"
              className="bg-text rounded-sm text-center active:border border-accent text-bg w-8 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
              onChange={(e) =>
                setConfig((old) => ({ ...old, legs: Number(e.target.value) }))
              }
              value={config.legs}
            />
          </div>
          <div className="inline-flex justify-between w-full">
            <label className="text-left" htmlFor="sets">
              Sets:
            </label>
            <input
              id="sets"
              type="number"
              className="bg-text text-center rounded-sm active:border border-accent text-bg w-8 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
              onChange={(e) =>
                setConfig((old) => ({ ...old, sets: Number(e.target.value) }))
              }
              value={config.sets}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full mt-2">
          <h2 className="text-xl font-semibold inline-flex justify-between">
            Players
            <button
              aria-label="Add Player"
              className="bg-text text-bg w-8 h-8 font-normal rounded-sm flex items-center justify-center text-xs"
              onClick={() => {
                setPlayers([
                  ...players,
                  {
                    score: 0,
                    name: "New Player",
                    rounds: [],
                    id: generateUUID(),
                  },
                ]);
              }}
            >
              <Plus />
            </button>
          </h2>
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
          {" "}
          Play{" "}
        </Button>
      </main>
    );
  }

  const handleBoardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentTurn.throws.length >= 3 || busted) return;
    const target = event.target as SVGElement;

    if (target.id === "miss") return handleMiss()
    if (target.id && target.dataset.score && target.dataset.multiplier) {
      const score = parseInt(target.dataset.score, 10);
      const multiplier = parseInt(target.dataset.multiplier, 10);
      const totalPoints = score * multiplier;

      setCurrentTurn((prev) => ({
        ...prev,
        throws: [...prev.throws, { score, multiplier }],
      }));

      if (multiplier !== 2 && config.doublein && currentScore === config.goal) {
        return;
      }

      setCurrentScore(currentScore - totalPoints);
      if (currentScore - totalPoints < 0) return setBusted(true);
      if (config.doubleout && currentScore - totalPoints === 1)
        return setBusted(true);

      if (currentScore - totalPoints === 0) {
        if (config.doubleout && multiplier !== 2) return setBusted(true);
        const winnerId = currentTurn.player.id;

        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === currentTurn.player.id
              ? { ...player, score: 0 }
              : player,
          ),
        );

        const finishedLeg: Leg = {
          ...currentLeg,
          winnerId,
          history: [
            ...currentLeg.history,
            {
              throws: [...currentTurn.throws, { score, multiplier }],
              playerId: currentTurn.player.id,
            },
          ],
        };

        const legsWonByPlayer =
          currentSet.legs.filter((l) => l.winnerId === winnerId).length + 1;
        const setWon = legsWonByPlayer >= Math.ceil(config.legs / 2);

        if (setWon) {
          const finishedSet: Set = {
            winnerId,
            legs: [...currentSet.legs, finishedLeg],
          };

          const setsWonByPlayer =
            sets.filter((s) => s.winnerId === winnerId).length + 1;
          const gameWon = setsWonByPlayer >= Math.ceil(config.sets / 2);

          if (gameWon) {
            setSets((o) => [...o, finishedSet]);
            setCurrentSet(finishedSet);
            setCurrentLeg(finishedLeg);
            setGameOver(true);
            return;
          }

          setSets((o) => [...o, finishedSet]);
          setCurrentSet(finishedSet);
          setCurrentLeg(finishedLeg);
          setSetEnded(true);
          return;
        }

        setCurrentLeg(finishedLeg);
        setLegEnded(true);
        return;
      }
    }
  };

  const handleMiss = () => {
    if (currentTurn.throws.length >= 3 || busted) return;
    setCurrentTurn((prev) => ({
      ...prev,
      throws: [...prev.throws, { score: 0, multiplier: 1 }],
    }));
  };

  const handleNewLeg = () => {
    if (!legEnded) return;
    setLegEnded(false);
    setCurrentSet((o) => ({
      ...o,
      legs: [...o.legs, currentLeg],
    }));
    setCurrentLeg({
      id: generateUUID(),
      winnerId: null,
      history: [],
    });
    setPlayers(players.map((o) => ({ ...o, score: config.goal, rounds: [] })));
    setCurrentTurn({
      player: players[0],
      throws: [],
    });
    setCurrentScore(config.goal);
  };

  const handleNewSet = () => {
    setSetEnded(false);
    setCurrentSet({ winnerId: null, legs: [] });
    setCurrentLeg({ id: generateUUID(), winnerId: null, history: [] });
    setCurrentTurn({
      player: players[0],
      throws: [],
    });
    setCurrentScore(config.goal);
    setPlayers(players.map((o) => ({ ...o, score: config.goal, rounds: [] })));
  };

  function handleNextPlayer() {
    setBusted(false);
    const finishedPlayer = players.find((p) => p.id === currentTurn.player.id);
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === currentTurn.player.id
          ? {
              ...player,
              score: busted ? (finishedPlayer?.score ?? 0) : currentScore,
            }
          : player,
      ),
    );

    const nextIndex =
      players.indexOf(
        players.find((p) => p.id === currentTurn.player.id) as Player,
      ) + 1;
    const nextPlayer =
      nextIndex > players.length - 1 ? players[0] : players[nextIndex];
    setCurrentLeg((o) => ({
      ...o,
      history: [
        ...o.history,
        {
          playerId: finishedPlayer?.id || "",
          throws: currentTurn.throws,
        },
      ],
    }));
    setCurrentTurn({
      player: nextPlayer,
      throws: [],
    });
    setCurrentScore(
      nextPlayer.id === currentTurn.player.id && !busted ? currentScore : nextPlayer.score,
    );
  }
  function handleDeleteLast() {
    if (currentTurn.throws.length === 0) {
      return;
    }

    const lastThrow = currentTurn.throws.at(-1);

    if (!lastThrow) {
      return;
    }

    const newCurrentTurnThrows = currentTurn.throws.slice(0, -1);

    const scoreToRestore =
      currentScore === config.goal ? 0 : lastThrow.multiplier * lastThrow.score;
    const newCurrentScore = currentScore + scoreToRestore;

    setCurrentScore(newCurrentScore);
    setCurrentTurn(o=>({...o, throws: newCurrentTurnThrows}));

    if (busted) {
      setBusted(false);
    }
  }

  const activePlayer = players.find((p) => p.id === currentTurn.player.id);

  if (!activePlayer || activePlayer.score === 0) handleNextPlayer();
  return (
    <div className="flex flex-col px-2 gap-2 md:m-auto md:h-full">
      <div className="flex-row flex md:flex-row justify-between md:w-1/2 md:m-auto">
        <p>
          Leg {currentSet.legs.length + 1}/{config.legs}
        </p>
        <h2 className="w-fit text-2xl font-bold text-center">
          {players.find((p) => p.id === currentTurn.player.id)?.name}'s turn
        </h2>
        <p>
          Set {sets.length + 1}/{config.sets}
        </p>
      </div>
      <div className="flex md:flex-row flex-col md:h-full md:px-18">
        {/* @ts-ignore */}
        <div
          onClick={handleBoardClick}
          className="dartboard-container h-auto md:w-1/2 md:p-8"
        >
          <InteractiveDartboard />
        </div>

        <div className="h-full flex flex-col gap-4 m-auto">
          <div
            className={`${busted && "text-red-500"} flex flex-row px-4 h-fit`}
          >
            <div className="flex flex-col">
              <p> Score: </p>
              <p className={`font-semibold text-7xl`}> {currentScore} </p>
            </div>
            <div className="flex flex-row text-7xl m-auto items-center h-full justify-center">
              <div className="relative flex items-center justify-center">
                {currentTurn.throws[0] && (
                  <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                    {currentTurn.throws[0].score * currentTurn.throws[0].multiplier}
                  </p>
                )}
                <Dart
                  className={`${currentTurn.throws.length >= 1 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
                />
              </div>
              <div className="relative flex items-center justify-center">
                {currentTurn.throws[1] && (
                  <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                    {currentTurn.throws[1].score * currentTurn.throws[1].multiplier}
                  </p>
                )}
                <Dart
                  className={`${currentTurn.throws.length >= 2 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
                />
              </div>
              <div className="relative flex items-center justify-center">
                {currentTurn.throws[2] && (
                  <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                    {currentTurn.throws[2].score * currentTurn.throws[2].multiplier}
                  </p>
                )}
                <Dart
                  className={`${currentTurn.throws.length >= 3 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
                />
              </div>
            </div>
          </div>
          <Button
            variant="default"
            disabled={
              currentTurn.throws.length !== 3 && !busted && activePlayer?.score !== 0
            }
            className={`border ${currentTurn.throws.length === 3 || busted || activePlayer?.score == 0 ? "shadow shadow-accent border-accent" : "border-secondary"} w-1/2 m-auto`}
            size="lg"
            onClick={handleNextPlayer}
          >
            Next
          </Button>
          <Button
            variant="destructive"
            className={`border w-1/2 m-auto`}
            onClick={handleMiss}
            size="lg"
          >
            Miss
          </Button>
          <Button className="border w-1/2 m-auto" onClick={handleDeleteLast}>
            Undo Last
          </Button>
        </div>
      </div>
      <LegOverDialog
        players={players}
        legEnded={legEnded && !setEnded && !gameOver}
        currentLeg={currentLeg}
        continueGame={handleNewLeg}
      />
      <SetOverDialog
        setEnded={setEnded && !gameOver}
        players={players}
        currentSet={currentSet}
        continueGame={handleNewSet}
      />
      <GameOverDialog gameOver={gameOver} players={players} sets={sets} />
    </div>
  );
}

function LegOverDialog({
  legEnded,
  currentLeg,
  continueGame,
  players,
}: {
  legEnded: boolean;
  currentLeg: Leg;
  continueGame: () => void;
  players: Player[];
}) {
  return (
    <Dialog open={legEnded}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {players.find((p) => p.id === currentLeg.winnerId)?.name} won this
            leg!
          </DialogTitle>
          <DialogDescription>
            <div className="w-2/3 m-auto">
              {players
                .sort((a, b) => a.score - b.score)
                .map((p) => (
                  <p className="text-left">
                    {p.name}: {p.score} points
                  </p>
                ))}
            </div>
            <Button onClick={continueGame}>Continue</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function SetOverDialog({
  setEnded,
  currentSet,
  continueGame,
  players,
}: {
  setEnded: boolean;
  currentSet: Set;
  continueGame: () => void;
  players: Player[];
}) {
  const winner = currentSet.legs.at(-1)?.winnerId ?? "None";
  const playerObj = players.find((p) => p.id === winner);
  const playerToLegWins = players
    .map((p) => ({
      player: p.id,
      name: p.name,
      wins: currentSet.legs.filter((s) => s.winnerId === p.id).length,
    }))
    .sort((a, b) => b.wins - a.wins);

  return (
    <Dialog open={setEnded}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {players.find((p) => p.id === currentSet.winnerId)?.name} won this
            set!
          </DialogTitle>
          <DialogDescription>
            {playerObj?.name} won the most legs and takes this set.
            {playerToLegWins.map((p) => (
              <p className="text-left">
                {p.name}: {p.wins} leg{p.wins !== 1 && "s"}
              </p>
            ))}
            <Button onClick={continueGame}>Continue</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function GameOverDialog({
  gameOver,
  sets,
  players,
}: {
  gameOver: boolean;
  sets: Set[];
  players: Player[];
}) {
  const playerToSetWins = players
    .map((p) => ({
      player: p.id,
      name: p.name,
      wins: sets.filter((s) => s.winnerId === p.id).length,
    }))
    .sort((a, b) => b.wins - a.wins);

  const winner = playerToSetWins[0];

  return (
    <Dialog open={gameOver}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{winner?.name} won!</DialogTitle>
          <DialogDescription>
            {winner?.name} won the game.
            {playerToSetWins.map((p) => (
              <p key={p.player} className="text-left">
                {p.name}: {p.wins} set{p.wins !== 1 && "s"}
              </p>
            ))}
            <Button onClick={() => window.location.reload()}>Play Again</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
