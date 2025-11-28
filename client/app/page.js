import Hero from "./components/Hero";
import Conference from "./components/Conference";
import RegisterSection from "./components/RegisterSection";
import WhyJoin from "./components/Why";
import AgendaSection from "./components/AgendaSection";
import ScrollVelocity from "./components/ScrollVelocity";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollVelocity
        texts={["Code. Share. Grow.", "Network With Developers"]}
        velocity={100}
      />
      <Conference />
      <AgendaSection />
      <WhyJoin />
      <RegisterSection />
    </>
  );
}
