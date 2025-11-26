// components/MiniTools.jsx
export default function MiniTools() {
  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🛠️ Daily Dev Goodies</h2>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#181818] rounded-xl">
          <h3 className="font-semibold mb-2">💡 Daily Tip</h3>
          <p className="text-sm opacity-80">
            Always keep components small — one purpose = clean code.
          </p>
        </div>

        <div className="p-6 bg-[#181818] rounded-xl">
          <h3 className="font-semibold mb-2">🧠 Tech Quote</h3>
          <p className="text-sm opacity-80">
            “First, solve the problem. Then, write the code.” – John Johnson
          </p>
        </div>

        <div className="p-6 bg-[#181818] rounded-xl">
          <h3 className="font-semibold mb-2">🤓 Fun Fact</h3>
          <p className="text-sm opacity-80">
            The first computer bug was literally a moth.
          </p>
        </div>
      </div>
    </section>
  );
}
