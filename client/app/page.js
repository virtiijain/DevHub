import Hero from "./components/Hero/Hero";
import Widget from "./components/Hero/Widget";
import Register from "./components/Hero/Register";
import WhyJoin from "./components/Hero/Why";
import Tracks from "./components/Hero/Tracks";
import ScrollVelocity from "./components/Hero/ScrollVelocity";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollVelocity
        texts={["Code. Connect. Collaborate.", "Grow Your Dev Network."]}
        velocity={100}
      />
      <Widget />
      <Tracks />
      <WhyJoin />
      <Register />
    </>
  );
}
