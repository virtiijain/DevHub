import { useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const API_BASE = "http://localhost:8080";
const socket = io(API_BASE);

export default function AskQuestionModal({ setOpenModal, setQuestions, user }) {
  const [form, setForm] = useState({ title: "", description: "", tags: "" });

  const postQuestion = async () => {
    if (!user) return toast.error("Please login to post a question");

    try {
      const res = await fetch(`${API_BASE}/api/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          tags: form.tags.split(",").map((t) => t.trim()),
          user: user.username || user.name,
        }),
      });
      if (!res.ok) throw new Error("Failed to post question");
      const data = await res.json();

      socket.emit("newQuestion", data);
      setQuestions(prev => [data, ...prev]);
      setForm({ title: "", description: "", tags: "" });
      setOpenModal(false);
      toast.success("Question posted successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 py-6">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl w-full max-w-lg text-white border border-white/20 max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-2xl mb-4 font-semibold text-white text-center">Ask a Question</h2>

        <input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full p-3 mb-3 bg-white/10 text-white rounded placeholder:text-white/60 border border-white/20 focus:ring-2 focus:ring-[#00CFFF]" />
        <textarea placeholder="Description" rows={4} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full p-3 mb-3 bg-white/10 text-white rounded placeholder:text-white/60 border border-white/20 focus:ring-2 focus:ring-[#00CFFF]" />
        <input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} className="w-full p-3 mb-4 bg-white/10 text-white rounded placeholder:text-white/60 border border-white/20 focus:ring-2 focus:ring-[#00CFFF]" />

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button onClick={() => setOpenModal(false)} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition">Cancel</button>
          <button onClick={postQuestion} className="px-4 py-2 bg-gradient-to-tr from-[#0178FF] to-[#00CFFF] hover:scale-105 rounded transition">Post</button>
        </div>
      </div>
    </div>
  );
}
