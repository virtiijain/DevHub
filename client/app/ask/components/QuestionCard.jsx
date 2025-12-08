import { useState } from "react";
import VoteButton from "./VoteButton";
import CommentSection from "./CommentSection";
import TagBadge from "./TagBadge";
import { formatTimeAgo } from "../../../utils/formatTimeAgo";

export default function QuestionCard({ question, vote, addComment }) {
  const [openDiscussion, setOpenDiscussion] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div className="flex-1 space-y-2">
          <h3 className="text-xl md:text-2xl font-semibold">{question.title}</h3>
          <p className="text-white/70 text-sm">
            Asked by <span className="font-medium text-white">{question.user}</span> • {formatTimeAgo(question.createdAt)}
          </p>
          <p className="text-white/90">{question.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {question.tags.map((tag, i) => <TagBadge key={i} tag={tag} />)}
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-start md:items-end gap-3 md:gap-4 mt-3 md:mt-0">
          <VoteButton votes={question.votes} onVote={() => vote(question._id, "up")} />
          <button
            onClick={() => setOpenDiscussion(!openDiscussion)}
            className="text-sm border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium transition"
          >
            {openDiscussion ? "Hide Discussion" : "View Discussion"}
          </button>
        </div>
      </div>

      {openDiscussion && <CommentSection comments={question.comments} addComment={(text) => addComment(question._id, text)} />}
    </div>
  );
}
