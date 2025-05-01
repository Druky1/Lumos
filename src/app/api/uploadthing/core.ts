import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/prisma";


const f = createUploadthing();

export const auth = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  return { id: session.user.id }; 
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    
    .middleware(async ({ req }) => {
      
      const userId = await auth(req);
           
      if (!userId) throw new UploadThingError("Unauthorized");

      const user = await db.user.findUnique({
        where: {
          id: userId.id,
        },
        select: {
          credits: true,
        },
      })
      if(!user?.credits) throw new Error("You don't have enough credits to upload a thumbnail!");

      await db.user.update({
        where: {
          id: userId.id,
        },
        data: {
          credits: {
            decrement: 1},
        },
      })
      return { userId: userId.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      // You can store the file in your database, save it to your cloud storage, etc.
      await db.thumbnail.create({
        data: {
          userId: metadata.userId,
          url: file.ufsUrl,
          name: file.name,
          key: file.key,
        }
      })

      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
