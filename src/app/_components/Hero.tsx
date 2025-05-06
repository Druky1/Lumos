"use client";
import { MorphingText } from "@/components/magicui/morphing-text";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


const impactTexts = ["convert", "stands out", "drives clicks", "gets results"];

const Hero = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-5 p-4"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-5xl md:text-5xl lg:text-6xl tracking-tight mb-2">
            <span>Create</span>
            <span className="bg-accent-foreground px-4 py-1 text-primary-foreground rounded-xl">
              thumbnails
            </span>
            <span>that</span>
          </div>
          <MorphingText texts={impactTexts} />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button className="cursor-pointer text-sm" asChild>
            <Link href={"/sign-in"}>
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.span>
      </div>
      
    </section>
  );
};

export default Hero;
