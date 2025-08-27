import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const inter = Inter({
  weight: "600",
  subsets: ["latin"],
});

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 z-50 hidden w-full lg:flex",
        scrolled ? "bg-[#8f69cb]/20 backdrop-blur-md" : "",
      )}
    >
      <div className="mx-auto w-full lg:max-w-screen-lg xl:max-w-screen-xl py-6 text-[15px]">
        <div className="flex w-full items-center justify-between">
          <a href="#home" className="flex items-center justify-center gap-x-2">
            <div className="relative h-6 w-6">
              <Image alt="logo" fill src="/assets/logo.png" />
            </div>
            <p className={cn("text-[17px]", inter.className)}>OvertureAI</p>
          </a>
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
      </div>
    </div>
  );
}
