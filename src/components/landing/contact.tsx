import { Home, Mail, MapPin, Phone } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "../ui/button";

const contents = [
  { title: "Our Location", icon: MapPin, value: "Malang, Indonesia" },
  { title: "Phone Number", icon: Phone, value: "+68 838 3457 2348" },
  { title: "Email Address", icon: Mail, value: "Alfalakhie@gmail.com" },
];

const formSchema = z.object({
  fullname: z.string().min(1, {
    message: "Name field has to be filled.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email field has to be filled.",
    })
    .email("This is not a valid email."),
  subject: z.string().min(1, {
    message: "Subject field has to be filled.",
  }),
  message: z.string().min(1, {
    message: "Message field has to be filled.",
  }),
});

async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    // setIsLoading(true);
    // await sendMessage(values);
    // toast.success("Message sent successfully");
    // form.reset();
  } catch (error) {
    console.log(error);
    // toast.error("Something went wrong");
  } finally {
    // setIsLoading(false);
  }
}

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  return (
    <div className="space-y-8 px-5 lg:px-0">
      <div className="text-center">
        <h3 className="font-bold uppercase">Contact Us</h3>
        <h2 className="text-4xl font-bold lg:text-5xl">Get In Touch With Us</h2>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Left */}
        <div className="flex flex-1 flex-col gap-y-4">
          <p className="mb-4">
            We’d love to hear from you! Whether you have questions, need
            assistance, or just want to share your thoughts, we’re here to help.
            Don’t hesitate to reach out to us through any of the channels below.
          </p>
          {contents.map((content) => (
            <div className="flex items-start gap-4" key={content.title}>
              <div className="w-fit rounded-md bg-white/75 p-[14px]">
                <content.icon className="h-7 w-7 text-[#714ab0]" />
              </div>
              <div>
                <h2 className="font-bold">{content.title}</h2>
                <p className="text-sm">{content.value}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Right */}
        <div className="flex-1 rounded-xl border border-[#593a8b] bg-white p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 sm:space-y-4"
            >
              <div className="flex gap-x-3">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm">
                        Fullname
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your fullname"
                          autoComplete="off"
                          {...field}
                          className="text-xs text-black focus-visible:ring-0 focus-visible:ring-transparent sm:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email"
                          autoComplete="off"
                          {...field}
                          className="text-xs text-black focus-visible:ring-0 focus-visible:ring-transparent sm:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your subject"
                        autoComplete="off"
                        {...field}
                        className="text-xs text-black focus-visible:ring-0 focus-visible:ring-transparent sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        autoComplete="off"
                        {...field}
                        className="text-xs text-black focus-visible:ring-0 focus-visible:ring-transparent sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="custom">
                <Send className="h-[14px] w-[14px] sm:h-4 sm:w-4" />
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
