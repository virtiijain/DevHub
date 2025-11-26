"use client";
import { useState } from "react";

export default function AskADev() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      user: "Alice",
      title: "How do I center a div in Tailwind?",
      desc: "I'm struggling to center a div both vertically and horizontally using Tailwind CSS.",
      tags: ["CSS", "Tailwind"],
      answers: 3,
    },
    {
      id: 2,
      user: "Bob",
      title: "React useEffect dependency array confusion",
      desc: "When should I add variables to the dependency array in useEffect?",
      tags: ["React", "JavaScript"],
      answers: 5,
    },
    {
      id: 3,
      user: "Charlie",
      title: "Best Node.js database for beginners?",
      desc: "I want to start a simple API project. Should I use MongoDB or PostgreSQL?",
      tags: ["Node.js", "Backend"],
      answers: 2,
    },
  ]);

  const [newQuestion, setNewQuestion] = useState({
    user: "",
    title: "",
    desc: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.user || !newQuestion.title || !newQuestion.desc) return;

    const tagsArray = newQuestion.tags.split(",").map((t) => t.trim());
    setQuestions([
      { id: Date.now(), ...newQuestion, tags: tagsArray, answers: 0 },
      ...questions,
    ]);
    setNewQuestion({ user: "", title: "", desc: "", tags: "" });
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">❓ Ask a Dev</h1>

      {/* Ask Question Form */}
      <div className="mb-12 p-6 bg-[#1a1a1a] rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Post a question</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            className="p-3 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none"
            value={newQuestion.user}
            onChange={(e) => setNewQuestion({ ...newQuestion, user: e.target.value })}
          />
          <input
            type="text"
            placeholder="Question title"
            className="p-3 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
          />
          <textarea
            placeholder="Describe your question"
            className="p-3 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none resize-none"
            value={newQuestion.desc}
            onChange={(e) => setNewQuestion({ ...newQuestion, desc: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="p-3 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none"
            value={newQuestion.tags}
            onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Questions Feed */}
      <div className="grid gap-6">
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-6 bg-[#1a1a1a] rounded-xl hover:scale-[1.02] transition cursor-pointer"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{q.title}</h3>
              <span className="text-sm text-gray-400">{q.answers} answers</span>
            </div>
            <p className="text-sm opacity-70 mb-2">{q.desc}</p>
            <div className="flex flex-wrap gap-2">
              {q.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-700/50 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs mt-2 text-gray-400">— {q.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
