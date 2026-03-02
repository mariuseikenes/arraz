import { createFileRoute } from '@tanstack/react-router';
import {
  Swords,
  ListChecks,
  KeyRound,
  Crosshair,
  HeartCrack,
  Trophy,
  Lightbulb,
} from 'lucide-react';

export const Route = createFileRoute('/rules/killer')({
  component: KillerRulesComponent,
  head: () => ({
    meta: [
      {
        title: "How to play Killer (Darts Game)"
      },
      {
        name: "description",
        content: "Guide for playing the popular multiplayer Dart-game 'Killer'. Choose your numbers with a throw by your non-dominant hand. Gain lives by hitting your own section. Once your lives are full, eliminate others by hitting their section to deal damage!"
      }
    ]
  })
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

function KillerRulesComponent() {
  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            How to Play Killer
          </h1>
          <p className="text-lg text-gray-300">
            A fun, competitive multiplayer game of elimination. Ideal for 3 or more players.
          </p>
        </header>

        <RuleSection title="The Objective" icon={Swords}>
          <p>
            The goal of Killer is to be the last player standing. Players first
            work to gain "Killer" status and then use their darts to eliminate
            opponents by knocking out their "lives".
          </p>
        </RuleSection>

        <RuleSection title="Setup" icon={ListChecks}>
          <p>
            Before the game begins, you need to assign numbers and set lives.
          </p>
          <ol>
            <li>
              <strong>Assign Numbers:</strong> Each player must be assigned a
              unique number on the board (typically from 1 to 20). A common way
              to do this is for each player to throw one dart with their
              non-dominant hand. The number they hit is theirs for the game. If a
              player misses or hits a number already taken, they throw again.
            </li>
            <li>
              <strong>Set Lives:</strong> Most commonly, Killer is played with 3 lives. This can be adjusted
              based on preference. Players start with 0 lives.
            </li>
          </ol>
        </RuleSection>

        <RuleSection title="Phase 1: Becoming a Killer" icon={KeyRound}>
          <p>
            At the start of the game, no one is a Killer. To gain Killer status, players must gain health by hitting their own number. 
          </p>
          <ul>
            <li>
              Hit your number until you've reached the needed lives. Doubles and triples count.
            </li>
            <li>
              Until you become a Killer, you cannot affect any other player's
              lives, and they cannot affect yours.
            </li>
          </ul>
        </RuleSection>

        <RuleSection title="Phase 2: Eliminating Opponents" icon={Crosshair}>
          <p>
            Once you are a Killer, your objective changes. You now ignore your
            own number and start attacking your opponents by hitting their
            assigned numbers.
          </p>
          <ul>
            <li>
              Hitting a <strong>single</strong> of an opponent's number removes 1
              life.
            </li>
            <li>
              Hitting a <strong>double</strong> of an opponent's number removes 2
              lives.
            </li>
            <li>
              Hitting a <strong>triple</strong> of an opponent's number removes 3
              lives.
            </li>
          </ul>
        </RuleSection>

        <RuleSection title="Losing Lives" icon={HeartCrack}>
          <p>
            A player loses a life when a Killer hits their number. Once a player
            is at 0 lives, and get hit again, they are out of the game.
          </p>
          <p>
            There is also a crucial "suicide" rule: If you are a Killer and
            accidentally hit your <strong>own number</strong> (single, double, or
            triple), you lose a life for each multiple. For example, hitting a triple
            of your own number as a Killer would cost you 3 lives!
          </p>
        </RuleSection>

        <RuleSection title="Winning the Game" icon={Trophy}>
          <p>
            The game continues until only one player has lives remaining. That
            player is declared the winner!
          </p>
        </RuleSection>

        <RuleSection title="Strategy Tip" icon={Lightbulb}>
          <p>
            Who do you target first? It's often wise to target the most skilled
            player to remove them early. Alternatively, you can form temporary
            alliances to take down a player who is close to winning.
          </p>
        </RuleSection>

        <a href="/killer">
          <div className='mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2'>Play Now</div>
        </a>  
      </div>
    </div>
  );
}

