"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, Pause, Play, X } from "lucide-react";

const navLinks = [
  { label: "Shows", href: "/shows" },
  { label: "Schedule", href: "/schedule" },
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

      <header className="fixed left-0 top-0 z-50 w-full border-black bg-white text-black lg:border-b-2">
        <div className="h-8 overflow-hidden border-b-2 border-black bg-black text-white">
          <div className="ticker-track flex h-full w-max items-center gap-7 whitespace-nowrap px-4 text-[11px] font-black uppercase">
            {Array.from({ length: 2 }).map((_, repeat) => (
              <span key={repeat} className="flex items-center gap-7">
                <span>Live Now</span>
                <span>•</span>
                <span>Velvet Haus with Spud Bud</span>
                <span>•</span>
                <span>Independent web radio</span>
                <span>•</span>
                <span>Noiszer Radio</span>
                <span>•</span>
                <span>Shows and live selections</span>
                <span>•</span>
              </span>
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden h-12 items-center lg:flex">
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center overflow-visible border-r-2 border-black bg-white px-5"
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
                key={link.label}
                href={link.href}
                className="flex h-full items-center border-r-2 border-black px-5 text-[10px] font-black uppercase transition hover:bg-black hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* LIVE */}
          <div className="flex h-full items-center border-l-2 border-black bg-white px-3 text-black">
            <div className="mr-2 h-2 w-2 animate-pulse bg-red-600 ring-2 ring-black" />

            <span className="text-[9px] font-black uppercase">
              On Air
            </span>
          </div>

          {/* NOW PLAYING */}
          <div className="flex h-full min-w-[230px] flex-col justify-center border-l-2 border-black bg-white px-3">
            <span className="text-[7px] font-black uppercase text-black/50">
              Now Playing
            </span>

            <span className="truncate text-[11px] font-black uppercase">
              Velvet Haus with Spud Bud
            </span>
          </div>

          {/* PLAY BUTTON */}
          <button
            type="button"
            onClick={toggleAudio}
            className="flex h-full w-12 items-center justify-center border-l-2 border-black bg-white text-black transition hover:bg-black hover:text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <PlayIcon playing={isPlaying} />
          </button>
        </div>

        {/* MOBILE */}
        <div className="flex h-10 items-center lg:hidden">
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center overflow-visible border-r-2 border-black bg-white px-3"
            aria-label="Noiszer Home"
          >
            <img
              src="/images/logo5.png"
              alt="Noiszer"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* LIVE */}
          <div className="flex flex-1 items-center justify-end gap-2 bg-white px-3 text-black">
            <div className="h-2 w-2 animate-pulse bg-red-600 ring-2 ring-black" />

            <span className="text-[9px] font-black uppercase">
              On Air
            </span>
          </div>

          {/* MENU */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-full w-10 items-center justify-center border-l-2 border-black bg-white transition hover:bg-black hover:text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* MOBILE PLAYER */}
        <div className="flex h-8 border-t-2 border-black lg:hidden">
          <button
            type="button"
            onClick={toggleAudio}
            className="flex h-full w-10 items-center justify-center border-r-2 border-black bg-white text-black"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <PlayIcon playing={isPlaying} />
          </button>

          <div className="flex min-w-0 flex-1 items-center bg-white px-3">
            <span className="truncate text-[11px] font-black uppercase">
              Velvet Haus with Spud Bud
            </span>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden border-t-2 border-black transition-all duration-300 lg:hidden ${
            open ? "max-h-56" : "max-h-0 border-t-0"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex h-10 items-center border-b-2 border-black bg-white px-4 text-[9px] font-black uppercase transition last:border-b-0 hover:bg-black hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}
