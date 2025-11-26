"use client";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    { title: "Memes", desc: "Laugh through the debugging pain." },
    { title: "Challenges", desc: "Daily tasks to level up your dev skills." },
    { title: "Ask a Dev", desc: "Get help from other devs instantly." },
    { title: "Profiles", desc: "Showcase your dev journey." },
  ];

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">✨ What DevHub Offers</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-[#1a1a1a] rounded-xl text-center cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="opacity-70 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
