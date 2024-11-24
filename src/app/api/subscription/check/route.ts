import { auth } from "@clerk/nextjs/server";
import { checkAndCreateSubscription } from "@/lib/subscriptionUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  try {
    await checkAndCreateSubscription();
    return new NextResponse("OK");
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
