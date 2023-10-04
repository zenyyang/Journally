import Logo from "../public/images/journally-logo.png";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="pb-10">
      <div className="md:grid flex md:grid-cols-4 grid-cols-3 gap-5">
        <div className="hidden md:flex items-center col-span-1 mb-36">
          <Link href={"/"} className="mt-10">
            <Image src={Logo} alt="Journally Logo" width={200} />
          </Link>
        </div>
        <div className="flex-row items-center md:col-span-3 col-span-2 ml-20 mt-7">
          <p className="font-light">
            Journally is a platform that helps you transform your daily
            experiences and moments into compelling and memorable stories.
            Whether its documenting your personal life, sharing your thoughts,
            or recounting your adventures, Journally provides the tools and
            space to craft engaging narratives that capture the essence of your
            day-to-day life.
          </p>
          <div className=" text-muted-foreground">
            <p className="font-semibold text-xl pt-5"> Connect with us: </p>
            <div className="flex gap-5">
              <Link
                href={"https://www.instagram.com/wanderer_journals_/"}
                target="_blank"
              >
                <Instagram className="mt-3" width={30} />
              </Link>
              <Link href={"https://twitter.com/zennyangg"} target="_blank">
                <Twitter className="mt-3" width={30} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10 text-muted-foreground">
        <p> &copy; 2023 Journally. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
