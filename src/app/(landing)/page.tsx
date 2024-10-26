"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  return (
    <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
      <Button>Login</Button>
    </Link>
  );
}
