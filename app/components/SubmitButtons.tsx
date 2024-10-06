"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";
import Googlelogo from "@/public/google.svg";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import GitHublogo from "@/public/github.svg";

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={Googlelogo} alt="google" className="size-4 mr-2" />
          Sign in with Google
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GitHublogo} alt="github" className="size-4 mr-2" />
          Sign in with GitHub
        </Button>
      )}
    </>
  );
}
