import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

import { createReadableStream } from "@/lib/streamUtils";
import { executeFeature } from "@/lib/subscriptionUtils";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, userSubscription } = body;

  if (!process.env["ANTHROPIC_API_KEY"]) {
    return new Response("Anthropic API key not configured", { status: 500 });
  }

  if (!messages) {
    return new Response("Messages are required", { status: 400 });
  }

  try {
    const check = await executeFeature(userSubscription);
    if (check) {
      const streamingResponse = await client.messages.create({
        max_tokens: 1024,
        messages: [messages],
        system:
          "You are a code generator. You must always respond only with markdown code snippets, even for general queries. Do not respond in plain text under any circumstances. Use code comments for the code explanations.",
        model: "claude-3-5-haiku-latest",
        stream: true,
      });

      const readableStream = createReadableStream(streamingResponse);

      return new NextResponse(readableStream, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new NextResponse("NOT_OK", { status: 403 });
    }
  } catch (error) {
    console.error("[CODE_ROUTE] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
