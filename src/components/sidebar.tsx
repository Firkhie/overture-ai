"use client";

import Image from "next/image";
import {
  CircleHelp,
  Code,
  ImageIcon,
  LayoutDashboardIcon,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const sidebarMenu = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    border: true,
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    border: false,
  },
  { label: "Image Generation", icon: ImageIcon, href: "/image", border: false },
  { label: "Video Generation", icon: VideoIcon, href: "/video", border: false },
  { label: "Music Generation", icon: Music, href: "/music", border: false },
  { label: "Code Generation", icon: Code, href: "/code", border: true },
  { label: "Settings", icon: Settings, href: "/settings", border: false },
  { label: "Help & FAQ", icon: CircleHelp, href: "/help", border: false },
];

import { Inter } from "next/font/google";
const inter = Inter({
  weight: "600",
  subsets: ["latin"],
});

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between border-r bg-white">
      <div>
        {/* Logo */}
        <div className="flex h-[72px] items-center justify-center gap-x-1 border-b">
          <div className="relative h-[22px] w-[22px]">
            <Image alt="Logo" fill src="/orbital-logo.png" />
          </div>
          <p className={cn("text-xl", inter.className)}>OvertureAI</p>
        </div>
        {/* Menu */}
        <div className="space-y-1 p-4">
          {sidebarMenu.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex cursor-pointer rounded-lg p-3 text-sm transition hover:bg-[#ece5ff]",
                  pathname === item.href ? "bg-[#ece5ff]" : "text-black",
                )}
              >
                <div className="flex flex-1 items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </div>
              </Link>
              {item.border && <hr className="border-dashed" />}
            </div>
          ))}
        </div>
      </div>
      {/* Counter */}
      <div className="flex flex-col gap-y-2 p-4">
        <div className="flex flex-col gap-y-2 rounded-lg bg-[#ece5ff] p-3">
          <p className="text-xs">1 / 3 credits remaining</p>
          <Progress className="h-1" value={35} />
        </div>
        <div className="flex flex-col gap-y-2 rounded-lg bg-[#ece5ff] p-3">
          <div className="relative h-9 w-9">
            <Image alt="Logo" fill src="/orbital-logo.png" />
          </div>
          <p className="text-sm">
            You’re on the <span className="font-bold">Free Tier</span>. Upgrade
            for more features!
          </p>
          <Button variant="custom">Upgrade Now</Button>
        </div>
      </div>
    </div>
  );
}
