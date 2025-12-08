"use client";
import { useState, useEffect } from "react";
import QuestionList from "./components/QuestionList";
import AskQuestionModal from "./components/AskQuestionModal";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const socket = io(API_BASE);

export default function AskADev() {
  const { user } = useUser();
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/questions`)
      .then((res) => res.json())
      .then(setQuestions)
      .catch(() => toast.error("Failed to fetch questions"));

    socket.on("newQuestion", (q) => setQuestions((prev) => [q, ...prev]));
    socket.on("newComment", (updatedQ) =>
      setQuestions((prev) =>
        prev.map((q) => (q._id === updatedQ._id ? updatedQ : q))
      )
    );
    socket.on("voteUpdate", (updatedQ) =>
      setQuestions((prev) =>
        prev.map((q) => (q._id === updatedQ._id ? updatedQ : q))
      )
    );
    return () => {
      socket.off("newQuestion");
      socket.off("newComment");
      socket.off("voteUpdate");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0147FF] px-4 py-10 text-white">
      <QuestionList questions={questions} setQuestions={setQuestions} />
      <button
        onClick={() => !user ? toast.error("Please login!") : setOpenModal(true)}
        className="fixed border rounded py-2 px-3 cursor-pointer bottom-8 right-8 ..."
      >
        Ask Question
      </button>
      {openModal && <AskQuestionModal setOpenModal={setOpenModal} setQuestions={setQuestions} />}
    </div>
  );
}
