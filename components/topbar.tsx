"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const navLinks = ["Shows", "Schedule", "Archive", "About"];

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor">
      <rect x="1" y="1" width="3" height="8" />
      <rect x="6" y="1" width="3" height="8" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor">
      <path d="M2 1.5L9 5 2 8.5Z" />
    </svg>
  );
}

export default function TopBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    isPlaying ? audioRef.current.pause() : audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/test.mp3" preload="none" />

      <header className="fixed left-0 top-0 z-50 w-full border-b border-black bg-white text-black">
        
        {/* DESKTOP */}
        <div className="hidden h-16 items-center md:flex">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center border-r border-black px-6"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/logo5.png"
              alt="Noiszer"
              className="h-24 w-auto object-contain"
            />
          </Link>

          {/* NAV */}
          <nav className="flex h-full flex-1">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="flex h-full items-center border-r border-black px-5 font-mono text-[9px] uppercase tracking-[0.16em] transition hover:bg-black hover:text-white"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* LIVE */}
          <div className="flex h-full items-center border-l border-black px-4">
            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-black" />

            <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
              On Air
            </span>
          </div>

          {/* NOW PLAYING */}
          <div className="flex h-full min-w-[210px] flex-col justify-center border-l border-black px-4">
            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-black/50">
              Now Playing
            </span>

            <span className="truncate text-[11px] font-medium">
              Velvet Haus — spud bud
            </span>
          </div>

          {/* PLAY BUTTON */}
          <button
            onClick={toggleAudio}
            className="flex h-full w-16 items-center justify-center bg-black text-white transition hover:bg-neutral-800"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <PlayIcon playing={isPlaying} />
          </button>
        </div>

        {/* MOBILE */}
        <div className="flex h-13 items-center md:hidden">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center border-r border-black px-4"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/logo5.png"
              alt="Noiszer"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* LIVE */}
          <div className="flex flex-1 items-center justify-end gap-2 px-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-black" />

            <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
              On Air
            </span>
          </div>

          {/* MENU */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-full w-13 flex-col items-center justify-center gap-1 border-l border-black"
            aria-label="Menu"
          >
            <span
              className={`h-px w-4 bg-black transition ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />

            <span
              className={`h-px w-4 bg-black transition ${
                open ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-px w-4 bg-black transition ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* MOBILE PLAYER */}
        <div className="flex h-9 border-t border-black md:hidden">
          <button
            onClick={toggleAudio}
            className="flex h-full w-11 items-center justify-center bg-black text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <PlayIcon playing={isPlaying} />
          </button>

          <div className="flex min-w-0 flex-1 items-center px-3">
            <span className="truncate text-[11px] font-medium">
              Velvet Haus — spud bud
            </span>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden border-t border-black transition-all duration-300 md:hidden ${
            open ? "max-h-56" : "max-h-0 border-t-0"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              onClick={() => setOpen(false)}
              className="flex h-10 items-center border-b border-black px-4 font-mono text-[9px] uppercase tracking-[0.16em] transition last:border-b-0 hover:bg-black hover:text-white"
            >
              {link}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}