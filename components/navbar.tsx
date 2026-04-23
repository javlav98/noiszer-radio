"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black border-b border-white/40 px-6 md:px-8 py-0">
      <div className="relative flex h-20 items-center justify-between">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-8">
          <Link href="/" className="shrink-0">
            <img
              src="/images/noiszer.png"
              alt="Logo"
              width={150}
              height={100}
              className="block"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm text-white hover:opacity-70 transition">
              About
            </Link>
            <Link href="/schedule" className="text-sm text-white hover:opacity-70 transition">
              Schedule
            </Link>
            <Link href="/support" className="text-sm text-white hover:opacity-70 transition">
              Support
            </Link>
          </div>
        </div>

        {/* CENTER CLOCK */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/70">
          {time}
          <span className="ml-2 text-white/40">PST</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          
          {/* LIVE */}
          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white">
              Live
            </span>
          </div>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex flex-col gap-[3px] md:hidden"
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
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[320px] opacity-100 pt-6 pb-8" : "max-h-0 opacity-0 pt-0 pb-0"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center space-y-7">
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-xl tracking-wide text-white hover:opacity-70 transition duration-200">
              About
            </Link>
            <Link href="/schedule" onClick={() => setMenuOpen(false)} className="text-xl tracking-wide text-white hover:opacity-70 transition duration-200">
              Schedule
            </Link>
            <Link href="/support" onClick={() => setMenuOpen(false)} className="text-xl tracking-wide text-white hover:opacity-70 transition duration-200">
              Support
            </Link>
          </div>

          <div className="w-10 h-px bg-white/10 my-8" />

          <div className="flex gap-7 text-white/80">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={22} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={22} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}