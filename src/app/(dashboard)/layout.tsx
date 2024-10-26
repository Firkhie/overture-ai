import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="relative min-h-full bg-[#f5f1ff]">
      <div className="fixed hidden h-full w-72 md:block">
        <Sidebar />
      </div>
      <div className="h-full w-full md:pl-72">
        <Navbar />
        <div className="mx-auto max-w-screen-xl px-4 pt-[72px] md:px-8">
          <div className="py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
