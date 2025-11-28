export default function DevHubUI() {
  return (
    <div className="min-h-screen p-6 py-30 flex flex-col gap-10">
      
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto">
        <div className="border border-white/20 rounded-[40px] p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-semibold">Top Devs</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              Explore profiles of developers building in public, sharing their projects, and leveling up skills while inspiring the DevHub community.
            </p>
          </div>
        </div>

        <div className="border border-white/20 rounded-[40px] p-8">
          <h2 className="text-4xl font-semibold">Technologies</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Discover the tools and frameworks DevHub developers use to build faster and smarter — from modern frontend libraries and backend APIs to cloud platforms and AI-powered solutions.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-[#E5E5E5] text-black rounded-[40px] p-10">
        <h2 className="text-4xl font-semibold">Community & Collaboration</h2>
        <p className="mt-4 text-lg leading-relaxed text-black/80">
          Ask questions, get feedback, and collaborate with other developers. Build meaningful projects together, share your journey, and grow within the DevHub community.
        </p>
      </div>
    </div>
  );
}
