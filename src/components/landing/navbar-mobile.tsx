import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({
  weight: "600",
  subsets: ["latin"],
});

export default function LandingNavbarMobile() {
  return (
    <div className="flex items-center justify-between bg-[#8f69cb]/20 p-5 lg:hidden">
      <Link
        href="/dashboard"
        className="flex items-center justify-center gap-x-2"
      >
        <div className="relative h-6 w-6">
          <Image alt="logo" fill src="/assets/logo.png" />
        </div>
        <p className={cn("text-xl", inter.className)}>OvertureAI</p>
      </Link>
      <Menu className="h-6 w-6" />
    </div>
  );
}
