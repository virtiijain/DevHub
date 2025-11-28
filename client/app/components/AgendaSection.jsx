import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function AgendaSection() {
  const agenda = [
    {
      day: "Track 1",
      title: "Build in Public",
      text: "Share your projects, progress, wins, and fails in real-time. Get eyes on your build, learn from others, and grow faster by showing your work instead of hiding it.",
    },
    {
      day: "Track 2",
      title: "Ask a Dev",
      text: "Stuck on a bug? Need feedback on your UI? Want advice from seniors? This track is all about devs helping devs — fast answers, real talk, no ego, pure community energy.",
    },
    {
      day: "Track 3",
      title: "Your Dev Profile",
      text: "Showcase your skills, tech stack, projects, and learning journey. Build a profile that feels like your dev identity — clean, honest, and everything recruiters wish LinkedIn actually was.",
    },
  ];

  return (
    <div className="min-h-screen px-6 md:px-16 py-16 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto w-full gap-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          DEVHUB TRACKS
        </h1>
        <p className="max-w-sm text-lg opacity-90 text-right">
          Explore the core features of DevHub:
          <br />
          Build in Public • Ask a Dev • Create Your Profile
        </p>
      </div>

      <div className="bg-black text-white rounded-[40px] p-8 md:p-16 max-w-7xl mx-auto w-full relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16">
          {agenda.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-semibold">{item.day}</h3>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {item.title}
              </h2>
              <p className="text-sm md:text-base opacity-80 max-w-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-52 h-52 md:w-72 md:h-72 opacity-40">
          <Image
            src="/images/img2.png"
            alt="shape"
            fill
            className="object-contain translate-y-10"
          />
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0A37FF] to-[#041B80] text-white text-lg flex items-center gap-2 hover:opacity-90 transition">
            Explore All Tracks <ArrowUpRight />
          </button>
        </div>
      </div>
    </div>
  );
}
