import { createFileRoute } from '@tanstack/react-router'
import { Calculator, Target, Trophy } from 'lucide-react';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/rules/how-to-play-shanghai')({
  component: RouteComponent,
})


function RuleSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
        <Icon className="h-6 w-6 text-accent" />
        <span>{title}</span>
      </h2>
      <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-text pl-9">
        {children}
      </div>
    </section>
  );
}

function RouteComponent() {
  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <a href="/rules" aria-label="Back" className="">
            <div className="p-2 border w-fit bg-white/10 rounded-md">
              <FaLongArrowAltLeft className="text-white" />
            </div>
          </a>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            How to Play Shanghai
          </h1>
          <p className="text-lg text-gray-300">
            A short and simple game for any amount of players.
          </p>
        </header>
        <main>
          <RuleSection title="The Objective" icon={Target}>
            <p>
              The winner of Shanghai is simply the player that has scored the
              most points by the end of a round. Score points by hitting the active bed, 
              which changes each round from 1-7.
            </p>
          </RuleSection>

          <RuleSection title="Scoring" icon={Calculator}>
            <p>
              The active bed is the same as the current round number. This means on round one the target bed is
              1, on round 2 you aim for the 2-bed. Hitting the bed awards the same amount of points, meaning hits
              in late-game can turn the tide, even if you're lagging behind.
            </p>
            <p>
              Doubles and triple beds give double and triple points respectively.
            </p>
          </RuleSection>

          <RuleSection title="Winning the Game" icon={Trophy}>
            <p>
              There are two ways of winning. The first is simply the player with the most points at the end of a match
              (after round 7) wins. However, if you manage to hit a single, double and triple in one round (in any order), 
              you instantly win. This is called a "Shanghai".
            </p>
          </RuleSection>

          <a href="/games/shanghai">
            <div className="mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2">
              Play Now
            </div>
          </a>
        </main>
      </div>
    </div>
  );}
