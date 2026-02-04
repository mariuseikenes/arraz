export default function Gamebutton({ gamename, description, comingsoon }: {gamename: string; description?: string; comingsoon?: boolean; }) {
  return (
    <a 
    href={!comingsoon ? gamename : ""} 
    className={`gamebutton transition-all p-4 border flex flex-col rounded-sm bg-light-charcoal border border-inactive hover:border-accent hover:shadow-sm shadow-accent active:bg-light-charcoal/80 active:scale-98  ${comingsoon ? "border-inactive opacity-40" :""}`} 
    >
    <div className="font-bold text-2xl">{gamename}</div> 
    <div className="text-sm">{description}</div>

    </a>
  )
}
