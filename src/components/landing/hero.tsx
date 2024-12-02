import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import TypewriterComponent from "typewriter-effect";

export default function LandingHero() {
  return (
    <div className="px-5 lg:mt-8 lg:px-0">
      <div className="space-y-8 text-center">
        <div className="space-y-5 text-4xl font-bold lg:text-5xl">
          <h1>
            Transform your workflow and creativity with cutting-edge AI tools
            for
          </h1>
          <div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            <TypewriterComponent
              options={{
                strings: [
                  "Chatbot.",
                  "Photo Generation.",
                  "Music Generation.",
                  "Video Generation.",
                  "Code Generation.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <p className="mx-auto">
          OvertureAI empowers you with cutting-edge AI tools to create stunning
          images, generate music, produce videos, build code, and enhance
          customer interactions with chatbots. Experience seamless creativity
          and productivity like never before.
        </p>
        <div className="space-x-2 pb-8">
          <Link href="/sign-up">
            <Button variant="custom">Sign Up</Button>
          </Link>
          <Button variant="secondary">Contact Us</Button>
        </div>
        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl">
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
