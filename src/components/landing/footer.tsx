import Image from "next/image";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "600",
  subsets: ["latin"],
});

export default function FooterPage() {
  return (
    <div className="px-5 lg:px-0">
      <div className="mb-8 mt-8 flex flex-col items-center justify-between gap-y-14 rounded-xl bg-[#8f69cb]/30 px-4 py-4 md:px-6">
        <div className="flex w-full flex-col items-end justify-between gap-4 sm:flex-row">
          {/* Left */}
          <div className="flex w-full flex-col gap-y-2">
            <div className="relative h-8 w-8">
              <Image alt="logo" fill src="/assets/logo.png" />
            </div>
            <h2 className="font-bold uppercase">Join a Newsletter</h2>
            <div className="flex items-center gap-x-2">
              <Input
                className="w-[250px] border-0 text-[14px] outline-none focus-visible:ring-transparent"
                disabled
                placeholder="Enter your email here"
              />
              <div className="h-[40px] rounded-md bg-[#714ab0]/20 p-2">
                <ArrowRight className="h-[25px] w-[25px] text-[#714ab0]" />
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="flex w-full flex-col gap-y-2 sm:items-end">
            <div className="flex items-center gap-x-4">
              <a
                href="https://github.com/Firkhie"
                target="_blank"
                className="relative h-6 w-6"
              >
                <Image alt="logo" fill src="/assets/github.svg" />
              </a>
              <a
                href="https://www.linkedin.com/in/firdigalfalakhi/"
                target="_blank"
                className="relative h-6 w-6"
              >
                <Image alt="logo" fill src="/assets/linkedin.svg" />
              </a>
            </div>
            <p className="text-sm">
              © 2024 Firdig Alfalakhi. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
