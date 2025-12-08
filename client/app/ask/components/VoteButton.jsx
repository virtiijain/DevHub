import { FaThumbsUp } from "react-icons/fa";

export default function VoteButton({ votes, onVote }) {
  return (
    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition">
      <button onClick={onVote} className="flex items-center justify-center text-white hover:text-blue-300 transition">
        <FaThumbsUp size={18} />
      </button>
      <span className="font-semibold text-white">{votes}</span>
    </div>
  );
}
