import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Crosshair,
  Trophy,
} from "lucide-react";
import { FaLongArrowAltLeft, FaQuestion } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { TbMultiplier2X } from "react-icons/tb";

export const Route = createFileRoute("/rules/how-to-play-around-the-clock")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "How to play Around the Clock",
      },
      {
        name: "description",
        content:
          "Around the Clock is a beginner-friendly darts game where the goal is to make it from bed 1 through bed 20, a double, treble and bull.",
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
          <Link to="/rules" aria-label="Back" className="">
            <div className="p-2 border w-fit bg-white/10 rounded-md">
              <FaLongArrowAltLeft className="text-white" />
            </div>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            How to Play Around the Clock
          </h1>
          <p className="text-lg text-gray-300">
            A simple and easy beginner-friendly darts game for any amount of
            players.
          </p>
        </header>
        <main>
          <RuleSection title="The Objective" icon={FaQuestion}>
            <p>
              The goal of Around the Clock is to hit every bed, starting with 1,
              followed by 2 and so on, ending with a double, treble and bull.
            </p>
          </RuleSection>

          <RuleSection title="Bed Order" icon={GoNumber}>
            <p>
              Each player throws 3 darts per turn. Start by aiming for bed 1.
              Once you've hit this bed, you move on to bed 2, and so on until
              you've hit bed 20.
            </p>
            <p>
              After you've hit bed 20, you need to hit <strong>any</strong>{" "}
              double, <strong>any</strong> treble and either bull.
            </p>
          </RuleSection>

          <RuleSection title="Doubles & Trebles" icon={TbMultiplier2X}>
            <p>
              Doubles & trebles allow you to skip the next number or the two
              next numbers respectively.
            </p>
            <ul>
              <li>
                If you're on bed 7, and hit a double, your next bed to hit is
                bed 9.
              </li>
              <li>
                If you're on bed 14, and hit a treble, your next bed to hit is
                bed 17.
              </li>
            </ul>
          </RuleSection>

          <RuleSection title="3-dart hits" icon={Crosshair}>
            <p>
              If all 3 arrows hit the target (i.e you hit 5, 6, and 7), you may
              throw another 3 darts. This can be repeated indefinitely.
            </p>
          </RuleSection>

          <RuleSection title="Winning the Game" icon={Trophy}>
            <p>
              The winner is the first player to hit all beds, a double, treble and finally the bull. 
            </p>
            <p>
              It's super easy to keep track of score in Around the Clock, therefore Arraz does not have a dedicated scorekeeping page for it.
            </p>
          </RuleSection>
        </main>
      </div>
    </div>
  );
}
