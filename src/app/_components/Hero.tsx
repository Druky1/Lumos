"use client";
import { MorphingText } from "@/components/magicui/morphing-text";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";

const impactTexts = ["convert", "stands out", "drives clicks", "gets results"];

const Hero = () => {
  const { theme } = useTheme();
  
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-white/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display ">
              <span>Create </span>
              <motion.span
                className="relative py-2 text-accent-foreground rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                }}
              > 
              <RoughNotation type="box" show={true} color={theme === "dark" ? "#fff" : "#000"} animationDuration={2000} strokeWidth={2}>
                thumbnails
                </RoughNotation>
              </motion.span>
              <span> that</span>
            </h1>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-display text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <MorphingText texts={impactTexts} />
            </motion.h2>
          </motion.div>

          <motion.p
            className="max-w-2xl text-md md:text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Create stunning thumbnails that convert clicks into customers. Our AI-powered tool helps you design eye-catching thumbnails that stand out in any feed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link href={"/sign-in"} >
              <Button className="text-md font-medium group cursor-pointer">
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
