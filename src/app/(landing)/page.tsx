"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <Link href="/sign-in">
      <Button>Login</Button>
    </Link>
  );
}
