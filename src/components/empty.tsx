import Image from "next/image";

interface EmptyProps {
  description: string;
}

export default function Empty({ description }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-32">
      <div className="relative h-60 w-60">
        <Image alt="empty" src="/assets/empty.png" fill />
      </div>
      <p className="text-center text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
