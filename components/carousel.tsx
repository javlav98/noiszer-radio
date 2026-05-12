"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  { image: "/images/art2.png", label: "Noiszer" },
  { image: "/images/velvethaus.png", label: "Velvet Haus" },
  { image: "/images/deadfrequency2.jpg", label: "Dead Frequency" },
  { image: "/images/sundayfade4.jpg", label: "Sunday Fade" },
  { image: "/images/groovetherapy.jpg", label: "Groove Therapy" },
  { image: "/images/afterhours.png", label: "After Hours" },
  { image: "/images/ctrlaltdelete.jpg", label: "Ctrl+Alt+Delete" },
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
    const timer = setInterval(nextSlide, 12000);
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

      if (e.deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      setTimeout(() => {
        wheelLocked.current = false;
      }, 800);
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
    <section className="w-full border-b border-black bg-black text-white">
      <div
        ref={carouselRef}
        className="
          relative w-full overflow-hidden
          h-[72svh]
          min-h-[460px]
          md:h-[calc(100svh-112px)]
        "
      >
        {/* FULLSCREEN IMAGE */}
        <div className="absolute inset-0 bg-black">
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.label}
            className="
              h-full w-full
              object-cover object-center
              scale-[1.02]
              transition-transform duration-[12000ms]
            "
          />
        </div>

        {/* OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between gap-4 p-4 md:p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>

            <h1 className="mt-1 text-xl font-medium uppercase tracking-[-0.04em] md:text-3xl">
              {slide.label}
            </h1>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-5">
            <button
              onClick={prevSlide}
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-white/70
                transition
                hover:text-white
              "
            >
              Prev
            </button>

            <button
              onClick={nextSlide}
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-white/70
                transition
                hover:text-white
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}