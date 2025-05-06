"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUserSubscriptionStatus } from "@/app/actions/generate";
import { useRouter } from "next/navigation";
import { FiCheck } from "react-icons/fi";
import { RoughNotation } from "react-rough-notation";

const freeFeatures = [
  "2 free generations / account",
  "Basic text editing features",
  "Access to 3 free fonts"
];

const premiumFeatures = [
  "Unlimited generations",
  "Advanced text & image editing",
  "Access to all premium fonts",
  "Priority customer support",
];

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSubscription = async () => {
      setIsLoading(true);
      try {
        const status = await getUserSubscriptionStatus();
        if (status.success) {
          setIsPremium(status.isPremium);
        } else {
          
          console.error("Subscription check failed:", status.message);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, []);

  const handleUpgrade = async () => {
    router.push("/payment"); // need to make this
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center py-12 px-4 tracking-tight">
      <div className="absolute top-4 left-4 flex items-center">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Go Back</span>
        </Link>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-8 max-w-6xl">
        <div className="text-center p-2 mt-10">
          <p className="text-lg text-muted-foreground mb-2">One subscription. Unlimited thumbnails.</p>
          <h1 className="text-2xl md:text-3xl mx-auto">
            <RoughNotation type="box" show={true}>
            Choose a plan that works for you
              </RoughNotation>
            </h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
          <Card className="w-full md:w-80 flex flex-col">
            <CardHeader>
              <CardTitle className="flex flex-col justify-items-start space-y-2">
                <h1 className="text-lg md:text-xl">Free</h1>
                <span className="text-2xl md:text-4xl font-bold">$0</span>
                <span className="text-muted-foreground text-sm">Lifetime Access</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="space-y-3 mb-8">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FiCheck   className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                variant={isPremium ? "outline" : "default"} 
                className="w-full" 
                disabled={isLoading || !isPremium}
              >
                {isLoading ? "Loading..." : isPremium ? "Current Plan" : "Current Plan"}
              </Button>
            </CardFooter>
          </Card>
          
          
          <Card className="w-full md:w-80 flex flex-col border-1 border-primary relative">
            <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Recommended</span>
            </div>
            
            <CardHeader>
              <CardTitle className="flex flex-col justify-items-start space-y-2">
                <h1 className="text-lg md:text-xl">Premium</h1>
                <span className="text-2xl md:text-4xl font-bold">$4.99</span>
                <span className="text-muted-foreground text-sm">Monthly</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="space-y-3 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FiCheck  className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={isPremium ? "outline" : "default"} 
                className="w-full cursor-pointer" 
                disabled={isLoading}
                onClick={!isPremium ? handleUpgrade : undefined}
              >
                {isLoading ? "Loading..." : isPremium ? "Current Plan" : "Upgrade"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;