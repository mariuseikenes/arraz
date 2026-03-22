import { createFileRoute } from '@tanstack/react-router'
import { Sword } from 'lucide-react';
import { GiAsianLantern, GiCricket } from "react-icons/gi";
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { SiDart } from "react-icons/si"

export const Route = createFileRoute('/games/')({
  component: RouteComponent,
    head: () => ({
    meta: [
      {
        title: "Arraz Games"
      },
      {
        name: "description",
        content: "Scorekeeping for a variety of darts games on Arraz. Includes X01, Cricket, Shanghai and more."
      }
    ]
  })
})

function GameCard({name, link, icon: Icon, children}: {link: string; name: string; icon: React.ElementType; children: React.ReactNode; }) {
  return (
    <a href={"/games/"+link} className='w-md'>
    <div className="bg-light-charcoal p-6 rounded-lg border border-inactive hover:border-accent"> 
    <div className='inline-flex gap-2 items-center'>
      <Icon className="h-10 w-10 text-accent" />
      <h2 className='font-bold text-xl'>{name}</h2>
    </div>
    <p className='text-gray-400 text-md'>{children}</p>
    </div>
    </a>
  )
}

function RouteComponent() {
  return (

    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <a href="/" aria-label="Back" className=""> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </a>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Games</h1>
          <p className="text-gray-400">
            Scorekeeping for the most popular darts variants.
          </p>
        </header>
      
      <main className='flex flex-row flex-wrap gap-2 justify-center'>
        <GameCard name="X01" link="x01" icon={SiDart}> The classic. Choose between 1001 / 701 / 501 / 301 </GameCard>
        <GameCard name="Cricket" link="cricket" icon={GiCricket}> Strategy meets skill. Open a section to start scoring! </GameCard>
        <GameCard name="Killer" link="killer" icon={Sword}> Eliminate your opponents. </GameCard>
        <GameCard name="Shanghai" link="shanghai" icon={GiAsianLantern}> Score points on beds 1-7. </GameCard>
      </main>
      
      <p className='text-center text-white/60 text-sm mt-4'>Can't find the game you're playing? <a href="/contact" className="text-accent">Contact</a> me to get it added!</p>
      
      </div>
    </div>
  )
}
