import { createFileRoute } from '@tanstack/react-router';
import { Target, BookOpenText, User, Github } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <a href="/" className=""> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </a>
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            About <span className="text-accent">Arraz</span>
          </h1>
          <p className="text-lg text-gray-300">
            The ultimate scorekeeping tool, built by dart lovers for dart lovers.
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-200">
          {/* Our Mission Card */}
          <Card className="bg-light-charcoal border-inactive text-inherit">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-accent" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To provide the simplest, most intuitive dart scorekeeping
                experience for players of all levels. We focus on a clean
                interface and fast performance, so you can focus on your game,
                not on the math.
              </p>
            </CardContent>
          </Card>

          {/* The Story Card */}
          <Card className="bg-light-charcoal border-inactive text-inherit">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpenText className="h-6 w-6 text-accent" />
                <span>The Story</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
              I created Arraz during the course of a week where I played a bunch of darts 
              with my dad. I'd get really annoyed, as most scorekeeping websites I tried were 
              either bugged, had poor UX or simply outdated. Therefore I created Arraz, and have 
              continued to add more games and features since then, and my interest in darts has grown
              with it.
              </p>
            </CardContent>
          </Card>

          {/* The Creator Card */}
          <Card className="bg-light-charcoal border-inactive text-inherit">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="h-6 w-6 text-accent" />
                <span>Me</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                My name is Marius Eikenes, a norwegian hobbyist programmer. My interests include darts, 
                programming, backcountry snowboarding and motorcycles. You can read more about me and check 
                out my other projects at <a className="underline" href="https://mariuseikenes.com">my homepage</a>.
              </p>
            </CardContent>
          </Card>
 
          {/* Open Source */}
          <Card className="bg-light-charcoal border-inactive text-inherit">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Github className="h-6 w-6 text-accent" />
                <span>Open Source</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Arraz is open source! Any contributions are highly appreciated. 
                You can find the repo <a className='underline' href='https://github.com/mariuseikenes/arraz'>here</a>. Starring it would also be of 
                great help to me!
              </p>
            </CardContent>
          </Card>

          </div>
      </div>
    </div>
  );
}

