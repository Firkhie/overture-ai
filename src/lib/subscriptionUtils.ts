import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";
import { addMonths } from "date-fns";

export async function checkAndCreateSubscription() {
  const { userId, userSubscription } = await checkSubscription();

  // If no subscription exists, create a new FREE plan
  if (!userSubscription) {
    await createFreePlan(userId);
    return true;
  }

  // Check if the subscription has expired
  const isExpired = userSubscription.endDate!.getTime() <= Date.now();
  if (isExpired) {
    await prismadb.userSubscription.update({
      where: { id: userSubscription.id },
      data: { isActive: false },
    });
    await createFreePlan(userId);
    return true;
  }

  return true;
}

export async function getSubscriptionCredit() {
  const { userSubscription } = await checkSubscription();

  switch (userSubscription?.plan) {
    case "FREE":
      return {
        limit: 5,
        credits: userSubscription.credits,
        plan: userSubscription.plan,
      };
    case "PRO":
      return {
        limit: 50,
        credits: userSubscription.credits,
        plan: userSubscription.plan,
      };
    case "UNLIMITED":
      return {
        limit: 0,
        credits: 0,
        plan: userSubscription.plan,
      };
    default:
      return {
        limit: 5,
        credits: 0,
        plan: "FREE",
      };
  }
}

export async function executeFeature() {
  const { userSubscription } = await checkSubscription();

  if (!userSubscription) return false;

  // Handle Unlimited Plan
  if (userSubscription.plan === "UNLIMITED") return true;
  console.log("OK");
  // Handle Free or Pro Plans
  if (userSubscription.credits >= 1) {
    await prismadb.userSubscription.update({
      where: { id: userSubscription.id },
      data: {
        credits: userSubscription.credits - 1,
      },
    });
    return true;
  }
  console.log("OK1");
  // Insufficient Credits
  return false;
}

export async function upgradeSubscription(
  newPlan: "FREE" | "PRO" | "UNLIMITED",
) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userSubscription = await prismadb.userSubscription.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
  });

  // Deactivate current subscription if any
  if (userSubscription) {
    await prismadb.userSubscription.update({
      where: { id: userSubscription.id },
      data: { isActive: false },
    });
  }

  // Determine credits and duration for the new plan
  const credits = newPlan === "FREE" ? 5 : newPlan === "PRO" ? 50 : 0;
  console.log(userId, newPlan, credits, addMonths(new Date(), 1), "HERE");
  // Create the new subscription
  try {
    await prismadb.userSubscription.create({
      data: {
        userId: userId,
        plan: newPlan,
        credits: credits,
        isActive: true,
        endDate: addMonths(new Date(), 1),
      },
    });
  } catch (error) {
    console.log(error);
  }
  console.log("HERE2");
}

async function checkSubscription() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userSubscription = await prismadb.userSubscription.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
  });

  return { userId, userSubscription };
}

async function createFreePlan(userId: string) {
  await prismadb.userSubscription.create({
    data: {
      userId: userId,
      plan: "FREE",
      credits: 5,
      isActive: true,
      endDate: addMonths(new Date(), 1),
    },
  });
}
