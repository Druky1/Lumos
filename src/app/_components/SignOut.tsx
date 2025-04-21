"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";
import { PiSignOut } from "react-icons/pi";

function SignOut() {
  return (
    <Button
      className="cursor-pointer text-sm flex items-center"
      onClick={() => signOut()}
    >
      <PiSignOut className="h-4 w-4" />
      <span className="hidden md:block">Sign out</span>
    </Button>
  );
}

export default SignOut;
