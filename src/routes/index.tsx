import { createFileRoute } from '@tanstack/react-router'
import Gamebutton from "../components/Gamebutton.tsx"
import { Github, LucideMail } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center p-8">
      <h1 className='text-3xl'>Welcome to <span className='text-accent font-bold'>Arraz</span>!</h1> 
      <div className="flex flex-col mt-8 gap-4">
        <h3 className="text-xl font-semibold"> Choose your game: </h3>
        <Gamebutton gamename="X01" description="1001 / 701 / 501 / 301"/>

        <h3 className='text-xl font-semibold'> Coming soon: </h3>
       <Gamebutton gamename="Cricket" comingsoon/>
        <Gamebutton gamename="Killer" comingsoon/>
        <p> Looking for something else? Contact me! </p>
        <hr />
        <div className='flex flex-row flex-wrap justify-center gap-2'>
        <a href="/about"><Button className='border-light-charcoal border' variant={"default"}> About </Button></a>
        </div>
        <hr /> 
       <div className='inline-flex gap-2 justify-center'> 
        <a href="/tos"><Button className='border-light-charcoal border' variant={"default"}> Terms of Service </Button></a>
        <a href="/privacy-policy"><Button className='border-light-charcoal border' variant={"default"}> Privacy </Button></a>
        <a href="/contact"><Button className='border-light-charcoal border' variant={"default"}> Contact </Button></a>
        </div>
        <p className='inline-flex text-gray-400 gap-2 items-center justify-center underline'>
         <Github /> <a href="https://github.com/mariuseikenes/arraz">I'm open source!</a>
        </p>
      </div>
    </div>
  )
}
