import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import Gamebutton from "../components/Gamebutton.tsx"
export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center p-8">
      
      <div className="flex flex-col mt-8 gap-4">
        <h3 className="text-xl font-semibold"> Choose your game: </h3>
        <Gamebutton gamename="X01" description="1001 / 701 / 501 / 301"/>
        <Gamebutton gamename="Cricket" />
      </div>
    </div>
  )
}
