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

import { ArrowBigRightDash, Calculator, CircleX, Plus, Target, Undo2, X } from "lucide-react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Dart from "../../logo.svg?react";

import InteractiveDartboard from "../../components/InteractiveDartboard";

import { generateUUID } from "@/lib/uuid.ts";
import localStorageHelper from "@/lib/localStorageHelper.ts";
import { Divider } from "@/components/Divider";
import { useX01Game, type ConfigX01, type CurrentTurnX01, type GameState, type LegX01, type PlayerX01, type SetX01, type ThrowX01 } from "@/hooks/useX01Game";

export const Route = createFileRoute("/games/x01")({
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

const isSelectedGoal = (goal: number, config: ConfigX01) => goal === config.goal;

function ManualScorer({ game, config }: { game: GameState; config: ConfigX01 }) {
  const [input, setInput] = useState("");
  const {
    currentTurn,
    busted,
    setCurrentTurn,
    currentScore,
    setBusted,
    setCurrentScore,
    players,
    setPlayers,
    handleNextPlayer,
    sets,
    setSets,
    setCurrentLeg,
    setLegEnded,
    currentLeg,
    setCurrentSet,
    setSetEnded,
    currentSet,
    setGameOver,
  } = game;

  const turnSubmitted = currentTurn.throws.length > 0;

  const handleSubmitTurn = () => {
    const value = parseInt(input, 10);
    if (isNaN(value) || value < 0 || value > 180 || turnSubmitted) return;

    const throws: [ThrowX01, ThrowX01, ThrowX01] = [
      { score: value, multiplier: 1 },
      { score: 0, multiplier: 1 },
      { score: 0, multiplier: 1 },
    ];

    setCurrentTurn((prev) => ({ ...prev, throws }));

    const newScore = currentScore - value;

    if (newScore < 0 || (config.doubleout && newScore === 1)) {
      setBusted(true);
    } else {
      setCurrentScore(newScore);
    }

    if (newScore === 0) {
        const winnerId = currentTurn.player.id;
        setInput("")
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === currentTurn.player.id
              ? { ...player, score: 0 }
              : player,
          ),
        );

        const finishedLeg = {
          ...currentLeg,
          winnerId,
          history: [
            ...currentLeg.history,
            {
              throws: [{
                score: value,
                multiplier: 1
              }],
              playerId: currentTurn.player.id,
            },
          ],
        };

        const legsWonByPlayer =
          currentSet.legs.filter((l) => l.winnerId === winnerId).length + 1;
        const setWon = legsWonByPlayer === config.legs;

        if (setWon) {
          const finishedSet = {
            winnerId,
            legs: [...currentSet.legs, finishedLeg],
          };

          const setsWonByPlayer =
            sets.filter((s) => s.winnerId === winnerId).length + 1;
          const gameWon = setsWonByPlayer === config.sets

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

    setInput("");
  };

  const handleNumpad = (digit: string) => {
    if (turnSubmitted || busted) return;
    setInput((prev) => {
      const next = prev + digit;
      if (parseInt(next, 10) > 180) return prev;
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4 md:w-1/2 md:m-auto px-4">
      <div className={`${busted ? "text-red-500" : ""} flex flex-col`}>
        <p>Score:</p>
        <p className="font-semibold text-7xl">{currentScore}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="manual-score" className="text-sm">
          Enter total points scored this turn:
        </label>
        <input
          id="manual-score"
          type="text"
          inputMode="none"
          value={input}
          readOnly
          disabled={turnSubmitted || busted}
          placeholder="0-180"
          className="bg-text text-bg rounded-sm p-2 h-14 w-full text-center text-3xl font-semibold"
        />

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <Button
              key={n}
              className="h-14 text-xl font-semibold border  "
              disabled={turnSubmitted || busted}
              onClick={() => handleNumpad(String(n))}
            >
              {n}
            </Button>
          ))}
          <Button
            variant="secondary"
            className="h-14 text-xl font-semibold border"
            disabled={turnSubmitted || busted || input.length === 0}
            onClick={() => setInput((prev) => prev.slice(0, -1))}
          >
            ⌫
          </Button>
          <Button
            className="h-14 text-xl font-semibold border  "
            disabled={turnSubmitted || busted}
            onClick={() => handleNumpad("0")}
          >
            0
          </Button>
          <Button
            className="h-14 text-xl font-semibold border border-accent text-accent"
            disabled={turnSubmitted || busted || input.length === 0}
            onClick={handleSubmitTurn}
          >
            ✓
          </Button>
        </div>
      </div>

      {(
        <div className="flex flex-row gap-2 justify-center">
          <Button
            disabled={!(turnSubmitted || busted)}
            variant={"default"}
            className={`${(turnSubmitted || busted) ? "opacity-100" : "opacity-40"} h-12 border shadow shadow-accent border-accent text-accent`}
            onClick={handleNextPlayer}
          >
            <ArrowBigRightDash className="mr-1" /> Next Player
          </Button>
        </div>
      )}

      <Divider className="my-2" />
      <StatSection
        sets={sets}
        currentLeg={currentLeg}
        players={players}
        currentSet={currentSet}
        config={config}
        currentTurn={currentTurn}
      />
    </div>
  );
}

function BoardScorer({
  game,
  config,
}: {
  game: GameState;
  config: ConfigX01;
}) {
  const {
    currentTurn,
    busted,
    setCurrentTurn,
    currentScore,
    setBusted,
    setCurrentScore,
    players,
    handleDeleteLast,
    handleNextPlayer,
    sets,
    currentLeg,
    currentSet,
    setPlayers,
    setSetEnded,
    setSets,
    setCurrentLeg,
    setCurrentSet,
    setGameOver,
    setLegEnded
  } = game;

  const activePlayer = players.find((p) => p.id === currentTurn.player.id);

  const handleBoardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentTurn.throws.length >= 3 || busted) return;
    const target = event.target as SVGElement;

    if (target.id === "miss") return handleMiss();
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

        const finishedLeg = {
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
        const setWon = legsWonByPlayer === config.legs;

        if (setWon) {
          const finishedSet: SetX01 = {
            winnerId,
            legs: [...currentSet.legs, finishedLeg],
          };

          const setsWonByPlayer =
            sets.filter((s) => s.winnerId === winnerId).length + 1;
          const gameWon = setsWonByPlayer === config.sets

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

  return (
    <div className="flex md:flex-row flex-col md:h-full md:px-18">
      <div
        onClick={handleBoardClick}
        className="dartboard-container h-auto md:w-1/2 md:p-8"
      >
        <InteractiveDartboard />
      </div>
      <div className="h-full md:h-fit flex flex-col gap-4 md:m-0 m-auto">
        <div className={`${busted && "text-red-500"} flex flex-row px-4 h-fit`}>
          <div className="flex flex-col">
            <p> Score: </p>
            <p className={`font-semibold text-7xl`}> {currentScore} </p>
          </div>
          <div className="flex flex-row text-7xl m-auto items-center h-full justify-center">
            <div className="relative flex items-center justify-center">
              {currentTurn.throws[0] && (
                <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                  {currentTurn.throws[0].score *
                    currentTurn.throws[0].multiplier}
                </p>
              )}
              <Dart
                className={`${currentTurn.throws.length >= 1 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
              />
            </div>
            <div className="relative flex items-center justify-center">
              {currentTurn.throws[1] && (
                <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                  {currentTurn.throws[1].score *
                    currentTurn.throws[1].multiplier}
                </p>
              )}
              <Dart
                className={`${currentTurn.throws.length >= 2 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
              />
            </div>
            <div className="relative flex items-center justify-center">
              {currentTurn.throws[2] && (
                <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                  {currentTurn.throws[2].score *
                    currentTurn.throws[2].multiplier}
                </p>
              )}
              <Dart
                className={`${currentTurn.throws.length >= 3 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`}
              />
            </div>
          </div>
        </div>
          <div className="flex flex-row gap-2 justify-center">
            <Button
              variant="destructive"
              className={`border w-fit aspect-square h-12`}
              onClick={handleMiss}
            >
              <CircleX />
            </Button>
            <Button
              className="border w-fit aspect-square h-12"
              onClick={handleDeleteLast}
            >
              <Undo2 />
            </Button>
            <Button
              variant="default"
              disabled={
                currentTurn.throws.length !== 3 &&
                !busted &&
                activePlayer?.score !== 0
              }
              className={`h-12 border ${currentTurn.throws.length === 3 || busted || activePlayer?.score == 0 ? "shadow shadow-accent border-accent text-accent" : "border-secondary"} w-fit aspect-square`}
              onClick={handleNextPlayer}
            >
              <ArrowBigRightDash />
            </Button>
          </div>
        <Divider className="my-2" />
        <StatSection
          sets={sets}
          currentLeg={currentLeg}
          players={players}
          currentSet={currentSet}
          config={config}
          currentTurn={currentTurn}
        />
      </div>
    </div>
  );
}

function StatSection({
  currentLeg,
  currentTurn,
  players,
  config,
  currentSet,
  sets,
}: {
  currentLeg: LegX01;
  currentTurn: CurrentTurnX01;
  players: PlayerX01[];
  config: ConfigX01;
  currentSet: SetX01;
  sets: SetX01[];
}) {
  const throwCount = currentLeg.history
    .filter((p) => p.playerId === currentTurn.player.id)
    .map((t) => t.throws.length)
    .reduce((pV, cV) => (pV += cV), 0);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 px-4 text-2xl">
        <ol>
          {players.map((p) => (
            <li className={currentTurn.player.id === p.id ? "text-accent" : ""}>
              <span className="font-semibold">{p.name}</span>: {p.score}pts
            </li>
          ))}
        </ol>
      </div>
      <Divider className="my-2 md:hidden block" />
      <div className="flex flex-col gap-2 px-4">
        <h3 className="text-2xl">Your Stats:</h3>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-full">
            <p>
              Points Per Dart: {throwCount === 0
                ? "N/A"
                : (
                    (config.goal - currentTurn.player.score) /
                    throwCount
                  ).toFixed(2)}
            </p>
            <p>Darts Thrown: {throwCount}</p>
          </div>
          <div className="flex flex-col w-full">
            <p>
              Legs Won:{" "}
              {
                currentSet.legs.filter(
                  (l) => l.winnerId === currentTurn.player.id,
                ).length
              }
            </p>
            <p>
              Sets Won:{" "}
              {sets.filter((s) => s.winnerId === currentTurn.player.id).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteComponent() {
  const [config, setConfig] = useState<ConfigX01>({
    goal: localStorageHelper.get("x01_goal"),
    doubleout: localStorageHelper.get("x01_doubleout"),
    doublein: localStorageHelper.get("x01_doublein"),
    legs: localStorageHelper.get("x01_legs"),
    sets: localStorageHelper.get("x01_sets"),
  });
  const playerNames: string[] = localStorageHelper.get("playerNames");

  const [ready, setReady] = useState(false);
  
  const [manualScorer, setManualScorer] = useState(true);
  const game = useX01Game(playerNames
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
        ], config);

  const handleUpdatePlayerNameById = (idToUpdate: string, newName: string) => {
    game.setPlayers((prevPlayers) =>
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
      game.players.map((p) => p.name),
    );

    setReady(true);
    game.setCurrentScore(config.goal);
    game.setPlayers(game.players.map((p) => ({ ...p, score: config.goal })));
    game.setCurrentTurn({
      player: game.players[0],
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
          <h2 className="text-xl font-semibold inline-flex items-center gap-2">Double Ins & Outs</h2>
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
            <label className="text-left" htmlFor="legs">
              Legs:{" "}
            </label>
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
                game.setPlayers([
                  ...game.players,
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
          {game.players.map((p) => (
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
                  game.setPlayers(game.players.filter((pl) => pl.id !== p.id));
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

  const activePlayer = game.players.find((p) => p.id === game.currentTurn.player.id);
  if (!activePlayer || activePlayer.score === 0) game.handleNextPlayer();

  return (
    <div className="flex flex-col px-2 gap-2 md:m-auto md:h-full">
      <div className="flex-row flex md:flex-row justify-between md:w-1/2 md:m-auto">
        <p>
          Leg {game.currentSet.legs.length + 1}/{config.legs}
        </p>
        <h2 className="w-fit text-2xl font-bold text-center inline-flex gap-2">
          {game.players.find((p) => p.id === game.currentTurn.player.id)?.name}'s turn
          <Button variant={"default"} className="border border-accent h-10 w-10" onClick={()=>setManualScorer(!manualScorer)}> {manualScorer ? <Target /> : <Calculator />} </Button>
        </h2>
        <p>
          Set {game.sets.length + 1}/{config.sets}
        </p>
      </div>

      {manualScorer ? (
        <ManualScorer game={game} config={config} />
      ) : (
        <BoardScorer game={game} config={config} />
      )}
      <LegOverDialog
        players={game.players}
        legEnded={game.legEnded && !game.setEnded && !game.gameOver}
        currentLeg={game.currentLeg}
        continueGame={game.handleNewLeg}
      />
      <SetOverDialog
        setEnded={game.setEnded && !game.gameOver}
        players={game.players}
        currentSet={game.currentSet}
        continueGame={game.handleNewSet}
      />
      <GameOverDialog gameOver={game.gameOver} players={game.players} sets={game.sets} />
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
  currentLeg: LegX01;
  continueGame: () => void;
  players: PlayerX01[];
}) {
  return (
    <Dialog open={legEnded}>
      <DialogContent
        className="border border-secondary"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>
            {players.find((p) => p.id === currentLeg.winnerId)?.name} won this
            leg!
          </DialogTitle>
          <DialogDescription>
            <div className="w-2/3 m-auto">
              {[...players]
                .sort((a, b) => a.score - b.score)
                .map((p) => (
                  <p className="text-left">
                    {p.name}: {p.score} points
                  </p>
                ))}
            </div>
            <Button
              onClick={continueGame}
              className="border-accent border mt-4"
            >
              Continue
            </Button>
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
  currentSet: SetX01;
  continueGame: () => void;
  players: PlayerX01[];
}) {
  const winner = currentSet.legs.at(-1)?.winnerId ?? "None";
  const playerObj = players.find((p) => p.id === winner);
  const playerToLegWins = [...players]
    .map((p) => ({
      player: p.id,
      name: p.name,
      wins: currentSet.legs.filter((s) => s.winnerId === p.id).length,
    }))
    .sort((a, b) => b.wins - a.wins);

  return (
    <Dialog open={setEnded}>
      <DialogContent
        className="border border-secondary"
        showCloseButton={false}
      >
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
            <Button
              onClick={continueGame}
              className="border-accent border mt-4"
            >
              Continue
            </Button>
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
  sets: SetX01[];
  players: PlayerX01[];
}) {
  const playerToSetWins = [...players]
    .map((p) => ({
      player: p.id,
      name: p.name,
      wins: sets.filter((s) => s.winnerId === p.id).length,
    }))
    .sort((a, b) => b.wins - a.wins);

  const winner = playerToSetWins[0];

  return (
    <Dialog open={gameOver}>
      <DialogContent
        className="border border-secondary"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>{winner?.name} won!</DialogTitle>
          <DialogDescription>
            {winner?.name} won the game.
            {playerToSetWins.map((p) => (
              <p key={p.player} className="text-left">
                {p.name}: {p.wins} set{p.wins !== 1 && "s"}
              </p>
            ))}
            <Button
              onClick={() => window.location.reload()}
              className="border-accent border mt-4"
            >
              Play Again
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
