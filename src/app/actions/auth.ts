"use server";

import db from "@/lib/prisma";
import { signInSchema } from "@/schema/auth";
import bcrypt from "bcryptjs";

export const signup = async (email: string, password: string) => {
  try {
    // Validation
    const isValid = signInSchema.safeParse({ email, password });
    if (!isValid.success) {
      console.error("Validation error:", isValid.error.errors);
      return { error: "Invalid input!" };
    }

    // Check if user already exists
    const user = await db.user.findUnique({
      where: {
        email: isValid.data.email,
      },
    });

    if (user) {
      return { error: "User already exists!" };
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(isValid.data.password, 10);

    // Create a stripe user?

    // Create a user in the database
    await db.user.create({
      data: {
        email: isValid.data.email,
        password: hashedPassword,
      },
    });
    
    return { success: true };

  } catch (error) {
    console.error("Error signing up:", error);
    return { error: "An error occurred while signing up." };
  }
};
