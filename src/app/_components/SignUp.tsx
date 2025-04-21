"use client";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schema/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signup } from "../actions/auth";
import { useRouter } from "next/navigation";

type SignInFormValues = z.infer<typeof signInSchema>;

const SignUp = () => {
  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  const router = useRouter();

  const onSubmit = async (data: SignInFormValues) => {
    const response = await signup(data.email, data.password);

    if (response?.error) {
      toast.error("Sign up failed!", {
        description: response.error,
      });
    } else if (response?.success) {
      toast.success("Signed up successfully!");
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 w-full max-w-sm md:max-w-md lg:max-w-lg px-4">
        <Link
          href={"/"}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Go Back</span>
        </Link>

        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl my-3 font-instrument-serif">
              Sign Up
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Create an account to get started
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4 px-6">
              <motion.button
                type="button" // Important to prevent form submission
                whileHover={{ y: -2 }}
                whileTap={{ y: 2 }}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-medium rounded-lg shadow-sm text-sm font-medium text-primary bg-secondary hover:bg-gray-light transition-colors disabled:opacity-50 gap-2 cursor-pointer"
                onClick={() => handleOAuthSignIn("google")}
              >
                <FcGoogle className="w-4 h-4" />
                <span>Continue with Google</span>
              </motion.button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-6 flex flex-col gap-4 mt-4">
              <motion.button
                type="submit"
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  y: 1,
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-medium rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-light transition-colors disabled:opacity-50 gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Continue with email
              </motion.button>
              <div>
                <span className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href={"/sign-in"}
                    className="text-primary hover:underline hover:underline-offset-4 hover:decoration-1"
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default SignUp;
