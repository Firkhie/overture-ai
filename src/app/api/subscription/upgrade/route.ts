import { auth } from "@clerk/nextjs/server";
import { upgradeSubscription } from "@/lib/subscriptionUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, redirectToSignIn } = await auth();
  const body = await req.json();
  const { plan } = body;
  const newPlan = plan.split(" ")[0].toUpperCase();
  console.log(newPlan, "TEST");
  if (!userId) return redirectToSignIn();
  try {
    await upgradeSubscription(newPlan);
    return new NextResponse("OK");
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
