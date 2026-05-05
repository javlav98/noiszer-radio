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
        <div className="grid h-14 grid-cols-[auto_1fr] border-b border-white md:h-16 md:grid-cols-[auto_1fr_auto]">
          <Link
            href="/"
            className="flex h-full items-center justify-center border-r border-white px-4 md:px-6"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/noiszer.png"
              alt="Noiszer Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden h-full items-center justify-center border-r border-white md:flex">
            {["Shows", "Schedule", "Archive", "About"].map((item) => (
              <Link
                key={item}
                href="#"
                className="flex h-full items-center px-6 text-xs uppercase tracking-[0.22em] transition hover:bg-white hover:text-black lg:px-8"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex h-full items-center justify-end px-4 text-xs uppercase tracking-[0.22em] md:hidden">
            Menu
          </div>

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

          <button
            onClick={handleToggle}
            className="flex h-full items-center justify-center border-l border-white px-5 text-base transition hover:bg-white hover:text-black"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
        </div>
      </header>
    </>
  );
}