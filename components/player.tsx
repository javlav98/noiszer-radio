"use client";

import { useRef, useState } from "react";

export default function Player() {
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

      <div className="fixed left-0 top-16 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/90 px-6 py-3 text-white backdrop-blur-md border-t-1">
        <div className="flex items-center gap-4">
          <img
            src="/images/noiszer-n.png"
            alt="Noiszer Logo"
            className="h-9 w-9 object-contain opacity-90"
          />

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-white/45">
              Now Playing
            </span>

            <span className="text-sm text-white/90">
              Velvet Haus with spud bud
            </span>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="flex h-9 w-9 items-center justify-center text-lg text-white transition duration-200 hover:scale-110"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </>
  );
}