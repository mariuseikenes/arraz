import { createFileRoute } from '@tanstack/react-router';
import {
  Goal,
  Calculator,
  PlayCircle,
  CheckCircle2,
  ShieldX,
  Lightbulb,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/rules/x01')({
  component: X01RulesComponent,
  head: () => ({
    meta: [
      {
        title: "How to play X01 (501)"
      }, 
      {
        name: "description",
        content: "X01 is the most popular family of dart games. Be the first player to reach exactly zero from a starting score (typically 501). The final dart must land in a double segment."
      }
    ]
  })
});

function RuleSection({
  title,
  icon: Icon,
  children,
}: {
  title:string;
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

function X01RulesComponent() {
  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">

        <a href="/" aria-label='Back' className=""> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </a>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            How to Play X01 Darts
          </h1>
          <p className="text-lg text-gray-300">
            The complete guide to the most popular family of dart games, from 501 to 301.
          </p>
        </header>
        <main>
        <RuleSection title="The Objective" icon={Goal}>
          <p>
            The goal of any X01 game is simple: be the first player to reach exactly zero from a starting score (like 501 or 301). The final dart thrown to win must land in a double segment.
          </p>
        </RuleSection>

        <RuleSection title="Common Game Variants" icon={PlayCircle}>
          <p>
            While 501 is the professional standard, several variations exist, differing primarily by the starting score and rules for starting/ending.
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
            Each player starts with the same score (e.g., 501). After throwing three darts, the total score of the darts is calculated and subtracted from the player's current score.
          </p>
          <ul>
            <li><strong>Outer Ring:</strong> Scores double the segment number.</li>
            <li><strong>Inner Ring:</strong> Scores triple the segment number.</li>
            <li><strong>Outer Bull (Green):</strong> Scores 25.</li>
            <li><strong>Inner Bull (Red):</strong> Scores 50 (counts as a double).</li>
          </ul>
        </RuleSection>

        <RuleSection title="Winning the Game (Checking Out)" icon={CheckCircle2}>
          <p>
            To win, a player must reach a score of exactly zero. The final dart that reduces the score to zero must be a <strong>double</strong>, (unless you disable the double-out rule).
          </p>
          <ul>
            <li>For example, if a player has 40 points remaining, they must hit a double 20 to win.</li>
            <li>The inner bullseye (worth 50) also counts as a double (double 25) and can be used to win the game.</li>
          </ul>
        </RuleSection>

        <RuleSection title="Busting" icon={ShieldX}>
          <p>
            A player's turn is immediately over and their score is reset to what it was at the start of their turn if they "bust". A bust occurs if a player:
          </p>
          <ol>
            <li>Scores more than the points they have remaining. (e.g., scoring 20 with 18 left).</li>
            <li>Reduces their score to exactly 1. (You cannot hit a double from 1).</li>
            <li>Reduces their score to 0, but the final dart was not a double. (e.g., hitting a single 20 with 20 left).</li>
          </ol>
        </RuleSection>

        <RuleSection title="Strategy Tip" icon={Lightbulb}>
          <p>
            As you get closer to zero, focus on leaving yourself with a "good" number for your next turn. Experienced players aim to leave scores like 32 (D16), 40 (D20), or 16 (D8) rather than an odd number, which can be harder to check out.
          </p>
        </RuleSection>
        <a href="/x01">
          <div className='mx-auto border border-accent rounded-sm bg-light-charcoal text-center py-2'>Play Now</div>
        </a>
        </main>
      </div>
    </div>
  );
}

