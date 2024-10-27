"use client";

import axios from "axios";
import Heading from "@/components/heading";
import { MessageSquare, SendHorizontal } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

export default function ConversationPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: "user",
      content: "Hello",
    },
    {
      role: "assistance",
      content: "Hey",
    },
    // {
    //   role: "user",
    //   content:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    // },
    // {
    //   role: "assistance",
    //   content:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    // },
  ]);

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

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error.response.status === 403) {
        // proModal.onOpen();
      } else {
        // toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="flex h-full flex-col">
      <Heading
        title="Conversation"
        description="Experience our most sophisticated conversation model"
        icon={MessageSquare}
      />
      <div className="scrollbar-hide flex-1 overflow-auto rounded-t-lg border border-[#593a8b] bg-white p-4">
        <div className="space-y-3">
          {messages.length == 0 && !isLoading && (
            <Empty description="No conversation started." />
          )}
          {messages.map((message) => (
            <div
              key={String(message.content)}
              className={cn(
                "flex w-full gap-x-3 rounded-lg p-5",
                message.role === "user"
                  ? "border border-black/10 bg-white"
                  : "bg-muted",
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <div className="flex flex-col gap-y-[6px]">
                {message.role === "user" ? (
                  <p className="font-semibold leading-none">Firdig Alfalakhi</p>
                ) : (
                  <p className="font-semibold leading-none">OvertureAI</p>
                )}
                <p className="text-[15px]">{String(message.content)}</p>
              </div>
            </div>
          ))}
          {!isLoading && <Loader />}
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
                      autoComplete="off"
                      className="border-0 text-[15px] outline-none focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Send a message.."
                      {...field}
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
