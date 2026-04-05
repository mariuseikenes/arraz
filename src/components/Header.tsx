import { Link } from "@tanstack/react-router";

import { useState } from "react";
import { BookAlert, BookCheck, Calculator, Home, House, LogIn, LogOut, Menu, Notebook, NotebookPen, User, X } from "lucide-react";
import Logo from "../logo.svg?react";
import { useAuth } from "@/context/AuthContext";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {user, logout} = useAuth()

  return (
    <>
      <header className="p-4 flex items-center justify-between">
        <h1 className="ml-4 text-xl font-semibold inline-flex text-text">
          <Link to="/" className="flex gap-2 text-2xl flex-row">
            <div className="text-left inline-flex h-full">
              <Logo className="h-18 w-18" />
            </div>
            <div className=" text-left flex flex-col">
              <div className="font-bold text-3xl">Arraz </div>
              <div className="font-medium text-sm">A modern darts scorer. </div>
            </div>
          </Link>
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors md:hidden block"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-bg/80 backdrop-blur-lg text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <House size={20} />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/games"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <Calculator size={20} />
            <span className="font-medium">Game Library</span>
          </Link>
          <Link
            to="/rules"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <BookAlert size={20} />
            <span className="font-medium">Rulebook</span>
          </Link>
          <Link
            to="/guides"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <BookCheck size={20} />
            <span className="font-medium">Guides</span>
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <NotebookPen size={20} />
            <span className="font-medium">Blogs & Articles</span>
          </Link>
          {!user && <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <LogIn size={20} />
            <span className="font-medium">Log In</span>
          </Link>}
          {user && <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <User size={20} />
            <span className="font-medium">Profile</span>
          </Link>}
          {user && <button
            onClick={() => logout()}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 w-full hover:bg-gray-800 transition-colors mb-2"
          >
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>}
        </nav>
      </aside>
    </>
  );
}
