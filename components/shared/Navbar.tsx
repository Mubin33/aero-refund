"use client";

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "IVR System", href: "#" },
  { label: "Validation", href: "#" },
  { label: "Workflow", href: "#" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-4 lg:top-6 z-50 w-full">
      <div className="mx-auto max-w-[1400px] rounded-[24px] border bg-black/40 border-white/15 bg-[#00000001]  shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between gap-6 px-6 py-2 lg:py-[30px] sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
           <img src="/logo.png" alt="AeroRefund Logo" className="h-15 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-8 text-base font-semibold text-white/90 lg:flex"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-[#F2B124] font-medium text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section: Phone + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="h-10 rounded-full cursor-pointer bg-[#00000001] border-white/15 text-white shadow-xl  px-8 text-base font-bold hover:scale-105 transition-colors gap-2 "
            >
              Log in
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex items-center justify-center size-10 rounded-full transition-colors hover:bg-white/10"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="size-6 text-white" />
              ) : (
                <Menu className="size-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <nav
            className="border-t border-white/15 bg-blue-900/90 backdrop-blur-lg lg:hidden rounded-b-3xl overflow-hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-2.5 text-sm sm:text-base font-semibold text-white/95 transition-colors hover:bg-white/10 hover:text-[#F2B124]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
