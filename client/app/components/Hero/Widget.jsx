export default function Widget() {
  return (
    <div className="min-h-screen p-6 py-30 flex flex-col gap-10">
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto">
        <div className="border border-white/20 rounded-[40px] p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-semibold">Top Developers</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              Discover the developers shaping the DevHub community — building in
              public, sharing projects, and leveling up skills every day.
            </p>
          </div>
        </div>

        <div className="border border-white/20 rounded-[40px] p-8">
          <h2 className="text-4xl font-semibold">Tech Stack</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            See what tools and frameworks our community uses — from modern
            frontend libraries and backend APIs to cloud solutions and
            AI-powered tech.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-[#E5E5E5] text-black rounded-[40px] p-10">
        <h2 className="text-4xl font-semibold">Collaborate & Grow</h2>
        <p className="mt-4 text-lg leading-relaxed text-black/80">
          Connect with developers, ask questions, get feedback, and work on
          exciting projects together. Share your journey, learn, and grow within
          DevHub.
        </p>
      </div>
    </div>
  );
}
