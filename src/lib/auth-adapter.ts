import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const customAdapter = {
  ...PrismaAdapter(prisma),
  createUser: async (data : any) => {
    try {
      return await prisma.user.create({
        data: {
          ...data,
          password: null, // Force null for all OAuth users
          emailVerified: data.emailVerified || null,
        },
      });
    } catch (error) {
      console.error("User creation error:", error);
      throw error;
    }
  },
};