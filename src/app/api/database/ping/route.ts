import { NextResponse } from "next/server";
import { pingSubscription } from "@/lib/subscriptionUtils";

export async function GET() {
  try {
    const count = await pingSubscription();
    return NextResponse.json({ status: "pinged", count });
  } catch (error) {
    console.error("[PING_ROUTE] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
