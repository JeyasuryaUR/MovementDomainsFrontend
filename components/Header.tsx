"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { WalletSelector } from "./WalletSelector"; // Use WalletSelector instead of UserMenu

const Header: React.FC = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/mydomains", label: "My Names" },
  ];

  return (
    <header className="flex items-center justify-between w-full p-4 sm:px-6 md:px-8">
      {/* Logo Section */}
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={200}
          height={200}
          className="w-32 h-20 md:w-30 md:h-30"
        />
      </Link>

      {/* Center Navigation (Desktop) */}
      <nav className="hidden md:flex gap-6 lg:gap-10 text-base lg:text-lg items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setActiveLink(link.label.toLowerCase())}
            className={`${
              activeLink === link.label.toLowerCase()
                ? "text-black text-opacity-100"
                : "text-black text-opacity-40"
            } font-semibold`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-30 text-sm"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-white p-4">
          <nav className="flex flex-col text-lg items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.label.toLowerCase());
                  setIsMenuOpen(false);
                }}
                className={`${
                  activeLink === link.label.toLowerCase()
                    ? "text-black"
                    : "text-gray-500"
                } font-semibold`}
              >
                {link.label}
              </Link>
            ))}
            {/* Wallet Button */}
            <div className="mt-4">
              <WalletSelector /> {/* Use WalletSelector here */}
            </div>
          </nav>
        </div>
      )}

      {/* Wallet Button (Desktop) */}
      <div className="hidden md:flex">
        <WalletSelector /> {/* Use WalletSelector here */}
      </div>
    </header>
  );
};

export default Header;
