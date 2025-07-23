"use client";

import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

import Heading from "@/components/heading";
import { cn } from "@/lib/utils";
import { features } from "@/lib/features";

export default function DashboardPage() {
  const { userName } = useUserStore();
  const router = useRouter();

  return (
    <div className="flex flex-col pb-8 md:pb-10">
      <Heading
        title={`Hello, ${userName}`}
        description="Discover a variety of powerful AI SaaS features designed just for you.
          Choose a tool below and unleash the full potential of AI!"
        type="general"
      />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {Object.entries(features).map(([key, feature]) => (
          <div
            onClick={() => router.push(feature.href)}
            key={key}
            className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-sm transition hover:bg-white/30"
          >
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full items-center justify-between">
                <div className="font-semibold">{feature.label}</div>
                <div className="flex items-center gap-x-1 rounded-md bg-[#282627]/5 px-2 py-1 text-[10px] font-semibold uppercase">
                  <div
                    className={cn(
                      "h-2 w-2 flex-shrink-0 rounded-full",
                      feature.status === "online"
                        ? "bg-[#aaff00]"
                        : "bg-[#f52529]",
                    )}
                  ></div>
                  {feature.status}
                </div>
              </div>
              <div className="flex w-full items-center justify-center rounded-md bg-[#714ab0]/20 p-7">
                <feature.icon className="h-24 w-24 text-[#714ab0] xl:h-32 xl:w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
