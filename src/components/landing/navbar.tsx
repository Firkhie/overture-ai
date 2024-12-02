import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const inter = Inter({
  weight: "600",
  subsets: ["latin"],
});

export default function LandingNavbar() {
  return (
    <div className="mt-8 hidden items-center justify-between rounded-full bg-[#8f69cb]/20 px-4 py-4 md:px-6 lg:flex">
      <Link
        href="/dashboard"
        className="flex items-center justify-center gap-x-2"
      >
        <div className="relative h-6 w-6">
          <Image alt="logo" fill src="/assets/logo.png" />
        </div>
        <p className={cn("text-xl", inter.className)}>OvertureAI</p>
      </Link>
      <div className="flex gap-x-8">
        <a className="hover:text-[#593a8b]" href="#home">
          Home
        </a>
        <a className="hover:text-[#593a8b]" href="#features">
          Features
        </a>
        <a className="hover:text-[#593a8b]" href="#pricing">
          Pricing
        </a>
        <a className="hover:text-[#593a8b]" href="#contact">
          Contact Us
        </a>
      </div>
      <div className="space-x-2">
        <Link href="/sign-in">
          <Button variant="secondary" size="navbar">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="custom" size="navbar">
            Getting Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
