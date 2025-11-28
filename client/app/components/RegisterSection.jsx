import React from "react";
import Image from "next/image";

export default function RegisterSection() {
  return (
    <div className="min-h-screen px-6 md:px-16 py-10 md:py-20 flex flex-col gap-16">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold leading-tight">
          JOIN
          <br />
          DEVHUB
        </h1>

        <p className="max-w-sm text-lg mt-6 md:mt-0 opacity-90">
          Create your profile, share your projects, ask questions, and connect
          with other developers worldwide.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto bg-black text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden">
        <p className="text-center text-sm md:text-base opacity-70 mb-6">
          Start building in public today:
        </p>

        <div className="flex justify-center items-end gap-4 md:gap-10">
          <span className="text-6xl md:text-8xl font-semibold">Sign</span>
          <span className="text-6xl md:text-8xl font-semibold">Up</span>
          <span className="text-6xl md:text-8xl font-semibold">Now</span>
        </div>

        <div className="flex justify-center gap-12 md:gap-32 text-xs md:text-sm tracking-widest mt-4 opacity-70">
          <span>Create</span>
          <span>Share</span>
          <span>Connect</span>
        </div>

        <Image
          src="/images/img3.png"
          alt="shape"
          width={288}
          height={288}
          className="absolute bottom-0 right-0 object-contain translate-y-8 translate-x-9"
        />
      </div>
    </div>
  );
}
