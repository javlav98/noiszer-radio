"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, Minus, Pause, Play, Plus, Volume2, VolumeX, X } from "lucide-react";
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
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
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

  const updateVolume = (value: number) => {
    const nextVolume = Math.min(Math.max(value, 0), 1);
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);

    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
      audioRef.current.muted = nextVolume === 0;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audio) {
      audio.muted = nextMuted;
      if (!nextMuted && audio.volume === 0) {
        updateVolume(0.8);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/test.mp3"
        preload="none"
        muted={isMuted}
        onLoadedMetadata={() => updateVolume(volume)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <header className="fixed left-0 top-0 z-50 w-full border-b border-[var(--rule)] bg-[rgba(247,247,244,0.86)] text-[var(--ink)] backdrop-blur-xl">
        {/* DESKTOP */}
        <div className="hidden h-16 items-center overflow-visible lg:flex">
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
              className="h-[5.25rem] w-auto object-contain"
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
        <div className="flex h-14 items-center overflow-visible lg:hidden">
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
              className="h-[4.5rem] w-auto object-contain"
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
          className={`overflow-hidden border-t border-[var(--rule)] bg-[rgba(247,247,244,0.96)] shadow-[0_24px_48px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
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

      <div className="fixed bottom-0 left-0 z-50 flex h-12 w-full border-t border-[var(--rule)] bg-[rgba(247,247,244,0.9)] text-[var(--ink)] backdrop-blur-xl">
        <div className="flex h-full items-center border-r border-[var(--rule)] px-3">
          <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
          <span className="text-xs font-medium">On Air</span>
        </div>

        <div className="flex min-w-0 flex-1 items-center px-4">
          <span className="truncate text-sm font-medium">
            Velvet Haus with Spud Bud
          </span>
        </div>

        <div className="hidden h-full items-center border-l border-[var(--rule)] px-2 sm:flex">
          <button
            type="button"
            onClick={() => updateVolume(volume - 0.1)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[var(--ink)] hover:text-white"
            aria-label="Volume down"
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[var(--ink)] hover:text-white"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={15} strokeWidth={2.5} />
            ) : (
              <Volume2 size={15} strokeWidth={2.5} />
            )}
          </button>

          <button
            type="button"
            onClick={() => updateVolume(volume + 0.1)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[var(--ink)] hover:text-white"
            aria-label="Volume up"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>

        <button
          type="button"
          onClick={toggleAudio}
          className="flex h-full w-12 items-center justify-center border-l border-[var(--rule)] text-black/55 transition hover:bg-[var(--ink)] hover:text-white"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <PlayIcon playing={isPlaying} />
        </button>
      </div>
    </>
  );
}
