import { createFileRoute } from '@tanstack/react-router'
import type React from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/rules/')({
  component: RouteComponent,
    head: () => ({
    meta: [
      {
        title: "Darts Rulebook"
      },
      {
        name: "description",
        content: "Learn the rules and how to play various darts games, as well as a handy scorekeeping tool, all in one place!"
      }
    ]
  })
})

function GameCard({name, link, children}: {link: string; name: string; children: React.ReactNode; }) {
  return (
    <a href={"/rules/"+link}>
    <div className="bg-light-charcoal p-6 rounded-lg border border-inactive">
      <h2 className='font-bold text-xl'>{name}</h2>
      <p className='text-gray-400 text-md'>{children}</p>
    </div>
    </a>
  )
}

function RouteComponent() {
  return (

    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" aria-label='Back' className=""> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </a>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Rulebook</h1>
          <p className="text-gray-400">
            Learn the rules to all our supported games.
          </p>
        </header>
      
      <main className='flex flex-col gap-2'>
        <GameCard name="X01" link="how-to-play-x01">
         Be the first to reach 0 points without going over.
         </GameCard>
        <GameCard name="Killer" link="how-to-play-killer">
          Eliminate other players and be the last one standing. 
        </GameCard>
        <GameCard name="Cricket" link="how-to-play-cricket-darts">
          Open beds to start scoring points.
        </GameCard>
      </main>
      </div>
    </div>
  )
}
