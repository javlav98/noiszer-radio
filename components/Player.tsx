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

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-black/100 px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest opacity-50">
            Now Playing
          </span>
          <span className="text-sm">Velvet Haus with spud bud</span>
        </div>

        <button
          onClick={handleToggle}
          className="w-10 h-10 flex items-center justify-center border border-black/100 rounded-full hover:bg-black hover:text-white transition"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </>
  );
}