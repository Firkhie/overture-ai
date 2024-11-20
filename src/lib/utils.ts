import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomHeader(texts: string[]) {
  return texts[Math.floor(Math.random() * texts.length)];
}
