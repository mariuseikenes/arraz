import { createFileRoute } from '@tanstack/react-router'
import { AlertCircle, Calculator, Goal, LockOpen, Scan, Users } from 'lucide-react';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/rules/how-to-play-cricket-darts')({
  component: RouteComponent,
    head: () => ({
    meta: [
      {
        title: "How to play Cricket (Darts)",
      },
      {
        name: "description",
        content: "How to play the internationally popular darts game Cricket. Open beds to score points before your opponent closes them again!"
      },
    ],
  }),
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
            How to play Cricket
          </h1>
          <p className="text-lg text-gray-300">
            The complete guide one of the most popular dart games, Cricket.
          </p>
        </header>
        <main>
          <RuleSection title="The Objective" icon={Goal}>
            <p>
              Open sections and score points before your opponent closes it.
              Play until all sections closed or a set amount of rounds!
            </p>
          </RuleSection>

          <RuleSection title="Active Sections" icon={Scan}>
            <p>
              In a classic game of Cricket, only sections{" "}
              <span className="text-accent">15 - 20 and the bullseye</span> are
              in use. All other sections can be ignored.
            </p>
          </RuleSection>

          <RuleSection title="Opening and closing" icon={LockOpen}>
            <p>
              Before winning points, a section must be opened. An opened section
              can then be closed by an opponent.
            </p>
            <br />
            <p>
              A section is opened by getting three total hits in that section.
              Doubles and triples count - meaning a section can be opened by
              hitting a triple, a single and a double, or three singles.
            </p>
            <br />
            <p>
              An opponent can close an open section the same way. Three hits and
              the section is closed, and the player who first claimed the
              section can no longer score points from that section.
            </p>
            <br />
            <p>
              One hit on a section is represented by a slash, two hits are
              represented by an X. Three hits are represented by drawing a
              circle on the X.
            </p>
          </RuleSection>

          <RuleSection title="Scoring Points" icon={Calculator}>
            <p>
              Once a section has been opened, the player who first opened that
              section can keep hitting that section to score points. They are
              free to hit that section or continue to a new section. It all
              depends on your own strategy!
            </p>
          </RuleSection>

          <RuleSection title="Important" icon={AlertCircle}>
            <p>
              Doubles and triples carry over and score points! If a player
              already has two hits on section 20, and hit a T20, they will open
              the section (1 hit) and get 40 points (20pts * 2 for each
              "remaining" hit).
            </p>
          </RuleSection>
          <RuleSection title="3+ Players" icon={Users}>
            <p>
              The rules change slightly when playing with 3+ players. Usually,
              you now play with "cut-throat" scoring. This means that instead of
              gaining points, you give points to every other player that has not
              yet opened that section. The person with the lowest score wins.
            </p>
          </RuleSection>
          <a href="/games/cricket">
            <div className="mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2">
              Play Now
            </div>
          </a>
        </main>
      </div>
    </div>
  );
}