"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/images/velvethaus.png",
    title: "Velvet Haus",
    genre: "House / Leftfield / Late Night",
    date: "Fridays",
    time: "9:00 PM",
    description:
      "A late-night selection of house, leftfield sounds, and deep cuts built for after-dark listening.",
  },
  {
    image: "/images/deadfrequency2.jpg",
    title: "Dead Frequency",
    genre: "Hardcore Punk / Noise",
    date: "Saturdays",
    time: "8:00 PM",
    description:
      "Fast, loud, and aggressive. Hardcore punk and raw underground energy.",
  },
  {
    image: "/images/sundayfade4.jpg",
    title: "Sunday Fade",
    genre: "Oldies / Soul",
    date: "Sundays",
    time: "5:00 PM",
    description:
      "Oldies, soul, and warm weekend sounds for slowing things down.",
  },
  {
    image: "/images/groovetherapy.jpg",
    title: "Groove Therapy",
    genre: "Funk / Disco / Soul",
    date: "Wednesdays",
    time: "7:00 PM",
    description:
      "Funk, disco, and soul selections with rhythm and movement.",
  },
  {
    image: "/images/afterhours.png",
    title: "After Hours",
    genre: "Jazz / Late Night",
    date: "Thursdays",
    time: "10:00 PM",
    description:
      "Late-night jazz and slow-burning selections for deep listening.",
  },
  {
    image: "/images/ctrlaltdelete.jpg",
    title: "Ctrl+Alt+Delete",
    genre: "Alt / Post-Punk / Shoegaze",
    date: "Tuesdays",
    time: "8:00 PM",
    description:
      "Alternative, indie, post-punk, and shoegaze to reset the noise.",
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
    const timer = setInterval(nextSlide, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

      if (!isHorizontal || Math.abs(e.deltaX) < 35) return;

      e.preventDefault();

      if (wheelLocked.current) return;
      wheelLocked.current = true;

      e.deltaX > 0 ? nextSlide() : prevSlide();

      setTimeout(() => {
        wheelLocked.current = false;
      }, 900);
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
    <section className="relative h-[92vh] w-full overflow-hidden border-b border-white bg-black text-white md:h-[88vh]">
      <div ref={carouselRef} className="relative h-full w-full">
        {/* IMAGE */}
        <img
          src={slide.image}
          alt={slide.title}
          className="h-full w-full object-cover opacity-90 transition-all duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

        {/* TOP LABEL */}
        <div className="absolute left-0 top-0 z-20 border-b border-r border-white bg-black px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] md:px-5 md:py-3 md:text-[10px]">
          Noiszer Archive
        </div>

        {/* COUNT */}
        <div className="absolute bottom-[53%] left-0 z-20 border-y border-r border-white bg-black px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/70 md:bottom-0 md:px-5 md:py-3 md:text-[10px]">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>

        {/* DESKTOP FULL IMAGE LAYOUT */}
        <div className="absolute inset-0 hidden md:flex flex-col justify-end p-8 lg:p-12">
          <div className="max-w-[1200px]">
            <div className="mb-4 inline-flex border border-white bg-black px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/70">
              Featured Show
            </div>

            <h1 className="text-[clamp(5rem,10vw,11rem)] font-medium uppercase leading-[0.82] tracking-[-0.08em] text-white">
              {slide.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
              <span>{slide.date}</span>

              <span className="h-[3px] w-[3px] rounded-full bg-white/40" />

              <span>{slide.time}</span>

              <span className="h-[3px] w-[3px] rounded-full bg-white/40" />

              <span>{slide.genre}</span>
            </div>

            <p className="mt-4 max-w-xl border-l border-white pl-4 text-sm leading-6 text-white/65">
              {slide.description}
            </p>
          </div>

          {/* CONTROLS */}
          <div className="mt-8 flex items-center justify-between border-t border-white pt-5">
            <button
              onClick={prevSlide}
              className="text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
            >
              Prev
            </button>

            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-3 transition-all duration-300 ${
                    current === i
                      ? "w-12 bg-white"
                      : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
            >
              Next
            </button>
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white bg-black md:hidden">
          <div className="px-3 py-3">
            <div className="mb-2 inline-flex border border-white px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-white/70">
              Featured Show
            </div>

            <h1 className="text-[clamp(1.8rem,8vw,3.2rem)] font-medium uppercase leading-[0.9] tracking-[-0.05em]">
              {slide.title}
            </h1>

            <div className="mt-3 grid border border-white text-[9px] uppercase tracking-[0.12em] sm:grid-cols-3">
              <div className="border-b border-white px-2 py-1.5 sm:border-b-0 sm:border-r">
                <span className="block text-[8px] text-white/40">Day</span>
                {slide.date}
              </div>

              <div className="border-b border-white px-2 py-1.5 sm:border-b-0 sm:border-r">
                <span className="block text-[8px] text-white/40">Time</span>
                {slide.time}
              </div>

              <div className="px-2 py-1.5">
                <span className="block text-[8px] text-white/40">Sound</span>
                {slide.genre}
              </div>
            </div>

            <p className="mt-3 border-l border-white pl-3 text-[11px] leading-4 text-white/65">
              {slide.description}
            </p>
          </div>

          <div className="border-t border-white px-3 py-3">
            <div className="mb-2 flex items-center justify-between border-y border-white py-2">
              <button
                onClick={prevSlide}
                className="text-[10px] uppercase tracking-[0.16em] text-white/70"
              >
                Prev
              </button>

              <button
                onClick={nextSlide}
                className="text-[10px] uppercase tracking-[0.16em] text-white/70"
              >
                Next
              </button>
            </div>

            <div className="grid grid-cols-6 border border-white">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-7 border-r border-white text-[9px] uppercase tracking-[0.16em] last:border-r-0 ${
                    current === i
                      ? "bg-white text-black"
                      : "text-white/40 hover:bg-white hover:text-black"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}