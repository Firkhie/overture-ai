"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { Music, Copy, SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Heading from "@/components/heading";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

type MessageParam = {
  role: "user" | "assistant";
  content: string | { header: string; videoBase64: string };
};

const getRandomHeader = () =>
  headerVariations[Math.floor(Math.random() * headerVariations.length)];

const headerVariations = [
  "Experience the melody created from your prompt. Let the music inspire you!",
  "Your musical composition is ready! Enjoy the sound created from your input.",
  "We've turned your idea into a beautiful track. Check out the music below!",
  "Here’s a unique sound based on your prompt. Dive into the music we've generated for you.",
  "Your music creation is here! Listen to the melody we've crafted based on your input.",
];

// Type guard to check if message.content is the object with videoBase64
const isAudioMessage = (
  content: string | { header: string; videoBase64: string },
): content is { header: string; videoBase64: string } => {
  return (
    (content as { header: string; videoBase64: string }).videoBase64 !==
    undefined
  );
};

export default function VideoPage() {
  const [messages, setMessages] = useState<MessageParam[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const endMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedMessages = sessionStorage.getItem("videoMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("videoMessages", JSON.stringify(messages));
    }
    endMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Prompt is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const userMessage: MessageParam = { role: "user", content: values.prompt };
    setMessages((currentMessages) => [...currentMessages, userMessage]);

    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: values.prompt }),
      });

      const data = (await response.json()) as { videoBase64: string };

      const assistantMessage: MessageParam = {
        role: "assistant",
        content: {
          header: getRandomHeader(),
          videoBase64: data.videoBase64,
        },
      };
      setMessages((currentMessages) => [...currentMessages, assistantMessage]);
    } catch (error) {
      console.error("Error in onSubmit:", error);
    } finally {
      setIsLoading(false);
      form.reset();
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Heading
        title="Music Generation"
        description="Experience our most sophisticated code generation model"
        icon={Music}
      />
      <div className="h-full flex-1 overflow-y-auto rounded-t-lg border border-[#593a8b] bg-white p-4 scrollbar-hide">
        <div className="h-full space-y-3">
          {messages.length == 0 && !isLoading && (
            <Empty description="No conversation started." />
          )}
          {messages.map((message) => (
            <div
              key={String(message.content)}
              className={cn(
                "flex gap-x-3 rounded-lg p-5",
                message.role === "user"
                  ? "border border-black/10 bg-white"
                  : "bg-muted",
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <div className="flex w-full flex-col gap-y-[6px]">
                <p className="font-semibold leading-none">
                  {message.role === "user" ? "Firdig Alfalakhi" : "OvertureAI"}
                </p>
                {message.role === "user" ? (
                  <p className="text-[15px]">{String(message.content)}</p>
                ) : (
                  <>
                    <p>
                      {typeof message.content !== "string" &&
                        message.content.header}
                    </p>
                    {isAudioMessage(message.content) && (
                      <video
                        controls
                        className="mt-2 w-full rounded-lg border border-black"
                      >
                        <source
                          src={message.content.videoBase64}
                          type="video/mp4"
                        />
                        Your browser does not support the audio element.
                      </video>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
          {isLoading && <Loader />}
          <div ref={endMessageRef} />
        </div>
      </div>
      <div className="space-y-2 border-l border-r border-[#593a8b] bg-white p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-14 items-center justify-between rounded-xl border-2 border-[#593a8b] px-4"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl className="m-0 p-0">
                    <Input
                      {...field}
                      ref={inputRef}
                      autoComplete="off"
                      className="border-0 text-[15px] outline-none focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Send a message.."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isLoading} size="chat" variant="custom">
              <SendHorizontal />
            </Button>
          </form>
        </Form>
        <p className="text-center text-xs">
          OvertureAI can make mistakes. Consider checkng important information.
        </p>
      </div>
    </div>
  );
}
