import { NextResponse } from "next/server";
import Replicate from "replicate";

import { streamToBuffer } from "@/lib/streamUtils";
import { executeFeature } from "@/lib/subscriptionUtils";

const replicate = new Replicate({
  auth: process.env["REPLICATE_API_TOKEN"],
});

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, userSubscription } = body;

  if (!process.env["REPLICATE_API_TOKEN"]) {
    return new Response("Replicate API key not configured", { status: 500 });
  }

  if (!messages) {
    return new Response("Messages are required", { status: 400 });
  }

  try {
    const model = "bytedance/seedance-1-pro";
    const input = {
      prompt: messages,
      duration: 5,
      resolution: "480p",
      aspect_ratio: "16:9",
      fps: 24,
    };
    const check = await executeFeature(userSubscription);
    if (check) {
      const output = (await replicate.run(model, { input })) as ReadableStream;
      const buffer = await streamToBuffer(output);
      const videoBase64 = buffer.toString("base64");

      return NextResponse.json({
        videoBase64: `data:video/mp4;base64,${videoBase64}`,
      });
    } else {
      return new NextResponse("NOT_OK", { status: 403 });
    }
  } catch (error) {
    console.error("[VIDEO_ROUTE] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
