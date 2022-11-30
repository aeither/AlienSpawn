"use client";

// import { ConnectWallet } from "@thirdweb-dev/react";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <div className="navbar bg-neutral-regular">
      <div className="flex-1">
        <a className="ml-2 flex flex-row p-2 text-xl font-bold normal-case italic text-primary">
          <Image width={24} height={8} src="/logo.png" alt="logo" />
          <span className="pl-2 font-normal text-neutral-light">
            Alien Spawn
          </span>
        </a>
      </div>
      <div className="flex-none">
        <ul className="px-2 hover:text-primary">
          <li>
            <Link
              className={clsx(
                "active:bg-transparent",
                router.pathname === "/" && "text-white"
              )}
              href={"/"}
            >
              Home
            </Link>
          </li>
        </ul>
        <ul className="px-2 text-neutral-light hover:text-primary">
          <li>
            <Link
              className={clsx(
                "active:bg-transparent",
                router.pathname === "/test" && "text-white"
              )}
              href={"/test"}
            >
              Generate
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
