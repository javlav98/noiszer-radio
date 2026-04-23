"use client";

import { useEffect, useRef, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeWrapRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        volumeWrapRef.current &&
        !volumeWrapRef.current.contains(e.target as Node)
      ) {
        setShowVolume(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/audio/test.mp3" />

      <div className="fixed bottom-0 left-0 w-full z-50 bg-black border-t border-white/30 shadow-[0_-10px_30px_rgba(0,0,0,0.9)] px-6 py-4 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-0">
          <img
            src="/images/noiszer-n.png"
            alt="Now playing artwork"
            className="w-12 h-12 object-cover"
          />

          <div className="flex flex-col min-w-0">
            <span className="text-xs uppercase tracking-widest text-white/50">
              Now Playing
            </span>

            <span className="text-sm text-white truncate">
              Velvet Haus with spud bud
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          
          {/* PLAY */}
          <button
            onClick={handleToggle}
            className="w-10 h-10 flex items-center justify-center text-white text-lg hover:scale-110 transition duration-200"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          

        </div>
      </div>
    </>
  );
}