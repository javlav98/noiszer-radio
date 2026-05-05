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

    carousel.addEventListener("wheel", handleWheel, { passive: false });
    return () => carousel.removeEventListener("wheel", handleWheel);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[96vh] w-full overflow-hidden border-b border-white bg-black text-white md:h-[92vh]">
      <div
        ref={carouselRef}
        className="grid h-full w-full grid-rows-[45%_55%] overflow-hidden md:grid-cols-[58%_42%] md:grid-rows-1"
      >
        {/* IMAGE */}
        <div className="relative border-b border-white md:border-b-0 md:border-r">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover opacity-90 transition-all duration-700"
          />

          <div className="absolute inset-0 bg-black/15" />

          <div className="absolute left-0 top-0 border-b border-r border-white bg-black px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] md:px-4 md:py-2 md:text-[10px]">
            Noiszer Archive
          </div>

          <div className="absolute bottom-0 left-0 border-t border-r border-white bg-black px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/70 md:px-4 md:py-2 md:text-[10px]">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col bg-black">
          <div className="grid grid-cols-2 border-b border-white text-[9px] uppercase tracking-[0.2em] text-white/65 md:text-[10px]">
            <div className="border-r border-white px-3 py-2 md:px-4 md:py-3">
              Program
            </div>
            <div className="px-3 py-2 md:px-4 md:py-3">Broadcast</div>
          </div>

          <div className="flex flex-1 flex-col px-3 py-3 sm:px-4 md:px-8 md:py-8">
            <div>
              <div className="mb-2 inline-flex border border-white px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-white/70 md:mb-4 md:px-3 md:py-1 md:text-[10px]">
                Featured Show
              </div>

              <h1 className="text-[clamp(1.8rem,8vw,3.2rem)] font-medium uppercase leading-[0.9] tracking-[-0.05em] md:text-[clamp(4.5rem,6vw,7rem)]">
                {slide.title}
              </h1>

              <div className="mt-3 grid border border-white text-[9px] uppercase tracking-[0.12em] sm:grid-cols-3 md:mt-5 md:text-[11px]">
                <div className="border-b border-white px-2 py-1.5 sm:border-b-0 sm:border-r md:px-4 md:py-3">
                  <span className="block text-[8px] text-white/40">Day</span>
                  {slide.date}
                </div>

                <div className="border-b border-white px-2 py-1.5 sm:border-b-0 sm:border-r md:px-4 md:py-3">
                  <span className="block text-[8px] text-white/40">Time</span>
                  {slide.time}
                </div>

                <div className="px-2 py-1.5 md:px-4 md:py-3">
                  <span className="block text-[8px] text-white/40">Sound</span>
                  {slide.genre}
                </div>
              </div>

              <p className="mt-3 border-l border-white pl-3 text-[11px] leading-4 text-white/65 md:mt-4 md:max-w-xl md:pl-4 md:text-sm md:leading-6">
                {slide.description}
              </p>
            </div>

            <div className="mt-3 md:mt-auto">
              <div className="mb-2 flex items-center justify-between border-y border-white py-2 md:mb-4 md:py-3">
                <button
                  onClick={prevSlide}
                  className="text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white md:text-xs"
                >
                  Prev
                </button>

                <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/40 md:block">
                  Swipe / Scroll
                </span>

                <button
                  onClick={nextSlide}
                  className="text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white md:text-xs"
                >
                  Next
                </button>
              </div>

              <div className="grid grid-cols-6 border border-white">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-7 border-r border-white text-[9px] uppercase tracking-[0.16em] last:border-r-0 md:h-14 md:text-[10px] ${
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
      </div>
    </section>
  );
}