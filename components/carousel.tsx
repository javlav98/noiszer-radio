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
      "A late-night selection of house, leftfield sounds, and deep cuts.",
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

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

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
      setTimeout(() => { wheelLocked.current = false; }, 900);
    };

    carousel.addEventListener("wheel", handleWheel, { passive: false });
    return () => carousel.removeEventListener("wheel", handleWheel);
  }, []);

  const slide = slides[current];

  return (
    <section className="w-full border-b border-black bg-white text-black overflow-hidden">
      <div
        ref={carouselRef}
        className="relative w-full flex flex-col md:block"
        style={{ minHeight: "calc(100svh - 112px)" }}
      >

        {/* ─── FULL-BLEED IMAGE (all breakpoints) ─── */}
        <div
          className="
            relative w-full overflow-hidden bg-black
            /* mobile: fixed height, leaves room for info panel below */
            h-[44svh] min-h-[280px] max-h-[420px]
            /* tablet 768-1023: taller, still stacked */
            sm:h-[48svh] sm:min-h-[340px] sm:max-h-[500px]
            /* desktop 1024+: full-screen behind overlay */
            md:absolute md:inset-0 md:h-full md:max-h-none md:min-h-0
          "
        >
          <img
            key={current}
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover object-center transition-opacity duration-700"
          />

          {/* gradient so desktop text is always readable */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* ── MOBILE-ONLY: donate badge + counter on the image ── */}
          <button className="absolute left-0 top-0 z-20 border-b border-r border-black bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] transition hover:bg-black hover:text-white sm:px-4 sm:py-2 md:hidden">
            Donate
          </button>

          <div className="absolute bottom-0 left-0 z-20 border-r border-t border-black bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-black/60 sm:px-4 sm:py-2 md:hidden">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
        </div>


        {/* ─── DESKTOP OVERLAY (md+) ─── */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:flex md:flex-col md:justify-end md:p-6 lg:p-8 xl:p-10">
          <div className="pointer-events-auto flex items-end justify-between gap-10">

            {/* text block */}
            <div className="max-w-[720px]">
              <h1 className="text-[clamp(2.6rem,4.2vw,5.5rem)] font-medium uppercase leading-[0.88] tracking-[-0.05em] text-white">
                {slide.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/65">
                <span>{slide.date}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/40" />
                <span>{slide.time}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/40" />
                <span>{slide.genre}</span>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                {slide.description}
              </p>
            </div>

            {/* arrows */}
            <div className="flex shrink-0 items-center gap-8 pb-1">
              <button
                onClick={prevSlide}
                className="text-sm uppercase tracking-[0.24em] text-white/55 transition hover:text-white"
              >
                Prev
              </button>
              <button
                onClick={nextSlide}
                className="text-sm uppercase tracking-[0.24em] text-white/55 transition hover:text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>


        {/* ─── MOBILE INFO PANEL (below image, <md) ─── */}
        <div className="relative z-20 flex flex-1 flex-col bg-white md:hidden">

          {/* content */}
          <div className="flex-1 px-3 py-3 sm:px-4 sm:py-4">
            <div className="mb-2 inline-flex border border-black px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-black/60">
              Featured Show
            </div>

            <h1 className="text-[clamp(1.9rem,9vw,3.2rem)] font-medium uppercase leading-[0.86] tracking-[-0.06em]">
              {slide.title}
            </h1>

            {/* info grid */}
            <div className="mt-3 grid grid-cols-3 border border-black text-[9px] uppercase tracking-[0.12em]">
              <div className="border-r border-black px-2 py-1.5">
                <span className="mb-0.5 block text-[8px] text-black/40">Day</span>
                {slide.date}
              </div>
              <div className="border-r border-black px-2 py-1.5">
                <span className="mb-0.5 block text-[8px] text-black/40">Time</span>
                {slide.time}
              </div>
              <div className="px-2 py-1.5">
                <span className="mb-0.5 block text-[8px] text-black/40">Sound</span>
                {slide.genre}
              </div>
            </div>

            <p className="mt-3 border-l border-black pl-3 text-[11px] leading-4 text-black/65 sm:text-xs sm:leading-5">
              {slide.description}
            </p>
          </div>

          {/* controls */}
          <div className="border-t border-black px-3 py-3 sm:px-4">
            <div className="mb-2 flex items-center justify-between border-y border-black py-2">
              <button
                onClick={prevSlide}
                className="text-[10px] uppercase tracking-[0.16em] text-black/60 hover:text-black transition"
              >
                Prev
              </button>
              <button
                onClick={nextSlide}
                className="text-[10px] uppercase tracking-[0.16em] text-black/60 hover:text-black transition"
              >
                Next
              </button>
            </div>

            {/* pagination dots */}
            <div className="grid grid-cols-6 border border-black">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-7 border-r border-black text-[9px] uppercase tracking-[0.16em] last:border-r-0 transition ${
                    current === i
                      ? "bg-black text-white"
                      : "text-black/40 hover:bg-black hover:text-white"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
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