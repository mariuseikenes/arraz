import { createFileRoute } from '@tanstack/react-router'
import {useState} from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group"
import { Switch } from "@/components/ui/switch"
import { Plus, X } from "lucide-react"
import InteractiveDartboard from '../components/InteractiveDartboard'; // Import your new component

import Dart from "../logo.svg?react"

import { generateUUID } from "../lib/uuid.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export const Route = createFileRoute('/x01')({
  component: RouteComponent,
})

type Player = {
  name: string;
  rounds: [Throw, Throw, Throw][];
  id: string;
  score: number;
}

type Throw = {
  multiplier: number;
  score: number;
}

type Config = {
  goal: number;
  doubleout: boolean;
  doublein: boolean;
  legs: number; // first to
  sets: number; // first to
}

const isSelectedGoal = (goal: number, config: Config) => (goal === config.goal); 

function RouteComponent() {
  const [config, setConfig] = useState<Config>({
    goal: 501,
    doubleout: true,
    doublein: true,
    legs: 1,
    sets: 1
  });
  const [players, setPlayers] = useState<Player[]>([
    {
      name: "Player 1",
      rounds: [],
      id: generateUUID(),
      score: 0
    },
    {
      name: "Player 2",
      rounds: [],
      id: generateUUID(),
      score: 0,
    }
  ]);
  const [playerTurn, setPlayerTurn] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<Throw[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(501)
  const [gameOver, setGameOver] = useState(false)
  const [busted, setBusted] = useState(false)
  
  const handleUpdatePlayerNameById = (idToUpdate: string, newName: string) => {
    setPlayers(prevPlayers =>
     prevPlayers.map(player =>
       player.id === idToUpdate
         ? { ...player, name: newName }
         : player
     )
    );
  };

  const handleReady = () => {
    setReady(true);
    setCurrentScore(config.goal)
    setPlayers(players.map((p)=>({...p, score: config.goal})))
    setPlayerTurn(players[0].id)
  }

  if (!ready) {
//    handleReady()
    return (
      <div className="flex flex-col p-2 gap-4 items-center w-2/3 mx-auto justify-center">
      <h1 className="text-3xl text-center font-bold">X01</h1>
        
        <div className="flex flex-col gap-2 w-full">
          <label className="text-left text-xl font-semibold">Starting Score:</label>
          <ButtonGroup className="border border-accent rounded-md mx-auto">
            <Button className={`${isSelectedGoal(301, config) ? "text-bg bg-text border " : ""}`} onClick={()=>setConfig((old)=>({...old, goal: 301}))}> 301 </Button> 
            <Button className={`${isSelectedGoal(501, config) ? "text-bg bg-text border " : ""}`} onClick={()=>setConfig((old)=>({...old, goal: 501}))}> 501 </Button> 
            <Button className={`${isSelectedGoal(701, config) ? "text-bg bg-text border " : ""}`} onClick={()=>setConfig((old)=>({...old, goal: 701}))}> 701 </Button> 
           <Button className={`${isSelectedGoal(1001, config) ? "text-bg bg-text border" : ""}`} onClick={()=>setConfig((old)=>({...old, goal: 1001}))}> 1001 </Button> 
          </ButtonGroup>
        </div>
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xl font-semibold">Double Ins & Outs</label>
            <div className="inline-flex justify-between w-full">
              <label className="text-left">Double In: </label>
              <Switch className="" onCheckedChange={(checked)=>setConfig((old)=>({...old, doublein: checked}))} checked={config.doublein} />
            </div>
            <div className="inline-flex justify-between w-full">
              <label className="text-left">Double Out: </label>
              <Switch className="" onCheckedChange={(checked)=>setConfig((old)=>({...old, doubleout: checked}))} checked={config.doubleout} />
            </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xl font-semibold">Legs & Sets</label>
            <div className="inline-flex justify-between w-full">
              <label className="text-left">Legs: </label>

              <input 
                type="number" 
                className="bg-text rounded-sm text-center active:border border-accent text-bg w-8 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " 
                onChange={(e)=>setConfig((old)=>({...old, legs: Number(e.target.value)}))} 
                value={config.legs} />
           </div>
            <div className="inline-flex justify-between w-full">
              <label className="text-left">Sets: </label>
              <input type="number" className="bg-text text-center rounded-sm active:border border-accent text-bg w-8 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " onChange={(e)=>setConfig((old)=>({...old, sets: Number(e.target.value)}))} value={config.sets} />
            </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xl font-semibold inline-flex justify-between">Players <button className="bg-text text-bg w-8 h-8 font-normal rounded-sm flex items-center justify-center text-xs" onClick={()=>{setPlayers([...players, {score: 0, name: "New Player", rounds: [], id: generateUUID()}])}} > <Plus /> </button> </label>
                        {players.map((p)=>(
              <div className="inline-flex gap-2" key={p.id}>
                <input value={p.name} onChange={(e)=>{handleUpdatePlayerNameById(p.id, e.target.value)}} className="bg-text rounded-sm text-bg p-1" />
                <button className="text-xl text-text/50 hover:text-text" onClick={()=>{setPlayers(players.filter((pl)=>pl.id!==p.id))}}> <X /> </button>
              </div>
            ))}

        </div>

        <Button size="lg" className="w-full p-8 mt-8 shadow-accent shadow-md border border-accent active:translate-y-1 active:shadow-none text-xl" onClick={()=>handleReady()}> Play </Button>
      </div>
    )
  }

  const handleBoardClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (currentTurn.length >= 3 || busted) return;
    const target = event.target as SVGElement;
    
   if (target.id && target.dataset.score && target.dataset.multiplier) {
      const segmentId = target.id;
      const score = parseInt(target.dataset.score, 10);
      const multiplier = parseInt(target.dataset.multiplier, 10);
      const totalPoints = score * multiplier;

      console.log(`Hit: ${segmentId}, Points: ${totalPoints}`);
      
      setCurrentTurn(prev => [...prev, {score, multiplier}]);
      
      if (multiplier === 1 && config.doublein && currentScore === config.goal) {
        return;
      }
      
      setCurrentScore(currentScore-totalPoints)
      if (currentScore-totalPoints < 0) return setBusted(true);
      if (config.doubleout && currentScore-totalPoints === 1) return setBusted(true);

      if (currentScore-totalPoints === 0) {
        if (config.doubleout && multiplier === 1) return setBusted(true);
        setGameOver(true)
      }
      
   }
  };

  const handleMiss = () => {
     if (currentTurn.length >= 3 || busted) return;

      setCurrentTurn(prev => [...prev, {score: 0, multiplier: 1}])   
  }

  function handleNextPlayer() {
    setBusted(false) 
    const finishedPlayer = players.find(p=>p.id===playerTurn)
   setPlayers(prevPlayers =>
     prevPlayers.map(player =>
       player.id === playerTurn
         ? { ...player, score: busted ? finishedPlayer?.score ?? 0 : currentScore }
         : player
     )
    );

    const nextIndex = players.indexOf(players.find(p=>p.id===playerTurn) as Player)+1;
    const nextPlayer = nextIndex > players.length-1 ? players[0] : players[nextIndex];
    setCurrentTurn([])
    setCurrentScore(nextPlayer.id === playerTurn && !busted ? currentScore : nextPlayer.score)
    setPlayerTurn(nextPlayer.id)
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

  const scoreToRestore = currentScore === config.goal ? 0 : lastThrow.multiplier * lastThrow.score;
  const newCurrentScore = currentScore + scoreToRestore;

  setCurrentScore(newCurrentScore);
  setCurrentTurn(newCurrentTurn); 

  if (busted) {
    setBusted(false);
  }
}


  const activePlayer = players.find((p)=>p.id===playerTurn)
  console.log(currentTurn.length)
  if (activePlayer?.score === 0) handleNextPlayer()
  return (
    <div className="flex flex-col px-2 gap-2">

      <h2 className="text-2xl font-bold text-center">{players.find((p)=>p.id===playerTurn)?.name}'s turn </h2> 
    
      { /* @ts-ignore */ }
      <div onClick={handleBoardClick} className="dartboard-container h-auto w-full">
        <InteractiveDartboard />
      </div>
      
      <div className={`${busted && "text-red-500"} flex flex-row px-4 h-fit`}>
        <div className="flex flex-col">
          <p> Score: </p>
         <p className={`font-semibold text-7xl`}> {currentScore} </p>
        </div>
        <div className="flex flex-row text-7xl m-auto items-center h-full justify-center">
        <div className="relative flex items-center justify-center">
          {currentTurn[0] && <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">{currentTurn[0].score*currentTurn[0].multiplier}</p>}
          <Dart className={`${currentTurn.length >= 1 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`} />  
        </div>  
          <div className="relative flex items-center justify-center">
          {currentTurn[1] && <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">{currentTurn[1].score*currentTurn[1].multiplier}</p>}
          <Dart className={`${currentTurn.length >= 2 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`} />  
        </div>
        <div className="relative flex items-center justify-center">
          {currentTurn[2] && <p className="absolute  top-auto w-full z-10 text-center font-bold text-5xl">{currentTurn[2].score*currentTurn[2].multiplier}</p>}
          <Dart className={`${currentTurn.length >= 3 ? "opacity-30" : ""} ${busted ? "text-red-500" : ""} h-20 w-auto`} />  
        </div>
      </div>

     </div>
       <Button 
       variant="default" 
       disabled={(currentTurn.length !== 3 && !busted) && activePlayer?.score !== 0} 
       className={`border ${(currentTurn.length === 3 || busted) || activePlayer?.score == 0 ? "shadow shadow-accent border-accent" : "border-secondary" } w-1/2 m-auto`} 
       size="lg" 
       onClick={handleNextPlayer}> Next </Button>
       <Button variant="destructive" className={`border w-1/2 m-auto`} onClick={handleMiss} size="lg"> Miss </Button>
       <Button className="border w-1/2 m-auto" onClick={handleDeleteLast}> Undo Last </Button>

  <Dialog open={gameOver}>
    <DialogContent>
     <DialogHeader>
      <DialogTitle>{players.find(p=>p.id===playerTurn)?.name} won!</DialogTitle>
      <DialogDescription>
       <Button onClick={()=>setGameOver(false)}>Continue</Button> 
      </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
     </div>
  )
}
