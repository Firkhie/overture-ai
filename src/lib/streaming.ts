import { RawMessageStreamEvent } from "@anthropic-ai/sdk/resources/messages.mjs";
import { Stream } from "@anthropic-ai/sdk/streaming.mjs";

export function createReadableStream(generator: Stream<RawMessageStreamEvent>) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for await (let chunk of generator) {
        if (chunk.type === "content_block_delta" && "text" in chunk.delta) {
          const chunkData = encoder.encode(chunk.delta.text);
          controller.enqueue(chunkData);
        }
      }
      controller.close();
    },
  });
}
