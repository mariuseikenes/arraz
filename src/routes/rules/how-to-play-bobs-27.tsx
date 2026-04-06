import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, Target, Trophy } from "lucide-react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GiFinishLine } from "react-icons/gi";

export const Route = createFileRoute("/rules/how-to-play-bobs-27")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "How to play Bob's 27",
      },
      {
        name: "description",
        content:
          "Bob's 27 is a practice game by Bob Anderson to improve your doubles. You start off with 27 points, go around the clock, aiming for the double. A hit grants you the respective points, but miss all 3 and you lose points equal the value of the bed.",
      },
    ],
  }),
});

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
            How to Play Bob's 27
          </h1>
          <p className="text-lg text-gray-300">
            Practice your doubles in this simple game.
          </p>
        </header>
        <main>
          <RuleSection title="The Objective" icon={Target}>
            <p>
              Make your way around the clock, hitting only doubles to gain
              points. Start with 27 and miss all 3 throws to lose points. 0
              points and you're out!
            </p>
          </RuleSection>

          <RuleSection title="Scoring" icon={Calculator}>
            <p>
              You start the game with 27 points. Each round you throw all 3
              darts at the same double bed, starting at 1, then 2 all the way
              until the bull.
            </p>
            <p>
              Hitting a double gives you points equal to the value of the bed.
              You hit the double 3, you gain 6 points. This means you can get up
              to 6 times (3 doubles) the bed each round.
            </p>
            <p>
              If you miss all 3 throws, you lose points equal to the value of
              the double bed. For example, if you're aiming for double 5, and
              miss all 3 darts, you'll lose 10 points.
            </p>
          </RuleSection>

          <RuleSection title="Game End" icon={GiFinishLine}>
            <p>
              The game can end in two ways: finishing all beds or losing.
            </p>
            <p>
              Once you've thrown your 3 darts at the double bull, the game is over. However, you've still got a score, 
              so if you can consistently complete all doubles you've still got the points to compete against yourself with, for a maximum score of 1437.
            </p>
            <p>
              You lose the game if you end up at 0 (or less) points. At this points you're out. If you miss everything, you'll still get 5 rounds of play.
            </p>
          </RuleSection>

          <Link to="/games/bobs-27">
            <div className="mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2">
              Play Now
            </div>
          </Link>
        </main>
      </div>
    </div>
  );
}
