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

      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-white/40 px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest opacity-50 text-white">
            Now Playing
          </span>
          <span className="text-sm text-white">Velvet Haus with spud bud</span>
        </div>

        <button
          onClick={handleToggle}
          className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </>
  );
}