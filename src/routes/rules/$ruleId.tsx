import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  Crosshair,
  Goal,
  HeartCrack,
  KeyRound,
  Lightbulb,
  ListChecks,
  LockOpen,
  PlayCircle,
  Scan,
  ShieldX,
  Swords,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { FaLongArrowAltLeft } from "react-icons/fa";

export const Route = createFileRoute("/rules/$ruleId")({
  component: RouteComponent,
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

function CricketRulesComponent() {
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
          <a href="/cricket">
            <div className="mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2">
              Play Now
            </div>
          </a>
        </main>
      </div>
    </div>
  );
}

function X01RulesComponent() {
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
            How to Play X01 Darts
          </h1>
          <p className="text-lg text-gray-300">
            The complete guide to the most popular family of dart games, from
            501 to 301.
          </p>
        </header>
        <main>
          <RuleSection title="The Objective" icon={Goal}>
            <p>
              The goal of any X01 game is simple: be the first player to reach
              exactly zero from a starting score (like 501 or 301). The final
              dart thrown to win must land in a double segment.
            </p>
          </RuleSection>

          <RuleSection title="Common Game Variants" icon={PlayCircle}>
            <p>
              While 501 is the professional standard, several variations exist,
              differing primarily by the starting score and rules for
              starting/ending.
            </p>
            <Table className="mt-4">
              <TableHeader>
                <TableRow className="border-inactive">
                  <TableHead className="text-accent">Game</TableHead>
                  <TableHead className="text-accent">Start Rule</TableHead>
                  <TableHead className="text-accent">End Rule</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-inactive">
                  <TableCell className="font-medium">301</TableCell>
                  <TableCell>Double In / Straight In</TableCell>
                  <TableCell>Double Out</TableCell>
                </TableRow>
                <TableRow className="border-inactive">
                  <TableCell className="font-medium">501</TableCell>
                  <TableCell>Straight In (Standard)</TableCell>
                  <TableCell>Double Out</TableCell>
                </TableRow>
                <TableRow className="border-inactive">
                  <TableCell className="font-medium">701</TableCell>
                  <TableCell>Straight In</TableCell>
                  <TableCell>Double Out</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </RuleSection>

          <RuleSection title="Scoring" icon={Calculator}>
            <p>
              Each player starts with the same score (e.g., 501). After throwing
              three darts, the total score of the darts is calculated and
              subtracted from the player's current score.
            </p>
            <ul>
              <li>
                <strong>Outer Ring:</strong> Scores double the segment number.
              </li>
              <li>
                <strong>Inner Ring:</strong> Scores triple the segment number.
              </li>
              <li>
                <strong>Outer Bull (Green):</strong> Scores 25.
              </li>
              <li>
                <strong>Inner Bull (Red):</strong> Scores 50 (counts as a
                double).
              </li>
            </ul>
          </RuleSection>

          <RuleSection
            title="Winning the Game (Checking Out)"
            icon={CheckCircle2}
          >
            <p>
              To win, a player must reach a score of exactly zero. The final
              dart that reduces the score to zero must be a{" "}
              <strong>double</strong>, (unless you disable the double-out rule).
            </p>
            <ul>
              <li>
                For example, if a player has 40 points remaining, they must hit
                a double 20 to win.
              </li>
              <li>
                The inner bullseye (worth 50) also counts as a double (double
                25) and can be used to win the game.
              </li>
            </ul>
          </RuleSection>

          <RuleSection title="Busting" icon={ShieldX}>
            <p>
              A player's turn is immediately over and their score is reset to
              what it was at the start of their turn if they "bust". A bust
              occurs if a player:
            </p>
            <ol>
              <li>
                Scores more than the points they have remaining. (e.g., scoring
                20 with 18 left).
              </li>
              <li>
                Reduces their score to exactly 1. (You cannot hit a double from
                1).
              </li>
              <li>
                Reduces their score to 0, but the final dart was not a double.
                (e.g., hitting a single 20 with 20 left).
              </li>
            </ol>
          </RuleSection>

          <RuleSection title="Strategy Tip" icon={Lightbulb}>
            <p>
              As you get closer to zero, focus on leaving yourself with a "good"
              number for your next turn. Experienced players aim to leave scores
              like 32 (D16), 40 (D20), or 16 (D8) rather than an odd number,
              which can be harder to check out.
            </p>
          </RuleSection>
          <a href="/x01">
            <div className="mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2">
              Play Now
            </div>
          </a>
        </main>
      </div>
    </div>
  );
}

