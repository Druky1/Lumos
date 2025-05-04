"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Check if user has enough credits
export const checkCredits = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return { success: false, message: "Not authenticated" };
    
    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        credits: true
      }
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { 
      success: true, 
      credits: user.credits,
      message: "Credits checked successfully" 
    };
  } catch (error) {
    console.error("Error checking credits:", error);
    return { success: false, message: "Failed to check credits" };
  }
}

export const creditDeduction = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return { success: false, message: "Not authenticated" };
    
    // First check if the user has enough credits
    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        credits: true
      }
    });

    if (!user || user.credits < 1) {
      return { 
        success: false, 
        credits: user?.credits || 0,
        message: "Not enough credits" 
      };
    }
    
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id
      },
      data: {
        credits: {
          decrement: 1
        }
      },
      select: {
        credits: true
      }
    });
    
    return { 
      success: true, 
      credits: updatedUser.credits,
      message: "Credit deducted successfully" 
    };
  } catch (error) {
    console.error("Error deducting credits:", error);
    return { success: false, message: "Failed to deduct credits" };
  }
}

export const revalidate = async () => {
  revalidatePath("/dashboard");
}

export const getUserSubscriptionStatus = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { 
        success: false, 
        isPremium: false, 
        message: "Not authenticated" 
      };
    }
    
    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        credits: true
      }
    });

    if (!user) {
      return { 
        success: false, 
        isPremium: false, 
        message: "User not found" 
      };
    }

    // User is premium if they have more than 2 credits
    const isPremium = user.credits > 2;
    
    return {
      success: true,
      isPremium,
      credits: user.credits,
      message: "Subscription status retrieved successfully"
    };
  } catch (error) {
    console.error("Error getting subscription status:", error);
    return { 
      success: false, 
      isPremium: false, 
      message: "Failed to check subscription status" 
    };
  }
};