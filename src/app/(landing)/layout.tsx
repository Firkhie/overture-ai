import { ArrowUp } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Props) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#e2dcf3] to-[#8f69cb]">
      <div className="h-full lg:mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
        {children}
      </div>
      <a
        href="#home"
        className="fixed bottom-4 right-4 z-50 transform rounded-full bg-[#8f69cb] p-3 text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#6b4aa0]"
      >
        <ArrowUp className="h-6 w-6" />
      </a>
    </div>
  );
}
