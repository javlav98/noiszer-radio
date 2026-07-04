"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, Pause, Play, X } from "lucide-react";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";

const navLinks = [
  { label: "Schedule", href: "/schedule" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram },
  { label: "Spotify", href: "https://open.spotify.com/", icon: FaSpotify },
  { label: "YouTube", href: "https://www.youtube.com/", icon: FaYoutube },
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
        audio.volume = 0.8;
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

      <header className="fixed left-0 top-0 z-50 w-full border-b border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)]">
        {/* DESKTOP */}
        <div className="hidden h-12 items-center overflow-visible lg:flex">
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center overflow-visible border-r border-[var(--rule)] px-7"
            aria-label="Noiszer Home"
          >
            <Image
              src="/images/logo5.png"
              alt="Noiszer"
              width={1536}
              height={1024}
              priority
              className="h-[4.5rem] w-auto object-contain"
            />
          </Link>

          {/* NAV */}
          <nav className="flex h-full flex-1 items-center px-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex h-9 items-center px-4 text-sm text-black/70 transition hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden h-full border-l border-[var(--rule)] md:flex">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-full w-12 items-center justify-center border-r border-[var(--rule)] text-black/70 transition last:border-r-0 hover:bg-[var(--ink)] hover:text-white"
                aria-label={label}
              >
                <Icon size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="flex h-12 items-center overflow-visible lg:hidden">
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center overflow-visible border-r border-[var(--rule)] px-5"
            aria-label="Noiszer Home"
          >
            <Image
              src="/images/logo5.png"
              alt="Noiszer"
              width={1536}
              height={1024}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end px-2">
            <div className="flex h-full items-center">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-9 items-center justify-center text-black/55 transition hover:text-black"
                  aria-label={label}
                >
                  <Icon size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* MENU */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-full w-12 items-center justify-center border-l border-[var(--rule)] transition hover:bg-[var(--ink)] hover:text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden border-t border-[var(--rule)] bg-[var(--paper)] shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-300 lg:hidden ${
            open ? "max-h-56" : "max-h-0 border-t-0"
          }`}
        >
          <nav className="grid">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-14 items-center justify-center border-b border-[var(--rule)] px-4 text-center text-base font-medium transition last:border-b-0 hover:bg-[var(--ink)] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="fixed left-0 top-12 z-40 flex h-8 min-h-8 w-full border-b border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)]">
        <button
          type="button"
          onClick={toggleAudio}
          className="flex h-8 w-8 shrink-0 items-center justify-center self-stretch border-r border-[var(--rule)] text-black/62 transition hover:bg-[var(--ink)] hover:text-white"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <PlayIcon playing={isPlaying} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[var(--accent)]" />
          <span className="flex min-w-0 items-center gap-2">
            <span className="hidden shrink-0 text-[9px] font-medium uppercase text-black/45 sm:inline">
              Now Playing
            </span>
            <span className="truncate text-xs font-medium">
              Velvet Haus with Spud Bud
            </span>
          </span>
        </div>

      </div>
    </>
  );
}
