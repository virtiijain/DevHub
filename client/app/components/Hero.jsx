"use client";
import Button from "./Button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex justify-center px-4 py-2 sm:px-6 lg:px-8">
      <div className="relative bg-[#1A1A1A] p-8 sm:p-12 lg:p-20 rounded-3xl max-w-4xl lg:max-w-7xl overflow-hidden">
        <div className="relative z-20">
          <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-8 text-center sm:text-left">
            <p className="text-sm sm:text-base">DEV COMMUNITY HUB</p>
            <p className="text-sm sm:text-base">Share | Challenge | Learn</p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold leading-tight text-center sm:text-left">
            DEVHUB <br className="hidden sm:block" /> FOR DEVELOPERS
          </h1>

          <p className="text-sm sm:text-base lg:text-lg mb-6 tracking-normal text-center sm:text-left">
            Share tech memes, participate in coding challenges, and get answers from experienced developers. <br />
            Track your progress, earn badges, and join a fun, interactive developer community.
          </p>

          <div className="flex justify-center sm:justify-start">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#0147FF] to-[#0149ff53] rounded-3xl text-white hover:opacity-90"
            >
              Join DevHub
            </Button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 right-6 sm:right-8 lg:right-12"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <Image
            src="/images/img1.png"
            alt="devhub banner"
            width={150}
            height={150}
            className="w-32 sm:w-44 lg:w-56 opacity-90"
          />
        </motion.div>
      </div>
    </section>
  );
}
