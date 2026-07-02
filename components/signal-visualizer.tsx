"use client";

import { useEffect, useRef } from "react";

const heroImages = [
  "/images/liquid-chrome-hero.png",
  "/images/material-satin-hero.png",
  "/images/material-black-glass-hero.png",
];

export default function SignalVisualizer() {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const previous = window.localStorage.getItem("noiszer-hero-art");
    const availableImages = heroImages.filter((item) => item !== previous);
    const nextImages = availableImages.length > 0 ? availableImages : heroImages;
    const nextImage = nextImages[Math.floor(Math.random() * nextImages.length)];

    window.localStorage.setItem("noiszer-hero-art", nextImage);
    imageElement.style.backgroundImage = `url('${nextImage}')`;
  }, []);

  return (
    <section className="relative min-h-[calc(100svh-104px)] overflow-hidden bg-[#06111c] lg:min-h-[calc(100svh-112px)]">
      <div
        ref={imageRef}
        className="absolute inset-0 scale-[1.03] bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,transparent_0,rgba(4,22,36,0.12)_44%,rgba(0,0,0,0.54)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,transparent_28%,transparent_68%,rgba(15,90,130,0.28)_100%)] mix-blend-screen" />
      <div
        className="absolute bottom-3 right-3 h-[min(28svh,34vw)] w-[min(42svh,50vw)] bg-contain bg-center bg-no-repeat opacity-95 drop-shadow-[0_18px_48px_rgba(0,0,0,0.56)] transition duration-500 hover:scale-[1.025] md:bottom-4 md:right-5"
        style={{ backgroundImage: "url('/images/logo1.PNG')" }}
        aria-label="Noiszer"
        role="img"
      />
    </section>
  );
}
