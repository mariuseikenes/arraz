import { createFileRoute } from '@tanstack/react-router'
import {  Ruler, Target } from 'lucide-react';
import { FaLongArrowAltLeft } from "react-icons/fa";


export const Route = createFileRoute('/guides/dartboard-setup')({
  component: RouteComponent,
  head: () => ({
    meta: [{
      name: "description",
      content: "How to set up your dartboard according to official standards. Dartboard distance, dartboard height and dimensions."
    },
    {
      title: "How to set up a dartboard"
    }
    ]
  })
})
function SetupSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-3 text-2xl font-semibold mb-3">
        <Icon className="h-6 w-6 text-accent" />
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-gray-300 ml-9">{children}</div>
    </section>
  );
}


function RouteComponent() {
  return (
     <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/guides" aria-label='Back'> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </a>
        <header className="text-center mt-4 mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">How to set up a dartboard</h1>
          <p className="text-gray-400">
            According to official standards
          </p>
        </header>
      
       <main className="prose prose-invert prose-p:text-gray-300 prose-a:text-accent">
          <p className="mb-10 text-md">
          Setting up your dartboard correctly is essential for keeping your throwing consistent
          across different setups. The standards set by the WDF (World Darts Federation)
          are scientifically backed with the best dimensions for accurate throwing.
          </p>

          <SetupSection title='Distances' icon={Ruler}>
            First, the distance between the floor and the bullseye of your dartboard should
            be <span className="text-accent">173cm (or 5'8")</span>. This is the standard, and is
            optimized for players at 6 feet tall, the bullseye being at eye-level.
            <br /> <br />
            Second, the "Oche", darts terminology for throw line, should be 
            placed <span className="text-accent">237cm (or 7'9)</span> from the bullseye. This means 
            that if your dartboard or cabinet has a thickness to it, this must be compensated by moving
            oche back that additional distance from the wall.
          </SetupSection>

          <img src="/setup.png" className="mb-8" alt="Diagram showing the distances for setting up a dartboard."/>
 
          <SetupSection title='Dartboard Dimensions' icon={Target}>
            The dimensions of a dartboard in a WDF tournament are highly specific and can be found in the WDF 
            Playing and Tournament 
            Rules <a className="text-accent underline" href="https://dartswdf.com/storage/uploads/fb05b306-c92c-4f08-b512-affb092a1b3d/2018-02-28_WDF_Playing_and_Tournament_Rules_rev20.pdf">here</a>. 
            <br /> <br />
            The Dartboard is to be 451mm in diameter, the distance from outer edge of the double ring to centre bullseye
            being 170mm, outside edge of the treble ring to be 107.4mm from the centre bullseye. The Bull inside diameter is to be 12.7mm, and the single bull (25-point area) to be 31.8mm. 
          </SetupSection>

     
      </main>
 
      </div>
    </div>
 )
}
