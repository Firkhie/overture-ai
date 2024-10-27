import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function Heading({
  title,
  description,
  icon: Icon,
}: HeadingProps) {
  return (
    <div className="mb-5 flex items-center gap-3 md:mb-8">
      <div className="w-fit rounded-md bg-[#714ab0]/20 p-2">
        <Icon className="h-8 w-8 text-[#714ab0] md:h-9 md:w-9" />
      </div>
      <div>
        <h2 className="text-lg font-bold sm:text-xl md:text-2xl">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
