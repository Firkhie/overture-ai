"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { CircleCheck, CreditCard } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const subscriptionPlans = [
  {
    name: "Free Plan",
    description: "Perfect for exploring and testing our platform's features",
    price: "0",
    features: [
      "Access to all features: conversation, image generation, video generation, code generation, and music generation",
      "Limited to 5 credits",
    ],
  },
  {
    name: "Pro Plan",
    description: "Great for individuals who need more flexibility and usage",
    price: "50.000",
    features: [
      "Access to all features: conversation, image generation, video generation, code generation, and music generation",
      "50 credits per month",
    ],
  },
  {
    name: "Unlimited Plan",
    description:
      "Best for power users and businesses who require unlimited access",
    price: "200.000",
    features: [
      "Access to all features: conversation, image generation, video generation, code generation, and music generation",
      "Unlimited credits",
    ],
  },
];

export default function SubscriptionPage() {
  const { user } = useUser();

  const [selectedPlan, setSelectedPlan] = useState<null | {
    name: string;
    price: string;
  }>(null);

  const formSchema = z.object({
    email: z.string().email({ message: "Valid email is required" }),
    plan: z.string().min(1, { message: "Please select a plan" }),
    price: z.string().min(1, { message: "Price is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "",
      price: "",
      email: user?.primaryEmailAddress?.emailAddress || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/subscription/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const { token } = await response.json();

      const snapScript = document.createElement("script");
      snapScript.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      snapScript.setAttribute(
        "data-client-key",
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
      );
      snapScript.async = true;
      document.body.appendChild(snapScript);

      snapScript.onload = () => {
        window.snap.pay(token, {
          onSuccess: async (result: any) => {
            await fetch("/api/subscription/upgrade", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            console.log("Payment successful:", result);
            alert("Payment successful!");
          },
          onPending: (result: any) => {
            console.log("Payment pending:", result);
            alert("Payment pending!");
          },
          onError: (result: any) => {
            console.error("Payment error:", result);
            alert("Payment failed!");
          },
          onClose: () => {
            alert("Payment popup closed without completion.");
          },
        });
      };
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  const handlePlanSelect = (plan: { name: string; price: string }) => {
    setSelectedPlan(plan);
    form.setValue("plan", plan.name);
    form.setValue("price", plan.price);
    onSubmit({
      email: user?.primaryEmailAddress?.emailAddress || "",
      plan: plan.name,
      price: plan.price,
    });
  };

  return (
    <div className="flex flex-col pb-8 md:pb-10">
      <Heading
        title="Subscription"
        description="Manage account subscription planning"
        icon={CreditCard}
      />
      <div className="mb-4">
        <p>
          You're currently on a <strong>Free Plan</strong>
        </p>
        <p className="mb-3">Expired in: -</p>
        {/* <Button variant="custom">Upgrade</Button> */}
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.name}
            className="flex h-full flex-col gap-y-3 rounded-lg border border-[#593a8b] bg-white p-5"
          >
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-[15px] font-light">{plan.description}</p>
            <div className="flex items-end gap-x-1">
              <h1 className="text-3xl font-bold">Rp. {plan.price}</h1>
              <p>/mo</p>
            </div>
            <Button variant="custom" onClick={() => handlePlanSelect(plan)}>
              Select Plan
            </Button>
            <p className="font-semibold">Features include</p>
            {plan.features.map((item) => (
              <div key={item} className="flex items-center gap-x-2">
                <CircleCheck className="h-4 w-4 flex-shrink-0 text-[#714ab0]" />
                <p className="text-[15px]">{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
