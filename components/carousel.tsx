"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  { image: "/images/art2.png" },
  {
    image: "/images/velvethaus.png",
    label: "Velvet Haus",
    dj: "spud bud",
    genres: "Dark House / Minimal / Leftfield",
    description:
      "Late-night house, repetitive rhythms, and underground cuts built for after-dark listening.",
  },
  {
    image: "/images/deadfrequency2.jpg",
    label: "Dead Frequency",
    dj: "Noiszer Radio",
    genres: "Hardcore Punk / Noise / Underground",
    description:
      "Fast, loud, and raw. A heavy mix of punk, noise, and aggressive sounds.",
  },
  {
    image: "/images/sundayfade4.jpg",
    label: "Sunday Fade",
    dj: "Noiszer Radio",
    genres: "Oldies / Soul / Slow Jams",
    description:
      "Warm records, soul cuts, and faded oldies for the end of the week.",
  },
  {
    image: "/images/groovetherapy.jpg",
    label: "Groove Therapy",
    dj: "Noiszer Radio",
    genres: "Funk / Disco / Soul",
    description:
      "A feel-good blend of funk, disco, and soulful grooves.",
  },
  {
    image: "/images/afterhours.png",
    label: "After Hours",
    dj: "Noiszer Radio",
    genres: "Rap / Trap / Underground",
    description:
      "Gritty rap, trap, and late-night records with underground energy.",
  },
  {
    image: "/images/ctrlaltdelete.jpg",
    label: "Ctrl+Alt+Delete",
    dj: "Noiszer Radio",
    genres: "Electronica / Leftfield / Experimental",
    description:
      "Alternative electronic sounds, ambient textures, noise, and experimental selections.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const wheelLocked = useRef(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

      if (!horizontal || Math.abs(e.deltaX) < 35) return;

      e.preventDefault();

      if (wheelLocked.current) return;

      wheelLocked.current = true;

      e.deltaX > 0 ? nextSlide() : prevSlide();

      setTimeout(() => {
        wheelLocked.current = false;
      }, 700);
    };

    carousel.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const slide = slides[current];

  return (
    <section
      ref={carouselRef}
      className="
        h-[calc(100vh-88px)]
        min-h-[520px]
        w-full
        overflow-hidden
        border-b border-black
        bg-black
        text-white
        md:h-[calc(100vh-64px)]
        md:min-h-[560px]
      "
    >
      {/* IMAGE */}
      <img
        key={slide.image}
        src={slide.image}
        alt={slide.label}
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-center
        "
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* BOTTOM SHADE */}
      <div
        className="
          absolute inset-x-0 bottom-0
          h-[45%]
          bg-gradient-to-t
          from-black/85
          via-black/35
          to-transparent
        "
      />

      {/* CONTENT */}
      <div
        className="
          absolute
          bottom-5 left-4 right-4 z-20
          flex items-end justify-between
          gap-10
          md:bottom-7 md:left-7 md:right-7
        "
      >
        <div className="min-w-0">
          <h1
            className="
              mt-2
              max-w-[75vw]
              truncate
              text-3xl
              font-medium
              uppercase
              leading-none
              tracking-[-0.06em]
              sm:text-5xl
              md:text-7xl
            "
          >
            {slide.label}
          </h1>

          {current !== 0 && (
            <div className="mt-3 max-w-md">
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/70 md:text-[10px]">
                DJ: {slide.dj}
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/70 md:text-[10px]">
                {slide.genres}
              </p>

              <p className="mt-2 text-xs leading-relaxed text-white/80 md:text-sm">
                {slide.description}
              </p>
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div className="flex shrink-0 items-center gap-4 md:gap-5">
          <button
            onClick={prevSlide}
            className="text-[9px] uppercase tracking-[0.22em] text-white/70 transition hover:text-white md:text-[10px]"
          >
            Prev
          </button>

          <button
            onClick={nextSlide}
            className="text-[9px] uppercase tracking-[0.22em] text-white/70 transition hover:text-white md:text-[10px]"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}