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
      <audio ref={audioRef} src="/audio/test.mp3" />

      <header className="fixed left-0 top-0 z-50 w-full border-b border-white bg-black text-white">
        <div className="grid h-14 grid-cols-[auto_1fr_auto] border-b border-white md:h-16">
          <Link
            href="/"
            className="flex h-14 items-center justify-center border-r border-white px-4 md:h-16 md:px-6"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/noiszer.png"
              alt="Noiszer Logo"
              className="h-7 w-auto object-contain md:h-8"
            />
          </Link>

          <nav className="hidden h-full items-center justify-center divide-x divide-white border-r border-white md:flex">
            <Link
              href="#"
              className="flex h-full items-center px-6 text-xs uppercase tracking-[0.22em] transition hover:bg-white hover:text-black lg:px-8"
            >
              Shows
            </Link>

            <Link
              href="#"
              className="flex h-full items-center px-6 text-xs uppercase tracking-[0.22em] transition hover:bg-white hover:text-black lg:px-8"
            >
              Schedule
            </Link>

            <Link
              href="#"
              className="flex h-full items-center px-6 text-xs uppercase tracking-[0.22em] transition hover:bg-white hover:text-black lg:px-8"
            >
              Archive
            </Link>

            <Link
              href="#"
              className="flex h-full items-center px-6 text-xs uppercase tracking-[0.22em] transition hover:bg-white hover:text-black lg:px-8"
            >
              About
            </Link>
          </nav>

          <div className="flex h-full items-center justify-end px-4 text-xs uppercase tracking-[0.22em] md:hidden">
            Menu
          </div>

          <button
            onClick={handleToggle}
            className="flex h-full items-center justify-center border-l border-white px-5 text-base transition hover:bg-white hover:text-black md:hidden"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <div className="hidden h-full items-center border-l border-white md:flex">
            <div className="flex h-full min-w-[260px] flex-col justify-center border-r border-white px-5 lg:min-w-[340px]">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                Now Playing
              </span>

              <span className="truncate text-sm text-white">
                Velvet Haus — spud bud
              </span>
            </div>

            <button
              onClick={handleToggle}
              className="flex h-full w-16 items-center justify-center text-lg transition hover:bg-white hover:text-black"
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          </div>
        </div>

        <div className="grid h-14 grid-cols-[1fr_auto] md:hidden">
          <div className="flex min-w-0 flex-col justify-center px-4">
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/45">
              Now Playing
            </span>

            <span className="truncate text-sm">Velvet Haus — spud bud</span>
          </div>

          <div className="flex h-full divide-x divide-white border-l border-white text-[10px] uppercase tracking-[0.2em]">
            <Link
              href="#"
              className="flex h-full items-center px-3 transition hover:bg-white hover:text-black"
            >
              Shows
            </Link>

            <Link
              href="#"
              className="flex h-full items-center px-3 transition hover:bg-white hover:text-black"
            >
              About
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}