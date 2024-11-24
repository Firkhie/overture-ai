import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";
import { addMonths } from "date-fns";

export async function checkAndCreateSubscription() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userSubscription = await prismadb.userSubscription.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
  });

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

export async function executeFeature(featureCost: number) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userSubscription = await prismadb.userSubscription.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
  });

  if (!userSubscription) return false;

  // Handle Unlimited Plan
  if (userSubscription.plan === "UNLIMITED") return true;

  // Handle Free or Pro Plans
  if (userSubscription.credits >= featureCost) {
    await prismadb.userSubscription.update({
      where: { id: userSubscription.id },
      data: {
        credits: userSubscription.credits - featureCost,
      },
    });
    return true;
  }

  // Insufficient Credits
  return false;
}

// export async function upgradeSubscription(newPlan: "PRO" | "UNLIMITED") {
//   const { userId, redirectToSignIn } = await auth();

//   if (!userId) return redirectToSignIn();

//   const userSubscription = await prismadb.userSubscription.findFirst({
//     where: {
//       userId: userId,
//       isActive: true,
//     },
//   });

//   // Deactivate current subscription if any
//   if (userSubscription) {
//     await prismadb.userSubscription.update({
//       where: { id: userSubscription.id },
//       data: { isActive: false },
//     });
//   }

//   // Determine credits and duration for the new plan
//   const credits = newPlan === "PRO" ? 50 : null; // Unlimited has no credits
//   const endDate = newPlan === "PRO" ? addMonths(new Date(), 1) : null;

//   // Create the new subscription
//   await prismadb.userSubscription.create({
//     data: {
//       userId: userId,
//       plan: newPlan,
//       credits: credits,
//       isActive: true,
//       endDate: endDate,
//     },
//   });
// }
