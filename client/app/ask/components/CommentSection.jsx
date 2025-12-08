import { useState } from "react";

export default function CommentSection({ comments, addComment }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(text);
    setText("");
  };

  return (
    <div className="mt-4 bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/20 space-y-3">
      {comments.length === 0 && <p className="text-white/70">No comments yet</p>}
      {comments.map((c, i) => (
        <div key={i} className="bg-black/50 p-3 rounded hover:bg-black/40 transition">
          <p className="text-white">{c.text}</p>
          <p className="text-sm text-white/70 mt-1">— {c.user}</p>
        </div>
      ))}
      <form className="flex flex-col sm:flex-row gap-2 mt-3 w-full" onSubmit={handleSubmit}>
        <input
          placeholder="Write a comment..."
          className="flex-1 w-full sm:w-auto border border-white/30 text-white px-3 py-2 rounded placeholder:text-white/60 focus:ring-2 focus:ring-[#00CFFF] bg-white/10"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-gradient-to-tr from-[#0178FF] to-[#00CFFF] text-white px-4 py-2 rounded transition hover:scale-105 w-full sm:w-auto">
          Comment
        </button>
      </form>
    </div>
  );
}
