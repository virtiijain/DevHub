import QuestionCard from "./QuestionCard";

export default function QuestionList({ questions, setQuestions, vote, addComment }) {
  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <QuestionCard key={q._id} question={q} vote={vote} addComment={addComment} />
      ))}
    </div>
  );
}
