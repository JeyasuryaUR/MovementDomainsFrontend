"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaTelegram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { ZIcon } from "./svg-components/SVGAssets";
const Footer = () => {
  const [activeLink, setActiveLink] = useState("");

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/mydomains", label: "MY NAMES" },
    { href: "/", label: "DOC" },
  ];

  const socialLinks = [
    { href: "/", icon: FaTelegram, label: "telegram" },
    { href: "/", icon: FaTwitter, label: "twitter" },
  ];

  return (
    <>
      
      <footer className="flex w-full px-4 md:px-16 lg:px-32 relative flex-col justify-center self-center items-center max-md:mt-4 max-sm:mt-8 z-10 py-4 sm:py-6 md:py-8 text-black bg-gradient-to-t from-moveyellow to-transparent">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-gray-500 pb-4 w-full gap-6 sm:gap-8">
          {/* <LogoFooter className="w-24 sm:w-24 md:w-24" /> */}
          <Link href="/" className="w-24 sm:w-24 md:w-24">
            <Image src="/logo.svg" alt="Logo" width={200} height={200} />
          </Link>

          <nav
            className="flex flex-wrap justify-center gap-4 items-center text-xs sm:text-sm md:text-sm"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 255, 0.5)" }}
          >
            {navLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                {index > 0 && <ZIcon className="w-6 h-6 text-gray-500" />}
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.label.toLowerCase())}
                  className={`${
                    activeLink === link.label.toLowerCase()
                      ? "text-gray-300"
                      : "text-white"
                  } font-bold hover:text-gray-300 transition-colors`}
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                {index > 0 && <ZIcon className="w-4 h-4 text-gray-500" />}
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`${
                    activeLink === link.label
                      ? "text-orange-100"
                      : "text-white"
                  } hover:text-yellow-700 transition-colors`}
                >
                  <link.icon className="lg w-6 h-6" />
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="mt-4 text-xs sm:text-sm md:text-base w-full max-w-6xl">
          <p
            className="text-white font-semibold text-center"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 255, 0.5)" }}
          >
            ©2024 NILLION. ALL RIGHTS RESERVED.
          </p>
        </div>
        {/* <div className="absolute bottom-0 left-0 right-0 z-[-1] pointer-events-none">
          <EllipseFooter className="w-full h-auto" />
        </div> */}
      </footer>
    </>
  );
};

export default Footer;
