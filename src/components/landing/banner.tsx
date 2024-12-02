import Image from "next/image";

export default function BannerPage() {
  return (
    <div className="space-y-8 px-5 text-center lg:px-0">
      <h2 className="font-bold uppercase">
        Powered by Industry-Leading AI Technologies
      </h2>
      <div className="flex justify-center gap-x-10 lg:gap-x-16">
        <div className="lg:w-18 relative h-12 w-32 lg:h-12">
          <Image
            src="/assets/openai-logo.svg"
            alt="OpenAI Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="lg:w-18 relative h-12 w-32 lg:h-12">
          <Image
            src="/assets/claude-logo.svg"
            alt="Claude Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="lg:w-18 relative h-12 w-32 lg:h-12">
          <Image
            src="/assets/replicate-logo.svg"
            alt="Replicate Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}
