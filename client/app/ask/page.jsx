"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const API_BASE = "http://localhost:8080";
const socket = io(API_BASE);

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000;
  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 172800) return "Yesterday";
  return date.toLocaleDateString();
};

export default function AskADev() {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", tags: "" });
  const [questions, setQuestions] = useState([]);
  const [openDiscussion, setOpenDiscussion] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch(() => toast.error("Failed to fetch questions"));

    socket.on("newQuestion", (question) => {
      setQuestions((prev) => [question, ...prev]);
    });

    socket.on("newComment", (updatedQuestion) => {
      setQuestions((prev) =>
        prev.map((q) => (q._id === updatedQuestion._id ? updatedQuestion : q))
      );
    });

    socket.on("voteUpdate", (updatedQuestion) => {
      setQuestions((prev) =>
        prev.map((q) => (q._id === updatedQuestion._id ? updatedQuestion : q))
      );
    });

    return () => {
      socket.off("newQuestion");
      socket.off("newComment");
      socket.off("voteUpdate");
    };
  }, []);

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

      setForm({ title: "", description: "", tags: "" });
      setOpenModal(false);
      toast.success("Question posted successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addComment = async (qId, text) => {
    if (!user) return toast.error("Please login to comment");

    try {
      const res = await fetch(`${API_BASE}/api/questions/${qId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user.username || user.name,
          text,
        }),
      });

      if (!res.ok) throw new Error("Failed to add comment");
      const updated = await res.json();

      socket.emit("newComment", updated);
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const vote = async (qId, type) => {
    if (!user) return toast.error("Please login to vote");

    try {
      const res = await fetch(`${API_BASE}/api/questions/${qId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (!res.ok) throw new Error("Failed to vote");
      const updated = await res.json();

      socket.emit("voteUpdate", updated);
    } catch {
      toast.error("Voting failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0147FF] px-4 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 drop-shadow-lg">
          Developer Community{" "}
          <span className="text-base text-white/70">Q & A</span>
        </h1>

        <div className="space-y-6">
          {questions.map((q) => (
            <div
              key={q._id}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {q.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    Asked by{" "}
                    <span className="font-medium text-white">{q.user}</span> •{" "}
                    {formatTimeAgo(q.createdAt)}
                  </p>
                  <p className="text-white/90">{q.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {q.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-tr from-[#0178FF] to-[#00CFFF] rounded-full text-xs font-medium text-white transition hover:scale-105"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-start md:items-end gap-3 md:gap-4 mt-3 md:mt-0">
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition">
                    <button
                      onClick={() => vote(q._id, "up")}
                      className="flex items-center justify-center text-white hover:text-blue-300 transition"
                    >
                      <FaThumbsUp size={18} />
                    </button>
                    <span className="font-semibold text-white">{q.votes}</span>
                  </div>

                  <button
                    onClick={() =>
                      setOpenDiscussion(openDiscussion === q._id ? null : q._id)
                    }
                    className="text-sm border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium transition"
                  >
                    {openDiscussion === q._id
                      ? "Hide Discussion"
                      : "View Discussion"}
                  </button>
                </div>
              </div>

              {openDiscussion === q._id && (
                <div className="mt-4 bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/20 space-y-3">
                  {q.comments.length === 0 && (
                    <p className="text-white/70">No comments yet</p>
                  )}

                  {q.comments.map((c, i) => (
                    <div
                      key={i}
                      className="bg-black/50 p-3 rounded hover:bg-black/40 transition"
                    >
                      <p className="text-white">{c.text}</p>
                      <p className="text-sm text-white/70 mt-1">— {c.user}</p>
                    </div>
                  ))}

                  <form
                    className="flex flex-col sm:flex-row gap-2 mt-3 w-full"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const text = e.target.comment.value;
                      if (text.trim()) addComment(q._id, text);
                      e.target.reset();
                    }}
                  >
                    <input
                      name="comment"
                      placeholder="Write a comment..."
                      className="flex-1 w-full sm:w-auto border border-white/30 text-white px-3 py-2 rounded placeholder:text-white/60 focus:ring-2 focus:ring-[#00CFFF] bg-white/10"
                    />
                    <button className="bg-gradient-to-tr from-[#0178FF] to-[#00CFFF] text-white px-4 py-2 rounded transition hover:scale-105 w-full sm:w-auto">
                      Comment
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          if (!user) return toast.error("Please login first!");
          setOpenModal(true);
        }}
        className="fixed bottom-8 right-8 bg-gradient-to-tr from-[#0147FF] to-[#00CFFF] font-semibold px-6 py-4 rounded-full shadow-xl text-white cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-200"
      >
        Ask Question
      </button>

      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 py-6">
          <div
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl w-full max-w-lg text-white border border-white/20 
                    max-h-[90vh] overflow-y-auto shadow-lg"
          >
            <h2 className="text-2xl mb-4 font-semibold text-white text-center">
              Ask a Question
            </h2>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 mb-3 bg-white/10 text-white rounded placeholder:text-white/60 border border-white/20 focus:ring-2 focus:ring-[#00CFFF]"
            />
            <textarea
              placeholder="Description"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-3 mb-3 bg-white/10 text-white rounded placeholder:text-white/60 border border-white/20 focus:ring-2 focus:ring-[#00CFFF]"
            />
            <input
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full p-3 mb-4 bg-white/10 text-white rounded placeholder:text-white/60 border border-white/20 focus:ring-2 focus:ring-[#00CFFF]"
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={postQuestion}
                className="px-4 py-2 bg-gradient-to-tr from-[#0178FF] to-[#00CFFF] hover:scale-105 rounded transition"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
