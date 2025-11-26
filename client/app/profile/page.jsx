"use client";

import { useState } from "react";

export default function Profile() {
  const [user] = useState({
    name: "Virti Jain",
    username: "virti_dev",
    bio: "Fullstack developer | React & Node.js enthusiast | Sharing my dev journey",
    avatar: "/images/avatar.png", // replace with your avatar
    skills: ["React.js", "Node.js", "Tailwind CSS", "Next.js"],
    posts: [
      { id: 1, title: "Portfolio Website", desc: "Completed responsive navbar & hero." },
      { id: 2, title: "Chat App", desc: "Realtime messaging using Socket.io." },
      { id: 3, title: "DevHub Build in Public", desc: "Sharing daily updates." },
    ],
  });

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-blue-500">@{user.username}</p>
          <p className="mt-2 text-gray-300">{user.bio}</p>

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#1a1a1a] px-3 py-1 rounded-full text-sm text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity / Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-6">🛠️ Projects & Updates</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.posts.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-[#1a1a1a] rounded-xl hover:scale-[1.02] transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="opacity-70 text-sm">{post.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
