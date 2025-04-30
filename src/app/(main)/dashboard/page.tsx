import { authOptions } from "@/lib/auth";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import Thumbnail from "../components/Thumbnail";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function Dashboard() {
  const serverSession = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: {
      id: serverSession?.user.id,
    },
    select: {
      credits: true,
    },
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center md:max-w-7xl mx-auto px-4 py-6 mt-12">
      <div className="w-full">
        {user?.credits ? (
          <div className="w-full">
            {/* The Thumbnail component will handle showing/hiding content */}
            <Thumbnail 
              userName={serverSession?.user.name ? serverSession.user.name : "Guest"}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 max-w-2xl mt-24 text-center mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-instrument-serif tracking-tight">
              Oops! You're out of credits!
            </h1>
            <span className="text-sm text-muted-foreground">
              Please purchase more credits to continue creating captivating
              thumbnails.
            </span>
            <Button asChild>
              <Link href={"/pricing"} className="cursor-pointer text-sm">
                Upgrade
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;