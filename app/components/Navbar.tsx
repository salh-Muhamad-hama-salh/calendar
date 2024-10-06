import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo.png";
import AuthModal from "./AuthModal";
function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" className="size-10" />
        <h4 className="font-semibold text-3xl">
          SalIH <span className="text-blue-500">Calendar</span>
        </h4>
      </Link>

      <AuthModal />
    </div>
  );
}

export default Navbar;
