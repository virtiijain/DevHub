"use client";

import { useEffect, useState } from "react";
import InfoBlock from "./InfoBlock";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    bio: "",
    skills: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [editingProject, setEditingProject] = useState(false);
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
      setEditingSkill(false);
    } catch (err) {
      console.error(err);
    }
  };

  const removeSkill = async (skill) => {
    try {
      const filteredSkills = user.skills.filter((s) => s !== skill);
      await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skills: filteredSkills }),
      });
      setUser((prev) => ({ ...prev, skills: filteredSkills }));
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
      setEditingProject(false);
    } catch (err) {
      console.error(err);
    }
  };

  const removeProject = async (index) => {
    try {
      const filtered = user.projects.filter((_, i) => i !== index);
      await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projects: filtered }),
      });
      setUser((prev) => ({ ...prev, projects: filtered }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white/80">Loading...</p>;

  return (
    <div className="min-h-screen px-6 py-10 bg-[#0147FF] text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">Developer Profile</h1>
        <p className="text-white/80 mt-2">
          Show off your skills, projects, and bio professionally.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl flex flex-col items-center">
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {user.username[0]?.toUpperCase() || ""}
            </div>
            <h2 className="mt-4 font-semibold text-lg">
              {user.name || user.username}
            </h2>
            <p className="text-white/80 text-sm text-center mt-1">
              {user.bio || "No bio added yet."}
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <button
                onClick={() => setEditingSkill(!editingSkill)}
                className="p-1 bg-white/20 rounded-full hover:bg-white/30"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skills.length ? (
                user.skills.map((s, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 bg-white/20 text-white text-sm rounded-full border border-white/30"
                  >
                    {s}
                    <FaTrash
                      className="cursor-pointer text-xs hover:text-red-300"
                      onClick={() => removeSkill(s)}
                    />
                  </span>
                ))
              ) : (
                <p className="text-white/70">No skills added yet.</p>
              )}
            </div>
            {editingSkill && (
              <div className="mt-4 flex gap-2">
                <input
                  className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="New skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-white/30 rounded-lg hover:bg-white/40 transition"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="bg-white/10 border border-white/20 p-8 rounded-2xl space-y-4">
            <h2 className="text-2xl font-semibold">About You</h2>
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

          <div className="bg-white/10 border border-white/20 p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <button
                onClick={() => setEditingProject(!editingProject)}
                className="p-1 bg-white/20 rounded-full hover:bg-white/30"
              >
                <FaPlus />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {user.projects.length ? (
                user.projects.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white/20 p-5 rounded-xl border border-white/30 hover:bg-white/30 transition relative"
                  >
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="text-white/80 text-sm mt-2">{p.desc}</p>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 text-sm mt-3 inline-block hover:underline"
                      >
                        View Code / Live →
                      </a>
                    )}
                    <FaTrash
                      className="absolute top-2 right-2 cursor-pointer text-red-300 hover:text-red-400"
                      onClick={() => removeProject(i)}
                    />
                  </div>
                ))
              ) : (
                <p className="text-white/70">No projects added yet.</p>
              )}
            </div>

            {editingProject && (
              <div className="mt-6 grid gap-3">
                <input
                  className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                />
                <input
                  className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Description"
                  value={newProject.desc}
                  onChange={(e) =>
                    setNewProject({ ...newProject, desc: e.target.value })
                  }
                />
                <input
                  className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Link"
                  value={newProject.link}
                  onChange={(e) =>
                    setNewProject({ ...newProject, link: e.target.value })
                  }
                />
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-white/30 rounded-lg hover:bg-white/40 transition"
                >
                  Add Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
