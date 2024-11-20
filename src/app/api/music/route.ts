import { NextResponse } from "next/server";
import Replicate from "replicate";
import { streamToBuffer } from "@/lib/streamUtils";

const replicate = new Replicate({
  auth: process.env["REPLICATE_API_TOKEN"],
});

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  if (
    !process.env["REPLICATE_API_TOKEN"] ||
    !process.env["ANTHROPIC_API_KEY"]
  ) {
    return new Response("API key not configured", { status: 500 });
  }

  if (!messages) {
    return new Response("Messages are required", { status: 400 });
  }

  try {
    const model =
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb";
    const input = {
      prompt: messages,
      duration: 5,
      temperature: 1,
      top_k: 250,
      top_p: 0,
      model_version: "stereo-large",
      output_format: "mp3",
      continuation: false,
      continuation_start: 0,
      multi_band_diffusion: false,
      normalization_strategy: "peak",
      classifier_free_guidance: 3,
    };

    const output = (await replicate.run(model, { input })) as ReadableStream;
    const buffer = await streamToBuffer(output);
    const audioBase64 = buffer.toString("base64");

    return NextResponse.json({
      audioBase64: `data:audio/mp3;base64,${audioBase64}`,
    });
  } catch (error) {
    console.error("[MUSIC_ROUTE] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}