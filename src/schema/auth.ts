import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .email("Please enter a valid email address")
    .min(1, { message: "Email is required!" }),
  password: z
    .string({
      required_error: "Password is required!",
    })
    .min(6, {
      message: "Password must be at least 6 characters long!",
    }),
});
