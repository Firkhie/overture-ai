import { useState } from "react";
import {
  CircleCheck,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const contents = [
  {
    label: "Conversation",
    icon: MessageSquare,
    features: [
      "Real-time Chat",
      "AI-based Suggestions",
      "Language Translation",
    ],
    description: "Engage in real-time conversations with AI.",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    features: ["High-quality Images", "Custom Styles", "Batch Processing"],
    description: "Generate stunning images tailored to your needs.",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    features: ["Customizable Templates", "HD Quality", "Fast Rendering"],
    description: "Create high-quality videos effortlessly.",
  },
  {
    label: "Music Generation",
    icon: Music,
    features: ["Custom Genres", "AI Compositions", "Seamless Looping"],
    description: "Compose beautiful music with AI assistance.",
  },
  {
    label: "Code Generation",
    icon: Code,
    features: ["Code Snippets", "Syntax Correction", "Custom Algorithms"],
    description: "Generate optimized code for your projects.",
  },
];

export default function FeaturePage() {
  const [activeContent, setActiveContent] = useState(contents[0]);

  return (
    <div className="space-y-8 px-5 lg:px-0">
      <div className="text-center">
        <h3 className="font-bold uppercase">Features</h3>
        <h2 className="text-4xl font-bold lg:text-5xl">
          Unlock the Power of Generative AI
        </h2>
        <p className="mt-4">
          Elevate your creative process with AI-driven features tailored for
          creators
        </p>
      </div>
      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {contents.map((content) => (
          <button
            key={content.label}
            className={`flex items-center justify-center gap-x-2 rounded-full px-10 py-3 ${
              activeContent.label === content.label
                ? "bg-[#714ab0] text-white"
                : "bg-[#ece5ff] text-[#714ab0]"
            }`}
            onClick={() => setActiveContent(content)}
          >
            <content.icon
              className={`h-6 w-6 ${
                activeContent.label === content.label
                  ? "text-white"
                  : "text-[#714ab0]"
              }`}
            />
            {content.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="grid grid-cols-12 gap-6 rounded-lg border border-[#593a8b] bg-white p-8">
        <div className="col-span-12 lg:col-span-4">
          <h1 className="text-2xl font-bold">{activeContent.description}</h1>
          <p className="mt-4 font-semibold">Features include:</p>
          <div className="mt-2 space-y-2">
            {activeContent.features.map((feature) => (
              <div key={feature} className="flex items-center gap-x-2">
                <CircleCheck className="h-4 w-4 flex-shrink-0 text-[#714ab0]" />
                <p>{feature}</p>
              </div>
            ))}
          </div>
          <Link href="/sign-up">
            <Button variant="custom" className="mt-4">
              Start Exploring Now
            </Button>
          </Link>
        </div>
        <div className="col-span-12 overflow-hidden rounded-lg border border-neutral-300 lg:col-span-8">
          <Image
            alt="landing-image"
            src="/assets/landing-image.png"
            layout="responsive"
            width={1280}
            height={720}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
