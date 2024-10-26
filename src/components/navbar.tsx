import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";

export default function Navbar() {
  return (
    <div className="fixed h-[72px] w-full border-b-[1px] bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <MobileSidebar />
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
}
