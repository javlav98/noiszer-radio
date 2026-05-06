"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function TopBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

        {/* ── TOP ROW ── 56px mobile / 64px desktop ── */}
        <div className="flex h-14 w-full items-stretch border-b border-black md:h-16">

          {/* LOGO — fixed width so it never squishes */}
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center border-r border-black px-4 md:px-6"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/noiszer.png"
              alt="Noiszer Logo"
              className="h-8 w-auto object-contain invert md:h-9"
            />
          </Link>

          {/* DESKTOP NAV — hidden on mobile */}
          <nav className="hidden flex-1 items-center justify-center md:flex">
            {["Shows", "Schedule", "Archive", "About"].map((label) => (
              <Link
                key={label}
                href="#"
                className="flex h-full items-center px-6 text-xs uppercase tracking-[0.22em] transition hover:bg-black hover:text-white lg:px-8"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* MOBILE — spacer so logo stays left, menu stays right */}
          <div className="flex flex-1 items-center md:hidden" />

          {/* MOBILE MENU BUTTON */}
          <button className="flex shrink-0 items-center justify-center border-l border-black px-4 text-[10px] uppercase tracking-[0.22em] transition hover:bg-black hover:text-white md:hidden">
            Menu
          </button>

          {/* DESKTOP RIGHT — now playing + play button */}
          <div className="hidden shrink-0 items-center border-l border-black md:flex">
            <div className="flex h-full min-w-[260px] flex-col justify-center border-r border-black px-5 lg:min-w-[320px]">
              <span className="text-[10px] uppercase tracking-[0.28em] text-black/40">
                Now Playing
              </span>
              <span className="truncate text-sm">Velvet Haus — spud bud</span>
            </div>

            <button
              onClick={handleToggle}
              className="flex h-full w-16 items-center justify-center text-lg transition hover:bg-black hover:text-white"
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          </div>
        </div>

        {/* ── MOBILE BOTTOM BAR — now playing + play ── */}
        <div className="flex h-14 w-full items-stretch md:hidden">
          <div className="flex min-w-0 flex-1 flex-col justify-center px-4">
            <span className="text-[9px] uppercase tracking-[0.28em] text-black/40">
              Now Playing
            </span>
            <span className="truncate text-sm">Velvet Haus — spud bud</span>
          </div>

          <button
            onClick={handleToggle}
            className="flex shrink-0 items-center justify-center border-l border-black px-5 text-base transition hover:bg-black hover:text-white"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
        </div>

      </header>
    </>
  );
}