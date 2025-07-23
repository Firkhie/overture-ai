import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  isOnline?: boolean;
  type: "feature" | "general";
}

export default function Heading({
  title,
  description,
  icon: Icon,
  isOnline,
  type,
}: HeadingProps) {
  return (
    <div className="mb-5 flex items-center gap-3 md:mb-8">
      {Icon && (
        <div className="w-fit rounded-md bg-[#714ab0]/20 p-2">
          <Icon className="h-8 w-8 text-[#714ab0] md:h-9 md:w-9" />
        </div>
      )}
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="text-lg font-bold md:text-xl lg:text-2xl">{title}</h2>
          {type === "feature" && (
            <div
              className={cn(
                "h-[10px] w-[10px] flex-shrink-0 rounded-full",
                isOnline ? "bg-[#aaff00]" : "bg-[#f52529]",
              )}
            ></div>
          )}
        </div>
        <p className="text-sm text-muted-foreground lg:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
