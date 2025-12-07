"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../utils/api";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleSignup = async () => {
    const res = await signup({ username, email, password });
    if (res.user) {
      localStorage.setItem("hasSignedUp", "true");
      localStorage.setItem("token", res.token);
      setUser(res.user);
      toast.success("Signed up successfully!");
      router.push("/profile");
    } else {
      toast.error(res.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0147FF] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white/95 shadow-2xl rounded-3xl p-8 sm:p-10 md:p-12 w-full max-w-md backdrop-blur-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#0147FF] mb-6">
          Sign Up to DevHub
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="p-4 border border-gray-300 rounded-2xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#0147FF] text-gray-700 placeholder-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-4 border border-gray-300 rounded-2xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#0147FF] text-gray-700 placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 border border-gray-300 rounded-2xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#0147FF] text-gray-700 placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full py-4 cursor-pointer bg-gradient-to-r from-[#0147FF] to-[#0149FF80] text-white rounded-2xl font-semibold shadow-lg hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-800 mt-6">
          Already have an account?{" "}
          <span
            className="text-[#0147FF] cursor-pointer font-semibold hover:underline"
            onClick={() => router.push("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
