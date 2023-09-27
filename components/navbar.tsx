"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

import Logo from "../public/images/logo-white.png";
import { UserButton, useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (pathname === "/sign-in" || pathname == "/sign-up") {
    return null;
  }

  return (
    <div className="bg-[#1A1A1D] lg:px-48 px-10">
      <div className="relative px-4 sm:pr-6 lg:pr-8 flex h-16 items-center">
        <Link href="/" className="px-4 flex lg:ml-0">
          <Image alt="logo" src={Logo} width={32} />
        </Link>
        <div className="ml-auto flex items-center gap-x-4">
          {userId ? (
            <UserButton />
          ) : (
            <Button
              onClick={() => {
                router.push("/sign-in");
              }}
              className="flex items-center rounded-full bg-white px-4 py-2 text-[#C3073F]"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
