"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import markdownit from "markdown-it";

import { Code, Copy, SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Heading from "@/components/heading";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

export default function CodePage() {
  const [messages, setMessages] = useState<MessageParam[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const endMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedMessages = sessionStorage.getItem("codeMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("codeMessages", JSON.stringify(messages));
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
      const response = await fetch("/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: userMessage }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const md = markdownit();

      setIsLoading(false);

      const assistantMessage: MessageParam = { role: "assistant", content: "" };
      setMessages((currentMessages) => [...currentMessages, assistantMessage]);

      let messageBuffer = "";
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        messageBuffer += decoder.decode(value, { stream: true });
        const renderedMessage = md.render(messageBuffer);

        setMessages((currentMessages) => {
          const updatedMessages = [...currentMessages];
          updatedMessages[updatedMessages.length - 1] = {
            role: "assistant",
            content: renderedMessage,
          };
          return updatedMessages;
        });
      }
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
        title="Code Generation"
        description="Experience our most sophisticated code generation model"
        icon={Code}
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
                  <div className="mr-10 mt-2 overflow-hidden rounded-lg text-white">
                    <div className="flex items-center justify-between bg-[#4b4b4b] px-5 py-3 text-xs">
                      <p>Generated Code</p>
                      <div className="flex cursor-pointer items-center gap-x-2">
                        <Copy className="h-4 w-4" />
                        <p>Copy Code</p>
                      </div>
                    </div>
                    <div
                      className="overflow-auto bg-[#282828] p-5 text-[15px] text-sm"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
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
