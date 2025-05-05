import Credits from "@/app/_components/Credits";
import { ModeToggle } from "@/app/_components/ModeToggle";
import SignOut from "@/app/_components/SignOut";
import { Button } from "@/components/ui/button";
import { GrGallery } from "react-icons/gr";
import { HiOutlineSparkles } from "react-icons/hi2";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-6">
      <div>
        <Link
          href="/"
          className="text-3xl font-instrument-serif tracking-tight"
        >
          Lumos
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Credits />
        <Link href={"/dashboard/thumbnails"}>
          <Button className="cursor-pointer text-sm">
            Your Gallery
            <GrGallery className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/pricing">
          <Button className="cursor-pointer text-sm">
            Upgrade <HiOutlineSparkles className="h-4 w4"></HiOutlineSparkles>
          </Button>
        </Link>
        <SignOut />
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
