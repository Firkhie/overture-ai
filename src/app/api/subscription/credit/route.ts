import { auth } from "@clerk/nextjs/server";
import { getSubscriptionCredit } from "@/lib/subscriptionUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  try {
    const response = await getSubscriptionCredit();
    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
