"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, Minus, Pause, Play, Plus, Volume2, VolumeX, X } from "lucide-react";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";

const navLinks = [
  { label: "Schedule", href: "/schedule" },
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

      <header className="fixed left-0 top-0 z-50 w-full border-black bg-white text-black lg:border-b-2">
        <div className="flex h-9 w-full border-b-2 border-black bg-white text-black">
          <button
            type="button"
            onClick={toggleAudio}
            className="flex h-full w-10 items-center justify-center border-r-2 border-black bg-white text-black transition hover:bg-black hover:text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <PlayIcon playing={isPlaying} />
          </button>

          <div className="flex min-w-0 flex-1 items-center bg-white px-3">
            <span className="truncate text-[11px] font-black uppercase">
              Velvet Haus with Spud Bud
            </span>
          </div>

          <div className="flex h-full items-center border-l-2 border-black bg-white px-2 text-black">
            <div className="mr-2 h-2 w-2 animate-pulse bg-red-600 ring-2 ring-black" />

            <span className="text-[8px] font-black uppercase">
              On Air
            </span>
          </div>

          <div className="hidden h-full items-center border-l-2 border-black bg-white px-3 sm:flex">
            <button
              type="button"
              onClick={() => updateVolume(volume - 0.1)}
              className="flex h-8 w-8 items-center justify-center text-black transition hover:bg-black hover:text-white"
              aria-label="Volume down"
            >
              <Minus size={14} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center text-black transition hover:bg-black hover:text-white"
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
              className="flex h-8 w-8 items-center justify-center text-black transition hover:bg-black hover:text-white"
              aria-label="Volume up"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
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
            <Image
              src="/images/logo5.png"
              alt="Noiszer"
              width={1536}
              height={1024}
              priority
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

          <div className="hidden h-full border-l-2 border-black md:flex">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-full w-12 items-center justify-center border-r-2 border-black bg-white text-black transition last:border-r-0 hover:bg-black hover:text-white"
                aria-label={label}
              >
                <Icon size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="flex h-10 items-center lg:hidden">
          {/* LOGO */}
          <Link
            href="/"
            className="flex h-full items-center overflow-visible border-r-2 border-black bg-white px-3"
            aria-label="Noiszer Home"
          >
            <Image
              src="/images/logo5.png"
              alt="Noiszer"
              width={1536}
              height={1024}
              priority
              className="h-20 w-auto object-contain"
            />
          </Link>

          <div className="flex-1 bg-white" />

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
