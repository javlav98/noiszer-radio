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
    const timer = setInterval(() => {
      nextSlide();
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

      if (!isHorizontal) return;
      if (Math.abs(e.deltaX) < 35) return;

      e.preventDefault();

      if (wheelLocked.current) return;
      wheelLocked.current = true;

      if (e.deltaX > 0) nextSlide();
      else prevSlide();

      setTimeout(() => {
        wheelLocked.current = false;
      }, 900);
    };

    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[650px] w-full overflow-hidden bg-black text-white">
      <div ref={carouselRef} className="relative h-full w-full overflow-hidden">
        <img
          src={slide.image}
          alt={slide.title}
          className="h-full w-full object-cover opacity-90 transition-all duration-700"
        />

        {/* Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/60 via-40% to-transparent" />

        {/* Text */}
        <div className="absolute bottom-0 left-0 z-20 w-full px-6 pb-28 md:px-12 md:pb-24">
          <div className="max-w-2xl">
            
            <h1 className="text-3xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-6xl">
              {slide.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/55">
              <span>{slide.date}</span>
              <span className="h-[2px] w-[2px] rounded-full bg-white/30" />
              <span>{slide.time}</span>
              <span className="h-[2px] w-[2px] rounded-full bg-white/30" />
              <span className="text-white/45">{slide.genre}</span>
            </div>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/60 md:text-[15px]">
              {slide.description}
            </p>
          </div>
        </div>

        {/* Pagination (slightly higher) */}
        <div className="absolute bottom-24 left-6 z-20 flex gap-2 md:left-auto md:right-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-[5px] rounded-full transition-all duration-300 ${
                current === index
                  ? "w-5 bg-white"
                  : "w-2 bg-white/35 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}