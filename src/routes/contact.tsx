import { createFileRoute } from '@tanstack/react-router';
import { Mail, Bug, Lightbulb, HelpCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/contact')({
  component: ContactComponent,
    head: () => ({
    meta: [
      {
        title: "Contact"
      }
    ]
  })
});

function ContactComponent() {
  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="" aria-label='Back'> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </a>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Get in Touch</h1>
          <p className="text-lg text-gray-300">
            We'd love to hear from you. Your feedback is vital for making Arraz
            better.
          </p>
        </header>
        <main>
        <Card className="bg-light-charcoal border-inactive text-center">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Contact Us</CardTitle>
            <CardDescription className="text-gray-400">
              The best way to reach us is by email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a href="mailto:contact@arraz-app.com">
              <Button
                size="lg"
                className="bg-accent text-bg hover:bg-accent/90 text-lg font-bold"
              >
                <Mail className="mr-2 h-5 w-5" />
                hello@mariuseikenes.com
              </Button>
            </a>
          </CardContent>
        </Card>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">
            What should you write to us about?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-light-charcoal p-6 rounded-lg border border-inactive">
              <Bug className="h-10 w-10 text-secondary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Bug Reports</h3>
              <p className="text-gray-400">
                If something isn't working as expected, please let us know.
              </p>
            </div>
            <div className="bg-light-charcoal p-6 rounded-lg border border-inactive">
              <Lightbulb className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Feature Suggestions</h3>
              <p className="text-gray-400">
                Have a great idea for a new game mode or feature? We're all
                ears.
              </p>
            </div>
            <div className="bg-light-charcoal p-6 rounded-lg border border-inactive">
              <HelpCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">General Feedback</h3>
              <p className="text-gray-400">
                Any other questions, comments, or words of encouragement are
                welcome!
              </p>
            </div>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}

