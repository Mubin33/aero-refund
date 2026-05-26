"use client";

import Link from "next/link";
import { Phone, Menu, X, UserCircle, Settings, LogOut, Shield } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-4 lg:top-6 z-50 w-full">
      <div className="mx-auto max-w-[1400px] rounded-[24px] border bg-black/40 border-white/15 bg-[#00000001]  shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between gap-6 px-6 py-2 lg:py-[30px] sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 flex-1">
           <img src="/logo.png" alt="AeroRefund Logo" className="h-15 w-auto" />
          </Link>

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

          {/* Profile Dropdown Menu */}
          <div className="ml-auto relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="rounded-full p-1.5 transition-all hover:bg-white/10 text-white/95 hover:text-[#F2B124] border border-white/20 hover:border-[#F2B124]/50"
              aria-expanded={isProfileOpen}
            >
              <UserCircle size={32} strokeWidth={1.5} />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-lg border border-gray-200 shadow-lg z-50 overflow-hidden">
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Welcome</p>
                  <p className="text-xs text-gray-600">user@aerorefund.com</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors">
                    <UserCircle size={18} className="text-gray-600" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors">
                    <Settings size={18} className="text-gray-600" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors">
                    <Shield size={18} className="text-gray-600" />
                    <span>Security</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Logout */}
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
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
