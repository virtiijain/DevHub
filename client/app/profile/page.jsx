"use client";

import { useEffect, useState } from "react";
import InfoBlock from "./InfoBlock";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    bio: "",
    skills: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    desc: "",
    link: "",
  });
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
        const res = await fetch("http://localhost:8080/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
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
  }, [token]);

  const updateField = async (field, value) => {
    try {
      const res = await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();
      setUser((prev) => ({ ...prev, [field]: data[field] }));
    } catch (err) {
      console.error(err);
    }
  };

  const addSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      const res = await fetch("http://localhost:8080/api/profile/skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skill: newSkill }),
      });
      const skills = await res.json();
      setUser((prev) => ({ ...prev, skills }));
      setNewSkill("");
    } catch (err) {
      console.error(err);
    }
  };

  const addProject = async () => {
    const { name, desc, link } = newProject;
    if (!name.trim() || !desc.trim()) return;
    try {
      const res = await fetch("http://localhost:8080/api/profile/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, desc, link }),
      });
      const projects = await res.json();
      setUser((prev) => ({ ...prev, projects }));
      setNewProject({ name: "", desc: "", link: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight">
          Developer Profile
        </h1>
        <p className="text-gray-400 mt-2">
          Everything that makes you a standout dev right here.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center">
            <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center text-xl font-semibold">
              {user.username[0]?.toUpperCase() || ""}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.length ? (
                user.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 text-sm rounded-full border border-white/20"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No skills added yet.</p>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                className="flex-1 px-2 py-1 rounded-lg bg-white/10 text-white outline-none"
                placeholder="New skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button
                onClick={addSkill}
                className="px-4 py-1 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">About You</h2>
            <div className="space-y-4">
              <InfoBlock
                label="Name"
                value={user.name}
                onSave={(v) => updateField("name", v)}
              />
              <InfoBlock
                label="Username"
                value={user.username}
                onSave={(v) => updateField("username", v)}
              />
              <InfoBlock
                label="Bio"
                value={user.bio}
                textarea
                onSave={(v) => updateField("bio", v)}
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-5">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {user.projects.length ? (
                user.projects.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20"
                  >
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-300 mt-2">{p.desc}</p>
                    {p.link && (
                      <a
                        href={p.link}
                        className="text-blue-400 text-sm mt-3 inline-block hover:underline"
                      >
                        View Code / Live →
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No projects added yet.</p>
              )}
            </div>
            <div className="mt-6 space-y-2">
              <input
                className="w-full px-2 py-1 rounded-lg bg-white/10 text-white outline-none"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
              />
              <input
                className="w-full px-2 py-1 rounded-lg bg-white/10 text-white outline-none"
                placeholder="Description"
                value={newProject.desc}
                onChange={(e) =>
                  setNewProject({ ...newProject, desc: e.target.value })
                }
              />
              <input
                className="w-full px-2 py-1 rounded-lg bg-white/10 text-white outline-none"
                placeholder="Link"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({ ...newProject, link: e.target.value })
                }
              />
              <button
                onClick={addProject}
                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
