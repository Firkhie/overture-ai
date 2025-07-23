import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const features = {
  conversation: {
    href: "/conversation",
    label: "Conversation",
    icon: MessageSquare,
    status: "online",
  },
  image: {
    href: "/image",
    label: "Image Generation",
    icon: ImageIcon,
    status: "offline",
  },
  video: {
    href: "/video",
    label: "Video Generation",
    icon: VideoIcon,
    status: "offline",
  },
  music: {
    href: "/music",
    label: "Music Generation",
    icon: Music,
    status: "offline",
  },
  code: {
    href: "/code",
    label: "Code Generation",
    icon: Code,
    status: "online",
  },
};
