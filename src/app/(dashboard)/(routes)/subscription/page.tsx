"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useUserSubscriptionStore from "@/store/useUserSubscriptionStore";
import useUserStore from "@/store/useUserStore";
import { formatEndDate, formatPlanName, formatPrice } from "@/lib/utils";

import Heading from "@/components/heading";
import { CreditCard } from "lucide-react";
import { subscriptionPlans } from "@/data/subscriptionPlans";
import { postInitiatePayment, postUpgradeSubscription } from "@/lib/api";
import SubscriptionCard from "@/components/subscription/SubscriptionCard";

export default function SubscriptionPage() {
  const { userName, userEmail } = useUserStore();
  const { userSubscription, setUserSubscription } = useUserSubscriptionStore();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    plan: z.string().min(1, { message: "Please select a plan" }),
    price: z.number().min(1, { message: "Price is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userName,
      email: userEmail,
      plan: "",
      price: 0,
    },
  });

  if (!userSubscription) return null;

  const { plan, endDate } = userSubscription;
  const formattedPlan = formatPlanName(plan);
  const formattedEndDate = formatEndDate(endDate);

  const handlePlanSelect = async (selectedPlan: {
    name: string;
    price: number;
  }) => {
    if (selectedPlan.name === "Free") {
      const data = await postUpgradeSubscription("Free", userSubscription);
      setUserSubscription(data);
      return;
    }

    form.setValue("plan", selectedPlan.name);
    form.setValue("price", selectedPlan.price);

    const values = {
      name: userName,
      email: userEmail,
      plan: selectedPlan.name,
      price: selectedPlan.price,
    };

    try {
      const { token } = await postInitiatePayment(values);

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
            const response = await fetch("/api/subscription/upgrade", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ plan: values.plan, userSubscription }),
            });
            const data = await response.json();
            setUserSubscription(data);

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

  return (
    <div className="flex flex-col pb-8 md:pb-10">
      <Heading
        title="Subscription"
        description="Manage account subscription planning"
        icon={CreditCard}
      />
      <div className="mb-4">
        <p>
          You're currently on a <strong>{formattedPlan} Plan</strong>
        </p>
        <p className="mb-3">
          Expired in: <strong>{formattedEndDate}</strong>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <SubscriptionCard
            key={plan.name}
            plan={plan}
            currentPlan={userSubscription.plan.toLowerCase()}
            userSubscription={userSubscription}
            handlePlanSelect={handlePlanSelect}
          />
        ))}
      </div>
    </div>
  );
}
