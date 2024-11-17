"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { ImageIcon, Copy, SendHorizontal, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Heading from "@/components/heading";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import Image from "next/image";

type MessageParam = {
  role: "user" | "assistant";
  content: string | { header: string; b64_json: string[] };
};

const headerVariations = [
  "Here are your variations of images generated from your prompt. Let us know if you need more ideas!",
  "Certainly! Your visual representation has been created based on the provided prompt. Please review the images below.",
  "Got it! We've created some image variations from your prompt. Check them out below!",
  "Here you go! These images were generated using your input. Hope they inspire you!",
  "These are the images generated from the prompt you provided. Feel free to explore them below.",
];

const getRandomHeader = () =>
  headerVariations[Math.floor(Math.random() * headerVariations.length)];

export default function ImagePage() {
  const [messages, setMessages] = useState<MessageParam[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const endMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
      const response = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: values.prompt }),
      });
      const data = (await response.json()) as { b64_json: string }[];

      const assistantMessage: MessageParam = {
        role: "assistant",
        content: {
          header: getRandomHeader(),
          b64_json: data.map(
            (item) => `data:image/png;base64,${item.b64_json}`,
          ),
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
        title="Image Generation"
        description="Experience our most sophisticated image generation model"
        icon={ImageIcon}
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
                    <div className="mt-2 grid w-fit grid-cols-1 gap-4 sm:grid-cols-2">
                      {typeof message.content !== "string" &&
                        message.content.b64_json.map((image, idx) => (
                          <div
                            key={`image-${idx}`}
                            className="relative aspect-square h-64 max-h-full w-64 max-w-full rounded-lg border border-transparent transition-colors duration-100 sm:h-72 sm:w-72"
                          >
                            <div className="absolute right-2 top-2 z-10 flex items-center justify-center rounded-lg bg-[#593a8b] p-2 transition-all duration-200 hover:bg-[#462e6f]">
                              <a href={image} download={`image-${idx}.png`}>
                                <Download className="h-5 w-5 text-white" />
                              </a>
                            </div>
                            <Image
                              alt="Generated"
                              src={image}
                              layout="fill"
                              className="rounded-lg object-cover"
                            />
                          </div>
                        ))}
                    </div>
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
