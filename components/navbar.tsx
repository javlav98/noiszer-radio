"use client";

import { useState } from "react";
import Link from "next/link";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black border-b border-white/40 px-8 py-0">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          <img
            src="/images/noiszer.png"
            alt="Logo"
            width={150}
            height={100}
            className="mr-2"
          />
        </Link>

        {/* Burger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative flex flex-col gap-1 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-7 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-7 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/about"
            className="text-sm text-white hover:opacity-70 transition duration-200"
          >
            About
          </Link>
          <Link
            href="/schedule"
            className="text-sm text-white hover:opacity-70 transition duration-200"
          >
            Schedule
          </Link>
          <Link
            href="/support"
            className="text-sm text-white hover:opacity-70 transition duration-200"
          >
            Support
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div
          className={`flex flex-col items-center text-center space-y-6 py-4 transition-all duration-300 ease-in-out ${
            menuOpen ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          {/* Links */}
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-white hover:opacity-70 transition duration-200"
          >
            About
          </Link>
          <Link
            href="/schedule"
            onClick={() => setMenuOpen(false)}
            className="text-white hover:opacity-70 transition duration-200"
          >
            Schedule
          </Link>
          <Link
            href="/support"
            onClick={() => setMenuOpen(false)}
            className="text-white hover:opacity-70 transition duration-200"
          >
            Support
          </Link>

          {/* Social Icons */}
          <div className="flex gap-6 pt-4 text-white">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition duration-200"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition duration-200"
            >
              <FaXTwitter size={22} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition duration-200"
            >
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}