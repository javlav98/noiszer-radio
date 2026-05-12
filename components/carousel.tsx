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
    const timer = setInterval(nextSlide, 10000);
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
        relative
        h-full w-full
        overflow-hidden
        cursor-grab 
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
          object-cover object-center
        "
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <div className="absolute bottom-5 left-4 right-4 z-20 flex items-end justify-between md:bottom-7 md:left-7 md:right-7">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/70 md:text-[10px]">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </p>

          <h1
            className="
              mt-2
              text-2xl font-medium uppercase tracking-[-0.06em]
              sm:text-4xl
              md:text-6xl
            "
          >
            {slide.label}
          </h1>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-4 md:gap-5">
          <button
            onClick={prevSlide}
            className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/70 transition hover:text-white md:text-[10px]"
          >
            Prev
          </button>

          <button
            onClick={nextSlide}
            className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/70 transition hover:text-white md:text-[10px]"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}