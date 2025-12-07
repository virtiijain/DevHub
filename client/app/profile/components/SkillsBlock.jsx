import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function SkillsBlock({ user, setUser, token }) {
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

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
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const removeSkill = async (skill) => {
    try {
      const filtered = user.skills.filter((s) => s !== skill);
      await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skills: filtered }),
      });
      setUser((prev) => ({ ...prev, skills: filtered }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <button
          onClick={() => setEditing(!editing)}
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

      {editing && (
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
  );
}
