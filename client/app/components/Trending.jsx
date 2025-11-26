// components/Trending.jsx
"use client";
import Link from "next/link";

export default function Trending() {
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🔥 Trending</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Meme Cards */}
        <div className="p-4 bg-[#1a1a1a] rounded-xl hover:scale-[1.02] transition">
          <h3 className="text-xl font-semibold mb-2">Top Meme</h3>
          <p className="text-sm opacity-80 mb-4">“When your code works, but you don’t know why…”</p>
          <Link href="/memes" className="text-blue-400 text-sm underline">See more</Link>
        </div>

        <div className="p-4 bg-[#1a1a1a] rounded-xl hover:scale-[1.02] transition">
          <h3 className="text-xl font-semibold mb-2">Most Liked Meme</h3>
          <p className="text-sm opacity-80 mb-4">“Me debugging at 3 AM like—”</p>
          <Link href="/memes" className="text-blue-400 text-sm underline">See more</Link>
        </div>

        <div className="p-4 bg-[#1a1a1a] rounded-xl hover:scale-[1.02] transition">
          <h3 className="text-xl font-semibold mb-2">Fresh Meme</h3>
          <p className="text-sm opacity-80 mb-4">“Frontend vs Backend showdown 😭🔥”</p>
          <Link href="/memes" className="text-blue-400 text-sm underline">See more</Link>
        </div>
      </div>

      {/* Trending Challenge + Ask a Dev */}
      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        <div className="p-5 bg-[#161616] rounded-xl">
          <h3 className="text-xl font-semibold">⚡ Trending Challenge</h3>
          <p className="text-sm opacity-80 mt-1 mb-3">Build a weather app using any API!</p>
          <Link href="/challenges" className="text-blue-400 text-sm underline">Join Challenge</Link>
        </div>

        <div className="p-5 bg-[#161616] rounded-xl">
          <h3 className="text-xl font-semibold">💬 Popular Ask</h3>
          <p className="text-sm opacity-80 mt-1 mb-3">“How do I optimize my React components?”</p>
          <Link href="/ask" className="text-blue-400 text-sm underline">View Thread</Link>
        </div>
      </div>
    </section>
  );
}
