"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, Pause, Play, X } from "lucide-react";

const navLinks = [
  { label: "Shows", href: "/#shows" },
  { label: "Schedule", href: "/schedule" },
  { label: "Archive", href: "/#archive" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <Pause size={14} strokeWidth={2.5} />
  ) : (
    <Play size={14} strokeWidth={2.5} />
  );
}

export default function TopBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/test.mp3"
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <header className="fixed left-0 top-0 z-50 w-full border-b border-black bg-[#f3f1ea] text-black">
        {/* DESKTOP */}
        <div className="hidden h-12 items-center md:flex">
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center overflow-visible border-r border-black bg-white px-5 transition hover:bg-black hover:invert"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/logo5.png"
              alt="Noiszer"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* NAV */}
          <nav className="flex h-full flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex h-full items-center border-r border-black px-4 font-mono text-[9px] uppercase transition hover:bg-black hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* LIVE */}
          <div className="flex h-full items-center border-l border-black bg-black px-3 text-white">
            <div className="mr-2 h-2 w-2 animate-pulse bg-white" />

            <span className="font-mono text-[9px] uppercase">
              On Air
            </span>
          </div>

          {/* NOW PLAYING */}
          <div className="flex h-full min-w-[230px] flex-col justify-center border-l border-black bg-white px-3">
            <span className="font-mono text-[7px] uppercase text-black/50">
              Now Playing
            </span>

            <span className="truncate text-[11px] font-semibold uppercase">
              Velvet Haus - spud bud
            </span>
          </div>

          {/* PLAY BUTTON */}
          <button
            type="button"
            onClick={toggleAudio}
            className="flex h-full w-12 items-center justify-center border-l border-black bg-white text-black transition hover:bg-black hover:text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <PlayIcon playing={isPlaying} />
          </button>
        </div>

        {/* MOBILE */}
        <div className="flex h-10 items-center md:hidden">
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center overflow-visible border-r border-black bg-white px-3"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/logo5.png"
              alt="Noiszer"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* LIVE */}
          <div className="flex flex-1 items-center justify-end gap-2 bg-black px-3 text-white">
            <div className="h-2 w-2 animate-pulse bg-white" />

            <span className="font-mono text-[9px] uppercase">
              On Air
            </span>
          </div>

          {/* MENU */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-full w-10 items-center justify-center border-l border-black bg-white transition hover:bg-black hover:text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* MOBILE PLAYER */}
        <div className="flex h-8 border-t border-black md:hidden">
          <button
            type="button"
            onClick={toggleAudio}
            className="flex h-full w-10 items-center justify-center border-r border-black bg-white text-black"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <PlayIcon playing={isPlaying} />
          </button>

          <div className="flex min-w-0 flex-1 items-center bg-white px-3">
            <span className="truncate text-[11px] font-semibold uppercase">
              Velvet Haus - spud bud
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
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex h-10 items-center border-b border-black bg-[#f3f1ea] px-4 text-[9px] uppercase transition last:border-b-0 hover:bg-black hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}
