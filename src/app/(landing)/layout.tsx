import { ArrowUp } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Props) {
  return (
    <div className="relative min-h-screen bg-[#fdfcfe] bg-[radial-gradient(#cccccc_1px,transparent_1px)] [background-size:32px_32px]">
      {/* Purple blurry circles */}
      <div className="absolute -left-52 -top-36 h-[400px] w-[400px] rounded-full bg-[#8f69cb] opacity-25 blur-3xl" />
      <div className="absolute right-[200px] top-[450px] h-[300px] w-[300px] rounded-full bg-[#8f69cb] opacity-25 blur-3xl" />
      <div className="absolute left-[200px] top-[650px] h-[200px] w-[200px] rounded-full bg-[#8f69cb] opacity-25 blur-3xl" />
      <div className="h-full lg:mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
        {children}
      </div>
      <a
        href="#home"
        className="fixed bottom-4 right-4 z-50 transform rounded-full bg-[#8f69cb] p-2 text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#6b4aa0] md:p-3"
      >
        <ArrowUp className="h-4 w-4 md:h-6 md:w-6" />
      </a>
    </div>
  );
}
