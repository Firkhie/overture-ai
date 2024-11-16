import Image from "next/image";

interface EmptyProps {
  description: string;
}

export default function Empty({ description }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-32">
      <div className="relative h-48 w-48 md:h-60 md:w-60">
        <Image alt="empty" src="/assets/empty.png" fill />
      </div>
      <p className="text-center text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
