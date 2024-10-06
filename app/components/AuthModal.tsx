import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.png";
import { signIn } from "../lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButtons";

function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex items-center flex-row gap-2 justify-center">
          <Image src={Logo} alt="logo" className="size-10" />
          <h4 className="font-semibold text-3xl">
            SalIH <span className="text-primary">Calendar</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            {" "}
            <GoogleAuthButton />
          </form>
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            {" "}
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
