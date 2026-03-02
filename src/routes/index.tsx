import { createFileRoute } from '@tanstack/react-router'
import Gamebutton from "../components/Gamebutton.tsx"
import {  Github, Target } from 'lucide-react'
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

        <hr />
        <div className='flex flex-row flex-wrap justify-center gap-2'>
          <a href="/setup" className="bg-light-charcoal p-6 rounded-lg border border-inactive">
            <div className="inline-flex gap-2 w-full items-center">
              <Target className="h-10 w-10 text-accent" />
              <h3 className="text-xl font-bold">Board Setup</h3>
            </div>
              <p className="text-gray-400 text-left text-md">
                Learn how to set up your dartboard according to WDF standards.
              </p>
            </a>

        </div>
        <footer className='flex flex-col'>
        <p className='inline-flex text-gray-400 gap-2 items-center justify-center underline'>
         <Github /> <a href="https://github.com/mariuseikenes/arraz">I'm open source!</a>
        </p>
        <div className='inline-flex gap-2 mt-4 items-center justify-center'>
          <a href='/contact' className="underline text-gray-400 text-sm">Contact</a>  
          <a href='/tos' className="underline text-gray-400 text-sm">Terms of Service</a>  
          <a href='/privacy-policy' className="underline text-gray-400 text-sm">Privacy Policy</a>  
          <a href='/about' className="underline text-gray-400 text-sm">About</a>  
        </div>
        </footer>
      </div>
    </div>
  )
}
