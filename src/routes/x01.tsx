import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Switch } from "@/components/ui/switch";
import { Plus, X } from "lucide-react";
import InteractiveDartboard from "../components/InteractiveDartboard"; // Import your new component

import Dart from "../logo.svg?react";

import { generateUUID } from "../lib/uuid.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setLocalStorageFromObject } from "@/lib/utils.ts";

export const Route = createFileRoute("/x01")({
  component: RouteComponent,
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
    goal: Number(localStorage.getItem("goal")) || 501,
    doubleout: localStorage.getItem("doubleout") === "true" ? true : false,
    doublein: localStorage.getItem("doublein") === "true" ? true : false,
    legs: Number(localStorage.getItem("legs")) || 1,
    sets: Number(localStorage.getItem("sets")) || 1,
  });
  const playerNames = localStorage.getItem("playerNames")?.split(",");
  const [players, setPlayers] = useState<Player[]>(
    playerNames
      ? playerNames.map((p) => ({
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
  const [playerTurn, setPlayerTurn] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<Throw[]>([]);
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
    setLocalStorageFromObject(config);
    localStorage.setItem("playerNames", players.map(p=>p.name).join(","))

    setReady(true);
    setCurrentScore(config.goal);
    setPlayers(players.map((p) => ({ ...p, score: config.goal })));
    setPlayerTurn(players[0].id);
  };

  if (!ready) {
    return (
      <div className="flex flex-col p-2 gap-4 items-center w-2/3 mx-auto justify-center">
        <h1 className="text-3xl text-center font-bold">X01</h1>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-left text-xl font-semibold">
            Starting Score:
          </label>
          <ButtonGroup className="border border-accent rounded-md mx-auto">
            <Button
              className={`${isSelectedGoal(301, config) ? "text-bg bg-text border " : ""}`}
              onClick={() => setConfig((old) => ({ ...old, goal: 301 }))}
            >
              {" "}
              301{" "}
            </Button>
            <Button
              className={`${isSelectedGoal(501, config) ? "text-bg bg-text border " : ""}`}
              onClick={() => setConfig((old) => ({ ...old, goal: 501 }))}
            >
              {" "}
              501{" "}
            </Button>
            <Button
              className={`${isSelectedGoal(701, config) ? "text-bg bg-text border " : ""}`}
              onClick={() => setConfig((old) => ({ ...old, goal: 701 }))}
            >
              {" "}
              701{" "}
            </Button>
            <Button
              className={`${isSelectedGoal(1001, config) ? "text-bg bg-text border" : ""}`}
              onClick={() => setConfig((old) => ({ ...old, goal: 1001 }))}
            >
              {" "}
              1001{" "}
            </Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xl font-semibold">Double Ins & Outs</label>
          <div className="inline-flex justify-between w-full">
            <label className="text-left">Double In: </label>
            <Switch
              className=""
              onCheckedChange={(checked) =>
                setConfig((old) => ({ ...old, doublein: checked }))
              }
              checked={config.doublein}
            />
          </div>
          <div className="inline-flex justify-between w-full">
            <label className="text-left">Double Out: </label>
            <Switch
              className=""
              onCheckedChange={(checked) =>
                setConfig((old) => ({ ...old, doubleout: checked }))
              }
              checked={config.doubleout}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xl font-semibold">Legs & Sets</label>
          <div className="inline-flex justify-between w-full">
            <label className="text-left">Legs: </label>

            <input
              type="number"
              className="bg-text rounded-sm text-center active:border border-accent text-bg w-8 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
              onChange={(e) =>
                setConfig((old) => ({ ...old, legs: Number(e.target.value) }))
              }
              value={config.legs}
            />
          </div>
          <div className="inline-flex justify-between w-full">
            <label className="text-left">Sets: </label>
            <input
              type="number"
              className="bg-text text-center rounded-sm active:border border-accent text-bg w-8 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
              onChange={(e) =>
                setConfig((old) => ({ ...old, sets: Number(e.target.value) }))
              }
              value={config.sets}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xl font-semibold inline-flex justify-between">
            Players{" "}
            <button
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
              {" "}
              <Plus />{" "}
            </button>{" "}
          </label>
          {players.map((p) => (
            <div className="inline-flex gap-2" key={p.id}>
              <input
                value={p.name}
                onChange={(e) => {
                  handleUpdatePlayerNameById(p.id, e.target.value);
                }}
                className="bg-text rounded-sm text-bg p-1"
              />
              <button
                className="text-xl text-text/50 hover:text-text"
                onClick={() => {
                  setPlayers(players.filter((pl) => pl.id !== p.id));
                }}
              >
                {" "}
                <X />{" "}
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
      </div>
    );
  }

  const handleBoardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentTurn.length >= 3 || busted) return;
    const target = event.target as SVGElement;

    if (target.id && target.dataset.score && target.dataset.multiplier) {
      const segmentId = target.id;
      const score = parseInt(target.dataset.score, 10);
      const multiplier = parseInt(target.dataset.multiplier, 10);
      const totalPoints = score * multiplier;

      console.log(`Hit: ${segmentId}, Points: ${totalPoints}`);

      setCurrentTurn((prev) => [...prev, { score, multiplier }]);

      if (multiplier !== 2 && config.doublein && currentScore === config.goal) {
        return;
      }

      setCurrentScore(currentScore - totalPoints);
      if (currentScore - totalPoints < 0) return setBusted(true);
      if (config.doubleout && currentScore - totalPoints === 1)
        return setBusted(true);

      if (currentScore - totalPoints === 0) {
        if (config.doubleout && multiplier !== 2) return setBusted(true);

        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === playerTurn ? { ...player, score: 0 } : player,
          ),
        );

        const finishedLeg: Leg = {
          ...currentLeg,
          winnerId: playerTurn,
          history: [
            ...currentLeg.history,
            {
              throws: [...currentTurn, { score, multiplier }],
              playerId: playerTurn,
            },
          ],
        };

        const legsWonByPlayer =
          currentSet.legs.filter((l) => l.winnerId === playerTurn).length + 1;
        const setWon = legsWonByPlayer >= Math.ceil(config.legs / 2);

        if (setWon) {
          const finishedSet: Set = {
            winnerId: playerTurn,
            legs: [...currentSet.legs, finishedLeg],
          };

          const setsWonByPlayer =
            sets.filter((s) => s.winnerId === playerTurn).length + 1;
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
    if (currentTurn.length >= 3 || busted) return;

    setCurrentTurn((prev) => [...prev, { score: 0, multiplier: 1 }]);
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
    setPlayerTurn(players[0].id);
    setCurrentTurn([]);
    setCurrentScore(config.goal);
  };

  const handleNewSet = () => {
    setSetEnded(false);
    setCurrentSet({ winnerId: null, legs: [] });
    setCurrentLeg({ id: generateUUID(), winnerId: null, history: [] });
    setPlayerTurn(players[0].id);
    setCurrentTurn([]);
    setCurrentScore(config.goal);
    setPlayers(players.map((o) => ({ ...o, score: config.goal, rounds: [] })));
  };

  function handleNextPlayer() {
    setBusted(false);
    const finishedPlayer = players.find((p) => p.id === playerTurn);
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerTurn
          ? {
              ...player,
              score: busted ? (finishedPlayer?.score ?? 0) : currentScore,
            }
          : player,
      ),
    );

    const nextIndex =
      players.indexOf(players.find((p) => p.id === playerTurn) as Player) + 1;
    const nextPlayer =
      nextIndex > players.length - 1 ? players[0] : players[nextIndex];
    setCurrentLeg((o) => ({
      ...o,
      history: [
        ...o.history,
        {
          playerId: finishedPlayer?.id || "",
          throws: currentTurn,
        },
      ],
    }));
    setCurrentTurn([]);
    setCurrentScore(
      nextPlayer.id === playerTurn && !busted ? currentScore : nextPlayer.score,
    );
    setPlayerTurn(nextPlayer.id);
  }
  function handleDeleteLast() {
    if (currentTurn.length === 0) {
      return;
    }

    const lastThrow = currentTurn.at(-1);

    if (!lastThrow) {
      return;
    }

    const newCurrentTurn = currentTurn.slice(0, -1);

    const scoreToRestore =
      currentScore === config.goal ? 0 : lastThrow.multiplier * lastThrow.score;
    const newCurrentScore = currentScore + scoreToRestore;

    setCurrentScore(newCurrentScore);
    setCurrentTurn(newCurrentTurn);

    if (busted) {
      setBusted(false);
    }
  }

  const activePlayer = players.find((p) => p.id === playerTurn);

  if (activePlayer?.score === 0) handleNextPlayer();
  return (
    <div className="flex flex-col px-2 gap-2 md:m-auto md:h-full">
      <div className="flex-row flex md:flex-row justify-between md:w-1/2 md:m-auto">
        <p>
          Leg {currentSet.legs.length + 1}/{config.legs}
        </p>
        <h2 className="w-fit text-2xl font-bold text-center">
          {players.find((p) => p.id === playerTurn)?.name}'s turn{" "}
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
                {currentTurn[0] && (
                  <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                    {currentTurn[0].score * currentTurn[0].multiplier}
                  </p>
                )}
                <Dart
                  className={`${currentTurn.length >= 1 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
                />
              </div>
              <div className="relative flex items-center justify-center">
                {currentTurn[1] && (
                  <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                    {currentTurn[1].score * currentTurn[1].multiplier}
                  </p>
                )}
                <Dart
                  className={`${currentTurn.length >= 2 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
                />
              </div>
              <div className="relative flex items-center justify-center">
                {currentTurn[2] && (
                  <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                    {currentTurn[2].score * currentTurn[2].multiplier}
                  </p>
                )}
                <Dart
                  className={`${currentTurn.length >= 3 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
                />
              </div>
            </div>
          </div>
          <Button
            variant="default"
            disabled={
              currentTurn.length !== 3 && !busted && activePlayer?.score !== 0
            }
            className={`border ${currentTurn.length === 3 || busted || activePlayer?.score == 0 ? "shadow shadow-accent border-accent" : "border-secondary"} w-1/2 m-auto`}
            size="lg"
            onClick={handleNextPlayer}
          >
            {" "}
            Next{" "}
          </Button>
          <Button
            variant="destructive"
            className={`border w-1/2 m-auto`}
            onClick={handleMiss}
            size="lg"
          >
            {" "}
            Miss{" "}
          </Button>
          <Button className="border w-1/2 m-auto" onClick={handleDeleteLast}>
            {" "}
            Undo Last{" "}
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
