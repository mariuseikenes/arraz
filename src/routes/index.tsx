import { useAuth } from "@/context/AuthContext";
import { createFileRoute } from "@tanstack/react-router";
import { BookAlert, BookCheck, Calculator, Github, NotebookPen } from "lucide-react";
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { user, logout, loading } = useAuth();
  console.log(user)

  return (
    <div className="text-center p-8">
      <h1 className="text-3xl md:text-5xl">
        Welcome to <span className="text-accent font-bold">Arraz</span>!
      </h1>
      <div>
        <main className="flex flex-col my-8 gap-4">
          <p className="prose prose-invert md:mx-auto text-balance">
            <span className="text-accent">Arraz</span> was created out of
            frustration at most online darts scorekeeping sites. They were
            either broken, had poor UX, outdated or didn't support the features
            I needed. Therefore I created{" "}
            <span className="text-accent">Arraz</span>, an open-source, modern
            scorekeeping webapp, without bloat or login.
            <br/><br/>
            If you can't find your favorite game here - contact me, and I'll try to get it sorted. 
            Alternatively, if you're a developer, feel free to open a pull request and add it yourself!
          </p>

          <div className=" bg-linear-to-r h-px md:w-2/3 w-full mx-auto from-transparent via-accent to-transparent"/>
          <div className="flex flex-row flex-wrap justify-center gap-2 md:w-2/3 md:mx-auto">
            <a
              href="/games"
              className="bg-light-charcoal p-6 rounded-lg md:w-fit w-full border border-accent"
            >
              <div className="inline-flex gap-2 w-full items-center">
                <Calculator className="h-10 w-10 text-accent" />
                <h3 className="text-xl font-bold">Game Library</h3>
              </div>
              <p className="text-gray-400 text-left text-md">
                Find the game you need a scorekeeper for. 
              </p>
            </a>
            <a
              href="/rules"
              className="bg-light-charcoal p-6 rounded-lg border border-inactive"
            >
              <div className="inline-flex gap-2 w-full items-center">
                <BookAlert className="h-10 w-10 text-accent" />
                <h3 className="text-xl font-bold">Rulebook</h3>
              </div>
              <p className="text-gray-400 text-left text-md">
                Learn the rules of all the games available on Arraz.
              </p>
            </a>
            <a
              href="/guides"
              className="bg-light-charcoal p-6 rounded-lg border border-inactive"
            >
              <div className="inline-flex gap-2 w-full items-center">
                <BookCheck className="h-10 w-10 text-accent" />
                <h3 className="text-xl font-bold">Guides</h3>
              </div>
              <p className="text-gray-400 text-left text-md">
                Learn how to set up your dartboard, X01-checkout charts and
                more.
              </p>
            </a>
            <a
              href="/blog"
              className="bg-light-charcoal p-6 rounded-lg border border-inactive w-full md:w-auto"
            >
              <div className="inline-flex gap-2 w-full items-center">
                <NotebookPen className="h-10 w-10 text-accent" />
                <h3 className="text-xl font-bold">Blog & Articles</h3>
              </div>
              <p className="text-gray-400 text-left text-md">
                Blog posts & articles
              </p>
            </a>
          </div>
        </main>
        <footer className="flex flex-col">
          <p className="inline-flex text-gray-400 gap-2 items-center justify-center underline">
            <Github />{" "}
            <a href="https://github.com/mariuseikenes/arraz">
              I'm open source!
            </a>
          </p>
          <div className="inline-flex gap-2 mt-4 items-center justify-center">
            <a href="/contact" className="underline text-gray-400 text-sm">
              Contact
            </a>
            <a href="/tos" className="underline text-gray-400 text-sm">
              Terms of Service
            </a>
            <a
              href="/privacy-policy"
              className="underline text-gray-400 text-sm"
            >
              Privacy Policy
            </a>
            <a href="/about" className="underline text-gray-400 text-sm">
              About
            </a>
            <a href="https://donate.stripe.com/9AQcPo6or91r7cIdQQ" className="underline text-gray-400 text-sm">
              Donate
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
