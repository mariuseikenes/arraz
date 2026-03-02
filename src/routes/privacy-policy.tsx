import { createFileRoute } from '@tanstack/react-router';
import {
  ShieldCheck,
  DatabaseZap,
  LineChart,
  Mail,
  FileText,
} from 'lucide-react';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyComponent,
    head: () => ({
    meta: [
      {
        title: "Privacy Policy"
      }
    ]
  })
});

function PolicySection({
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

function PrivacyPolicyComponent() {
  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" className=""> 
        <div className='p-2 border w-fit bg-white/10 rounded-md'>
          <FaLongArrowAltLeft className='text-white' /> 
        </div>
        </a>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-400">
            Last updated: March 1, 2026
          </p>
        </header>

        <div className="prose prose-invert prose-p:text-gray-300 prose-a:text-accent">
          <p className="mb-10 text-lg">
            Your privacy is important to us. Arraz is designed to be a simple,
            private-by-default scorekeeping tool. This policy explains what
            information is handled and why.
          </p>

          <PolicySection title="The Short Version" icon={FileText}>
            <p>
              We do not require an account. We do not collect or store any
              personally identifiable information. Game data like player names
              and scores are processed in your browser and are never sent to our
              servers. We use an anonymous analytics service to improve the app.
            </p>
          </PolicySection>

          <PolicySection title="No Personal Information Collected" icon={ShieldCheck}>
            <p>
              You can use all features of Arraz without creating an account or
              providing any personal information such as your name or email
              address. We do not want it.
            </p>
          </PolicySection>

          <PolicySection title="Locally Stored Data (localStorage)" icon={DatabaseZap}>
            <p>
              To enhance your experience, Arraz uses your browser's built-in
              storage (`localStorage`) to save certain non-sensitive data on
              your own device. This may include:
            </p>
            <ul className="list-disc pl-5">
              <li>Game configuration (e.g., starting score for 501).</li>
              <li>Player names you've previously entered.</li>
            </ul>
            <p>
              This data remains on your computer and is never transmitted to our
              servers. You can clear this data at any time by clearing your
              browser's site data for our domain.
            </p>
          </PolicySection>

          <PolicySection title="Anonymous Web Analytics" icon={LineChart}>
            <p>
              We use a third-party analytics service called Databuddy to help us
              understand how users interact with the app. This service collects
              anonymous, aggregated data, such as:
            </p>
            <ul className="list-disc pl-5">
              <li>The pages you visit and features you use.</li>
              <li>Your device type, browser, and operating system.</li>
              <li>General geographic location (e.g., country).</li>
            </ul>
            <p>
              This data is not tied to you personally and is used solely to
              identify trends, fix bugs, and improve the application for
              everyone. You can review{' '}
              <a
                href="https://databuddy.cc/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Databuddy's Privacy Policy
              </a>{' '}
              for more information.
            </p>
          </PolicySection>

          <PolicySection title="Contact Us" icon={Mail}>
            <p>
              If you have any questions about this Privacy Policy, please feel
              free to contact us, hello@mariuseikenes.com
            </p>
          </PolicySection>
        </div>
      </div>
    </div>
  );
}

