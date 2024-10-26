import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="h-[72px] border-b-[1px] bg-white">
      <div className="flex h-full items-center justify-end px-4">
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
}
