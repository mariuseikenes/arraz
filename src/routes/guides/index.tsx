import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCheck, Target } from 'lucide-react';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/guides/')({
  component: RouteComponent,
    head: () => ({
    meta: [
      {
        title: "Dart Guides"
      },
      {
        name: "description",
        content: "Learn how to set up your dartboard, X01 checkouts and more with our neat guides!"
      }
    ]
  })
})

function GuideCard({name, link, icon: Icon, children}: {link: string; name: string; icon: React.ElementType; children: React.ReactNode; }) {
  return (
    <Link to={"/guides/"+link}>
    <div className="bg-light-charcoal p-6 rounded-lg border border-inactive"> 
    <div className='inline-flex gap-2 items-center'>
      <Icon className="h-10 w-10 text-accent" />
      <h2 className='font-bold text-xl'>{name}</h2>
    </div>
    <p className='text-gray-400 text-md'>{children}</p>
    </div>
    </Link>
  )
}

function RouteComponent() {
  return (

    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" aria-label='Back' className=""> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </Link>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Guides</h1>
          <p className="text-gray-400">
            Neat guides across various dart-related topics.
          </p>
        </header>
      
      <main className='flex flex-col gap-2'>
        <GuideCard name="Dartboard Setup" link="dartboard-setup" icon={Target}>
          Learn how to set up your dartboard according to WDF standards. 
        </GuideCard>
        <GuideCard name="X01 Checkouts" link="x01-checkout-chart" icon={CheckCheck}>
          Learn the X01 checkouts.
        </GuideCard>
      </main>
      </div>
    </div>
  )
}
