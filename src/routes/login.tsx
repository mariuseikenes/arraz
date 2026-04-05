import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const nav = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      await login(form.get("email") as string, form.get("password") as string);
      nav({
        to: "/",
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" aria-label="Back">
          <div className="p-2 border w-fit bg-white/10 rounded-md">
            <FaLongArrowAltLeft className="text-white" />
          </div>
        </a>
        <header className="text-center mt-4 mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">Log In</h1>
          <p className="text-gray-400">
            Log in to keep track of games and improvements. Not required.
          </p>
        </header>

        <main className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              required
              className={`py-1 border rounded-md ${error ? "border-secondary" : "border-accent"}`}
            />
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className={`py-1 border rounded-md ${error ? "border-secondary" : "border-accent"}`}
            />
            <p className="text-secondary">{error}</p>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="border rounded-md w-fit p-2 px-8 mt-4 flex items-center gap-2 border-emerald-600 bg-emerald-600/20"
              >
                Log In
                <GoArrowRight />
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <Link
              to="/register"
              className="underline text-accent font-semibold"
            >
              No account? Register here
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
