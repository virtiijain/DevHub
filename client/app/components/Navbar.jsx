"use client";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem("hasSignedUp");
    setHasSignedUp(flag === "true");
  }, []);

  if (loading) return null;

  const commonLinks = [
    { href: "/", label: "Home" },
    { href: "/build-in-public", label: "Build in Public" },
    { href: "/ask", label: "Ask a Dev" },
  ];

  const authLinks = !user
    ? hasSignedUp
      ? [{ href: "/login", label: "Login" }]
      : [{ href: "/signup", label: "Signup" }]
    : [
        { href: "/profile", label: "Profile" },
        { label: "Logout", action: logout, isButton: true },
      ];

  const handleClick = (action) => {
    if (action) action();
    setMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center py-6 px-8 relative">
      <h1 className="text-2xl uppercase tracking-wide font-bold">DevHub</h1>

      <div className="hidden md:flex space-x-8 text-base font-medium">
        {[...commonLinks, ...authLinks].map((item, idx) =>
          item.isButton ? (
            <button
              key={idx}
              onClick={() => handleClick(item.action)}
              className="text-gray-300 cursor-pointer underline-offset-4 hover:underline"
            >
              {item.label}
            </button>
          ) : (
            <Link key={idx} href={item.href}>
              {item.label}
            </Link>
          )
        )}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-blue-700 text-white flex flex-col pl-8 space-y-6 py-6 md:hidden z-50">
          {[...commonLinks, ...authLinks].map((item, idx) =>
            item.isButton ? (
              <button
                key={idx}
                onClick={() => handleClick(item.action)}
                className="text-left text-red-300"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={idx}
                href={item.href}
                onClick={() => handleClick(item.action)}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
