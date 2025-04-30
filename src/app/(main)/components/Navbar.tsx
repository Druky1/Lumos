import Credits from "@/app/_components/Credits";
import { ModeToggle } from "@/app/_components/ModeToggle";
import SignOut from "@/app/_components/SignOut";
import { Button } from "@/components/ui/button";
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
        <Credits/>
        <Link href="/pricing">
          <Button className="cursor-pointer text-sm">
            Upgrade
          </Button>
        </Link>
        <SignOut/>
        <ModeToggle/>
      </div>
    </nav>
  );
}

export default Navbar;
