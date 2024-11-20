import { NextResponse } from "next/server";
import Replicate from "replicate";
import { streamToBuffer } from "@/lib/streamUtils";

const replicate = new Replicate({
  auth: process.env["REPLICATE_API_TOKEN"],
});

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  if (!process.env["REPLICATE_API_TOKEN"]) {
    return new Response("API key not configured", { status: 500 });
  }

  if (!messages) {
    return new Response("Messages are required", { status: 400 });
  }

  try {
    const model =
      "lucataco/hotshot-xl:78b3a6257e16e4b241245d65c8b2b81ea2e1ff7ed4c55306b511509ddbfd327a";
    const input = {
      mp4: true,
      seed: 6226,
      steps: 90,
      width: 672,
      height: 384,
      prompt: messages,
      scheduler: "EulerAncestralDiscreteScheduler",
      negative_prompt: "blurry",
    };

    const output = (await replicate.run(model, { input })) as ReadableStream;
    const buffer = await streamToBuffer(output);
    const videoBase64 = buffer.toString("base64");

    return NextResponse.json({
      videoBase64: `data:video/mp4;base64,${videoBase64}`,
    });
  } catch (error) {
    console.error("[VIDEO_ROUTE] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}