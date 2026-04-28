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
    <section className="w-full overflow-x-hidden px-0 pt-0 pb-10 min-h-[80vh] bg-black text-white">
      <div className="mx-auto h-full max-w-[1400px] md:max-w-[1800px]">
        <div
          ref={carouselRef}
          className="relative overflow-hidden border-white/10 bg-white/[0.03]"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-[700px] md:h-[700px] lg:h-[700px] xl:h-[800px] w-full object-cover opacity-80 transition-all duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 max-w-4xl p-6 md:p-12">
            <h1 className="mb-4 text-4xl tracking-tight md:text-7xl">
              {slide.title}
            </h1>

            <div className="mb-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-white/70">
              <span className="rounded-full border border-white/20 px-3 py-1">
                {slide.genre}
              </span>

              <span className="rounded-full border border-white/20 px-3 py-1">
                {slide.date}
              </span>

              <span className="rounded-full border border-white/20 px-3 py-1">
                {slide.time}
              </span>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-white/75 md:text-lg md:leading-8">
              {slide.description}
            </p>
          </div>

          <div className="absolute bottom-8 right-8 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-10 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}