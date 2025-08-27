import { NextResponse } from "next/server";
import { pingSubscription } from "@/lib/subscriptionUtils";

export async function GET() {
  try {
    await pingSubscription();
    return NextResponse.json({ status: "pinged" });
  } catch (error) {
    console.error("[PING_ROUTE] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
