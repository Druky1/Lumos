// lib/auth-adapter.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./prisma";

type UserData = {
  email: string;
  name: string;
  image: string | null;
  emailVerified: Date | null;
  password: string | null;
};

export const getCustomAdapter = () => {
  return {
    ...PrismaAdapter(db),
    createUser: async (data: UserData) => {
      try {
        return await db.user.create({
          data: {
            ...data,
            password: null,
            emailVerified: data.emailVerified ?? null,
          },
        });
      } catch (error) {
        console.error("User creation error:", error);
        throw error;
      }
    },
  };
};
