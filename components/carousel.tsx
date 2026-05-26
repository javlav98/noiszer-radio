"use client";

import { useRef } from "react";
import WaveVisualizer from "./wave-visualizer";

const streamSrc = "/audio/test.mp3";

export default function HeroCarousel() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <section className="relative h-[calc(100svh-104px)] overflow-hidden border-b-2 border-black bg-black lg:h-[calc(100svh-80px)]">
      <audio
        ref={audioRef}
        src={streamSrc}
        preload="none"
      />

      <div className="absolute inset-0">
        <WaveVisualizer audioRef={audioRef} />
      </div>
    </section>
  );
}
