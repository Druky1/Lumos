"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const HomeBar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex w-full items-center justify-between px-10 py-6 sticky top-0 z-50 bg-background/70 backdrop-blur-sm border-b border-border"
    >
      <Link
        href="/"
        className="text-3xl font-instrument-serif tracking-tight"
      >
        Lumos
      </Link>
      <div className="flex items-center gap-4">
        <Button className="cursor-pointer text-sm" asChild>
          <Link href={"/sign-in"}>Get Started</Link>
        </Button>
        <Link href={"https://github.com/Druky1/Lumos"}>
          <Button variant="outline" size="icon" className="cursor-pointer">
            <FaGithub className="h-4 w-4" />
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </motion.nav>
  );
};

export default HomeBar;
