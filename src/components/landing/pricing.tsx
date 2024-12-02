import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const subscriptionPlans = [
  {
    name: "Free",
    description: "Perfect for exploring and testing our platform's features",
    price: 0,
    features: [
      "Access to all features: conversation, image generation, video generation, code generation, and music generation",
      "Limited to 5 credits",
    ],
  },
  {
    name: "Pro",
    description: "Great for individuals who need more flexibility and usage",
    price: 50000,
    features: [
      "Access to all features: conversation, image generation, video generation, code generation, and music generation",
      "50 credits per month",
    ],
  },
  {
    name: "Unlimited",
    description:
      "Best for power users and businesses who require unlimited access",
    price: 300000,
    features: [
      "Access to all features: conversation, image generation, video generation, code generation, and music generation",
      "Unlimited credits",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8 px-5 lg:px-0">
      <div className="text-center">
        <h3 className="font-bold uppercase">Pricing</h3>
        <h2 className="text-4xl font-bold lg:text-5xl">Price for everyone</h2>
        <p className="mt-4">
          Choose a plan that works best for your needs and start creating today.
        </p>
      </div>
      {/* Pricing Cards */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.name}
            className="h-[394px] min-w-[320px] max-w-[416px] flex-1 rounded-lg border border-[#593a8b] bg-white p-6"
          >
            <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
            <p className="mt-2 text-gray-600">{plan.description}</p>

            <div className="mt-3 lg:mt-6">
              <span className="text-3xl font-bold text-gray-900 lg:text-4xl">
                {plan.price === 0 ? "Free" : `Rp ${formatPrice(plan.price)}`}
              </span>
              {plan.price !== 0 && (
                <span className="ml-1 text-sm text-gray-500">/ month</span>
              )}
            </div>

            <ul className="mt-3 space-y-3 lg:mt-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-indigo-600">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/sign-up">
              <Button variant="custom" className="mt-3 w-full lg:mt-6">
                {plan.price === 0 ? "Get Started" : "Choose Plan"}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
