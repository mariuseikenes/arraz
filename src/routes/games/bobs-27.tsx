import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Dart from "../../logo.svg?react";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/games/bobs-27")({
  component: RouteComponent,
  
});

type Turn = {
  throws: ("hit" | "miss" | "not-thrown")[];
  bed: number;
};

function RouteComponent() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(27);
  const [currentBed, setCurrentBed] = useState(1);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [currentTurn, setCurrentTurn] = useState<Turn>({
    bed: 1,
    throws: ["not-thrown", "not-thrown", "not-thrown"],
  });

  function updateThrow(index: number) {
    const newThrows = [...currentTurn.throws];
    switch (newThrows[index]) {
      case "hit":
        newThrows[index] = "miss";
        break;
      case "miss":
        newThrows[index] = "not-thrown";
        break;
      case "not-thrown":
        newThrows[index] = "hit";
        break;
      default:
        newThrows[index] = "not-thrown";
    }

    setCurrentTurn((ct) => ({ ...ct, throws: newThrows }));
  }

  function next() {
    if (currentBed === 20) {
      setCurrentBed(25);
    } else if (currentBed === 25) {
      setIsGameOver(true)
    } else {
      setCurrentBed(currentBed + 1);
    }
    const scoreChange = currentTurn.throws.every(
      (t) => t === "miss" || t === "not-thrown",
    )
      ? -(currentTurn.bed * 2)
      : currentTurn.throws.filter((t) => t === "hit").length *
        currentTurn.bed *
        2;

    if (score + scoreChange <= 0) {
      setIsGameOver(true);
    }

    setScore(score + scoreChange);
    setTurns([...turns, currentTurn])
    setCurrentTurn({
      bed: currentBed + 1,
      throws: ["not-thrown", "not-thrown", "not-thrown"],
    });
  }

  return (
    <div className="flex flex-col px-2 gap-2 md:m-auto h-full">
      <h1 className="text-3xl font-bold text-center">Bob's 27</h1>
      <div className="flex mt-14 gap-4 items-center justify-center flex-col h-full md:px-18">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">Current Bed:</h2>
          <span className="text-5xl font-semibold mt-2">{currentBed}</span>
        </div>
        <div className="flex flex-row items-center justify-center">
          <h3 className="text-2xl font-bold">Score:</h3>
          <span className="text-2xl font-semibold ml-2">{score}</span>
        </div>

        <div className="flex flex-row gap-2">
          <div
            className="relative flex items-center justify-center"
            onClick={() => updateThrow(0)}
          >
            {currentTurn.throws[0] !== "not-thrown" && (
              <p className="absolute  top-auto w-full z-10 flex items-center justify-center">
                {currentTurn.throws[0] === "hit" ? (
                  <Check size={44} />
                ) : (
                  <X size={44} />
                )}
              </p>
            )}
            <Dart
              className={`${currentTurn.throws[0] !== "not-thrown" ? "opacity-30" : ""} h-20 w-auto`}
            />
          </div>
          <div
            className="relative flex items-center justify-center"
            onClick={() => updateThrow(1)}
          >
            {currentTurn.throws[1] !== "not-thrown" && (
              <p className="absolute  top-auto w-full z-10 flex items-center justify-center">
                {currentTurn.throws[1] === "hit" ? (
                  <Check size={44} />
                ) : (
                  <X size={44} />
                )}
              </p>
            )}
            <Dart
              className={`${currentTurn.throws[1] !== "not-thrown" ? "opacity-30" : ""} h-20 w-auto`}
            />
          </div>
          <div
            className="relative flex items-center justify-center"
            onClick={() => updateThrow(2)}
          >
            {currentTurn.throws[2] !== "not-thrown" && (
              <p className="absolute  top-auto w-full z-10 flex items-center justify-center">
                {currentTurn.throws[2] === "hit" ? (
                  <Check size={44} />
                ) : (
                  <X size={44} />
                )}
              </p>
            )}
            <Dart
              className={`${currentTurn.throws[2] !== "not-thrown" ? "opacity-30" : ""} h-20 w-auto`}
            />
          </div>
        </div>
        <Button
          variant="default"
          className={`border shadow shadow-accent border-accent w-1/2 m-auto`}
          size="lg"
          onClick={next}
          disabled={currentTurn.throws.includes("not-thrown")}
        >
          {currentBed === 25 ? "Finish" : "Next"}
        </Button>

        <p className="text-inactive w-4/5 text-center">
          Click the darts to toggle hit/miss
        </p>
      </div>

      <GameOverDialog gameOver={isGameOver} score={score} bed={currentBed} />
    </div>
  );
}

function GameOverDialog({
  score,
  bed,
  gameOver,
}: {
  score: number;
  bed: number;
  gameOver: boolean;
}) {
  return (
    <Dialog open={gameOver}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Over!</DialogTitle>
          <DialogDescription className="flex gap-4 flex-col">
            {score <= 0 ? (
              <>
                <p>You lost at bed {bed-1}.</p>
              </>
            ) : (
              <>
                <p>You won with a score of {score}!</p>
              </>
            )}
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
