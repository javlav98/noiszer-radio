"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function TopBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["Shows", "Schedule", "Archive", "About"];

  const handleToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/test.mp3" preload="none" />

      <header className="fixed left-0 top-0 z-50 w-full border-b border-black bg-white text-black">
        
        {/* DESKTOP */}
        <div className="hidden h-20 items-center md:flex">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center border-r border-black px-8"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/logo5.png"
              alt="Noiszer"
              className="h-25 w-auto object-contain"
            />
          </Link>

          {/* NAV */}
          <nav className="flex h-full flex-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="flex h-full items-center border-r border-black px-6 font-mono text-[10px] font-medium uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* LIVE */}
          <div className="flex h-full items-center border-l border-black px-5">
            <div className="mr-3 h-2 w-2 animate-pulse rounded-full bg-black" />

            <div className="font-mono text-[10px] uppercase tracking-[0.18em]">
              On Air
            </div>
          </div>

          {/* NOW PLAYING */}
          <div className="flex h-full min-w-[240px] flex-col justify-center border-l border-black px-5">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/50">
              Now Playing
            </span>

            <span className="truncate text-xs font-medium">
              Velvet Haus — spud bud
            </span>
          </div>

          {/* PLAY BUTTON */}
          <button
            onClick={handleToggle}
            className="flex h-full w-20 items-center justify-center bg-black text-white transition hover:bg-neutral-800"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <rect x="1" y="1" width="3" height="8" />
                <rect x="6" y="1" width="3" height="8" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 10 10"
                fill="currentColor"
                className="ml-0.5"
              >
                <path d="M2 1.5L9 5 2 8.5Z" />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE */}
        <div className="flex h-16 items-center md:hidden">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center border-r border-black px-5"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/logo5.png"
              alt="Noiszer"
              className="h-25 w-auto object-contain"
            />
          </Link>

          {/* LIVE */}
          <div className="flex flex-1 items-center justify-end gap-3 px-4">
            <div className="h-2 w-2 animate-pulse rounded-full bg-black" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              On Air
            </span>
          </div>

          {/* MENU */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-full w-16 flex-col items-center justify-center gap-1.5 border-l border-black"
            aria-label="Menu"
          >
            <span
              className={`h-[1.5px] w-5 bg-black transition ${
                mobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`h-[1.5px] w-5 bg-black transition ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-[1.5px] w-5 bg-black transition ${
                mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* MOBILE PLAYER */}
        <div className="flex h-11 border-t border-black md:hidden">
          <button
            onClick={handleToggle}
            className="flex h-full w-14 items-center justify-center bg-black text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                width="11"
                height="11"
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <rect x="1" y="1" width="3" height="8" />
                <rect x="6" y="1" width="3" height="8" />
              </svg>
            ) : (
              <svg
                width="11"
                height="11"
                viewBox="0 0 10 10"
                fill="currentColor"
                className="ml-0.5"
              >
                <path d="M2 1.5L9 5 2 8.5Z" />
              </svg>
            )}
          </button>

          <div className="flex min-w-0 flex-1 items-center px-4">
            <span className="truncate text-xs font-medium">
              Velvet Haus — spud bud
            </span>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden border-t border-black transition-all duration-300 md:hidden ${
            mobileMenuOpen ? "max-h-64" : "max-h-0 border-t-0"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-12 items-center border-b border-black px-5 font-mono text-[10px] uppercase tracking-[0.18em] transition last:border-b-0 hover:bg-black hover:text-white"
            >
              {link}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}