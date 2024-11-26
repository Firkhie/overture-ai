"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import useUserStore from "@/store/useUserStore";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const whitelistedPages = ["/dashboard", "/help", "/subscription"];

export default function DashboardLayout({ children }: Props) {
  const { user, isLoaded } = useUser();
  const setUserName = useUserStore((state) => state.setUserName);

  const [subsCredit, setSubsCredit] = useState<{
    limit: number;
    credits: number;
    plan: string;
  }>({ limit: 0, credits: 0, plan: "FREE" });

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        await fetch("/api/subscription/check", {
          method: "POST",
        });
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };
    const getSubscriptionCredit = async () => {
      try {
        const response = await fetch("/api/subscription/credit", {
          method: "POST",
        });
        const data = await response.json();
        setSubsCredit(data);
      } catch (error) {
        console.error("Error getting subscription:", error);
      }
    };
    checkSubscription();
    getSubscriptionCredit();
  }, []);

  useEffect(() => {
    if (isLoaded && user) {
      setUserName(user.fullName || "Guest");
    }
  }, [isLoaded, user, setUserName]);

  const pathname = usePathname();
  const isWhitelisted = whitelistedPages.includes(pathname);

  return (
    <div
      className={`relative ${isWhitelisted ? "min-h-full" : "h-full"} bg-[#f5f1ff]`}
    >
      <div className="fixed h-[72px] w-full border-b-[1px] bg-white">
        <Navbar />
      </div>
      <div className="fixed hidden h-full w-72 md:block">
        <Sidebar subsCredit={subsCredit} />
      </div>
      <div className="h-full w-full md:pl-72">
        <div className="mx-auto h-full max-w-screen-xl px-4 pt-14 md:px-8 md:pt-[72px]">
          <div className="h-full pt-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
