import { createFileRoute } from '@tanstack/react-router';
import {
  Gavel,
  ShieldOff,
  Code,
  AlertTriangle,
  RefreshCcw,
  Mail,
} from 'lucide-react';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/tos')({
  component: TermsOfServiceComponent,
});

function TosSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-3 text-2xl font-semibold mb-3">
        <Icon className="h-6 w-6 text-accent" />
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-gray-300 ml-9">{children}</div>
    </section>
  );
}

function TermsOfServiceComponent() {
  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" className=""> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </a>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-400">Last updated: March 1, 2026</p>
        </header>

        <div className="prose prose-invert prose-p:text-gray-300">
          <p className="mb-10 text-lg">
            Welcome to Arraz! These terms and conditions outline the rules and
            regulations for the use of our web application. By accessing and
            using this service, you accept and agree to be bound by the terms
            and provisions of this agreement.
          </p>

          <TosSection title="Use of the Service" icon={Gavel}>
            <p>
              Arraz is provided as a free scorekeeping tool for the game of
              darts. You are granted a limited, non-exclusive, non-transferable,
              revocable license to use the service for its intended purpose.
            </p>
            <p>
              You agree not to misuse the service. Misuse includes attempting to
              disrupt the service or use it
              for any illegal activities.
            </p>
          </TosSection>

          <TosSection title="Intellectual Property" icon={Code}>
            <p>
              The Service and its original content, features, and functionality
              (including but not limited to all software, text, and design) are
              and will remain the exclusive property of the creator of Arraz.
            </p>
          </TosSection>

          <TosSection title="Disclaimer of Warranties" icon={ShieldOff}>
            <p>
              The service is provided on an{' '}
              <strong className="text-secondary">"AS IS"</strong> and{' '}
              <strong className="text-secondary">"AS AVAILABLE"</strong> basis,
              without any warranties of any kind, either express or implied.
            </p>
            <p>
              We do not warrant that the service will be uninterrupted, secure,
              or error-free. We do not guarantee the accuracy or reliability of
              any scores or data calculated by the service. You are responsible
              for verifying the final score of any game.
            </p>
          </TosSection>

          <TosSection title="Limitation of Liability" icon={AlertTriangle}>
            <p>
              In no event shall the creator of Arraz be liable for any direct,
              indirect, incidental, special, or consequential damages arising
              out of, or in any way connected with, your use of or inability to
              use this service.
            </p>
          </TosSection>

          <TosSection title="Changes to Terms" icon={RefreshCcw}>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              We will note the "Last updated" date at the top of this page. What
              constitutes a material change will be determined at our sole
              discretion.
            </p>
          </TosSection>

          <TosSection title="Contact Us" icon={Mail}>
            <p>
              If you have any questions about these Terms, please contact us.
              (You can add your contact email or a link to a contact page here).
            </p>
          </TosSection>
        </div>
      </div>
    </div>
  );
}

