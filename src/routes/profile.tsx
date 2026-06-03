import { Divider } from "@/components/Divider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { bobsGamesOptions } from "@/lib/queryOptions";
import { formatDate } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FaLongArrowAltLeft } from "react-icons/fa";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Your Profile | Arraz",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(bobsGamesOptions(0));
  },
});

type RGB = [number, number, number];

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function toCSS(c: RGB): string {
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function getBedGradient(hitRate: number): string {
  const RED_EDGE: RGB = [203, 45, 62];
  const RED_MID: RGB = [239, 71, 58];
  const GREEN_EDGE: RGB = [29, 151, 108];
  const GREEN_MID: RGB = [147, 249, 185];
  const GREY_EDGE: RGB = [44, 62, 80];
  const GREY_MID: RGB = [74, 85, 104];

  // Red → Green based on hit rate
  let edge = lerpRGB(RED_EDGE, GREEN_EDGE, hitRate);
  let mid = lerpRGB(RED_MID, GREEN_MID, hitRate);

  // Desaturate towards grey near 0%
  const greyBlend = Math.pow(1 - hitRate, 3); // cubic falloff
  edge = lerpRGB(edge, GREY_EDGE, greyBlend);
  mid = lerpRGB(mid, GREY_MID, greyBlend);

  return `linear-gradient(to right, ${toCSS(mid)}, ${toCSS(edge)})`;
}

function getBedStyle(hitRate: number) {
  const opacity = hitRate === 0 ? 0.25 : 0.35 + hitRate * 0.65;
  return {
    backgroundImage: getBedGradient(hitRate),
    opacity,
    // restore full opacity for text
  };
}

function RouteComponent() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const { data } = useSuspenseQuery(bobsGamesOptions(0));

  if (!user && !loading) {
    return nav({
      to: "/login",
    });
  } else if (!user) {
    return "loading";
  }
  const joinDate = new Date(user.created_at);

  function bedStats(): Map<string, { hits: number; total: number }> {
    const bedsOnly = data.games.flatMap((g) => g.beds).filter((b) => b);
    const bedMap = new Map();
    for (let i = 1; i <= 20; i++) {
      const onlyCurrentBed = bedsOnly.filter((b) => b.bed === i);
      const hits = onlyCurrentBed.reduce((pv, cv) => pv + cv.hits, 0);
      bedMap.set(i, {
        hits,
        total: onlyCurrentBed.length * 3,
      });
    }
    bedMap.set(25, {
      hits: bedsOnly
        .filter((b) => b.bed === 25)
        .reduce((pv, cv) => pv + cv.hits, 0),
      total: bedsOnly.filter((b) => b.bed === 25).length * 3,
    });
    return bedMap;
  }

  const bedStatistic = bedStats();

  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="" aria-label="Back">
          <div className="p-2 border w-fit bg-white/10 rounded-md">
            <FaLongArrowAltLeft className="text-white" />
          </div>
        </Link>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Your Profile</h1>
          <p className="text-lg text-gray-300">Logged in as {user.name}</p>
          <p className="text-lg text-gray-300">
            Member since {joinDate.getDate()}/{joinDate.getMonth() + 1}/
            {joinDate.getFullYear()}
          </p>
        </header>
        <main className="flex flex-col gap-4">
          <section className="gap-2 flex flex-col">
            <h2 className="text-3xl font-semibold">Bob's 27</h2>
            <div>
              <h3 className="text-lg font-semibold">
                Statistics <small>(last 50 games)</small>
              </h3>
              <ul>
                <li>
                  Average Bed:{" "}
                  {(
                    data.games
                      .map((g) => g.bed)
                      .reduce((pv, cv) => (pv += cv), 0) / data.games.length
                  ).toFixed(1)}
                </li>
                <li>
                  Average Score (only wins):{" "}
                  {(
                    data.games
                      .filter((g) => g.score > 0)
                      .map((g) => g.score)
                      .reduce((pv, cv) => (pv += cv), 0) /
                    data.games.filter((g) => g.score > 0).length
                  ).toFixed(1)}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Last 5 games</h3>
              <div className="gap-2 grid grid-cols-2 w-full mt-2 justify-center">
                {data.games
                  .slice(0, 5)
                  .reverse()
                  .map((g) => {
                    if (g.score > 0) {
                      return (
                        <div className="border border-green-600 rounded-md p-2 w-fit px-4">
                          <p>Score: {g.score}</p>
                          <small>{formatDate(new Date(g.played_at))}</small>
                        </div>
                      );
                    } else {
                      return (
                        <div className="border border-secondary p-2 rounded-md w-fit px-4">
                          <p>You lost at bed {g.bed}</p>
                          <small>{formatDate(new Date(g.played_at))}</small>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Hit rate by bed</h3>
              <div className="gap-2 w-full mt-2 justify-center">
                <ul className="flex flex-row flex-wrap gap-2 justify-center">
                  {Array.from(bedStatistic.entries()).map((bs) => (
                    <li
                      className="aspect-square font-semibold h-16 border rounded-lg flex items-center justify-center flex-col"
                      style={getBedStyle(bs[1].hits / bs[1].total)}
                    >
                      <p>D{bs[0]}</p>
                      <p>{((bs[1].hits/bs[1].total)*100).toFixed(1)}%</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <Divider />
          <section className="w-full flex items-center justify-center">
            <Dialog>
              <DialogTrigger>
                <Button variant={"destructive"}>Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  Are you sure you want to delete your account?
                </DialogTitle>
                <DialogDescription>
                  This action is not reversible.
                </DialogDescription>
                <DialogFooter className="flex flex-row gap-2">
                  <Button
                    variant={"ghost"}
                    className="grow border border-accent"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"destructive"}
                    className="grow"
                    onClick={() => {
                      api.deleteProfile();
                    }}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </main>
      </div>
    </div>
  );
}
