"use client";
import { useState } from "react";

export default function BuildInPublic() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alice",
      project: "Portfolio Website",
      desc: "Built responsive navbar & hero section with Next.js & Tailwind.",
      tags: ["React", "Next.js", "Tailwind"],
    },
    {
      id: 2,
      user: "Bob",
      project: "Chat App",
      desc: "Implemented real-time messaging with Socket.io & Node.js.",
      tags: ["Node.js", "Socket.io", "Backend"],
    },
    {
      id: 3,
      user: "Charlie",
      project: "Game Engine",
      desc: "Experimenting with WebGL for 2D games.",
      tags: ["WebGL", "JavaScript", "Graphics"],
    },
  ]);

  const [newPost, setNewPost] = useState({
    user: "",
    project: "",
    desc: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.user || !newPost.project || !newPost.desc) return;

    const tagsArray = newPost.tags.split(",").map((t) => t.trim());
    setPosts([{ id: Date.now(), ...newPost, tags: tagsArray }, ...posts]);
    setNewPost({ user: "", project: "", desc: "", tags: "" });
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">🚀 Build in Public</h1>

      {/* Post Form */}
      <div className="mb-12 p-6 bg-[#1a1a1a] rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Share your progress</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            className="p-3 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none"
            value={newPost.user}
            onChange={(e) => setNewPost({ ...newPost, user: e.target.value })}
          />
          <input
            type="text"
            placeholder="Project title"
            className="p-3 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none"
            value={newPost.project}
            onChange={(e) => setNewPost({ ...newPost, project: e.target.value })}
          />
          <textarea
            placeholder="Short update"
            className="p-3 rounded-lg bg-[#121212] border border-gray-700 text-white resize-none focus:outline-none"
            value={newPost.desc}
            onChange={(e) => setNewPost({ ...newPost, desc: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="p-3 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none"
            value={newPost.tags}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Post Update
          </button>
        </form>
      </div>

      {/* Feed */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-[#1a1a1a] rounded-xl hover:scale-[1.02] transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-1">{post.project}</h3>
            <p className="text-sm opacity-70 mb-2">{post.desc}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-700/50 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400">— {post.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
