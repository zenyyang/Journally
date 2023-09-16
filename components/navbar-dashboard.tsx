"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../public/images/logoo.png";
import { UserButton } from "@clerk/nextjs";

const NavbarDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="lg:px-48 px-10v">
      <div className="relative px-4 sm:pr-6 lg:pr-8 flex h-16 items-center">
        <Link href="/" className="px-4 flex lg:ml-0">
          <Image alt="logo" src={Logo} width={24} />
        </Link>
        <div className="ml-auto flex items-center gap-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
