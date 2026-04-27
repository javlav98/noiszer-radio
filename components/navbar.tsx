"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaSpotify,
} from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-white/20 px-6 md:px-8">
      <div className="relative flex h-16 items-center justify-between">

        {/* LEFT SIDE (SOCIALS - DESKTOP ONLY) */}
        <div className="hidden md:flex items-center gap-2 text-white/70 z-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/[0.06] hover:text-white transition"
          >
            <FaInstagram size={17} />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/[0.06] hover:text-white transition"
          >
            <FaXTwitter size={17} />
          </a>

          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/[0.06] hover:text-white transition"
          >
            <FaSpotify size={17} />
          </a>
        </div>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-0.5 z-0">
          <Link href="/">
            <img
              src="/images/noiszer.png"
              alt="Logo"
              width={130}
              className="block opacity-90 hover:opacity-100 transition"
            />
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 z-10 ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-10 h-10 text-white hover:opacity-70 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[320px] opacity-100 pt-6 pb-8" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-center space-y-5">
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-white/80 hover:text-white"
          >
            About
          </Link>

          <Link
            href="/schedule"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-white/80 hover:text-white"
          >
            Schedule
          </Link>

          <Link
            href="/support"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-white/80 hover:text-white"
          >
            Support
          </Link>

          <div className="border-t border-white/15 w-full" />

          {/* MOBILE SOCIALS */}
          <div className="flex gap-7 text-white/70">
            <FaInstagram size={18} />
            <FaXTwitter size={18} />
            <FaSpotify size={18} />
          </div>
        </div>
      </div>
    </nav>
  );
}