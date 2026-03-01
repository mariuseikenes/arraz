import InteractiveDartboard from '@/components/InteractiveDartboard';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { generateUUID } from '@/lib/uuid';
import { createFileRoute } from '@tanstack/react-router'
import { CircleSlash, HeartPlus, LucideHeart, Plus, Shield, Skull, Sword, Swords, X } from 'lucide-react';
import { useState } from 'react';
import Dart from "../logo.svg?react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
export const Route = createFileRoute('/killer')({
  component: RouteComponent,
})

type Player = {
  name: string;
  id: string;
  lives: number;
  number: number;
};

type Turn = {
  playerId: string;
  throws: Throw[];
};

type Throw = {
  multiplier: number;
  score: number;
  action: "none" | "dmg" | "heal";
};

function RouteComponent() {
  //const playerNames = localStorage.getItem("playerNames")?.split(",");
  const playerNames = undefined 
  const [players, setPlayers] = useState<Player[]>(
    playerNames
      ? playerNames.map((p) => ({
          name: p,
          id: generateUUID(),
          lives: 0,
          number: 1,
        }))
      : [
          {
            name: "Player 1",
            number: 1,
            id: generateUUID(),
            lives: 0,
          },
          {
            name: "Player 2",
            id: generateUUID(),
            lives: 0,
            number: 2,
          },
        ],
  );
  const [lives, setLives] = useState(3)
  const [ready, setReady] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<Turn>({
    playerId: "",
    throws: []
  })

  const handleUpdatePlayerNameById = (idToUpdate: string, newName: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === idToUpdate ? { ...player, name: newName } : player,
      ),
    );
  };


  function handleReady() {
    setReady(true)   
    setCurrentTurn({
      playerId: players[0].id,
      throws: []
    })
  }

  if (!ready) {
    return (
      <div className="flex flex-col p-2 gap-4 items-center w-2/3 mx-auto justify-center">
        <h1 className="text-3xl text-center font-bold">Killer</h1>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-left text-xl font-semibold">
            Lives:
          </label>
          <ButtonGroup className="border border-accent rounded-md mx-auto">
            <Button
              className={`${lives === 3 ? "text-bg bg-text border " : ""}`}
              onClick={() => setLives(3)}
            >
              {" "}
    3{" "}
            </Button>
            <Button
              className={`${lives === 5 ? "text-bg bg-text border " : ""}`}
              onClick={() => setLives(5)}
            >
              {" "}
              5{" "}
            </Button>
            <Button
              className={`${lives === 7 ? "text-bg bg-text border " : ""}`}
              onClick={() => setLives(7)}
            >
              {" "}
              7{" "}
            </Button>
          </ButtonGroup>
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
                    lives: 0,
                    number: 1,
                    name: "New Player",
                    id: generateUUID(),
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
 
    )
  }

  function handleNextPlayer() {
    const nextIndex =
      players.indexOf(players.find((p) => p.id === currentTurn.playerId) as Player) + 1;
    const nextPlayer =
      nextIndex > players.length - 1 ? players[0] : players[nextIndex];
     setCurrentTurn({
       playerId: nextPlayer.id,
       throws: [],
     });

    const remainingPlayers = players.filter(p=>p.lives > -1);
    if (remainingPlayers.length === 1) {
      setIsGameOver(true)
    }

  }

  function decreasePlayerHealth(id: string, multiplier: number) {
    setPlayers(prevPlayers=>{
      return prevPlayers.map((p)=>p.id === id ? {...p, lives: p.lives-multiplier} : p)
    });
  }

   const handleBoardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentTurn.throws.length >= 3) return;
    const target = event.target as SVGElement;

    if (target.id && target.dataset.score && target.dataset.multiplier) {
      const segmentId = target.id;
      const score = parseInt(target.dataset.score, 10);
      const multiplier = parseInt(target.dataset.multiplier, 10);
      let action: "none" | "heal" | "dmg" = "none"

      console.log(`Hit: ${segmentId}`);
      const player = players.find(p=>p.id === currentTurn.playerId)
      if (!player) return;
      console.log("y")
      if (player.lives === lives) {
        // Can Kill
        const potentialHitPlayer = players.find(p=>p.number===score)
        if (potentialHitPlayer) {
          decreasePlayerHealth(potentialHitPlayer.id, multiplier) 
          action = "dmg"
        }
      } else if (player.number === score){
        console.log("life gained")
        action = "heal"
        setPlayers(prevPlayers=>prevPlayers.map(p=>p.id===player.id ? {...p, lives: p.lives+1} : p))
      }
      setCurrentTurn(o=>({...o, throws: [...o.throws, {multiplier, score, action }]}))
   }
  };


  function handleDeleteLast() {
    if (!currentTurn || currentTurn.throws.length === 0) {
      return;
    }

    const lastThrow = currentTurn.throws.at(-1);

    if (!lastThrow) {
      return;
    }

    const newCurrentTurn = currentTurn.throws.slice(0, -1);

   setCurrentTurn(o=>({...o, throws: newCurrentTurn}));
 }

  const activePlayer = players.find((p) => p.id === currentTurn?.playerId);

  if (!activePlayer || activePlayer?.lives <= -1) handleNextPlayer();
 
  return (
    <div className="flex flex-col px-2 gap-2 md:m-auto md:h-full">
      <div className="flex md:flex-row flex-col md:h-full md:px-18">
        {/* @ts-ignore */}
        <div
          onClick={handleBoardClick}
          className="dartboard-container h-auto md:w-1/2 md:p-8"
        >
          <InteractiveDartboard />
        </div>
        <div className='inline-flex gap-2 h-24 items-center justify-center'>
              <div className="relative flex items-center justify-center">
                {currentTurn.throws[0] && (
                  <p className="absolute top-auto left-auto w-full z-10 text-center font-bold text-5xl">
                  {currentTurn.throws[0].action === "heal" 
                    ? <HeartPlus size={48} /> 
                    : currentTurn.throws[0].action === "dmg" 
                        ? <Sword size={48} /> 
                        : <CircleSlash size={48} />}
                  </p>
                )}
                <Dart
                  className={`${currentTurn.throws.length >= 1 ? "opacity-30" : ""} h-20 w-auto`}
                />
              </div>
              <div className="relative flex items-center justify-center">
                {currentTurn.throws[1] && (
                  <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                   {currentTurn.throws[1].action === "heal" 
                    ? <HeartPlus size={48} /> 
                    : currentTurn.throws[1].action === "dmg" 
                        ? <Sword size={48} /> 
                        : <CircleSlash size={48} />}  
                  </p>
                )}
                <Dart
                  className={`${currentTurn.throws.length >= 2 ? "opacity-30" : ""} h-20 w-auto`}
                />
              </div>
              <div className="relative flex items-center justify-center">
                {currentTurn.throws[2] && (
                  <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">
                     {currentTurn.throws[2].action === "heal" 
                    ? <HeartPlus size={48} /> 
                    : currentTurn.throws[2].action === "dmg" 
                        ? <Sword size={48} /> 
                        : <CircleSlash size={48} />}
                  </p>
                )}
                <Dart
                  className={`${currentTurn.throws.length >= 3 ? "opacity-30" : ""} h-20 w-auto`}
                />
              </div>
        
        </div>
        <div className='flex flex-col gap-1'>
          {players.map(p=>{
            return (
              <div className={`inline-flex gap-2 ${p.lives < 0 ? "opacity-30" : ""}`}  >
              {p.lives === lives 
                ? <Swords />
                : p.lives <= -1 
                ? <Skull />
                : <Shield />}  
              <p className={`${p.name === activePlayer?.name ? "text-accent" : ""}`}>{p.name} ({p.number}):</p> 
                {new Array(lives)
                      .fill("")
                      .map((v, i)=><LucideHeart className={`${i < p.lives ? "text-secondary" : "text-secondary/40"}`
                } />)}
              </div>
            )
          })}
        </div>
          <Button
            variant="default"
            disabled={
              currentTurn.throws.length !== 3
            }
            className={`border ${currentTurn.throws.length === 3 ? "shadow shadow-accent border-accent" : "border-secondary"} w-1/2 m-auto`}
            size="lg"
            onClick={handleNextPlayer}
          >
            {" "}
            Next{" "}
          </Button>
          <Button
            variant="destructive"
            className={`border w-1/2 m-auto`}
            onClick={()=>{}}
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
  )
 }

function GameOverDialog({
  gameOver,
  players,
}: {
  gameOver: boolean;
  players: Player[];
}) {

  return (
    <Dialog open={gameOver}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> won!</DialogTitle>
          <DialogDescription>
            <Button onClick={() => window.location.reload()}>Play Again</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
