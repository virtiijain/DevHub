"use client";

import { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import SkillsBlock from "./components/SkillsBlock";
import ProjectsBlock from "./components/ProjectsBlock";
import AboutBlock from "./components/AboutBlock";

export default function ProfilePage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE; 
  const [user, setUser] = useState({
    name: "",
    username: "",
    bio: "",
    skills: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        setUser({
          name: data.name || "",
          username: data.username || "",
          bio: data.bio || "",
          skills: Array.isArray(data.skills) ? data.skills : [],
          projects: Array.isArray(data.projects) ? data.projects : [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, API_BASE]);

  if (loading)
    return <p className="text-center mt-10 text-white/80">Loading profile...</p>;

  return (
    <div className="min-h-screen px-6 py-10 bg-[#0147FF] text-white max-w-6xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold">Developer Profile</h1>
      <p className="text-white/80">
        Show off your skills, projects, and bio professionally.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <ProfileCard user={user} />
          <SkillsBlock user={user} setUser={setUser} token={token} />
        </div>
        <div className="md:col-span-2 space-y-8">
          <AboutBlock user={user} setUser={setUser} token={token} />
          <ProjectsBlock user={user} setUser={setUser} token={token} />
        </div>
      </div>
    </div>
  );
}
