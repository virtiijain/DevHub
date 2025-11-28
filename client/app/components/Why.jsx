import React from "react";

export default function WhyAttend() {
  const items = [
    {
      title: "LEARN FROM THE COMMUNITY",
      number: "01",
      text: "Discover real-world dev strategies, tips, and workflows shared by experienced developers actively building in public.",
    },
    {
      title: "BUILD IN PUBLIC",
      number: "02",
      text: "Showcase your projects, get feedback, and iterate faster by sharing your code and progress with the community.",
    },
    {
      title: "ASK & COLLABORATE",
      number: "03",
      text: "Connect with peers, ask questions, and solve problems together — from debugging to design advice, the community has your back.",
    },
    {
      title: "SHOWCASE YOUR PROFILE",
      number: "04",
      text: "Highlight your skills, projects, and learning journey. Make your profile a true reflection of your dev identity and growth.",
    },
  ];

  return (
    <div className="min-h-screen px-6 md:px-16 py-16 flex flex-col gap-14">
      <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto w-full gap-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          WHY DEVHUB?
        </h1>
        <p className="max-w-sm text-lg opacity-90">
          DevHub is the space where developers learn, build in public, ask
          questions, collaborate, and showcase their journey — all in one
          community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-black text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden flex flex-col gap-6"
          >
            <h3 className="text-sm md:text-base tracking-widest font-semibold opacity-90">
              {item.title}
            </h3>
            <p className="max-w-xs text-sm md:text-base opacity-80">
              {item.text}
            </p>
            <span className="absolute bottom-4 right-6 text-[120px] md:text-[180px] font-bold text-[#1A4BFF] opacity-40 leading-none select-none">
              {item.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