function ShanghaiRulesComponent() {
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

          <a href="/shanghai">
            <div className="mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2">
              Play Now
            </div>
          </a>
        </main>
      </div>
    </div>
  );
}

function KillerRulesComponent() {
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
            How to Play Killer
          </h1>
          <p className="text-lg text-gray-300">
            A fun, competitive multiplayer game of elimination. Ideal for 3 or
            more players.
          </p>
        </header>
        <main>
          <RuleSection title="The Objective" icon={Swords}>
            <p>
              The goal of Killer is to be the last player standing. Players
              first work to gain "Killer" status and then use their darts to
              eliminate opponents by knocking out their "lives".
            </p>
          </RuleSection>

          <RuleSection title="Setup" icon={ListChecks}>
            <p>
              Before the game begins, you need to assign numbers and set lives.
            </p>
            <ol>
              <li>
                <strong>Assign Numbers:</strong> Each player must be assigned a
                unique number on the board (typically from 1 to 20). A common
                way to do this is for each player to throw one dart with their
                non-dominant hand. The number they hit is theirs for the game.
                If a player misses or hits a number already taken, they throw
                again.
              </li>
              <li>
                <strong>Set Lives:</strong> Most commonly, Killer is played with
                3 lives. This can be adjusted based on preference. Players start
                with 0 lives.
              </li>
            </ol>
          </RuleSection>

          <RuleSection title="Phase 1: Becoming a Killer" icon={KeyRound}>
            <p>
              At the start of the game, no one is a Killer. To gain Killer
              status, players must gain health by hitting their own number.
            </p>
            <ul>
              <li>
                Hit your number until you've reached the needed lives. Doubles
                and triples count.
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
                Hitting a <strong>single</strong> of an opponent's number
                removes 1 life.
              </li>
              <li>
                Hitting a <strong>double</strong> of an opponent's number
                removes 2 lives.
              </li>
              <li>
                Hitting a <strong>triple</strong> of an opponent's number
                removes 3 lives.
              </li>
            </ul>
          </RuleSection>

          <RuleSection title="Losing Lives" icon={HeartCrack}>
            <p>
              A player loses a life when a Killer hits their number. Once a
              player is at 0 lives, and get hit again, they are out of the game.
            </p>
            <p>
              There is also a crucial "suicide" rule: If you are a Killer and
              accidentally hit your <strong>own number</strong> (single, double,
              or triple), you lose a life for each multiple. For example,
              hitting a triple of your own number as a Killer would cost you 3
              lives!
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
              Who do you target first? It's often wise to target the most
              skilled player to remove them early. Alternatively, you can form
              temporary alliances to take down a player who is close to winning.
            </p>
          </RuleSection>

          <a href="/killer">
            <div className="mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2">
              Play Now
            </div>
          </a>
        </main>
      </div>
    </div>
  );
}

function RuleNotFound() {
  return (
    <div>
      <h2>Guide not found </h2>
      <p>Sorry, we don't have a guide for this game yet. </p>
    </div>
  );
}

function RouteComponent() {
  const { ruleId } = useParams({ from: "/rules/$ruleId" });

  const renderContent = () => {
    switch (ruleId) {
      case "how-to-play-x01":
        return <X01RulesComponent />;
      case "how-to-play-killer":
        return <KillerRulesComponent />;
      case "how-to-play-cricket-darts":
        return <CricketRulesComponent />;
      case "how-to-play-shanghai":
        return <ShanghaiRulesComponent />;
      default:
        return <RuleNotFound />;
    }
  };

  return <div className="rule-container">{renderContent()}</div>;
}
