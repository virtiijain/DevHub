import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function ProjectsBlock({ user, setUser, token }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [editing, setEditing] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", desc: "", link: "" });

  const addProject = async () => {
    const { name, desc, link } = newProject;
    if (!name.trim() || !desc.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/profile/project`, {
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
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const removeProject = async (index) => {
    try {
      const filtered = (user.projects || []).filter((_, i) => i !== index);
      await fetch(`${API_BASE}/api/profile`, {
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

  return (
    <div className="bg-white/10 border border-white/20 p-8 rounded-2xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button onClick={() => setEditing(!editing)} className="p-1 bg-white/20 rounded-full hover:bg-white/30">
          <FaPlus />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {(user.projects || []).length ? (
          user.projects.map((p, i) => (
            <div key={i} className="bg-white/20 p-5 rounded-xl border border-white/30 hover:bg-white/30 transition relative">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-white/80 text-sm mt-2">{p.desc}</p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-white/70 text-sm mt-3 inline-block hover:underline">
                  View Code / Live →
                </a>
              )}
              <FaTrash className="absolute top-2 right-2 cursor-pointer text-red-300 hover:text-red-400" onClick={() => removeProject(i)} />
            </div>
          ))
        ) : (
          <p className="text-white/70">No projects added yet.</p>
        )}
      </div>

      {editing && (
        <div className="mt-6 grid gap-3">
          <input className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50" placeholder="Project Name" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
          <input className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50" placeholder="Description" value={newProject.desc} onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })} />
          <input className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50" placeholder="Link" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
          <button onClick={addProject} className="px-4 py-2 bg-white/30 rounded-lg hover:bg-white/40 transition">Add Project</button>
        </div>
      )}
    </div>
  );
}
