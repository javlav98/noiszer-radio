"use client";

import { useEffect, useRef, useState } from "react";

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

      <div className="fixed bottom-0 left-0 w-full z-50 bg-black border-t border-white/20 px-6 py-4 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-4">
          
          {/* LOGO */}
          <img
            src="/images/noiszer-n.png"
            alt="Noiszer Logo"
            className="w-10 h-10 object-contain opacity-90"
          />

          {/* TEXT BLOCK */}
          <div className="flex flex-col">
            
            {/* TOP ROW */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-white/50">
                Now Playing
              </span>
            </div>

            {/* TRACK */}
            <span className="text-sm text-white">
              Velvet Haus with spud bud
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={handleToggle}
          className="w-10 h-10 flex items-center justify-center text-white text-lg hover:scale-110 transition duration-200"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </>
  );
}