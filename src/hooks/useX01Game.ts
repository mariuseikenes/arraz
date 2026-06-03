import { generateUUID } from "@/lib/uuid";
import { useState } from "react";

export type PlayerX01 = {
  name: string;
  rounds: [ThrowX01, ThrowX01, ThrowX01][];
  id: string;
  score: number;
};

export type TurnX01 = {
  playerId: string;
  throws: ThrowX01[];
};

export type ThrowX01 = {
  multiplier: number;
  score: number;
};

export type ConfigX01 = {
  goal: number;
  doubleout: boolean;
  doublein: boolean;
  legs: number; // first to
  sets: number; // first to
};

export type CurrentTurnX01 = {
  player: PlayerX01;
  throws: ThrowX01[];
};

export type LegX01 = {
  id: string;
  winnerId: string | null;
  history: TurnX01[];
};

export type SetX01 = {
  winnerId: string | null;
  legs: LegX01[];
};

export type GameState = ReturnType<typeof useX01Game>;

export function useX01Game(initialPlayers: PlayerX01[], config: ConfigX01) {
  const [players, setPlayers] = useState<PlayerX01[]>(initialPlayers);
  const [currentTurn, setCurrentTurn] = useState<CurrentTurnX01>({
    player: initialPlayers[0],
    throws: [],
  });
  const [currentScore, setCurrentScore] = useState(config.goal);
  const [gameOver, setGameOver] = useState(false);
  const [legEnded, setLegEnded] = useState(false);
  const [setEnded, setSetEnded] = useState(false);
  const [busted, setBusted] = useState(false);
  const [currentLeg, setCurrentLeg] = useState<LegX01>({
    id: generateUUID(),
    winnerId: null,
    history: [],
  });
  const [currentSet, setCurrentSet] = useState<SetX01>({
    winnerId: null,
    legs: [],
  });
  const [sets, setSets] = useState<SetX01[]>([]);

  const activePlayer = players.find(
    (p) => p.id === currentTurn.player.id,
  );

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
        players.find((p) => p.id === currentTurn.player.id) as PlayerX01,
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
      nextPlayer.id === currentTurn.player.id && !busted
        ? currentScore
        : nextPlayer.score,
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
    setCurrentTurn((o) => ({ ...o, throws: newCurrentTurnThrows }));

    if (busted) {
      setBusted(false);
    }
  }

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

  return {
    players,
    setPlayers,
    currentTurn,
    setCurrentTurn,
    currentScore,
    setCurrentScore,
    gameOver,
    setGameOver,
    legEnded,
    setLegEnded,
    setEnded,
    setSetEnded,
    busted,
    setBusted,
    currentLeg,
    setCurrentLeg,
    currentSet,
    setCurrentSet,
    sets,
    setSets,
    activePlayer,
    handleNextPlayer,
    handleDeleteLast,
    handleNewLeg,
    handleNewSet,
  };
}