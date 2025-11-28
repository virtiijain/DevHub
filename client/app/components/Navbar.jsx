"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar({ user, setUser }) { 
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-6 px-8 relative">
      <h1 className="text-2xl uppercase tracking-wide font-bold">DevHub</h1>

      <div className="hidden md:flex space-x-8 text-base font-medium">
        <Link href="/">Home</Link>
        <Link href="/build-in-public">Build in Public</Link>
        <Link href="/ask">Ask a Dev</Link>
        {user ? (
          <Link href="/profile">Profile</Link>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-blue-700 flex flex-col items-left pl-8 space-y-6 py-6 font-medium shadow-md md:hidden z-50">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/build-in-public" onClick={() => setMenuOpen(false)}>Build in Public</Link>
          <Link href="/ask" onClick={() => setMenuOpen(false)}>Ask a Dev</Link>
          {user ? (
            <Link href="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
